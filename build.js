/* =========================================================================
   BUILD STEP

   Generates a real HTML file for every article, plus a sitemap and robots
   file. Vercel runs this on each deploy, so the pages regenerate whenever
   the data changes and there is nothing to remember.

   Why this exists: article.html?id=… works for people but not for search
   engines, which see one page. A crawler needs a distinct URL with its own
   title, description and content in the source, not assembled by script
   after the page loads.

   Output: /a/<id>.html, sitemap.xml, robots.txt
   ========================================================================= */

const fs = require('fs');
const path = require('path');

const SITE = process.env.SITE_URL || 'https://skills-radar.co.uk';
const OUT  = 'a';

/* ---------- Load the data the same way a browser would ---------- */

function load(){
  const files = ['standards.js', 'defunded.js', 'otj-minimums.js', 'occupations.js', 'data.js', 'guides.js', 'app.js', 'ui.js'];
  let src = '';
  files.forEach(f => {
    if(fs.existsSync(f)) src += fs.readFileSync(f, 'utf8') + '\n';
  });
  // ui.js touches the DOM at parse time in places; give it somewhere to go
  const stub = 'var document={getElementById:function(){return null},querySelector:function(){return null},' +
    'querySelectorAll:function(){return []},addEventListener:function(){}};' +
    'var window={addEventListener:function(){},location:{}};var location={hash:"",search:""};' +
    'var navigator={};var sessionStorage={getItem:function(){return null},setItem:function(){},removeItem:function(){}};';
  return new Function(stub + src + '; return {allArticles:allArticles, allUpdates:allUpdates, ROUTES:ROUTES, STANDARDS:STANDARDS, ' +
    'READING:(typeof READING!=="undefined"?READING:[]), GUIDES:(typeof GUIDES!=="undefined"?GUIDES:[]), fmtLong:fmtLong, money:money, band:band, standardVersionURL:standardVersionURL, ' +
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
<title>${esc(truncate(strip(a.title), 65))}, Skills Radar</title>
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
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400&family=Public+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../styles.css">

<script type="application/ld+json">${JSON.stringify(ld)}</script>
<script type="application/ld+json">${JSON.stringify(crumbs)}</script>
</head>
<body>
<a class="skiplink" href="#main">Skip to content</a>

<div class="masthead">
  <div class="wrap"><div id="heroblock"></div></div>
</div>

<div class="stickybar">
  <div class="wrap inner">
    <a class="mini" href="../index.html">Skills <em>Radar</em></a>
    <div id="navslot"></div>
  </div>
</div>

<main id="main" tabindex="-1">
<div class="wrap">
  <nav class="crumbs">
    <a href="../index.html">Skills Radar</a><span>&rsaquo;</span>
    <a href="../articles.html">Articles</a><span>&rsaquo;</span>
    ${route ? `<a href="../articles.html?route=${a.route}">${esc(route.label)}</a><span>&rsaquo;</span>` : ''}
    <b>${esc(a.tag)}</b>
  </nav>

  <article class="piece ${a.urgency}">
    <div class="ptags">
      ${route ? `<span class="tag t-standard">${esc(route.label)}</span>` : ''}
      <span class="pdate"><time datetime="${a.date}">${api.fmtLong(a.date)}</time></span>
    </div>

    <h1>${esc(a.title)}</h1>
    <p class="pstand">${esc(a.standfirst)}</p>

    ${standard ? factBox(standard, api) : ''}

    <div class="pbody">
      ${a.body.map(p => '<p>' + p + '</p>').join('\n      ')}
    </div>

    ${a.compiled ? `<div class="notice">The figures in the box above come from this standard&rsquo;s
      record on the Skills England register. The context and guidance below are ours, and are general to
      this kind of change rather than specific to your provision.</div>` : ''}

    ${a.onRoute && a.onRoute.length ? routeList(a) : ''}

    <div class="psources">
      <h2>Sources</h2>
      ${a.sources.map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)} &nearr;</a>`).join('\n      ')}
      ${api.READING.filter(r => r.tags.indexOf(a.tag) > -1).slice(0,3)
        .map(r => `<a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.name)} &nearr;</a>`).join('\n      ')}
    </div>

    <div class="sharebox">
      <a class="btn small ghost" href="../articles.html">All articles</a>
      <span class="hint">Published ${api.fmtLong(a.date)}</span>
    </div>
  </article>

  ${relatedHTML(a, api)}
</div>
</main>

<footer>
  <div class="wrap">
    <p>Reflects the Skills England register on ${api.fmtLong(a.date)}. Check the funding rules before acting.</p>
    <div class="attribution">
      <a href="https://www.gov.uk/government/organisations/skills-england" target="_blank" rel="noopener" class="selogo"><img src="https://occupational-maps.skillsengland.education.gov.uk/media/cyropis5/skills-england_lesser_arms_landscape-se-logo-white.svg" alt="Skills England" width="150" height="40" loading="lazy"></a>
      <p>Contains data from Skills England. &copy; Skills England 2026. This information is licensed under the <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3" target="_blank" rel="noopener">Open Government Licence v3.0</a>. Funding rules content is Crown copyright, also under the Open Government Licence.</p>
    </div>
  </div>
</footer>

<script src="../config.js"></script>
<script src="../standards.js"></script>
<script src="../defunded.js"></script>
<script src="../otj-minimums.js"></script>
<script src="../occupations.js" onerror="void 0"></script>
<script src="../data.js"></script>
<script src="../app.js"></script>
<script src="../ui.js"></script>
<script src="../config.js"></script>
<script src="../auth.js"></script>
<script defer src="/_vercel/insights/script.js"></script>
<script>
  /* Generated pages live in /a/, so every link out of them needs one level
   up. The nav was already rewritten; the wordmark was not, which is why
   clicking the logo landed on /a/ and 404'd. */
document.getElementById('heroblock').innerHTML = titleBlockHTML('').replace(/href="(?!\.\.\/|https?:|#|mailto:)/g, 'href="../');
  document.getElementById('navslot').innerHTML = navHTML('articles.html').replace(/href="/g, 'href="../');
  if(typeof recordView === 'function') recordView();
  if(typeof recordEvent === 'function') recordEvent('article', ${JSON.stringify(a.id)});
</script>
</body>
</html>`;
}

