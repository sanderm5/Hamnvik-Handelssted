import { defineType, defineField } from 'sanity'
import { pageHeaderFields } from '../helpers'

export default defineType({
  name: 'historie',
  title: 'Historie',
  type: 'document',
  fields: [
    ...pageHeaderFields(),
    defineField({
      name: 'introBody',
      title: 'Innledning brodtekst',
      type: 'text',
    }),
    defineField({
      name: 'pullQuote1',
      title: 'Sitat 1',
      type: 'text',
    }),
    defineField({
      name: 'sections',
      title: 'Seksjoner',
      type: 'array',
      of: [{ type: 'section' }],
    }),
  ],
  preview: {
    select: { title: 'heading', language: 'language' },
    prepare({ title, language }) {
      return { title: `${title} (${language || 'nb'})` }
    },
  },
})
