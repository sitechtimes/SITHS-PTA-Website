import {defineType} from 'sanity'

export default defineType({
  name: 'websiteInformation',
  title: 'Website Information',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Website Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Website Description',
      type: 'text',
    },
    {
      name: 'link',
      title: 'Website Link',
      type: 'string',
      validation: (rule) => rule.required()
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    },
  ]
})