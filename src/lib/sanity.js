import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: '4er9f04c',  // ← ganti dengan ini
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}