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
        article: articleForStandard(s, defunded, dev),
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

/* =========================================================================
   COMPILED ARTICLES

   The written articles cover policy. They cannot cover every standard — but
   a defunding, a withdrawal, a funding band move or a pause is significant
   enough that it deserves its own page rather than being folded into a route
   round-up.

   These are compiled from the register, not written. Every fact in them
   comes from the standard's own record. They are labelled as compiled on the
   articles page so nobody mistakes them for analysis.
   ========================================================================= */

/* Which changes are significant enough to warrant their own article. */
function significance(s){
  if(!s.changed) return null;
  const c = s.changed.toLowerCase(), st = (s.status || '').toLowerCase();

  if(/defunded/.test(st) || /funding withdrawn/.test(c))  return 'defunded';
  if(/retirement consultation/.test(c + st))              return 'retiring';
  if(/^retired|standard retired/.test(c))                 return 'retired';
  if(/paused/.test(c + st))                               return 'paused';
  if(/funding band/.test(c))                              return 'band';
  if(/age restriction/.test(c))                           return 'age';
  if(/replaces|replaced by/.test(c))                      return 'replaced';
  return null;                                            // routine: route round-up covers it
}

function gbp(n){ return '£' + Number(n || 0).toLocaleString('en-GB'); }

function compiledArticle(s){
  const kind  = significance(s);
  if(!kind) return null;

  const route = ROUTES[s.route];
  const level = 'Level ' + s.level;
  const dur   = s.months ? s.months + ' months' : 'delivered as a unit';
  const rname = route ? route.label : 'its route';

  const spec = level + ', ' + dur + ', maximum funding ' + gbp(s.funding) +
    (s.code ? ', reference ' + s.code : '') + ', currently at version ' + s.version + '.';

  const body = [], sources = [];
  let title, summary, standfirst, urgency, icon;

  if(kind === 'defunded'){
    urgency = 'high'; icon = 'stop';
    title = s.name + ' loses funding from September 2026';
    summary = 'One of the sixteen standards being defunded. Existing apprentices are safe; no new starts after the cut-off.';
    standfirst = 'A funded route into this occupation closes, and for most of the sixteen no replacement has been announced.';
    body.push(
      s.name + ' at ' + level + ' is one of sixteen apprenticeship standards losing funding from no earlier than 1 September 2026. ' + spec,
      'What changes: government funding is withdrawn for new starts. Apprentices already on programme are unaffected and remain funded through to completion. What you cannot do is start anyone new after the cut-off.',
      'The practical deadline is earlier than the formal one. Eligibility checks, contracting and onboarding typically take six to eight weeks, so a start that has not been set up well before September will not be funded.',
      'The reason given is budget pressure combined with a policy shift towards younger apprentices. Skills England has noted the offer grew beyond 700 standards while starts among 16 to 24 year olds fell around 40% over a decade, with growth concentrated in older, higher-level and more expensive provision.',
      'What to do about it: if you deliver this standard, decide now whether learners can move to an adjacent standard on ' + rname + ', whether apprenticeship units can cover the same capability, or whether development here moves outside the levy entirely. If you are an employer using it as a pipeline, you need that answer before the cut-off rather than after it.'
    );
    sources.push({ label: 'Skills England — Streamlining apprenticeships', url: 'https://help.apprenticeships.education.gov.uk/hc/en-gb/articles/34005717182226-Streamlining-apprenticeships' });
  }

  else if(kind === 'retiring'){
    urgency = 'high'; icon = 'stop';
    title = s.name + ': retirement consultation open';
    summary = 'Skills England is consulting on withdrawing this standard. Consultation is the only point at which the outcome can be influenced.';
    standfirst = 'Not yet a decision — which is exactly why it is worth responding to.';
    body.push(
      'A retirement consultation is open on ' + s.name + ' at ' + level + '. ' + spec,
      'A retirement consultation means Skills England is asking whether the standard should continue. It is not a decision, and outcomes do vary — some standards emerge revised rather than withdrawn.',
      'What changes today: nothing. The standard remains approved for delivery and you can continue to start apprentices on it while the consultation runs.',
      'What could change: if the outcome is retirement, the standard closes to new starts from a date to be announced, with existing apprentices funded to completion as usual.',
      'What to do about it: respond. Consultation is the only stage at which employer and provider demand is formally counted, and standards on ' + rname + ' with quiet consultations are the ones most likely to go. In the meantime, avoid building a new commercial offer on this standard until the outcome is known, and have an alternative identified.'
    );
    sources.push({ label: 'Skills England apprenticeship register', url: 'https://skillsengland.education.gov.uk/apprenticeships/' });
  }

  else if(kind === 'retired'){
    urgency = 'high'; icon = 'stop';
    title = s.name + ' has been retired';
    summary = 'Closed to new starts. Apprentices already on programme continue to completion.';
    standfirst = 'The standard is gone for new starts, and the question is what replaces it.';
    body.push(
      s.name + ' at ' + level + ' has been retired on the Skills England register. ' + spec,
      'A retired standard cannot take new starts. Apprentices who began before the retirement date continue under the rules and version that applied when they started, and remain funded to completion.',
      'Where a standard is retired because it has been replaced by a newer version or a restructured occupation, the replacement will be on the register under its own reference. Where it is retired because the occupation no longer warrants an apprenticeship, there is no replacement.',
      'What to do about it: check the register for a successor standard on ' + rname + ' before assuming either. Then confirm which version each apprentice on programme sits under, because the funding rules that apply are those in force on their individual start date rather than today.'
    );
    sources.push({ label: 'Skills England apprenticeship register', url: 'https://skillsengland.education.gov.uk/apprenticeships/' });
  }

  else if(kind === 'paused'){
    urgency = 'high'; icon = 'stop';
    title = s.name + ' is paused for new starts';
    summary = 'You cannot enrol anyone while the pause holds, though existing apprentices continue.';
    standfirst = 'The most disruptive status on the register, because it arrives without notice.';
    body.push(
      s.name + ' at ' + level + ' is currently paused for starts. ' + spec,
      'A pause is different from a revision. A standard in revision can still take new apprentices on the current version. A paused standard cannot take anyone at all until the pause lifts.',
      'Apprentices already on programme are unaffected and continue to completion.',
      'Pauses are usually applied while something material is being resolved — an assessment plan problem, a regulatory change, or a funding review. No end date is normally published.',
      'What to do about it: if you had a cohort planned, you need an alternative on ' + rname + ' now rather than a wait-and-see. Check the register weekly, since a pause can lift as suddenly as it appeared, and tell any employer expecting to recruit onto this standard before they advertise a vacancy they cannot fill.'
    );
    sources.push({ label: 'Skills England apprenticeship register', url: 'https://skillsengland.education.gov.uk/apprenticeships/' });
  }

  else if(kind === 'band'){
    const nums = String(s.changed).match(/£([\d,]+)/g) || [];
    const from = nums[0] ? parseInt(nums[0].replace(/[£,]/g,''), 10) : null;
    const to   = nums[1] ? parseInt(nums[1].replace(/[£,]/g,''), 10) : s.funding;
    const up   = from !== null && to > from;
    const pct  = from ? Math.round(((to - from) / from) * 100) : null;

    urgency = 'medium'; icon = 'coin';
    title = s.name + ': funding band ' + (up ? 'raised' : 'changed') + ' to ' + gbp(to);
    summary = up
      ? 'Up' + (pct ? ' ' + pct + '%' : '') + ' from ' + gbp(from) + ', which changes whether this is viable to deliver.'
      : 'The maximum you can draw for this standard has moved.';
    standfirst = 'Band reviews are quiet, infrequent and financially significant.';
    body.push(
      'The funding band for ' + s.name + ' at ' + level + ' has moved' +
        (from !== null ? ' from ' + gbp(from) + ' to ' + gbp(to) : ' to ' + gbp(to)) +
        (pct ? ', an increase of around ' + pct + '%' : '') + '. ' + spec,
      'The band is a maximum, not a price. It caps what can be drawn from a levy account or co-invested. The actual price is negotiated between employer and provider, so a band increase does not automatically raise what you charge.',
      'The band that applies is the one in force at the apprentice\'s start date. Apprentices already on programme stay on the old band for their full duration, which means you may be delivering the same standard at two prices at once. Check your MIS applies the right one per learner rather than the current one to everybody.',
      up
        ? 'What to do about it: if you withdrew from this standard on cost grounds, the arithmetic has changed and it is worth revisiting. For employers, a higher band means a larger potential draw on the levy account, which matters more now that new funds expire after twelve months.'
        : 'What to do about it: re-cost the programme before your next cohort, and check the reduction does not take delivery below viability on ' + rname + '.'
    );
    sources.push({ label: 'Skills England apprenticeship register', url: 'https://skillsengland.education.gov.uk/apprenticeships/' });
  }

  else if(kind === 'age'){
    urgency = 'medium'; icon = 'cap';
    title = s.name + ': new age restriction applies';
    summary = 'Eligibility now depends on the apprentice\'s age at the start of training.';
    standfirst = 'An eligibility rule rather than a funding rate — get it wrong and the whole start is unfunded.';
    body.push(
      'An age restriction now applies to ' + s.name + ' at ' + level + '. ' + spec,
      'This is an eligibility condition, not a co-investment rate. An apprentice outside the age range cannot be funded on this standard at all, rather than being funded at a different percentage.',
      'Age is assessed at the start of the apprenticeship, using the learning start date recorded in the ILR. Someone who turns 25 during their programme remains eligible; someone who was already 25 on day one never was.',
      'Age restrictions of this kind fit the wider pattern across the 2026/27 rules of directing funding towards younger apprentices, alongside the Level 7 restriction and the changes to co-investment.',
      'What to do about it: check the eligibility gate in your enrolment process actually tests this, rather than relying on someone remembering. An ineligible start discovered at audit is a clawback, not a correction. And be aware there is now no funded route at this level on ' + rname + ' for adults outside the range.'
    );
    sources.push({ label: 'GOV.UK — Apprenticeship funding rules', url: 'https://www.gov.uk/guidance/apprenticeship-funding-rules' });
  }

  else if(kind === 'replaced'){
    urgency = 'medium'; icon = 'signpost';
    title = s.name + ' has been restructured';
    summary = 'The occupation has been reorganised, which changes the progression ladder rather than just the content.';
    standfirst = 'A replacement is not a version change — the shape of the route moves.';
    body.push(
      s.name + ' at ' + level + ' has been restructured on the register. ' + spec,
      'A restructure differs from a version update. A new version revises content within the same standard. A restructure replaces one standard with another, sometimes at a different level, which changes where the occupation sits on the progression ladder.',
      'For apprentices already on programme, the standard and version they started under continues to apply through to completion.',
      'What to do about it: map the new structure against your existing offer on ' + rname + ' before your next intake. Entry requirements, duration and funding may all differ from the standard it replaces, and marketing written for the old one will be wrong. Check whether learners you would previously have placed here now belong at a different level.'
    );
    sources.push({ label: 'Skills England apprenticeship register', url: 'https://skillsengland.education.gov.uk/apprenticeships/' });
  }

  return {
    id: 'std-' + (s.code || s.name.toLowerCase().replace(/[^a-z0-9]+/g,'-')),
    compiled: true,
    icon: icon,
    tag: 'Standard',
    urgency: urgency,
    route: s.route || '',
    date: s.since,
    title: title,
    summary: summary,
    standfirst: standfirst,
    body: body,
    sources: sources,
    standardName: s.name,
    standardCode: s.code
  };
}

