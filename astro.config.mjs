// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

// Load env vars (import.meta.env is not available in astro.config.mjs)
const env = loadEnv(import.meta.env?.MODE ?? 'production', process.cwd(), 'PUBLIC_');

// https://astro.build/config
export default defineConfig({
  site: 'https://vietbagroup.com',
  base: '/',
  adapter: cloudflare(),
  image: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
  integrations: [
    ...(env.PUBLIC_SANITY_PROJECT_ID
      ? [
          sanity({
            projectId: env.PUBLIC_SANITY_PROJECT_ID,
            dataset: env.PUBLIC_SANITY_DATASET || 'production',
            useCdn: false, // false for static builds — fetches latest content at build time
            studioBasePath: '/admin', // Sanity Studio UI at /admin (SSR)
          }),
        ]
      : []),
    react(), // Required for embedded Sanity Studio
  ],
});
