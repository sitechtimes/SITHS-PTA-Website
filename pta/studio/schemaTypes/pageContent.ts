import { defineType } from 'sanity'

export default defineType({
  name: 'homePageContent',
  title: 'Home Page Content',
  type: 'document',
  fields: [
    {
      name: 'aboutUs',
      title: 'About Us',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'activitiesContent',
      title: 'Activities Content',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
})