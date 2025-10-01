import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactPageContent',
  title: 'Contact Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'members',
      title: 'Members',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'role', title: 'Role', type: 'string' },
            { name: 'email', title: 'Email', type: 'string' },
            { name: 'image', title: 'Image', type: 'image' },
            { name: 'phonenumber', title: 'Phone Number', type: 'string' },
            { name: 'order', title: 'Order', type: 'number' },
          ],
        },
      ],
      description: 'Add staff or SLT members here. Each document is a group (e.g., Staff, SLT, etc.)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
