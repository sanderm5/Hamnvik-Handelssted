import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'programSettings',
  title: 'Programside-innstillinger',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Overskrift (f.eks. "Program 2026")',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'deck',
      title: 'Undertittel',
      type: 'string',
    }),
    defineField({
      name: 'byline',
      title: 'Byline',
      type: 'string',
    }),
    defineField({
      name: 'emptyMessage',
      title: 'Melding når det ikke er noe program',
      type: 'string',
    }),
    defineField({
      name: 'archiveLabel',
      title: 'Tekst for arkiv-knapp',
      type: 'string',
    }),
    defineField({
      name: 'galleryLabel',
      title: 'Tekst for bildegalleri-overskrift',
      type: 'string',
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
  ],
  preview: {
    select: { title: 'heading', language: 'language' },
    prepare({ title, language }) {
      return { title: `${title} (${language || 'nb'})` }
    },
  },
})
