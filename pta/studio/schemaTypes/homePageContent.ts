import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homePageContent',
  title: 'Home Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'aboutUs',
      title: 'About Us',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'activitiesContent',
      title: 'Activities Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
})