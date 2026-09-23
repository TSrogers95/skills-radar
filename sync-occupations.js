/* =========================================================================
   OCCUPATIONAL MAPS ENRICHMENT

   Pulls the Skills England occupational maps API and writes occupations.js
   into the repo. It runs on a schedule, server-side, and commits a static
   file — so the site never calls the API at runtime and the key never
   reaches a browser.

   Why a build-time job rather than a live proxy:
     - The key stays in a Vercel environment variable, invisible to anyone
       viewing source.
     - The API is rate limited and returns 429s. A build-time pull makes a
       few dozen calls a week; a live proxy would make one per visitor.
     - The site keeps working if the API is down, because it is reading a
       committed file rather than waiting on a response.

   What it adds that the register CSV does not have:
     maphierarchy   route, PATHWAY, cluster group, cluster, technical level
     typicaljobtitles   what people actually call the job
     keywords       search terms curated by Skills England
     products       the T Levels and technical education on the same pathway
     green          whether the occupation is classified as green

   LICENCE: Skills England require the Skills England logo and an
   attribution statement on anything built with this data. Both are in the
   site footer. Do not remove them.
   ========================================================================= */

const { readFile, writeFile, sendEmail, authorised, today } = require('./_lib');

const ROOT = 'https://occupational-maps-api.skillsengland.education.gov.uk/api/v1';
const PATH = 'occupations.js';

/* Keep well inside the rate limit — a pause between calls, and a cap on how
   many we make in one run. */
const PAUSE_MS = 250;
const MAX_CALLS = 220;

let callCount = 0;

async function api(path){
  if(callCount >= MAX_CALLS) throw new Error('Call cap reached (' + MAX_CALLS + ')');
  callCount++;

  const key = process.env.SKILLS_ENGLAND_API_KEY;
  const res = await fetch(ROOT + path, {
    headers: { 'X-API-KEY': key, 'Accept': 'application/json' }
  });

  if(res.status === 429){
    // Backed off once, then give up rather than hammering it
    await sleep(5000);
    const retry = await fetch(ROOT + path, { headers: { 'X-API-KEY': key, 'Accept': 'application/json' } });
    if(!retry.ok) throw new Error('Rate limited on ' + path);
    return retry.json();
  }
  if(res.status === 403) throw new Error('403 — the API key was rejected. Check SKILLS_ENGLAND_API_KEY.');
  if(!res.ok) throw new Error('HTTP ' + res.status + ' on ' + path);

  await sleep(PAUSE_MS);
  return res.json();
}

function sleep(ms){ return new Promise(r => setTimeout(r, ms)); }

/* The route slugs the API uses, mapped to ours. */
const ROUTES = {
  'agriculture-environmental-and-animal-care': 'agriculture',
  'business-and-administration': 'business-administration',
  'care-services': 'care-services',
  'catering-and-hospitality': 'catering-hospitality',
  'construction-and-the-built-environment': 'construction',
  'creative-and-design': 'creative-design',
  'digital': 'digital',
  'education-and-early-years': 'education-early-years',
  'engineering-and-manufacturing': 'engineering-manufacturing',
  'hair-and-beauty': 'hair-beauty',
  'health-and-science': 'health-science',
  'legal-finance-and-accounting': 'legal-finance-accounting',
  'protective-services': 'protective-services',
  'sales-marketing-and-procurement': 'sales-marketing-procurement',
  'transport-and-logistics': 'transport-logistics'
};

const EXPAND = 'occupation.maphierarchy,occupation.typicaljobtitles,occupation.keywords,occupation.products,occupation.green,occupation.overview';

module.exports = async function handler(req, res){
  if(!authorised(req)) return res.status(401).json({ error: 'Unauthorised' });

  if(!process.env.SKILLS_ENGLAND_API_KEY){
    return res.status(200).json({ ok: false, skipped: 'No SKILLS_ENGLAND_API_KEY set.' });
  }

  const dry = req.query && req.query.dry === '1';
  const occupations = {};
  const failed = [];

  for(const slug in ROUTES){
    try {
      const data = await api('/' + slug + '?expand=' + EXPAND);
      collect(data, ROUTES[slug], occupations);
    } catch(err){
      failed.push({ route: slug, reason: err.message });
    }
  }

  const count = Object.keys(occupations).length;

  if(count < 100){
    await sendEmail('Skills Radar — occupational maps sync stopped',
      '<p>Only ' + count + ' occupations were returned, which is far fewer than expected. Nothing was written.</p>' +
      (failed.length ? '<pre>' + failed.map(f => f.route + ': ' + f.reason).join('\n') + '</pre>' : ''));
    return res.status(200).json({ ok: false, count: count, failed: failed });
  }

  if(dry){
    const sample = Object.values(occupations).slice(0, 3);
    return res.status(200).json({ ok: true, dryRun: true, count: count, calls: callCount, failed: failed, sample: sample });
  }

  const file = await readFile(PATH);
  const content = render(occupations, failed);
  await writeFile(PATH, content, file ? file.sha : null,
    'Occupational maps sync ' + today() + ' — ' + count + ' occupations');

  await sendEmail(
    'Skills Radar — occupational maps refreshed',
    '<div style="font-family:system-ui,sans-serif">' +
      '<h2>Occupational maps sync</h2>' +
      '<p>' + count + ' occupations written, from ' + callCount + ' API calls.</p>' +
      '<p>Pathways, job titles, keywords and technical education products are now current. ' +
      'Search picks these up automatically.</p>' +
      (failed.length ? '<p><b>' + failed.length + ' route(s) failed:</b><br>' +
        failed.map(f => f.route + ' — ' + f.reason).join('<br>') + '</p>' : '') +
    '</div>');

  return res.status(200).json({ ok: true, count: count, calls: callCount, failed: failed, committed: true });
};

