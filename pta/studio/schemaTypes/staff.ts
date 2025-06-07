import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'ptaMember',
  title: 'PTA Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'profilePhoto',
      title: 'Profile Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'memberType',
      title: 'Member Type',
      type: 'string',
      options: {
        list: [
          { title: 'Staff', value: 'staff' },
          { title: 'SLT', value: 'slt' },
        ],
        layout: 'dropdown',
      },
      validation: rule => rule.required(),
    }),
  ],
})