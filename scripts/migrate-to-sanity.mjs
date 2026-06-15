#!/usr/bin/env node
import { existsSync, readFileSync } from 'fs';
import { basename, extname, join } from 'path';
import { homedir } from 'os';
import { createRequire } from 'module';

const root = process.cwd();
const require = createRequire(import.meta.url);
const env = readEnv(join(root, '.env'));
const projectId = process.env.PUBLIC_SANITY_PROJECT_ID || env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET || env.PUBLIC_SANITY_DATASET || 'production';
const apiVersion = 'v2025-02-19';
const token = process.env.SANITY_AUTH_TOKEN || readSanityToken();

if (!projectId || projectId.includes('your_')) {
  fail('PUBLIC_SANITY_PROJECT_ID is not configured.');
}

if (!token) {
  fail('No Sanity auth token found. Run `npx sanity login` or set SANITY_AUTH_TOKEN.');
}

globalThis.__syncFetch = (url, options = {}) => {
  const { spawnSync } = require('child_process');
  const payload = JSON.stringify({
    url,
    options: {
      ...options,
      body: Buffer.isBuffer(options.body) ? options.body.toString('base64') : options.body,
      bodyIsBase64: Buffer.isBuffer(options.body),
    },
  });
  const result = spawnSync(process.execPath, ['-e', syncFetchSource()], {
    input: payload,
    encoding: 'utf8',
    maxBuffer: 1024 * 1024 * 20,
  });
  if (result.status !== 0) {
    throw new Error(result.stderr || result.stdout);
  }
  const parsed = JSON.parse(result.stdout);
  if (parsed.status < 200 || parsed.status >= 300) {
    throw new Error(`Sanity request failed ${parsed.status}: ${parsed.body}`);
  }
  return parsed.body ? JSON.parse(parsed.body) : {};
};

const vi = JSON.parse(readFileSync(join(root, 'src/i18n/vi.json'), 'utf8'));
const en = JSON.parse(readFileSync(join(root, 'src/i18n/en.json'), 'utf8'));
const assetCache = new Map();

const docs = [
  siteSettingsDoc(),
  ...serviceDocs(),
  ...projectDocs(),
  ...milestoneDocs(),
  ...jobDocs(),
  ...partnerDocs(),
];

const legacyPrivateIds = query(
  `*[
    _id match "service.*" ||
    _id match "project.*" ||
    _id match "milestone.*" ||
    _id match "job.*" ||
    _id match "partner.*" ||
    _id == "siteSettings.main"
  ]._id`
);
const mutations = [
  ...legacyPrivateIds.map((id) => ({ delete: { id } })),
  ...docs.map((doc) => ({ createOrReplace: doc })),
];
await mutate(mutations);

console.log(
  `Seeded ${docs.length} documents into Sanity project ${projectId}/${dataset}: ` +
    `${countType('service')} services, ${countType('project')} projects, ` +
    `${countType('milestone')} milestones, ${countType('job')} jobs, ` +
    `${countType('partner')} partners, ${countType('siteSettings')} site settings.`
);

function countType(type) {
  return docs.filter((doc) => doc._type === type).length;
}

function serviceDocs() {
  return vi.services.items.map((item, index) => {
    const itemEn = en.services.items[index] || {};
    return compact({
      _id: `service-${slugify(item.detailPage || item.title)}`,
      _type: 'service',
      title: locale(item.title, itemEn.title),
      desc: locale(item.desc, itemEn.desc),
      detailDesc: locale(item.detailDesc, itemEn.detailDesc),
      image: imageField(item.img),
      icon: item.icon,
      highlights: localeArray(item.highlights, itemEn.highlights),
      achievements: item.achievements,
      relatedProjects: (item.relatedProjects || []).map((path) => imageField(path)).filter(Boolean),
      detailPage: slugField(item.detailPage),
      order: index + 1,
    });
  });
}

