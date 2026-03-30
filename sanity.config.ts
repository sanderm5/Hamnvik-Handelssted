import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { visionTool } from '@sanity/vision'
import { documentInternationalization } from '@sanity/document-internationalization'
import { schemaTypes } from './sanity/schemas'
import { structure } from './sanity/structure'
import { projectId, dataset } from './sanity/env'

const i18nTypes = [
  'hjem',
  'historie',
  'servering',
  'kulturformidling',
  'kontakt',
  'arkiv',
  'restaurering',
  'nyhet',
]

export default defineConfig({
  name: 'hamnvik-handelssted',
  title: 'Hamnvik Handelssted',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    visionTool({ defaultApiVersion: '2024-01-01' }),
    documentInternationalization({
      supportedLanguages: [
        { id: 'nb', title: 'Norsk' },
        { id: 'en', title: 'English' },
      ],
      schemaTypes: i18nTypes,
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})
