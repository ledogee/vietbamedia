export const service = {
  name: 'service',
  title: 'Dịch vụ',
  type: 'document',
  fields: [
    { name: 'title', type: 'localeString', title: 'Service Title' },
    { name: 'desc', type: 'localeText', title: 'Short Description' },
    { name: 'detailDesc', type: 'localeText', title: 'Detailed Description' },
    {
      name: 'image',
      type: 'image',
      title: 'Service Image',
      options: { hotspot: true },
    },
    { name: 'icon', type: 'string', title: 'Icon Key' },
    {
      name: 'highlights',
      type: 'array',
      title: 'Highlights',
      of: [{ type: 'localeString' }],
    },
    {
      name: 'achievements',
      type: 'array',
      title: 'Achievement Stats',
      of: [{ type: 'string' }],
      description: 'e.g. "2000+ khách hàng", "500+ KOLs"',
    },
    {
      name: 'processSteps',
      type: 'array',
      title: 'Work Process',
      of: [{ type: 'processStep' }],
    },
    {
      name: 'caseStudies',
      type: 'array',
      title: 'Case Studies',
      of: [{ type: 'caseStudy' }],
    },
    {
      name: 'relatedProjects',
      type: 'array',
      title: 'Related Project Images',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'detailPage',
      type: 'slug',
      title: 'Detail Page Slug',
      description: 'e.g. /weather, /services/digital-marketing',
    },
    {
      name: 'order',
      type: 'number',
      title: 'Display Order',
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title.vi', subtitle: 'desc.vi', media: 'image' },
  },
}
