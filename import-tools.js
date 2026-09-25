/* =========================================================================
   IMPORT TOOLS

   Was its own page at /import.html, now a tab inside the admin area so
   there is one protected entrance rather than two. Nothing about how the
   imports work has changed.

   Three tools:
     the Skills England register CSV  -> standards.js
     funding rules and documents      -> blocks to paste into data.js
     statistics from EES              -> standard-stats.js

   Everything runs in the browser. No file is uploaded anywhere.
   ========================================================================= */

let STANDARDS_FILE_SOURCE = '';
fetch('standards.js').then(r => r.text()).then(t => { STANDARDS_FILE_SOURCE = t; }).catch(() => {});

/* Markup that used to live in import.html, injected into the admin panel. */
function importToolHTML(){
  return '<div class="pagehead"><h1>Import data</h1>' +
    '<p>Everything runs in your browser. Nothing is uploaded anywhere.</p></div>' +

    '<div class="tabs" id="itabs" style="margin-bottom:8px">' +
      '<button data-view="standards" class="active">Standards CSV</button>' +
      '<button data-view="docs">Funding rules and documents</button>' +
      '<button data-view="stats">Starts and achievement rates</button>' +
    '</div>' +

    '<div id="view-standards">' +
      '<div class="notice" style="margin-bottom:18px"><b>Back up first. It takes ten seconds.</b> ' +
      'Open <code>standards.js</code> in your repo and note today&rsquo;s commit, or download the current file. ' +
      'If an import goes wrong, GitHub&rsquo;s History tab on that file lets you paste the previous version back ' +
      'and the site recovers in under a minute. Nothing here can break the site permanently — but knowing that ' +
      'in advance is worth more than finding out afterwards.</div>' +

      '<section class="lsection">' +
        '<div class="lhead"><h2>1. Download the CSV</h2>' +
        '<p>Open the register, scroll to <b>Download a list of apprenticeships</b>, and take the CSV of all standards.</p></div>' +
        '<p><a class="btn" href="https://skillsengland.education.gov.uk/apprenticeships/" target="_blank" rel="noopener" style="display:inline-block;text-decoration:none">Open the register &nearr;</a></p>' +
        '<div class="notice" style="margin-top:14px"><b>Where the button is.</b> ' +
        'Scroll past the search results to <b>Download a list of apprenticeships</b> near the foot of the page. ' +
        'Do not filter the list first — the importer needs the lot to work out what has changed.</div>' +
      '</section>' +

      '<section class="lsection">' +
        '<div class="lhead"><h2>2. Drop it here</h2><p>The file stays on your computer.</p></div>' +
        '<div class="dropzone" id="drop">' +
          '<input type="file" id="file" accept=".csv,text/csv" hidden>' +
          '<p class="dropmain">Drag the CSV here, or <button class="linkbtn" id="browse">choose a file</button></p>' +
          '<p class="dropsub">Expecting a file with a few thousand rows</p>' +
        '</div>' +
        '<div id="fileerr"></div>' +
        '<label class="announce">' +
          '<input type="checkbox" id="announce" checked>' +
          '<span><b>Announce standards that are new to the site in the feed</b>' +
          'On by default, which is right for a routine import. Untick it when backfilling a large batch ' +
          'that is new to the site but not new to the world.</span>' +
        '</label>' +
      '</section>' +
      '<div id="results"></div>' +
    '</div>' +

    '<div id="view-docs" hidden></div>' +
    '<div id="view-stats" hidden></div>';
}

/* Called by the admin page when the Import tab is opened. */
function renderImportTool(panel){
  panel.innerHTML = importToolHTML();

  panel.querySelectorAll('#itabs button').forEach(btn => {
    btn.addEventListener('click', () => {
      panel.querySelectorAll('#itabs button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const v = btn.dataset.view;
      document.getElementById('view-standards').hidden = v !== 'standards';
      document.getElementById('view-docs').hidden = v !== 'docs';
      document.getElementById('view-stats').hidden = v !== 'stats';
      if(v === 'docs')  renderDocsTool();
      if(v === 'stats') renderStatsTool();
    });
  });

  const drop = document.getElementById('drop');
  const fileInput = document.getElementById('file');

  document.getElementById('browse').addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', e => { if(e.target.files[0]) handle(e.target.files[0]); });

  ['dragenter','dragover'].forEach(ev =>
    drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.add('over'); }));
  ['dragleave','drop'].forEach(ev =>
    drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.remove('over'); }));
  drop.addEventListener('drop', e => { const f = e.dataTransfer.files[0]; if(f) handle(f); });
  drop.addEventListener('click', e => {
    if(e.target === drop || e.target.className === 'dropmain') fileInput.click();
  });

  document.getElementById('announce').addEventListener('change', () => {
    if(LAST_FILE) handle(LAST_FILE);
  });
}




/* =========================================================================
   ADMIN GATE

   Change ADMIN_PASSWORD to whatever you like. This is a front-of-house lock:
   it stops anyone stumbling in, but the check runs in the browser so the
   password is readable in the page source. Move the import behind real
   server-side auth before the site has users who might go looking.
   ========================================================================= */









/* ---------- Tabs ---------- */


/* =========================================================================
   CSV PARSING

   Handles quoted fields, embedded commas, escaped quotes and both line
   ending styles. Written out rather than pulled from a library so there is
   nothing to load and nothing to go stale.
   ========================================================================= */

function parseCSV(text){
  const rows = [];
  let row = [], field = '', inQuotes = false;

  if(text.charCodeAt(0) === 0xFEFF) text = text.slice(1);   // strip BOM

  for(let i = 0; i < text.length; i++){
    const c = text[i], next = text[i+1];

    if(inQuotes){
      if(c === '"' && next === '"'){ field += '"'; i++; }
      else if(c === '"'){ inQuotes = false; }
      else field += c;
    } else {
      if(c === '"'){ inQuotes = true; }
      else if(c === ','){ row.push(field); field = ''; }
      else if(c === '\r'){ /* ignore */ }
      else if(c === '\n'){ row.push(field); rows.push(row); row = []; field = ''; }
      else field += c;
    }
  }
  if(field.length || row.length){ row.push(field); rows.push(row); }
  return rows.filter(r => r.some(c => c.trim() !== ''));
}

/* =========================================================================
   COLUMN MATCHING

   Skills England can rename columns without warning, so rather than assume
   fixed positions we look for any header containing the right words.
   ========================================================================= */

const COLUMNS = {
  name:    ['title', 'standard name', 'apprenticeship', 'name'],
  code:    ['reference', 'standard reference', 'ifate reference', 'st reference', 'code'],
  level:   ['level'],
  months:  ['typical duration', 'duration'],
  funding: ['maximum funding', 'max funding', 'funding band maximum', 'funding band',
            'funding cap', 'maximum price', 'max price', 'band', 'funding'],
  version: ['version'],
  status:  ['status'],
  route:   ['route', 'sector'],
  approved:['approved for delivery', 'approved date', 'approval date'],
  /* The date the register itself last changed this standard. If the export
     has one, it can date changes without needing a previous import to
     compare against — which matters, because a first import has nothing to
     compare with. */
  updated: ['last updated', 'last changed', 'date updated', 'updated',
            'last modified', 'version date', 'revision date'],
  epao:    ['epao', 'assessment organisation', 'aao'],
  // Several standards carry options, pathways or occupational specialisms —
  // Mechatronics inside Engineering Technician, for instance. If the export
  // includes them under any of these headings they are picked up and become
  // searchable; if not, nothing breaks and the field stays empty.
  options: ['options', 'option', 'pathways', 'pathway', 'occupational specialisms',
            'specialisms', 'specialism', 'routes within standard']
};

