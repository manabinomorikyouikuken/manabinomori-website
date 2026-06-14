# CLAUDE.md

Guidance for AI assistants (and humans) working in this repository.

## What this is

The public marketing website for **合同会社まなびの森教育研究所**
(Manabi no Mori Educational Research Institute LLC), a Japanese company
specializing in **特別支援教育 (special-needs education)** — consultation,
training, and learning materials. The site's content is in Japanese.

- **Hosting:** GitHub Pages, served from the `main` branch.
- **Live URL:** `https://manabinomorikyouikuken.github.io/manabinomori-website/`
- **Tech stack:** Hand-authored **static HTML**. No build step, no
  framework, no bundler, no `package.json`. Files are deployed exactly as
  they sit in the repo.
- **Only JavaScript:** `assets/analytics-events.js` (GA4 event tracking).
  Everything else is HTML + inline `<style>`.

Because there is no build pipeline, **what you edit is what ships.** Open a
page in a browser to preview it; no server or compilation is required.

## Repository layout

```
/                                  # GitHub Pages site root
├── index.html                     # Home page (top page)
├── services.html                  # Services for schools/teachers
├── parents.html                   # Pages aimed at parents/guardians
├── tokubetsu-shien.html           # Special-support overview (legacy hub)
├── columns.html                   # Index/listing of all コラム (columns)
├── research-notes.html            # Index of research notes
├── research-note-*.html           # Individual long-form research notes
├── profile-*.html                 # Author/profile pages
├── accounting-materials.html      # Bookkeeping (簿記3級) materials hub
├── legal.html                     # 特定商取引法に基づく表記 (commercial law notice)
├── privacy.html                   # Privacy policy
├── thanks.html                    # Generic contact-form thank-you page
├── sitemap.xml  robots.txt        # SEO — maintained by hand (see below)
│
├── tokushi/                       # ~45 column articles (特別支援 columns)
│   ├── asd.html  adhd.html  ld.html  dcd.html ...   # disability explainers
│   ├── shugaku-sodan-01.html ...                    # topic articles
│   ├── worksheets.html                             # product landing pages
│   ├── first_30days_checksheet.html                #   live under tokushi/
│   └── parent_meeting_school_collaboration.html
│
├── products/                      # Digital-product assets & sample/thank-you pages
│   ├── worksheets/                # sample HTML + thank-you page
│   ├── first_30days_checksheet/   # sample PDF + thank-you page
│   └── parent_meeting_school_collaboration/  # sample PDF
│
├── boki3/      boki3_en/          # 簿記3級 (bookkeeping) landing + thank-you (JP / EN)
│
├── assets/
│   ├── analytics-events.js        # GA4 custom event tracking (the only JS)
│   ├── images/                    # WebP images, organized by section:
│   │   ├── home/  services/  parents/  columns/ ...
│   └── *.webp                     # banners, OGP image
│
├── logo.webp
├── .github/workflows/link-check.yml   # weekly + on-push broken-link check
└── README.md
```

## Page anatomy & conventions

Every page is a **self-contained HTML document**. There is no shared CSS
file or templating — each page repeats its own `<head>` boilerplate and
inline `<style>`. When you add or change a page, keep it consistent with
this established pattern:

1. **`<html lang="ja">`** and `<meta charset="UTF-8">` + viewport.
2. **`<title>`** ending in `| 合同会社まなびの森教育研究所` (or
   `| まなびの森教育研究所` on column pages).
3. **`<meta name="description">`** — concise Japanese summary.
4. **`<link rel="canonical">`** — the page's absolute live URL. Always
   update this when copying a page as a template.
5. **OGP + Twitter Card** meta tags. Use `og:type` `website` for top-level
   pages, `article` for column/article pages.
6. **JSON-LD structured data** (`application/ld+json`) where appropriate —
   `Organization` on the home page, `Article`/`BreadcrumbList` on columns.
7. **GA4 snippet** — the `gtag.js` loader for `G-MRXYRR7DF7`, copied inline
   into the `<head>` of every page.
8. **`assets/analytics-events.js`** — included near the end of the body on
   essentially every page (currently 64 pages) for custom event tracking.
9. **Inline `<style>`** in the `<head>`.

### Design tokens (CSS custom properties)

Pages share a consistent forest/green palette defined via `:root` variables.
Reuse these values rather than inventing new colors:

```css
--bg:#f7f5ef;      /* warm off-white background        */
--panel:#ffffff;   /* card/panel surface               */
--ink:#1f2a1f;     /* primary text (near-black green)   */
--sub:#58635b;     /* secondary/muted text             */
--line:#d7ddd6;    /* borders/dividers                 */
--accent:#5d7c61;  /* forest green accent              */
--accent-2:#8ea38c;
--soft:#eef3ed;    /* soft green fill                  */
--radius:18px;  --max:1120px;   /* (760px for article pages) */
```

- Links use `#285d39` (dark green); primary buttons use `.btn-primary` with
  the `--accent` background and pill (`border-radius:999px`) shape.
