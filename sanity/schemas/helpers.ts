import { defineField } from 'sanity'

export function pageHeaderFields() {
  return [
    defineField({
      name: 'heading',
      title: 'Overskrift',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'deck',
      title: 'Undertittel',
      type: 'string',
    }),
    defineField({
      name: 'byline',
      title: 'Byline',
      type: 'string',
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
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
