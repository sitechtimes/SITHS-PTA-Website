import { defineType } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    {
      name: 'aboutUs',
      title: 'About Us',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
})