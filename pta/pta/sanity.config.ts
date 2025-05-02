import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'pta',

  projectId: 'f32xv0ak',
  dataset: 'pta',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
