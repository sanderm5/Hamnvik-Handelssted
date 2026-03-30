import { defineType, defineField } from 'sanity'
import { pageHeaderFields } from '../helpers'

export default defineType({
  name: 'historie',
  title: 'Historie',
  type: 'document',
  groups: [
    { name: 'header', title: 'Toppen av siden', default: true },
    { name: 'content', title: 'Innhold' },
  ],
  fields: [
    ...pageHeaderFields().map((f) => ({ ...f, group: 'header' })),
    defineField({
      name: 'introBody',
      title: 'Innledning brødtekst',
      description: 'Brødteksten som vises under introen',
      type: 'text',
      group: 'content',
    }),
    defineField({
      name: 'pullQuote1',
      title: 'Sitat',
      description: 'Stort sitat som vises mellom innledningen og seksjonene',
      type: 'text',
      group: 'content',
    }),
    defineField({
      name: 'sections',
      title: 'Seksjoner',
      description: 'Innholdsseksjoner med tekst og bilder. Dra for å endre rekkefølge.',
      type: 'array',
      of: [{ type: 'section' }],
      group: 'content',
    }),
  ],
  preview: {
    select: { title: 'heading', language: 'language' },
    prepare({ title, language }) {
      return { title: `${title} (${language || 'nb'})` }
    },
  },
})
