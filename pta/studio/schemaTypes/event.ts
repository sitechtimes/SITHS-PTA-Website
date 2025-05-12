import { defineType } from 'sanity'

export default defineType({
  name: 'event',
  type: 'document',
  title: 'Event',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'description', type: 'text', title: 'Description' },
    { name: 'date', type: 'datetime', title: 'Date' },
    { name: 'location', type: 'string', title: 'Location' },
  ],
});