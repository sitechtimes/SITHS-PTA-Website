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
    defineField({
      name: 'donateItemButtonText',
      title: 'Donate Item Button Text',
      type: 'string',
      description: 'Text for the Donate Item button',
    }),
  ],
})