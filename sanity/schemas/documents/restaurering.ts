import { defineType, defineField } from 'sanity'
import { pageHeaderFields } from '../helpers'

export default defineType({
  name: 'restaurering',
  title: 'Restaurering',
  type: 'document',
  fields: [
    ...pageHeaderFields(),
    defineField({
      name: 'sections',
      title: 'Oppdateringer',
      description: 'Restaureringsoppdateringer med tekst og bilder. Nyeste først. Dra for å endre rekkefølge.',
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
