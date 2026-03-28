'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'
import { t, LOCALE_CODES, type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

const accent = '#EA580C'

const labelStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase',
  letterSpacing: '.8px', display: 'block', marginBottom: 4,
}

const inputStyle: React.CSSProperties = {
  width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8,
  padding: '10px 12px', fontSize: 14, fontFamily: fb, color: '#1C1B18',
  background: '#F5F3EE', outline: 'none',
}

const tipPresets = [10, 15, 18, 20, 25]
const comparisonRates = [10, 15, 18, 20, 25]

/* ------------------------------------------------------------------ */
/*  LABELS — tool-specific translations (common keys use t())         */
/* ------------------------------------------------------------------ */
const LABELS: Record<string, Record<Locale, string>> = {
  navTitle: { en: 'Tip Calculator', fr: 'Calculateur de pourboire', es: 'Calculadora de propinas', pt: 'Calculadora de gorjeta', de: 'Trinkgeldrechner' },
  titleA: { en: 'Tip', fr: 'Calculateur de', es: 'Calculadora de', pt: 'Calculadora de', de: 'Trinkgeld' },
  titleB: { en: 'calculator', fr: 'pourboire', es: 'propinas', pt: 'gorjeta', de: 'rechner' },
  subtitle: {
    en: 'Calculate tip and split the bill instantly.',
    fr: 'Calculez le pourboire et partagez l\'addition instantanément.',
    es: 'Calcula la propina y divide la cuenta al instante.',
    pt: 'Calcule a gorjeta e divida a conta instantaneamente.',
    de: 'Berechnen Sie das Trinkgeld und teilen Sie die Rechnung sofort.',
  },

  billAmount: { en: 'Bill Amount ($)', fr: 'Montant de l\'addition ($)', es: 'Monto de la cuenta ($)', pt: 'Valor da conta ($)', de: 'Rechnungsbetrag ($)' },
  tipPercentage: { en: 'Tip Percentage', fr: 'Pourcentage du pourboire', es: 'Porcentaje de propina', pt: 'Porcentagem de gorjeta', de: 'Trinkgeld-Prozentsatz' },
  numberOfPeople: { en: 'Number of People', fr: 'Nombre de personnes', es: 'Número de personas', pt: 'Número de pessoas', de: 'Anzahl der Personen' },
  roundUpTotal: { en: 'Round Up Total', fr: 'Arrondir au supérieur', es: 'Redondear al alza', pt: 'Arredondar para cima', de: 'Aufrunden' },
  on: { en: 'ON', fr: 'OUI', es: 'SÍ', pt: 'SIM', de: 'AN' },
  off: { en: 'OFF', fr: 'NON', es: 'NO', pt: 'NÃO', de: 'AUS' },

  totalWithTip: { en: 'Total with Tip', fr: 'Total avec pourboire', es: 'Total con propina', pt: 'Total com gorjeta', de: 'Gesamtbetrag mit Trinkgeld' },
  tipAmount: { en: 'Tip Amount', fr: 'Montant du pourboire', es: 'Monto de propina', pt: 'Valor da gorjeta', de: 'Trinkgeldbetrag' },
  perPerson: { en: 'Per Person', fr: 'Par personne', es: 'Por persona', pt: 'Por pessoa', de: 'Pro Person' },
  billAmountLabel: { en: 'Bill Amount', fr: 'Montant de l\'addition', es: 'Monto de la cuenta', pt: 'Valor da conta', de: 'Rechnungsbetrag' },

  quickComparison: { en: 'Quick Comparison', fr: 'Comparaison rapide', es: 'Comparación rápida', pt: 'Comparação rápida', de: 'Schnellvergleich' },
  comparisonDesc: {
    en: 'Tip amounts at different percentages for a ${bill} bill',
    fr: 'Montants du pourboire à différents pourcentages pour une addition de ${bill}',
    es: 'Montos de propina a diferentes porcentajes para una cuenta de ${bill}',
    pt: 'Valores de gorjeta em diferentes porcentagens para uma conta de ${bill}',
    de: 'Trinkgeldbeträge bei verschiedenen Prozentsätzen für eine Rechnung von ${bill}',
  },
  tipPct: { en: 'Tip %', fr: '% Pourboire', es: '% Propina', pt: '% Gorjeta', de: 'Trinkgeld %' },
  tip: { en: 'Tip', fr: 'Pourboire', es: 'Propina', pt: 'Gorjeta', de: 'Trinkgeld' },
  selected: { en: 'selected', fr: 'sélectionné', es: 'seleccionado', pt: 'selecionado', de: 'ausgewählt' },

  // SEO
  seoH2: {
    en: 'Free tip calculator',
    fr: 'Calculateur de pourboire gratuit',
    es: 'Calculadora de propinas gratuita',
    pt: 'Calculadora de gorjeta gratuita',
    de: 'Kostenloser Trinkgeldrechner',
  },
  seoP1: {
    en: 'Our tip calculator takes the guesswork out of tipping at restaurants, bars, cafes, and for delivery or personal services. Enter your bill amount, select a tip percentage using the slider or quick presets, and see the tip amount and total instantly. If you are dining with friends, set the number of people to split the bill evenly so everyone knows exactly what they owe.',
    fr: 'Notre calculateur de pourboire élimine les devinettes lors du calcul du pourboire dans les restaurants, bars, cafés et pour les livraisons ou services personnels. Entrez le montant de l\'addition, sélectionnez un pourcentage de pourboire à l\'aide du curseur ou des préréglages rapides, et consultez le montant du pourboire et le total instantanément. Si vous dînez entre amis, définissez le nombre de personnes pour partager l\'addition équitablement afin que chacun sache exactement ce qu\'il doit.',
    es: 'Nuestra calculadora de propinas elimina las conjeturas al dejar propina en restaurantes, bares, cafeterías y para servicios de entrega o personales. Ingrese el monto de la cuenta, seleccione un porcentaje de propina usando el control deslizante o los preajustes rápidos, y vea el monto de la propina y el total al instante. Si está cenando con amigos, establezca el número de personas para dividir la cuenta equitativamente y que todos sepan exactamente cuánto deben.',
    pt: 'Nossa calculadora de gorjeta elimina as suposições ao calcular gorjetas em restaurantes, bares, cafés e para entregas ou serviços pessoais. Insira o valor da conta, selecione uma porcentagem de gorjeta usando o controle deslizante ou as predefinições rápidas, e veja o valor da gorjeta e o total instantaneamente. Se estiver jantando com amigos, defina o número de pessoas para dividir a conta igualmente para que todos saibam exatamente quanto devem.',
    de: 'Unser Trinkgeldrechner nimmt das Rätselraten beim Trinkgeldgeben in Restaurants, Bars, Cafés und bei Liefer- oder persönlichen Dienstleistungen ab. Geben Sie den Rechnungsbetrag ein, wählen Sie einen Trinkgeldprozentsatz mit dem Schieberegler oder den Schnellvoreinstellungen und sehen Sie den Trinkgeldbetrag und die Gesamtsumme sofort. Wenn Sie mit Freunden essen, legen Sie die Anzahl der Personen fest, um die Rechnung gleichmäßig aufzuteilen, damit jeder genau weiß, was er schuldet.',
  },
  seoH3a: {
    en: 'Tipping customs and quick comparison',
    fr: 'Coutumes de pourboire et comparaison rapide',
    es: 'Costumbres de propina y comparación rápida',
    pt: 'Costumes de gorjeta e comparação rápida',
    de: 'Trinkgeldgewohnheiten und Schnellvergleich',
  },
  seoP2: {
    en: 'Tipping norms vary widely. In the United States, 18 to 20 percent is standard for table service, while 10 to 15 percent is common in many European countries. The comparison table shows your bill at five common tip percentages side by side, making it easy to pick the right amount without mental math. You can click any row to select that rate.',
    fr: 'Les normes de pourboire varient considérablement. Aux États-Unis, 18 à 20 pour cent est la norme pour le service à table, tandis que 10 à 15 pour cent est courant dans de nombreux pays européens. Le tableau de comparaison affiche votre addition à cinq pourcentages de pourboire courants côte à côte, ce qui facilite le choix du bon montant sans calcul mental. Vous pouvez cliquer sur n\'importe quelle ligne pour sélectionner ce taux.',
    es: 'Las normas de propina varían ampliamente. En Estados Unidos, del 18 al 20 por ciento es estándar para el servicio de mesa, mientras que del 10 al 15 por ciento es común en muchos países europeos. La tabla de comparación muestra su cuenta con cinco porcentajes de propina comunes uno al lado del otro, facilitando elegir la cantidad correcta sin cálculo mental. Puede hacer clic en cualquier fila para seleccionar esa tasa.',
    pt: 'As normas de gorjeta variam amplamente. Nos Estados Unidos, 18 a 20 por cento é padrão para serviço de mesa, enquanto 10 a 15 por cento é comum em muitos países europeus. A tabela de comparação mostra sua conta em cinco porcentagens de gorjeta comuns lado a lado, facilitando a escolha do valor correto sem cálculo mental. Você pode clicar em qualquer linha para selecionar essa taxa.',
    de: 'Trinkgeldnormen variieren stark. In den Vereinigten Staaten sind 18 bis 20 Prozent bei Tischbedienung üblich, während in vielen europäischen Ländern 10 bis 15 Prozent gängig sind. Die Vergleichstabelle zeigt Ihre Rechnung bei fünf gängigen Trinkgeldprozentsätzen nebeneinander, sodass Sie den richtigen Betrag leicht ohne Kopfrechnen wählen können. Sie können auf eine beliebige Zeile klicken, um diesen Satz auszuwählen.',
  },
  seoH3b: {
    en: 'Splitting bills and rounding up',
    fr: 'Partager l\'addition et arrondir',
    es: 'Dividir cuentas y redondear',
    pt: 'Dividir contas e arredondar',
    de: 'Rechnungen teilen und aufrunden',
  },
  seoP3: {
    en: 'The bill-splitting feature divides the total evenly among your group so nobody overpays or underpays. Enable the round-up option to bump the total to the next whole dollar, which simplifies cash payments and often results in a slightly more generous tip for your server. Both features work together seamlessly for any group size.',
    fr: 'La fonction de partage de l\'addition divise le total équitablement entre votre groupe afin que personne ne paie trop ou trop peu. Activez l\'option d\'arrondi pour augmenter le total au dollar entier suivant, ce qui simplifie les paiements en espèces et se traduit souvent par un pourboire légèrement plus généreux pour votre serveur. Les deux fonctions fonctionnent ensemble de manière transparente pour n\'importe quelle taille de groupe.',
    es: 'La función de división de cuenta divide el total equitativamente entre su grupo para que nadie pague de más ni de menos. Active la opción de redondeo para aumentar el total al siguiente dólar entero, lo que simplifica los pagos en efectivo y a menudo resulta en una propina ligeramente más generosa para su camarero. Ambas funciones funcionan juntas sin problemas para cualquier tamaño de grupo.',
    pt: 'A função de divisão da conta divide o total igualmente entre seu grupo para que ninguém pague a mais ou a menos. Ative a opção de arredondamento para aumentar o total para o próximo dólar inteiro, o que simplifica os pagamentos em dinheiro e frequentemente resulta em uma gorjeta um pouco mais generosa para seu garçom. Ambas as funções funcionam juntas perfeitamente para qualquer tamanho de grupo.',
    de: 'Die Rechnungsteilungsfunktion teilt den Gesamtbetrag gleichmäßig unter Ihrer Gruppe auf, sodass niemand zu viel oder zu wenig bezahlt. Aktivieren Sie die Aufrundungsoption, um den Gesamtbetrag auf den nächsten vollen Dollar aufzurunden, was Barzahlungen vereinfacht und oft zu einem etwas großzügigeren Trinkgeld für Ihre Bedienung führt. Beide Funktionen arbeiten nahtlos zusammen für jede Gruppengröße.',
  },
  seoP4: {
    en: 'Want to understand the math behind percentages? Visit our <a>percentage calculator</a>. Traveling abroad and need to convert currencies? The <a2>currency converter</a2> has you covered.',
    fr: 'Vous voulez comprendre les mathématiques derrière les pourcentages ? Visitez notre <a>calculateur de pourcentage</a>. Vous voyagez à l\'étranger et devez convertir des devises ? Le <a2>convertisseur de devises</a2> est là pour vous.',
    es: '¿Quiere entender las matemáticas detrás de los porcentajes? Visite nuestra <a>calculadora de porcentajes</a>. ¿Viaja al extranjero y necesita convertir divisas? El <a2>convertidor de divisas</a2> le tiene cubierto.',
    pt: 'Quer entender a matemática por trás das porcentagens? Visite nossa <a>calculadora de porcentagem</a>. Viajando para o exterior e precisa converter moedas? O <a2>conversor de moedas</a2> tem o que você precisa.',
    de: 'Möchten Sie die Mathematik hinter Prozentsätzen verstehen? Besuchen Sie unseren <a>Prozentrechner</a>. Reisen Sie ins Ausland und müssen Währungen umrechnen? Der <a2>Währungsrechner</a2> hilft Ihnen weiter.',
  },
}

