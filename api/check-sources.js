/* =========================================================================
   JOB 1 — CHANGE DETECTION

   Fetches each source page, compares it against the version seen last time,
   and emails you when something moves. It does not change the site. It tells
   you to go and look.

   Runs on a schedule set in vercel.json. State lives in /state/sources.json
   in your repo, so you can see the history in your commit log.
   ========================================================================= */

const { readFile, writeFile, sendEmail, hash, normalise, authorised, today } = require('./_lib');

/* The pages worth watching, and why. Add to this list freely —
   anything with a stable URL and readable HTML works. */

const SOURCES = [
  { id: 'register',
    name: 'Skills England apprenticeship register',
    url: 'https://skillsengland.education.gov.uk/apprenticeships/',
    why: 'Standards approved, revised, paused or defunded',
    priority: 'high' },

  { id: 'rules-2627',
    name: 'Apprenticeship funding rules 2026/27',
    url: 'https://www.gov.uk/government/publications/apprenticeship-funding-rules-and-assessment-plan-guidance-2026-to-2027',
    why: 'A new version of the funding rules',
    priority: 'high' },

  { id: 'rules-changes',
    name: 'Summary of changes, 2026/27',
    url: 'https://www.gov.uk/government/publications/apprenticeship-funding-rules-and-assessment-plan-guidance-2026-to-2027/apprenticeship-funding-rules-summary-of-changes-version-1',
    why: 'What changed and in which version',
    priority: 'high' },

  { id: 'rules-index',
    name: 'All apprenticeship funding rules',
    url: 'https://www.gov.uk/guidance/apprenticeship-funding-rules',
    why: 'A new funding year published',
    priority: 'medium' },

  { id: 'streamlining',
    name: 'Streamlining apprenticeships',
    url: 'https://help.apprenticeships.education.gov.uk/hc/en-gb/articles/34005717182226-Streamlining-apprenticeships',
    why: 'A second defunding list — the highest-impact thing that could land',
    priority: 'high' },

  { id: 'growth-levy',
    name: 'Growth and Skills Levy',
    url: 'https://help.apprenticeships.education.gov.uk/hc/en-gb/articles/31398346955154-Budget-2025-Growth-and-Skills-Levy',
    why: 'Levy rates, expiry and co-investment',
    priority: 'high' },

  { id: 'assessment',
    name: 'Changes to apprenticeship assessment',
    url: 'https://www.gov.uk/government/publications/apprenticeship-funding-rules-2025-to-2026/changes-to-apprenticeship-assessment-2025-to-2026',
    why: 'Assessment plan reform progress',
    priority: 'medium' },

  { id: 'tlevels',
    name: 'T-Levels provider updates',
    url: 'https://support.tlevels.gov.uk/hc/en-gb/articles/33892267278994-T-Levels-update-10-March-2026',
    why: 'T-Level subjects, specialisms and placements',
    priority: 'medium' },

  { id: 'placements',
    name: 'T-Level industry placements guidance',
    url: 'https://www.gov.uk/government/publications/t-level-industry-placements-guidance-for-providers',
    why: 'The placement delivery framework',
    priority: 'medium' }
];

const STATE_PATH = 'state/sources.json';

