# Human Cognition with AI — Website

This directory contains the rendering layer for the public research observatory.

## Source-of-truth rule

Research content is **not** maintained here. The canonical source remains the repository root:

- `README*.md`
- `research/`
- `weekly/`
- `methodology/`
- `topics/`
- `people/`
- `references/`

`npm run sync` recreates `src/content/docs/` from those sources. The generated directory is intentionally ignored by Git.

## Local build

```bash
cd site
npm install
npm run build
```

The production site is written to `site/dist/`.

For local development:

```bash
npm run dev
```

## Verification pipeline

`npm run build` performs, in order:

1. canonical Markdown → Starlight content sync;
2. generated-content and public-filter validation;
3. `astro check`;
4. static Astro/Starlight build;
5. built-route, Pagefind, and public-output verification.

The GitHub Actions workflow `.github/workflows/site-ci.yml` runs the same pipeline whenever website code or canonical research content changes.

## Cloudflare Workers deployment

The site is fully static and uses Cloudflare Workers Static Assets. No Worker runtime entrypoint or Astro server adapter is required.

After authorizing Wrangler with a Cloudflare account:

```bash
cd site
npm install
npm run deploy
```

`wrangler.jsonc` enables the free `*.workers.dev` hostname. A custom domain can be attached later without changing the research-content architecture.

If the final hostname is known, set `SITE_URL` during the build so Astro can emit canonical absolute URLs where supported:

```bash
SITE_URL=https://example.workers.dev npm run build
```