function projectDocs() {
  return vi.projects.items.map((item, index) => {
    const itemEn = en.projects.items[index] || {};
    return compact({
      _id: `project-${slugify(item.name)}`,
      _type: 'project',
      name: locale(item.name, itemEn.name),
      slug: slugField(item.name),
      category: item.cat,
      image: imageField(item.img),
      description: locale(item.description, itemEn.description),
      order: index + 1,
    });
  });
}

function milestoneDocs() {
  return vi.timeline.items.map((item, index) => {
    const itemEn = en.timeline.items[index] || {};
    return compact({
      _id: `milestone-${slugify(item.year || item.title)}`,
      _type: 'milestone',
      year: item.year,
      label: item.label,
      title: locale(item.title, itemEn.title),
      desc: locale(item.desc, itemEn.desc),
      legacy: locale(item.legacy, itemEn.legacy),
      impact: item.impact,
      icon: item.icon,
      order: index + 1,
    });
  });
}

function jobDocs() {
  return vi.careers.jobs.map((item) => {
    const itemEn = en.careers.jobs.find((job) => job.slug === item.slug) || {};
    return compact({
      _id: `job-${item.slug}`,
      _type: 'job',
      title: item.title,
      slug: slugField(item.slug),
      location: item.location,
      type: normalizeJobType(item.type),
      summary: locale(item.summary, itemEn.summary),
      description: localeArray(item.description, itemEn.description),
      requirements: localeArray(item.requirements, itemEn.requirements),
      benefits: localeArray(item.benefits, itemEn.benefits),
      workLocation: item.workLocation,
      workHours: item.workHours,
      heroImg: imageField(item.heroImg || vi.careers.heroImg),
      isActive: true,
      publishedAt: new Date().toISOString(),
    });
  });
}

function partnerDocs() {
  const weatherPartners = vi.weather?.partners?.list || [];
  const weatherPartnersEn = en.weather?.partners?.list || [];

  return weatherPartners.map((partner, index) => {
    const partnerEn = weatherPartnersEn[index] || {};
    return compact({
      _id: `partner-${slugify(partner.name)}`,
      _type: 'partner',
      name: partner.name,
      slug: slugField(partner.name),
      category: 'weather',
      abbr: partner.abbr,
      location: partner.location,
      description: locale(partner.desc, partnerEn.desc),
      specialty: locale(partner.specialty, partnerEn.specialty),
      order: index + 1,
    });
  });
}

function siteSettingsDoc() {
  return compact({
    _id: 'siteSettings-main',
    _type: 'siteSettings',
    title: locale('Vietba Group', 'Vietba Group'),
    description: locale(vi.footer.description, en.footer.description),
    heroTitle: locale(vi.hero.title, en.hero.title),
    heroTitleHighlight: locale(vi.hero.titleHighlight, en.hero.titleHighlight),
    heroSubtitle: locale(vi.hero.subtitle, en.hero.subtitle),
    heroCta: locale(vi.hero.cta, en.hero.cta),
    stats: (vi.home?.stats || []).map((stat, index) => ({
      _key: `stat-${index + 1}`,
      value: stat.value,
      label: locale(stat.label, en.home?.stats?.[index]?.label),
    })),
    offices: (vi.contact?.offices || []).map((office, index) => ({
      _key: `office-${index + 1}`,
      city: office.city,
      label: locale(office.label, en.contact?.offices?.[index]?.label),
      address: office.address,
      phone: office.phone,
      email: office.email,
    })),
    footerCopyright: vi.footer.copyright,
    footerDescription: locale(vi.footer.description, en.footer.description),
  });
}

function locale(viValue, enValue) {
  if (!viValue && !enValue) return undefined;
  return compact({ vi: viValue, en: enValue || viValue });
}

function localeArray(viItems = [], enItems = []) {
  return viItems.map((item, index) => ({
    _key: `item-${index + 1}`,
    ...locale(item, enItems[index]),
  }));
}

function slugField(value) {
  if (!value) return undefined;
  return { _type: 'slug', current: String(value).replace(/^\/+/, '') };
}

