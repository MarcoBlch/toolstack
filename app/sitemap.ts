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
    // Finance calculators
    '/mortgage-calculator', '/investment-calculator', '/salary-calculator',
    '/loan-calculator', '/percentage-calculator', '/bmi-calculator',
    '/tip-calculator', '/vat-calculator', '/currency-converter',
    '/retirement-calculator',
  ]

  const nichePages = [
    '/instagram-fonts', '/cursive-text', '/bold-text', '/aesthetic-text',
    '/strikethrough-text', '/wifi-qr-code', '/menu-qr-code', '/whatsapp-qr-code',
    '/kg-to-lbs', '/cm-to-inches', '/celsius-to-fahrenheit', '/miles-to-km',
    '/strong-password', '/random-password', '/compress-png', '/compress-jpeg',
    '/json-validator', '/json-minifier', '/character-counter', '/uppercase-converter',
    '/invoice-template', '/freelance-invoice',
    // Finance niche pages
    '/compound-interest-calculator', '/amortization-calculator',
    '/paycheck-calculator', '/down-payment-calculator', '/debt-payoff-calculator',
  ]

  const translations = [
    '/fr/texte-style', '/fr/generateur-qr-code', '/fr/generateur-mot-de-passe',
    '/fr/convertisseur-unites', '/fr/compteur-mots', '/fr/compresser-image',
    '/fr/formateur-json', '/fr/convertisseur-majuscules',
    '/fr/generateur-degrade-css', '/fr/generateur-lorem-ipsum',
    '/fr/facture-gratuite',
    // Finance FR
    '/fr/calculatrice-pret-immobilier', '/fr/calcul-tva',
    '/fr/salaire-brut-net', '/fr/simulateur-investissement',
    '/es/letras-bonitas', '/es/generador-qr', '/es/generador-contrasena',
    '/es/convertidor-unidades', '/es/contador-palabras', '/es/compresor-imagen',
    '/es/formateador-json', '/es/conversor-mayusculas',
    '/es/generador-lorem', '/es/generador-degradado-css', '/es/factura-gratis',
    // Finance ES
    '/es/calculadora-hipoteca', '/es/calculadora-iva', '/es/calculadora-porcentaje',
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

  // Finance programmatic SEO pages
  const mortgageSlugs: string[] = []
  for (const a of [100000,150000,200000,250000,300000,350000,400000,450000,500000,600000,700000,800000,1000000]) mortgageSlugs.push(`/mortgage/${a/1000}k-mortgage-payment`)
  for (const r of [2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8]) mortgageSlugs.push(`/mortgage/mortgage-rate-${r}`)
  for (const y of [10,15,20,30]) mortgageSlugs.push(`/mortgage/${y}-year-mortgage`)

  const percentSlugs: string[] = []
  for (const [p, v] of [
    [10,100],[10,200],[10,500],[10,1000],
    [15,50],[15,100],[15,200],[15,500],
    [20,50],[20,100],[20,150],[20,200],[20,500],[20,1000],
    [25,100],[25,200],[25,500],[25,1000],
    [30,100],[30,200],[30,500],
    [33,100],[33,300],[33,500],
    [50,100],[50,200],[50,500],[50,1000],
    [75,100],[75,200],
    [15,25],[15,30],[15,40],[15,50],[15,60],[15,75],[15,100],
    [18,25],[18,30],[18,40],[18,50],[18,60],[18,75],[18,100],
    [20,25],[20,30],[20,40],[20,50],[20,60],[20,75],[20,100],
  ]) percentSlugs.push(`/percent/what-is-${p}-percent-of-${v}`)

  const bmiSlugs: string[] = []
  for (const cm of [150,155,160,165,170,175,180,185,190,195,200]) {
    for (const kg of [50,55,60,65,70,75,80,85,90,95,100]) {
      bmiSlugs.push(`/bmi/bmi-${cm}cm-${kg}kg`)
    }
  }

  const exchangeSlugs: string[] = []
  for (const [from, to] of [
    ['USD','EUR'],['EUR','USD'],['GBP','USD'],['USD','GBP'],
    ['EUR','GBP'],['GBP','EUR'],['USD','JPY'],['EUR','JPY'],
    ['USD','CAD'],['USD','AUD'],['USD','CHF'],['EUR','CHF'],
    ['USD','INR'],['EUR','INR'],['GBP','INR'],
    ['USD','BRL'],['EUR','BRL'],
    ['USD','MXN'],['EUR','MXN'],
    ['USD','CNY'],['EUR','CNY'],
    ['USD','KRW'],['EUR','KRW'],
  ]) {
    for (const a of [1,10,50,100,500,1000,5000,10000]) {
      exchangeSlugs.push(`/exchange/${a}-${from.toLowerCase()}-to-${to.toLowerCase()}`)
    }
  }

  const salarySlugs: string[] = []
  for (const s of [25000,30000,35000,40000,45000,50000,55000,60000,70000,80000,90000,100000]) {
    for (const c of ['france','usa','uk']) {
      salarySlugs.push(`/salary/${s/1000}k-salary-${c}`)
    }
  }

  const allPaths = [
    ...staticTools,
    ...nichePages,
    ...translations,
    ...convertSlugs,
    ...timezoneSlugs,
    ...colorSlugs,
    ...passwordSlugs,
    ...mortgageSlugs,
    ...percentSlugs,
    ...bmiSlugs,
    ...exchangeSlugs,
    ...salarySlugs,
  ]

  return allPaths.map(path => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: path === '/' ? 1 : staticTools.includes(path) ? 0.9 : 0.7,
  }))
}
