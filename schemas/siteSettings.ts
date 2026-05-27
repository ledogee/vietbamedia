export const siteSettings = {
  name: 'siteSettings',
  title: 'Cài đặt Website',
  type: 'document',
  fields: [
    { name: 'title', type: 'localeString', title: 'Site Title' },
    { name: 'description', type: 'localeText', title: 'Site Description' },
    {
      name: 'logo',
      type: 'image',
      title: 'Logo',
      options: { hotspot: true },
    },
    { name: 'heroTitle', type: 'localeString', title: 'Hero Title' },
    { name: 'heroTitleHighlight', type: 'localeString', title: 'Hero Highlight Word' },
    { name: 'heroSubtitle', type: 'localeText', title: 'Hero Subtitle' },
    { name: 'heroCta', type: 'localeString', title: 'Hero CTA Text' },
    {
      name: 'stats',
      type: 'array',
      title: 'Stats',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', type: 'string', title: 'Value' },
            { name: 'label', type: 'localeString', title: 'Label' },
          ],
        },
      ],
    },
    {
      name: 'offices',
      type: 'array',
      title: 'Offices',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'city', type: 'string', title: 'City' },
            { name: 'label', type: 'localeString', title: 'Label' },
            { name: 'address', type: 'string', title: 'Address' },
            { name: 'phone', type: 'string', title: 'Phone' },
            { name: 'email', type: 'string', title: 'Email' },
          ],
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      title: 'Social Links',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', type: 'string', title: 'Platform' },
            { name: 'url', type: 'url', title: 'URL' },
          ],
        },
      ],
    },
    { name: 'footerCopyright', type: 'string', title: 'Footer Copyright' },
    { name: 'footerDescription', type: 'localeText', title: 'Footer Description' },
  ],
  preview: {
    select: { title: 'title.vi' },
    prepare({ title }: { title?: string }) {
      return { title: title || 'Cài đặt Website' };
    },
  },
}
