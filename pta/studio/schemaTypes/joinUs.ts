import { defineType } from 'sanity'

export default defineType({
  name: 'joinUsPageContent',
  title: 'Join Us Page Content',
  type: 'document',
  fields: [
    {
      name: 'joinUs',
      title: 'Join Us',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
})