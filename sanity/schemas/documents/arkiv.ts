import { defineType, defineField } from 'sanity'
import { pageHeaderFields } from '../helpers'

export default defineType({
  name: 'arkiv',
  title: 'Arkiv',
  type: 'document',
  fields: [
    ...pageHeaderFields(),
    defineField({
      name: 'gallerySections',
      title: 'Galleriseksjoner',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'heading', title: 'Seksjonsnavn', type: 'string' }),
            defineField({
              name: 'description',
              title: 'Beskrivelse (valgfritt)',
              type: 'text',
            }),
            defineField({ name: 'photoCredit', title: 'Fotokreditt (valgfritt)', type: 'string' }),
            defineField({
              name: 'images',
              title: 'Bilder',
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
                    defineField({ name: 'caption', title: 'Bildetekst (valgfritt)', type: 'string' }),
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
          ],
          preview: {
            select: { title: 'heading' },
            prepare({ title }) {
              return { title: title || 'Seksjon' }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'heading', language: 'language' },
    prepare({ title, language }) {
      return { title: `${title} (${language || 'nb'})` }
    },
  },
})
