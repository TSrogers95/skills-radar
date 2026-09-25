/* =========================================================================
   SKILLS RADAR — SHARED PAGE FURNITURE
   Builds the masthead and navigation so every page stays consistent.
   ========================================================================= */

const HERO = "The intelligence platform for early-career programmes.";
const HERO_SUB = "Spend less time interpreting guidance and more time building great programmes.";

const PAGES = [
  { file: "index.html",      label: "Feed" },
  { file: "articles.html",   label: "Articles" },
  { file: "standards.html",  label: "Standards" },
  { file: "rules.html",      label: "26/27 rules" },
  { file: "members.html",    label: "Members" }
];

function navHTML(current){
  return '<nav class="nav">' + PAGES.map(p =>
    '<a href="' + p.file + '"' + (p.file === current ? ' class="on"' : '') + '>' + p.label + '</a>'
  ).join('') + '</nav>';
}

/* Concentric arcs sweeping out of the corner — the radar idea without a
   logo, sitting behind the wordmark rather than competing with it. */
function backdropHTML(){
  let arcs = '';
  for(let i = 0; i < 6; i++){
    const r = 130 + i * 115;
    arcs += '<circle cx="960" cy="300" r="' + r + '" fill="none" ' +
            'stroke="#2F5D55" stroke-width="1" opacity="' + (0.5 - i * 0.06).toFixed(2) + '"/>';
  }
  return '<div class="backdrop" aria-hidden="true">' +
    '<svg viewBox="0 0 1200 340" preserveAspectRatio="xMaxYMid slice">' +
      arcs +
      '<path d="M960 300 L960 40 A260 260 0 0 1 1144 116 Z" fill="url(#sweep)" opacity="0.5"/>' +
      '<defs><linearGradient id="sweep" x1="0" y1="1" x2="1" y2="0">' +
        '<stop offset="0%" stop-color="#6ED0B6" stop-opacity="0.16"/>' +
        '<stop offset="100%" stop-color="#6ED0B6" stop-opacity="0"/>' +
      '</linearGradient></defs>' +
    '</svg>' +
  '</div>';
}

/* The home page carries a call to action under the hero; every other page
   does not, because repeating it on each one turns it into furniture people
   stop seeing. */
/* The ring is drawn only where there is room for it to sit outside the
   button without colliding with anything. Not building it below that width
   is safer than hiding it with CSS, which can be overridden or fail to load. */