function factBox(s, api){
  const otj = api.otjMinimum ? api.otjMinimum(s) : null;
  const facts = [
    ['Level', s.level],
    ['Duration', s.months ? s.months + ' months' : 'delivered as a unit'],
    ['Maximum funding', api.band(s.funding)],
    ['Reference', s.code || null],
    ['Version', s.version],
    ['Status', s.status],
    ['Assessment', s.epa === 'Assigned'
      ? 'Assigned, an assessment organisation is in place'
      : (s.epa || null)]
  ];
  if(otj) facts.push(['Off-the-job minimum', otj + ' hours']);

  const path = api.pathwaysFor ? api.pathwaysFor(s) : [];
  const jobs = api.jobTitlesFor ? api.jobTitlesFor(s) : [];

  return `<aside class="factbox">
      <h2>${esc(s.name)}</h2>
      <dl>${facts.filter(f => f[1] !== null && f[1] !== undefined && f[1] !== '')
        .map(f => `<div><dt>${esc(f[0])}</dt><dd>${esc(f[1])}</dd></div>`).join('')}</dl>
      ${path.length ? `<div class="fbextra"><b>Pathway</b> ${esc(path.join(' · '))}</div>` : ''}
      ${jobs.length ? `<div class="fbextra"><b>Typical job titles</b> ${esc(jobs.slice(0,8).join(', '))}</div>` : ''}
      <a class="fblink" href="${esc(api.standardVersionURL ? api.standardVersionURL(s) : api.standardURL(s))}" target="_blank" rel="noopener">${esc(s.name)} on the Skills England register &nearr;</a>
    </aside>`;
}

