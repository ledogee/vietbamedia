import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import {
  localeString,
  localeText,
  processStep,
  caseStudy,
  service,
  project,
  milestone,
  job,
  partner,
  siteSettings,
} from './schemas';

// Environment variables are injected by Astro/Vite at build time.
// For local Sanity CLI usage, they fall back to .env via process.env.
const projectId =
  typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_SANITY_PROJECT_ID
    ? import.meta.env.PUBLIC_SANITY_PROJECT_ID
    : process.env.PUBLIC_SANITY_PROJECT_ID || 'your_project_id';

const dataset =
  typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_SANITY_DATASET
    ? import.meta.env.PUBLIC_SANITY_DATASET
    : process.env.PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [
      // Object types
      localeString,
      localeText,
      processStep,
      caseStudy,
      // Document types
      service,
      project,
      milestone,
      job,
      partner,
      siteSettings,
    ],
  },
});
