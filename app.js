/* =========================================================================
   SKILLS RADAR — SHARED FUNCTIONS
   Used by every page. You shouldn't normally need to edit this file.
   ========================================================================= */

const CATEGORY_LABELS = {
  "funding-rules": "Funding rules",
  "levy": "Levy",
  "t-levels": "T-Levels",
  "standard": "Standard"
};

const STATUS_LABELS = {
  "updated": "Updated",
  "upcoming": "Upcoming",
  "in-review": "In review"
};

function daysAgo(d){ return (new Date() - new Date(d)) / 86400000; }
function isFuture(d){ return new Date(d) > new Date(); }
function fmtShort(d){ return new Date(d).toLocaleDateString('en-GB', { day:'numeric', month:'short' }); }
function fmtLong(d){ return new Date(d).toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' }); }
function fmtYear(d){ return new Date(d).getFullYear(); }
function fmtMonthYear(d){ return new Date(d).toLocaleDateString('en-GB', { month:'long', year:'numeric' }); }
function money(n){ return '£' + n.toLocaleString('en-GB'); }

/* ---------- Route detection ----------
   Works out which occupational route the person means, by checking their
   words against every route's term list. Longest match wins. */

function detectRoute(query){
  if(!query) return null;
  const q = query.toLowerCase().trim();
  let best = null, bestLen = 0;

  for(const key in ROUTES){
    const r = ROUTES[key];
    const candidates = [r.label.toLowerCase()].concat(r.terms, r.tlevels.map(t => t.toLowerCase()));
    for(const term of candidates){
      const t = term.toLowerCase();
      const hit = (q.includes(t) && t.length > 2) || (t.includes(q) && q.length > 2);
      if(hit && t.length > bestLen){ best = key; bestLen = t.length; }
    }
  }
  return best;
}

function routeText(routeKey){
  if(!routeKey || !ROUTES[routeKey]) return '';
  const r = ROUTES[routeKey];
  return (r.label + ' ' + r.terms.join(' ') + ' ' + r.tlevels.join(' ')).toLowerCase();
}

function matches(item, query, routeKey){
  if(!query) return true;
  if(routeKey && item.route === routeKey) return true;

  const hay = [
    item.title, item.standard || '', item.summary || '',
    CATEGORY_LABELS[item.category] || '', STATUS_LABELS[item.status] || '',
    routeText(item.route)
  ].join(' ').toLowerCase();

  const words = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);
  if(words.length === 0) return hay.includes(query.toLowerCase());
  return words.some(w => hay.includes(w));
}

/* ---------- Search box with radar loader ----------
   Shows the spinning radar while the person is still typing, then runs
   the callback once they pause. */

function wireSearch(inputId, clearId, radarId, callback){
  const input = document.getElementById(inputId);
  const clear = document.getElementById(clearId);
  const radar = document.getElementById(radarId);
  if(!input) return;

  let timer;

  input.addEventListener('input', () => {
    if(radar) radar.classList.add('on');
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(input.value.trim());
      if(radar) radar.classList.remove('on');
    }, 320);
  });

  if(clear){
    clear.addEventListener('click', () => {
      input.value = '';
      if(radar) radar.classList.remove('on');
      callback('');
      input.focus();
    });
  }
}

/* ---------- Article symbols ----------
   Simple flat illustrations, one per article. Drawn rather than
   photographed so they stay legible small and never look stocky. */

const ART_ICONS = {
  "defunding-16":
    '<rect x="8" y="14" width="30" height="7" rx="1"/><rect x="8" y="25" width="30" height="7" rx="1"/><rect x="8" y="36" width="30" height="7" rx="1" class="fade"/>' +
    '<line x1="4" y1="45" x2="44" y2="10" class="slash"/>',
  "growth-skills-levy":
    '<path d="M14 8h20l-7 12 7 12H14l7-12z" class="hg"/><line x1="12" y1="8" x2="36" y2="8"/><line x1="12" y1="32" x2="36" y2="32"/>' +
    '<circle cx="24" cy="41" r="5" class="fade"/>',
  "level-7":
    '<path d="M24 10 42 18 24 26 6 18z" class="hg"/><path d="M13 22v9c0 3 5 5 11 5s11-2 11-5v-9" fill="none"/><line x1="9" y1="40" x2="39" y2="40" class="slash"/>',
  "english-maths":
    '<rect x="7" y="11" width="15" height="26" rx="1.5"/><rect x="26" y="11" width="15" height="26" rx="1.5" class="fade"/>' +
    '<line x1="10" y1="18" x2="19" y2="18"/><line x1="10" y1="23" x2="19" y2="23"/><line x1="29" y1="18" x2="38" y2="18"/><line x1="33.5" y1="27" x2="33.5" y2="18" class="hg"/>',
  "min-duration":
    '<circle cx="24" cy="24" r="15" fill="none"/><line x1="24" y1="24" x2="24" y2="14"/><line x1="24" y1="24" x2="31" y2="28" class="hg"/><circle cx="24" cy="24" r="2"/>',
  "sme-funding":
    '<rect x="8" y="18" width="14" height="22"/><rect x="26" y="10" width="14" height="30" class="fade"/>' +
    '<path d="M11 30l4 4 8-9" class="tick"/>',
  "units-foundation":
    '<rect x="8" y="28" width="12" height="12" rx="1"/><rect x="22" y="28" width="12" height="12" rx="1"/><rect x="15" y="14" width="12" height="12" rx="1" class="hg"/>',
  "epa-reform":
    '<rect x="12" y="9" width="24" height="32" rx="2" fill="none"/><rect x="19" y="6" width="10" height="6" rx="1"/>' +
    '<path d="M17 21l3 3 6-7" class="tick"/><line x1="17" y1="30" x2="31" y2="30"/><line x1="17" y1="35" x2="27" y2="35" class="fade"/>',
  "tlevel-placements":
    '<rect x="7" y="18" width="34" height="21" rx="2" fill="none"/><path d="M18 18v-4h12v4"/><line x1="7" y1="27" x2="41" y2="27"/><circle cx="24" cy="27" r="2.5" class="hg"/>',
  "admin-assistant":
    '<path d="M7 17h14l3 4h17v20H7z" fill="none"/><line x1="7" y1="27" x2="41" y2="27" class="fade"/><circle cx="34" cy="34" r="3" class="hg"/>',
  "low-carbon-heating":
    '<rect x="9" y="14" width="20" height="22" rx="2" fill="none"/><line x1="13" y1="20" x2="25" y2="20"/><line x1="13" y1="25" x2="25" y2="25"/><line x1="13" y1="30" x2="25" y2="30" class="fade"/>' +
    '<path d="M37 16c5 5 5 11 0 14-5-3-5-9 0-14z" class="hg"/>',
  "rules-2627":
    '<rect x="8" y="30" width="32" height="8" rx="1"/><rect x="10" y="20" width="28" height="8" rx="1" class="fade"/><rect x="12" y="10" width="24" height="8" rx="1" class="hg"/>',
  "foundation-year":
    '<line x1="24" y1="10" x2="24" y2="41"/><path d="M24 14h14l-4 5 4 5H24z" class="hg"/><path d="M24 28H10l4 4-4 4h14z" class="fade"/>'
};

