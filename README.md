# VietBa Group Website

Public website for VietBa Group, built with Astro, Sanity CMS, optimized static media, and Cloudflare deployment output.

## Overview

This site serves the Vietnamese and English VietBa Group web experience at `https://vietbagroup.com`.

Core features:

- Bilingual routes for Vietnamese and English content.
- Astro 6 static-first pages with Cloudflare adapter output.
- Sanity CMS schemas and GROQ utilities for articles, services, projects, partners, milestones, jobs, and site settings.
- Page-specific SEO metadata, canonical URLs, `hreflang`, Open Graph, Twitter cards, and Ahrefs analytics.
- Optimized local media under `public/images/optimized`.
- Hosted Sanity Studio for content editors.

## Tech Stack

- Astro `^6.2.1`
- Cloudflare adapter `@astrojs/cloudflare`
- Sanity `^5.27.0` with `@sanity/astro`
- Sanity image URL builder
- Three.js for interactive visual background work
- Node.js `>=22.12.0`

## Project Structure

```text
.
├── astro.config.mjs              # Astro, Cloudflare, Sanity, site URL, remote image config
├── wrangler.toml                 # Cloudflare project and dist asset output
├── sanity.config.ts              # Sanity Studio config
├── sanity.cli.ts                 # Sanity CLI project/dataset config
├── schemas/                      # Sanity document and object schemas
├── scripts/
│   └── migrate-to-sanity.mjs     # Seed/upsert content into Sanity
├── src/
│   ├── components/               # Shared Astro components
│   ├── data/serviceSeo.ts        # Service-page SEO metadata
│   ├── i18n/                     # Static Vietnamese and English copy
│   ├── layouts/Layout.astro      # SEO, nav, language alternates, shell
│   ├── lib/sanity.ts             # Localized Sanity queries and image helper
│   ├── pages/                    # Astro routes
│   ├── styles/global.css         # Global styling
│   └── utils/sanity.ts           # Shared Sanity utilities
└── public/
    └── images/                   # Logos, hero images, projects, services, partners, optimized media
```

## Routes

Vietnamese routes:

- `/`
- `/about`
- `/services`
- `/services/booking`
- `/services/communications`
- `/services/digital`
- `/services/events`
- `/services/ooh`
- `/services/production`
- `/services/technology`
- `/projects`
- `/articles`
- `/articles/[slug]`
- `/history`
- `/san-pham`
- `/weather`
- `/careers`
- `/careers/[slug]`
- `/contact`

English routes:

- `/en`
- `/en/about`
- `/en/services`
- `/en/services/booking`
- `/en/services/communications`
- `/en/services/digital`
- `/en/services/events`
- `/en/services/ooh`
- `/en/services/production`
- `/en/services/technology`
- `/en/projects`
- `/en/articles`
- `/en/articles/[slug]`
- `/en/history`
- `/en/products`
- `/en/weather`
- `/en/careers`
- `/en/careers/[slug]`
- `/en/contact`

## Content Sources

The site uses two content paths:

- Static bilingual copy in `src/i18n/vi.json` and `src/i18n/en.json`.
- Sanity CMS for structured content and editor-managed data.

Sanity document types are registered in `schemas/index.ts`:

- `service`
- `project`
- `milestone`
- `job`
- `partner`
- `siteSettings`
- `article`

Sanity query helpers live in `src/lib/sanity.ts` and `src/utils/sanity.ts`. Prefer `src/lib/sanity.ts` when the page needs localized article/service/project data.

## Environment

Create a local `.env` when overriding the default Sanity project or dataset:

```env
PUBLIC_SANITY_PROJECT_ID=yikjfnw2
PUBLIC_SANITY_DATASET=production
```

The Astro config falls back to:

- Project ID: `yikjfnw2`
- Dataset: `production`

These `PUBLIC_` values are safe to expose in frontend code. Do not put write tokens, admin tokens, private notes, or confidential client data in public frontend variables or public Sanity datasets.

## Commands

Run commands from the repository root.

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start Astro dev server |
| `npm run build` | Build production output to `dist/` |
| `npm run preview` | Preview the built site locally |
| `npm run astro -- --help` | Show Astro CLI help |
| `npm run sanity` | Run Sanity CLI |
| `npm run sanity:seed` | Upsert local content and images into Sanity |

## Sanity CMS

Hosted Studio:

```text
https://vietbagroup-cms.sanity.studio
```

Deploy or update Studio:

```sh
npx sanity deploy --url vietbagroup-cms --schema-required
```

Seed CMS content:

```sh
npm run sanity:seed
```

See `SANITY-SETUP.md` for setup, CORS, Studio, and migration details.

## SEO

SEO is centralized in `src/layouts/Layout.astro` and page-level props.

The layout handles:

- `<title>` and meta description
- Canonical URL
- Vietnamese/English `hreflang` alternates
- Open Graph metadata
- Twitter card metadata
- Optional `noindex`
- Ahrefs analytics script

Service-page metadata is defined in `src/data/serviceSeo.ts`. When editing service pages, keep titles unique, descriptions page-specific, and verify there is one clear `<h1>` in the built output.

## Images

Media lives in `public/images`.

Important folders:

- `public/images/logo`
- `public/images/hero`
- `public/images/services`
- `public/images/projects`
- `public/images/partners`
- `public/images/events`
- `public/images/weather`
- `public/images/optimized`

Prefer optimized WebP/AVIF assets from `public/images/optimized` when adding visible page images. Sanity-hosted images are allowed through the configured `cdn.sanity.io` remote image pattern.

## Build And Deploy

Production build:

```sh
npm run build
```

Cloudflare output is configured by:

- `@astrojs/cloudflare` in `astro.config.mjs`
- `wrangler.toml` with `assets.directory = "./dist"`

The canonical site URL is configured as:

```text
https://vietbagroup.com
```

## Validation Checklist

Before pushing user-facing changes:

1. Run `npm run build`.
2. Check changed routes in `dist/`.
3. For SEO work, verify unique titles, expected descriptions, canonical links, `hreflang`, and single `<h1>` output.
4. Confirm referenced local images exist and optimized assets load from `public/images/optimized` where expected.
