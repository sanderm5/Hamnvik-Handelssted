import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'nyhet',
  title: 'Program / Nyheter',
  type: 'document',
  groups: [
    { name: 'info', title: 'Grunninfo', default: true },
    { name: 'content', title: 'Innhold' },
    { name: 'gallery', title: 'Bildegalleri' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      description: 'Navnet på arrangementet eller nyheten',
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
      description: 'F.eks. forfatter eller arrangør',
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
      description: 'Innholdsseksjoner med tekst og bilder. Dra for å endre rekkefølge.',
      type: 'array',
      of: [{ type: 'section' }],
      group: 'content',
    }),
    defineField({
      name: 'photoCredit',
      title: 'Fotograf',
      description: 'Navn på fotograf for bildegalleriet',
      type: 'string',
      group: 'gallery',
    }),
    defineField({
      name: 'galleryImages',
      title: 'Bilder',
      description: 'Bilder fra arrangementet. Dra for å endre rekkefølge.',
      type: 'array',
      group: 'gallery',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Bilde',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'alt',
              title: 'Bildetekst',
              description: 'Kort beskrivelse av hva bildet viser',
              type: 'string',
            }),
          ],
          preview: {
            select: { title: 'alt', media: 'image' },
            prepare({ title, media }) {
              return { title: title || 'Bilde', media }
            },
          },
        },
      ],
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
