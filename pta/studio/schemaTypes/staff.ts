import { defineType } from 'sanity'

export default defineType({
  name: 'ptaMember',
  title: 'PTA Member',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    },
    {
      name: 'profilePhoto',
      title: 'Profile Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
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
      validation: Rule => Rule.required(),
    },
  ],
})