export default function TipClient({
  defaultBill,
  defaultTip,
  defaultPeople,
  locale = 'en' as Locale,
}: {
  defaultBill?: number
  defaultTip?: number
  defaultPeople?: number
  locale?: Locale
} = {}) {
  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

  const [bill, setBill] = useState(defaultBill ?? 50)
  const [tip, setTip] = useState(defaultTip ?? 15)
  const [people, setPeople] = useState(defaultPeople ?? 1)
  const [roundUp, setRoundUp] = useState(false)

  const fmt = (n: number): string => {
    return n.toLocaleString(LOCALE_CODES[locale], { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  const results = useMemo(() => {
    const tipAmount = bill * (tip / 100)
    let total = bill + tipAmount
    if (roundUp) total = Math.ceil(total)
    const actualTip = total - bill
    const perPerson = people > 0 ? total / people : total

    return { tipAmount: actualTip, total, perPerson }
  }, [bill, tip, people, roundUp])

  const comparison = useMemo(() => {
    return comparisonRates.map(rate => {
      const tipAmt = bill * (rate / 100)
      let total = bill + tipAmt
      const perP = people > 0 ? total / people : total
      return { rate, tipAmount: tipAmt, total, perPerson: perP }
    })
  }, [bill, people])

  return (
    <ToolShell name={lt('navTitle')} icon="🍽️" currentPath="/tip-calculator" locale={locale}>
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>🍽️</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>{lt('navTitle')}</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>{t('backAllTools', locale)}</a>
        </nav>

        {/* Header */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            {lt('titleA')} <span style={{ color: accent }}>{lt('titleB')}</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>{lt('subtitle')}</p>
        </section>

        {/* Inputs */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>{lt('billAmount')}</label>
                <input
                  type="number"
                  value={bill}
                  min={0}
                  step={0.01}
                  onChange={e => setBill(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>{lt('tipPercentage')}: {tip}%</label>
                <input
                  type="range"
                  min={0}
                  max={30}
                  value={tip}
                  onChange={e => setTip(Number(e.target.value))}
                  style={{
                    width: '100%',
                    height: 6,
                    borderRadius: 3,
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    background: `linear-gradient(to right, ${accent} ${(tip / 30) * 100}%, #E8E4DB ${(tip / 30) * 100}%)`,
                    outline: 'none',
                    cursor: 'pointer',
                    marginBottom: 12,
                  }}
                />
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {tipPresets.map(p => (
                    <button
                      key={p}
                      onClick={() => setTip(p)}
                      style={{
                        padding: '6px 14px',
                        fontSize: 13,
                        fontWeight: 600,
                        fontFamily: fb,
                        border: tip === p ? `2px solid ${accent}` : '1.5px solid #E8E4DB',
                        borderRadius: 8,
                        background: tip === p ? accent + '12' : '#F5F3EE',
                        color: tip === p ? accent : '#6B6560',
                        cursor: 'pointer',
                        transition: 'all .15s',
                      }}
                    >
                      {p}%
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={labelStyle}>{lt('numberOfPeople')}</label>
                <input
                  type="number"
                  value={people}
                  min={1}
                  onChange={e => setPeople(Math.max(1, Number(e.target.value)))}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>{lt('roundUpTotal')}</label>
                <button
                  onClick={() => setRoundUp(!roundUp)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    fontSize: 14,
                    fontWeight: 600,
                    fontFamily: fb,
                    border: roundUp ? `2px solid ${accent}` : '1.5px solid #E8E4DB',
                    borderRadius: 8,
                    background: roundUp ? accent + '12' : '#F5F3EE',
                    color: roundUp ? accent : '#6B6560',
                    cursor: 'pointer',
                    transition: 'all .15s',
                  }}
                >
                  {roundUp ? lt('on') : lt('off')}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: people > 1 ? '1fr 1fr 1fr' : '1fr 1fr', gap: 16 }}>
            <div style={{
              background: accent + '0A',
              border: `1.5px solid ${accent}25`,
              borderRadius: 16,
              padding: 22,
              textAlign: 'center',
              gridColumn: '1 / -1',
            }}>
              <div style={labelStyle}>{lt('totalWithTip')}</div>
              <div style={{ fontSize: 42, fontFamily: fm, fontWeight: 700, color: accent }}>
                ${fmt(results.total)}
              </div>
            </div>

            <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
              <div style={labelStyle}>{lt('tipAmount')}</div>
              <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                ${fmt(results.tipAmount)}
              </div>
            </div>

            {people > 1 && (
              <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
                <div style={labelStyle}>{lt('perPerson')}</div>
                <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: accent }}>
                  ${fmt(results.perPerson)}
                </div>
              </div>
            )}

            <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
              <div style={labelStyle}>{lt('billAmountLabel')}</div>
              <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                ${fmt(bill)}
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 40px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{lt('quickComparison')}</h2>
            <p style={{ fontSize: 12, color: '#9A958A', marginBottom: 20 }}>
              {lt('comparisonDesc').replace('${bill}', fmt(bill))}
            </p>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: fb }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '1.5px solid #E8E4DB', ...labelStyle, marginBottom: 0 }}>{lt('tipPct')}</th>
                  <th style={{ textAlign: 'right', padding: '8px 12px', borderBottom: '1.5px solid #E8E4DB', ...labelStyle, marginBottom: 0 }}>{lt('tip')}</th>
                  <th style={{ textAlign: 'right', padding: '8px 12px', borderBottom: '1.5px solid #E8E4DB', ...labelStyle, marginBottom: 0 }}>{t('total', locale)}</th>
                  {people > 1 && (
                    <th style={{ textAlign: 'right', padding: '8px 12px', borderBottom: '1.5px solid #E8E4DB', ...labelStyle, marginBottom: 0 }}>{lt('perPerson')}</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {comparison.map(row => {
                  const isActive = row.rate === tip
                  return (
                    <tr
                      key={row.rate}
                      onClick={() => setTip(row.rate)}
                      style={{
                        cursor: 'pointer',
                        background: isActive ? accent + '0A' : 'transparent',
                        transition: 'background .15s',
                      }}
                    >
                      <td style={{
                        padding: '10px 12px',
                        borderBottom: '1px solid #F0EDE6',
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? accent : '#1C1B18',
                      }}>
                        {row.rate}%
                        {isActive && <span style={{ marginLeft: 6, fontSize: 10, color: accent }}>{lt('selected')}</span>}
                      </td>
                      <td style={{
                        textAlign: 'right', padding: '10px 12px',
                        borderBottom: '1px solid #F0EDE6', fontFamily: fm,
                        fontWeight: isActive ? 700 : 400,
                        color: isActive ? accent : '#1C1B18',
                      }}>
                        ${fmt(row.tipAmount)}
                      </td>
                      <td style={{
                        textAlign: 'right', padding: '10px 12px',
                        borderBottom: '1px solid #F0EDE6', fontFamily: fm,
                        fontWeight: isActive ? 700 : 400,
                        color: isActive ? accent : '#1C1B18',
                      }}>
                        ${fmt(row.total)}
                      </td>
                      {people > 1 && (
                        <td style={{
                          textAlign: 'right', padding: '10px 12px',
                          borderBottom: '1px solid #F0EDE6', fontFamily: fm,
                          fontWeight: isActive ? 700 : 400,
                          color: isActive ? accent : '#1C1B18',
                        }}>
                          ${fmt(row.perPerson)}
                        </td>
                      )}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* SEO */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{lt('seoH2')}</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>{lt('seoP1')}</p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>{lt('seoH3a')}</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>{lt('seoP2')}</p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>{lt('seoH3b')}</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>{lt('seoP3')}</p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 14 }}>
            {lt('seoP4').split(/<a>|<\/a>|<a2>|<\/a2>/).map((part, i) => {
              if (i === 1) return <a key={i} href="/percentage-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{part}</a>
              if (i === 3) return <a key={i} href="/currency-converter" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{part}</a>
              return <span key={i}>{part}</span>
            })}
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
