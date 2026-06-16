// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import sanity from '@sanity/astro';
import cloudflare from '@astrojs/cloudflare';

// Load env vars (import.meta.env is not available in astro.config.mjs)
const env = loadEnv(import.meta.env?.MODE ?? 'production', process.cwd(), 'PUBLIC_');
const sanityProjectId = env.PUBLIC_SANITY_PROJECT_ID || 'yikjfnw2';
const sanityDataset = env.PUBLIC_SANITY_DATASET || 'production';

// https://astro.build/config
export default defineConfig({
  site: 'https://vietbagroup.com',
  base: '/',
  adapter: cloudflare(),
  image: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
  integrations: [
    sanity({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      useCdn: false, // false for static builds — fetches latest content at build time
    }),
  ],
});
