import { defineType, defineField } from 'sanity'
import { pageHeaderFields } from '../helpers'

export default defineType({
  name: 'kontakt',
  title: 'Kontakt',
  type: 'document',
  groups: [
    { name: 'header', title: 'Toppen av siden', default: true },
    { name: 'people', title: 'Kontaktpersoner' },
    { name: 'business', title: 'Bedriftsinformasjon' },
    { name: 'content', title: 'Ekstra innhold' },
  ],
  fields: [
    ...pageHeaderFields().map((f) => ({ ...f, group: 'header' })),
    defineField({
      name: 'contacts',
      title: 'Kontaktpersoner',
      description: 'Personene som vises med navn, e-post og telefon',
      type: 'array',
      group: 'people',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Fullt navn', type: 'string' }),
            defineField({ name: 'email', title: 'E-postadresse', type: 'string' }),
            defineField({
              name: 'phone',
              title: 'Telefonnummer',
              description: 'F.eks. 952 47 000',
              type: 'string',
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'phone' },
          },
        },
      ],
    }),
    defineField({
      name: 'generalEmail',
      title: 'Generell e-post',
      description: 'Hoved-epostadressen som vises i informasjonsboksen',
      type: 'string',
      group: 'business',
    }),
    defineField({
      name: 'businessName',
      title: 'Bedriftsnavn',
      type: 'string',
      group: 'business',
    }),
    defineField({
      name: 'addressLine1',
      title: 'Adresselinje 1',
      description: 'F.eks. gateadresse',
      type: 'string',
      group: 'business',
    }),
    defineField({
      name: 'addressLine2',
      title: 'Adresselinje 2',
      description: 'F.eks. postnummer og sted',
      type: 'string',
      group: 'business',
    }),
    defineField({
      name: 'sections',
      title: 'Ekstra seksjoner',
      description: 'Valgfrie innholdsseksjoner under kontaktinformasjonen',
      type: 'array',
      of: [{ type: 'section' }],
      group: 'content',
    }),
  ],
  preview: {
    select: { title: 'heading', language: 'language' },
    prepare({ title, language }) {
      return { title: `${title} (${language || 'nb'})` }
    },
  },
})
