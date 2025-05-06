import { defineType } from 'sanity'

export default defineType({
  name: 'pageContent',
  title: 'Page Content',
  type: 'document',
  fields: [
    {
      name: 'page',
      title: 'Page',
      type: 'string',
      options: {
        list: [
          { title: 'Home Page', value: 'homepage' },
          { title: 'Donation Page', value: 'donation' },
        ],
        layout: 'dropdown',
      },
      validation: rule => rule.required(),
    },
    {
      name: 'sectionOne',
      title: 'Section One',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'First content box for this page',
    },
    {
      name: 'sectionTwo',
      title: 'Section Two',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Second content box for this page',
    },
  ],
})