/* Every article the site can show: written first, then compiled. */
function allArticles(){
  const compiled = STANDARDS.map(compiledArticle).filter(Boolean);
  const seen = new Set(ARTICLES.map(a => a.id));
  return ARTICLES.concat(compiled.filter(a => !seen.has(a.id)));
}

/* Point a feed item at its own compiled article where one exists, and fall
   back to the route round-up where the change is routine. */
function articleForStandard(s, defunded, dev){
  if(significance(s)) return 'std-' + (s.code || s.name.toLowerCase().replace(/[^a-z0-9]+/g,'-'));
  return articleFor(s, defunded, dev);
}


/* =========================================================================
   HOW CURRENT THE SITE IS

   Two stamps: DATA_UPDATED in data.js covers the written content, and
   STANDARDS_UPDATED in standards.js covers the register. An import moves the
   second without touching the first, so the site reports the later of the
   two rather than whichever happens to be to hand.
   ========================================================================= */

function lastUpdated(){
  const written  = typeof DATA_UPDATED === 'string' ? DATA_UPDATED : null;
  const register = typeof STANDARDS_UPDATED === 'string' ? STANDARDS_UPDATED : null;

  if(!written && !register) return { date: null, by: null };
  if(!register) return { date: written, by: 'written content' };
  if(!written)  return { date: register, by: sourceLabel() };

  return new Date(register) >= new Date(written)
    ? { date: register, by: sourceLabel() }
    : { date: written, by: 'written content' };
}