function routeList(a){
  return `<section class="onroute">
      <h2>Every changed standard on this route, ${a.onRoute.length}</h2>
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

function sitemap(articles, guides){
  const pages = [
    { loc: '/', pri: '1.0', freq: 'daily' },
    { loc: '/articles.html', pri: '0.9', freq: 'daily' },
    { loc: '/standards.html', pri: '0.9', freq: 'weekly' },
    { loc: '/rules.html', pri: '0.8', freq: 'weekly' },
    { loc: '/guides/', pri: '0.9', freq: 'monthly' },
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
  )).concat((guides || []).map(g =>
    /* The pillar outranks everything but the home page: it is the page the
       whole cluster points at. */
    `  <url><loc>${SITE}/guides/${g.slug}.html</loc><lastmod>${g.updated}</lastmod>` +
    `<changefreq>monthly</changefreq><priority>${g.pillar ? '1.0' : '0.9'}</priority></url>`
  ));

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

function robots(){
  return `User-agent: *
Allow: /
Disallow: /admin.html
Disallow: /account.html
Disallow: /demo.html

Sitemap: ${SITE}/sitemap.xml
`;
}

/* =========================================================================
   METADATA FOR THE MAIN PAGES

   The article pages get their tags written when they are generated. The
   hand-written pages had none, no canonical, nothing for a link preview.
   Rather than hard-code a domain into ten files, this injects them at build
   time from SITE_URL, so the address lives in one place and cannot drift.
   ========================================================================= */

const PAGES = [
  { file: 'index.html',     loc: '/' },
  { file: 'articles.html',  loc: '/articles.html' },
  { file: 'standards.html', loc: '/standards.html' },
  { file: 'rules.html',     loc: '/rules.html' },
  { file: 'members.html',   loc: '/members.html' },
  { file: 'account.html',   loc: '/account.html' },
  { file: 'privacy.html',   loc: '/privacy.html' },
  { file: 'terms.html',     loc: '/terms.html' }
];

const START = '<!-- generated:meta -->';
const STOP  = '<!-- /generated:meta -->';

function injectMeta(){
  let done = 0;

  PAGES.forEach(p => {
    if(!fs.existsSync(p.file)) return;
    let html = fs.readFileSync(p.file, 'utf8');

    const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || 'Skills Radar';
    const desc  = (html.match(/<meta name="description" content="([\s\S]*?)"/) || [])[1] || '';
    const url   = SITE + (p.loc === '/' ? '/' : p.loc);

    // a private page should not be indexed or previewed
    const priv = p.file === 'members.html' || p.file === 'account.html';

    const block = START + '\n' +
      '<link rel="canonical" href="' + url + '">\n' +
      (priv
        ? '<meta name="robots" content="noindex, follow">\n'
        : '<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">\n') +
      '<meta property="og:type" content="website">\n' +
      '<meta property="og:site_name" content="Skills Radar">\n' +
      '<meta property="og:locale" content="en_GB">\n' +
      '<meta property="og:title" content="' + esc(strip(title)) + '">\n' +
      '<meta property="og:description" content="' + esc(strip(desc)) + '">\n' +
      '<meta property="og:url" content="' + url + '">\n' +
      '<meta name="twitter:card" content="summary">\n' +
      '<meta name="twitter:title" content="' + esc(strip(title)) + '">\n' +
      '<meta name="twitter:description" content="' + esc(strip(desc)) + '">\n' +
      (p.loc === '/' ? siteSchema() : '') +
      STOP;

    // replace a previous run's block rather than stacking them up
    const existing = new RegExp(START + '[\\s\\S]*?' + STOP);
    html = existing.test(html)
      ? html.replace(existing, block)
      : html.replace('</head>', block + '\n</head>');

    fs.writeFileSync(p.file, html);
    done++;
  });

  console.log('Metadata written into ' + done + ' pages');
}

/* Tells a search engine what the site is, and gives it the search box. */
function siteSchema(){
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Skills Radar',
    url: SITE + '/',
    description: 'Tracking changes to apprenticeship funding rules, standards and T-Levels in England.',
    inLanguage: 'en-GB',
    publisher: { '@type': 'Organization', name: 'Skills Radar', url: SITE + '/' }
  };
  return '<script type="application/ld+json">' + JSON.stringify(ld) + '</script>\n';
}

/* =========================================================================
   GUIDES

   Generates /guides/<slug>.html from guides.js, plus an index at
   /guides/index.html. These are the pages built to be found in search, so
   they carry more structured data than the article pages do: Article,
   FAQPage and BreadcrumbList, plus a table of contents and a properly
   linked cluster.
   ========================================================================= */

/* A month and year rather than a date. A guide is a standing answer, and a
   precise day on it invites the reader to treat it as news and to discount it
   the moment it is a few weeks old. The exact date still goes in the schema,
   where search engines want it. */
function monthOf(iso){
  const d = new Date(iso);
  return isNaN(d) ? '' : d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
}

function guidePage(g, all, fmtLong, api){
  const url = SITE + '/guides/' + g.slug + '.html';
  const pillar = all.find(x => x.pillar);
  const related = (g.related || []).map(s => all.find(x => x.slug === s)).filter(Boolean);

  /* The changes this guide covers, pulled live rather than written in, so a
     guide cannot quietly fall out of step with the feed. */
  const changes = (g.watch || [])
    .map(id => (api.allUpdates() || []).find(u => u.article === id || u.id === id))
    .filter(Boolean)
    .slice(0, 4);

  const toc = g.body.map((s, i) =>
    `<li><a href="#s${i + 1}">${esc(s.h)}</a></li>`).join('');

  const sections = g.body.map((s, i) => `
      <section class="gsec" id="s${i + 1}">
        <h2>${esc(s.h)}</h2>
        ${s.p.map(p => `<p>${esc(p)}</p>`).join('\n        ')}
      </section>`).join('');

  const faq = g.faq && g.faq.length ? `
      <section class="gfaq" id="faq">
        <h2>Common questions</h2>
        ${g.faq.map(f => `
        <details class="gq">
          <summary>${esc(f.q)}</summary>
          <p>${esc(f.a)}</p>
        </details>`).join('')}
      </section>` : '';

  /* Article, FAQ and breadcrumbs. The FAQ block is what produces the
     expanded result in Google, and it only works if the questions on the
     page match the questions in the markup exactly. */
  const ld = [
    {
      '@context': 'https://schema.org', '@type': 'Article',
      headline: g.h1, description: g.description,
      datePublished: g.updated, dateModified: g.updated,
      inLanguage: 'en-GB',
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      author: { '@type': 'Organization', name: 'Skills Radar', url: SITE + '/' },
      publisher: { '@type': 'Organization', name: 'Skills Radar', url: SITE + '/' }
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Skills Radar', item: SITE + '/' },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: SITE + '/guides/' },
        { '@type': 'ListItem', position: 3, name: g.h1, item: url }
      ]
    }
  ];
  if(g.faq && g.faq.length){
    ld.push({
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: g.faq.map(f => ({
        '@type': 'Question', name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a }
      }))
    });
  }

  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(g.title)}</title>
<meta name="description" content="${esc(g.description)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Skills Radar">
<meta property="og:locale" content="en_GB">
<meta property="og:title" content="${esc(g.title)}">
<meta property="og:description" content="${esc(g.description)}">
<meta property="og:url" content="${url}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${esc(g.title)}">
<meta name="twitter:description" content="${esc(g.description)}">
${ld.map(x => '<script type="application/ld+json">' + JSON.stringify(x) + '</script>').join('\n')}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400&family=Public+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../styles.css">
</head>
<body>
<a class="skiplink" href="#main">Skip to content</a>

<div class="masthead">
  <div class="wrap"><div id="heroblock"></div></div>
</div>

<div class="navbar"><div class="wrap"><div id="navmain"></div></div></div>

<div class="stickybar">
  <div class="wrap inner">
    <a class="mini" href="../index.html">Skills <em>Radar</em></a>
    <div id="navslot"></div>
  </div>
</div>

<main id="main" tabindex="-1">
<div class="wrap">

  <nav class="crumbs" aria-label="Breadcrumb">
    <a href="../index.html">Home</a> <span>›</span>
    <a href="index.html">Guides</a> <span>›</span>
    <span>${esc(g.h1)}</span>
  </nav>

  <article class="guide${g.pillar ? ' pillar' : ''}">
    <header class="ghead">
      ${g.pillar ? '<span class="ctag new">Complete guide</span>' : ''}
      <h1>${esc(g.h1)}</h1>
      <p class="gstand">${esc(g.description)}</p>
      <p class="gmeta">Checked against current guidance ${monthOf(g.updated)} · about ${g.reading} minutes to read</p>
    </header>

    <nav class="gtoc" aria-label="On this page">
      <h2>On this page</h2>
      <ol>${toc}${g.faq && g.faq.length ? '<li><a href="#faq">Common questions</a></li>' : ''}</ol>
    </nav>

    ${sections}
    ${faq}

    ${changes.length ? `
    <section class="gchanges">
      <h2>What has changed recently</h2>
      <p class="gchintro">Live from the feed. This guide is kept in step with these.</p>
      ${changes.map(c => `<a class="gch" href="../${c.article ? OUT + '/' + c.article + '.html' : 'index.html'}">
        <span class="ctag ${c.urgency === 'high' ? 'stop' : c.urgency === 'medium' ? 'warn' : 'new'}">${esc(c.tagText || 'Changed')}</span>
        <span class="gchtitle">${esc(c.title)}</span>
        <span class="gchdate">${fmtLong(c.date)}</span>
      </a>`).join('')}
    </section>` : ''}

    <div class="gcta">
      <h2>Track this yourself</h2>
      <p>Skills Radar follows every change to the funding rules, the standards register and T-Levels,
      with what changed, what it changed from, and what follows. Free to read.</p>
      <div class="gctabtns">
        <a class="btn" href="../index.html">See what has changed</a>
        <a class="btn ghost" href="../rules.html">Browse the 2026/27 rules</a>
      </div>
    </div>
  </article>

  ${related.length ? `
  <div class="grouphead"><h2>Related guides</h2></div>
  <div class="grelated">
    ${related.map(r => `<a class="gcard" href="${r.slug}.html">
      <h3>${esc(r.h1)}</h3>
      <p>${esc(r.description)}</p>
    </a>`).join('')}
  </div>` : ''}

  ${!g.pillar && pillar ? `
  <p class="gback">Part of <a href="${pillar.slug}.html">${esc(pillar.h1)}</a>,
  our complete guide to the 2026/27 rules.</p>` : ''}

</div>
</main>

<footer>
  <div class="wrap">
    <p>Skills Radar is built from the Skills England apprenticeship register and occupational maps,
    taken from their published API and data downloads, together with the GOV.UK apprenticeship funding
    rules and T-Level guidance. The register and occupational maps refresh weekly. Every entry links to
    its source, and you should check that source before acting on a compliance deadline.</p>
    <p class="legal"><a href="../privacy.html">Privacy notice</a> ·
      <a href="../terms.html">Terms</a> · <a href="../account.html">Members</a></p>
    <div class="attribution">
      <a href="https://www.gov.uk/government/organisations/skills-england" target="_blank" rel="noopener" class="selogo"><img src="https://occupational-maps.skillsengland.education.gov.uk/media/cyropis5/skills-england_lesser_arms_landscape-se-logo-white.svg" alt="Skills England" width="150" height="40" loading="lazy"></a>
      <p>Contains data from Skills England. © Skills England 2026. This information is licensed under the
      <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3" target="_blank" rel="noopener">Open Government Licence v3.0</a>.
      Funding rules content is Crown copyright, also under the Open Government Licence.</p>
    </div>
  </div>
</footer>

<script src="../config.js"></script>
<script src="../standards.js"></script>
<script src="../defunded.js"></script>
<script src="../otj-minimums.js"></script>
<script src="../occupations.js" onerror="void 0"></script>
<script src="../data.js"></script>
<script src="../app.js"></script>
<script src="../ui.js"></script>
<script src="../auth.js"></script>
<script defer src="/_vercel/insights/script.js"></script>
<script>
  document.getElementById('heroblock').innerHTML = titleBlockHTML('').replace(/href="(?!\.\.\/|https?:|#|mailto:)/g, 'href="../');
  document.getElementById('navmain').innerHTML = navHTML('').replace(/href="/g, 'href="../');
  document.getElementById('navslot').innerHTML = navHTML('').replace(/href="/g, 'href="../');
  if(typeof recordView === 'function') recordView();
  if(typeof recordEvent === 'function') recordEvent('guide', ${JSON.stringify(g.slug)});
</script>
</body>
</html>`;
}

