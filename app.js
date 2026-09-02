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
