import { defineType, defineField } from 'sanity'
import { pageHeaderFields } from '../helpers'

export default defineType({
  name: 'hjem',
  title: 'Forside',
  type: 'document',
  fields: [
    ...pageHeaderFields(),
    defineField({
      name: 'bodyText1',
      title: 'Brodtekst avsnitt 1',
      type: 'text',
    }),
    defineField({
      name: 'bodyText2',
      title: 'Brodtekst avsnitt 2',
      type: 'text',
    }),
    defineField({
      name: 'pullQuote',
      title: 'Sitat',
      type: 'text',
    }),
    defineField({
      name: 'cards',
      title: 'Opplev-kort',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Tittel', type: 'string' }),
            defineField({ name: 'link', title: 'Lenke (f.eks. /servering)', type: 'string' }),
            defineField({ name: 'description', title: 'Beskrivelse', type: 'string' }),
          ],
          preview: {
            select: { title: 'title' },
            prepare({ title }) {
              return { title: title || 'Kort' }
            },
          },
        },
      ],
    }),
    defineField({ name: 'dampskipHeading', title: 'Dampskip-overskrift', type: 'string' }),
    defineField({ name: 'dampskipText', title: 'Dampskip-tekst', type: 'text' }),
    defineField({
      name: 'dampskipImage',
      title: 'Dampskip-bilde',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'dampskipImageAlt', title: 'Dampskip-bilde alt-tekst', type: 'string' }),
    defineField({ name: 'dampskipImageCaption', title: 'Dampskip-bildetekst', type: 'string' }),
    defineField({ name: 'dampskipFotefarText', title: 'Fotefar-tekst', type: 'string' }),
    defineField({ name: 'noticeTitle', title: 'Infoboks tittel', type: 'string' }),
    defineField({ name: 'noticeText', title: 'Infoboks tekst', type: 'text' }),
    defineField({
      name: 'testimonials',
      title: 'Gjestesitater',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'quote', title: 'Sitat', type: 'text' }),
            defineField({ name: 'source', title: 'Kilde', type: 'string' }),
          ],
          preview: {
            select: { title: 'source' },
            prepare({ title }) {
              return { title: title || 'Sitat' }
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
