const articleBodyContent = [
  { type: 'block' },
  {
    type: 'image',
    options: { hotspot: true },
    fields: [
      {
        name: 'alt',
        type: 'localeString',
        title: 'Alt Text',
        description: 'Mô tả nội dung ảnh cho công cụ tìm kiếm và trình đọc màn hình.',
        validation: (Rule: any) =>
          Rule.custom((value: { vi?: string; en?: string } | undefined) =>
            value?.vi?.trim() || value?.en?.trim() ? true : 'Alt Text là bắt buộc'
          ),
      },
      { name: 'caption', type: 'localeString', title: 'Caption' },
    ],
  },
];

export const article = {
  name: 'article',
  title: 'Tin tức',
  type: 'document',
  initialValue: () => ({
    isPublished: true,
    publishedAt: new Date().toISOString(),
  }),
  fields: [
    {
      name: 'title',
      type: 'localeString',
      title: 'Tiêu đề',
      validation: (Rule: any) => Rule.required(),
    },
    { name: 'excerpt', type: 'localeText', title: 'Tóm tắt' },
    {
      name: 'localizedBody',
      type: 'object',
      title: 'Nội dung',
      description: 'Nhập nội dung riêng cho Tiếng Việt và English.',
      validation: (Rule: any) =>
        Rule.custom((value: { vi?: unknown[]; en?: unknown[] } | undefined) =>
          value?.vi?.length || value?.en?.length ? true : 'Nội dung là bắt buộc'
        ),
      fields: [
        {
          name: 'vi',
          type: 'array',
          title: 'Tiếng Việt',
          of: articleBodyContent,
        },
        {
          name: 'en',
          type: 'array',
          title: 'English',
          of: articleBodyContent,
        },
      ],
    },
    {
      name: 'body',
      type: 'array',
      title: 'Nội dung cũ',
      hidden: true,
      of: articleBodyContent,
    },
    {
      name: 'mainImage',
      type: 'image',
      title: 'Ảnh đại diện',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'localeString',
          title: 'Alt Text',
          description: 'Mô tả nội dung ảnh cho công cụ tìm kiếm và trình đọc màn hình.',
          validation: (Rule: any) =>
            Rule.custom((value: { vi?: string; en?: string } | undefined) =>
              value?.vi?.trim() || value?.en?.trim() ? true : 'Alt Text là bắt buộc'
            ),
        },
        { name: 'caption', type: 'localeString', title: 'Caption' },
      ],
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Custom URL Slug',
      description: 'Optional. If this is empty, the website uses the document ID automatically.',
      options: { source: 'title.vi', maxLength: 96 },
      hidden: true,
    },
    {
      name: 'isPublished',
      type: 'boolean',
      title: 'Published',
      initialValue: true,
      hidden: true,
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published Date',
      initialValue: () => new Date().toISOString(),
      hidden: true,
    },
    { name: 'seoTitle', type: 'localeString', title: 'SEO Title', hidden: true },
    { name: 'seoDescription', type: 'localeText', title: 'SEO Description', hidden: true },
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