function sourceLabel(){
  const s = typeof STANDARDS_SOURCE === 'string' ? STANDARDS_SOURCE : 'hand';
  if(s === 'import') return 'register import';
  if(s === 'sync')   return 'automatic register sync';
  return 'register';
}


/* =========================================================================
   MATCHING A MEMBER'S STANDARD TO THE REGISTER

   People write "Project Manager"; the register says "Project Manager
   (integrated degree)". An exact-name lookup fails and the page reports
   "Not tracked", which reads like the standard does not exist. It tries
   progressively looser matches instead, and says plainly when it genuinely
   cannot find one.
   ========================================================================= */

function findStandard(entry){
  if(!entry) return null;
  const name = String(entry.name || '');
  const code = String(entry.code || '');
  const norm = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, '');
  const n = norm(name);

  // 1. reference number, if we have one
  if(code){
    const byCode = STANDARDS.find(s => s.code && s.code.toUpperCase() === code.toUpperCase());
    if(byCode) return byCode;
  }

  // 2. exact name
  const exact = STANDARDS.find(s => norm(s.name) === n);
  if(exact) return exact;

  // 3. the register name with a qualifier on the end, at the same level
  //    "Project Manager" -> "Project Manager (integrated degree)"
  const prefixed = STANDARDS.filter(s => norm(s.name).startsWith(n));
  if(prefixed.length){
    return prefixed.find(s => s.level === entry.level) || prefixed[0];
  }

  // 4. contained in a longer register name, but only at the same level, so
  //    "Engineering Technician" does not silently become "Rail Engineering
  //    Technician"
  const within = STANDARDS.filter(s => norm(s.name).includes(n) && s.level === entry.level);
  if(within.length === 1) return within[0];

  return null;
}

