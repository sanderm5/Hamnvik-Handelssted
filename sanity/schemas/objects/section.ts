import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'section',
  title: 'Seksjon',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Overskrift (valgfritt)',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Tekst',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Bilde (valgfritt)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'imageAlt',
      title: 'Bilde alt-tekst',
      type: 'string',
    }),
    defineField({
      name: 'imageCaption',
      title: 'Bildetekst',
      type: 'string',
    }),
    defineField({
      name: 'pullQuote',
      title: 'Sitat (valgfritt)',
      type: 'text',
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || '(Uten overskrift)' }
    },
  },
})
