import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'footerContent',
  title: 'Footer Content',
  type: 'document',
  fields: [
    defineField({
      name: 'aboutUsText',
      title: 'About Us Text',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Rich text for the About Us section in the footer.'
    }),
    defineField({
      name: 'aboutUsButtonText',
      title: 'About Us Button Text',
      type: 'string',
      description: 'Text for the About Us button in the footer.'
    }),
    defineField({
      name: 'aboutUsButtonLink',
      title: 'About Us Button Link',
      type: 'string',
      description: 'Link for the About Us button in the footer.'
    }),
     defineField({
      name: 'studentCredit',
      title: 'Student Credit',
      type: 'string',
      description: 'Short note giving credit to whalen and students.'
    }),
  ]
})
