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

const API   = 'https://occupational-maps-api.skillsengland.education.gov.uk/api/v1';
const PATH  = 'data.js';
const BEGIN = '/* STANDARDS:BEGIN';
const END   = '/* STANDARDS:END */';

/* Changes above this many standards in one run stop the job and email you
   instead of committing. A sudden mass change is far more likely to be the
   API changing shape than 200 standards moving overnight. */
const SAFETY_LIMIT = 60;

module.exports = async function handler(req, res){
  if(!authorised(req)) return res.status(401).json({ error: 'Unauthorised' });

  const key = process.env.SKILLS_ENGLAND_API_KEY;
  if(!key){
    return res.status(200).json({
      ok: false,
      skipped: 'No SKILLS_ENGLAND_API_KEY set. Request a key from ' +
               'https://occupational-maps.skillsengland.education.gov.uk/public-api/'
    });
  }

  const dryRun = req.query && req.query.dry === '1';

  /* ---- 1. Fetch the register ---- */

  let remote;
  try {
    remote = await fetchAll(key);
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
  if(!file) return res.status(500).json({ error: 'data.js not found in the repo' });

  const a = file.content.indexOf(BEGIN);
  const b = file.content.indexOf(END);
  if(a < 0 || b < 0) return res.status(500).json({ error: 'STANDARDS markers missing from data.js' });

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
    const existing = byCode[r.code] || byName[norm(r.name)];

    if(!existing){
      added.push(r);
      merged.push({
        common: false,
        name: r.name, code: r.code, level: r.level,
        months: r.months, funding: r.funding,
        route: r.route || guessRoute(r),
        epa: r.epa, status: r.status, version: r.version,
        since: today(),
        changed: 'New on the register',
        article: ''
      });
      return;
    }

    seen.add(existing.name);
    const diffs = compare(existing, r);

    if(diffs.length){
      updated.push({ name: r.name, code: r.code, diffs: diffs });
      merged.push({
        ...existing,                      // keep common, article, route
        level: r.level, months: r.months, funding: r.funding,
        epa: r.epa, status: r.status, version: r.version,
        since: today(),
        changed: diffs.join('. ')
      });
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

  const rebuilt =
    file.content.slice(0, a) +
    BEGIN + ' — the sync job rewrites everything between these two\n' +
    '   markers. Do not remove them. Hand-added fields (common, article) are\n' +
    '   preserved by the sync; machine fields are overwritten from the register.\n' +
    '   Last synced ' + today() + '. */\n' +
    'const STANDARDS = [\n' +
    merged.map(render).join('\n') + '\n];\n\n' +
    file.content.slice(b);

  const stamped = rebuilt
    .replace(/const DATA_UPDATED = "[\d-]+";/, 'const DATA_UPDATED = "' + today() + '";')
    .replace(/const DATA_SOURCE  = "[a-z]+";/, 'const DATA_SOURCE  = "sync";');

  await writeFile(PATH, stamped, file.sha,
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

async function fetchAll(key){
  const out = [];
  let page = 1;

  while(page <= 30){
    const url = API + '/Standards?page=' + page + '&pageSize=100';
    const r = await fetch(url, {
      headers: { 'Ocp-Apim-Subscription-Key': key, 'Accept': 'application/json' }
    });

    if(!r.ok) throw new Error('API returned ' + r.status + ' on page ' + page);

    const json = await r.json();
    const rows = Array.isArray(json) ? json : (json.standards || json.items || json.data || []);
    if(!rows.length) break;

    rows.forEach(x => out.push(shape(x)));
    if(rows.length < 100) break;
    page++;
  }
  return out;
}

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

  const status = String(pick('status', 'standardStatus', 'approvalStatus') || 'Approved');
  const epao   = pick('assessmentOrganisations', 'epaos', 'assessmentOrganisationCount');

  return {
    name:    String(pick('title', 'name', 'standardName') || '').trim(),
    code:    String(pick('referenceNumber', 'reference', 'standardReference', 'larsCode') || '').trim(),
    level:   Number(pick('level', 'standardLevel')) || 0,
    months:  Number(pick('typicalDuration', 'duration', 'typicalDurationMonths')) || 0,
    funding: Number(pick('maxFunding', 'fundingBand', 'maximumFunding', 'fundingBandMaximum')) || 0,
    version: String(pick('version', 'standardVersion') || '1.0'),
    route:   slugRoute(pick('route', 'routeName', 'route.name')),
    status:  status,
    epa:     epaStatus(status, epao)
  };
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

  if(remote.funding && remote.funding !== local.funding)
    d.push('Funding band changed from ' + gbp(local.funding) + ' to ' + gbp(remote.funding));

  if(remote.months && remote.months !== local.months)
    d.push('Duration changed from ' + local.months + ' to ' + remote.months + ' months');

  if(remote.level && remote.level !== local.level)
    d.push('Level changed from ' + local.level + ' to ' + remote.level);

  if(remote.version && remote.version !== local.version)
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
