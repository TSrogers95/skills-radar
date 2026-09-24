/* =========================================================================
   SHARED HELPERS FOR THE SCHEDULED JOBS

   Both jobs use GitHub as their storage, so there is one credential to
   manage rather than a separate database. State files live in the repo
   under /state, alongside the site.
   ========================================================================= */

const GH = 'https://api.github.com';

function env(name, required){
  const v = process.env[name];
  if(required && !v) throw new Error('Missing environment variable: ' + name);
  return v;
}

function repo(){
  return {
    owner:  env('GITHUB_OWNER', true),
    name:   env('GITHUB_REPO', true),
    branch: process.env.GITHUB_BRANCH || 'main',
    token:  env('GITHUB_TOKEN', true)
  };
}

async function ghFetch(path, options){
  const r = repo();
  const res = await fetch(GH + path, {
    ...options,
    headers: {
      'Authorization': 'Bearer ' + r.token,
      'Accept': 'application/vnd.github+json',
      'User-Agent': 'skills-radar-bot',
      ...(options && options.headers)
    }
  });
  return res;
}

/* Read a file from the repo. Returns { content, sha } or null if absent. */
async function readFile(path){
  const r = repo();
  const res = await ghFetch('/repos/' + r.owner + '/' + r.name + '/contents/' +
    encodeURIComponent(path) + '?ref=' + r.branch);

  if(res.status === 404) return null;
  if(!res.ok) throw new Error('GitHub read failed (' + res.status + '): ' + await res.text());

  const json = await res.json();
  return {
    content: Buffer.from(json.content, 'base64').toString('utf8'),
    sha: json.sha
  };
}

/* Write a file to the repo. Pass the sha of the version you read, or null
   to create. Committing triggers a Vercel redeploy automatically. */
async function writeFile(path, content, sha, message){
  const r = repo();
  const res = await ghFetch('/repos/' + r.owner + '/' + r.name + '/contents/' +
    encodeURIComponent(path), {
    method: 'PUT',
    body: JSON.stringify({
      message: message,
      content: Buffer.from(content, 'utf8').toString('base64'),
      branch: r.branch,
      ...(sha ? { sha: sha } : {})
    })
  });

  if(!res.ok) throw new Error('GitHub write failed (' + res.status + '): ' + await res.text());
  return res.json();
}

/* ---------- Email ----------
   Resend is used because it needs one API key and no SMTP setup.
   If no key is configured the job still runs and logs instead of sending. */

async function sendEmail(subject, html){
  const key = process.env.RESEND_API_KEY;
  const to   = process.env.ALERT_EMAIL;
  const from = process.env.ALERT_FROM || 'Skills Radar <onboarding@resend.dev>';

  if(!key || !to){
    console.log('[email skipped — no RESEND_API_KEY or ALERT_EMAIL]');
    console.log(subject);
    return { skipped: true };
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + key,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ from: from, to: [to], subject: subject, html: html })
  });

  if(!res.ok) throw new Error('Email failed (' + res.status + '): ' + await res.text());
  return res.json();
}

/* A stable hash of page content, so we can tell when a page has changed. */
async function hash(text){
  const data = new TextEncoder().encode(text);
  const buf  = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 16);
}

/* Strip the parts of a page that change on every load — timestamps, session
   ids, CSRF tokens, cache-busting query strings. Without this, every check
   reports a change and the alerts become noise you ignore. */
function normalise(html){
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/nonce="[^"]*"/gi, '')
    .replace(/csrf[^"']*["'][^"']*["']/gi, '')
    .replace(/\?v=[\w.-]+/gi, '')
    .replace(/\b\d{2}:\d{2}(:\d{2})?\b/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/* Only Vercel Cron or someone holding CRON_SECRET may run these. Without
   this check the endpoints are public URLs anyone can trigger. */
function authorised(req){
  const secret = process.env.CRON_SECRET;
  if(!secret) return true;                       // not configured yet
  const header = req.headers['authorization'] || '';
  return header === 'Bearer ' + secret;
}

function today(){ return new Date().toISOString().slice(0, 10); }

module.exports = { readFile, writeFile, sendEmail, hash, normalise, authorised, today, env };
