import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'nyhet',
  title: 'Arrangement',
  type: 'document',
  groups: [
    { name: 'info', title: 'Grunninfo', default: true },
    { name: 'content', title: 'Innhold' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      description: 'Navnet på arrangementet',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'info',
    }),
    defineField({
      name: 'deck',
      title: 'Undertittel (valgfritt)',
      type: 'string',
      group: 'info',
    }),
    defineField({
      name: 'byline',
      title: 'Byline (valgfritt)',
      description: 'F.eks. arrangør',
      type: 'string',
      group: 'info',
    }),
    defineField({
      name: 'date',
      title: 'Dato (valgfritt)',
      description: 'Når arrangementet finner sted',
      type: 'string',
      group: 'info',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Rekkefølge',
      description: 'Lavest tall vises først på programsiden',
      type: 'number',
      initialValue: 0,
      group: 'info',
    }),
    defineField({
      name: 'intro',
      title: 'Introduksjon',
      description: 'Innledende tekst som vises med stor forbokstav',
      type: 'text',
      group: 'content',
    }),
    defineField({
      name: 'sections',
      title: 'Seksjoner',
      description: 'Innholdsseksjoner med tekst og bilder. Legg til bilde i hver seksjon der det passer. Dra for å endre rekkefølge.',
      type: 'array',
      of: [{ type: 'section' }],
      group: 'content',
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
  ],
  orderings: [
    {
      title: 'Rekkefølge',
      name: 'sortOrder',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', sortOrder: 'sortOrder' },
    prepare({ title, sortOrder }) {
      return { title, subtitle: sortOrder != null ? `Rekkefølge: ${sortOrder}` : '' }
    },
  },
})
