// filepath: pta/server/sanityClient.ts
import { createClient } from '@sanity/client'

export const sanity = createClient({
  projectId: 'o006ti7s',
  dataset: 'pta',
  useCdn: true,
  apiVersion: '2023-01-01',
})