- Body font stack is the system Japanese stack:
  `-apple-system, BlinkMacSystemFont, "Hiragino Sans", "Yu Gothic UI", "Yu Gothic", "Meiryo", sans-serif`.
- Article pages (`tokushi/*.html`) share a reusable set of component
  classes: `.hero-article`, `.article-body`, `.point-box`,
  `.experiment-box`, `.cta-box`, `.keyword-box`, `.column-eyecatch`, plus a
  responsive table treatment (`@media(max-width:640px)` turns tables into
  stacked cards using `td::before { content: attr(data-label) }`). When
  authoring a new column, copy an existing one (e.g. `tokushi/asd.html`) as
  the template so styling stays consistent.
- Images are **WebP**, stored under `assets/images/<section>/`, and served
  responsively with `<picture>` where used.

## Integrations

- **Google Analytics 4** — property `G-MRXYRR7DF7` (same ID site-wide).
- **`assets/analytics-events.js`** fires custom GA4 events. When you add
  new products, Stripe links, or flows, keep this file's mappings in sync:
  - `purchase_click` — clicks on `buy.stripe.com` links.
  - `purchase_complete` — page view of any `*thank-you.html`.
  - `sample_click` / `sample_view` — sample PDF/HTML interactions.
  - `contact_click` / `contact_form_submit` — mailto/contact/Formspree.
  - `policy_click` / `policy_view` — `legal.html` / `privacy.html`.
  - The `productName()` helper maps Stripe URL slugs and path keywords to
    product names (`first_30days_checksheet`, `boki3_jp`, etc.). **Update
    this mapping whenever a Stripe link or product slug changes.**
- **Stripe Checkout** — products sell via hard-coded `https://buy.stripe.com/...`
  payment links embedded in the HTML.
- **Formspree** — the contact form posts to `https://formspree.io/f/mykolgnd`.
- **Contact email** — `manabinomorikyouikuken@gmail.com`.

## SEO files — keep these in sync manually

There is no automation generating these; update them by hand when pages
change:

- **`sitemap.xml`** — add a `<url>` entry for every new public page and bump
  `<lastmod>` (ISO `YYYY-MM-DD`) when a page changes meaningfully. Set a
  sensible `<priority>` / `<changefreq>`.
- **`robots.txt`** — currently `Allow: /` with specific `Disallow:` entries
  for raw product files (zip downloads, gated `boki3` index/curriculum
  pages). Add `Disallow:` lines for any new files that should not be
  indexed.
- **`<link rel="canonical">`** in each page must point to that page's own
  live URL.

## CI / automation

- **`.github/workflows/link-check.yml`** — runs **lychee** (a Rust link
  checker) over `./**/*.html` to catch broken internal, self-absolute, and
  external links. Triggers: on push to `main`, weekly (Sun 23:00 UTC /
  Mon 08:00 JST), and manual `workflow_dispatch`. It is configured with
  `fail: false`, so it **does not break the build** — results appear in the
  Actions run **Summary**. After changing links or moving/renaming pages,
  check this summary (or run lychee locally) to confirm nothing is broken.
- There is **no test suite, linter, or formatter.** "Validation" means:
  open the page in a browser, and review the link-check summary.

## Working in this repo

- **Branch:** do development on the branch you were assigned; never push
  directly to `main` unless explicitly told to. (`main` is the live
  deployment branch — merging to it publishes immediately.)
- **No build/install step.** Don't add `npm install`, bundlers, or a
  framework unless explicitly requested — the project is intentionally
  plain static HTML.
- **Editing pages:** make surgical edits to the relevant HTML. Match the
  surrounding markup, indentation, and the inline-style conventions of the
  file you're in.
- **Adding a page:** copy the closest existing page as a template, then
  update `<title>`, `<meta description>`, **canonical URL**, OGP tags,
  JSON-LD, and any visible navigation/listing pages that should link to it
  (e.g. add column cards to `columns.html`). Then add it to `sitemap.xml`.
- **Renaming/moving a page:** update every internal link to it, its
  `canonical`, `sitemap.xml`, `robots.txt` if listed, and any redirects.
  The 2026-06-05 "broken-link cleanup" (404×14, 15 articles with dead body
  links) is the reason the link-check CI exists — avoid regressing it.
- **Commit messages:** short, imperative English (matching existing
  history, e.g. *"Update product pricing and Stripe links"*). Commit and
  push only when the task calls for it.
- **`.gitignore`** excludes local working files: `.DS_Store`, `.claude/`,
  draft pamphlet HTML, the `旧バージョン/` (old-versions) folder, logo
  source assets, and helper scripts. Don't commit those.

## Content/tone notes

- All user-facing copy is **Japanese**. Preserve the existing respectful,
  reassuring tone aimed at parents, teachers, and children dealing with
  special-needs education. Use established domain terminology
  (e.g. 特別支援教育, 就学相談, 合理的配慮, ASD/ADHD/LD/DCD).
- The company positions itself on "29 years of practical experience" framing
  困り感 (difficulties) into 支援と学びの言葉 (words of support and learning).
  Keep claims and figures consistent with existing pages.
