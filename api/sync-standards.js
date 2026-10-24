/* =========================================================================
   JOB 2 — STANDARDS REGISTER SYNC

   Fetches the Skills England occupational maps API, compares it against the
   STANDARDS block in data.js, and commits any changes back to the repo.
   Committing triggers a Vercel redeploy, so the site updates itself.

   What it will and will not touch
     overwrites  level, duration, funding band, version, status, dates
     preserves   common, article, route — anything decided by a person
     generates   a plain "changed" line describing what actually moved
     never       deletes a standard. Removals are reported, not applied.

   Licence: Skills England require that anything built with their data carries
   their logo and an attribution statement. See the setup guide.
   ========================================================================= */

const { readFile, writeFile, sendEmail, authorised, today } = require('./_lib');

/* The public register. No key, no sign-in, one request. The keyed
   occupational-maps API needed a subscription key that could expire
   without anyone noticing; this one cannot. */
const API   = 'https://skillsengland.education.gov.uk/api/apprenticeshipstandards';
const PATH  = 'standards.js';
const BEGIN = '/* STANDARDS:BEGIN';
const END   = '/* STANDARDS:END */';

/* Changes above this many standards in one run stop the job and email you
   instead of committing. A sudden mass change is far more likely to be the
   API changing shape than 200 standards moving overnight. */
const SAFETY_LIMIT = 60;

module.exports = async function handler(req, res){
  if(!authorised(req)) return res.status(401).json({ error: 'Unauthorised' });

  const dryRun = req.query && req.query.dry === '1';

  /* ---- 1. Fetch the register ---- */

  let remote;
  try {
    remote = await fetchAll();
  } catch(err){
    await sendEmail('Skills Radar — register sync failed',
      '<p>The sync could not read the Skills England API.</p><pre>' + esc(err.message) + '</pre>' +
      '<p>The site is untouched and still shows the last good data.</p>');
    return res.status(200).json({ ok: false, error: err.message });
  }

  if(remote.length < 200){
    await sendEmail('Skills Radar — register sync stopped',
      '<p>The API returned only ' + remote.length + ' standards, which is far fewer than expected. ' +
      'Nothing was changed, in case the API is having a bad day.</p>');
    return res.status(200).json({ ok: false, error: 'Too few records: ' + remote.length });
  }

  /* ---- 2. Read what the site currently has ---- */

  const file = await readFile(PATH);
  if(!file) return res.status(500).json({ error: 'standards.js not found in the repo' });

  const a = file.content.indexOf(BEGIN);
  const b = file.content.indexOf(END);
  if(a < 0 || b < 0) return res.status(500).json({ error: 'STANDARDS markers missing from standards.js' });

  const block = file.content.slice(a, b);
  const local = parseLocal(block);

  /* ---- 3. Compare ---- */

  const byCode = {};
  local.forEach(s => { if(s.code) byCode[s.code] = s; });
  const byName = {};
  local.forEach(s => { byName[norm(s.name)] = s; });

  const added = [], updated = [], missing = [];
  const merged = [];
  const seen = new Set();

  remote.forEach(r => {
    /* Names are not unique on the register: a retired standard and its live
       replacement often share one, at different levels and bands. Matching a
       retired record to a live one by name rewrites the live standard with
       the dead one's figures, so a retired record only ever matches on code. */
    const existing = byCode[r.code] || (isRetired(r) ? null : byName[norm(r.name)]);

    /* A standard that is already retired and that the site has never carried
       is not news, it is history. One the site DOES carry is the opposite:
       somebody may be delivering it, so the change has to come through. */
    if(!existing && isRetired(r)) return;

    if(!existing){
      added.push(r);
      merged.push({
        common: false,
        name: r.name, code: r.code, level: r.level,
        months: r.months, funding: r.funding,
        route: r.route || guessRoute(r),
        epa: r.epa, status: r.status, version: r.version,
        since: r.changedOn || today(),
        changed: 'New on the register',
        article: ''
      });
      return;
    }

    seen.add(existing.name);
    const diffs = compare(existing, r);

    const base = {
      ...existing,                        // keep common, article, route
      code: r.code,                       // the register is the authority on codes
      level: r.level,
      months: r.months || existing.months,
      funding: r.funding || existing.funding,
      epa: r.epa, status: r.status,
      version: versionNum(r.version) === versionNum(existing.version)
        ? existing.version : r.version
    };

    if(diffs.length){
      updated.push({ name: r.name, code: r.code, diffs: diffs });
      merged.push({ ...base, since: r.changedOn || existing.since || today(), changed: diffs.join('. ') });
    } else if((!existing.funding && r.funding) || (!existing.months && r.months)){
      // a blank filled in: take the value, leave the feed alone
      merged.push(base);
    } else {
      merged.push(existing);              // untouched, including its "changed" text
    }
  });

  // Standards we hold that the API no longer returns. Reported, never deleted —
  // a standard vanishing from a beta API is more likely a glitch than a fact.
  local.forEach(s => {
    if(seen.has(s.name)) return;
    if(remote.some(r => r.code === s.code)) return;
    missing.push(s);
    merged.push(s);
  });

  const total = added.length + updated.length;

  if(total === 0){
    return res.status(200).json({ ok: true, changes: 0, committed: false });
  }

  if(total > SAFETY_LIMIT){
    await sendEmail('Skills Radar — register sync held back',
      '<p><b>' + total + ' standards changed in one run</b>, which is above the safety limit of ' +
      SAFETY_LIMIT + '. Nothing was committed.</p>' +
      '<p>This usually means the API changed shape rather than the register changing. ' +
      'Run the job with <code>?dry=1</code> to see the full list before letting it through.</p>');
    return res.status(200).json({ ok: false, heldBack: total, committed: false });
  }

  if(dryRun){
    return res.status(200).json({ ok: true, dryRun: true, added, updated, missing: missing.map(m => m.name) });
  }

  /* ---- 4. Write it back ---- */

  // Move the register's own stamp on, so the home page reflects the sync.
  let head = file.content.slice(0, a);
  if(/const STANDARDS_UPDATED = "[\d-]+";/.test(head)){
    head = head
      .replace(/const STANDARDS_UPDATED = "[\d-]+";/, 'const STANDARDS_UPDATED = "' + today() + '";')
      .replace(/const STANDARDS_SOURCE  = "[a-z]+";/, 'const STANDARDS_SOURCE  = "sync";');
  } else {
    head += 'const STANDARDS_UPDATED = "' + today() + '";\nconst STANDARDS_SOURCE  = "sync";\n\n';
  }

  const rebuilt =
    head +
    BEGIN + ' — the importer and sync job rewrite everything between\n' +
    '   these two markers. Do not remove them.\n' +
    '   Last synced ' + today() + '. */\n' +
    'const STANDARDS = [\n' +
    merged.map(render).join('\n') + '\n];\n\n' +
    file.content.slice(b);

  // The review stamp lives in data.js, which the sync never writes, so it is
  // updated separately rather than as part of the register rewrite.
  await writeFile(PATH, rebuilt, file.sha,
    'Register sync ' + today() + ' — ' + added.length + ' new, ' + updated.length + ' updated');

  await sendEmail(
    'Skills Radar — ' + total + ' standard' + (total === 1 ? '' : 's') + ' updated from the register',
    report(added, updated, missing)
  );

  return res.status(200).json({
    ok: true, added: added.length, updated: updated.length,
    missing: missing.length, committed: true
  });
};

