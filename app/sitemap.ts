import { MetadataRoute } from 'next'

const BASE = 'https://tools4free.site'

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = [
    '/fancy-text',
    '/qr-generator',
    '/password-generator',
    '/word-counter',
    '/json-formatter',
    '/case-converter',
    '/unit-converter',
    '/image-compressor',
    '/lorem-generator',
    '/gradient-generator',
  ]

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    ...tools.map(tool => ({
      url: `${BASE}${tool}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
  ]
}
