import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Resource Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link to Resource',
      type: 'url',
      validation: (rule) =>
        rule.required().uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
    })
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})