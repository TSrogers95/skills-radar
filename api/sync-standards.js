/* =========================================================================
   JOB 2 — STANDARDS REGISTER SYNC

   Fetches the Skills England occupational maps API, compares it against the
   STANDARDS block in data.js, and commits any changes back to the repo.
   Committing triggers a Vercel redeploy, so the site updates itself.

   What it will and will not touch
     overwrites  level, duration, funding band, version, status, dates
     preserves   common, article, also, route — anything decided by a person
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

/* Pending switchovers are a separate population with a large standing
   baseline: at the time of writing about 180 live standards already have a
   successor version with a start date, so the first run that reads them
   stamps all of them at once. They cannot share the limit above without
   halting that backfill, and the limit above must not be raised, because its
   whole job is to catch the register changing shape. So they get their own,
   set well above the baseline but still low enough to catch a shape change. */
const PENDING_LIMIT = 400;

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
  const switchovers = [], undated = [], mismatched = [];
  const merged = [];
  const seen = new Set();

  /* The pending stamp a standard should carry after this run. Undated
     revisions are deliberately not written: without a date they cannot be
     placed on the feed, so they go in the email instead. */
  const pendingFields = r => {
    const p = r.next && r.next.dated ? r.next : null;
    return { pending: p ? p.text : '', pendingFrom: p ? p.from : '' };
  };

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
        article: '',
        ...pendingFields(r)
      });
      if(r.next && r.next.dated) switchovers.push({ name: r.name, code: r.code, from: r.next.from, text: r.next.text, was: '' });
      if(r.next && !r.next.dated) undated.push({ name: r.name, code: r.code, text: r.next.text });
      return;
    }

    seen.add(existing.name);

    /* Matched on code, but the register calls it something else entirely.
       That is not a rename, it is the wrong code on the record, and every
       run since has been writing another standard's level, duration and
       funding band underneath the stored name. Reported, never corrected
       automatically: the right code is a judgement call and changing one
       changes the page address. */
    if(existing.code && existing.code === r.code && !sameOccupation(existing.name, r.name)){
      mismatched.push({ code: r.code, siteName: existing.name, registerName: r.name,
                        level: r.level, months: r.months, funding: r.funding });
    }

    const diffs = compare(existing, r);
    const pf = pendingFields(r);

    /* A switchover appearing, moving its date, or falling away once it has
       taken effect is a change to the file in its own right, even when the
       approved version itself has not moved. */
    if((existing.pending || '') !== pf.pending || (existing.pendingFrom || '') !== pf.pendingFrom){
      switchovers.push({ name: existing.name, code: r.code, from: pf.pendingFrom,
                         text: pf.pending, was: existing.pending || '' });
    }
    if(r.next && !r.next.dated) undated.push({ name: existing.name, code: r.code, text: r.next.text });

    const base = {
      ...existing,                        // keep common, article, route
      code: r.code,                       // the register is the authority on codes
      level: r.level,
      months: r.months || existing.months,
      funding: r.funding || existing.funding,
      epa: r.epa, status: r.status,
      version: versionNum(r.version) === versionNum(existing.version)
        ? existing.version : r.version,
      ...pf
    };

    if(diffs.length){
      updated.push({ name: r.name, code: r.code, diffs: diffs });
      merged.push({ ...base, since: r.changedOn || existing.since || today(), changed: diffs.join('. ') });
    } else if((!existing.funding && r.funding) || (!existing.months && r.months)){
      // a blank filled in: take the value, leave the feed alone
      merged.push(base);
    } else {
      merged.push({ ...existing, ...pf });  // untouched, bar the pending stamp
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
  const moves = switchovers.length;

  if(total === 0 && moves === 0){
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

  if(moves > PENDING_LIMIT){
    await sendEmail('Skills Radar — register sync held back',
      '<p><b>' + moves + ' pending switchovers moved in one run</b>, which is above the limit of ' +
      PENDING_LIMIT + '. Nothing was committed.</p>' +
      '<p>The approved versions themselves moved on ' + total + ' standards, which is normal, so this ' +
      'is about the in-development records rather than the register proper. Most likely the API has ' +
      'changed how it reports a version in development. Run the job with <code>?dry=1</code> first.</p>');
    return res.status(200).json({ ok: false, heldBackPending: moves, committed: false });
  }

  if(dryRun){
    return res.status(200).json({
      ok: true, dryRun: true, added, updated,
      switchovers: switchovers, undatedRevisions: undated,
      mismatched: mismatched,
      missing: missing.map(m => m.name)
    });
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
    'Register sync ' + today() + ' — ' + added.length + ' new, ' + updated.length + ' updated' +
    (moves ? ', ' + moves + ' pending switchover' + (moves === 1 ? '' : 's') : ''));

  const headline = total
    ? total + ' standard' + (total === 1 ? '' : 's') + ' updated from the register'
    : moves + ' pending switchover' + (moves === 1 ? '' : 's') + ' recorded';

  await sendEmail('Skills Radar — ' + headline,
    report(added, updated, missing, switchovers, undated, mismatched));

  return res.status(200).json({
    ok: true, added: added.length, updated: updated.length,
    switchovers: moves, undatedRevisions: undated.length,
    mismatched: mismatched.length,
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

  /* Every record for a code, not just the chosen one, so the version in
     development can be read alongside the version being delivered now. */
  const group = {};
  rows.forEach(x => {
    const code = String(x.referenceNumber || '').trim();
    if(code) (group[code] = group[code] || []).push(x);
  });

  return pickCurrent(rows).map(x => {
    const s = shape(x);
    s.next = pendingFor(group[String(x.referenceNumber || '').trim()], x);
    return s;
  });
}

/* ---------- Pending switchovers ----------

   The register carries the NEXT version of a standard as its own record,
   status "In development", sitting alongside the approved one. pickCurrent
   throws those away, and rightly so: they are not what a provider starts
   someone on today. They are, though, the only advance warning the register
   gives. A band move or a duration change is visible here weeks or months
   before it takes effect, which is exactly the lead time a funding decision
   needs. So the sibling is read separately and the delta recorded against
   the standard rather than folded into "changed", which describes what has
   already happened.

   Only a dated switchover is written to the file. A revision with no start
   date cannot go on a calendar, so those are reported in the email instead. */

function isPending(s){ return /development|proposal/i.test(String(s.status || '')); }

function num(x, ...keys){
  for(const k of keys){
    const v = x[k];
    if(v !== undefined && v !== null && v !== '') return Number(v) || 0;
  }
  return 0;
}

function date10(v){
  const d = String(v || '').slice(0, 10);
  return (/^\d{4}-\d{2}-\d{2}$/.test(d) && d >= '2012-01-01') ? d : '';
}

function addDay(d){
  const t = Date.parse(d + 'T00:00:00Z');
  if(!t) return '';
  return new Date(t + 86400000).toISOString().slice(0, 10);
}

/* The delta between the version being delivered now and the one that
   replaces it, or null when the register is not holding a successor. */
function pendingFor(group, currentRaw){
  if(!group || !group.length) return null;

  const devs = group.filter(isPending);
  if(!devs.length) return null;

  /* More than one open revision is rare. Prefer one that carries a start
     date, then the most recently touched. */
  devs.sort((a, b) =>
    ((date10(b.earliestStartDate) ? 1 : 0) - (date10(a.earliestStartDate) ? 1 : 0)) ||
    String(b.changedDate || '').localeCompare(String(a.changedDate || '')));
  const dev = devs[0];

  /* The successor's own earliest start is the register saying the date
     outright. Failing that, the day after the current version closes to new
     starts says the same thing by implication. */
  const closes = date10(currentRaw.latestStartDate);
  let   from   = date10(dev.earliestStartDate) || (closes ? addDay(closes) : '');

  /* A date already behind us is not pending. The register does carry a few,
     either stale or a switchover that has since happened, and writing one
     would leave a permanent "upcoming" item that never arrives. Dropping it
     also means the stamp clears itself the week a switchover takes effect. */
  if(from && from <= today()) from = '';

  const curFund = num(currentRaw, 'maxFunding', 'fundingBandMaximum', 'maximumFunding');
  const devFund = num(dev,        'maxFunding', 'fundingBandMaximum', 'maximumFunding');
  const curMon  = num(currentRaw, 'typicalDuration', 'duration', 'typicalDurationMonths');
  const devMon  = num(dev,        'typicalDuration', 'duration', 'typicalDurationMonths');
  const curLvl  = num(currentRaw, 'level', 'standardLevel');
  const devLvl  = num(dev,        'level', 'standardLevel');

  const gbp = n => '\u00a3' + Number(n).toLocaleString('en-GB');
  const d = [];

  /* A successor carrying no band is not a free apprenticeship, it is a band
     nobody has agreed yet. That is the most useful line on this list: the
     figure can land late and move the business case after planning is done. */
  if(curFund && !devFund)
    d.push('Funding band not yet agreed for the new version, currently ' + gbp(curFund));
  else if(curFund && devFund && devFund !== curFund)
    d.push('Funding band ' + (devFund > curFund ? 'rising' : 'falling') +
           ' from ' + gbp(curFund) + ' to ' + gbp(devFund));

  if(curMon && devMon && devMon !== curMon)
    d.push('Duration ' + (devMon > curMon ? 'rising' : 'falling') +
           ' from ' + curMon + ' to ' + devMon + ' months');

  if(curLvl && devLvl && devLvl !== curLvl)
    d.push('Level moving from ' + curLvl + ' to ' + devLvl);

  /* No delta is still worth saying. Under the assessment reforms most of
     these carry a revised assessment plan and nothing else, and starts
     either side of the date cannot be moved between plans. */
  if(!d.length)
    d.push('New version replaces this one for new starts, same level, duration and funding band');

  return { from: from, text: d.join('. '), dated: !!from };
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
      article: get('article', true),
      also:    get('also', true),
      pending:     get('pending', true),
      pendingFrom: get('pendingFrom', true)
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
    (s.also ? ', also:' + q(s.also) : '') +
    (s.pending && s.pendingFrom
      ? ', pending:' + q(s.pending) + ', pendingFrom:' + q(s.pendingFrom) : '') +
  ' },';
}

function norm(s){ return String(s || '').toLowerCase().replace(/[^a-z0-9]/g, ''); }

/* Do two titles describe the same occupation? The register restyles names
   constantly (sentence case, hyphens for dashes, abbreviations spelled out),
   so an exact test is useless. Shared words are the signal: at least half of
   the shorter title's words appearing in the longer one means a rename, and
   much less than that means the code and the name have come apart. */
function sameOccupation(a, b){
  const words = s => new Set(String(s || '').toLowerCase().split(/[^a-z0-9]+/).filter(Boolean));
  const x = words(a), y = words(b);
  if(!x.size || !y.size) return true;
  const [small, big] = x.size <= y.size ? [x, y] : [y, x];
  let hit = 0;
  small.forEach(w => { if(big.has(w)) hit++; });
  return (hit / small.size) >= 0.5;
}
function esc(s){ return String(s).replace(/</g, '&lt;'); }

/* ---------- The email ---------- */

function report(added, updated, missing, switchovers, undated, mismatched){
  switchovers = switchovers || [];
  undated     = undated || [];
  mismatched  = mismatched || [];

  /* Lead time first. A band move four months out is more actionable than a
     version number that changed this morning, so it goes at the top. */
  const material = switchovers.filter(s => s.text && !/^New version replaces/i.test(s.text));
  const routine  = switchovers.filter(s => s.text && /^New version replaces/i.test(s.text));
  const lapsed   = switchovers.filter(s => !s.text);

  return '<div style="font-family:system-ui,sans-serif;max-width:640px;color:#152023">' +
    '<h2 style="font-size:20px;margin:0 0 6px">Register sync</h2>' +
    '<p style="color:#57676A;font-size:14px;margin:0 0 20px">' + today() +
    ' · the site has been updated and redeployed</p>' +

    (mismatched.length
      ? '<div style="border:2px solid #B4341F;padding:12px 14px;margin:0 0 22px">' +
        '<h3 style="font-size:15px;margin:0 0 4px;color:#B4341F">' + mismatched.length +
        ' standard' + (mismatched.length === 1 ? '' : 's') + ' where the name and the code disagree</h3>' +
        '<p style="font-size:13px;color:#57676A;margin:0 0 10px">The register holds a different ' +
        'occupation under this code, so the level, duration and funding band on the page belong to ' +
        'that one, not to the name above it. Nothing has been corrected: the right code is a ' +
        'judgement call and changing it changes the page address. Fix these by hand.</p>' +
        '<ul style="font-size:14px;color:#57676A;padding-left:18px;margin:0">' +
        mismatched.map(m => '<li><b>' + esc(m.siteName) + '</b> is on ' + esc(m.code) +
          ', which the register calls <b>' + esc(m.registerName) + '</b>' +
          ' (level ' + m.level + ', ' + m.months + ' months, \u00a3' +
          Number(m.funding || 0).toLocaleString('en-GB') + ')</li>').join('') +
        '</ul></div>'
      : '') +

    (material.length
      ? '<h3 style="font-size:15px;margin:0 0 4px">' + material.length +
        ' pending switchover' + (material.length === 1 ? '' : 's') + ' worth lead time</h3>' +
        '<p style="color:#57676A;font-size:13px;margin:0 0 10px">Taken from the version in ' +
        'development, so these have not happened yet.</p>' +
        '<table style="width:100%;border-collapse:collapse;border:1px solid #E4E0D6">' +
        material.sort((a, b) => String(a.from).localeCompare(String(b.from))).map(s =>
          '<tr><td style="padding:9px 12px;border-bottom:1px solid #E4E0D6">' +
          '<b>' + esc(s.name) + '</b>' + (s.code ? ' <span style="color:#8A9698">' + s.code + '</span>' : '') +
          ' <span style="color:#8A9698">from ' + esc(s.from) + '</span>' +
          '<div style="font-size:13px;color:#57676A;margin-top:3px">' + esc(s.text) + '</div>' +
          (s.was ? '<div style="font-size:12px;color:#8A9698;margin-top:2px">previously: ' + esc(s.was) + '</div>' : '') +
          '</td></tr>').join('') + '</table>'
      : '') +

    (routine.length
      ? '<h3 style="font-size:15px;margin:26px 0 6px">' + routine.length +
        ' version switchover' + (routine.length === 1 ? '' : 's') + ' with no change to the figures</h3>' +
        '<p style="font-size:13px;color:#8A9698;margin:0 0 10px">Revised assessment plan only. The ' +
        'compliance point is that starts either side of the date sit on different plans.</p>' +
        '<ul style="font-size:14px;color:#57676A;padding-left:18px">' +
        routine.sort((a, b) => String(a.from).localeCompare(String(b.from)))
          .map(s => '<li>' + esc(s.from) + ' — ' + esc(s.name) +
            (s.code ? ' (' + s.code + ')' : '') + '</li>').join('') + '</ul>'
      : '') +

    (lapsed.length
      ? '<h3 style="font-size:15px;margin:26px 0 10px">' + lapsed.length +
        ' switchover' + (lapsed.length === 1 ? '' : 's') + ' now taken effect</h3>' +
        '<p style="font-size:13px;color:#8A9698">The pending note has been cleared from these. ' +
        'If the new version changed anything, it will show in the updated list below.</p>' +
        '<ul style="font-size:14px;color:#57676A;padding-left:18px">' +
        lapsed.map(s => '<li>' + esc(s.name) + (s.code ? ' (' + s.code + ')' : '') + '</li>').join('') + '</ul>'
      : '') +

    (undated.length
      ? '<h3 style="font-size:15px;margin:26px 0 6px">' + undated.length +
        ' revision open with no start date</h3>' +
        '<p style="font-size:13px;color:#8A9698;margin:0 0 10px">Not written to the site, because ' +
        'there is no date to put on it. These are the ones to watch: a band that has not been agreed ' +
        'tends to land late.</p>' +
        '<ul style="font-size:14px;color:#57676A;padding-left:18px">' +
        undated.map(u => '<li><b>' + esc(u.name) + '</b>' + (u.code ? ' (' + u.code + ')' : '') +
          '<br><span style="font-size:13px">' + esc(u.text) + '</span></li>').join('') + '</ul>'
      : '') +

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
