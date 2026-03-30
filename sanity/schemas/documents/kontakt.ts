import { defineType, defineField } from 'sanity'
import { pageHeaderFields } from '../helpers'

export default defineType({
  name: 'kontakt',
  title: 'Kontakt',
  type: 'document',
  fields: [
    ...pageHeaderFields(),
    defineField({
      name: 'contacts',
      title: 'Kontaktpersoner',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Navn', type: 'string' }),
            defineField({ name: 'email', title: 'E-post', type: 'string' }),
            defineField({ name: 'phone', title: 'Telefon', type: 'string' }),
          ],
          preview: {
            select: { title: 'name' },
            prepare({ title }) {
              return { title: title || 'Person' }
            },
          },
        },
      ],
    }),
    defineField({ name: 'generalEmail', title: 'Generell e-post', type: 'string' }),
    defineField({ name: 'businessName', title: 'Bedriftsnavn', type: 'string' }),
    defineField({ name: 'addressLine1', title: 'Adresselinje 1', type: 'string' }),
    defineField({ name: 'addressLine2', title: 'Adresselinje 2', type: 'string' }),
    defineField({
      name: 'sections',
      title: 'Seksjoner',
      type: 'array',
      of: [{ type: 'section' }],
    }),
  ],
  preview: {
    select: { title: 'heading', language: 'language' },
    prepare({ title, language }) {
      return { title: `${title} (${language || 'nb'})` }
    },
  },
})
