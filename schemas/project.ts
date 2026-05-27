export const project = {
  name: 'project',
  title: 'Dự án',
  type: 'document',
  fields: [
    { name: 'name', type: 'localeString', title: 'Project Name' },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'name.vi', maxLength: 96 },
    },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          { title: 'Gameshow', value: 'gameshow' },
          { title: 'Sitcom', value: 'sitcom' },
          { title: 'Digital Marketing', value: 'digital' },
          { title: 'Kênh truyền hình', value: 'tv' },
          { title: 'Sự kiện', value: 'event' },
          { title: 'Thời tiết', value: 'weather' },
          { title: 'Truyền thông', value: 'comms' },
        ],
      },
    },
    {
      name: 'image',
      type: 'image',
      title: 'Project Image',
      options: { hotspot: true },
    },
    { name: 'description', type: 'localeText', title: 'Description' },
    { name: 'client', type: 'string', title: 'Client' },
    { name: 'year', type: 'number', title: 'Year' },
    {
      name: 'featured',
      type: 'boolean',
      title: 'Featured',
      initialValue: false,
    },
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
    select: { title: 'name.vi', subtitle: 'category', media: 'image' },
  },
}
