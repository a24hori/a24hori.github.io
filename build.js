const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');
const markedKatex = require('marked-katex-extension');

marked.use(markedKatex({ throwOnError: false }));

// ============================================================
// ナビゲーション設定
// 新しいページを追加したら、ここに一行追加する。
// bilingual: true  → pages/<name>_j.md + pages/<name>_e.md を読む
// bilingual: false → pages/<name>.md を読む
// ============================================================
const PAGES = [
  {
    name: 'index',
    bilingual: true,
    nav: [
      { href: './links.html', ja: 'リンク', en: 'Links' },
      { href: './class.html', ja: '学生向け', en: 'For Students' },
    ],
  },
  {
    name: 'links',
    bilingual: true,
    nav: [
      { href: './index.html', ja: '← トップ', en: '← Home' },
      { href: './class.html', ja: '学生向け', en: 'For Students' },
    ],
  },
  {
    name: 'class',
    bilingual: false,
    nav: [
      { href: './index.html', ja: '← トップ' },
      { href: './links.html', ja: 'リンク' },
    ],
  },
];
// ============================================================

const PAGES_DIR = 'pages';

function wrapSectionsInCards(html) {
  return html
    .split(/(?=<h2[^>]*>)/)
    .filter(s => s.trim())
    .map(s => {
      const match = s.match(/<h2[^>]*>(.*?)<\/h2>/);
      const heading = match
        ? match[1].replace(/<[^>]+>/g, '').toLowerCase().trim()
        : '';
      return `<section class="card" data-section="${heading}">\n${s}</section>`;
    })
    .join('\n');
}

function renderNav(items) {
  return items
    .map(item =>
      item.en
        ? `<a href="${item.href}" data-ja="${item.ja}" data-en="${item.en}">${item.ja}</a>`
        : `<a href="${item.href}">${item.ja}</a>`
    )
    .join('\n        ');
}

function profileCard(data) {
  if (!data.name || !data.affiliation) return '';
  return `
      <div class="card profile-card">
        <img src="./imgs/profile.jpg" alt="profile" class="profile-img">
        <div class="profile-text">
          <h1>${data.name}</h1>
          <p class="affiliation">${data.affiliation}</p>
          ${data.field ? `<p class="field">${data.field}</p>` : ''}
        </div>
      </div>`;
}

function buildBilingual({ name, nav }) {
  const ja = matter(fs.readFileSync(path.join(PAGES_DIR, `${name}_j.md`), 'utf-8'));
  const en = matter(fs.readFileSync(path.join(PAGES_DIR, `${name}_e.md`), 'utf-8'));
  const noindex = ja.data.noindex ? '\n  <meta name="robots" content="noindex">' : '';

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">${noindex}
  <title>${ja.data.title} / ${en.data.title}</title>
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css">
</head>
<body>
  <header class="site-header">
    <div class="header-inner">
      <nav class="nav-links">
        ${renderNav(nav)}
      </nav>
      <div class="lang-switcher">
        <button class="lang-btn" data-lang="ja" onclick="switchLang('ja')">JA</button>
        <span class="lang-sep">|</span>
        <button class="lang-btn" data-lang="en" onclick="switchLang('en')">EN</button>
      </div>
    </div>
  </header>

  <main>
    <div id="content-ja" class="lang-content">${profileCard(ja.data)}
      <div class="content-sections">
        ${wrapSectionsInCards(marked(ja.content))}
      </div>
    </div>
    <div id="content-en" class="lang-content hidden">${profileCard(en.data)}
      <div class="content-sections">
        ${wrapSectionsInCards(marked(en.content))}
      </div>
    </div>
  </main>

  <script src="script.js"></script>
</body>
</html>`;
}

function buildSingle({ name, nav }) {
  const page = matter(fs.readFileSync(path.join(PAGES_DIR, `${name}.md`), 'utf-8'));
  const noindex = page.data.noindex ? '\n  <meta name="robots" content="noindex">' : '';

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">${noindex}
  <title>${page.data.title}</title>
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css">
</head>
<body>
  <header class="site-header">
    <div class="header-inner">
      <nav class="nav-links">
        ${renderNav(nav)}
      </nav>
    </div>
  </header>

  <main>
    <div class="content-sections">
      ${wrapSectionsInCards(marked(page.content))}
    </div>
  </main>

  <script src="script.js"></script>
</body>
</html>`;
}

function build() {
  for (const page of PAGES) {
    const html = page.bilingual ? buildBilingual(page) : buildSingle(page);
    const outFile = `${page.name}.html`;
    fs.writeFileSync(outFile, html, 'utf-8');
    console.log(`Built ${outFile}${page.bilingual ? ' (JA/EN)' : ''}`);
  }
}

build();
