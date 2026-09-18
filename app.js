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

      return {
        date: s.since,
        title: 'L' + s.level + ' ' + s.name,
        short: shortLine(s, defunded, dev),
        level: s.level,
        months: s.months,
        funding: s.funding,
        epa: s.epa,
        code: s.code,
        category: 'standard',
        route: s.route,
        standard: s.name + (s.code ? ', Level ' + s.level + ' (' + s.code + ')' : ', Level ' + s.level),
        article: articleFor(s, defunded, dev),
        status: status,
        urgency: urgency,
        pinned: false,
        derived: true,
        changeText: s.changed,
        rawStatus: s.status,
        summary: summary,
        url: standardURL(s)
      };
    });
}

/* A very short status line for the board — one glanceable phrase, no more. */
function shortLine(s, defunded, dev){
  if(defunded) return 'Funding withdrawn — no new starts after 1 September 2026';
  if(dev){
    if(/retirement/i.test(s.status))            return 'Retirement consultation open';
    if(/paused/i.test(s.status))                return 'Paused for new starts';
    if(/funding/i.test(s.changed))              return 'Funding band under review';
    if(/assessment plan/i.test(s.changed))      return 'Assessment plan being revised';
    return 'In review — new version in development';
  }
  if(/funding band/i.test(s.changed))           return 'Funding band changed to ' + money(s.funding);
  if(/age restriction/i.test(s.changed))        return 'New age restriction applies';
  if(/replaces|retired/i.test(s.changed))       return 'Updated to version ' + s.version;
  if(/new unit|new standard|new foundation/i.test(s.changed)) return 'Newly approved for delivery';
  if(/waiting|pending/i.test(s.epa || ''))      return 'Updated — no assessment organisation yet';
  return 'Updated to version ' + s.version;
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

/* =========================================================================
   ARTICLE ROUTING
   Every derived feed item points at an article. Where dozens of standards
   moved for the same reason they share a grouped piece rather than each
   getting a thin one of their own.
   ========================================================================= */

const ROUTE_ARTICLES = {
  "health-science":              "route-health-science",
  "digital":                     "route-digital",
  "engineering-manufacturing":   "route-engineering",
  "construction":                "route-construction",
  "creative-design":             "route-creative",
  "legal-finance-accounting":    "route-legal-finance",
  "transport-logistics":         "route-transport",
  "education-early-years":       "route-education",
  "protective-services":         "route-protective-care",
  "care-services":               "route-protective-care",
  "agriculture":                 "route-agriculture",
  "business-administration":     "route-business-admin",
  "catering-hospitality":        "route-hospitality-retail",
  "sales-marketing-procurement": "route-hospitality-retail",
  "hair-beauty":                 "route-creative"
};

function articleFor(s, defunded, dev){
  if(s.article) return s.article;                                   // explicit wins
  if(defunded)  return 'defunding-16';
  if(/funding band/i.test(s.changed)) return 'funding-bands';
  if(/new unit|new foundation/i.test(s.changed)) return 'units-foundation';
  if(dev) return 'standards-in-review';
  if(/waiting|pending/i.test(s.epa || '')) return 'no-epa';
  return ROUTE_ARTICLES[s.route] || 'standards-in-review';
}

/* =========================================================================
   WHAT CHANGED — a two or three word label

   The "changed" text is a sentence. This reduces it to something you can
   read at a glance in a list, so you can scan a column of forty items and
   see which ones are money, which are paperwork, and which are fatal.
   ========================================================================= */

function changeTag(text, status){
  const t = String(text || '').toLowerCase();
  const s = String(status || '').toLowerCase();

  if(/defunded/.test(s) || /funding withdrawn/.test(t))     return { label:'Funding withdrawn', tone:'stop' };
  // "version 1.1 retired; 1.2 current" is a new version, not a retirement
  if(/version .* retired|retired.*current|now current/.test(t)) return { label:'New version', tone:'info' };
  if(/retirement consultation/.test(t + ' ' + s))           return { label:'Retirement consultation', tone:'stop' };
  if(/^retired|standard retired|retired standard/.test(t) || /^retired/.test(s))
                                                            return { label:'Retired', tone:'stop' };
  if(/paused/.test(t + ' ' + s))                            return { label:'Paused for starts', tone:'stop' };

  if(/funding band/.test(t)){
    const nums = t.match(/£([\d,]+)/g);
    if(nums && nums.length >= 2){
      const from = parseInt(nums[0].replace(/[£,]/g,''), 10);
      const to   = parseInt(nums[1].replace(/[£,]/g,''), 10);
      if(to > from) return { label:'Funding band increased', tone:'money' };
      if(to < from) return { label:'Funding band reduced',   tone:'money' };
    }
    return { label:'Funding band changed', tone:'money' };
  }

  if(/age restriction/.test(t))                             return { label:'Age restriction added', tone:'warn' };
  if(/duration changed/.test(t))                            return { label:'Duration changed', tone:'warn' };
  if(/level changed/.test(t))                               return { label:'Level changed', tone:'warn' };
  if(/assessment plan/.test(t))                             return { label:'Assessment plan revised', tone:'warn' };
  if(/ksb|knowledge, skills/.test(t))                       return { label:'KSBs revised', tone:'warn' };
  if(/replaces|replaced by/.test(t))                        return { label:'Replaced', tone:'warn' };

  if(/new standard|new unit|new foundation|newly approved|new on the register/.test(t))
                                                            return { label:'Newly approved', tone:'new' };
  if(/development|in revision|notice period/.test(t + ' ' + s))
                                                            return { label:'In revision', tone:'info' };
  if(/waiting|no assessment organisation/.test(t))          return { label:'Awaiting assessor', tone:'warn' };
  if(/version/.test(t))                                     return { label:'New version', tone:'info' };
  if(/status changed/.test(t))                              return { label:'Status changed', tone:'info' };

  return { label:'Updated', tone:'info' };
}

function changeTagHTML(text, status){
  const t = changeTag(text, status);
  return '<span class="ctag ' + t.tone + '">' + t.label + '</span>';
}

/* Hand-written updates carry their own label, because guessing from prose
   misfires — a summary mentioning assessment plans is not necessarily a
   change to one. Derived items fall back to reading the change text. */
function itemTagHTML(item){
  if(item.tag) return '<span class="ctag ' + item.tag.tone + '">' + item.tag.label + '</span>';
  if(item.derived) return changeTagHTML(item.changeText, item.rawStatus);
  return changeTagHTML(item.title + '. ' + item.summary, item.status);
}

/* =========================================================================
   SEARCH RANKING

   A boolean "does this contain the word" test returns the right set but in
   the wrong order — typing "project manager" put Level 6 Project Manager
   somewhere past forty near-misses. This scores every hit so the closest
   match is first.
   ========================================================================= */

function scoreMatch(query, fields){
  const q = String(query || '').toLowerCase().trim();
  if(!q) return 0;

  const name  = String(fields.name  || '').toLowerCase();
  const code  = String(fields.code  || '').toLowerCase();
  const extra = String(fields.extra || '').toLowerCase();

  const words = q.split(/\s+/).filter(w => w.length > 1);
  let score = 0;

  // exact and near-exact beat everything
  if(code && code === q)            score += 1000;
  if(name === q)                    score += 900;
  if(name.replace(/[^a-z0-9]/g,'') === q.replace(/[^a-z0-9]/g,'')) score += 850;

  // the name starts with what you typed
  if(name.startsWith(q))            score += 600;

  // a word in the name starts with what you typed
  if(new RegExp('\\b' + escapeRe(q)).test(name)) score += 400;

  // the phrase appears anywhere in the name
  if(name.includes(q))              score += 250;

  // every word you typed appears in the name, in order
  if(words.length > 1){
    let pos = 0, ordered = true;
    for(const w of words){
      const at = name.indexOf(w, pos);
      if(at < 0){ ordered = false; break; }
      pos = at + w.length;
    }
    if(ordered) score += 300;
  }

  // each word present in the name
  words.forEach(w => {
    if(new RegExp('\\b' + escapeRe(w)).test(name)) score += 90;
    else if(name.includes(w)) score += 55;
  });

  // partial code match, e.g. typing "1472"
  if(code && q.length > 2 && code.includes(q)) score += 300;

  // route, status and description are weak signals, not strong ones
  words.forEach(w => { if(extra.includes(w)) score += 8; });

  // shorter names win ties: "Project Manager" over "Project Manager (Degree)"
  if(score > 0) score += Math.max(0, 40 - name.length) / 4;

  return score;
}

function escapeRe(s){ return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

/* Rank a list by relevance, keeping only real hits. */
function rankBySearch(list, query, getFields){
  if(!query) return list;
  return list
    .map(item => ({ item: item, score: scoreMatch(query, getFields(item)) }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(x => x.item);
}
