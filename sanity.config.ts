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
      resolve: {
        mainDocuments: [
          { route: '/', filter: '_type == "hjem" && language == "nb"' },
          { route: '/en', filter: '_type == "hjem" && language == "en"' },
          { route: '/historie', filter: '_type == "historie" && language == "nb"' },
          { route: '/en/historie', filter: '_type == "historie" && language == "en"' },
          { route: '/servering', filter: '_type == "servering" && language == "nb"' },
          { route: '/en/servering', filter: '_type == "servering" && language == "en"' },
          { route: '/kulturformidling', filter: '_type == "kulturformidling" && language == "nb"' },
          { route: '/en/kulturformidling', filter: '_type == "kulturformidling" && language == "en"' },
          { route: '/arkiv', filter: '_type == "arkiv" && language == "nb"' },
          { route: '/en/arkiv', filter: '_type == "arkiv" && language == "en"' },
          { route: '/restaurering', filter: '_type == "restaurering" && language == "nb"' },
          { route: '/en/restaurering', filter: '_type == "restaurering" && language == "en"' },
          { route: '/kontakt', filter: '_type == "kontakt" && language == "nb"' },
          { route: '/en/kontakt', filter: '_type == "kontakt" && language == "en"' },
        ],
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
