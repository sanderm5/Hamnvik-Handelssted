import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'referanse',
  title: 'Referanse',
  type: 'document',
  fields: [
    defineField({
      name: 'source',
      title: 'Kilde',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Sitat',
      type: 'text',
    }),
    defineField({ name: 'date', title: 'Dato (valgfritt)', type: 'string' }),
    defineField({ name: 'context', title: 'Kontekst (valgfritt)', type: 'text' }),
    defineField({ name: 'sortOrder', title: 'Sorteringsrekkefølge', type: 'number' }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
  ],
  preview: {
    select: { title: 'source' },
  },
})
