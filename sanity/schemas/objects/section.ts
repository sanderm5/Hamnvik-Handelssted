import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'section',
  title: 'Seksjon',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Overskrift (valgfritt)',
      description: 'Vises som mellomoverskrift på siden',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Tekst',
      description: 'Brødteksten i seksjonen. Bruk dobbelt linjeskift for nytt avsnitt.',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Bilde (valgfritt)',
      description: 'Vises ved siden av teksten',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'imageAlt',
      title: 'Bildetekst for skjermlesere',
      description: 'Kort beskrivelse av hva bildet viser (synlig kun for blinde)',
      type: 'string',
    }),
    defineField({
      name: 'imageCaption',
      title: 'Synlig bildetekst',
      description: 'Vises under bildet på nettsiden',
      type: 'string',
    }),
    defineField({
      name: 'pullQuote',
      title: 'Sitat (valgfritt)',
      description: 'Stort sitat som vises etter seksjonen',
      type: 'text',
    }),
  ],
  preview: {
    select: { title: 'heading', content: 'content', media: 'image' },
    prepare({ title, content, media }) {
      const subtitle = content ? content.substring(0, 80) + (content.length > 80 ? '...' : '') : ''
      return {
        title: title || '(Uten overskrift)',
        subtitle,
        media,
      }
    },
  },
})
