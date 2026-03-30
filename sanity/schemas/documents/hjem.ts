import { defineType, defineField } from 'sanity'
import { pageHeaderFields } from '../helpers'

export default defineType({
  name: 'hjem',
  title: 'Forside',
  type: 'document',
  groups: [
    { name: 'header', title: 'Toppen av siden', default: true },
    { name: 'intro', title: 'Introduksjon' },
    { name: 'cards', title: 'Opplev-kort' },
    { name: 'dampskip', title: 'Dampskip-seksjon' },
    { name: 'notice', title: 'Infoboks' },
    { name: 'testimonials', title: 'Gjestesitater' },
  ],
  fields: [
    ...pageHeaderFields().map((f) => ({ ...f, group: 'header' })),
    defineField({
      name: 'bodyText1',
      title: 'Brødtekst avsnitt 1',
      description: 'Første avsnitt i to-kolonne-teksten under introen',
      type: 'text',
      group: 'intro',
    }),
    defineField({
      name: 'bodyText2',
      title: 'Brødtekst avsnitt 2',
      description: 'Andre avsnitt i to-kolonne-teksten under introen',
      type: 'text',
      group: 'intro',
    }),
    defineField({
      name: 'pullQuote',
      title: 'Sitat',
      description: 'Stort sitat som vises mellom introduksjonen og kortene',
      type: 'text',
      group: 'intro',
    }),
    defineField({
      name: 'cards',
      title: 'Opplev-kort',
      description: 'Tre kort som lenker til undersider (Servering, Møte & Fest, Kulturformidling)',
      type: 'array',
      group: 'cards',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Tittel', type: 'string' }),
            defineField({
              name: 'link',
              title: 'Lenke',
              description: 'F.eks. /servering eller /kulturformidling',
              type: 'string',
            }),
            defineField({ name: 'description', title: 'Kort beskrivelse', type: 'string' }),
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
    defineField({
      name: 'dampskipHeading',
      title: 'Overskrift',
      description: 'Overskriften over dampskip-seksjonen',
      type: 'string',
      group: 'dampskip',
    }),
    defineField({
      name: 'dampskipText',
      title: 'Tekst',
      description: 'Brødteksten i dampskip-seksjonen',
      type: 'text',
      group: 'dampskip',
    }),
    defineField({
      name: 'dampskipImage',
      title: 'Bilde',
      description: 'Maleriet/bildet som vises ved siden av teksten',
      type: 'image',
      options: { hotspot: true },
      group: 'dampskip',
    }),
    defineField({
      name: 'dampskipImageAlt',
      title: 'Bilde alt-tekst',
      description: 'Beskrivelse av bildet for blinde og søkemotorer',
      type: 'string',
      group: 'dampskip',
    }),
    defineField({
      name: 'dampskipImageCaption',
      title: 'Bildetekst',
      description: 'Teksten som vises under bildet',
      type: 'string',
      group: 'dampskip',
    }),
    defineField({
      name: 'dampskipFotefarText',
      title: 'Fotefar-tekst',
      description: 'Tekst om fotefarprosjektet, vises under dampskip-teksten',
      type: 'string',
      group: 'dampskip',
    }),
    defineField({
      name: 'noticeTitle',
      title: 'Infoboks tittel',
      description: 'Overskrift i bestillingsboksen',
      type: 'string',
      group: 'notice',
    }),
    defineField({
      name: 'noticeText',
      title: 'Infoboks tekst',
      description: 'Teksten i bestillingsboksen (lenker til kontaktsiden)',
      type: 'text',
      group: 'notice',
    }),
    defineField({
      name: 'testimonials',
      title: 'Gjestesitater',
      description: 'Sitater fra gjester som vises på forsiden. Resten vises på referansesiden.',
      type: 'array',
      group: 'testimonials',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'quote',
              title: 'Sitat',
              description: 'Selve sitatet fra gjesten',
              type: 'text',
            }),
            defineField({
              name: 'source',
              title: 'Navn på gjest',
              type: 'string',
            }),
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
