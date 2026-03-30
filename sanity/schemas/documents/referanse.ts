import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'referanse',
  title: 'Referanse',
  type: 'document',
  fields: [
    defineField({
      name: 'source',
      title: 'Navn på person eller kilde',
      description: 'F.eks. "Ruth med gjester" eller "Kjetil Rolnes"',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Sitatet',
      description: 'Det fulle sitatet fra personen',
      type: 'text',
    }),
    defineField({
      name: 'date',
      title: 'Dato eller sted (valgfritt)',
      description: 'F.eks. "Juli 2008" eller "Sveits"',
      type: 'string',
    }),
    defineField({
      name: 'context',
      title: 'Ekstra informasjon (valgfritt)',
      description: 'Bakgrunn om sitatet, f.eks. hva anledningen var',
      type: 'text',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Rekkefølge',
      description: 'Lavest tall vises først. F.eks. 1 = øverst, 10 = nederst.',
      type: 'number',
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
  ],
  orderings: [
    {
      title: 'Rekkefølge',
      name: 'sortOrder',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'source', subtitle: 'date' },
  },
})