/* ---------- Fetching ---------- */

/* One request, about 80MB, roughly ten seconds. That is well inside the
   function's limit and the parsed result sits around 260MB, so there is no
   need to page. The endpoint does not support paging or field selection
   anyway: every query string returns the whole register. */
async function fetchAll(){
  const r = await fetch(API, { headers: { 'Accept': 'application/json' } });
  if(!r.ok) throw new Error('Register API returned ' + r.status);

  const json = await r.json();
  const rows = Array.isArray(json) ? json : (json.standards || json.items || json.data || []);
  if(!rows.length) throw new Error('Register API returned no records');

  return pickCurrent(rows).map(shape);
}

/* The register carries one record per VERSION, so roughly 2,000 records
   describe roughly 800 standards. Keep the one a provider would actually
   start someone on: open for delivery first, then the highest version, then
   the most recently changed. */
function pickCurrent(rows){
  const rank = x => {
    const st = String(x.status || '').toLowerCase();
    if(/retired|withdrawn/.test(st)) return 0;
    if(/approved for delivery/.test(st)) return 3;
    if(/development|proposal/.test(st)) return 1;
    return 2;
  };

  const best = new Map();
  rows.forEach(x => {
    const code = String(x.referenceNumber || '').trim();
    if(!code) return;

    const held = best.get(code);
    if(!held) return void best.set(code, x);

    const a = [rank(x),    versionNum(x.versionNumber),    Date.parse(x.changedDate || 0) || 0];
    const b = [rank(held), versionNum(held.versionNumber), Date.parse(held.changedDate || 0) || 0];
    for(let i = 0; i < 3; i++){
      if(a[i] !== b[i]){ if(a[i] > b[i]) best.set(code, x); return; }
    }
  });

  return [...best.values()];
}

function isRetired(s){ return /^retired|^withdrawn/i.test(String(s.status || '')); }

/* The API is in public beta, so field names may move. Check several spellings
   rather than assuming one, and fall back rather than writing nonsense. */
