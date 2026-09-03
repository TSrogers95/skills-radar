/* =========================================================================
   SKILLS RADAR — SHARED PAGE FURNITURE
   Builds the masthead and navigation so every page stays consistent.
   ========================================================================= */

const HERO = "The intelligence platform for early careers professionals — spend less time interpreting guidance and more time building great programmes.";

const PAGES = [
  { file: "index.html",      label: "Feed" },
  { file: "articles.html",   label: "Articles" },
  { file: "standards.html",  label: "Standards" },
  { file: "rules.html",      label: "24/25 rules" },
  { file: "members.html",    label: "Members" }
];

function navHTML(current){
  return '<nav class="nav">' + PAGES.map(p =>
    '<a href="' + p.file + '"' + (p.file === current ? ' class="on"' : '') + '>' + p.label + '</a>'
  ).join('') + '</nav>';
}

/* Horizontal scan lines behind the wordmark */
function scanlinesHTML(){
  let out = '<div class="scanlines" aria-hidden="true">';
  for(let i = 0; i < 7; i++){
    out += '<i style="top:' + (10 + i * 11) + 'px;opacity:' + (0.55 - i * 0.06).toFixed(2) + '"></i>';
  }
  return out + '</div>';
}

function titleBlockHTML(stampHTML){
  return '<div class="titleblock">' + scanlinesHTML() +
    '<div class="markrule">' +
      '<span class="tick" aria-hidden="true"><b></b><b></b><b></b></span>' +
      '<span class="lbl">Apprenticeships · Funding · T-Levels</span>' +
      '<span class="line"></span>' +
    '</div>' +
    '<div class="brandrow">' +
      '<div>' +
        '<h1 class="wordmark"><a href="index.html">Skills Radar</a></h1>' +
        '<p class="hero">' + HERO + '</p>' +
      '</div>' +
      (stampHTML ? '<div class="stamp">' + stampHTML + '</div>' : '') +
    '</div>' +
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

/* ---------- Collapse the hero on scroll ---------- */

function wireCollapse(){
  const els = document.querySelectorAll('.collapsing');
  if(!els.length) return;

  function measure(){
    els.forEach(el => {
      if(el.classList.contains('hid')) return;
      el.style.maxHeight = el.scrollHeight + 'px';
    });
  }
  measure();
  window.addEventListener('resize', measure);
  // re-measure once webfonts land, or the height is wrong and it jumps
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(measure);

  // Hysteresis: collapse at 120px, only reopen below 40px. Without the gap
  // the header flickers open and shut when you hover around the threshold.
  let hidden = false, ticking = false;

  function update(){
    ticking = false;
    const y = window.scrollY;
    const should = hidden ? y > 40 : y > 120;
    if(should === hidden) return;
    hidden = should;
    els.forEach(el => el.classList.toggle('hid', should));
  }

  window.addEventListener('scroll', () => {
    if(ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });
}
