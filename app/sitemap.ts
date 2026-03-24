import { MetadataRoute } from 'next'

const BASE = 'https://tools4free.site'

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = [
    '/fancy-text',
    '/qr-generator',
    '/password-generator',
    '/unit-converter',
    '/word-counter',
    '/timezone-converter',
    '/image-compressor',
    '/json-formatter',
    '/lorem-generator',
    '/case-converter',
    '/hash-generator',
    '/gradient-generator',
    '/base64',
    '/diff-checker',
    '/regex-tester',
    '/emoji-picker',
    '/color-picker',
    '/markdown-editor',
    '/favicon-generator',
    '/screenshot-mockup',
    // Niche pages
    '/instagram-fonts',
    '/cursive-text',
    '/bold-text',
    '/aesthetic-text',
    '/strikethrough-text',
    '/wifi-qr-code',
    '/menu-qr-code',
    '/whatsapp-qr-code',
    '/kg-to-lbs',
    '/cm-to-inches',
    '/celsius-to-fahrenheit',
    '/miles-to-km',
    '/strong-password',
    '/random-password',
    '/compress-png',
    '/compress-jpeg',
    '/json-validator',
    '/json-minifier',
    '/character-counter',
    '/uppercase-converter',
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