function guidesIndex(all, fmtLong){
  const url = SITE + '/guides/';
  const pillar = all.find(x => x.pillar);
  const rest = all.filter(x => !x.pillar);

  const ld = {
    '@context': 'https://schema.org', '@type': 'CollectionPage',
    name: 'Apprenticeship funding guides',
    description: 'Guides to the 2026/27 apprenticeship funding rules, compliance, audit and eligibility.',
    url: url, inLanguage: 'en-GB'
  };

  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Apprenticeship Funding Guides: Rules, Compliance and Audit</title>
<meta name="description" content="Plain guides to apprenticeship funding: the 2026/27 rules, compliance requirements, audit preparation, eligibility, evidence and the levy.">
<link rel="canonical" href="${url}">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Skills Radar">
<meta property="og:title" content="Apprenticeship Funding Guides">
<meta property="og:description" content="Guides to the 2026/27 apprenticeship funding rules, compliance, audit and eligibility.">
<meta property="og:url" content="${url}">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400&family=Public+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../styles.css">
</head>
<body>
<a class="skiplink" href="#main">Skip to content</a>

<div class="masthead"><div class="wrap"><div id="heroblock"></div></div></div>
<div class="navbar"><div class="wrap"><div id="navmain"></div></div></div>
<div class="stickybar"><div class="wrap inner">
  <a class="mini" href="../index.html">Skills <em>Radar</em></a><div id="navslot"></div>
</div></div>

<main id="main" tabindex="-1">
<div class="wrap">

  <div class="pagehead">
    <h1>Apprenticeship funding guides</h1>
    <p>Standing answers to the questions that come up most: what the rules require,
    what compliance actually means, what an audit looks at, and who can be funded.</p>
  </div>

  ${pillar ? `
  <a class="gpillar" href="${pillar.slug}.html">
    <span class="ctag new">Start here</span>
    <h2>${esc(pillar.h1)}</h2>
    <p>${esc(pillar.description)}</p>
    <span class="gmore">Read the complete guide →</span>
  </a>` : ''}

  <div class="grouphead"><h2>Every guide</h2></div>
  <div class="grelated wide">
    ${rest.map(g => `<a class="gcard" href="${g.slug}.html">
      <h3>${esc(g.h1)}</h3>
      <p>${esc(g.description)}</p>
      <span class="gwhen">Checked ${monthOf(g.updated)}</span>
    </a>`).join('')}
  </div>

</div>
</main>

<footer><div class="wrap">
  <p class="legal"><a href="../privacy.html">Privacy notice</a> · <a href="../terms.html">Terms</a> · <a href="../account.html">Members</a></p>
</div></footer>

<script src="../config.js"></script>
<script src="../standards.js"></script>
<script src="../defunded.js"></script>
<script src="../otj-minimums.js"></script>
<script src="../data.js"></script>
<script src="../app.js"></script>
<script src="../ui.js"></script>
<script src="../auth.js"></script>
<script defer src="/_vercel/insights/script.js"></script>
<script>
  document.getElementById('heroblock').innerHTML = titleBlockHTML('').replace(/href="(?!\.\.\/|https?:|#|mailto:)/g, 'href="../');
  document.getElementById('navmain').innerHTML = navHTML('').replace(/href="/g, 'href="../');
  document.getElementById('navslot').innerHTML = navHTML('').replace(/href="/g, 'href="../');
  if(typeof recordView === 'function') recordView();
</script>
</body>
</html>`;
}

/* ---------- Run ---------- */

function run(){
  const api = load();
  const articles = api.allArticles();

  if(!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

  // clear stale pages, so a removed article does not linger
  fs.readdirSync(OUT).filter(f => f.endsWith('.html')).forEach(f => fs.unlinkSync(path.join(OUT, f)));

  /* Only pages that exist go in the sitemap. Listing an address that was
     never written is a 404 handed straight to Google, and an article id used
     twice would mean one page quietly overwriting another. */
  const live = [], used = new Set();
  articles.forEach(a => {
    if(!a.id || !a.body || !a.body.length) return;
    if(used.has(a.id)){
      console.warn('Skipped duplicate article id: ' + a.id);
      return;
    }
    used.add(a.id);
    fs.writeFileSync(path.join(OUT, a.id + '.html'), page(a, api));
    live.push(a);
  });
  const written = live.length;

  injectMeta();

  /* The guides cluster */
  if(typeof api.GUIDES !== 'undefined' && api.GUIDES.length){
    if(!fs.existsSync('guides')) fs.mkdirSync('guides');
    api.GUIDES.forEach(g => fs.writeFileSync('guides/' + g.slug + '.html', guidePage(g, api.GUIDES, api.fmtLong, api)));
    fs.writeFileSync('guides/index.html', guidesIndex(api.GUIDES, api.fmtLong));
    console.log('Built ' + api.GUIDES.length + ' guides');
  }

  const map = sitemap(live, api.GUIDES || []);
  fs.writeFileSync('sitemap.xml', map);
  fs.writeFileSync('robots.txt', robots());

  console.log('Built ' + written + ' article pages');
  console.log('Sitemap: ' + (map.match(/<loc>/g) || []).length + ' urls');
  console.log('Site URL: ' + SITE + (process.env.SITE_URL ? '' : '  (set SITE_URL to change this)'));
}

run();
