/* =========================================================================
   BUILD STEP

   Generates a real HTML file for every article, plus a sitemap and robots
   file. Vercel runs this on each deploy, so the pages regenerate whenever
   the data changes and there is nothing to remember.

   Why this exists: article.html?id=… works for people but not for search
   engines, which see one page. A crawler needs a distinct URL with its own
   title, description and content in the source — not assembled by script
   after the page loads.

   Output: /a/<id>.html, sitemap.xml, robots.txt
   ========================================================================= */

const fs = require('fs');
const path = require('path');

const SITE = process.env.SITE_URL || 'https://skills-radar.vercel.app';
const OUT  = 'a';

/* ---------- Load the data the same way a browser would ---------- */

function load(){
  const files = ['standards.js', 'otj-minimums.js', 'occupations.js', 'data.js', 'app.js', 'ui.js'];
  let src = '';
  files.forEach(f => {
    if(fs.existsSync(f)) src += fs.readFileSync(f, 'utf8') + '\n';
  });
  // ui.js touches the DOM at parse time in places; give it somewhere to go
  const stub = 'var document={getElementById:function(){return null},querySelector:function(){return null},' +
    'querySelectorAll:function(){return []},addEventListener:function(){}};' +
    'var window={addEventListener:function(){},location:{}};var location={hash:"",search:""};' +
    'var navigator={};var sessionStorage={getItem:function(){return null},setItem:function(){},removeItem:function(){}};';
  return new Function(stub + src + '; return {allArticles:allArticles, ROUTES:ROUTES, STANDARDS:STANDARDS, ' +
    'READING:(typeof READING!=="undefined"?READING:[]), fmtLong:fmtLong, money:money, ' +
    'tagClass:tagClass, urgencyTag:urgencyTag, iconHTML:iconHTML, standardURL:standardURL, ' +
    'otjMinimum:(typeof otjMinimum==="function"?otjMinimum:null), ' +
    'pathwaysFor:(typeof pathwaysFor==="function"?pathwaysFor:null), ' +
    'jobTitlesFor:(typeof jobTitlesFor==="function"?jobTitlesFor:null), HERO:HERO, navHTML:navHTML, ' +
    'titleBlockHTML:titleBlockHTML};')();
}

const esc = s => String(s == null ? '' : s)
  .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

const strip = s => String(s == null ? '' : s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

/* ---------- One article page ---------- */

function page(a, api){
  const url = SITE + '/' + OUT + '/' + a.id + '.html';
  const route = a.route && api.ROUTES[a.route] ? api.ROUTES[a.route] : null;

  const standard = (a.standardCode || a.standardName)
    ? api.STANDARDS.find(s => (a.standardCode && s.code === a.standardCode) || s.name === a.standardName)
    : null;

  /* A description under 160 characters, because anything longer is cut off
     in results and the tail is wasted. */
  const desc = truncate(strip(a.summary || a.standfirst), 155);

  /* Structured data. Google uses this to understand what the page is and
     can show a richer result for it. */
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: truncate(strip(a.title), 110),
    description: desc,
    datePublished: a.date,
    dateModified: a.date,
    articleSection: a.tag,
    inLanguage: 'en-GB',
    isAccessibleForFree: true,
    author: { '@type': 'Organization', name: 'Skills Radar', url: SITE },
    publisher: {
      '@type': 'Organization', name: 'Skills Radar', url: SITE
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    about: standard
      ? { '@type': 'EducationalOccupationalProgram',
          name: standard.name,
          educationalProgramMode: 'apprenticeship',
          identifier: standard.code || undefined,
          educationalLevel: 'Level ' + standard.level,
          timeToComplete: standard.months ? 'P' + standard.months + 'M' : undefined }
      : { '@type': 'Thing', name: a.tag }
  };

  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Skills Radar', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: 'Articles', item: SITE + '/articles.html' },
      { '@type': 'ListItem', position: 3, name: strip(a.title), item: url }
    ]
  };

  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(truncate(strip(a.title), 65))} — Skills Radar</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">

<meta property="og:type" content="article">
<meta property="og:site_name" content="Skills Radar">
<meta property="og:locale" content="en_GB">
<meta property="og:title" content="${esc(strip(a.title))}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="article:published_time" content="${a.date}">
<meta property="article:section" content="${esc(a.tag)}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${esc(strip(a.title))}">
<meta name="twitter:description" content="${esc(desc)}">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600&family=Instrument+Sans:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../styles.css">

<script type="application/ld+json">${JSON.stringify(ld)}</script>
<script type="application/ld+json">${JSON.stringify(crumbs)}</script>
</head>
<body>

