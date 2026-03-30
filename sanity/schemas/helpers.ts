import { defineField } from 'sanity'

export function pageHeaderFields() {
  return [
    defineField({
      name: 'heading',
      title: 'Overskrift',
      description: 'Hovedoverskriften øverst på siden',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'deck',
      title: 'Undertittel',
      description: 'Teksten rett under overskriften',
      type: 'string',
    }),
    defineField({
      name: 'byline',
      title: 'Byline',
      description: 'Liten tekst under undertittelen, f.eks. "Donsegården · Hamnvik, Troms"',
      type: 'string',
    }),
    defineField({
      name: 'intro',
      title: 'Introduksjon',
      description: 'Innledende avsnitt som vises med stor skrift',
      type: 'text',
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
  ]
}