/* The route response nests occupations inside pathways and clusters, and the
   exact shape has moved during public beta — so walk the tree looking for
   anything that has an occupation code rather than assuming a path. */
function collect(node, routeKey, out, trail){
  trail = trail || {};

  if(Array.isArray(node)){
    node.forEach(n => collect(n, routeKey, out, trail));
    return;
  }
  if(!node || typeof node !== 'object') return;

  const next = Object.assign({}, trail);
  const name = node.name || node.title;
  if(name){
    const t = String(node.type || node.level || '').toLowerCase();
    if(/pathway/.test(t)) next.pathway = name;
    else if(/cluster group/.test(t)) next.clusterGroup = name;
    else if(/cluster/.test(t)) next.cluster = name;
  }

  const code = node.occupationCode || node.referenceNumber || node.code;
  const isOcc = code && /^OCC/i.test(String(code));

  if(isOcc){
    const h = node.mapHierarchy || node.maphierarchy || {};
    out[String(code).toUpperCase()] = {
      code: String(code).toUpperCase(),
      name: node.title || node.name || '',
      route: routeKey,
      pathway: h.pathway || next.pathway || '',
      cluster: h.cluster || next.cluster || '',
      clusterGroup: h.clusterGroup || next.clusterGroup || '',
      level: node.level || h.technicalLevel || null,
      overview: trim(node.overview || ''),
      jobTitles: titles(node),
      keywords: list(node.keywords, 'keyword', 'name'),
      products: products(node),
      green: !!(node.green && (node.green.isGreen || node.green.classification))
    };
  }

  Object.keys(node).forEach(k => {
    if(k === 'mapHierarchy' || k === 'maphierarchy') return;
    const v = node[k];
    if(v && typeof v === 'object') collect(v, routeKey, out, next);
  });
}

function titles(node){
  const raw = node.typicalJobTitles || node.typicaljobtitles || [];
  return list(raw, 'title', 'jobTitle', 'name').slice(0, 14);
}

function products(node){
  const raw = node.products || [];
  if(!Array.isArray(raw)) return [];
  return raw.map(p => ({
    name: p.title || p.name || '',
    type: p.productType || p.type || '',
    level: p.level || null
  })).filter(p => p.name).slice(0, 10);
}

function list(raw){
  const keys = Array.prototype.slice.call(arguments, 1);
  if(!raw) return [];
  if(!Array.isArray(raw)) raw = [raw];
  return raw.map(x => {
    if(typeof x === 'string') return x;
    for(const k of keys){ if(x && x[k]) return x[k]; }
    return '';
  }).filter(Boolean);
}

function trim(s){
  const t = String(s).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return t.length > 300 ? t.slice(0, 297) + '…' : t;
}

function render(occupations, failed){
  const q = v => JSON.stringify(String(v == null ? '' : v));
  const rows = Object.values(occupations)
    .sort((a, b) => a.route.localeCompare(b.route) || a.name.localeCompare(b.name))
    .map(o => '  ' + q(o.code) + ': {' +
      'name:' + q(o.name) +
      ', route:' + q(o.route) +
      (o.pathway ? ', pathway:' + q(o.pathway) : '') +
      (o.cluster ? ', cluster:' + q(o.cluster) : '') +
      (o.level ? ', level:' + o.level : '') +
      (o.jobTitles.length ? ', jobTitles:[' + o.jobTitles.map(q).join(',') + ']' : '') +
      (o.keywords.length ? ', keywords:[' + o.keywords.map(q).join(',') + ']' : '') +
      (o.products.length ? ', products:[' + o.products.map(p =>
        '{name:' + q(p.name) + ',type:' + q(p.type) + '}').join(',') + ']' : '') +
      (o.green ? ', green:true' : '') +
      (o.overview ? ', overview:' + q(o.overview) : '') +
    '},');

  return '/* =========================================================================\n' +
    '   OCCUPATIONAL MAPS DATA\n\n' +
    '   Written automatically by api/sync-occupations.js from the Skills England\n' +
    '   occupational maps API. Do not edit by hand — the next sync overwrites it.\n\n' +
    '   Adds pathways, clusters, typical job titles, keywords and the technical\n' +
    '   education products on each occupation, none of which are in the\n' +
    '   register CSV. Search reads all of them.\n\n' +
    '   Last synced ' + today() + '. ' + Object.keys(occupations).length + ' occupations.\n' +
    (failed.length ? '   ' + failed.length + ' route(s) failed on this run.\n' : '') +
    '\n' +
    '   © Skills England ' + new Date().getFullYear() + '\n' +
    '   Licensed under the Open Government Licence v3.0\n' +
    '   https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3\n' +
    '   ========================================================================= */\n\n' +
    'const OCCUPATIONS_UPDATED = "' + today() + '";\n\n' +
    'const OCCUPATIONS = {\n' + rows.join('\n') + '\n};\n';
}