/* What to show when a cohort entry cannot be matched. */
function unmatchedNote(entry){
  const norm = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, '');
  const near = STANDARDS
    .filter(s => norm(s.name).includes(norm(entry.name)) || norm(entry.name).includes(norm(s.name)))
    .slice(0, 2);
  return near.length
    ? 'Not matched — did you mean ' + near.map(s => 'L' + s.level + ' ' + s.name).join(' or ') + '?'
    : 'Not on the register under this name';
}

/* =========================================================================
   OFF-THE-JOB TRAINING

   The rule: off-the-job training must average at least 6 hours a week across
   the planned duration, for an apprentice working 30 hours or more. Part-time
   apprentices are pro-rata on their contracted hours.

   Where the authoritative number lives: Annex C was removed from the 2026/27
   funding rules, and each standard's minimum volume is now published on the
   Skills England register against that standard. The figure calculated here
   is the 6-hours-a-week floor — a sound planning estimate, but the published
   minimum for your standard is what an audit measures you against. Enter it
   per standard where you know it, and this uses yours instead.
   ========================================================================= */

const OTJ_HOURS_PER_WEEK = 6;
const WEEKS_PER_MONTH = 52 / 12;

/* The minimum total for one apprentice on this standard. */
function otjRequired(entry){
  if(entry.otjRequired > 0) return { hours: entry.otjRequired, source: 'published' };
  const months = entry.months || 12;
  const weekly = entry.weeklyHours > 0 ? entry.weeklyHours : OTJ_HOURS_PER_WEEK;
  return { hours: Math.round(months * WEEKS_PER_MONTH * weekly), source: 'calculated' };
}

/* Where a cohort should be by now, and where it actually is. */
function otjPosition(entry){
  const req     = otjRequired(entry);
  const months  = entry.months || 12;
  const elapsed = Math.min(entry.otjElapsed || 0, months);
  const heads   = entry.count || 0;

  const perApprentice   = req.hours;
  const cohortRequired  = perApprentice * heads;
  const expectedPer     = months > 0 ? Math.round(perApprentice * (elapsed / months)) : 0;
  const cohortExpected  = expectedPer * heads;
  const cohortDelivered = entry.otjDelivered || 0;

  const variance = cohortDelivered - cohortExpected;
  const pct = cohortExpected > 0 ? Math.round((cohortDelivered / cohortExpected) * 100) : null;

  // What it takes to be back on plan by the end
  const remainingMonths = Math.max(0, months - elapsed);
  const remainingHours  = Math.max(0, cohortRequired - cohortDelivered);
  const weeklyNeeded = (remainingMonths > 0 && heads > 0)
    ? remainingHours / heads / (remainingMonths * WEEKS_PER_MONTH)
    : null;

  let state = 'unknown';
  if(elapsed > 0 && cohortExpected > 0){
    if(pct >= 100)     state = 'ahead';
    else if(pct >= 90) state = 'ontrack';
    else if(pct >= 75) state = 'behind';
    else               state = 'risk';
  }

  return {
    source: req.source,
    perApprentice, cohortRequired, cohortExpected, cohortDelivered,
    variance, pct, elapsed, months, heads,
    remainingMonths, remainingHours, weeklyNeeded, state
  };
}