function imageField(path) {
  if (!path) return undefined;
  const asset = uploadImage(path);
  return asset ? { _type: 'image', asset: { _type: 'reference', _ref: asset._id } } : undefined;
}

function uploadImage(publicPath) {
  if (assetCache.has(publicPath)) return assetCache.get(publicPath);

  const filePath = join(root, 'public', publicPath.replace(/^\/+/, ''));
  if (!existsSync(filePath)) {
    console.warn(`Skipping missing image: ${publicPath}`);
    assetCache.set(publicPath, null);
    return null;
  }

  const filename = basename(filePath);
  const existing = query(`*[_type == "sanity.imageAsset" && originalFilename == $filename][0]{_id}`, {
    filename,
  });
  if (existing?._id) {
    assetCache.set(publicPath, existing);
    return existing;
  }

  const url = `https://${projectId}.api.sanity.io/${apiVersion}/assets/images/${dataset}?filename=${encodeURIComponent(filename)}`;
  const response = request(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': mimeType(filePath),
    },
    body: readFileSync(filePath),
  });
  const asset = response.document;
  assetCache.set(publicPath, asset);
  console.log(`Uploaded image: ${publicPath}`);
  return asset;
}

function query(groq, params = {}) {
  const searchParams = new URLSearchParams({ query: groq });
  for (const [key, value] of Object.entries(params)) {
    searchParams.set(`$${key}`, JSON.stringify(value));
  }
  const url = `https://${projectId}.api.sanity.io/${apiVersion}/data/query/${dataset}?${searchParams}`;
  return request(url).result;
}

async function mutate(mutationsToApply) {
  const url = `https://${projectId}.api.sanity.io/${apiVersion}/data/mutate/${dataset}?returnIds=true`;
  return request(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mutations: mutationsToApply }),
  });
}

function request(url, options = {}) {
  const child = globalThis.__syncFetch;
  if (!child) {
    throw new Error('Internal sync fetch bridge is unavailable.');
  }
  return child(url, options);
}

function syncFetchSource() {
  return `
    const chunks = [];
    process.stdin.on('data', c => chunks.push(c));
    process.stdin.on('end', async () => {
      const input = JSON.parse(Buffer.concat(chunks).toString('utf8'));
      const options = input.options || {};
      if (options.bodyIsBase64) options.body = Buffer.from(options.body, 'base64');
      delete options.bodyIsBase64;
      const res = await fetch(input.url, options);
      const body = await res.text();
      process.stdout.write(JSON.stringify({ status: res.status, body }));
    });
  `;
}

function readEnv(path) {
  if (!existsSync(path)) return {};
  return Object.fromEntries(
    readFileSync(path, 'utf8')
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#') && line.includes('='))
      .map((line) => {
        const index = line.indexOf('=');
        return [line.slice(0, index), line.slice(index + 1)];
      })
  );
}

function readSanityToken() {
  for (const path of [
    join(homedir(), '.config', 'sanity', 'config.json'),
    join(homedir(), '.sanity', 'config.json'),
  ]) {
    if (!existsSync(path)) continue;
    try {
      const config = JSON.parse(readFileSync(path, 'utf8'));
      if (config.authToken || config.token) return config.authToken || config.token;
    } catch {
      // Try the next config path.
    }
  }
  return null;
}

function slugify(value) {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96);
}

function normalizeJobType(type) {
  const normalized = String(type || 'full-time').toLowerCase();
  if (normalized.includes('part')) return 'part-time';
  if (normalized.includes('contract')) return 'contract';
  if (normalized.includes('intern')) return 'internship';
  return 'full-time';
}

function mimeType(path) {
  const ext = extname(path).toLowerCase();
  if (ext === '.png') return 'image/png';
  if (ext === '.webp') return 'image/webp';
  if (ext === '.gif') return 'image/gif';
  return 'image/jpeg';
}

function compact(object) {
  return Object.fromEntries(Object.entries(object).filter(([, value]) => value !== undefined));
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
