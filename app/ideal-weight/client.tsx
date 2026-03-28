'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'
import { t, type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

const accent = '#8B5CF6'

const labelStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase',
  letterSpacing: '.8px', display: 'block', marginBottom: 4,
}

const inputStyle: React.CSSProperties = {
  width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8,
  padding: '10px 12px', fontSize: 14, fontFamily: fb, color: '#1C1B18',
  background: '#F5F3EE', outline: 'none', boxSizing: 'border-box',
}

const selectStyle: React.CSSProperties = {
  ...inputStyle, cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none',
}

type Gender = 'male' | 'female'
type HeightUnit = 'cm' | 'ftin'
type FrameSize = 'small' | 'medium' | 'large'

interface FormulaResult {
  name: string
  kg: number
  lbs: number
}

const LABELS: Record<string, Record<Locale, string>> = {
  // Title & subtitle
  navTitle: {
    en: 'Ideal Weight Calculator', fr: 'Calculateur de poids idéal', es: 'Calculadora de peso ideal',
    pt: 'Calculadora de peso ideal', de: 'Idealgewicht-Rechner',
  },
  titleIdealWeight: {
    en: 'Ideal weight', fr: 'Poids idéal', es: 'Peso ideal', pt: 'Peso ideal', de: 'Idealgewicht',
  },
  titleCalculator: {
    en: 'calculator', fr: 'calculateur', es: 'calculadora', pt: 'calculadora', de: 'Rechner',
  },
  subtitle: {
    en: 'Find your ideal weight using Devine, Robinson, Miller & Hamwi formulas.',
    fr: 'Trouvez votre poids idéal avec les formules Devine, Robinson, Miller et Hamwi.',
    es: 'Encuentra tu peso ideal con las fórmulas Devine, Robinson, Miller y Hamwi.',
    pt: 'Encontre seu peso ideal com as fórmulas Devine, Robinson, Miller e Hamwi.',
    de: 'Finden Sie Ihr Idealgewicht mit den Formeln von Devine, Robinson, Miller und Hamwi.',
  },

  // Input labels
  frameSize: { en: 'Frame Size', fr: 'Ossature', es: 'Complexión', pt: 'Estrutura óssea', de: 'Körperbau' },
  small: { en: 'Small', fr: 'Petite', es: 'Pequeña', pt: 'Pequena', de: 'Klein' },
  medium: { en: 'Medium', fr: 'Moyenne', es: 'Mediana', pt: 'Média', de: 'Mittel' },
  large: { en: 'Large', fr: 'Grande', es: 'Grande', pt: 'Grande', de: 'Groß' },
  subtractTenPct: { en: 'Subtract ~10%', fr: 'Soustraire ~10 %', es: 'Restar ~10 %', pt: 'Subtrair ~10 %', de: '~10 % abziehen' },
  addTenPct: { en: 'Add ~10%', fr: 'Ajouter ~10 %', es: 'Sumar ~10 %', pt: 'Adicionar ~10 %', de: '~10 % addieren' },
  standardEstimate: { en: 'Standard estimate', fr: 'Estimation standard', es: 'Estimación estándar', pt: 'Estimativa padrão', de: 'Standardschätzung' },

  // Height units
  feet: { en: 'feet', fr: 'pieds', es: 'pies', pt: 'pés', de: 'Fuß' },
  inches: { en: 'inches', fr: 'pouces', es: 'pulgadas', pt: 'polegadas', de: 'Zoll' },

  // Results
  yourIdealWeightRange: {
    en: 'Your Ideal Weight Range', fr: 'Votre fourchette de poids idéal', es: 'Tu rango de peso ideal',
    pt: 'Sua faixa de peso ideal', de: 'Ihr idealer Gewichtsbereich',
  },
  adjustedForFrame: {
    en: 'Adjusted for {frame} frame: {action} ~10% from these values',
    fr: 'Ajusté pour ossature {frame} : {action} ~10 % de ces valeurs',
    es: 'Ajustado para complexión {frame}: {action} ~10 % de estos valores',
    pt: 'Ajustado para estrutura {frame}: {action} ~10 % destes valores',
    de: 'Angepasst an {frame} Körperbau: {action} ~10 % von diesen Werten',
  },
  frameSmall: { en: 'small', fr: 'petite', es: 'pequeña', pt: 'pequena', de: 'kleinen' },
  frameLarge: { en: 'large', fr: 'grande', es: 'grande', pt: 'grande', de: 'großen' },
  actionSubtract: { en: 'subtract', fr: 'soustraire', es: 'restar', pt: 'subtrair', de: 'abziehen' },
  actionAdd: { en: 'add', fr: 'ajouter', es: 'sumar', pt: 'adicionar', de: 'addieren' },
  formulaComparison: {
    en: 'Formula Comparison', fr: 'Comparaison des formules', es: 'Comparación de fórmulas',
    pt: 'Comparação de fórmulas', de: 'Formelvergleich',
  },
  resultsByFormula: {
    en: 'Results by Formula', fr: 'Résultats par formule', es: 'Resultados por fórmula',
    pt: 'Resultados por fórmula', de: 'Ergebnisse nach Formel',
  },
  formula: { en: 'Formula', fr: 'Formule', es: 'Fórmula', pt: 'Fórmula', de: 'Formel' },
  weightKg: { en: 'Weight (kg)', fr: 'Poids (kg)', es: 'Peso (kg)', pt: 'Peso (kg)', de: 'Gewicht (kg)' },
  weightLbs: { en: 'Weight (lbs)', fr: 'Poids (lbs)', es: 'Peso (lbs)', pt: 'Peso (lbs)', de: 'Gewicht (lbs)' },
  bmiRange: { en: 'BMI Range', fr: 'Plage IMC', es: 'Rango IMC', pt: 'Faixa IMC', de: 'BMI-Bereich' },
  healthyBMIRange: {
    en: 'Healthy BMI Weight Range', fr: 'Fourchette de poids sain (IMC)',
    es: 'Rango de peso saludable (IMC)', pt: 'Faixa de peso saudável (IMC)',
    de: 'Gesunder BMI-Gewichtsbereich',
  },
  bmiBasedNote: {
    en: 'Based on a BMI of 18.5–24.9 for a height of',
    fr: 'Basé sur un IMC de 18,5–24,9 pour une taille de',
    es: 'Basado en un IMC de 18,5–24,9 para una altura de',
    pt: 'Baseado em um IMC de 18,5–24,9 para uma altura de',
    de: 'Basierend auf einem BMI von 18,5–24,9 für eine Größe von',
  },

  // Disclaimer
  disclaimer: {
    en: 'Ideal weight estimates are approximations based on population-level formulas. Individual ideal weight varies with body composition, muscle mass, bone density, and overall health. Consult a healthcare professional for personalized advice.',
    fr: 'Les estimations de poids idéal sont des approximations basées sur des formules de population. Le poids idéal individuel varie selon la composition corporelle, la masse musculaire, la densité osseuse et l\'état de santé général. Consultez un professionnel de santé pour des conseils personnalisés.',
    es: 'Las estimaciones de peso ideal son aproximaciones basadas en fórmulas poblacionales. El peso ideal individual varía según la composición corporal, la masa muscular, la densidad ósea y la salud general. Consulta a un profesional de salud para obtener asesoramiento personalizado.',
    pt: 'As estimativas de peso ideal são aproximações baseadas em fórmulas populacionais. O peso ideal individual varia conforme a composição corporal, massa muscular, densidade óssea e saúde geral. Consulte um profissional de saúde para orientações personalizadas.',
    de: 'Idealgewichtsschätzungen sind Näherungswerte basierend auf bevölkerungsbezogenen Formeln. Das individuelle Idealgewicht variiert je nach Körperzusammensetzung, Muskelmasse, Knochendichte und allgemeinem Gesundheitszustand. Konsultieren Sie einen Arzt für eine individuelle Beratung.',
  },

  // SEO
  seoH2: {
    en: 'Free ideal weight calculator',
    fr: 'Calculateur de poids idéal gratuit',
    es: 'Calculadora de peso ideal gratuita',
    pt: 'Calculadora de peso ideal gratuita',
    de: 'Kostenloser Idealgewicht-Rechner',
  },
  seoP1: {
    en: 'Free ideal weight calculator to find your ideal body weight using four scientifically recognized formulas: Devine, Robinson, Miller, and Hamwi. Each formula estimates ideal weight based on your height and gender. The calculator also shows the healthy BMI weight range (18.5–24.9) for your height, giving you a comprehensive view of your target weight. Compare results across all formulas at a glance with the visual comparison bar. Works in both metric (cm, kg) and imperial (ft/in, lbs) units. No signup required.',
    fr: 'Calculateur de poids idéal gratuit pour trouver votre poids corporel idéal à l\'aide de quatre formules scientifiquement reconnues : Devine, Robinson, Miller et Hamwi. Chaque formule estime le poids idéal en fonction de votre taille et de votre sexe. Le calculateur affiche également la fourchette de poids sain selon l\'IMC (18,5–24,9) pour votre taille, vous offrant une vue complète de votre poids cible. Comparez les résultats de toutes les formules en un coup d\'œil grâce à la barre de comparaison visuelle. Fonctionne en unités métriques (cm, kg) et impériales (pi/po, lbs). Aucune inscription requise.',
    es: 'Calculadora de peso ideal gratuita para encontrar tu peso corporal ideal utilizando cuatro fórmulas científicamente reconocidas: Devine, Robinson, Miller y Hamwi. Cada fórmula estima el peso ideal según tu altura y sexo. La calculadora también muestra el rango de peso saludable según el IMC (18,5–24,9) para tu estatura, ofreciéndote una vista completa de tu peso objetivo. Compara los resultados de todas las fórmulas de un vistazo con la barra de comparación visual. Funciona tanto en unidades métricas (cm, kg) como imperiales (pies/pulg, lbs). Sin registro.',
    pt: 'Calculadora de peso ideal gratuita para encontrar seu peso corporal ideal usando quatro fórmulas cientificamente reconhecidas: Devine, Robinson, Miller e Hamwi. Cada fórmula estima o peso ideal com base na sua altura e sexo. A calculadora também mostra a faixa de peso saudável pelo IMC (18,5–24,9) para sua altura, oferecendo uma visão abrangente do seu peso-alvo. Compare os resultados de todas as fórmulas de relance com a barra de comparação visual. Funciona em unidades métricas (cm, kg) e imperiais (pés/pol, lbs). Sem cadastro.',
    de: 'Kostenloser Idealgewicht-Rechner zur Bestimmung Ihres idealen Körpergewichts anhand von vier wissenschaftlich anerkannten Formeln: Devine, Robinson, Miller und Hamwi. Jede Formel schätzt das Idealgewicht basierend auf Ihrer Größe und Ihrem Geschlecht. Der Rechner zeigt auch den gesunden BMI-Gewichtsbereich (18,5–24,9) für Ihre Größe und bietet Ihnen einen umfassenden Überblick über Ihr Zielgewicht. Vergleichen Sie die Ergebnisse aller Formeln auf einen Blick mit dem visuellen Vergleichsbalken. Funktioniert sowohl in metrischen (cm, kg) als auch in imperialen Einheiten (Fuß/Zoll, lbs). Keine Anmeldung erforderlich.',
  },
  seoH3: {
    en: 'How are ideal weight formulas calculated?',
    fr: 'Comment les formules de poids idéal sont-elles calculées ?',
    es: '¿Cómo se calculan las fórmulas de peso ideal?',
    pt: 'Como as fórmulas de peso ideal são calculadas?',
    de: 'Wie werden die Idealgewichtsformeln berechnet?',
  },
  seoP2: {
    en: 'All four formulas use height in inches above 5 feet (60 inches) as the primary variable. The Devine formula (1974) is the most widely used in clinical settings. Robinson (1983) and Miller (1983) provide alternative estimates, while the Hamwi formula (1964) was one of the earliest methods. Results vary by a few kilograms, so viewing the range across all formulas gives a more realistic target. The BMI-based range uses the standard healthy BMI of 18.5 to 24.9 multiplied by your height in meters squared.',
    fr: 'Les quatre formules utilisent la taille en pouces au-dessus de 5 pieds (60 pouces) comme variable principale. La formule de Devine (1974) est la plus utilisée en milieu clinique. Robinson (1983) et Miller (1983) fournissent des estimations alternatives, tandis que la formule de Hamwi (1964) fut l\'une des premières méthodes. Les résultats varient de quelques kilogrammes, donc examiner la fourchette de toutes les formules donne un objectif plus réaliste. La fourchette basée sur l\'IMC utilise l\'IMC sain standard de 18,5 à 24,9 multiplié par le carré de votre taille en mètres.',
    es: 'Las cuatro fórmulas utilizan la altura en pulgadas por encima de 5 pies (60 pulgadas) como variable principal. La fórmula de Devine (1974) es la más utilizada en entornos clínicos. Robinson (1983) y Miller (1983) proporcionan estimaciones alternativas, mientras que la fórmula de Hamwi (1964) fue uno de los primeros métodos. Los resultados varían en unos pocos kilogramos, por lo que ver el rango de todas las fórmulas ofrece un objetivo más realista. El rango basado en el IMC utiliza el IMC saludable estándar de 18,5 a 24,9 multiplicado por el cuadrado de tu altura en metros.',
    pt: 'As quatro fórmulas usam a altura em polegadas acima de 5 pés (60 polegadas) como variável principal. A fórmula de Devine (1974) é a mais utilizada em ambientes clínicos. Robinson (1983) e Miller (1983) fornecem estimativas alternativas, enquanto a fórmula de Hamwi (1964) foi um dos primeiros métodos. Os resultados variam em poucos quilogramas, portanto visualizar a faixa de todas as fórmulas oferece um objetivo mais realista. A faixa baseada no IMC usa o IMC saudável padrão de 18,5 a 24,9 multiplicado pelo quadrado da sua altura em metros.',
    de: 'Alle vier Formeln verwenden die Körpergröße in Zoll über 5 Fuß (60 Zoll) als Hauptvariable. Die Devine-Formel (1974) ist die am weitesten verbreitete in klinischen Einrichtungen. Robinson (1983) und Miller (1983) liefern alternative Schätzungen, während die Hamwi-Formel (1964) eine der frühesten Methoden war. Die Ergebnisse variieren um wenige Kilogramm, daher bietet die Betrachtung des Bereichs aller Formeln ein realistischeres Ziel. Der BMI-basierte Bereich verwendet den gesunden Standard-BMI von 18,5 bis 24,9 multipliziert mit dem Quadrat Ihrer Größe in Metern.',
  },
  seoP3: {
    en: 'For a more complete picture, check your score with our <a href="/bmi-calculator" style="color:#FF6B35;text-decoration:underline">BMI calculator</a> or measure your actual body composition using the <a href="/body-fat-calculator" style="color:#FF6B35;text-decoration:underline">body fat calculator</a>. While ideal weight formulas provide a useful reference point, body fat percentage gives a better indication of overall health than weight alone.',
    fr: 'Pour une vue plus complète, vérifiez votre score avec notre <a href="/bmi-calculator" style="color:#FF6B35;text-decoration:underline">calculateur d\'IMC</a> ou mesurez votre composition corporelle réelle avec le <a href="/body-fat-calculator" style="color:#FF6B35;text-decoration:underline">calculateur de masse grasse</a>. Bien que les formules de poids idéal fournissent un point de référence utile, le pourcentage de masse grasse donne une meilleure indication de la santé globale que le poids seul.',
    es: 'Para una imagen más completa, consulta tu puntuación con nuestra <a href="/bmi-calculator" style="color:#FF6B35;text-decoration:underline">calculadora de IMC</a> o mide tu composición corporal real con la <a href="/body-fat-calculator" style="color:#FF6B35;text-decoration:underline">calculadora de grasa corporal</a>. Si bien las fórmulas de peso ideal proporcionan un punto de referencia útil, el porcentaje de grasa corporal ofrece una mejor indicación de la salud general que el peso por sí solo.',
    pt: 'Para uma visão mais completa, verifique sua pontuação com nossa <a href="/bmi-calculator" style="color:#FF6B35;text-decoration:underline">calculadora de IMC</a> ou meça sua composição corporal real com a <a href="/body-fat-calculator" style="color:#FF6B35;text-decoration:underline">calculadora de gordura corporal</a>. Embora as fórmulas de peso ideal forneçam um ponto de referência útil, o percentual de gordura corporal oferece uma indicação melhor da saúde geral do que o peso isoladamente.',
    de: 'Für ein vollständigeres Bild überprüfen Sie Ihren Wert mit unserem <a href="/bmi-calculator" style="color:#FF6B35;text-decoration:underline">BMI-Rechner</a> oder messen Sie Ihre tatsächliche Körperzusammensetzung mit dem <a href="/body-fat-calculator" style="color:#FF6B35;text-decoration:underline">Körperfett-Rechner</a>. Während Idealgewichtsformeln einen nützlichen Referenzpunkt bieten, gibt der Körperfettanteil eine bessere Aussage über die allgemeine Gesundheit als das Gewicht allein.',
  },
}