function matchColumns(header){
  const lower = header.map(h => String(h).toLowerCase().trim());
  const found = {};

  for(const field in COLUMNS){
    let best = -1, bestScore = 0;
    lower.forEach((h, i) => {
      COLUMNS[field].forEach(want => {
        let score = 0;
        if(h === want) score = 10;
        else if(h.startsWith(want)) score = 6;
        else if(h.includes(want)) score = 3;
        if(score > bestScore){ bestScore = score; best = i; }
      });
    });
    if(best >= 0) found[field] = best;
  }
  return found;
}

/* =========================================================================
   TURNING ROWS INTO STANDARDS
   ========================================================================= */

/* One row of the before-and-after, with the direction called plainly. */
function compareRow(label, a, b){
  const diff = b - a;
  const tone = diff < 0 ? 'neg' : diff > 0 ? 'pos' : '';
  const note = diff === 0 ? 'no change'
    : (diff > 0 ? '+' : '') + diff.toLocaleString('en-GB');
  return '<tr><td class="nm">' + label + '</td>' +
    '<td class="num">' + a.toLocaleString('en-GB') + '</td>' +
    '<td class="num"><b>' + b.toLocaleString('en-GB') + '</b></td>' +
    '<td class="num ' + tone + '">' + note + '</td></tr>';
}

function fmtWhen(iso){
  const d = new Date(iso);
  return isNaN(d) ? '' : d.toLocaleDateString('en-GB', { month:'long', year:'numeric' });
}

function num(v){
  const n = String(v || '').replace(/[^\d.]/g, '');
  return n ? Math.round(parseFloat(n)) : 0;
}

function toISO(v){
  const s = String(v || '').trim();
  if(!s) return '';
  let m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);            if(m) return m[0];
  m = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);  // dd/mm/yyyy
  if(m) return m[3] + '-' + m[2].padStart(2,'0') + '-' + m[1].padStart(2,'0');
  const d = new Date(s);
  return isNaN(d) ? '' : d.toISOString().slice(0,10);
}

function versionNum(v){
  const parts = String(v || '1.0').split('.').map(x => parseInt(x, 10) || 0);
  return (parts[0] || 0) * 1000 + (parts[1] || 0);
}