function shape(x){
  const pick = (...keys) => {
    for(const k of keys){
      const v = k.split('.').reduce((o, p) => (o || {})[p], x);
      if(v !== undefined && v !== null && v !== '') return v;
    }
    return undefined;
  };

  const status = tidyStatus(pick('status', 'standardStatus', 'approvalStatus') || 'Approved');
  const epao   = pick('assessmentOrganisations', 'epaos', 'assessmentOrganisationCount');

  return {
    name:    String(pick('title', 'name', 'standardName') || '').trim(),
    code:    String(pick('referenceNumber', 'reference', 'standardReference', 'larsCode') || '').trim(),
    level:   Number(pick('level', 'standardLevel')) || 0,
    months:  Number(pick('typicalDuration', 'duration', 'typicalDurationMonths')) || 0,
    funding: Number(pick('maxFunding', 'fundingBand', 'maximumFunding', 'fundingBandMaximum')) || 0,
    version: String(pick('versionNumber', 'version', 'standardVersion') || '1.0'),
    route:   slugRoute(pick('route', 'routeName', 'route.name')),
    status:  status,
    epa:     epaStatus(status, epao),
    changedOn: changedOn(x)
  };
}

/* The register and the site word the same status differently. Without this
   every standard reports a status change on the first run and the real ones
   are buried. Same list as the importer uses. */
function tidyStatus(s){
  const t = String(s || '').trim();
  if(/^approved for delivery/i.test(t)) return 'Approved';
  if(/^standard in development|^in development/i.test(t)) return 'In development';
  if(/^proposal/i.test(t)) return 'Proposal in development';
  if(/paused/i.test(t)) return 'Paused for starts';
  if(/retirement consultation/i.test(t)) return 'Retirement consultation';
  if(/notice period/i.test(t)) return 'In development';
  if(/defunded/i.test(t)) return 'Defunded from Sept 2026';
  return t || 'Approved';
}

/* "2" and "2.0" are the same version. Comparing the strings reports a change
   on every standard whose version the importer stored without a decimal. */
function versionNum(v){
  const m = String(v == null ? '' : v).match(/(\d+)(?:\.(\d+))?/);
  return m ? (Number(m[1]) * 1000) + Number(m[2] || 0) : -1;
}

/* A change is dated when it happened, not when the sync noticed. On a weekly
   run those are the same day; after an outage they are not, and dating a
   month of changes today puts all of them in the feed at once. The register
   carries 0001-01-01 placeholders, so anything implausible returns null and
   the caller keeps whatever date the site already held. */
function changedOn(x){
  const d = String((x && (x.changedDate || x.lastUpdated)) || '').slice(0, 10);
  if(!/^\d{4}-\d{2}-\d{2}$/.test(d)) return null;
  return (d >= '2012-01-01' && d <= today()) ? d : null;
}

function epaStatus(status, epao){
  if(/development|proposal|in progress/i.test(status)) return 'Pending — standard in development';
  if(epao === 0 || epao === '0') return 'Waiting for an assessment organisation';
  if(/waiting/i.test(status)) return 'Waiting for an assessment organisation';
  return 'Assigned';
}

function slugRoute(name){
  if(!name) return '';
  const n = String(name).toLowerCase();
  if(n.includes('agricultur')) return 'agriculture';
  if(n.includes('business')) return 'business-administration';
  if(n.includes('care service') || n === 'care services') return 'care-services';
  if(n.includes('catering') || n.includes('hospitality')) return 'catering-hospitality';
  if(n.includes('construction')) return 'construction';
  if(n.includes('creative')) return 'creative-design';
  if(n.includes('digital')) return 'digital';
  if(n.includes('education')) return 'education-early-years';
  if(n.includes('engineering')) return 'engineering-manufacturing';
  if(n.includes('hair')) return 'hair-beauty';
  if(n.includes('health')) return 'health-science';
  if(n.includes('legal')) return 'legal-finance-accounting';
  if(n.includes('protective')) return 'protective-services';
  if(n.includes('sales')) return 'sales-marketing-procurement';
  if(n.includes('transport')) return 'transport-logistics';
  return '';
}

function guessRoute(r){ return r.route || 'business-administration'; }

/* ---------- Comparing ---------- */

