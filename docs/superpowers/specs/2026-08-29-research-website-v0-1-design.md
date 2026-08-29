# Human Cognition with AI Website v0.1 — Design Spec

## Status
Approved direction from prior discussion, formalized for implementation on 2026-08-29.

## Goal
Turn `Xmemo/human-cognition-with-ai` into a fast, bilingual, low-maintenance public research website without creating a second content system. The website must make the existing research easier to discover, browse, cite, share, and index while preserving GitHub Markdown as the single source of truth.

## Product Position
The site is a **Living Research Observatory**, not a blog and not a SaaS application.

It should answer, in order:
1. What changed recently?
2. What does the current evidence support?
3. What are the major research domains and radars?
4. Where is the underlying evidence?
5. How does the research model evolve over time?

The public brand remains **Human Cognition with AI**.

## Architecture Decision

```text
GitHub research Markdown (canonical source)
        ↓
build-time content sync / route mapping
        ↓
Astro + Starlight static site
        ↓
Cloudflare Workers Static Assets
        ↓
free *.workers.dev first
        ↓
optional custom domain later
```

### Why Cloudflare Workers, not Pages
Cloudflare and Astro now recommend Workers for new Astro deployments. The site is static-only in v0.1, so no SSR adapter is required. Static asset requests are free and unlimited on Cloudflare Workers; the free `workers.dev` hostname is sufficient for validation.

No paid domain is required for launch. A custom domain can be added later without changing the content architecture.

## Repository Layout
Website code lives under `site/` so research assets remain readable as a research repository.

```text
human-cognition-with-ai/
├── README.md
├── README.zh-CN.md
├── research/                 # canonical research content
├── weekly/                   # canonical weekly content
├── methodology/              # canonical methodology
├── topics/                   # canonical domain pages
├── people/                   # canonical researcher pages
├── references/               # canonical evidence assets
└── site/
    ├── package.json
    ├── package-lock.json
    ├── astro.config.mjs
    ├── wrangler.jsonc
    ├── tsconfig.json
    ├── content-map.mjs
    ├── scripts/
    │   ├── sync-content.mjs
    │   └── verify-content.mjs
    ├── src/
    │   ├── content.config.ts
    │   ├── content/docs/generated/   # build-generated, not canonical
    │   ├── generated/                # build-generated homepage/archive metadata
    │   ├── pages/
    │   │   ├── index.astro
    │   │   ├── weekly/index.astro
    │   │   ├── zh-cn/index.astro
    │   │   └── zh-cn/weekly/index.astro
    │   ├── components/
    │   └── styles/
    └── public/
```

Generated content is never edited manually and is excluded from Git history. Every build recreates it from root research Markdown.

## Single Source of Truth Contract

### Canonical
These root paths remain canonical:
- `README.md` and `README.zh-CN.md` for Dashboard copy and current homepage state;
- `research/`;
- `weekly/`;
- `methodology/`;
- `topics/`;
- `people/`;
- `references/`.

### Generated
`site/src/content/docs/generated/` and `site/src/generated/` exist only as build artifacts.

The sync process must:
1. read canonical Markdown;
2. derive the first H1 as page title when no explicit metadata exists;
3. inject Starlight frontmatter (`title`, `description`, `slug`, `editUrl`);
4. normalize internal Markdown links to website routes when a route mapping exists;
5. preserve external DOI/publisher/arXiv links unchanged;
6. discover dated weekly files automatically;
7. extract Dashboard sections from the canonical bilingual READMEs rather than duplicating homepage research copy in website source code;
8. fail loudly if a required source path or required Dashboard section is missing;
9. never write back into the canonical research files.

Website source code may contain presentation labels such as “Latest Research” or “Start Here”, but it must not duplicate research findings, weekly summaries, Baseline claims, or bibliography content.

## URL Architecture
English is the root locale. Chinese uses `/zh-cn/`.

### Core routes
| Content | English | Chinese |
|---|---|---|
| Dashboard | `/` | `/zh-cn/` |
| Current Baseline | `/baseline/` | `/zh-cn/baseline/` |
| Research Hub | `/research/` | `/zh-cn/research/` |
| Latest research refresh | `/weekly/2026-08-29/` | `/zh-cn/weekly/2026-08-29/` |
| Weekly archive | `/weekly/` | `/zh-cn/weekly/` |
| Research Map | `/research-map/` | Chinese navigation may link to English until a canonical Chinese source exists |
| Search Protocol | `/methodology/search-protocol/` | same fallback rule |
| Evidence Grading | `/methodology/evidence-grading/` | same fallback rule |
| Human Cognitive Change | `/topics/human-cognitive-change/` | same fallback rule |
| Cognitive Augmentation & Governance | `/topics/cognitive-augmentation-governance/` | same fallback rule |
| Machine Culture & Collective Cognition | `/topics/machine-culture-collective-cognition/` | same fallback rule |
| Iyad Rahwan | `/people/iyad-rahwan/` | same fallback rule |
| Master Bibliography | `/references/bibliography/` | same fallback rule |

### Language policy
Core reader-facing pages must be bilingual when canonical paired Markdown exists. v0.1 does **not** auto-translate English-only source documents at build time. The Chinese site may link to the canonical English page for methodology/topic assets that do not yet have an approved Chinese source.

## Homepage — Research Dashboard
The website homepage follows the same reader-first hierarchy already approved for the GitHub Dashboard, but uses richer visual presentation.

