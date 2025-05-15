import { defineType } from 'sanity'

export default defineType({
  name: 'donationPageContent',
  title: 'Donation Page Content',
  type: 'document',
  fields: [
    {
      name: 'bakeSales',
      title: 'Bake Sales',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'monetaryDonations',
      title: 'Monetary Content',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
})