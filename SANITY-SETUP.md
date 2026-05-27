# Sanity CMS Setup Guide — Vietba Group

This document explains how to enable the Sanity CMS integration for content management.

## Current Status

**🟡 Ready but not activated.** All code and schemas are in place. You just need to create a Sanity project and add the project ID.

## What's Already Done

| Item | File | Status |
|------|------|--------|
| Sanity npm packages | `package.json` | ✅ Installed |
| Astro config integration | `astro.config.mjs` | ✅ Conditional — activates when `.env` is filled |
| Sanity Studio config | `sanity.config.ts` | ✅ Created with all schemas |
| Schema: Service (8 services) | `schemas/service.ts` | ✅ |
| Schema: Milestone (timeline) | `schemas/milestone.ts` | ✅ |
| Schema: Project (portfolio) | `schemas/project.ts` | ✅ |
| Schema: Job (careers) | `schemas/job.ts` | ✅ |
| Schema: Partner | `schemas/partner.ts` | ✅ |
| Schema: Site Settings | `schemas/siteSettings.ts` | ✅ |
| Schema: Objects (i18n, steps) | `schemas/objects.ts` | ✅ |
| Schema index | `schemas/index.ts` | ✅ |
| GROQ query utilities | `src/lib/sanity.ts` | ✅ |
| Environment variables | `.env` | 🟡 Placeholder — needs project ID |

## Step 1: Create Sanity Project

1. Go to [sanity.io/manage](https://www.sanity.io/manage) and log in (or create account)
2. Click **"Create Project"**
3. Name it `vietbamedia` (or any name you prefer)
4. Choose **"production"** as the dataset name
5. Copy the **Project ID** (looks like `abc123xyz`)

## Step 2: Fill in `.env`

Open `.env` at the project root and add your project ID:

```env
PUBLIC_SANITY_PROJECT_ID=your-project-id-here
PUBLIC_SANITY_DATASET=production
```

## Step 3: Login to Sanity CLI

```bash
npx sanity login
```

This opens a browser to authenticate. Choose Google/GitHub.

## Step 4: Deploy CORS Origin

Allow your local dev and production URLs:

```bash
npx sanity cors add http://localhost:4321 --credentials
npx sanity cors add https://vietbagroup.com --credentials
```

## Step 5: Verify Build

```bash
npm run dev
```

The site should build normally. Sanity is now connected but pages still read from `vi.json`/`en.json` — migration happens separately.

## Step 6 (Optional): Embed Sanity Studio

If you want the Studio at `/admin`:

1. Install React:
   ```bash
   npm install @astrojs/react react react-dom
   ```

2. Update `astro.config.mjs` — add `studioBasePath` and React:
   ```js
   import react from '@astrojs/react';

   // In integrations array:
   sanity({
     projectId: env.PUBLIC_SANITY_PROJECT_ID,
     dataset: env.PUBLIC_SANITY_DATASET || 'production',
     useCdn: false,
     studioBasePath: '/admin',  // <-- add this
   }),
   react(),  // <-- add this
   ```

3. Change output to hybrid (for the `/admin` SSR route):
   ```js
   export default defineConfig({
     output: 'hybrid',
     adapter: cloudflare(),
     // ...
   });
   ```

4. Visit `http://localhost:4321/admin` to access the Studio

## Step 7: Migrate Content

Once Sanity is connected, run the migration script to import existing `vi.json`/`en.json` data:

```bash
# (To be created — run after project ID is set)
npx tsx scripts/migrate-to-sanity.ts
```

## Architecture Decision

Following the **Manage Runners landingpage** pattern:
- No embedded Studio (keeps build static & simple)
- `sanity:client` virtual module for data fetching
- `useCdn: false` for static builds (gets fresh data at build time)
- Environment variables via `loadEnv` in config
- Conditional integration — site works without Sanity configured

## File Map

```
vietbamedia/
├── .env                          # Sanity credentials (gitignored)
├── astro.config.mjs              # Conditional Sanity integration
├── sanity.config.ts              # Studio config + schema registration
├── schemas/
│   ├── index.ts                  # Re-exports all schemas
│   ├── objects.ts                # localeString, localeText, processStep, caseStudy
│   ├── service.ts                # 8 services with enriched fields
│   ├── milestone.ts              # Timeline (year as metadata, impact as focus)
│   ├── project.ts                # Portfolio projects
│   ├── job.ts                    # Job postings
│   ├── partner.ts                # Partners & broadcasters
│   └── siteSettings.ts           # Hero, footer, offices, stats
└── src/
    └── lib/
        └── sanity.ts             # GROQ queries + urlFor helper
```
