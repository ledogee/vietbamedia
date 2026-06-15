export const article = {
  name: 'article',
  title: 'Bài viết',
  type: 'document',
  fields: [
    { name: 'title', type: 'localeString', title: 'Title' },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title.vi', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    { name: 'excerpt', type: 'localeText', title: 'Excerpt' },
    {
      name: 'mainImage',
      type: 'image',
      title: 'Main Image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'localeString', title: 'Alt Text' },
        { name: 'caption', type: 'localeString', title: 'Caption' },
      ],
    },
    {
      name: 'body',
      type: 'array',
      title: 'Body',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'localeString', title: 'Alt Text' },
            { name: 'caption', type: 'localeString', title: 'Caption' },
          ],
        },
      ],
    },
    {
      name: 'isPublished',
      type: 'boolean',
      title: 'Published',
      initialValue: true,
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published Date',
      initialValue: () => new Date().toISOString(),
    },
    { name: 'seoTitle', type: 'localeString', title: 'SEO Title' },
    { name: 'seoDescription', type: 'localeText', title: 'SEO Description' },
  ],
  orderings: [
    {
      title: 'Newest First',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title.vi',
      subtitle: 'publishedAt',
      media: 'mainImage',
    },
  },
};
