import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'programSettings',
  title: 'Programside-innstillinger',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Overskrift',
      description: 'Hovedoverskriften på programsiden, f.eks. "Program 2026"',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'deck',
      title: 'Undertittel',
      description: 'Teksten under overskriften',
      type: 'string',
    }),
    defineField({
      name: 'byline',
      title: 'Byline',
      description: 'Liten tekst under undertittelen',
      type: 'string',
    }),
    defineField({
      name: 'emptyMessage',
      title: 'Melding når det ikke er noe program',
      description: 'Vises når det ikke er lagt inn noen arrangementer',
      type: 'string',
    }),
    defineField({
      name: 'galleryLabel',
      title: 'Bildegalleri-overskrift',
      description: 'Overskriften over bildegalleriet i hvert arrangement',
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
