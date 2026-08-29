# Research Website v0.1 Architecture

## Goal

Turn `Xmemo/human-cognition-with-ai` into a fast, bilingual, low-maintenance public research website without creating a second content system.

The website is a **Living Research Observatory**, not a blog and not a SaaS application.

## Architecture

```text
GitHub research Markdown (canonical source)
        ↓
build-time content sync
        ↓
Astro + Starlight
        ↓
static build
        ↓
Cloudflare Workers Static Assets
        ↓
free *.workers.dev first
        ↓
optional custom domain later
```

Cloudflare Workers is used instead of Pages because current Cloudflare/Astro guidance recommends Workers for new Astro deployments. v0.1 is fully static, so no Astro Cloudflare adapter or Worker runtime entrypoint is needed.

## Single source of truth

Canonical research content remains at repository root:

- `README.md` / `README.zh-CN.md`
- `research/`
- `weekly/`
- `methodology/`
- `topics/`
- `people/`
- `references/`

The `site/` directory contains rendering, transformation, validation, and deployment code only.

`site/src/content/docs/` is generated on every build and is never manually maintained or committed.

## URL contract

English is the root locale and Simplified Chinese uses `/zh-cn/`.

| Content | English | Chinese |
|---|---|---|
| Dashboard | `/` | `/zh-cn/` |
| Current Baseline | `/baseline/` | `/zh-cn/baseline/` |
| Research Hub | `/research/` | `/zh-cn/research/` |
| Research archive | `/weekly/` | `/zh-cn/weekly/` |
| Dated research update | `/weekly/YYYY-MM-DD/` | `/zh-cn/weekly/YYYY-MM-DD/` |
| Research Map | `/research-map/` | English fallback until a canonical Chinese source exists |
| Search Protocol | `/methodology/search-protocol/` | English fallback |
| Evidence Grading | `/methodology/evidence-grading/` | English fallback |
| Topics | `/topics/<slug>/` | English fallback |
| Iyad Rahwan | `/people/iyad-rahwan/` | English fallback |
| Bibliography | `/references/bibliography/` | English fallback |

Build-time sync rewrites known internal Markdown links to these stable website routes. External DOI, publisher, and arXiv links remain unchanged.

## Homepage

The website homepage follows the repository Dashboard hierarchy:

1. Hero.
2. Latest Research.
3. Current Findings.
4. Control / Retention / Variance.
5. Start Here.
6. Three Research Domains.
7. Machine Culture Frontier.
8. How We Research.

The homepage content is generated from the canonical bilingual README files; the website does not maintain a second findings/latest copy.

## Search and discoverability

Starlight's built-in Pagefind search indexes generated static research pages. v0.1 keeps semantic HTML, stable URLs, crawlable DOI links, locale-aware pages, Open Graph site metadata, and optional absolute `SITE_URL` configuration.

RSS, analytics, accounts, comments, paper filters, AI chat, and a separate CMS are deliberately deferred.

## Deployment

`site/wrangler.jsonc` configures an assets-only Worker:

- name: `human-cognition-with-ai`
- compatibility date: `2026-08-29`
- `workers_dev: true`
- assets directory: `./dist`

No paid domain is required. A custom domain can be attached later without changing content or routes.

## Build and verification

A clean checkout can run:

```bash
cd site
npm install
npm run build
```

The build pipeline performs:

1. canonical content sync;
2. generated-content/public-boundary checks;
3. Astro type/content diagnostics;
4. static production build;
5. required-route, Pagefind, and built-output checks.

GitHub Actions runs the same pipeline whenever `site/` or canonical research content changes.

## Public boundary

The generated site inherits the repository's public/private filter. Build verification fails if known private-only markers appear in generated Markdown or HTML.

## v0.1 non-goals

Do not add user accounts, backend/database, comments, payment, newsletter-provider integration, AI chatbot, custom CMS, interactive citation graphs, full paper filters, automatic translation, or client-side analytics requiring consent infrastructure.