<div class="masthead">
  <div class="wrap"><div id="heroblock"></div></div>
</div>

<div class="stickybar">
  <div class="wrap inner">
    <a class="mini" href="../index.html">Skills <em>Radar</em></a>
    <div id="navslot"></div>
  </div>
</div>

<div class="wrap">
  <nav class="crumbs">
    <a href="../index.html">Skills Radar</a><span>&rsaquo;</span>
    <a href="../articles.html">Articles</a><span>&rsaquo;</span>
    ${route ? `<a href="../articles.html?route=${a.route}">${esc(route.label)}</a><span>&rsaquo;</span>` : ''}
    <b>${esc(a.tag)}</b>
  </nav>

  <article class="piece ${a.urgency}">
    <div class="ptags">
      <span class="tag ${api.tagClass(a.tag)}">${esc(a.tag)}</span>
      ${api.urgencyTag(a.urgency)}
      ${route ? `<span class="tag t-standard">${esc(route.label)}</span>` : ''}
      ${a.compiled ? '<span class="tag t-info">Compiled from the register</span>' : ''}
      <span class="pdate"><time datetime="${a.date}">${api.fmtLong(a.date)}</time></span>
    </div>

    <h1>${esc(a.title)}</h1>
    <p class="pstand">${esc(a.standfirst)}</p>

    ${standard ? factBox(standard, api) : ''}

    <div class="pbody">
      ${a.body.map(p => '<p>' + p + '</p>').join('\n      ')}
    </div>

    ${a.compiled ? `<div class="notice"><b>This page is compiled, not written.</b>
      Every figure in it comes from this standard&rsquo;s own record on the Skills England register.
      The guidance is general to this type of change rather than specific to your provision —
      check the source before acting on it.</div>` : ''}

    ${a.onRoute && a.onRoute.length ? routeList(a) : ''}

    <div class="psources">
      <h2>Sources</h2>
      ${a.sources.map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)} &nearr;</a>`).join('\n      ')}
      ${api.READING.filter(r => r.tags.indexOf(a.tag) > -1).slice(0,3)
        .map(r => `<a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.name)} &nearr;</a>`).join('\n      ')}
    </div>

    <div class="sharebox">
      <a class="btn small ghost" href="../articles.html">All articles</a>
      <span class="hint">Published ${api.fmtLong(a.date)}. Always check the source before acting on a compliance deadline.</span>
    </div>
  </article>

  ${relatedHTML(a, api)}
</div>

<footer>
  <div class="wrap">
    <p>Analysis reflects the position at the date shown. Skills Radar is not a substitute for the funding rules themselves.</p>
    <div class="attribution">
      <a href="https://www.gov.uk/government/organisations/skills-england" target="_blank" rel="noopener" class="selogo"><img src="https://occupational-maps.skillsengland.education.gov.uk/media/cyropis5/skills-england_lesser_arms_landscape-se-logo-white.svg" alt="Skills England" width="150" height="40" loading="lazy"></a>
      <p>Contains data from Skills England. &copy; Skills England 2026. This information is licensed under the <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3" target="_blank" rel="noopener">Open Government Licence v3.0</a>. Funding rules content is Crown copyright, also under the Open Government Licence.</p>
    </div>
  </div>
</footer>

<script src="../standards.js"></script>
<script src="../otj-minimums.js"></script>
<script src="../data.js"></script>
<script src="../app.js"></script>
<script src="../ui.js"></script>
<script defer src="/_vercel/insights/script.js"></script>
<script>
  document.getElementById('heroblock').innerHTML = titleBlockHTML('');
  document.getElementById('navslot').innerHTML = navHTML('articles.html').replace(/href="/g, 'href="../');
</script>
</body>
</html>`;
}

function factBox(s, api){
  const otj = api.otjMinimum ? api.otjMinimum(s) : null;
  const facts = [
    ['Level', s.level],
    ['Duration', s.months ? s.months + ' months' : 'delivered as a unit'],
    ['Maximum funding', api.money(s.funding)],
    ['Reference', s.code || 'not confirmed'],
    ['Version', s.version],
    ['Status', s.status],
    ['Assessment', s.epa || 'Assigned']
  ];
  if(otj) facts.push(['Off-the-job minimum', otj + ' hours']);

  const path = api.pathwaysFor ? api.pathwaysFor(s) : [];
  const jobs = api.jobTitlesFor ? api.jobTitlesFor(s) : [];

  return `<aside class="factbox">
      <h2>${esc(s.name)}</h2>
      <dl>${facts.map(f => `<div><dt>${esc(f[0])}</dt><dd>${esc(f[1])}</dd></div>`).join('')}</dl>
      ${path.length ? `<div class="fbextra"><b>Pathway</b> ${esc(path.join(' · '))}</div>` : ''}
      ${jobs.length ? `<div class="fbextra"><b>Typical job titles</b> ${esc(jobs.slice(0,8).join(', '))}</div>` : ''}
      <a class="fblink" href="${esc(api.standardURL(s))}" target="_blank" rel="noopener">View on the Skills England register &nearr;</a>
    </aside>`;
}