function compare(local, remote){
  const d = [];
  const gbp = n => '£' + Number(n).toLocaleString('en-GB');

  /* Only a figure the site already held can have changed. Filling a blank is
     the register telling us something for the first time, which belongs in
     the data but not in the feed. */
  if(remote.funding && local.funding && remote.funding !== local.funding)
    d.push('Funding band changed from ' + gbp(local.funding) + ' to ' + gbp(remote.funding));

  if(remote.months && local.months && remote.months !== local.months)
    d.push('Duration changed from ' + local.months + ' to ' + remote.months + ' months');

  if(remote.level && remote.level !== local.level)
    d.push('Level changed from ' + local.level + ' to ' + remote.level);

  if(remote.version && versionNum(remote.version) !== versionNum(local.version))
    d.push('Updated to version ' + remote.version);

  if(remote.status && remote.status !== local.status)
    d.push('Status changed from ' + local.status + ' to ' + remote.status);

  if(remote.epa && remote.epa !== local.epa)
    d.push('Assessment: ' + remote.epa.toLowerCase());

  return d;
}

/* ---------- Reading and writing the block ---------- */

function parseLocal(block){
  const out = [];
  const re = /\{\s*(?:common:(true|false),\s*)?name:"((?:[^"\\]|\\.)*)"([\s\S]*?)\}/g;
  let m;

  while((m = re.exec(block)) !== null){
    const body = m[3];
    const get = (k, quoted) => {
      const r = new RegExp(k + ':' + (quoted ? '"((?:[^"\\\\]|\\\\.)*)"' : '(-?\\d+)'));
      const hit = body.match(r);
      return hit ? (quoted ? hit[1] : Number(hit[1])) : (quoted ? '' : 0);
    };
    out.push({
      common:  m[1] === 'true',
      name:    m[2],
      code:    get('code', true),
      level:   get('level', false),
      months:  get('months', false),
      funding: get('funding', false),
      route:   get('route', true),
      epa:     get('epa', true),
      status:  get('status', true),
      version: get('version', true),
      since:   get('since', true),
      changed: get('changed', true),
      article: get('article', true)
    });
  }
  return out;
}

function render(s){
  const q = v => '"' + String(v).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
  return '  { ' +
    (s.common ? 'common:true, ' : '') +
    'name:' + q(s.name) + ', code:' + q(s.code || '') +
    ', level:' + (s.level || 0) + ', months:' + (s.months || 0) +
    ', funding:' + (s.funding || 0) +
    ', route:' + q(s.route || '') + ', epa:' + q(s.epa || 'Assigned') +
    ', status:' + q(s.status || 'Approved') + ', version:' + q(s.version || '1.0') +
    ', since:' + q(s.since || today()) + ', changed:' + q(s.changed || '') +
    (s.article ? ', article:' + q(s.article) : '') +
  ' },';
}

function norm(s){ return String(s || '').toLowerCase().replace(/[^a-z0-9]/g, ''); }
function esc(s){ return String(s).replace(/</g, '&lt;'); }

/* ---------- The email ---------- */

function report(added, updated, missing){
  return '<div style="font-family:system-ui,sans-serif;max-width:640px;color:#152023">' +
    '<h2 style="font-size:20px;margin:0 0 6px">Register sync</h2>' +
    '<p style="color:#57676A;font-size:14px;margin:0 0 20px">' + today() +
    ' · the site has been updated and redeployed</p>' +

    (updated.length
      ? '<h3 style="font-size:15px;margin:0 0 10px">' + updated.length + ' updated</h3>' +
        '<table style="width:100%;border-collapse:collapse;border:1px solid #E4E0D6">' +
        updated.map(u =>
          '<tr><td style="padding:9px 12px;border-bottom:1px solid #E4E0D6">' +
          '<b>' + esc(u.name) + '</b>' + (u.code ? ' <span style="color:#8A9698">' + u.code + '</span>' : '') +
          '<div style="font-size:13px;color:#57676A;margin-top:3px">' + esc(u.diffs.join('. ')) + '</div>' +
          '</td></tr>').join('') + '</table>'
      : '') +

    (added.length
      ? '<h3 style="font-size:15px;margin:26px 0 10px">' + added.length + ' new on the register</h3>' +
        '<ul style="font-size:14px;color:#57676A;padding-left:18px">' +
        added.map(a => '<li>Level ' + a.level + ' ' + esc(a.name) +
          (a.code ? ' (' + a.code + ')' : '') + '</li>').join('') + '</ul>' +
        '<p style="font-size:13px;color:#8A9698">New entries have no route confirmed and no article. ' +
        'Worth checking these by hand.</p>'
      : '') +

    (missing.length
      ? '<h3 style="font-size:15px;margin:26px 0 10px">' + missing.length + ' no longer returned by the API</h3>' +
        '<ul style="font-size:14px;color:#57676A;padding-left:18px">' +
        missing.map(m => '<li>' + esc(m.name) + '</li>').join('') + '</ul>' +
        '<p style="font-size:13px;color:#8A9698">These were left on the site untouched. ' +
        'The API is in public beta, so an absence is more likely a glitch than a retirement. ' +
        'Check before removing anything.</p>'
      : '') +

  '</div>';
}
