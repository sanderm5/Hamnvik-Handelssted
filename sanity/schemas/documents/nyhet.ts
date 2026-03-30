import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'nyhet',
  title: 'Program / Nyheter',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'deck', title: 'Undertittel', type: 'string' }),
    defineField({ name: 'byline', title: 'Byline', type: 'string' }),
    defineField({ name: 'date', title: 'Dato', type: 'string' }),
    defineField({ name: 'intro', title: 'Intro', type: 'text' }),
    defineField({
      name: 'sections',
      title: 'Seksjoner',
      type: 'array',
      of: [{ type: 'section' }],
    }),
    defineField({ name: 'photoCredit', title: 'Fotokreditt', type: 'string' }),
    defineField({
      name: 'galleryImages',
      title: 'Bildegalleri',
      type: 'array',
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
            defineField({ name: 'alt', title: 'Alt-tekst', type: 'string' }),
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
  preview: {
    select: { title: 'title' },
  },
})
