'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'
import { t, LOCALE_CODES, type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"
const accent = '#7C3AED'

const labelStyle = {
  fontSize: 11, fontWeight: 600 as const, color: '#9A958A',
  textTransform: 'uppercase' as const, letterSpacing: '.8px',
  display: 'block' as const, marginBottom: 4,
}
const inputStyle = {
  width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8,
  padding: '10px 12px', fontSize: 14, fontFamily: fb, color: '#1C1B18',
  background: '#F5F3EE', outline: 'none',
}
const selectStyle = {
  ...inputStyle, cursor: 'pointer',
  appearance: 'none' as const, WebkitAppearance: 'none' as const,
}

type TaxResult = { incomeTax: number; socialCharges: number; net: number }

function calcFrance(annual: number): TaxResult {
  const socialRate = 0.22
  const socialCharges = annual * socialRate
  const taxable = annual - socialCharges
  let tax = 0
  const brackets = [
    { limit: 11294, rate: 0 },
    { limit: 28797, rate: 0.11 },
    { limit: 82341, rate: 0.30 },
    { limit: 177106, rate: 0.41 },
    { limit: Infinity, rate: 0.45 },
  ]
  let prev = 0
  for (const b of brackets) {
    if (taxable <= prev) break
    const slice = Math.min(taxable, b.limit) - prev
    tax += Math.max(0, slice) * b.rate
    prev = b.limit
  }
  return { incomeTax: tax, socialCharges, net: annual - socialCharges - tax }
}

function calcUSA(annual: number): TaxResult {
  const brackets = [
    { limit: 11600, rate: 0.10 },
    { limit: 47150, rate: 0.12 },
    { limit: 100525, rate: 0.22 },
    { limit: 191950, rate: 0.24 },
    { limit: 243725, rate: 0.32 },
    { limit: 609350, rate: 0.35 },
    { limit: Infinity, rate: 0.37 },
  ]
  let tax = 0, prev = 0
  for (const b of brackets) {
    if (annual <= prev) break
    const slice = Math.min(annual, b.limit) - prev
    tax += Math.max(0, slice) * b.rate
    prev = b.limit
  }
  // FICA: Social Security 6.2% (up to 168600) + Medicare 1.45%
  const ss = Math.min(annual, 168600) * 0.062
  const medicare = annual * 0.0145
  const socialCharges = ss + medicare
  return { incomeTax: tax, socialCharges, net: annual - tax - socialCharges }
}

function calcUK(annual: number): TaxResult {
  const brackets = [
    { limit: 12570, rate: 0 },
    { limit: 50270, rate: 0.20 },
    { limit: 125140, rate: 0.40 },
    { limit: Infinity, rate: 0.45 },
  ]
  let tax = 0, prev = 0
  for (const b of brackets) {
    if (annual <= prev) break
    const slice = Math.min(annual, b.limit) - prev
    tax += Math.max(0, slice) * b.rate
    prev = b.limit
  }
  // NI: 13.25% on 12570-50270, 3.25% above 50270
  let ni = 0
  if (annual > 12570) {
    ni += Math.min(annual, 50270) - 12570
    ni *= 0.1325
    if (annual > 50270) {
      ni += (annual - 50270) * 0.0325
    }
  }
  return { incomeTax: tax, socialCharges: ni, net: annual - tax - ni }
}

function calcGermany(annual: number): TaxResult {
  let tax = 0
  if (annual <= 11604) {
    tax = 0
  } else if (annual <= 66760) {
    // Progressive from 14% to 42%
    const taxable = annual - 11604
    const range = 66760 - 11604
    const avgRate = 0.14 + (0.42 - 0.14) * (taxable / range) / 2
    tax = taxable * avgRate
  } else if (annual <= 277825) {
    // First zone
    const zone1 = 66760 - 11604
    const avgRate1 = 0.14 + (0.42 - 0.14) * 0.5
    tax = zone1 * avgRate1 + (annual - 66760) * 0.42
  } else {
    const zone1 = 66760 - 11604
    const avgRate1 = 0.14 + (0.42 - 0.14) * 0.5
    tax = zone1 * avgRate1 + (277825 - 66760) * 0.42 + (annual - 277825) * 0.45
  }
  // Social charges ~20% (pension, health, unemployment, nursing care) capped
  const socialCharges = annual * 0.20
  return { incomeTax: tax, socialCharges, net: annual - tax - socialCharges }
}

function calcSpain(annual: number): TaxResult {
  const brackets = [
    { limit: 12450, rate: 0.19 },
    { limit: 20200, rate: 0.24 },
    { limit: 35200, rate: 0.30 },
    { limit: 60000, rate: 0.37 },
    { limit: 300000, rate: 0.45 },
    { limit: Infinity, rate: 0.47 },
  ]
  let tax = 0, prev = 0
  for (const b of brackets) {
    if (annual <= prev) break
    const slice = Math.min(annual, b.limit) - prev
    tax += Math.max(0, slice) * b.rate
    prev = b.limit
  }
  // Social security ~6.35%
  const socialCharges = annual * 0.0635
  return { incomeTax: tax, socialCharges, net: annual - tax - socialCharges }
}

function calcFlat(annual: number, rate: number): TaxResult {
  const tax = annual * (rate / 100)
  return { incomeTax: tax, socialCharges: 0, net: annual - tax }
}

const LABELS: Record<string, Record<Locale, string>> = {
  // Title
  navTitle: {
    en: 'Salary Calculator', fr: 'Calculateur de salaire', es: 'Calculadora de salario', pt: 'Calculadora de salário', de: 'Gehaltsrechner',
  },
  titleGrossTo: {
    en: 'Gross to', fr: 'Salaire brut', es: 'Salario bruto', pt: 'Salário bruto', de: 'Brutto zu',
  },
  titleNet: {
    en: 'Net', fr: 'Net', es: 'Neto', pt: 'Líquido', de: 'Netto',
  },
  titleSalary: {
    en: 'Salary', fr: '', es: '', pt: '', de: 'Gehalt',
  },
  subtitle: {
    en: 'See your take-home pay after taxes and social charges.',
    fr: 'Découvrez votre salaire net après impôts et charges sociales.',
    es: 'Consulta tu salario neto después de impuestos y cargas sociales.',
    pt: 'Veja seu salário líquido após impostos e contribuições sociais.',
    de: 'Sehen Sie Ihr Nettogehalt nach Steuern und Sozialabgaben.',
  },
  // Input labels
  grossSalary: {
    en: 'Gross salary', fr: 'Salaire brut', es: 'Salario bruto', pt: 'Salário bruto', de: 'Bruttogehalt',
  },
  enterGross: {
    en: 'Enter gross salary', fr: 'Entrez le salaire brut', es: 'Ingrese el salario bruto', pt: 'Insira o salário bruto', de: 'Bruttogehalt eingeben',
  },
  period: {
    en: 'Period', fr: 'Période', es: 'Período', pt: 'Período', de: 'Zeitraum',
  },
  countryTax: {
    en: 'Country / tax system', fr: 'Pays / système fiscal', es: 'País / sistema fiscal', pt: 'País / sistema tributário', de: 'Land / Steuersystem',
  },
  customTaxRate: {
    en: 'Custom tax rate (%)', fr: 'Taux d\'imposition personnalisé (%)', es: 'Tasa impositiva personalizada (%)', pt: 'Taxa tributária personalizada (%)', de: 'Benutzerdefinierter Steuersatz (%)',
  },
  // Period names
  periodAnnual: { en: 'Annual', fr: 'Annuel', es: 'Anual', pt: 'Anual', de: 'Jährlich' },
  periodMonthly: { en: 'Monthly', fr: 'Mensuel', es: 'Mensual', pt: 'Mensal', de: 'Monatlich' },
  periodWeekly: { en: 'Weekly', fr: 'Hebdomadaire', es: 'Semanal', pt: 'Semanal', de: 'Wöchentlich' },
  periodHourly: { en: 'Hourly', fr: 'Horaire', es: 'Por hora', pt: 'Por hora', de: 'Stündlich' },
  periodDaily: { en: 'Daily', fr: 'Journalier', es: 'Diario', pt: 'Diário', de: 'Täglich' },
  // Country names
  countryFrance: { en: 'France', fr: 'France', es: 'Francia', pt: 'França', de: 'Frankreich' },
  countryUSA: { en: 'USA', fr: 'États-Unis', es: 'EE.UU.', pt: 'EUA', de: 'USA' },
  countryUK: { en: 'UK', fr: 'Royaume-Uni', es: 'Reino Unido', pt: 'Reino Unido', de: 'Vereinigtes Königreich' },
  countryGermany: { en: 'Germany', fr: 'Allemagne', es: 'Alemania', pt: 'Alemanha', de: 'Deutschland' },
  countrySpain: { en: 'Spain', fr: 'Espagne', es: 'España', pt: 'Espanha', de: 'Spanien' },
  countryFlat: { en: 'Flat rate', fr: 'Taux fixe', es: 'Tasa fija', pt: 'Taxa fixa', de: 'Pauschalsatz' },
  // Result labels
  netSalary: { en: 'Net salary', fr: 'Salaire net', es: 'Salario neto', pt: 'Salário líquido', de: 'Nettogehalt' },
  totalTax: { en: 'Total tax', fr: 'Impôt total', es: 'Impuesto total', pt: 'Imposto total', de: 'Gesamtsteuer' },
  effectiveRate: { en: 'Effective rate', fr: 'Taux effectif', es: 'Tasa efectiva', pt: 'Taxa efetiva', de: 'Effektiver Satz' },
  // Per-period labels
  perYear: { en: 'per year', fr: 'par an', es: 'por año', pt: 'por ano', de: 'pro Jahr' },
  perMonth: { en: 'per month', fr: 'par mois', es: 'por mes', pt: 'por mês', de: 'pro Monat' },
  perWeek: { en: 'per week', fr: 'par semaine', es: 'por semana', pt: 'por semana', de: 'pro Woche' },
  perHour: { en: 'per hour', fr: 'par heure', es: 'por hora', pt: 'por hora', de: 'pro Stunde' },
  // Table & breakdown
  deducted: { en: 'deducted', fr: 'déduit', es: 'deducido', pt: 'deduzido', de: 'abgezogen' },
  ofGross: { en: 'of gross', fr: 'du brut', es: 'del bruto', pt: 'do bruto', de: 'vom Brutto' },
  breakdown: { en: 'Breakdown', fr: 'Répartition', es: 'Desglose', pt: 'Detalhamento', de: 'Aufschlüsselung' },
  netLabel: { en: 'Net', fr: 'Net', es: 'Neto', pt: 'Líquido', de: 'Netto' },
  taxLabel: { en: 'Tax', fr: 'Impôt', es: 'Impuesto', pt: 'Imposto', de: 'Steuer' },
  socialLabel: { en: 'Social', fr: 'Social', es: 'Social', pt: 'Social', de: 'Sozial' },
  grossLabel: { en: 'Gross', fr: 'Brut', es: 'Bruto', pt: 'Bruto', de: 'Brutto' },
  equivalents: { en: 'Equivalents', fr: 'Équivalences', es: 'Equivalencias', pt: 'Equivalências', de: 'Äquivalente' },
  thPeriod: { en: 'Period', fr: 'Période', es: 'Período', pt: 'Período', de: 'Zeitraum' },
  thGross: { en: 'Gross', fr: 'Brut', es: 'Bruto', pt: 'Bruto', de: 'Brutto' },
  thNet: { en: 'Net', fr: 'Net', es: 'Neto', pt: 'Líquido', de: 'Netto' },
  // Disclaimer
  disclaimer: {
    en: 'This is an estimate. Consult a tax professional for exact figures. Tax rules vary by situation (marital status, deductions, region, etc.).',
    fr: 'Ceci est une estimation. Consultez un professionnel fiscal pour des chiffres exacts. Les règles fiscales varient selon la situation (état civil, déductions, région, etc.).',
    es: 'Esto es una estimación. Consulte a un profesional fiscal para cifras exactas. Las normas fiscales varían según la situación (estado civil, deducciones, región, etc.).',
    pt: 'Esta é uma estimativa. Consulte um profissional tributário para valores exatos. As regras fiscais variam conforme a situação (estado civil, deduções, região, etc.).',
    de: 'Dies ist eine Schätzung. Konsultieren Sie einen Steuerberater für genaue Zahlen. Steuerregeln variieren je nach Situation (Familienstand, Abzüge, Region usw.).',
  },
  // SEO
  seoH2: {
    en: 'Free salary calculator',
    fr: 'Calculateur de salaire gratuit',
    es: 'Calculadora de salario gratuita',
    pt: 'Calculadora de salário gratuita',
    de: 'Kostenloser Gehaltsrechner',
  },
  seoP1: {
    en: 'Our salary calculator converts your gross pay into net take-home pay after income tax and social contributions. Select your country to apply the correct tax brackets and deduction rates for France, the USA, the UK, Germany, or Spain. You can also use a simple flat rate for quick estimates. The equivalents table instantly shows your gross and net pay across annual, monthly, weekly, and hourly periods.',
    fr: 'Notre calculateur de salaire convertit votre salaire brut en salaire net après impôt sur le revenu et cotisations sociales. Sélectionnez votre pays pour appliquer les tranches d\'imposition et les taux de déduction corrects pour la France, les États-Unis, le Royaume-Uni, l\'Allemagne ou l\'Espagne. Vous pouvez aussi utiliser un taux fixe simple pour des estimations rapides. Le tableau d\'équivalences affiche instantanément votre salaire brut et net sur des périodes annuelles, mensuelles, hebdomadaires et horaires.',
    es: 'Nuestra calculadora de salario convierte tu pago bruto en salario neto después de impuestos y contribuciones sociales. Selecciona tu país para aplicar los tramos impositivos y las tasas de deducción correctas para Francia, EE.UU., Reino Unido, Alemania o España. También puedes usar una tasa fija simple para estimaciones rápidas. La tabla de equivalencias muestra instantáneamente tu salario bruto y neto en períodos anuales, mensuales, semanales y por hora.',
    pt: 'Nossa calculadora de salário converte seu pagamento bruto em salário líquido após imposto de renda e contribuições sociais. Selecione seu país para aplicar as faixas de tributação e taxas de dedução corretas para França, EUA, Reino Unido, Alemanha ou Espanha. Você também pode usar uma taxa fixa simples para estimativas rápidas. A tabela de equivalências mostra instantaneamente seu salário bruto e líquido em períodos anuais, mensais, semanais e por hora.',
    de: 'Unser Gehaltsrechner rechnet Ihr Bruttogehalt in Nettogehalt nach Einkommensteuer und Sozialabgaben um. Wählen Sie Ihr Land aus, um die korrekten Steuerstufen und Abzugssätze für Frankreich, die USA, Großbritannien, Deutschland oder Spanien anzuwenden. Sie können auch einen einfachen Pauschalsatz für schnelle Schätzungen verwenden. Die Äquivalenztabelle zeigt sofort Ihr Brutto- und Nettogehalt in jährlichen, monatlichen, wöchentlichen und stündlichen Zeiträumen.',
  },
  seoH3a: {
    en: 'How tax deductions are calculated',
    fr: 'Comment les déductions fiscales sont calculées',
    es: 'Cómo se calculan las deducciones fiscales',
    pt: 'Como as deduções fiscais são calculadas',
    de: 'Wie Steuerabzüge berechnet werden',
  },
  seoP2: {
    en: 'Each country uses progressive tax brackets, meaning different portions of your income are taxed at different rates. Social charges such as pension, health insurance, and unemployment contributions are calculated separately. The breakdown bar clearly shows what percentage of your gross salary goes to net pay, income tax, and social charges so there are no surprises on payday.',
    fr: 'Chaque pays utilise des tranches d\'imposition progressives, ce qui signifie que différentes portions de vos revenus sont imposées à des taux différents. Les charges sociales telles que la retraite, l\'assurance maladie et les cotisations chômage sont calculées séparément. La barre de répartition montre clairement quel pourcentage de votre salaire brut va au salaire net, à l\'impôt sur le revenu et aux charges sociales, pour qu\'il n\'y ait pas de surprises le jour de la paie.',
    es: 'Cada país utiliza tramos impositivos progresivos, lo que significa que diferentes porciones de tus ingresos se gravan a diferentes tasas. Las cargas sociales como pensiones, seguro médico y contribuciones al desempleo se calculan por separado. La barra de desglose muestra claramente qué porcentaje de tu salario bruto va al salario neto, impuesto sobre la renta y cargas sociales, para que no haya sorpresas el día de pago.',
    pt: 'Cada país usa faixas tributárias progressivas, o que significa que diferentes porções da sua renda são tributadas a diferentes taxas. Contribuições sociais como previdência, seguro saúde e seguro-desemprego são calculadas separadamente. A barra de detalhamento mostra claramente qual porcentagem do seu salário bruto vai para o salário líquido, imposto de renda e contribuições sociais, para que não haja surpresas no dia do pagamento.',
    de: 'Jedes Land verwendet progressive Steuerstufen, was bedeutet, dass verschiedene Teile Ihres Einkommens mit unterschiedlichen Sätzen besteuert werden. Sozialabgaben wie Rente, Krankenversicherung und Arbeitslosenversicherung werden separat berechnet. Der Aufschlüsselungsbalken zeigt deutlich, welcher Prozentsatz Ihres Bruttogehalts auf Nettogehalt, Einkommensteuer und Sozialabgaben entfällt, damit es am Zahltag keine Überraschungen gibt.',
  },
  seoH3b: {
    en: 'Comparing salaries across periods',
    fr: 'Comparer les salaires sur différentes périodes',
    es: 'Comparar salarios entre períodos',
    pt: 'Comparando salários entre períodos',
    de: 'Gehälter über Zeiträume vergleichen',
  },
  seoP3: {
    en: 'Whether you are negotiating a job offer quoted as an annual figure or evaluating freelance work billed hourly, seeing the same salary across all time periods is essential. Enter your pay in any period and the calculator automatically computes the other three. This makes it straightforward to compare offers with different pay structures side by side.',
    fr: 'Que vous négociiez une offre d\'emploi exprimée en montant annuel ou que vous évaluiez un travail en freelance facturé à l\'heure, voir le même salaire sur toutes les périodes est essentiel. Entrez votre salaire dans n\'importe quelle période et le calculateur calcule automatiquement les trois autres. Cela permet de comparer facilement des offres avec des structures de rémunération différentes côte à côte.',
    es: 'Ya sea que estés negociando una oferta de trabajo expresada como cifra anual o evaluando trabajo freelance facturado por hora, ver el mismo salario en todos los períodos es esencial. Ingresa tu pago en cualquier período y la calculadora calcula automáticamente los otros tres. Esto facilita comparar ofertas con diferentes estructuras de pago lado a lado.',
    pt: 'Seja negociando uma oferta de emprego expressa como valor anual ou avaliando trabalho freelance cobrado por hora, ver o mesmo salário em todos os períodos é essencial. Insira seu pagamento em qualquer período e a calculadora calcula automaticamente os outros três. Isso facilita comparar ofertas com diferentes estruturas de pagamento lado a lado.',
    de: 'Ob Sie ein Jobangebot verhandeln, das als Jahresgehalt angegeben ist, oder Freelance-Arbeit bewerten, die stündlich abgerechnet wird - das gleiche Gehalt über alle Zeiträume zu sehen ist unerlässlich. Geben Sie Ihr Gehalt in einem beliebigen Zeitraum ein und der Rechner berechnet automatisch die anderen drei. So können Sie Angebote mit unterschiedlichen Vergütungsstrukturen einfach nebeneinander vergleichen.',
  },
  seoCrossPromo: {
    en: 'Need to calculate VAT on invoices? Try the',
    fr: 'Besoin de calculer la TVA sur vos factures ? Essayez le',
    es: '¿Necesitas calcular el IVA en facturas? Prueba la',
    pt: 'Precisa calcular o IVA em faturas? Experimente a',
    de: 'Müssen Sie die Mehrwertsteuer auf Rechnungen berechnen? Probieren Sie den',
  },
  vatCalcLink: {
    en: 'VAT calculator', fr: 'calculateur de TVA', es: 'calculadora de IVA', pt: 'calculadora de IVA', de: 'Mehrwertsteuerrechner',
  },
  crossPromoMid: {
    en: '. For quick math on raises or deductions, the',
    fr: '. Pour des calculs rapides sur les augmentations ou les déductions, le',
    es: '. Para cálculos rápidos sobre aumentos o deducciones, la',
    pt: '. Para cálculos rápidos sobre aumentos ou deduções, a',
    de: '. Für schnelle Berechnungen bei Gehaltserhöhungen oder Abzügen kann der',
  },
  percentCalcLink: {
    en: 'percentage calculator', fr: 'calculateur de pourcentage', es: 'calculadora de porcentajes', pt: 'calculadora de porcentagem', de: 'Prozentrechner',
  },
  crossPromoEnd: {
    en: 'can help.', fr: 'peut vous aider.', es: 'puede ayudarte.', pt: 'pode ajudar.', de: 'helfen.',
  },
}

const COUNTRIES_DATA = [
  { id: 'france', labelKey: 'countryFrance', flag: '🇫🇷' },
  { id: 'usa', labelKey: 'countryUSA', flag: '🇺🇸' },
  { id: 'uk', labelKey: 'countryUK', flag: '🇬🇧' },
  { id: 'germany', labelKey: 'countryGermany', flag: '🇩🇪' },
  { id: 'spain', labelKey: 'countrySpain', flag: '🇪🇸' },
  { id: 'flat', labelKey: 'countryFlat', flag: '📊' },
]

const PERIODS_DATA = [
  { id: 'annual', labelKey: 'periodAnnual', divisor: 1 },
  { id: 'monthly', labelKey: 'periodMonthly', divisor: 12 },
  { id: 'weekly', labelKey: 'periodWeekly', divisor: 52 },
  { id: 'hourly', labelKey: 'periodHourly', divisor: 2080 },
]

export default function SalaryClient({
  defaultSalary,
  defaultCountry,
  defaultPeriod,
  locale = 'en' as Locale,
}: {
  defaultSalary?: number
  defaultCountry?: string
  defaultPeriod?: string
  locale?: Locale
} = {}) {
  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

  function fmt(n: number): string {
    return n.toLocaleString(LOCALE_CODES[locale], { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  const [salary, setSalary] = useState(defaultSalary?.toString() || '45000')
  const [country, setCountry] = useState(defaultCountry || 'france')
  const [period, setPeriod] = useState(defaultPeriod || 'annual')
  const [flatRate, setFlatRate] = useState('30')

  const result = useMemo(() => {
    const raw = parseFloat(salary)
    if (isNaN(raw) || raw < 0) return null
    const periodObj = PERIODS_DATA.find(p => p.id === period)!
    const annual = raw * periodObj.divisor

    let res: TaxResult
    switch (country) {
      case 'france': res = calcFrance(annual); break
      case 'usa': res = calcUSA(annual); break
      case 'uk': res = calcUK(annual); break
      case 'germany': res = calcGermany(annual); break
      case 'spain': res = calcSpain(annual); break
      case 'flat': res = calcFlat(annual, parseFloat(flatRate) || 0); break
      default: res = calcFrance(annual)
    }
    return { annual, ...res }
  }, [salary, country, period, flatRate])

  const totalDeductions = result ? result.incomeTax + result.socialCharges : 0
  const effectiveRate = result && result.annual > 0 ? (totalDeductions / result.annual) * 100 : 0
  const periodDivisor = PERIODS_DATA.find(p => p.id === period)?.divisor || 1

  const perPeriodLabel = (pid: string) => {
    switch (pid) {
      case 'annual': return lt('perYear')
      case 'monthly': return lt('perMonth')
      case 'weekly': return lt('perWeek')
      case 'hourly': return lt('perHour')
      default: return ''
    }
  }

  return (
    <ToolShell name={lt('navTitle')} icon="💰" currentPath="/salary-calculator" locale={locale}>
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>💰</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>{lt('navTitle')}</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>{t('backAllTools', locale)}</a>
        </nav>

        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            {lt('titleGrossTo')} <span style={{ color: accent }}>{lt('titleNet')}</span> {lt('titleSalary')}
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>{lt('subtitle')}</p>
        </section>

        {/* Calculator card */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            {/* Gross salary */}
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>{lt('grossSalary')}</label>
              <input
                type="number"
                value={salary}
                onChange={e => setSalary(e.target.value)}
                placeholder={lt('enterGross')}
                style={{ ...inputStyle, fontSize: 22, fontFamily: fm, fontWeight: 700, padding: '14px 16px', textAlign: 'center' as const, borderRadius: 12 }}
              />
            </div>

            {/* Period */}
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>{lt('period')}</label>
              <div style={{ display: 'flex', gap: 6 }}>
                {PERIODS_DATA.map(p => (
                  <button key={p.id} onClick={() => setPeriod(p.id)} style={{
                    flex: 1, fontFamily: fb, fontSize: 13, fontWeight: 600, padding: '9px 8px',
                    borderRadius: 10, cursor: 'pointer',
                    border: period === p.id ? `1.5px solid ${accent}` : '1.5px solid #E8E4DB',
                    background: period === p.id ? accent + '10' : '#fff',
                    color: period === p.id ? accent : '#6B6560',
                  }}>{lt(p.labelKey)}</button>
                ))}
              </div>
            </div>

            {/* Country */}
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>{lt('countryTax')}</label>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {COUNTRIES_DATA.map(c => (
                  <button key={c.id} onClick={() => setCountry(c.id)} style={{
                    fontFamily: fb, fontSize: 12, fontWeight: 600, padding: '8px 14px',
                    borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5,
                    border: country === c.id ? `1.5px solid ${accent}` : '1.5px solid #E8E4DB',
                    background: country === c.id ? accent + '10' : '#fff',
                    color: country === c.id ? accent : '#6B6560',
                  }}><span>{c.flag}</span> {lt(c.labelKey)}</button>
                ))}
              </div>
            </div>

            {/* Flat rate custom field */}
            {country === 'flat' && (
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>{lt('customTaxRate')}</label>
                <input
                  type="number"
                  value={flatRate}
                  onChange={e => setFlatRate(e.target.value)}
                  placeholder="e.g. 30"
                  style={inputStyle}
                />
              </div>
            )}
          </div>
        </section>

        {/* Results */}
        {result && result.annual > 0 && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
            {/* Main result cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
              <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: '20px 16px', textAlign: 'center' }}>
                <div style={labelStyle}>{lt('netSalary')}</div>
                <div style={{ fontSize: 24, fontFamily: fm, fontWeight: 700, color: accent }}>{fmt(result.net / periodDivisor)}</div>
                <div style={{ fontSize: 11, color: '#9A958A', marginTop: 2 }}>{perPeriodLabel(period)}</div>
              </div>
              <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: '20px 16px', textAlign: 'center' }}>
                <div style={labelStyle}>{lt('totalTax')}</div>
                <div style={{ fontSize: 24, fontFamily: fm, fontWeight: 700, color: '#E04848' }}>{fmt(totalDeductions / periodDivisor)}</div>
                <div style={{ fontSize: 11, color: '#9A958A', marginTop: 2 }}>{lt('deducted')}</div>
              </div>
              <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: '20px 16px', textAlign: 'center' }}>
                <div style={labelStyle}>{lt('effectiveRate')}</div>
                <div style={{ fontSize: 24, fontFamily: fm, fontWeight: 700, color: '#D97706' }}>{effectiveRate.toFixed(1)}%</div>
                <div style={{ fontSize: 11, color: '#9A958A', marginTop: 2 }}>{lt('ofGross')}</div>
              </div>
            </div>

            {/* Breakdown bar */}
            <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: 20, marginBottom: 20 }}>
              <div style={{ ...labelStyle, marginBottom: 12 }}>{lt('breakdown')}</div>
              <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', height: 32 }}>
                <div style={{ width: `${(result.net / result.annual) * 100}%`, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 700, minWidth: 40 }}>
                  {lt('netLabel')} {((result.net / result.annual) * 100).toFixed(0)}%
                </div>
                {result.incomeTax > 0 && (
                  <div style={{ width: `${(result.incomeTax / result.annual) * 100}%`, background: '#E04848', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 700, minWidth: 40 }}>
                    {lt('taxLabel')} {((result.incomeTax / result.annual) * 100).toFixed(0)}%
                  </div>
                )}
                {result.socialCharges > 0 && (
                  <div style={{ width: `${(result.socialCharges / result.annual) * 100}%`, background: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 700, minWidth: 40 }}>
                    {lt('socialLabel')} {((result.socialCharges / result.annual) * 100).toFixed(0)}%
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 12, color: '#6B6560' }}>
                <span>{lt('grossLabel')}: {fmt(result.annual / periodDivisor)}</span>
                <span>{lt('netLabel')}: {fmt(result.net / periodDivisor)}</span>
              </div>
            </div>

            {/* Equivalents table */}
            <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: 20, marginBottom: 20 }}>
              <div style={{ ...labelStyle, marginBottom: 12 }}>{lt('equivalents')}</div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: fb, fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #E8E4DB' }}>
                    <th style={{ textAlign: 'left', padding: '8px 0', color: '#9A958A', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.5px' }}>{lt('thPeriod')}</th>
                    <th style={{ textAlign: 'right', padding: '8px 0', color: '#9A958A', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.5px' }}>{lt('thGross')}</th>
                    <th style={{ textAlign: 'right', padding: '8px 0', color: '#9A958A', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.5px' }}>{lt('thNet')}</th>
                  </tr>
                </thead>
                <tbody>
                  {PERIODS_DATA.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #F0EDE7' }}>
                      <td style={{ padding: '10px 0', fontWeight: period === p.id ? 700 : 400, color: period === p.id ? accent : '#1C1B18' }}>{lt(p.labelKey)}</td>
                      <td style={{ padding: '10px 0', textAlign: 'right', fontFamily: fm, fontWeight: 500 }}>{fmt(result.annual / p.divisor)}</td>
                      <td style={{ padding: '10px 0', textAlign: 'right', fontFamily: fm, fontWeight: 700, color: accent }}>{fmt(result.net / p.divisor)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Disclaimer */}
            <div style={{ background: '#FFFBEB', borderRadius: 10, border: '1px solid #F5E6B8', padding: '12px 16px', fontSize: 12, color: '#92722A', lineHeight: 1.6 }}>
              {lt('disclaimer')}
            </div>
          </section>
        )}

        {/* SEO text */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{lt('seoH2')}</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            {lt('seoP1')}
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>{lt('seoH3a')}</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            {lt('seoP2')}
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>{lt('seoH3b')}</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            {lt('seoP3')}
          </p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 14 }}>
            {lt('seoCrossPromo')} <a href="/vat-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{lt('vatCalcLink')}</a>{lt('crossPromoMid')} <a href="/percentage-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{lt('percentCalcLink')}</a> {lt('crossPromoEnd')}
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
