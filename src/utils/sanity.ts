import { sanityClient } from 'sanity:client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// ── Image URL builder ───────────────────────────────
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// ── Locale helper ───────────────────────────────────
type LocaleField = { vi?: string; en?: string } | undefined;

export function t(field: LocaleField, lang: 'vi' | 'en' = 'vi'): string {
  if (!field) return '';
  return field[lang] || field['vi'] || '';
}

// ── GROQ Queries ────────────────────────────────────

/** All services ordered by display order */
export async function getServices() {
  return sanityClient.fetch(
    `*[_type == "service"] | order(order asc) {
      _id, title, desc, detailDesc, image, icon,
      highlights, achievements, processSteps, caseStudies,
      relatedProjects, detailPage, order
    }`
  );
}

/** Single service by slug (not applicable here since we use localeString titles, not slug) */

/** All projects ordered by display order */
export async function getProjects() {
  return sanityClient.fetch(
    `*[_type == "project"] | order(order asc) {
      _id, name, slug, category, image,
      description, client, year, featured, order
    }`
  );
}

/** Featured projects only */
export async function getFeaturedProjects() {
  return sanityClient.fetch(
    `*[_type == "project" && featured == true] | order(order asc) {
      _id, name, slug, category, image, description
    }`
  );
}

/** All milestones ordered by display order */
export async function getMilestones() {
  return sanityClient.fetch(
    `*[_type == "milestone"] | order(order asc) {
      _id, year, label, title, desc, legacy, impact, icon, order
    }`
  );
}

/** Active job listings */
export async function getJobs() {
  return sanityClient.fetch(
    `*[_type == "job" && isActive == true] | order(publishedAt desc) {
      _id, title, slug, location, type, summary,
      description, requirements, benefits,
      workLocation, workHours, heroImg, publishedAt
    }`
  );
}

/** Single job by slug */
export async function getJobBySlug(slug: string) {
  return sanityClient.fetch(
    `*[_type == "job" && slug.current == $slug][0] {
      _id, title, slug, location, type, summary,
      description, requirements, benefits,
      workLocation, workHours, heroImg, publishedAt
    }`,
    { slug }
  );
}

/** All partners ordered by display order */
export async function getPartners() {
  return sanityClient.fetch(
    `*[_type == "partner"] | order(order asc) {
      _id, name, slug, logo, category, abbr,
      location, description, specialty, website, order
    }`
  );
}

/** Partners by category */
export async function getPartnersByCategory(category: string) {
  return sanityClient.fetch(
    `*[_type == "partner" && category == $category] | order(order asc) {
      _id, name, slug, logo, abbr, location,
      description, specialty, website
    }`,
    { category }
  );
}

/** Site settings (singleton) */
export async function getSiteSettings() {
  return sanityClient.fetch(
    `*[_type == "siteSettings"][0] {
      _id, title, description, logo,
      heroTitle, heroTitleHighlight, heroSubtitle, heroCta,
      stats, offices, socialLinks,
      footerCopyright, footerDescription
    }`
  );
}
