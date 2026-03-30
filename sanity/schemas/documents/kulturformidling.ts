import { defineType, defineField } from 'sanity'
import { pageHeaderFields } from '../helpers'

export default defineType({
  name: 'kulturformidling',
  title: 'Kulturformidling',
  type: 'document',
  fields: [
    ...pageHeaderFields(),
    defineField({
      name: 'sections',
      title: 'Seksjoner',
      type: 'array',
      of: [{ type: 'section' }],
    }),
    defineField({ name: 'noticeTitle', title: 'Infoboks tittel', type: 'string' }),
    defineField({ name: 'noticeText', title: 'Infoboks tekst', type: 'text' }),
  ],
  preview: {
    select: { title: 'heading', language: 'language' },
    prepare({ title, language }) {
      return { title: `${title} (${language || 'nb'})` }
    },
  },
})
