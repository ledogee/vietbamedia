// Locale string object for i18n (vi/en)
export const localeString = {
  name: 'localeString',
  title: 'Localized String',
  type: 'object',
  fields: [
    { name: 'vi', type: 'string', title: 'Tiếng Việt' },
    { name: 'en', type: 'string', title: 'English' },
  ],
}

// Locale text (multiline) for i18n
export const localeText = {
  name: 'localeText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    { name: 'vi', type: 'text', title: 'Tiếng Việt', rows: 4 },
    { name: 'en', type: 'text', title: 'English', rows: 4 },
  ],
}

// Process step object for services
export const processStep = {
  name: 'processStep',
  title: 'Process Step',
  type: 'object',
  fields: [
    { name: 'title', type: 'localeString', title: 'Step Title' },
    { name: 'desc', type: 'localeText', title: 'Step Description' },
  ],
  preview: {
    select: { title: 'title.vi' },
  },
}

// Case study object for services
export const caseStudy = {
  name: 'caseStudy',
  title: 'Case Study',
  type: 'object',
  fields: [
    { name: 'name', type: 'string', title: 'Client/Project Name' },
    { name: 'result', type: 'localeString', title: 'Result' },
    { name: 'image', type: 'image', title: 'Image', options: { hotspot: true } },
  ],
  preview: {
    select: { title: 'name', media: 'image' },
  },
}
