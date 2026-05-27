/**
 * Sanity CMS data fetching utilities for Vietba Group website.
 *
 * Usage: import { getServices, getMilestones } from '../lib/sanity';
 *
 * NOTE: This file only works when Sanity is configured.
 *       See SANITY-SETUP.md for instructions.
 */
import { sanityClient } from 'sanity:client';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// ----- Image URL Helper -----
const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// ----- GROQ Queries -----

/** Fetch all services ordered by display order */
export async function getServices(lang: 'vi' | 'en' = 'vi') {
  return sanityClient.fetch(
    `*[_type == "service"] | order(order asc) {
      _id,
      "title": title.${lang},
      "desc": desc.${lang},
      "detailDesc": detailDesc.${lang},
      image,
      icon,
      "highlights": highlights[].${lang},
      achievements,
      "processSteps": processSteps[] { "title": title.${lang}, "desc": desc.${lang} },
      caseStudies,
      relatedProjects,
      detailPage,
      order
    }`
  );
}

/** Fetch all milestones ordered by display order */
export async function getMilestones(lang: 'vi' | 'en' = 'vi') {
  return sanityClient.fetch(
    `*[_type == "milestone"] | order(order asc) {
      _id,
      year,
      label,
      "title": title.${lang},
      "desc": desc.${lang},
      "legacy": legacy.${lang},
      impact,
      icon,
      order
    }`
  );
}

/** Fetch all projects ordered by display order */
export async function getProjects(lang: 'vi' | 'en' = 'vi') {
  return sanityClient.fetch(
    `*[_type == "project"] | order(order asc) {
      _id,
      "name": name.${lang},
      category,
      image,
      "description": description.${lang},
      order
    }`
  );
}

/** Fetch all active job postings */
export async function getJobs() {
  return sanityClient.fetch(
    `*[_type == "job" && isActive == true] | order(publishedAt desc) {
      _id, title, slug, location, type, summary,
      description, requirements, benefits,
      workLocation, workHours, heroImg
    }`
  );
}

/** Fetch all partners by category */
export async function getPartners(category?: string) {
  const filter = category
    ? `*[_type == "partner" && category == "${category}"]`
    : `*[_type == "partner"]`;
  return sanityClient.fetch(
    `${filter} | order(order asc) {
      _id, name, slug, logo, category, abbr,
      location, description, specialty, website, order
    }`
  );
}

/** Fetch site settings */
export async function getSiteSettings() {
  return sanityClient.fetch(
    `*[_type == "siteSettings"][0] {
      title, description, logo,
      heroTitle, heroTitleHighlight, heroSubtitle, heroCta,
      stats, offices, socialLinks,
      footerCopyright, footerDescription
    }`
  );
}

// ----- Formatting Helpers -----

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