function roomToScribble(){
  if(typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(min-width: 861px)').matches;
}

/* Hand-drawn annotation. Two overlapping wobbly strokes rather than a clean
   ellipse, because a perfect circle reads as a border and a slightly wrong
   one reads as someone having drawn on the page. Same trick on the arrow. */
function scribbleRing(){
  return '<svg class="ring" viewBox="0 0 260 86" aria-hidden="true" preserveAspectRatio="none">' +
    '<path d="M131 6 C74 4 14 17 9 43 C4 69 66 81 130 81 C194 81 253 71 251 44 C249 18 190 7 128 8" ' +
      'fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" opacity="0.85"/>' +
    '<path d="M126 11 C72 11 18 22 14 44 C11 66 70 77 131 76 C192 75 246 67 245 45 C244 24 196 12 137 11" ' +
      'fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.45"/>' +
  '</svg>';
}

function ctaHTML(){
  const price = (typeof MEMBERSHIP !== 'undefined' && MEMBERSHIP.price) ? MEMBERSHIP.price : '\u00A35';
  const period = (typeof MEMBERSHIP !== 'undefined' && MEMBERSHIP.period) ? MEMBERSHIP.period : 'a month';

  /* The argument, in the site's own numbers rather than adjectives. Counted
     live so it can never drift from what the site actually holds. */
  let standards = 0, changes = 0;
  try {
    standards = (typeof STANDARDS !== 'undefined') ? STANDARDS.length : 0;
    changes = (typeof allUpdates === 'function') ? allUpdates().length : 0;
  } catch(e){}

  const hook = 'Create an account and build a <em>personalised feed</em>.';

  const sub = (standards && changes)
    ? 'Choose the standards you deliver from all ' + standards.toLocaleString('en-GB') +
      ' on the register. Your feed then shows changes to those, alongside the funding rules that apply to everyone. ' +
      'A monthly newsletter explains what moved and why, and the levy forecast runs on figures you enter yourself.'
    : 'Choose the standards you deliver, and your feed shows changes to those alongside the funding rules that ' +
      'apply to everyone. A monthly newsletter explains what moved and why, and the levy forecast runs on figures ' +
      'you enter yourself.';

  return '<div class="herocta">' +
    '<div class="ctacopy">' +
      '<p class="ctahook">' + hook + '</p>' +
      '<p class="ctasub">' + sub + '</p>' +
    '</div>' +

    '<div class="ctaact">' +
      '<div class="ctaring">' +
        (roomToScribble() ? scribbleRing() : '') +
        '<a class="ctabtn" href="account.html?join=1">' +
          '<b>Become a member</b><span>' + price + ' ' + period + ' &middot; cancel any time</span>' +
        '</a>' +
      '</div>' +
      '<a class="ctalink" href="account.html">Already a member? Sign in</a>' +
    '</div>' +
  '</div>';
}

/* The wordmark is the page's h1 on the home page, where there is no other
   heading to carry it. Everywhere else the page's own title is the h1 and
   the wordmark is just a link, so each page has exactly one h1 that
   describes that page rather than the site. Same appearance either way. */
function isHomePage(){
  if(typeof location === 'undefined') return false;
  const p = location.pathname.replace(/\/+$/, '');
  return p === '' || /\/index\.html$/.test(p) || p === '/index';
}

function wordmarkHTML(){
  const inner = '<a href="index.html">Skills <em>Radar</em></a>';
  return isHomePage()
    ? '<h1 class="wordmark">' + inner + '</h1>'
    : '<p class="wordmark">' + inner + '</p>';
}

function titleBlockHTML(stampHTML, withCta){
  let cta = '';
  if(withCta){
    try { cta = ctaHTML(); }
    catch(e){ console.error('call to action could not render:', e.message); }
  }
  return '<div class="titleblock">' + backdropHTML() +
    '<div class="markrule">' +
      '<span class="pulse" aria-hidden="true"></span>' +
      '<span class="lbl">Apprenticeships &middot; Funding &middot; T-Levels</span>' +
      '<span class="line"></span>' +
    '</div>' +
    '<div class="brandrow">' +
      '<div class="brandmain">' +
        wordmarkHTML() +
        '<p class="hero">' + HERO + '<span class="herosub">' + HERO_SUB + '</span></p>' +
      '</div>' +
      (stampHTML ? '<div class="stamp">' + stampHTML + '</div>' : '') +
    '</div>' +
    cta +
  '</div>';
}

/* ---------- Article icons ----------
   Simple line-and-fill symbols, one per article theme. */

const ICONS = {
  stop: '<circle cx="26" cy="26" r="19" fill="#FBEAE8"/><path d="M18 18 L34 34 M34 18 L18 34" stroke="#B3261E" stroke-width="3" stroke-linecap="round"/>',
  coin: '<circle cx="26" cy="26" r="19" fill="#EDEBF7"/><ellipse cx="26" cy="20" rx="12" ry="4.5" fill="none" stroke="#443E86" stroke-width="2.2"/><path d="M14 20v12c0 2.5 5.4 4.5 12 4.5s12-2 12-4.5V20" fill="none" stroke="#443E86" stroke-width="2.2"/><path d="M14 26c0 2.5 5.4 4.5 12 4.5s12-2 12-4.5" fill="none" stroke="#443E86" stroke-width="2.2"/>',
  cap: '<circle cx="26" cy="26" r="19" fill="#EAEFF6"/><path d="M26 15 L40 22 L26 29 L12 22 Z" fill="#2A4A78"/><path d="M18 25.5V33c0 0 3.4 3 8 3s8-3 8-3v-7.5" fill="none" stroke="#2A4A78" stroke-width="2.2"/><path d="M39 22.5v8" stroke="#2A4A78" stroke-width="2.2" stroke-linecap="round"/>',
  book: '<circle cx="26" cy="26" r="19" fill="#E9F2EC"/><path d="M14 17h9c2.2 0 3 1.3 3 3v17c0-1.7-.8-3-3-3h-9z" fill="#2C6142"/><path d="M38 17h-9c-2.2 0-3 1.3-3 3v17c0-1.7.8-3 3-3h9z" fill="none" stroke="#2C6142" stroke-width="2.2"/>',
  clock: '<circle cx="26" cy="26" r="19" fill="#FBF0DC"/><circle cx="26" cy="26" r="12" fill="none" stroke="#A96A06" stroke-width="2.4"/><path d="M26 18v8.5l6 3.5" stroke="#A96A06" stroke-width="2.4" stroke-linecap="round" fill="none"/>',
  shop: '<circle cx="26" cy="26" r="19" fill="#E9F2EC"/><path d="M15 22h22l-2 15H17z" fill="none" stroke="#2C6142" stroke-width="2.2"/><path d="M15 22l2.5-6h17l2.5 6" fill="none" stroke="#2C6142" stroke-width="2.2" stroke-linejoin="round"/><path d="M21 27v4M31 27v4" stroke="#2C6142" stroke-width="2.2" stroke-linecap="round"/>',
  blocks: '<circle cx="26" cy="26" r="19" fill="#EDEBF7"/><rect x="14" y="24" width="10" height="10" rx="1.5" fill="#443E86"/><rect x="27" y="24" width="10" height="10" rx="1.5" fill="none" stroke="#443E86" stroke-width="2.2"/><rect x="20.5" y="12" width="10" height="10" rx="1.5" fill="none" stroke="#443E86" stroke-width="2.2"/>',
  check: '<circle cx="26" cy="26" r="19" fill="#EAEFF6"/><rect x="16" y="14" width="20" height="24" rx="2" fill="none" stroke="#2A4A78" stroke-width="2.2"/><path d="M20 25l4 4 8-9" stroke="#2A4A78" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  handshake: '<circle cx="26" cy="26" r="19" fill="#E9F2EC"/><path d="M13 23l6-4 7 3 7-3 6 4" fill="none" stroke="#2C6142" stroke-width="2.2" stroke-linejoin="round"/><path d="M19 24l5 6 4-2 5 5" fill="none" stroke="#2C6142" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 23v7M39 23v7" stroke="#2C6142" stroke-width="2.2" stroke-linecap="round"/>',
  desk: '<circle cx="26" cy="26" r="19" fill="#F6EFE6"/><rect x="14" y="18" width="24" height="7" rx="1.5" fill="#77522A"/><path d="M17 25v11M35 25v11" stroke="#77522A" stroke-width="2.4" stroke-linecap="round"/><rect x="20" y="27" width="8" height="6" rx="1" fill="none" stroke="#77522A" stroke-width="2"/>',
  flame: '<circle cx="26" cy="26" r="19" fill="#FBF0DC"/><path d="M26 13c5 6 9 9 9 15a9 9 0 0 1-18 0c0-4 2-6 4-9 1 2 2 3 3 3 0-4 1-7 2-9z" fill="#A96A06"/><path d="M26 30c1.6 1.6 2.4 2.6 2.4 4a2.4 2.4 0 0 1-4.8 0c0-1.4.8-2.4 2.4-4z" fill="#FBF0DC"/>',
  layers: '<circle cx="26" cy="26" r="19" fill="#EAEFF6"/><path d="M26 14l12 6-12 6-12-6z" fill="#2A4A78"/><path d="M14 26l12 6 12-6" fill="none" stroke="#2A4A78" stroke-width="2.2" stroke-linejoin="round"/><path d="M14 32l12 6 12-6" fill="none" stroke="#2A4A78" stroke-width="2.2" stroke-linejoin="round"/>',
  signpost: '<circle cx="26" cy="26" r="19" fill="#F6EFE6"/><path d="M26 13v26" stroke="#77522A" stroke-width="2.6" stroke-linecap="round"/><path d="M26 17h11l3 4-3 4H26z" fill="#77522A"/><path d="M26 28H15l-3 4 3 4h11z" fill="none" stroke="#77522A" stroke-width="2.2" stroke-linejoin="round"/>'
};

function iconHTML(key){
  const shape = ICONS[key] || ICONS.layers;
  return '<svg class="ico" viewBox="0 0 52 52" aria-hidden="true">' + shape + '</svg>';
}

/* Map an article tag to its colour class */
function tagClass(tag){
  if(tag === "Funding rules") return "t-funding";
  if(tag === "Levy") return "t-levy";
  if(tag === "T-Levels") return "t-tlevels";
  return "t-standard";
}

function urgencyTag(u){
  if(u === "high")   return '<span class="tag t-act">Act now</span>';
  if(u === "medium") return '<span class="tag t-plan">Plan ahead</span>';
  return '<span class="tag t-info">For information</span>';
}

/* ---------- The sticky bar ----------

   This used to animate the masthead's height as you scrolled, collapsing the
   hero away. That is what made it feel glitchy: changing an element's height
   changes the height of the whole document, so the page shifts under your
   finger mid-scroll, which can re-trigger the very threshold that caused it.

   It now does nothing to the layout at all. The bar is fixed rather than
   sticky, so it takes up no space until it is needed — that is what removed
   the pale band that used to sit under the masthead. The masthead scrolls
   away like any other content and the bar slides down over the top. Only
   transform and opacity change, both of which the browser handles on the
   compositor without recalculating layout, so it stays smooth on a phone.
*/

function wireCollapse(){
  const bar = document.querySelector('.stickybar');
  if(!bar) return;

  const mast = document.querySelector('.masthead');
  let shown = false, ticking = false;

  /* Switch when the masthead has genuinely scrolled past, rather than at an
     arbitrary pixel count, so it behaves the same on every page whatever the
     header height. */
  function threshold(){
    return mast ? Math.max(80, mast.offsetHeight - 70) : 140;
  }

  function update(){
    ticking = false;
    const past = window.scrollY > threshold();
    if(past === shown) return;
    shown = past;
    bar.classList.toggle('scrolled', past);
  }

  window.addEventListener('scroll', () => {
    if(ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });

  window.addEventListener('resize', update, { passive: true });
  update();
}

