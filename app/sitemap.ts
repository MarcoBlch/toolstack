import type { MetadataRoute } from 'next'

const BASE = 'https://tools4free.site'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticTools = [
    '/', '/fancy-text', '/qr-generator', '/password-generator',
    '/unit-converter', '/word-counter', '/timezone-converter',
    '/image-compressor', '/json-formatter', '/lorem-generator',
    '/case-converter', '/hash-generator', '/gradient-generator',
    '/base64', '/diff-checker', '/regex-tester', '/emoji-picker',
    '/color-picker', '/markdown-editor', '/favicon-generator',
    '/screenshot-mockup', '/invoice-generator',
  ]

  const nichePages = [
    '/instagram-fonts', '/cursive-text', '/bold-text', '/aesthetic-text',
    '/strikethrough-text', '/wifi-qr-code', '/menu-qr-code', '/whatsapp-qr-code',
    '/kg-to-lbs', '/cm-to-inches', '/celsius-to-fahrenheit', '/miles-to-km',
    '/strong-password', '/random-password', '/compress-png', '/compress-jpeg',
    '/json-validator', '/json-minifier', '/character-counter', '/uppercase-converter',
    '/invoice-template', '/freelance-invoice',
  ]

  const translations = [
    '/fr/texte-style', '/fr/generateur-qr-code', '/fr/generateur-mot-de-passe',
    '/fr/convertisseur-unites', '/fr/compteur-mots', '/fr/compresser-image',
    '/fr/formateur-json', '/fr/convertisseur-majuscules',
    '/fr/generateur-degrade-css', '/fr/generateur-lorem-ipsum',
    '/fr/facture-gratuite',
    '/es/letras-bonitas', '/es/generador-qr', '/es/generador-contrasena',
    '/es/convertidor-unidades', '/es/contador-palabras', '/es/compresor-imagen',
    '/es/formateador-json', '/es/conversor-mayusculas',
    '/es/generador-lorem', '/es/generador-degradado-css', '/es/factura-gratis',
    '/pt/texto-estilizado', '/pt/gerador-qr', '/pt/gerador-senha',
    '/pt/conversor-unidades', '/pt/contador-palavras', '/pt/compressor-imagem',
    '/pt/formatador-json', '/pt/conversor-maiusculas',
    '/pt/gerador-lorem', '/pt/gerador-gradiente-css',
  ]

  // Programmatic convert/ pages
  const convertSlugs: string[] = []
  for (const v of [1,2,3,5,10,15,20,25,30,40,50,60,70,75,80,90,100,150,200,250]) convertSlugs.push(`/convert/${v}-kg-to-lbs`)
  for (const v of [1,5,10,20,50,100,120,130,140,150,160,170,180,200,250]) convertSlugs.push(`/convert/${v}-lbs-to-kg`)
  for (const v of [1,5,10,25,50,100,200,250,500,1000]) convertSlugs.push(`/convert/${v}-grams-to-oz`)
  for (const v of [1,2,3,5,10,15,20,25,30,40,50,60,70,80,90,100,120,150,180,200]) convertSlugs.push(`/convert/${v}-cm-to-inches`)
  for (const v of [1,2,3,4,5,6,7,8,10,12,18,24,36,48,72]) convertSlugs.push(`/convert/${v}-inches-to-cm`)
  for (const v of [1,2,3,4,5,6,7,8,9,10,15,20,50,100,1000]) convertSlugs.push(`/convert/${v}-feet-to-meters`)
  for (const v of [1,2,3,5,10,20,50,100,500,1000]) convertSlugs.push(`/convert/${v}-meters-to-feet`)
  for (const v of [1,2,3,5,10,15,20,25,30,50,100,200,500,1000,5000]) convertSlugs.push(`/convert/${v}-miles-to-km`)
  for (const v of [1,2,3,5,10,15,20,25,30,50,100,200,500,1000,5000]) convertSlugs.push(`/convert/${v}-km-to-miles`)
  for (const v of [1,2,3,5,10,15,20,25,50,100]) convertSlugs.push(`/convert/${v}-mm-to-inches`)
  for (const v of [0,10,15,20,21,22,23,24,25,30,35,36,37,38,39,40,50,60,70,80,90,100,120,150,175,180,190,200,220,250,300,350,375,400,425,450]) convertSlugs.push(`/convert/${v}-celsius-to-fahrenheit`)
  for (const v of [0,32,50,60,68,70,72,75,80,90,98,100,120,140,150,160,170,180,200,212,250,300,325,350,375,400,425,450,475,500]) convertSlugs.push(`/convert/${v}-fahrenheit-to-celsius`)
  for (const v of [1,2,3,5,10,20,50,100,500,1000]) convertSlugs.push(`/convert/${v}-liters-to-gallons`)
  for (const v of [1,2,3,5,10,20,50,100,500,1000]) convertSlugs.push(`/convert/${v}-gallons-to-liters`)
  for (const v of [1,5,10,25,50,100,200,250,500,1000]) convertSlugs.push(`/convert/${v}-ml-to-oz`)
  for (const v of [0.25,0.5,1,1.5,2,3,4,5]) convertSlugs.push(`/convert/${v}-cups-to-ml`)
  for (const v of [10,20,30,40,50,60,70,80,100,120]) convertSlugs.push(`/convert/${v}-mph-to-kmh`)
  for (const v of [10,20,30,50,60,80,100,120,150,200]) convertSlugs.push(`/convert/${v}-kmh-to-mph`)
  for (const v of [1,10,50,100,256,500,512,1024]) convertSlugs.push(`/convert/${v}-mb-to-gb`)
  for (const v of [1,2,4,5,8,10,16,32]) convertSlugs.push(`/convert/${v}-gb-to-mb`)

  const timezoneSlugs = [
    'new-york-to-london','new-york-to-paris','new-york-to-tokyo','new-york-to-los-angeles',
    'london-to-new-york','london-to-tokyo','london-to-dubai','london-to-sydney','london-to-singapore',
    'paris-to-new-york','paris-to-tokyo','paris-to-london','paris-to-dubai',
    'tokyo-to-new-york','tokyo-to-london','tokyo-to-sydney',
    'los-angeles-to-new-york','los-angeles-to-london','los-angeles-to-tokyo',
    'dubai-to-london','dubai-to-new-york','sydney-to-london','sydney-to-new-york',
    'singapore-to-london','singapore-to-new-york',
    'india-to-new-york','india-to-london','india-to-dubai','india-to-singapore',
    'est-to-gmt','est-to-pst','est-to-cet','est-to-ist','est-to-jst',
    'pst-to-est','pst-to-gmt','pst-to-ist',
    'gmt-to-est','gmt-to-pst','gmt-to-ist','gmt-to-jst',
    'cet-to-est','ist-to-est','ist-to-gmt','ist-to-pst',
    'jst-to-est','jst-to-gmt','jst-to-pst',
  ].map(s => `/timezone/${s}`)

  const colorNames = ['red','blue','green','yellow','orange','purple','pink','black','white','gray','navy','teal','coral','salmon','gold','indigo','turquoise','magenta','lime','cyan','maroon','olive','beige','ivory','lavender','crimson','khaki','plum','sienna','tomato']
  const colorHexes = ['FF5733','333333','000000','FFFFFF','0066CC','3498DB','E74C3C','2ECC71','F39C12','9B59B6']
  const colorSlugs = [...colorNames, ...colorHexes].map(s => `/color/${s}`)

  const passwordSlugs = [
    '8-character-password','10-character-password','12-character-password',
    '16-character-password','20-character-password','32-character-password',
    '64-character-password','4-digit-pin','6-digit-pin','8-digit-pin',
  ].map(s => `/password/${s}`)

  const allPaths = [
    ...staticTools,
    ...nichePages,
    ...translations,
    ...convertSlugs,
    ...timezoneSlugs,
    ...colorSlugs,
    ...passwordSlugs,
  ]

  return allPaths.map(path => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: path === '/' ? 1 : staticTools.includes(path) ? 0.9 : 0.7,
  }))
}