function otjStateLabel(state){
  if(state === 'ahead')   return { text:'Ahead of plan',   tone:'new' };
  if(state === 'ontrack') return { text:'On track',        tone:'new' };
  if(state === 'behind')  return { text:'Behind plan',     tone:'warn' };
  if(state === 'risk')    return { text:'At risk',         tone:'stop' };
  return { text:'Not yet entered', tone:'info' };
}

/* =========================================================================
   OFF-THE-JOB TRAINING

   The rules changed fundamentally for starts from 1 August 2025. The old
   "6 hours a week" calculation applies only to apprentices who started
   before that date. Since then each standard carries its own published
   minimum number of hours, and from 1 August 2026 that figure appears on
   the front of the standard on the Skills England website.

   Two things follow that catch providers out:

     1. You cannot infer the requirement from duration any more. The figure
        is per standard and per version, and must be read from the register.
     2. Prior learning reduces the requirement, but never below 187 hours.
        A programme under 187 hours is non-compliant, full stop.

   Where a published figure has not been entered, this estimates one using
   the method DWP documented for setting them: 20% of 75% of the typical
   duration, at the historical off-the-job equivalent. That reproduces the
   worked example in the guidance (ST1398, 24 months, 418 hours) to within
   a few hours — but it is an estimate, and the site says so everywhere it
   is shown.
   ========================================================================= */

const OTJ_FLOOR = 187;   // below this, the programme is non-compliant

/* An earlier version of this file estimated the minimum from the typical
   duration. The published figures show why that was a bad idea: across the
   713 standards with a published minimum, the hours per month of typical
   duration range from under 8 to over 77. There is no reliable relationship
   to estimate from, so where a figure has not been published we say so
   rather than guess.

   Looks the standard up by reference number first, then by name. */
function otjMinimum(entry){
  if(typeof OTJ_MINIMUMS === 'undefined') return null;
  const reg = findStandard(entry);

  const code = (reg && reg.code) || entry.code || '';
  if(code && OTJ_MINIMUMS[code.toUpperCase()]) return OTJ_MINIMUMS[code.toUpperCase()][0];

  const norm = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, '');
  const want = norm((reg && reg.name) || entry.name);
  for(const k in OTJ_MINIMUMS){
    const row = OTJ_MINIMUMS[k];
    if(norm(row[1]) === want && row[2] === entry.level) return row[0];
  }
  for(const k in OTJ_MINIMUMS){
    if(norm(OTJ_MINIMUMS[k][1]) === want) return OTJ_MINIMUMS[k][0];
  }
  return null;
}

/* Work out where a cohort stands.
     published — the figure from the standard, or null to use the estimate
     rpl       — hours of recognised prior learning
     planned   — hours you actually plan to deliver  */
function otjPosition(entry, opts){
  opts = opts || {};
  const reg = findStandard(entry);
  const months = (reg && reg.months) || entry.months || 0;

  const official = otjMinimum(entry);                    // from the annex
  const entered  = opts.published != null && opts.published > 0 ? opts.published : null;
  const base = entered != null ? entered : official;

  if(base == null){
    return { name: entry.name, level: entry.level, count: entry.count || 0,
             months: months, official: null, entered: null,
             unknown: true, state: 'unknown' };
  }

  const rpl = Math.max(0, opts.rpl || 0);
  const afterRpl = base - rpl;

  // Prior learning cannot take the requirement below the floor
  const required = Math.max(OTJ_FLOOR, afterRpl);
  const rplCapped = afterRpl < OTJ_FLOOR && rpl > 0;

  const planned = opts.planned != null && opts.planned > 0 ? opts.planned : null;
  const variance = planned != null ? planned - required : null;

  let state = 'unset';
  if(planned != null){
    if(planned < OTJ_FLOOR)      state = 'illegal';   // under the floor outright
    else if(variance < 0)        state = 'short';
    else if(variance < required * 0.05) state = 'tight';
    else                         state = 'ok';
  }

  return {
    name: entry.name, level: entry.level, count: entry.count || 0,
    months: months, official: official, entered: entered,
    base: base, rpl: rpl, rplCapped: rplCapped,
    required: required, planned: planned, variance: variance,
    state: state,
    overridden: entered != null && official != null && entered !== official,
    // how many hours a week this works out at over the typical duration,
    // which is a sense check rather than a requirement
    weekly: planned ? (planned / ((months || 12) * 4.33)) : null
  };
}