function artIcon(id){
  const body = ART_ICONS[id] || '<circle cx="24" cy="24" r="13" fill="none"/><line x1="24" y1="17" x2="24" y2="26"/><circle cx="24" cy="31" r="1.6"/>';
  return '<svg class="sym" viewBox="0 0 48 48" aria-hidden="true">' + body + '</svg>';
}

/* =========================================================================
   DERIVED UPDATES
   Every standard carrying a recorded change is a real change, so the feed
   should show it. This turns those register entries into feed items and
   merges them with the hand-written UPDATES above.
   ========================================================================= */

function deriveUpdates(){
  return STANDARDS
    .filter(s => s.changed && s.changed.trim() !== '')
    .map(s => {
      const defunded = /Defunded/i.test(s.status);
      const dev = /development|paused|retirement|notice/i.test(s.status);

      let status = 'updated';
      if(defunded || isFuture(s.since)) status = 'upcoming';
      else if(dev) status = 'in-review';

      let urgency = 'low';
      if(defunded) urgency = 'high';
      else if(/funding band|age restriction|retired|replaces/i.test(s.changed)) urgency = 'medium';

      const dur = s.months === 0 ? 'delivered as a unit' : s.months + ' months';
      const summary = s.changed + '. Level ' + s.level + ', ' + dur +
        ', maximum funding ' + money(s.funding) + '.' +
        (/pending|waiting/i.test(s.epa || '') ? ' No assessment organisation assigned yet.' : '');

      const verb = defunded ? 'Funding withdrawn' : dev ? 'In review' : 'Updated';

      return {
        date: s.since,
        title: s.name + ' L' + s.level + ' — ' + verb,
        short: shortLine(s, defunded, dev),
        level: s.level,
        months: s.months,
        funding: s.funding,
        epa: s.epa,
        code: s.code,
        category: 'standard',
        route: s.route,
        standard: s.name + (s.code ? ', Level ' + s.level + ' (' + s.code + ')' : ', Level ' + s.level),
        article: s.article || '',
        status: status,
        urgency: urgency,
        pinned: false,
        derived: true,
        summary: summary,
        url: standardURL(s)
      };
    });
}

/* A very short status line for the board — one glanceable phrase, no more. */
function shortLine(s, defunded, dev){
  if(defunded) return 'No new starts after 1 September 2026';
  if(dev)      return /retirement/i.test(s.status) ? 'Retirement consultation open' : 'New version in development';
  if(/funding band/i.test(s.changed))      return 'Funding band changed to ' + money(s.funding);
  if(/age restriction/i.test(s.changed))   return 'New age restriction applies';
  if(/replaces|retired/i.test(s.changed))  return 'Version ' + s.version + ' now current';
  if(/new unit|new standard|new foundation/i.test(s.changed)) return 'Newly approved for delivery';
  return 'Version ' + s.version + ' approved for delivery';
}

/* Trim a summary down to its first clause, for the board cards. */
function firstClause(text, max){
  max = max || 76;
  const stop = text.search(/[.;]\s/);
  let out = stop > 12 ? text.slice(0, stop) : text;
  if(out.length > max) out = out.slice(0, max).replace(/\s+\S*$/, '') + '…';
  return out;
}

/* Skills England does not publish a stable per-standard permalink, so this
   opens their register pre-filtered by the standard's name or code. */
function standardURL(s){
  const q = encodeURIComponent(s.code || s.name);
  return 'https://skillsengland.education.gov.uk/apprenticeships/?keywords=' + q;
}

/* The full feed: hand-written policy updates plus every recorded register
   change, with the curated version winning if both cover the same standard. */
function allUpdates(){
  const curated = UPDATES.slice();
  const seen = new Set(curated.map(u => (u.standard || '').split(',')[0].trim()).filter(Boolean));
  const derived = deriveUpdates().filter(d => !seen.has(d.standard.split(',')[0].trim()));
  return curated.concat(derived);
}
