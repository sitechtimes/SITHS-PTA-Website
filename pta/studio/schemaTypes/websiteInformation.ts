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
        validation: (rule) => rule.required(),
    },
    {
        name: 'description',
        title: 'Website Description',
        type: 'text',
        validation: (rule) => rule.required(),
        },
    {
        name: 'link',
        title: 'Website Link',
        type: 'url',
        validation: (rule) =>
          rule.required().uri({
          scheme: ['http', 'https'],
        }),
    },
  ]
})