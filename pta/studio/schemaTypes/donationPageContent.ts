import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'donationPageContent',
  title: 'Donation Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'bakeSales',
      title: 'Bake Sales',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'monetaryDonations',
      title: 'Monetary Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
     defineField({
       name: 'donationLink',
       title: 'Donation Link',
       type: 'url'
    }),
  ],
})