export const job = {
  name: 'job',
  title: 'Tin tuyển dụng',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Job Title' },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title', maxLength: 96 },
    },
    { name: 'location', type: 'string', title: 'Location' },
    {
      name: 'type',
      type: 'string',
      title: 'Employment Type',
      options: {
        list: [
          { title: 'Full-time', value: 'full-time' },
          { title: 'Part-time', value: 'part-time' },
          { title: 'Contract', value: 'contract' },
          { title: 'Internship', value: 'internship' },
        ],
      },
      initialValue: 'full-time',
    },
    { name: 'summary', type: 'localeText', title: 'Summary' },
    {
      name: 'description',
      type: 'array',
      title: 'Job Description',
      of: [{ type: 'localeString' }],
    },
    {
      name: 'requirements',
      type: 'array',
      title: 'Requirements',
      of: [{ type: 'localeString' }],
    },
    {
      name: 'benefits',
      type: 'array',
      title: 'Benefits',
      of: [{ type: 'localeString' }],
    },
    { name: 'workLocation', type: 'string', title: 'Work Address' },
    { name: 'workHours', type: 'string', title: 'Work Hours' },
    {
      name: 'heroImg',
      type: 'image',
      title: 'Hero Image',
      options: { hotspot: true },
    },
    {
      name: 'isActive',
      type: 'boolean',
      title: 'Active',
      initialValue: true,
    },
    { name: 'publishedAt', type: 'datetime', title: 'Published Date' },
  ],
  preview: {
    select: { title: 'title', subtitle: 'location', active: 'isActive' },
    prepare({ title, subtitle, active }: { title?: string; subtitle?: string; active?: boolean }) {
      return {
        title: `${active ? '🟢' : '🔴'} ${title ?? ''}`,
        subtitle,
      };
    },
  },
}