module.exports = async function handler(req, res){
  if(!authorised(req)) return res.status(401).json({ error: 'Unauthorised' });

  const started = Date.now();
  const previous = await readFile(STATE_PATH);
  const state = previous ? JSON.parse(previous.content) : { checked: null, sources: {} };

  const changed = [], failed = [], unchanged = [];

  for(const src of SOURCES){
    try {
      const r = await fetch(src.url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SkillsRadarBot/1.0)' },
        redirect: 'follow'
      });

      if(!r.ok){ failed.push({ ...src, reason: 'HTTP ' + r.status }); continue; }

      const text = await r.text();
      const clean = normalise(text);

      // A page that comes back nearly empty usually means we were blocked or
      // the content is rendered by JavaScript. Flag it rather than treating
      // it as a change.
      if(clean.length < 400){
        failed.push({ ...src, reason: 'Page returned too little text to compare' });
        continue;
      }

      const h = await hash(clean);
      const before = state.sources[src.id];

      if(!before){
        state.sources[src.id] = { hash: h, size: clean.length, first: today(), last: today() };
        unchanged.push({ ...src, note: 'first check, baseline recorded' });
      } else if(before.hash !== h){
        const delta = clean.length - before.size;
        changed.push({
          ...src,
          since: before.last,
          delta: delta,
          direction: delta > 0 ? 'grew' : delta < 0 ? 'shrank' : 'reworded'
        });
        state.sources[src.id] = { hash: h, size: clean.length, first: before.first, last: today() };
      } else {
        unchanged.push(src);
      }
    } catch(err){
      failed.push({ ...src, reason: err.message });
    }
  }

  state.checked = new Date().toISOString();

  await writeFile(
    STATE_PATH,
    JSON.stringify(state, null, 2),
    previous ? previous.sha : null,
    'Source check ' + today() + (changed.length ? ' — ' + changed.length + ' changed' : ' — no changes')
  );

  // Silence when nothing moved. An alert that arrives every day gets ignored,
  // and then the one that matters gets ignored too.
  if(changed.length === 0 && failed.length === 0){
    return res.status(200).json({
      ok: true, changed: 0, unchanged: unchanged.length, emailed: false,
      ms: Date.now() - started
    });
  }

  await sendEmail(subject(changed, failed), body(changed, failed, unchanged));

  return res.status(200).json({
    ok: true,
    changed: changed.map(c => c.id),
    failed: failed.map(f => f.id),
    unchanged: unchanged.length,
    emailed: true,
    ms: Date.now() - started
  });
};

function subject(changed, failed){
  if(changed.length === 0) return 'Skills Radar — ' + failed.length + ' source could not be checked';
  const high = changed.filter(c => c.priority === 'high').length;
  return 'Skills Radar — ' + changed.length + ' source' + (changed.length === 1 ? '' : 's') +
    ' changed' + (high ? ' (' + high + ' high priority)' : '');
}

function body(changed, failed, unchanged){
  const row = c =>
    '<tr>' +
      '<td style="padding:10px 12px;border-bottom:1px solid #E4E0D6">' +
        '<a href="' + c.url + '" style="color:#0D1B1E;font-weight:600">' + c.name + '</a>' +
        '<div style="font-size:13px;color:#57676A;margin-top:3px">' + c.why + '</div>' +
      '</td>' +
      '<td style="padding:10px 12px;border-bottom:1px solid #E4E0D6;font-size:13px;color:#57676A;white-space:nowrap">' +
        (c.priority === 'high' ? '<b style="color:#B3261E">High</b><br>' : '') +
        c.direction + ' by ' + Math.abs(c.delta) + ' chars<br>' +
        'last seen ' + c.since +
      '</td>' +
    '</tr>';

  return '<div style="font-family:system-ui,sans-serif;max-width:640px;color:#152023">' +
    '<h2 style="font-size:20px;margin:0 0 6px">Skills Radar source check</h2>' +
    '<p style="color:#57676A;font-size:14px;margin:0 0 20px">' + today() + '</p>' +

    (changed.length
      ? '<h3 style="font-size:15px;margin:0 0 10px">Changed since the last check</h3>' +
        '<table style="width:100%;border-collapse:collapse;border:1px solid #E4E0D6">' +
        changed.map(row).join('') + '</table>' +
        '<p style="font-size:14px;color:#57676A;margin:18px 0 0">' +
        'The site has not changed. Open each page above, work out what moved, and update ' +
        '<code>data.js</code> if it matters. Remember to update <code>DATA_UPDATED</code> at the top.</p>'
      : '') +

    (failed.length
      ? '<h3 style="font-size:15px;margin:28px 0 10px">Could not be checked</h3>' +
        '<ul style="font-size:14px;color:#57676A;padding-left:18px">' +
        failed.map(f => '<li><a href="' + f.url + '">' + f.name + '</a> — ' + f.reason + '</li>').join('') +
        '</ul>' +
        '<p style="font-size:13px;color:#8A9698">' +
        'Repeated failures usually mean the page moved, or it now renders its content with JavaScript. ' +
        'Check the URL is still right.</p>'
      : '') +

    '<p style="font-size:13px;color:#8A9698;margin-top:28px;padding-top:14px;border-top:1px solid #E4E0D6">' +
    unchanged.length + ' other source' + (unchanged.length === 1 ? '' : 's') + ' unchanged. ' +
    'This job only watches — it never edits the site.</p>' +
  '</div>';
}
