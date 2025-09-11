import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'calendarEvent',
  title: 'Calendar Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
<<<<<<< Updated upstream
      name: 'startDate',
      title: 'Start Date & Time',
=======
      name: 'startdate',
      title: 'Start Date',
      type: 'datetime',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'enddate',
      title: 'End Date',
>>>>>>> Stashed changes
      type: 'datetime',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date & Time',
      type: 'datetime',
      validation: Rule => Rule.custom((endDate, context) => {
        const { startDate } = context.parent as { startDate?: string }
        if (!endDate) return 'End date is required'
        if (!startDate) return true
        return startDate < endDate ? true : 'End date must be after start date'
      }),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
})