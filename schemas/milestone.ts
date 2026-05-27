export const milestone = {
  name: 'milestone',
  title: 'Cột mốc',
  type: 'document',
  fields: [
    {
      name: 'year',
      type: 'string',
      title: 'Năm (tham khảo)',
      description: 'Kept for reference, not the focus of the narrative',
    },
    { name: 'label', type: 'string', title: 'Label (thay cho năm nếu cần)' },
    { name: 'title', type: 'localeString', title: 'Milestone Title' },
    { name: 'desc', type: 'localeText', title: 'Description' },
    {
      name: 'legacy',
      type: 'localeString',
      title: 'Giá trị di sản',
      description: 'Impact on education, culture, or generational memory',
    },
    {
      name: 'impact',
      type: 'string',
      title: 'Thành tựu nổi bật',
      description: 'e.g. "811 tập", "Ký ức nhiều thế hệ"',
    },
    { name: 'icon', type: 'string', title: 'Icon Key' },
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
    select: { title: 'title.vi', subtitle: 'year' },
  },
}
