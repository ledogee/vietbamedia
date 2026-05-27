export const partner = {
  name: 'partner',
  title: 'Đối tác',
  type: 'document',
  fields: [
    { name: 'name', type: 'string', title: 'Partner Name' },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'name', maxLength: 96 },
    },
    {
      name: 'logo',
      type: 'image',
      title: 'Logo',
      options: { hotspot: true },
    },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          { title: 'Đài truyền hình', value: 'broadcaster' },
          { title: 'Khách hàng doanh nghiệp', value: 'corporate' },
          { title: 'Đối tác thời tiết', value: 'weather' },
          { title: 'Đối tác quốc tế', value: 'international' },
        ],
      },
    },
    { name: 'abbr', type: 'string', title: 'Abbreviation' },
    { name: 'location', type: 'string', title: 'Location' },
    { name: 'description', type: 'localeText', title: 'Description' },
    { name: 'specialty', type: 'localeString', title: 'Specialty' },
    { name: 'website', type: 'url', title: 'Website' },
    { name: 'order', type: 'number', title: 'Display Order' },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'category', media: 'logo' },
  },
}
