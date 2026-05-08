# ウェブサイト更新マニュアル

## 1. 前提（初回のみ）

Node.js がインストールされていること。初回だけ以下を実行：

```bash
cd ~/Documents/a24hori.github.io
npm install
```

---

## 2. ファイル構成

```
a24hori.github.io/
├── pages/               ← ここにある .md ファイルを編集する
│   ├── index_j.md       トップページ（日本語）
│   ├── index_e.md       トップページ（英語）
│   ├── links_j.md       リンクページ（日本語）
│   ├── links_e.md       リンクページ（英語）
│   └── class.md         学生向けページ（日本語のみ）
│
├── build.js             ビルドスクリプト（基本触らない）
├── style.css            デザイン（基本触らない）
├── script.js            言語切り替え（基本触らない）
│
├── index.html           ← 自動生成（直接編集しない）
├── links.html           ← 自動生成（直接編集しない）
└── class.html           ← 自動生成（直接編集しない）
```

**ルール：** `pages/` 内の `.md` ファイルだけを編集し、`npm run build` で HTML を生成する。

---

## 3. ページの種類

### 2言語ページ（JA/EN 切り替えあり）

`pages/name_j.md`（日本語）と `pages/name_e.md`（英語）のペアで管理。  
`npm run build` で `name.html` が生成される。

例：`index_j.md` + `index_e.md` → `index.html`

### 1言語ページ（日本語のみ）

`pages/name.md` のみで管理。  
`npm run build` で `name.html` が生成される。

例：`class.md` → `class.html`

---

## 4. Markdown の書き方

### フロントマター（ファイル先頭の `---` の部分）

ページのメタ情報を記載する。

```markdown
---
title: ページタイトル
---
```

トップページのみ、プロフィールカード用の追加フィールドがある：

```markdown
---
title: 堀篤史のウェブサイト
name: 堀 篤史
affiliation: 助教，名古屋工業大学 大学院工学研究科
field: 数理最適化，均衡問題への応用
---
```

`noindex: true` を加えると検索エンジンに非公開になる（`class.md` で使用中）。

### セクション（カード）の書き方

`## 見出し` を書くと、自動的にカードになる：

```markdown
## ニュース

- 2026/06/01：新しいニュース
- 2026/05/01：...

## 連絡先

メール: hori.atsushi [*] nitech.ac.jp
```

リンクや箇条書き・番号付きリストも通常の Markdown で書ける：

```markdown
## リンク

- [名古屋工業大学](https://www.nitech.ac.jp/)
- [成蹊大学](https://www.seikei.ac.jp/university/)

## 受賞歴

1. 優秀発表賞，2021年
2. 学生論文賞，2018年
```

---

## 5. ビルドして公開する

### ビルド

```bash
npm run build
```

`pages/` 内のすべての `.md` ファイルを読み込み、対応する `.html` を生成する。

### GitHub Pages へ公開

```bash
git add pages/ index.html links.html class.html
git commit -m "update: ニュースを追加"
git push
```

プッシュ後、数分以内に https://a24hori.github.io に反映される。

---

## 6. 新しいページを追加する

例として `research` というページを追加する手順：

### ステップ 1：Markdown ファイルを作成

2言語の場合：

```bash
# pages/research_j.md と pages/research_e.md を作成
```

```markdown
# pages/research_j.md
---
title: 研究
---

## 研究テーマ

...
```

```markdown
# pages/research_e.md
---
title: Research
---

## Research Topics

...
```

1言語の場合：`pages/research.md` のみ作成。

### ステップ 2：build.js に登録

`build.js` の `PAGES` 配列に一行追加する：

```javascript
const PAGES = [
  { name: 'index',  bilingual: true,  nav: [...] },
  { name: 'links',  bilingual: true,  nav: [...] },
  { name: 'class',  bilingual: false, nav: [...] },
  // ↓ 追加
  {
    name: 'research',
    bilingual: true,   // 1言語なら false
    nav: [
      { href: './index.html', ja: '← トップ', en: '← Home' },
    ],
  },
];
```

必要に応じて、他のページの `nav` にも `research.html` へのリンクを追加する。

### ステップ 3：ビルドして公開

```bash
npm run build
git add pages/research_j.md pages/research_e.md research.html build.js
git commit -m "add: 研究ページを追加"
git push
```

---

## 7. よくある作業まとめ

| やりたいこと | 編集するファイル | ビルド |
|---|---|---|
| ニュースを追加 | `pages/index_j.md`, `pages/index_e.md` | 必要 |
| プロフィールを変更 | `pages/index_j.md`, `pages/index_e.md` | 必要 |
| リンクを追加 | `pages/links_j.md`, `pages/links_e.md` | 必要 |
| 学生向けページを更新 | `pages/class.md` | 必要 |
| 新しいページを追加 | `pages/<name>.md` + `build.js` | 必要 |