function slugRoute(name){
  const n = String(name || '').toLowerCase();
  if(n.includes('agricultur')) return 'agriculture';
  if(n.includes('business')) return 'business-administration';
  if(n.includes('care service')) return 'care-services';
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

/* The CSV carries one row per version, including retired ones. We keep only
   the newest live version of each standard, which is what the site shows. */

/* How long a standard counts as recently changed when we are going on the
   register's own date rather than a comparison. */
const RECENT_MONTHS = 12;

function recentlyUpdated(iso){
  if(!iso) return false;
  const days = (Date.now() - new Date(iso).getTime()) / 86400000;
  return days >= 0 && days <= RECENT_MONTHS * 31;
}

function build(rows, cols){
  const byCode = {};
  let skippedRetired = 0, skippedBlank = 0;

  rows.forEach(r => {
    const get = f => cols[f] !== undefined ? String(r[cols[f]] || '').trim() : '';

    const name = get('name');
    const code = get('code').toUpperCase();
    if(!name || !code){ skippedBlank++; return; }

    const status = get('status') || 'Approved';
    if(/^retired|^withdrawn/i.test(status)){ skippedRetired++; return; }

    const opts = get('options');
    const updated = toISO(get('updated'));

    const rec = {
      name:    name,
      code:    code,
      raw:     status,
      options: opts ? opts.split(/[;|\n]|,(?=\s*[A-Z])/).map(x => x.trim()).filter(Boolean) : [],
      level:   num(get('level')),
      months:  num(get('months')),
      funding: num(get('funding')),
      version: get('version') || '1.0',
      status:  tidyStatus(status),
      route:   slugRoute(get('route')),
      since:   toISO(get('approved')),
      updated: updated,
      epao:    get('epao')
    };

    const held = byCode[code];
    if(!held || versionNum(rec.version) > versionNum(held.version)) byCode[code] = rec;
  });

  return { list: Object.values(byCode), skippedRetired: skippedRetired, skippedBlank: skippedBlank };
}

/* The CSV and the site word the same status differently. Without this, every
   single standard reports a status change and the real ones get buried. */
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

function epaFrom(rec){
  if(rec.months === 0 || /^AU/.test(rec.code)) return 'Not applicable (unit)';
  if(/development|proposal/i.test(rec.status)) return 'Pending — standard in development';
  if(/waiting/i.test(rec.raw || '') || /waiting/i.test(rec.epao || '')) return 'Waiting for an assessment organisation';
  return 'Assigned';
}

/* =========================================================================
   MERGING WITH WHAT IS ALREADY THERE

   The hand-written fields are the point of the site. They survive.
   ========================================================================= */

let ANNOUNCE_NEW = true;

function merge(imported){
  const byCode = {}, byName = {};
  STANDARDS.forEach(s => {
    if(s.code) byCode[s.code] = s;
    byName[s.name.toLowerCase().replace(/[^a-z0-9]/g,'')] = s;
  });

  const added = [], updated = [], unchanged = [], kept = [];
  const seen = new Set();
  const out = [];

  imported.forEach(r => {
    const old = byCode[r.code] || byName[r.name.toLowerCase().replace(/[^a-z0-9]/g,'')];
    const epa = epaFrom(r);

    if(!old){
      added.push(r);
      out.push({
        common: false, name: r.name, code: r.code, level: r.level,
        months: r.months, funding: r.funding, route: r.route,
        epa: epa, status: r.status, version: r.version,
        since: r.updated || new Date().toISOString().slice(0,10),
        approved: r.since || '',
        /* Three ways a standard new to this site can still be news:
           the register says it changed recently, it is losing funding, or
           you asked for new additions to be announced. */
        changed: recentlyUpdated(r.updated)
            ? 'Updated on the register ' + fmtWhen(r.updated)
            : (ANNOUNCE_NEW ? 'New on the register' : ''),
        article: '',
        options: r.options || []
      });
      return;
    }

    seen.add(old.name);
    const diffs = [];
    const gbp = n => '£' + Number(n).toLocaleString('en-GB');

    if(r.funding && r.funding !== old.funding) diffs.push('Funding band changed from ' + gbp(old.funding) + ' to ' + gbp(r.funding));
    if(r.months  && r.months  !== old.months)  diffs.push('Duration changed from ' + old.months + ' to ' + r.months + ' months');
    if(r.level   && r.level   !== old.level)   diffs.push('Level changed from ' + old.level + ' to ' + r.level);
    if(r.version && r.version !== old.version) diffs.push('Updated to version ' + r.version);
    if(r.status  && r.status  !== old.status)  diffs.push('Status changed from ' + old.status + ' to ' + r.status);

    if(diffs.length){
      updated.push({ name: r.name, code: r.code, diffs: diffs });
      out.push({
        ...old,                                   // keeps common, article
        level: r.level || old.level,
        months: r.months || old.months,
        funding: r.funding || old.funding,
        route: r.route || old.route,
        epa: epa, status: r.status, version: r.version,
        /* The date a change was SPOTTED, not the date the standard was
           approved. "since" drives how long an item stays in the feed, and
           the approval date is often years old — using it made a six-month
           window throw away changes found this morning. */
        since: new Date().toISOString().slice(0,10),
        approved: r.since || old.approved || '',
        changed: diffs.join('. '),
        options: (r.options && r.options.length) ? r.options : (old.options || [])
      });
    } else {
      unchanged.push(old);
      out.push(old);
    }
  });

  // Anything we hold that the CSV does not mention stays. A standard missing
  // from an export is more likely a filter than a fact.
  STANDARDS.forEach(s => {
    if(seen.has(s.name)) return;
    if(imported.some(r => r.code && r.code === s.code)) return;
    kept.push(s);
    out.push(s);
  });

  out.sort((a,b) => (a.route || 'zz').localeCompare(b.route || 'zz') ||
                    a.level - b.level || a.name.localeCompare(b.name));

  return { out: out, added: added, updated: updated, unchanged: unchanged, kept: kept };
}

/* =========================================================================
   OUTPUT
   ========================================================================= */

function render(s){
  /* JSON.stringify rather than a hand-rolled escape. The previous version
     handled quotes and backslashes but not newlines, and CSV fields often
     contain them — one such name produced an unterminated string, which
     stopped the whole file parsing and left the site with no register at
     all. This cannot have that failure. */
  const q = v => JSON.stringify(String(v == null ? '' : v));
  return '  { ' + (s.common ? 'common:true, ' : '') +
    'name:' + q(s.name) + ', code:' + q(s.code || '') +
    ', level:' + (s.level||0) + ', months:' + (s.months||0) + ', funding:' + (s.funding||0) +
    ', route:' + q(s.route || '') + ', epa:' + q(s.epa || 'Assigned') +
    ', status:' + q(s.status || 'Approved') + ', version:' + q(s.version || '1.0') +
    ', since:' + q(s.since || '') +
    (s.approved ? ', approved:' + q(s.approved) : '') +
    ', changed:' + q(s.changed || '') +
    (s.article ? ', article:' + q(s.article) : '') +
    (s.options && s.options.length ? ', options:[' + s.options.map(q).join(',') + ']' : '') + ' },';
}

function block(list){
  return '/* STANDARDS:BEGIN — the sync job rewrites everything between these two\n' +
    '   markers. Do not remove them. Hand-added fields (common, article) are\n' +
    '   preserved by the sync; machine fields are overwritten from the register.\n' +
    '   Imported from the Skills England CSV on ' + new Date().toISOString().slice(0,10) + '. */\n' +
    'const STANDARDS = [\n' + list.map(render).join('\n') + '\n];\n';
}

/* =========================================================================
   THE PAGE
   ========================================================================= */




function fail(msg){
  document.getElementById('fileerr').innerHTML =
    '<div class="alert" style="margin-top:14px"><b>That did not work.</b> ' + msg + '</div>';
  document.getElementById('results').innerHTML = '';
}

let LAST_FILE = null;

function handle(file){
  LAST_FILE = file;
  document.getElementById('fileerr').innerHTML = '';
  document.getElementById('results').innerHTML =
    '<div class="lsection"><p style="color:var(--text-2)">Reading ' + file.name + '…</p></div>';

  const reader = new FileReader();
  reader.onerror = () => fail('The file could not be read.');
  reader.onload = () => {
    try { process(reader.result, file); }
    catch(err){ fail(err.message); }
  };
  reader.readAsText(file);
}

function process(text, file){
  ANNOUNCE_NEW = document.getElementById('announce').checked;
  const rows = parseCSV(text);
  if(rows.length < 2) throw new Error('That file has no rows in it.');

  const cols = matchColumns(rows[0]);
  const missing = ['name','code','level'].filter(f => cols[f] === undefined);
  if(missing.length){
    throw new Error('Could not find a column for: ' + missing.join(', ') +
      '. The header row reads: ' + rows[0].slice(0,12).join(' | '));
  }

  const built = build(rows.slice(1), cols);
  if(built.list.length < 100){
    throw new Error('Only ' + built.list.length + ' standards were read, which is far too few. ' +
      'Check you downloaded the unfiltered list of all standards.');
  }

  const m = merge(built.list);
  show(rows, cols, built, m, file);
}

function show(rows, cols, built, m, file){
  const code = block(m.out);
  const noRoute = m.out.filter(s => !s.route).length;
  const noBand = m.out.filter(s => !s.funding).length;
  const noBaseline = (typeof STANDARDS === 'undefined' || !STANDARDS.length);
  const withChange = m.out.filter(s => s.changed && s.changed.trim() !== '').length;

  /* =====================================================================
     THE REGRESSION GUARD

     An import can quietly destroy the thing the site exists for. It happened:
     a file that looked fine took the feed from 358 changes to 6, and nothing
     said so until it was live.

     So before anything is offered for download, compare what you have now
     against what this file would give you. If it is materially worse, say so
     loudly and make the download deliberate rather than accidental.
     ===================================================================== */

  const before = {
    standards: (typeof STANDARDS !== 'undefined' ? STANDARDS.length : 0),
    changes:   (typeof STANDARDS !== 'undefined' ? STANDARDS.filter(s => s.changed && s.changed.trim() !== '').length : 0),
    banded:    (typeof STANDARDS !== 'undefined' ? STANDARDS.filter(s => s.funding > 0).length : 0)
  };
  const after = {
    standards: m.out.length,
    changes:   withChange,
    banded:    m.out.filter(s => s.funding > 0).length
  };

  const losses = [];
  if(before.changes > 20 && after.changes < before.changes * 0.5)
    losses.push('Changes in the feed would fall from ' + before.changes.toLocaleString('en-GB') +
      ' to ' + after.changes.toLocaleString('en-GB') + '. The feed is the point of the site.');
  if(before.banded > 20 && after.banded < before.banded * 0.5)
    losses.push('Standards with a funding band would fall from ' + before.banded.toLocaleString('en-GB') +
      ' to ' + after.banded.toLocaleString('en-GB') + '. The funding column has probably not been matched.');
  if(before.standards > 50 && after.standards < before.standards * 0.6)
    losses.push('The register would shrink from ' + before.standards.toLocaleString('en-GB') +
      ' standards to ' + after.standards.toLocaleString('en-GB') + '.');

  const risky = losses.length > 0;

  /* Check the block actually parses before anything is offered for download.
     A single bad character used to produce a file that looked fine, uploaded
     fine, and left the live site with no register at all. Declared here
     because the summary below reports on it. */
  let parseError = null, parsedCount = 0;
  try {
    parsedCount = new Function(code + '\n; return STANDARDS.length;')();
  } catch(err){
    parseError = err.message;
  }

  const colTable = Object.keys(COLUMNS).map(f =>
    '<tr><td class="nm">' + f + '</td><td>' +
    (cols[f] !== undefined
      ? '<b>' + (rows[0][cols[f]] || '') + '</b>'
      : '<span style="color:var(--text-3)">not found — left as it was</span>') +
    '</td></tr>').join('');

  document.getElementById('results').innerHTML =
    '<section class="lsection">' +
      '<div class="lhead"><h2>3. What was in the file</h2>' +
      '<p>' + file.name + ' · ' + (rows.length - 1).toLocaleString('en-GB') + ' rows</p></div>' +
      '<div class="mgrid">' +
        '<div class="mcard"><div class="n">' + m.out.length.toLocaleString('en-GB') + '</div><div class="l">Standards after import</div></div>' +
        '<div class="mcard cool"><div class="n">' + m.added.length.toLocaleString('en-GB') + '</div><div class="l">New to the site' +
          (ANNOUNCE_NEW ? ' — going in the feed' : ' — not in the feed') + '</div></div>' +
        '<div class="mcard warm"><div class="n">' + m.updated.length + '</div><div class="l">Updated</div></div>' +
        '<div class="mcard"><div class="n">' + built.skippedRetired.toLocaleString('en-GB') + '</div><div class="l">Retired versions skipped</div></div>' +
        '<div class="mcard cool"><div class="n">' + m.out.filter(s => s.options && s.options.length).length.toLocaleString('en-GB') +
          '</div><div class="l">With pathways or options</div></div>' +
        '<div class="mcard warm"><div class="n">' + m.out.filter(s => !s.funding).length.toLocaleString('en-GB') +
          '</div><div class="l">No funding band</div></div>' +
      '</div>' +

      '<div class="grouphead" style="margin-top:26px"><h2>Columns matched</h2><div class="rule"></div></div>' +
      '<table class="std levytable" style="margin-top:12px"><tbody>' + colTable + '</tbody></table>' +
    '</section>' +

    '<section class="lsection costs">' +
      '<div class="lhead"><h2>What this will do</h2>' +
      '<p>Nothing has changed yet. Read this before you copy anything.</p></div>' +

      (m.out.filter(s => !s.funding).length
        ? '<div class="notice"><b>' + m.out.filter(s => !s.funding).length.toLocaleString('en-GB') +
          ' standards came in with no funding band.</b> ' +
          'That is usually correct rather than a fault: a standard still in development, in proposal, or ' +
          'retired has no band assigned, and some occupational entries are not funded apprenticeships at all. ' +
          'The site shows these as &ldquo;Not set&rdquo; rather than &pound;0. ' +
          'If a standard you deliver is in this list, check it on the register — if it has a band there, the ' +
          'CSV column may not have been picked up, and the column table above will show which heading was matched.</div>'
        : '') +

      '<div class="okbox"><b>Defunding is safe.</b> ' +
        'The sixteen standards losing funding in September are held separately in <code>defunded.js</code> and ' +
        'applied over the register every time the site loads. The register CSV does not carry defunding, so ' +
        'without that they would be reset to Approved by this import.</div>' +

      '<div class="okbox"><b>Your written work is kept.</b> ' +
        m.out.filter(s => s.common).length + ' commonly-delivered flags and ' +
        m.out.filter(s => s.article).length + ' article links carried across. ' +
        m.kept.length + ' standard' + (m.kept.length === 1 ? '' : 's') +
        ' not in the CSV were left in place rather than deleted.</div>' +

      (noRoute
        ? '<div class="alert"><b>' + noRoute + ' standards have no route.</b> ' +
          'Either the CSV has no route column, or its route names did not match. ' +
          'They will still appear in search and on the members page, but they will not group under a route on the standards page.</div>'
        : '') +

      (ANNOUNCE_NEW && m.added.length > 100
        ? '<div class="alert"><b>' + m.added.length.toLocaleString('en-GB') + ' standards are new to the site, and all of them would go into the feed.</b> ' +
          'That is almost certainly a backfill rather than ' + m.added.length.toLocaleString('en-GB') + ' new occupations, and it would bury the ' +
          m.updated.length + ' genuine change' + (m.updated.length === 1 ? '' : 's') + ' this import found. ' +
          'Untick the box above for this one import, then leave it ticked from here on.</div>'
        : '') +

      '<div class="okbox" style="margin-top:14px"><b>What reaches the feed.</b> ' +
        m.updated.length + ' changed standard' + (m.updated.length === 1 ? '' : 's') +
        ' will appear in both the public feed and members\' feeds automatically, each with a ' +
        '&ldquo;what changed&rdquo; label worked out from the difference. ' +
        (ANNOUNCE_NEW
          ? 'The ' + m.added.length + ' new standards will appear too, labelled Newly approved.'
          : 'The ' + m.added.length + ' new standards will be searchable and selectable but will not appear in the feed — tick the box above if you want them announced.') +
      '</div>' +

      (m.updated.length
        ? '<div class="grouphead" style="margin-top:24px"><h2>Changes it found</h2><div class="rule"></div></div>' +
          '<div style="max-height:320px;overflow-y:auto;border:1px solid var(--line);margin-top:12px">' +
          '<table class="std"><tbody>' +
          m.updated.slice(0, 200).map(u =>
            '<tr><td class="nm">' + u.name + '<small>' + u.code + '</small></td>' +
            '<td style="font-size:13px">' + u.diffs.join('. ') + '</td></tr>').join('') +
          '</tbody></table></div>' +
          (m.updated.length > 200 ? '<p class="hint">Showing the first 200 of ' + m.updated.length + '.</p>' : '') +
          '<p style="font-size:14px;color:var(--text-2);margin-top:14px">' +
          'Each of these becomes an item in the feed automatically, with its urgency worked out from what changed.</p>'
        : '') +
    '</section>' +

    (risky
      ? '<section class="lsection"><div class="alert" style="border-left-width:4px">' +
        '<b>Do not upload this file.</b><br>' +
        'It would make the site worse than it is now:' +
        '<ul style="margin:10px 0 0;padding-left:18px">' +
          losses.map(l => '<li>' + l + '</li>').join('') +
        '</ul>' +
        '<p style="margin:12px 0 0">Check the column table above first — a heading that has not been matched ' +
        'is the usual cause. Nothing has changed on your site; you can close this and try a different file.</p>' +
        '</div></section>'
      : '') +

    '<section class="lsection">' +
      '<div class="lhead"><h2>Before and after</h2>' +
      '<p>What your site holds now, against what this file would give it.</p></div>' +
      '<table class="std levytable"><thead><tr><th></th><th class="r">Now</th><th class="r">After this import</th><th></th></tr></thead><tbody>' +
        compareRow('Standards', before.standards, after.standards) +
        compareRow('With a recorded change', before.changes, after.changes) +
        compareRow('With a funding band', before.banded, after.banded) +
      '</tbody></table>' +
    '</section>' +

    (noBaseline
      ? '<section class="lsection"><div class="alert"><b>There is nothing to compare against.</b> ' +
        'The register currently loaded in this browser is empty, so every standard in your file looks new ' +
        'and no changes can be detected by comparison. ' +
        'If your live <code>standards.js</code> is broken, fix that first — otherwise this import will ' +
        'produce a register with no change history at all.<br><br>' +
        (withChange
          ? '<b>The good news:</b> ' + withChange.toLocaleString('en-GB') + ' standards carry a recent date in ' +
            'the file itself, so they will appear in the feed regardless.'
          : '<b>And the file has no date column either</b>, so nothing will appear in the feed. ' +
            'Tick &ldquo;announce standards that are new to the site&rdquo; above to populate it.') +
        '</div></section>'
      : '') +

    (noBand === m.out.length && m.out.length
      ? '<section class="lsection"><div class="alert"><b>No standard has a funding band.</b> ' +
        'The funding column was not matched. Look at the column table above — if it says &ldquo;not found&rdquo; ' +
        'next to <code>funding</code>, tell me the exact heading your file uses and it can be added. ' +
        'The site will show every band as &ldquo;Not yet set&rdquo; until this is sorted.</div></section>'
      : '') +

    (parseError
      ? '<section class="lsection"><div class="alert"><b>This file will not load, so it is not safe to upload.</b><br>' +
        parseError.replace(/</g,'&lt;') + '<br><br>' +
        'Something in the CSV has produced invalid JavaScript. Tell me what the error says and it can be fixed — ' +
        'do not upload this file, or the site will lose its register entirely.</div></section>'
      : '<div class="okbox" style="margin-top:22px"><b>Checked.</b> ' +
        'The generated file parses and holds ' + parsedCount.toLocaleString('en-GB') + ' standards.</div>') +

    '<section class="lsection">' +
      '<div class="lhead"><h2>4. Put it into the site</h2>' +
      '<p>Download the new register file, or copy just the standards block.</p></div>' +
      '<div class="addrow">' +
        '<button class="btn' + (risky ? ' danger' : '') + '" id="dl"' + (parseError ? ' disabled' : '') + '>' +
          (risky ? 'Download anyway' : 'Download standards.js') + '</button>' +
        '<button class="btn small" id="copy"' + (parseError ? ' disabled' : '') + '>Copy the standards block</button>' +
      '</div>' +
      '<div class="okbox" style="margin-bottom:14px"><b>The review date updates itself.</b> ' +
      'The download carries today\'s date as the register stamp, so the home page will read ' +
      '&ldquo;Data reviewed ' + new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'}) +
      '&rdquo; once this is live. Nothing to change by hand.</div>' +

      '<div class="notice" style="margin-top:18px"><b>This only ever writes standards.js.</b> ' +
      'Upload it to GitHub in place of the current <code>standards.js</code>, commit, and Vercel redeploys in about thirty seconds. ' +
      '<code>data.js</code> is never touched, so nothing you or anyone else has written — articles, milestones, ' +
      'rules, routes — can be overwritten by an import. If a result looks wrong, revert the commit and you are back where you started.</div>' +
    '</section>';

  // Rebuild standards.js, keeping its header comment and replacing only the
  // block between the markers. data.js is never opened.
  const today = new Date().toISOString().slice(0,10);

  let header = STANDARDS_FILE_SOURCE
    ? STANDARDS_FILE_SOURCE.slice(0, STANDARDS_FILE_SOURCE.indexOf('/* STANDARDS:BEGIN'))
    : '';

  // Move the register's own date stamp on, so the home page shows the import
  // rather than the last time data.js was edited.
  if(/const STANDARDS_UPDATED = "[\d-]+";/.test(header)){
    header = header
      .replace(/const STANDARDS_UPDATED = "[\d-]+";/, 'const STANDARDS_UPDATED = "' + today + '";')
      .replace(/const STANDARDS_SOURCE  = "[a-z]+";/, 'const STANDARDS_SOURCE  = "import";');
  } else {
    header += 'const STANDARDS_UPDATED = "' + today + '";\n' +
              'const STANDARDS_SOURCE  = "import";\n\n';
  }

  const full = header + code + '\n/* STANDARDS:END */\n';

  document.getElementById('dl').addEventListener('click', () => {
    if(risky && !confirm('This import would make the site worse:\n\n' + losses.join('\n\n') +
      '\n\nDownload it anyway?')) return;

    const blob = new Blob([full], { type: 'text/javascript' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'standards.js';
    a.click();
    URL.revokeObjectURL(a.href);
  });

  document.getElementById('copy').addEventListener('click', () => {
    navigator.clipboard.writeText(code);
    document.getElementById('copy').textContent = 'Copied';
    setTimeout(() => { document.getElementById('copy').textContent = 'Copy the standards block'; }, 1600);
  });

  document.getElementById('results').scrollIntoView({ behavior:'smooth', block:'start' });
}

/* =========================================================================
   DOCUMENTS TOOL

   For everything that is not the standards CSV: a new funding rules year, a
   new version of the current rules, or any guidance worth linking. It writes
   the data entry for you rather than asking you to edit JavaScript by hand.
   ========================================================================= */

function renderDocsTool(){
  const el = document.getElementById('view-docs');
  if(el.dataset.built) return;
  el.dataset.built = '1';

  el.innerHTML =
    '<section class="lsection">' +
      '<div class="lhead"><h2>What do you want to add?</h2>' +
      '<p>Fill in the form and copy the result into <code>data.js</code>. Each option tells you exactly where it goes.</p></div>' +
      '<div class="tabs" id="dkind">' +
        '<button data-k="related" class="active">A guidance document</button>' +
        '<button data-k="rules">A new funding rules year</button>' +
        '<button data-k="change">A rule change</button>' +
        '<button data-k="feed">A feed update</button>' +
      '</div>' +
    '</section>' +
    '<div id="dform"></div>' +

    '<section class="lsection">' +
      '<div class="lhead"><h2>Other files worth having</h2>' +
      '<p>Direct downloads. None of these need a key or a sign-in.</p></div>' +
      '<div class="dllist">' +
        '<div class="dlrow"><div class="dlmain"><b>APAR — provider and assessment register</b>' +
          '<span>Every organisation eligible to deliver funded apprenticeship training: UKPRN, legal name, route, and whether they are currently permitted to recruit.</span></div>' +
          '<a class="btn small" href="https://download.apprenticeships.education.gov.uk/apar" target="_blank" rel="noopener">Open download page</a></div>' +

        '<div class="dlrow"><div class="dlmain"><b>Off-the-job minimum requirements (Annex C)</b>' +
          '<span>The published minimum hours per standard. Already loaded into the site as otj-minimums.js — replace that file when a new version is issued.</span></div>' +
          '<a class="btn small" href="https://www.gov.uk/government/publications/apprenticeship-funding-rules-2025-to-2026" target="_blank" rel="noopener">Open publication</a></div>' +

        '<div class="dlrow"><div class="dlmain"><b>2026/27 funding rules and summary of changes</b>' +
          '<span>The rules themselves and the official list of what changed in each version.</span></div>' +
          '<a class="btn small" href="https://www.gov.uk/government/publications/apprenticeship-funding-rules-and-assessment-plan-guidance-2026-to-2027" target="_blank" rel="noopener">Open publication</a></div>' +

        '<div class="dlrow"><div class="dlmain"><b>Find an end-point assessment organisation</b>' +
          '<span>EPAOs were separated out of APAR in December 2024 and live here now. This is the list that says definitively which standards have nobody appointed.</span></div>' +
          '<a class="btn small" href="https://www.gov.uk/guidance/find-an-end-point-assessment-organisation" target="_blank" rel="noopener">Open service</a></div>' +
      '</div>' +
    '</section>';

  el.querySelectorAll('#dkind button').forEach(b =>
    b.addEventListener('click', () => {
      el.querySelectorAll('#dkind button').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      docForm(b.dataset.k);
    }));

  docForm('related');
}

const DOC_FORMS = {
  related: {
    title: 'Add a guidance document',
    where: 'Goes in the OTHER_DOCS list in data.js. Appears on the Links tab of the rules page.',
    fields: [
      { id:'name', label:'Document title', ph:'Apprenticeship technical funding guide' },
      { id:'url',  label:'Link', ph:'https://www.gov.uk/...' },
      { id:'note', label:'Why someone would open it', ph:'How payments are calculated — instalments, the completion payment, and breaks.', area:true }
    ],
    build: v => 'Add this inside the OTHER_DOCS = [ ... ] list:\n\n' +
      '  { name:' + q(v.name) + ', url:' + q(v.url) + ',\n' +
      '    note:' + q(v.note) + ' },'
  },

  rules: {
    title: 'Replace the current funding rules year',
    where: 'Replaces the RULES_DOC block in data.js. Move the outgoing year into OTHER_DOCS first, using the tab beside this one.',
    fields: [
      { id:'title',   label:'Full title', ph:'Apprenticeship funding rules: August 2027 to July 2028' },
      { id:'version', label:'Version and date', ph:'Version 1, published 15 June 2027' },
      { id:'applies', label:'Who it applies to', ph:'Apprenticeships starting on or after 1 August 2027' },
      { id:'landing', label:'GOV.UK publication page', ph:'https://www.gov.uk/government/publications/...' },
      { id:'changes', label:'Summary of changes page', ph:'https://www.gov.uk/government/publications/.../summary-of-changes' },
      { id:'owner',   label:'Published by', ph:'Department for Work and Pensions' }
    ],
    build: v => 'Replace the whole RULES_DOC = { ... } block with this:\n\n' +
      'const RULES_DOC = {\n' +
      '  title: ' + q(v.title) + ',\n' +
      '  version: ' + q(v.version) + ',\n' +
      '  applies: ' + q(v.applies) + ',\n' +
      '  landing: ' + q(v.landing) + ',\n' +
      '  changes: ' + q(v.changes) + ',\n' +
      '  collection: "https://www.gov.uk/government/collections/funding-rules-for-apprenticeships",\n' +
      '  guidance: "https://www.gov.uk/guidance/apprenticeship-funding-rules",\n' +
      '  owner: ' + q(v.owner || 'Department for Work and Pensions') + ',\n' +
      '  licence: "Crown copyright, licensed under the Open Government Licence v3.0"\n' +
      '};'
  },

  feed: {
    title: 'Add an update to the feed',
    where: 'Goes in the UPDATES list in data.js. Appears on the home feed, and in members\' feeds if it is a funding rule or levy change.',
    fields: [
      { id:'title',   label:'Headline', ph:'2027 to 2028 apprenticeship funding rules published' },
      { id:'summary', label:'One or two sentences', ph:'The next funding year\'s rules are published separately. Which set applies depends on each apprentice\'s start date.', area:true },
      { id:'date',    label:'Date it takes effect, or was published', ph:'2027-08-01', hint:'Written as YYYY-MM-DD. A future date puts it in the Upcoming row.' },
      { id:'category',label:'Category', ph:'funding-rules', hint:'funding-rules, levy, t-levels or standard' },
      { id:'urgency', label:'Urgency', ph:'high', hint:'high = act now, medium = plan ahead, low = for information' },
      { id:'tag',     label:'What changed, in two or three words', ph:'New rules published', hint:'Shows as the label on the feed card' },
      { id:'url',     label:'Source link', ph:'https://www.gov.uk/...' },
      { id:'article', label:'Article id, if you have written one', ph:'rules-2627', hint:'Leave blank if not. Must match an id in ARTICLES.' }
    ],
    build: v => 'Add this inside the UPDATES = [ ... ] list:\n\n' +
      '  {\n' +
      '    date: ' + q(v.date) + ',\n' +
      '    title: ' + q(v.title) + ',\n' +
      '    tag: { label: ' + q(v.tag) + ', tone: ' +
        q(v.urgency === 'high' ? 'stop' : v.urgency === 'medium' ? 'warn' : 'info') + ' },\n' +
      '    category: ' + q(v.category) + ', route: "", standard: "", article: ' + q(v.article) + ',\n' +
      '    status: ' + q(new Date(v.date) > new Date() ? 'upcoming' : 'updated') + ', urgency: ' + q(v.urgency) + ', pinned: false,\n' +
      '    summary: ' + q(v.summary) + ',\n' +
      '    url: ' + q(v.url) + '\n' +
      '  },'
  },

  change: {
    title: 'Add a rule change',
    where: 'Goes in the RULES_CHANGES list in data.js. Appears on the What changed tab, and in the contents.',
    fields: [
      { id:'title',   label:'What changed, in a sentence', ph:'Subcontracting de-minimis opened up to every provider' },
      { id:'section', label:'Section id it belongs to', ph:'subcontracting', hint:'Must match an id in RULES_SECTIONS — e.g. eligibility, co-investment, off-the-job' },
      { id:'paras',   label:'Paragraph numbers', ph:'262.3' },
      { id:'from',    label:'What the rule was before', ph:'The de-minimis could only be used by providers who had achieved the subcontracting standard.', area:true },
      { id:'to',      label:'What it is now', ph:'From 1 August 2026 any provider can use the exemption.', area:true },
      { id:'impact',  label:'Impact', ph:'high', hint:'high, medium or low' },
      { id:'when',    label:'Which version it arrived in', ph:'v1', hint:'draft, v1, v2 or v3' }
    ],
    build: v => 'Add this inside the RULES_CHANGES = [ ... ] list:\n\n' +
      '  { section:' + q(v.section) + ', when:' + q(v.when || 'draft') + ', paras:' + q(v.paras) + ', impact:' + q(v.impact || 'medium') + ',\n' +
      '    title:' + q(v.title) + ',\n' +
      '    from:' + q(v.from) + ',\n' +
      '    to:' + q(v.to) + ' },'
  }
};

function q(v){ return '"' + String(v || '').replace(/\\/g,'\\\\').replace(/"/g,'\\"') + '"'; }

function docForm(kind){
  const f = DOC_FORMS[kind];
  const wrap = document.getElementById('dform');

  wrap.innerHTML =
    '<section class="lsection">' +
      '<div class="lhead"><h2>' + f.title + '</h2><p>' + f.where + '</p></div>' +
      '<div class="form" style="max-width:660px;margin-top:0">' +
        f.fields.map(x =>
          '<div class="field"><label for="d-' + x.id + '">' + x.label + '</label>' +
          (x.hint ? '<p class="hint">' + x.hint + '</p>' : '') +
          (x.area
            ? '<textarea id="d-' + x.id + '" rows="3" placeholder="' + x.ph + '"></textarea>'
            : '<input type="text" id="d-' + x.id + '" placeholder="' + x.ph + '">') +
          '</div>').join('') +
        '<button class="btn" id="dgen">Generate the entry</button>' +
      '</div>' +
      '<div id="dout"></div>' +
    '</section>';

  document.getElementById('dgen').addEventListener('click', () => {
    const v = {};
    let missing = [];
    f.fields.forEach(x => {
      v[x.id] = (document.getElementById('d-' + x.id).value || '').trim();
      if(!v[x.id] && x.id !== 'owner' && x.id !== 'article') missing.push(x.label);
    });

    if(missing.length){
      document.getElementById('dout').innerHTML =
        '<div class="alert" style="margin-top:18px"><b>Still needed:</b> ' + missing.join(', ') + '</div>';
      return;
    }

    const code = f.build(v);
    document.getElementById('dout').innerHTML =
      '<div class="lsection costs" style="margin-top:26px">' +
        '<div class="lhead"><h2>Paste this into data.js</h2><p>' + f.where + '</p></div>' +
        '<pre class="codeout" id="dcode">' + code.replace(/</g,'&lt;') + '</pre>' +
        '<button class="btn small" id="dcopy" style="margin-top:14px">Copy</button>' +
        '<div class="notice" style="margin-top:16px"><b>Then update the stamp.</b> ' +
        'Change <code>DATA_UPDATED</code> at the top of <code>data.js</code> to today, so the site shows the right review date.</div>' +
      '</div>';

    document.getElementById('dcopy').addEventListener('click', () => {
      navigator.clipboard.writeText(code);
      document.getElementById('dcopy').textContent = 'Copied';
      setTimeout(() => { document.getElementById('dcopy').textContent = 'Copy'; }, 1600);
    });
  });
}

/* =========================================================================
   STATISTICS IMPORT

   DfE and DWP publish apprenticeship starts, participation and achievement
   rates jointly through Explore Education Statistics, as open CSV with no
   key needed. Attaching that to the register turns two guesses into facts:

     "commonly delivered"  becomes actual start volumes
     nothing               becomes achievement rate per standard

   The second is the more useful. A provider looking at a standard wants to
   know whether people finish it, and nothing on the site currently says.
   ========================================================================= */

/* Column names taken from the published data previews on Explore Education
   Statistics, which uses snake_case headers, plus the friendlier names the
   table builder produces if you export from there instead. */
const STATS_COLUMNS = {
  name:     ['std_fwk_name_stcode', 'standard name', 'framework / standard name',
             'framework/standard name', 'standard and framework name', 'std name', 'standard'],
  code:     ['standard code', 'std code', 'larscode', 'lars_code', 'reference'],
  level:    ['detailed level', 'apprenticeship level', 'level'],
  starts:   ['starts', 'total starts'],
  achieved: ['achievers', 'achievements', 'achieved', 'total achievements'],
  rate:     ['achievement_rate', 'achievement rate', 'overall achievement rate'],
  leavers:  ['leavers'],
  ukprn:    ['provider_ukprn', 'ukprn'],
  year:     ['time_period', 'time period', 'academic year']
};

/* Landing pages rather than direct file links.

   Dataset identifiers on Explore Education Statistics are re-issued with
   each release, so a direct CSV link works today and 404s in six months.
   These pages always carry the current version, so what is below is the
   page plus the exact name to look for on it. Slightly more clicking, but
   it does not rot. */

const EES_EXPLORE   = 'https://explore-education-statistics.service.gov.uk/find-statistics/apprenticeships';
const EES_CATALOGUE = 'https://explore-education-statistics.service.gov.uk/data-catalogue';

const EES_SETS = [
  { name: 'Starts and achievements by standard',
    look: 'Subjects — Starts, Achievements, Enrolments … Standard-framework name',
    note: 'Start volumes per standard. This is what should drive the commonly delivered list, instead of judgement.' },
  { name: 'Achievement rates by standard',
    look: 'Achievement Rates Subjects … Standard-framework name',
    note: 'Whether apprentices on a standard actually finish it. The most useful of the three, and nothing on the site currently says it.' },
  { name: 'Achievement rates by provider',
    look: 'Achievement Rates Providers … by Provider, SSA T1, Level, Standard-framework name',
    note: 'The same rates by provider UKPRN. Needed later if you want members to benchmark themselves against the sector.' }
];

function renderStatsTool(){
  const el = document.getElementById('view-stats');
  if(el.dataset.built) return;
  el.dataset.built = '1';

  el.innerHTML =
    '<section class="lsection">' +
      '<div class="lhead"><h2>1. Download a dataset</h2>' +
      '<p>Open data from Explore Education Statistics, published jointly by DfE and DWP. No key, no sign-in.</p></div>' +

      '<div class="howto">' +
        '<a class="btn" href="' + EES_EXPLORE + '" target="_blank" rel="noopener">Open the apprenticeships release &nearr;</a>' +
        '<ol>' +
          '<li>Press <b>Explore and download data</b>.</li>' +
          '<li>Find the dataset you want in the list — the names to look for are below.</li>' +
          '<li>Press <b>Download data set (ZIP)</b>, then unzip it. The .csv is inside, alongside a guidance file you can ignore.</li>' +
        '</ol>' +
        '<p class="hint" style="margin:0">That page always shows the current release, so this route keeps working. ' +
        'Direct file links do not — the identifiers change every time the data is reissued.</p>' +
      '</div>' +

      '<div class="dllist" style="margin-top:18px">' +
        EES_SETS.map(s =>
          '<div class="dlrow">' +
            '<div class="dlmain"><b>' + s.name + '</b>' +
              '<span>' + s.note + '</span>' +
              '<code class="looksfor">Look for: ' + s.look + '</code>' +
            '</div>' +
          '</div>').join('') +
      '</div>' +

      '<div class="notice" style="margin-top:16px"><b>Cannot find one?</b> ' +
      'Search the <a href="' + EES_CATALOGUE + '" target="_blank" rel="noopener">data catalogue</a> for the name above. ' +
      'It covers every release rather than just the latest, so an older year is still there if you want a trend rather than a snapshot. ' +
      'Whichever you take, note the academic year — these releases run well behind, and a rate describes apprentices who finished a while ago.</div>' +
    '</section>' +

    '<section class="lsection">' +
      '<div class="lhead"><h2>2. Drop it here</h2><p>It will work out which columns it has.</p></div>' +
      '<div class="dropzone" id="sdrop">' +
        '<input type="file" id="sfile" accept=".csv,text/csv" hidden>' +
        '<p class="dropmain">Drag the statistics CSV here, or <button class="linkbtn" id="sbrowse">choose a file</button></p>' +
        '<p class="dropsub">Starts, achievements or achievement rates by standard</p>' +
      '</div>' +
      '<div id="serr"></div>' +
    '</section>' +
    '<div id="sresults"></div>';

  const sdrop = document.getElementById('sdrop'), sfile = document.getElementById('sfile');
  document.getElementById('sbrowse').addEventListener('click', () => sfile.click());
  sfile.addEventListener('change', e => { if(e.target.files[0]) handleStats(e.target.files[0]); });
}

function matchStatsColumns(header){
  const lower = header.map(x => String(x).toLowerCase().trim());
  const found = {};
  for(const field in STATS_COLUMNS){
    let best = -1, bestScore = 0;
    lower.forEach((hd, i) => {
      STATS_COLUMNS[field].forEach(want => {
        let score = 0;
        if(hd === want) score = 10;
        else if(hd.startsWith(want)) score = 6;
        else if(hd.includes(want)) score = 3;
        if(score > bestScore){ bestScore = score; best = i; }
      });
    });
    if(best >= 0) found[field] = best;
  }
  return found;
}

function handleStats(file){
  document.getElementById('serr').innerHTML = '';
  document.getElementById('sresults').innerHTML =
    '<div class="lsection"><p style="color:var(--text-2)">Reading ' + file.name + '…</p></div>';

  const reader = new FileReader();
  reader.onerror = () => {
    document.getElementById('serr').innerHTML = '<div class="alert" style="margin-top:14px">That file could not be read.</div>';
  };
  reader.onload = () => {
    try { processStats(reader.result, file); }
    catch(err){
      document.getElementById('serr').innerHTML =
        '<div class="alert" style="margin-top:14px"><b>That did not work.</b> ' + err.message + '</div>';
      document.getElementById('sresults').innerHTML = '';
    }
  };
  reader.readAsText(file);
}

function statNum(v){
  const s = String(v == null ? '' : v).replace(/[^\d.\-]/g, '');
  if(!s || s === '-') return null;
  const n = parseFloat(s);
  return isNaN(n) ? null : n;
}

function processStats(text, file){
  const rows = parseCSV(text);
  if(rows.length < 2) throw new Error('That file has no rows in it.');

  const cols = matchStatsColumns(rows[0]);
  if(cols.name === undefined && cols.code === undefined){
    throw new Error('No column naming the standard was found. The header reads: ' + rows[0].slice(0,14).join(' | '));
  }
  if(cols.starts === undefined && cols.achieved === undefined && cols.rate === undefined){
    throw new Error('No starts, achievements or achievement rate column was found. The header reads: ' + rows[0].slice(0,14).join(' | '));
  }

  // The statistics files have one row per breakdown — age, level, region and
  // so on — so the same standard appears many times. Sum the volumes and take
  // the widest achievement rate rather than treating each row as a standard.
  const agg = {};
  const norm = s => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');

  rows.slice(1).forEach(r => {
    const name = cols.name !== undefined ? String(r[cols.name] || '').trim() : '';
    const code = cols.code !== undefined ? String(r[cols.code] || '').trim().toUpperCase() : '';
    if(!name && !code) return;

    const key = code || norm(name);
    if(!key || key === 'total' || norm(name) === 'total') return;

    const a = agg[key] = agg[key] || { name: name, code: code, starts: 0, achieved: 0, rates: [] };
    if(name && !a.name) a.name = name;

    const st = cols.starts !== undefined ? statNum(r[cols.starts]) : null;
    const ac = cols.achieved !== undefined ? statNum(r[cols.achieved]) : null;
    const rt = cols.rate !== undefined ? statNum(r[cols.rate]) : null;

    if(st != null) a.starts += st;
    if(ac != null) a.achieved += ac;
    if(rt != null && rt >= 0 && rt <= 100) a.rates.push(rt);
  });

  const list = Object.values(agg).map(a => {
    // Prefer a published rate; fall back to achievements over starts only
    // where both are present and the numbers are big enough to mean anything.
    let rate = a.rates.length ? Math.round(a.rates.reduce((x,y) => x+y, 0) / a.rates.length * 10) / 10 : null;
    if(rate == null && a.starts >= 50 && a.achieved > 0) rate = Math.round(a.achieved / a.starts * 1000) / 10;
    return { name: a.name, code: a.code, starts: Math.round(a.starts), achieved: Math.round(a.achieved), rate: rate };
  }).filter(x => x.starts > 0 || x.rate != null);

  if(!list.length) throw new Error('No usable rows were found once totals were excluded.');

  showStats(rows, cols, list, file);
}

function showStats(rows, cols, list, file){
  // match against the register
  const byCode = {}, byName = {};
  const norm = s => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  STANDARDS.forEach(s => { if(s.code) byCode[s.code] = s; byName[norm(s.name)] = s; });

  let matched = 0;
  const out = [];
  list.forEach(x => {
    const s = (x.code && byCode[x.code]) || byName[norm(x.name)];
    if(s){ matched++; out.push({ std: s, stat: x }); }
  });

  out.sort((a,b) => b.stat.starts - a.stat.starts);
  const top = out.slice(0, 40);
  const withRate = out.filter(o => o.stat.rate != null);

  const colTable = Object.keys(STATS_COLUMNS).map(f =>
    '<tr><td class="nm">' + f + '</td><td>' +
    (cols[f] !== undefined ? '<b>' + (rows[0][cols[f]] || '') + '</b>'
                           : '<span style="color:var(--text-3)">not in this file</span>') +
    '</td></tr>').join('');

  const code = 'const STANDARD_STATS = {\n' +
    out.map(o => '  "' + (o.std.code || o.std.name) + '": { starts: ' + o.stat.starts +
      (o.stat.rate != null ? ', rate: ' + o.stat.rate : '') + ' },').join('\n') +
    '\n};';

  document.getElementById('sresults').innerHTML =
    '<section class="lsection">' +
      '<div class="lhead"><h2>3. What was in the file</h2><p>' + file.name + ' · ' +
      (rows.length - 1).toLocaleString('en-GB') + ' rows</p></div>' +
      '<div class="mgrid">' +
        '<div class="mcard"><div class="n">' + list.length.toLocaleString('en-GB') + '</div><div class="l">Standards in the file</div></div>' +
        '<div class="mcard cool"><div class="n">' + matched.toLocaleString('en-GB') + '</div><div class="l">Matched to your register</div></div>' +
        '<div class="mcard warm"><div class="n">' + withRate.length.toLocaleString('en-GB') + '</div><div class="l">With an achievement rate</div></div>' +
        '<div class="mcard"><div class="n">' + (list.length - matched).toLocaleString('en-GB') + '</div><div class="l">Unmatched</div></div>' +
      '</div>' +
      '<div class="grouphead" style="margin-top:26px"><h2>Columns matched</h2><div class="rule"></div></div>' +
      '<table class="std levytable" style="margin-top:12px"><tbody>' + colTable + '</tbody></table>' +
    '</section>' +

    '<section class="lsection costs">' +
      '<div class="lhead"><h2>Most delivered standards</h2>' +
      '<p>By start volume in this file. This is what should drive the &ldquo;commonly delivered&rdquo; list, rather than judgement.</p></div>' +
      '<div style="max-height:420px;overflow-y:auto;border:1px solid var(--line)">' +
      '<table class="std"><thead><tr><th>Standard</th><th>Starts</th><th>Achievement rate</th></tr></thead><tbody>' +
      top.map(o => '<tr><td class="nm">L' + o.std.level + ' ' + o.std.name +
        '<small>' + (o.std.code || '') + '</small></td>' +
        '<td class="num">' + o.stat.starts.toLocaleString('en-GB') + '</td>' +
        '<td class="num">' + (o.stat.rate != null
          ? '<b class="' + (o.stat.rate < 50 ? 'ratelow' : o.stat.rate < 65 ? 'ratemid' : 'ratehigh') + '">' + o.stat.rate + '%</b>'
          : '<span class="chg none">—</span>') + '</td></tr>').join('') +
      '</tbody></table></div>' +
      (out.length > 40 ? '<p class="hint">Showing the top 40 of ' + out.length + ' matched.</p>' : '') +
    '</section>' +

    (risky
      ? '<section class="lsection"><div class="alert" style="border-left-width:4px">' +
        '<b>Do not upload this file.</b><br>' +
        'It would make the site worse than it is now:' +
        '<ul style="margin:10px 0 0;padding-left:18px">' +
          losses.map(l => '<li>' + l + '</li>').join('') +
        '</ul>' +
        '<p style="margin:12px 0 0">Check the column table above first — a heading that has not been matched ' +
        'is the usual cause. Nothing has changed on your site; you can close this and try a different file.</p>' +
        '</div></section>'
      : '') +

    '<section class="lsection">' +
      '<div class="lhead"><h2>Before and after</h2>' +
      '<p>What your site holds now, against what this file would give it.</p></div>' +
      '<table class="std levytable"><thead><tr><th></th><th class="r">Now</th><th class="r">After this import</th><th></th></tr></thead><tbody>' +
        compareRow('Standards', before.standards, after.standards) +
        compareRow('With a recorded change', before.changes, after.changes) +
        compareRow('With a funding band', before.banded, after.banded) +
      '</tbody></table>' +
    '</section>' +

    (noBaseline
      ? '<section class="lsection"><div class="alert"><b>There is nothing to compare against.</b> ' +
        'The register currently loaded in this browser is empty, so every standard in your file looks new ' +
        'and no changes can be detected by comparison. ' +
        'If your live <code>standards.js</code> is broken, fix that first — otherwise this import will ' +
        'produce a register with no change history at all.<br><br>' +
        (withChange
          ? '<b>The good news:</b> ' + withChange.toLocaleString('en-GB') + ' standards carry a recent date in ' +
            'the file itself, so they will appear in the feed regardless.'
          : '<b>And the file has no date column either</b>, so nothing will appear in the feed. ' +
            'Tick &ldquo;announce standards that are new to the site&rdquo; above to populate it.') +
        '</div></section>'
      : '') +

    (noBand === m.out.length && m.out.length
      ? '<section class="lsection"><div class="alert"><b>No standard has a funding band.</b> ' +
        'The funding column was not matched. Look at the column table above — if it says &ldquo;not found&rdquo; ' +
        'next to <code>funding</code>, tell me the exact heading your file uses and it can be added. ' +
        'The site will show every band as &ldquo;Not yet set&rdquo; until this is sorted.</div></section>'
      : '') +

    (parseError
      ? '<section class="lsection"><div class="alert"><b>This file will not load, so it is not safe to upload.</b><br>' +
        parseError.replace(/</g,'&lt;') + '<br><br>' +
        'Something in the CSV has produced invalid JavaScript. Tell me what the error says and it can be fixed — ' +
        'do not upload this file, or the site will lose its register entirely.</div></section>'
      : '<div class="okbox" style="margin-top:22px"><b>Checked.</b> ' +
        'The generated file parses and holds ' + parsedCount.toLocaleString('en-GB') + ' standards.</div>') +

    '<section class="lsection">' +
      '<div class="lhead"><h2>4. Put it into the site</h2>' +
      '<p>This writes a separate file, <code>standard-stats.js</code>, so it never touches your register or your written content.</p></div>' +
      '<div class="addrow">' +
        '<button class="btn" id="sdl">Download standard-stats.js</button>' +
        '<button class="btn small" id="scopy">Copy</button>' +
      '</div>' +
      '<div class="notice" style="margin-top:18px"><b>Add it to the site with a script tag.</b> ' +
      'Upload <code>standard-stats.js</code> to GitHub, then add ' +
      '<code>&lt;script src="standard-stats.js"&gt;&lt;/script&gt;</code> next to the other data files on each page. ' +
      'Nothing breaks if you forget — the site simply carries on without the figures.</div>' +
      (list.length - matched > 0
        ? '<div class="notice" style="margin-top:14px"><b>' + (list.length - matched).toLocaleString('en-GB') + ' did not match your register.</b> ' +
          'Usually these are retired standards or old frameworks that still appear in historical statistics. ' +
          'They are left out rather than guessed at.</div>'
        : '') +
    '</section>';

  const header = '/* =========================================================================\n' +
    '   STANDARD STATISTICS\n\n' +
    '   Starts and achievement rates per standard, from Explore Education\n' +
    '   Statistics (DfE and DWP). Imported from ' + file.name + '\n' +
    '   on ' + new Date().toISOString().slice(0,10) + '.\n\n' +
    '   Keyed by standard reference where there is one, otherwise by name.\n' +
    '   ========================================================================= */\n\n';

  document.getElementById('sdl').addEventListener('click', () => {
    const blob = new Blob([header + code + '\n'], { type: 'text/javascript' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'standard-stats.js';
    a.click();
    URL.revokeObjectURL(a.href);
  });
  document.getElementById('scopy').addEventListener('click', () => {
    navigator.clipboard.writeText(header + code);
    document.getElementById('scopy').textContent = 'Copied';
    setTimeout(() => { document.getElementById('scopy').textContent = 'Copy'; }, 1600);
  });

  document.getElementById('sresults').scrollIntoView({ behavior:'smooth', block:'start' });
}

/* Fetch the current standards.js so the download keeps its header comment.
   data.js is deliberately never read or written by this page. */