### Section order
1. **Hero** — project question and three research questions.
2. **Latest Research** — 2–4 current field-level signals, linked to the latest refresh.
3. **Current Findings** — five current evidence-backed findings, not the full Baseline.
4. **Control / Retention / Variance** — three-card working model.
5. **Start Here** — intent-based navigation.
6. **Research Domains** — three domain cards, not nine full definitions.
7. **Machine Culture Frontier** — persistent frontier callout.
8. **How We Research** — concise three-layer retrieval pipeline and evidence policy.

The homepage must not duplicate full weekly or Baseline prose. All research-copy content displayed in these sections is extracted at build time from `README.md` / `README.zh-CN.md`; the website only supplies layout and styling.

## Research Hub
The second-level hub preserves four blocks:
1. **Current State** — Current Baseline, research map, evidence gaps.
2. **Research Stream** — latest refresh + archive.
3. **Evidence Base** — bibliography, BibTeX, Consensus provenance, evidence grading.
4. **Research Evolution** — research history and methodology.

The rendered Hub comes from canonical `research/README.md` and `research/README.zh-CN.md`.

## Weekly Archive
The site automatically discovers dated pairs in `weekly/YYYY/`.

Rules:
- English: `YYYY-MM-DD.en.md` → `/weekly/YYYY-MM-DD/`
- Chinese: `YYYY-MM-DD.zh-CN.md` → `/zh-cn/weekly/YYYY-MM-DD/`
- Archive page sorts newest first.
- `NEW`, `NEWLY INDEXED`, and `NEWLY DISCOVERED` labels remain visible exactly as written in source content.

## Evidence / Bibliography Pages
The website renders the existing human-readable bibliography as a normal searchable page.

v0.1 does **not** build an interactive paper database, filters, accounts, comments, or a separate database. Those are explicitly deferred.

## Search
Use Starlight's built-in Pagefind search over generated static pages.

Search should index:
- Baseline;
- weekly refreshes;
- research hub;
- methodology;
- topics;
- researcher pages;
- bibliography.

## SEO & GEO

### v0.1 requirements
- semantic HTML and accessible heading structure;
- unique page titles and descriptions;
- canonical research titles retained;
- DOI and source links remain crawlable;
- `lang`/locale handling for English and Chinese;
- Open Graph metadata for the site and homepage;
- support a `SITE_URL` build variable so canonical URLs and sitemap can be enabled once the first real deployment hostname exists.

RSS is deferred to v0.2 rather than introducing another feed-generation path before the core site is validated.

### URL stability
Routes above are treated as public contracts. Later visual redesigns must not casually change them.

### Domain strategy
Launch on free `*.workers.dev` first. A custom domain such as `cognitionwithai.org` can be attached later. No paid domain is a v0.1 blocker.

## Deployment

### Build output
Astro output is fully static under `site/dist/`.

### Cloudflare
Use an assets-only Worker; no server runtime is needed.

`wrangler.jsonc` must contain at minimum:
- worker name: `human-cognition-with-ai`;
- compatibility date: `2026-08-29`;
- `assets.directory`: `./dist`;
- `workers_dev: true`.

No `main` entrypoint and no Cloudflare adapter are required for the static v0.1 build.

### Deployment command
From `site/`:
```bash
npm run build
npx wrangler deploy
```

Actual first deployment requires an authorized Cloudflare account. Repository implementation must be complete and independently buildable even if account authorization is not yet available.

## CI / Verification
Add a GitHub Actions workflow that runs on website PRs and relevant research-content changes.

Required checks:
1. Node install via `npm ci` in `site/`;
2. content sync;
3. source/route verification;
4. `astro check`;
5. static production build;
6. verify expected generated HTML paths exist in `dist/`;
7. scan generated public output for excluded private-publication keywords already prohibited by repository policy.

CI is a build gate, not the production deploy mechanism in v0.1.

## Public Content Filter
The website inherits the repository's public filter. It must not surface private-only sections such as:
- `专家说`;
- `元认知重构`;
- private book strategy;
- personalized user-specific project advice;
- conversational coaching.

The sync verifier must fail if excluded strings appear in generated site content.

## Visual Direction
Minimal, research-first, editorial rather than SaaS-like.

### Principles
- high information density without dashboard clutter;
- generous typography and whitespace;
- light/dark mode via Starlight;
- no decorative stock imagery;
- no complex animation;
- visual emphasis on evidence state, dates, and research questions;
- mobile-first reading experience.

### Homepage visual hierarchy
- strong typographic Hero;
- compact status chips for `Updated weekly`, `Evidence-first`, `Bilingual`;
- research-signal cards;
- three Control / Retention / Variance cards;
- domain cards;
- one Machine Culture frontier band.

## Non-Goals for v0.1
Do not add:
- user accounts;
- database/backend;
- comments;
- payment;
- newsletter provider integration;
- AI chatbot;
- custom CMS;
- interactive citation graph;
- full paper filters;
- automatic machine translation of source research;
- RSS;
- client-side analytics requiring consent banners.

## Acceptance Criteria
v0.1 is complete when:
1. a clean checkout can build the site using only canonical repository Markdown plus `site/` code;
2. English and Chinese Dashboard pages render from canonical README content;
3. current Baseline, current research refresh, Research Hub, research map, three topic pages, Rahwan page, methodology, and bibliography are reachable;
4. weekly archive discovers dated content without manually adding each page to Astro source code;
5. Pagefind search indexes the rendered research pages;
6. GitHub CI passes `sync → verify → astro check → build → route checks`;
7. no prohibited private sections are present in generated output;
8. Cloudflare Workers static-assets configuration is committed and valid;
9. the site can deploy to a free `workers.dev` hostname once Cloudflare authorization is granted;
10. GitHub Markdown remains the only manually maintained research content source.
