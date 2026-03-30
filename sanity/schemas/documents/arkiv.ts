import { defineType, defineField } from 'sanity'
import { pageHeaderFields } from '../helpers'

export default defineType({
  name: 'arkiv',
  title: 'Arkiv',
  type: 'document',
  groups: [
    { name: 'header', title: 'Toppen av siden', default: true },
    { name: 'gallery', title: 'Bildegallerier' },
  ],
  fields: [
    ...pageHeaderFields().map((f) => ({ ...f, group: 'header' })),
    defineField({
      name: 'gallerySections',
      title: 'Galleriseksjoner',
      description: 'Bildegallerier gruppert etter tema. Dra for å endre rekkefølge.',
      type: 'array',
      group: 'gallery',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'heading',
              title: 'Navn på galleri',
              description: 'F.eks. "Mat og servering" eller "Kongebesøket"',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Beskrivelse (valgfritt)',
              type: 'text',
            }),
            defineField({
              name: 'photoCredit',
              title: 'Fotograf (valgfritt)',
              description: 'Navn på fotograf, vises under galleriet',
              type: 'string',
            }),
            defineField({
              name: 'images',
              title: 'Bilder',
              description: 'Dra for å endre rekkefølge på bildene',
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
                    defineField({
                      name: 'alt',
                      title: 'Bildetekst (for skjermlesere)',
                      description: 'Kort beskrivelse av hva bildet viser',
                      type: 'string',
                    }),
                    defineField({
                      name: 'caption',
                      title: 'Synlig bildetekst (valgfritt)',
                      description: 'Vises under bildet på nettsiden',
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
          ],
          preview: {
            select: { title: 'heading', images: 'images' },
            prepare({ title, images }) {
              return {
                title: title || 'Galleri',
                subtitle: images ? `${images.length} bilder` : 'Ingen bilder',
              }
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
