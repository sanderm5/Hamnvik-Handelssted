import { defineType, defineField } from 'sanity'
import { pageHeaderFields } from '../helpers'

export default defineType({
  name: 'fjellhoyden',
  title: 'Fjellhøyden',
  type: 'document',
  groups: [
    { name: 'header', title: 'Toppen av siden', default: true },
    { name: 'content', title: 'Innhold' },
    { name: 'notice', title: 'Infoboks' },
  ],
  fields: [
    ...pageHeaderFields().map((f) => ({ ...f, group: 'header' })),
    defineField({
      name: 'sections',
      title: 'Seksjoner',
      description: 'Innholdsseksjoner med tekst og bilder. Dra for å endre rekkefølge.',
      type: 'array',
      of: [{ type: 'section' }],
      group: 'content',
    }),
    defineField({
      name: 'noticeTitle',
      title: 'Infoboks tittel',
      description: 'Overskrift i infoboksen nederst',
      type: 'string',
      group: 'notice',
    }),
    defineField({
      name: 'noticeText',
      title: 'Infoboks tekst',
      description: 'Teksten i infoboksen (lenker til kontaktsiden)',
      type: 'text',
      group: 'notice',
    }),
  ],
  preview: {
    select: { title: 'heading', language: 'language' },
    prepare({ title, language }) {
      return { title: `${title} (${language || 'nb'})` }
    },
  },
})