export default function IdealWeightClient({
  defaultGender,
  defaultHeight,
  locale = 'en' as Locale,
}: {
  defaultGender?: string
  defaultHeight?: number
  locale?: Locale
} = {}) {
  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

  const [gender, setGender] = useState<Gender>((defaultGender as Gender) ?? 'male')
  const [heightCm, setHeightCm] = useState(defaultHeight ?? 170)
  const [heightFt, setHeightFt] = useState(5)
  const [heightIn, setHeightIn] = useState(7)
  const [heightUnit, setHeightUnit] = useState<HeightUnit>('cm')
  const [frame, setFrame] = useState<FrameSize>('medium')

  const results = useMemo(() => {
    const hCm = heightUnit === 'cm' ? heightCm : (heightFt * 12 + heightIn) * 2.54
    if (hCm <= 0) return null

    const totalInches = hCm / 2.54
    const inchesOver60 = totalInches - 60
    const heightM = hCm / 100

    // Devine formula
    const devineKg = gender === 'male'
      ? 50 + 2.3 * inchesOver60
      : 45.5 + 2.3 * inchesOver60

    // Robinson formula
    const robinsonKg = gender === 'male'
      ? 52 + 1.9 * inchesOver60
      : 49 + 1.7 * inchesOver60

    // Miller formula
    const millerKg = gender === 'male'
      ? 56.2 + 1.41 * inchesOver60
      : 53.1 + 1.36 * inchesOver60

    // Hamwi formula
    const hamwiKg = gender === 'male'
      ? 48 + 2.7 * inchesOver60
      : 45.5 + 2.2 * inchesOver60

    // BMI-based healthy range
    const bmiLowKg = 18.5 * heightM * heightM
    const bmiHighKg = 24.9 * heightM * heightM

    const formulas: FormulaResult[] = [
      { name: 'Devine', kg: Math.round(devineKg * 10) / 10, lbs: Math.round(devineKg * 2.205 * 10) / 10 },
      { name: 'Robinson', kg: Math.round(robinsonKg * 10) / 10, lbs: Math.round(robinsonKg * 2.205 * 10) / 10 },
      { name: 'Miller', kg: Math.round(millerKg * 10) / 10, lbs: Math.round(millerKg * 2.205 * 10) / 10 },
      { name: 'Hamwi', kg: Math.round(hamwiKg * 10) / 10, lbs: Math.round(hamwiKg * 2.205 * 10) / 10 },
    ]

    const allKg = formulas.map(f => f.kg)
    const rangeMin = Math.min(...allKg)
    const rangeMax = Math.max(...allKg)

    return {
      formulas,
      rangeMin,
      rangeMax,
      rangeMinLbs: Math.round(rangeMin * 2.205 * 10) / 10,
      rangeMaxLbs: Math.round(rangeMax * 2.205 * 10) / 10,
      bmiLowKg: Math.round(bmiLowKg * 10) / 10,
      bmiHighKg: Math.round(bmiHighKg * 10) / 10,
      bmiLowLbs: Math.round(bmiLowKg * 2.205 * 10) / 10,
      bmiHighLbs: Math.round(bmiHighKg * 2.205 * 10) / 10,
      heightM,
    }
  }, [gender, heightCm, heightFt, heightIn, heightUnit])

  const genderBtn = (g: Gender): React.CSSProperties => ({
    flex: 1, padding: '8px 0', border: 'none', borderRadius: 8, cursor: 'pointer',
    fontSize: 13, fontWeight: 600, fontFamily: fb,
    background: gender === g ? accent : 'transparent',
    color: gender === g ? '#fff' : '#9A958A',
    transition: 'all .2s',
  })

  const unitToggle = (active: boolean): React.CSSProperties => ({
    flex: 1, padding: '6px 0', border: 'none', borderRadius: 6, cursor: 'pointer',
    fontSize: 11, fontWeight: 600, fontFamily: fb,
    background: active ? accent : 'transparent',
    color: active ? '#fff' : '#9A958A',
    transition: 'all .2s',
  })

  // Visual bar helpers
  const barMin = results ? Math.min(results.rangeMin, results.bmiLowKg) - 5 : 40
  const barMax = results ? Math.max(results.rangeMax, results.bmiHighKg) + 5 : 90
  const toPercent = (kg: number) => Math.min(Math.max(((kg - barMin) / (barMax - barMin)) * 100, 0), 100)

  const dotColors: Record<string, string> = {
    Devine: '#3B82F6',
    Robinson: '#22C55E',
    Miller: '#F97316',
    Hamwi: '#EF4444',
  }

  return (
    <ToolShell name={lt('navTitle')} icon="⚖️" currentPath="/ideal-weight" locale={locale}>
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>⚖️</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>{lt('navTitle')}</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>{t('backAllTools', locale)}</a>
        </nav>

        {/* Header */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            {lt('titleIdealWeight')} <span style={{ color: accent }}>{lt('titleCalculator')}</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>{lt('subtitle')}</p>
        </section>

        {/* Inputs */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            {/* Gender toggle */}
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>{t('gender', locale)}</label>
              <div style={{ display: 'flex', gap: 4, background: '#F5F3EE', borderRadius: 10, padding: 3 }}>
                <button onClick={() => setGender('male')} style={genderBtn('male')}>{t('male', locale)}</button>
                <button onClick={() => setGender('female')} style={genderBtn('female')}>{t('female', locale)}</button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {/* Height */}
              <div>
                <label style={labelStyle}>{t('height', locale)}</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {heightUnit === 'cm' ? (
                    <div style={{ flex: 1 }}>
                      <input
                        type="number" value={heightCm} min={1}
                        onChange={e => setHeightCm(Number(e.target.value))}
                        style={inputStyle}
                        placeholder="e.g. 170"
                      />
                    </div>
                  ) : (
                    <div style={{ flex: 1, display: 'flex', gap: 6 }}>
                      <div style={{ flex: 1 }}>
                        <input
                          type="number" value={heightFt} min={0}
                          onChange={e => setHeightFt(Number(e.target.value))}
                          style={inputStyle}
                          placeholder="ft"
                        />
                        <span style={{ fontSize: 10, color: '#9A958A' }}>{lt('feet')}</span>
                      </div>
                      <div style={{ flex: 1 }}>
                        <input
                          type="number" value={heightIn} min={0} max={11}
                          onChange={e => setHeightIn(Number(e.target.value))}
                          style={inputStyle}
                          placeholder="in"
                        />
                        <span style={{ fontSize: 10, color: '#9A958A' }}>{lt('inches')}</span>
                      </div>
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: 2, background: '#F5F3EE', borderRadius: 8, padding: 2, minWidth: 80 }}>
                    <button onClick={() => setHeightUnit('cm')} style={unitToggle(heightUnit === 'cm')}>cm</button>
                    <button onClick={() => setHeightUnit('ftin')} style={unitToggle(heightUnit === 'ftin')}>ft/in</button>
                  </div>
                </div>
              </div>

              {/* Frame size */}
              <div>
                <label style={labelStyle}>{lt('frameSize')}</label>
                <select
                  value={frame}
                  onChange={e => setFrame(e.target.value as FrameSize)}
                  style={selectStyle}
                >
                  <option value="small">{lt('small')}</option>
                  <option value="medium">{lt('medium')}</option>
                  <option value="large">{lt('large')}</option>
                </select>
                <span style={{ fontSize: 10, color: '#9A958A', marginTop: 2, display: 'block' }}>
                  {frame === 'small' ? lt('subtractTenPct') : frame === 'large' ? lt('addTenPct') : lt('standardEstimate')}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        {results && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
            {/* Ideal weight range — prominent card */}
            <div style={{
              background: accent + '0A',
              border: `1.5px solid ${accent}25`,
              borderRadius: 16, padding: '28px 22px', textAlign: 'center', marginBottom: 16,
            }}>
              <div style={labelStyle}>{lt('yourIdealWeightRange')}</div>
              <div style={{ fontSize: 46, fontFamily: fm, fontWeight: 700, color: accent, lineHeight: 1.1, marginTop: 8 }}>
                {results.rangeMin.toFixed(1)} – {results.rangeMax.toFixed(1)}
                <span style={{ fontSize: 18, fontWeight: 500, color: '#9A958A', marginLeft: 6 }}>kg</span>
              </div>
              <div style={{ fontSize: 15, color: '#6B6560', marginTop: 6, fontFamily: fm }}>
                {results.rangeMinLbs.toFixed(1)} – {results.rangeMaxLbs.toFixed(1)} lbs
              </div>
              {frame !== 'medium' && (
                <div style={{ fontSize: 12, color: '#9A958A', marginTop: 8 }}>
                  {lt('adjustedForFrame')
                    .replace('{frame}', frame === 'small' ? lt('frameSmall') : lt('frameLarge'))
                    .replace('{action}', frame === 'small' ? lt('actionSubtract') : lt('actionAdd'))}
                </div>
              )}
            </div>

            {/* Visual bar */}
            <div style={{
              background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 16,
              padding: '22px 22px 18px', marginBottom: 16,
            }}>
              <div style={labelStyle}>{lt('formulaComparison')}</div>
              <div style={{ position: 'relative', height: 40, borderRadius: 10, background: '#F5F3EE', marginTop: 14, overflow: 'visible' }}>
                {/* BMI healthy range band */}
                <div style={{
                  position: 'absolute',
                  left: `${toPercent(results.bmiLowKg)}%`,
                  width: `${toPercent(results.bmiHighKg) - toPercent(results.bmiLowKg)}%`,
                  top: 0, height: '100%',
                  background: accent + '18',
                  borderRadius: 10,
                }} />

                {/* Formula dots */}
                {results.formulas.map(f => (
                  <div key={f.name} style={{
                    position: 'absolute',
                    left: `${toPercent(f.kg)}%`,
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 18, height: 18, borderRadius: '50%',
                    background: dotColors[f.name] || accent,
                    border: '2.5px solid #fff',
                    boxShadow: '0 1px 4px rgba(0,0,0,.15)',
                    zIndex: 2,
                  }} />
                ))}

                {/* BMI low/high markers */}
                <div style={{
                  position: 'absolute',
                  left: `${toPercent(results.bmiLowKg)}%`,
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 3, height: 28,
                  background: accent + '60',
                  borderRadius: 2,
                  zIndex: 1,
                }} />
                <div style={{
                  position: 'absolute',
                  left: `${toPercent(results.bmiHighKg)}%`,
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 3, height: 28,
                  background: accent + '60',
                  borderRadius: 2,
                  zIndex: 1,
                }} />
              </div>

              {/* Legend */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 14, justifyContent: 'center' }}>
                {results.formulas.map(f => (
                  <div key={f.name} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#6B6560' }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: dotColors[f.name] || accent }} />
                    {f.name} ({f.kg} kg)
                  </div>
                ))}
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#6B6560' }}>
                  <div style={{ width: 16, height: 10, borderRadius: 3, background: accent + '18', border: `1px solid ${accent}40` }} />
                  BMI 18.5–24.9
                </div>
              </div>
            </div>

            {/* Results table */}
            <div style={{
              background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 16,
              padding: '22px 22px 18px', marginBottom: 16,
            }}>
              <div style={labelStyle}>{lt('resultsByFormula')}</div>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12, fontSize: 14, fontFamily: fb }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px 10px', borderBottom: '1.5px solid #E8E4DB', fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.5px' }}>{lt('formula')}</th>
                    <th style={{ textAlign: 'right', padding: '8px 10px', borderBottom: '1.5px solid #E8E4DB', fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.5px' }}>{lt('weightKg')}</th>
                    <th style={{ textAlign: 'right', padding: '8px 10px', borderBottom: '1.5px solid #E8E4DB', fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.5px' }}>{lt('weightLbs')}</th>
                  </tr>
                </thead>
                <tbody>
                  {results.formulas.map(f => (
                    <tr key={f.name}>
                      <td style={{ padding: '10px 10px', borderBottom: '1px solid #F0EDE6', fontWeight: 600, color: '#1C1B18' }}>
                        <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: dotColors[f.name] || accent, marginRight: 8 }} />
                        {f.name}
                      </td>
                      <td style={{ padding: '10px 10px', borderBottom: '1px solid #F0EDE6', textAlign: 'right', fontFamily: fm, fontWeight: 600, color: '#1C1B18' }}>{f.kg.toFixed(1)}</td>
                      <td style={{ padding: '10px 10px', borderBottom: '1px solid #F0EDE6', textAlign: 'right', fontFamily: fm, color: '#6B6560' }}>{f.lbs.toFixed(1)}</td>
                    </tr>
                  ))}
                  {/* BMI range row */}
                  <tr>
                    <td style={{ padding: '10px 10px', fontWeight: 600, color: accent }}>
                      <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 2, background: accent + '40', marginRight: 8 }} />
                      {lt('bmiRange')}
                    </td>
                    <td style={{ padding: '10px 10px', textAlign: 'right', fontFamily: fm, fontWeight: 600, color: accent }}>{results.bmiLowKg.toFixed(1)} – {results.bmiHighKg.toFixed(1)}</td>
                    <td style={{ padding: '10px 10px', textAlign: 'right', fontFamily: fm, color: '#6B6560' }}>{results.bmiLowLbs.toFixed(1)} – {results.bmiHighLbs.toFixed(1)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Healthy BMI range card */}
            <div style={{
              background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 16,
              padding: '22px 22px 18px', marginBottom: 16,
            }}>
              <div style={labelStyle}>{lt('healthyBMIRange')}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 8 }}>
                <span style={{ fontSize: 28, fontFamily: fm, fontWeight: 700, color: '#22C55E' }}>
                  {results.bmiLowKg.toFixed(1)} – {results.bmiHighKg.toFixed(1)}
                </span>
                <span style={{ fontSize: 14, color: '#9A958A' }}>kg</span>
              </div>
              <div style={{ fontSize: 14, color: '#6B6560', marginTop: 4, fontFamily: fm }}>
                {results.bmiLowLbs.toFixed(1)} – {results.bmiHighLbs.toFixed(1)} lbs
              </div>
              <p style={{ fontSize: 12, color: '#9A958A', marginTop: 10, lineHeight: 1.6 }}>
                {lt('bmiBasedNote')} {heightUnit === 'cm' ? `${heightCm} cm` : `${heightFt}′${heightIn}″`} ({(results.heightM * 100).toFixed(0)} cm / {(results.heightM * 3.281).toFixed(1)} ft).
              </p>
            </div>

            {/* Disclaimer */}
            <div style={{
              marginTop: 0, padding: '12px 16px', borderRadius: 10,
              background: '#FEF3C7', border: '1px solid #FDE68A', fontSize: 12, color: '#92400E', lineHeight: 1.6,
            }}>
              {lt('disclaimer')}
            </div>
          </section>
        )}

        {/* SEO */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{lt('seoH2')}</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            {lt('seoP1')}
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>{lt('seoH3')}</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            {lt('seoP2')}
          </p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 16 }} dangerouslySetInnerHTML={{ __html: lt('seoP3') }} />
        </section>
      </div>
    </ToolShell>
  )
}