function routeList(a){
  return `<section class="onroute">
      <h2>Every changed standard on this route — ${a.onRoute.length}</h2>
      <p>Kept current from the register, so it reflects today rather than when this was written.</p>
      <div class="onroutelist">
        ${a.onRoute.map(s => `<div class="orrow"><div><b>L${s.level} ${esc(s.name)}</b><span>${esc(s.changed)}</span></div>` +
          (s.article ? `<a href="${s.article}.html">Open</a>` : '<span class="ornone">no separate page</span>') + '</div>').join('\n        ')}
      </div>
    </section>`;
}

function relatedHTML(a, api){
  const pool = api.allArticles().filter(x => x.id !== a.id);
  const scored = pool.map(x => {
    let s = 0;
    if(a.route && x.route === a.route) s += 10;
    if(x.tag === a.tag) s += 5;
    if(x.urgency === 'high') s += 2;
    if(!x.compiled) s += 3;
    return { x: x, s: s };
  }).filter(r => r.s > 0).sort((p, q) => q.s - p.s || new Date(q.x.date) - new Date(p.x.date)).slice(0, 6);

  if(!scored.length) return '';

  return `<section class="relwrap">
    <div class="grouphead"><h2>Read next</h2><div class="rule"></div></div>
    <div class="relgrid">
      ${scored.map(r => `<a class="relcard" href="${r.x.id}.html">${api.iconHTML(r.x.icon)}<div><b>${esc(r.x.title)}</b><span>${esc(r.x.summary)}</span><em>${esc(r.x.tag)}${r.x.compiled ? ' · compiled' : ''}</em></div></a>`).join('\n      ')}
    </div>
  </section>`;
}

function truncate(s, n){
  s = String(s || '');
  if(s.length <= n) return s;
  return s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…';
}

/* ---------- Sitemap and robots ---------- */

function sitemap(articles){
  const pages = [
    { loc: '/', pri: '1.0', freq: 'daily' },
    { loc: '/articles.html', pri: '0.9', freq: 'daily' },
    { loc: '/standards.html', pri: '0.9', freq: 'weekly' },
    { loc: '/rules.html', pri: '0.8', freq: 'weekly' },
    { loc: '/members.html', pri: '0.5', freq: 'monthly' },
    { loc: '/privacy.html', pri: '0.3', freq: 'yearly' },
    { loc: '/terms.html', pri: '0.3', freq: 'yearly' }
  ];

  const today = new Date().toISOString().slice(0, 10);

  const urls = pages.map(p =>
    `  <url><loc>${SITE}${p.loc}</loc><lastmod>${today}</lastmod>` +
    `<changefreq>${p.freq}</changefreq><priority>${p.pri}</priority></url>`
  ).concat(articles.map(a =>
    `  <url><loc>${SITE}/${OUT}/${a.id}.html</loc><lastmod>${a.date}</lastmod>` +
    `<changefreq>monthly</changefreq><priority>${a.compiled ? '0.6' : '0.8'}</priority></url>`
  ));

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

function robots(){
  return `User-agent: *
Allow: /
Disallow: /admin.html
Disallow: /account.html

Sitemap: ${SITE}/sitemap.xml
`;
}

/* ---------- Run ---------- */

function run(){
  const api = load();
  const articles = api.allArticles();

  if(!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

  // clear stale pages, so a removed article does not linger
  fs.readdirSync(OUT).filter(f => f.endsWith('.html')).forEach(f => fs.unlinkSync(path.join(OUT, f)));

  let written = 0;
  articles.forEach(a => {
    if(!a.id || !a.body || !a.body.length) return;
    fs.writeFileSync(path.join(OUT, a.id + '.html'), page(a, api));
    written++;
  });

  fs.writeFileSync('sitemap.xml', sitemap(articles));
  fs.writeFileSync('robots.txt', robots());

  console.log('Built ' + written + ' article pages');
  console.log('Sitemap: ' + (articles.length + 5) + ' urls');
  console.log('Site URL: ' + SITE + (process.env.SITE_URL ? '' : '  (set SITE_URL to change this)'));
}

run();
