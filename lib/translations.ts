const BASE = 'https://tools4free.site'

export const LANG_PREFIXES = ['fr', 'es', 'pt', 'de'] as const

// Map of English routes to their translated slugs (verified against existing pages)
export const TRANSLATIONS: Record<string, Partial<Record<'fr' | 'es' | 'pt' | 'de', string>>> = {
  '/': { fr: '/fr', es: '/es', pt: '/pt', de: '/de' },
  '/fancy-text': { fr: '/fr/texte-style', es: '/es/letras-bonitas', pt: '/pt/texto-estilizado', de: '/de/schriftarten-generator' },
  '/qr-generator': { fr: '/fr/generateur-qr-code', es: '/es/generador-qr', pt: '/pt/gerador-qr', de: '/de/qr-code-generator' },
  '/password-generator': { fr: '/fr/generateur-mot-de-passe', es: '/es/generador-contrasena', pt: '/pt/gerador-senha', de: '/de/passwort-generator' },
  '/unit-converter': { fr: '/fr/convertisseur-unites', es: '/es/convertidor-unidades', pt: '/pt/conversor-unidades', de: '/de/einheiten-umrechner' },
  '/word-counter': { fr: '/fr/compteur-mots', es: '/es/contador-palabras', pt: '/pt/contador-palavras', de: '/de/woerter-zaehler' },
  '/image-compressor': { fr: '/fr/compresser-image', es: '/es/compresor-imagen', pt: '/pt/compressor-imagem', de: '/de/bild-komprimieren' },
  '/json-formatter': { fr: '/fr/formateur-json', es: '/es/formateador-json', pt: '/pt/formatador-json', de: '/de/json-formatter' },
  '/case-converter': { fr: '/fr/convertisseur-majuscules', es: '/es/conversor-mayusculas', pt: '/pt/conversor-maiusculas', de: '/de/gross-kleinschreibung' },
  '/gradient-generator': { fr: '/fr/generateur-degrade-css', es: '/es/generador-degradado-css', pt: '/pt/gerador-gradiente-css', de: '/de/css-gradient-generator' },
  '/lorem-generator': { fr: '/fr/generateur-lorem-ipsum', es: '/es/generador-lorem', pt: '/pt/gerador-lorem', de: '/de/lorem-ipsum-generator' },
  '/invoice-generator': { fr: '/fr/facture-gratuite', es: '/es/factura-gratis', pt: '/pt/gerador-fatura', de: '/de/rechnungsgenerator' },
  // Finance
  '/mortgage-calculator': { fr: '/fr/calculatrice-pret-immobilier', es: '/es/calculadora-hipoteca', pt: '/pt/calculadora-financiamento', de: '/de/baufinanzierung-rechner' },
  '/investment-calculator': { fr: '/fr/simulateur-investissement', es: '/es/calculadora-inversion', pt: '/pt/calculadora-investimento', de: '/de/zinsrechner' },
  '/salary-calculator': { fr: '/fr/salaire-brut-net', es: '/es/calculadora-salario-neto', pt: '/pt/calculadora-salario-liquido', de: '/de/brutto-netto-rechner' },
  '/loan-calculator': { fr: '/fr/calculatrice-credit', es: '/es/calculadora-prestamo', pt: '/pt/calculadora-emprestimo', de: '/de/kreditrechner' },
  '/percentage-calculator': { fr: '/fr/calculatrice-pourcentage', es: '/es/calculadora-porcentaje', pt: '/pt/calculadora-porcentagem', de: '/de/prozentrechner' },
  '/bmi-calculator': { fr: '/fr/calcul-imc', es: '/es/calculadora-imc', pt: '/pt/calculadora-imc', de: '/de/bmi-rechner' },
  '/tip-calculator': { fr: '/fr/calculatrice-pourboire', es: '/es/calculadora-propina', pt: '/pt/calculadora-gorjeta', de: '/de/trinkgeld-rechner' },
  '/vat-calculator': { fr: '/fr/calcul-tva', es: '/es/calculadora-iva', pt: '/pt/calculadora-imposto', de: '/de/mehrwertsteuer-rechner' },
  '/currency-converter': { fr: '/fr/convertisseur-devise', es: '/es/convertidor-moneda', pt: '/pt/conversor-moeda', de: '/de/waehrungsrechner' },
  '/retirement-calculator': { fr: '/fr/simulateur-retraite', es: '/es/calculadora-jubilacion', pt: '/pt/calculadora-aposentadoria', de: '/de/rentenrechner' },
  // Health & Fitness
  '/calorie-calculator': { fr: '/fr/calculateur-calories', es: '/es/calculadora-calorias', pt: '/pt/calculadora-calorias', de: '/de/kalorienrechner' },
  '/macro-calculator': { fr: '/fr/calculateur-macros', es: '/es/calculadora-macros', pt: '/pt/calculadora-macros', de: '/de/makrorechner' },
  '/body-fat-calculator': { fr: '/fr/calcul-masse-grasse', es: '/es/calculadora-grasa-corporal', pt: '/pt/calculadora-gordura-corporal', de: '/de/koerperfettrechner' },
  '/due-date-calculator': { fr: '/fr/calcul-date-accouchement', es: '/es/calculadora-fecha-parto', pt: '/pt/calculadora-data-parto', de: '/de/geburtsterminrechner' },
  '/calorie-deficit': { fr: '/fr/calcul-deficit-calorique', es: '/es/calculadora-deficit-calorico', pt: '/pt/calculadora-deficit-calorico', de: '/de/kaloriendefizit-rechner' },
  '/heart-rate-calculator': { fr: '/fr/frequence-cardiaque', es: '/es/calculadora-frecuencia-cardiaca', pt: '/pt/calculadora-frequencia-cardiaca', de: '/de/herzfrequenz-rechner' },
  '/ideal-weight': { fr: '/fr/poids-ideal', es: '/es/calculadora-peso-ideal', pt: '/pt/calculadora-peso-ideal', de: '/de/idealgewicht-rechner' },
  '/water-intake': { fr: '/fr/calcul-hydratation', es: '/es/calculadora-agua-diaria', pt: '/pt/calculadora-agua-diaria', de: '/de/wasserbedarf-rechner' },
  '/one-rep-max': { fr: '/fr/calculateur-1rm', es: '/es/calculadora-1rm', pt: '/pt/calculadora-1rm', de: '/de/1rm-rechner' },
  '/pace-calculator': { fr: '/fr/calculateur-allure-course', es: '/es/calculadora-ritmo-carrera', pt: '/pt/calculadora-ritmo-corrida', de: '/de/laufpace-rechner' },
  // Business & E-Commerce
  '/discount-calculator': { fr: '/fr/calculatrice-remise', es: '/es/calculadora-descuento', pt: '/pt/calculadora-desconto', de: '/de/rabattrechner' },
  '/profit-margin-calculator': { fr: '/fr/calculatrice-marge', es: '/es/calculadora-margen-beneficio', pt: '/pt/calculadora-margem-lucro', de: '/de/gewinnmargenrechner' },
  '/markup-calculator': { fr: '/fr/calculatrice-majoration', es: '/es/calculadora-margen-ganancia', pt: '/pt/calculadora-markup', de: '/de/aufschlagrechner' },
  '/roi-calculator': { fr: '/fr/calculateur-roi', es: '/es/calculadora-roi', pt: '/pt/calculadora-roi', de: '/de/roi-rechner' },
  '/break-even-calculator': { fr: '/fr/seuil-rentabilite', es: '/es/calculadora-punto-equilibrio', pt: '/pt/calculadora-ponto-equilibrio', de: '/de/break-even-rechner' },
  '/shipping-calculator': { fr: '/fr/calculateur-frais-livraison', es: '/es/calculadora-envio', pt: '/pt/calculadora-frete', de: '/de/versandkostenrechner' },
  '/business-name-generator': { fr: '/fr/generateur-nom-entreprise', es: '/es/generador-nombre-empresa', pt: '/pt/gerador-nome-empresa', de: '/de/firmenname-generator' },
  '/hourly-rate-calculator': { fr: '/fr/calcul-taux-horaire', es: '/es/calculadora-tarifa-hora', pt: '/pt/calculadora-valor-hora', de: '/de/stundensatz-rechner' },
  '/sales-tax-calculator': { fr: '/fr/calculatrice-taxe-vente', es: '/es/calculadora-impuesto-venta', pt: '/pt/calculadora-imposto-venda', de: '/de/umsatzsteuer-rechner' },
  '/invoice-number-generator': { fr: '/fr/generateur-numero-facture', es: '/es/generador-numero-factura', pt: '/pt/gerador-numero-nota', de: '/de/rechnungsnummer-generator' },
  // Date & Time
  '/age-calculator':         { fr: '/fr/calculateur-age',          es: '/es/calculadora-edad',           pt: '/pt/calculadora-idade',          de: '/de/alter-berechnen' },
  '/date-difference':        { fr: '/fr/difference-dates',          es: '/es/diferencia-fechas',          pt: '/pt/diferenca-datas',            de: '/de/tage-zwischen-daten' },
  '/countdown':              { fr: '/fr/compte-a-rebours',          es: '/es/cuenta-regresiva',           pt: '/pt/contagem-regressiva',        de: '/de/countdown-timer' },
  '/stopwatch':              { fr: '/fr/chronometre',               es: '/es/cronometro',                 pt: '/pt/cronometro',                 de: '/de/stoppuhr' },
  '/days-until':             { fr: '/fr/combien-de-jours',          es: '/es/cuantos-dias-faltan',        pt: '/pt/quantos-dias-faltam',        de: '/de/wie-viele-tage-bis' },
  '/weeks-calculator':       { fr: '/fr/calculateur-semaines',     es: '/es/calculadora-semanas',        pt: '/pt/calculadora-semanas',        de: '/de/wochen-rechner' },
  '/unix-timestamp':         { fr: '/fr/convertisseur-timestamp',   es: '/es/convertidor-timestamp',     pt: '/pt/conversor-timestamp',        de: '/de/unix-timestamp-rechner' },
  '/world-clock':            { fr: '/fr/horloge-mondiale',          es: '/es/reloj-mundial',              pt: '/pt/relogio-mundial',            de: '/de/weltzeituhr' },
  '/work-days-calculator':   { fr: '/fr/jours-ouvres',             es: '/es/dias-laborales',             pt: '/pt/dias-uteis',                 de: '/de/arbeitstage-rechner' },
  '/timer':                  { fr: '/fr/minuteur',                  es: '/es/temporizador',               pt: '/pt/temporizador',               de: '/de/timer-online' },
}

// Build reverse map: translated path -> english path
export const REVERSE_TRANSLATIONS: Record<string, string> = {}
for (const [enPath, langs] of Object.entries(TRANSLATIONS)) {
  for (const translatedPath of Object.values(langs)) {
    if (translatedPath) REVERSE_TRANSLATIONS[translatedPath] = enPath
  }
}

/**
 * Get hreflang alternates for Next.js metadata.
 * Pass the English path (e.g. '/bmi-calculator').
 */
export function getAlternates(englishPath: string) {
  const entry = TRANSLATIONS[englishPath]
  if (!entry) return undefined
  const languages: Record<string, string> = { en: `${BASE}${englishPath}` }
  for (const [lang, path] of Object.entries(entry)) {
    if (path) languages[lang] = `${BASE}${path}`
  }
  return { languages }
}
