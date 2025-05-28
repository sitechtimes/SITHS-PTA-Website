// filepath: c:\Users\oleg2\Downloads\PTA-Sanity-Website\pta\studio\schemaTypes\resource.ts
import {defineType} from 'sanity'

export default defineType({
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    },
    {
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'name',
      title: 'Resource Name',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (rule) => rule.required(),
    },
    {
      name: 'link',
      title: 'Link to Resource',
      type: 'url',
      validation: (rule) =>
        rule.required().uri({
          scheme: ['http', 'https'],
        }),
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
    }
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