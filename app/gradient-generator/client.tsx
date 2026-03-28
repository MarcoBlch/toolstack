'use client'
import { useState, useCallback } from 'react'
import ToolShell from '@/components/ToolShell'
import { t, type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

const PRESETS = [
  { name: 'Sunset', c1: '#FF6B35', c2: '#E8457A', angle: 135 },
  { name: 'Ocean', c1: '#0EA5E9', c2: '#6366F1', angle: 135 },
  { name: 'Forest', c1: '#22C55E', c2: '#0D9488', angle: 135 },
  { name: 'Midnight', c1: '#1E1B4B', c2: '#312E81', angle: 180 },
  { name: 'Peach', c1: '#FB923C', c2: '#FBBF24', angle: 90 },
  { name: 'Lavender', c1: '#A78BFA', c2: '#EC4899', angle: 135 },
  { name: 'Mint', c1: '#34D399', c2: '#60A5FA', angle: 120 },
  { name: 'Fire', c1: '#EF4444', c2: '#F97316', angle: 90 },
  { name: 'Night', c1: '#0F172A', c2: '#1E3A5F', angle: 180 },
  { name: 'Candy', c1: '#F472B6', c2: '#818CF8', angle: 135 },
  { name: 'Lime', c1: '#84CC16', c2: '#22D3EE', angle: 135 },
  { name: 'Warm', c1: '#F59E0B', c2: '#EF4444', angle: 135 },
]

const LABELS: Record<string, Record<Locale, string>> = {
  // Title
  titleGradient: { en: 'CSS gradient', fr: 'Générateur de', es: 'Generador de', pt: 'Gerador de', de: 'CSS-Gradient-' },
  titleGenerator: { en: 'generator', fr: 'dégradés CSS', es: 'gradientes CSS', pt: 'gradientes CSS', de: 'Generator' },
  subtitle: {
    en: 'Pick colors. Copy CSS. Done.',
    fr: 'Choisissez les couleurs. Copiez le CSS. Terminé.',
    es: 'Elige colores. Copia el CSS. Listo.',
    pt: 'Escolha cores. Copie o CSS. Pronto.',
    de: 'Farben wählen. CSS kopieren. Fertig.',
  },

  // Controls
  type: { en: 'Type', fr: 'Type', es: 'Tipo', pt: 'Tipo', de: 'Typ' },
  linear: { en: 'linear', fr: 'linéaire', es: 'lineal', pt: 'linear', de: 'linear' },
  radial: { en: 'radial', fr: 'radial', es: 'radial', pt: 'radial', de: 'radial' },
  colors: { en: 'Colors', fr: 'Couleurs', es: 'Colores', pt: 'Cores', de: 'Farben' },
  color1: { en: 'Color 1', fr: 'Couleur 1', es: 'Color 1', pt: 'Cor 1', de: 'Farbe 1' },
  color2: { en: 'Color 2', fr: 'Couleur 2', es: 'Color 2', pt: 'Cor 2', de: 'Farbe 2' },
  swapColors: { en: 'Swap colors', fr: 'Inverser les couleurs', es: 'Intercambiar colores', pt: 'Trocar cores', de: 'Farben tauschen' },
  angle: { en: 'Angle', fr: 'Angle', es: 'Ángulo', pt: 'Ângulo', de: 'Winkel' },
  presets: { en: 'Presets', fr: 'Préréglages', es: 'Preajustes', pt: 'Predefinições', de: 'Vorlagen' },
  randomize: { en: 'Randomize', fr: 'Aléatoire', es: 'Aleatorio', pt: 'Aleatório', de: 'Zufällig' },
  copyCSS: { en: 'Copy CSS', fr: 'Copier le CSS', es: 'Copiar CSS', pt: 'Copiar CSS', de: 'CSS kopieren' },

  // SEO
  seoH2: {
    en: 'Free CSS gradient generator',
    fr: 'Générateur de dégradés CSS gratuit',
    es: 'Generador de gradientes CSS gratis',
    pt: 'Gerador de gradientes CSS grátis',
    de: 'Kostenloser CSS-Gradient-Generator',
  },
  seoP1: {
    en: 'GradientLab helps you create beautiful CSS gradients without writing code by hand. Choose two colors, set the direction, and instantly preview the result. The tool supports both linear and radial gradient types, letting you switch between them with a single click. Once you are happy with the look, copy the production-ready CSS and paste it straight into your stylesheet or Tailwind config. Everything runs locally in your browser, so your work stays private.',
    fr: 'GradientLab vous aide à créer de beaux dégradés CSS sans écrire de code à la main. Choisissez deux couleurs, définissez la direction et prévisualisez instantanément le résultat. L\'outil prend en charge les types de dégradés linéaires et radiaux, vous permettant de passer de l\'un à l\'autre en un seul clic. Une fois satisfait du rendu, copiez le CSS prêt pour la production et collez-le directement dans votre feuille de style ou votre config Tailwind. Tout fonctionne localement dans votre navigateur, votre travail reste donc privé.',
    es: 'GradientLab te ayuda a crear hermosos gradientes CSS sin escribir código a mano. Elige dos colores, establece la dirección y previsualiza instantáneamente el resultado. La herramienta soporta tanto gradientes lineales como radiales, permitiéndote cambiar entre ellos con un solo clic. Una vez que estés satisfecho con el aspecto, copia el CSS listo para producción y pégalo directamente en tu hoja de estilos o configuración de Tailwind. Todo funciona localmente en tu navegador, así que tu trabajo permanece privado.',
    pt: 'O GradientLab ajuda você a criar belos gradientes CSS sem escrever código manualmente. Escolha duas cores, defina a direção e visualize instantaneamente o resultado. A ferramenta suporta tanto gradientes lineares quanto radiais, permitindo alternar entre eles com um único clique. Quando estiver satisfeito com o visual, copie o CSS pronto para produção e cole diretamente na sua folha de estilos ou configuração do Tailwind. Tudo funciona localmente no seu navegador, então seu trabalho permanece privado.',
    de: 'GradientLab hilft dir, schöne CSS-Verläufe zu erstellen, ohne Code von Hand zu schreiben. Wähle zwei Farben, lege die Richtung fest und sieh dir sofort das Ergebnis an. Das Tool unterstützt sowohl lineare als auch radiale Verlaufstypen und lässt dich mit einem Klick zwischen ihnen wechseln. Wenn du mit dem Aussehen zufrieden bist, kopiere das produktionsreife CSS und füge es direkt in dein Stylesheet oder deine Tailwind-Konfiguration ein. Alles läuft lokal in deinem Browser, sodass deine Arbeit privat bleibt.',
  },
  seoH3a: {
    en: 'Linear and radial gradients explained',
    fr: 'Dégradés linéaires et radiaux expliqués',
    es: 'Gradientes lineales y radiales explicados',
    pt: 'Gradientes lineares e radiais explicados',
    de: 'Lineare und radiale Verläufe erklärt',
  },
  seoP2: {
    en: 'A linear gradient transitions between colors along a straight line at a specific angle, making it ideal for backgrounds, hero sections, and banners. A radial gradient radiates outward from a center point, which works well for spotlight effects and circular UI elements. GradientLab lets you control the angle for linear gradients and preview the radial option in real time, so you can compare both styles before committing to one.',
    fr: 'Un dégradé linéaire effectue la transition entre les couleurs le long d\'une ligne droite à un angle spécifique, idéal pour les arrière-plans, les sections principales et les bannières. Un dégradé radial rayonne vers l\'extérieur depuis un point central, parfait pour les effets de projecteur et les éléments d\'interface circulaires. GradientLab vous permet de contrôler l\'angle des dégradés linéaires et de prévisualiser l\'option radiale en temps réel, afin de comparer les deux styles avant de vous décider.',
    es: 'Un gradiente lineal hace la transición entre colores a lo largo de una línea recta en un ángulo específico, ideal para fondos, secciones hero y banners. Un gradiente radial irradia hacia afuera desde un punto central, lo que funciona bien para efectos de foco y elementos de interfaz circulares. GradientLab te permite controlar el ángulo de los gradientes lineales y previsualizar la opción radial en tiempo real, para que puedas comparar ambos estilos antes de decidirte por uno.',
    pt: 'Um gradiente linear faz a transição entre cores ao longo de uma linha reta em um ângulo específico, ideal para fundos, seções hero e banners. Um gradiente radial irradia para fora a partir de um ponto central, funcionando bem para efeitos de destaque e elementos de interface circulares. O GradientLab permite controlar o ângulo dos gradientes lineares e visualizar a opção radial em tempo real, para que você possa comparar ambos os estilos antes de se decidir.',
    de: 'Ein linearer Verlauf wechselt zwischen Farben entlang einer geraden Linie in einem bestimmten Winkel, ideal für Hintergründe, Hero-Bereiche und Banner. Ein radialer Verlauf strahlt von einem Mittelpunkt nach außen, was gut für Spotlight-Effekte und kreisförmige UI-Elemente funktioniert. GradientLab lässt dich den Winkel für lineare Verläufe steuern und die radiale Option in Echtzeit vorschauen, damit du beide Stile vergleichen kannst, bevor du dich entscheidest.',
  },
  seoH3b: {
    en: 'Presets, randomization, and copying CSS',
    fr: 'Préréglages, aléatoire et copie du CSS',
    es: 'Preajustes, aleatorización y copiado de CSS',
    pt: 'Predefinições, aleatorização e cópia de CSS',
    de: 'Vorlagen, Zufallsgenerierung und CSS kopieren',
  },
  seoP3: {
    en: 'Not sure where to start? Browse 12 handpicked gradient presets curated for modern web design, or hit the Randomize button to discover unexpected color combinations. Each preset is fully editable, so you can use it as a starting point and fine-tune the colors and angle. When you are ready, the one-click copy button places the complete CSS rule on your clipboard, including the fallback background-color for older browsers.',
    fr: 'Vous ne savez pas par où commencer ? Parcourez 12 préréglages de dégradés sélectionnés pour le design web moderne, ou appuyez sur le bouton Aléatoire pour découvrir des combinaisons de couleurs inattendues. Chaque préréglage est entièrement modifiable, vous pouvez l\'utiliser comme point de départ et affiner les couleurs et l\'angle. Quand vous êtes prêt, le bouton de copie en un clic place la règle CSS complète dans votre presse-papiers, y compris la couleur d\'arrière-plan de secours pour les anciens navigateurs.',
    es: '¿No sabes por dónde empezar? Explora 12 preajustes de gradientes seleccionados para el diseño web moderno, o presiona el botón Aleatorio para descubrir combinaciones de colores inesperadas. Cada preajuste es completamente editable, así que puedes usarlo como punto de partida y ajustar los colores y el ángulo. Cuando estés listo, el botón de copia con un clic coloca la regla CSS completa en tu portapapeles, incluyendo el color de fondo de respaldo para navegadores antiguos.',
    pt: 'Não sabe por onde começar? Navegue por 12 predefinições de gradientes selecionadas para design web moderno, ou pressione o botão Aleatório para descobrir combinações de cores inesperadas. Cada predefinição é totalmente editável, então você pode usá-la como ponto de partida e ajustar as cores e o ângulo. Quando estiver pronto, o botão de cópia com um clique coloca a regra CSS completa na sua área de transferência, incluindo a cor de fundo de fallback para navegadores mais antigos.',
    de: 'Nicht sicher, wo du anfangen sollst? Durchstöbere 12 handverlesene Gradient-Vorlagen für modernes Webdesign oder drücke den Zufällig-Button, um unerwartete Farbkombinationen zu entdecken. Jede Vorlage ist vollständig bearbeitbar, sodass du sie als Ausgangspunkt nutzen und die Farben und den Winkel feinabstimmen kannst. Wenn du bereit bist, kopiert der Ein-Klick-Button die vollständige CSS-Regel in deine Zwischenablage, einschließlich der Fallback-Hintergrundfarbe für ältere Browser.',
  },
  seoP4: {
    en: 'Need to pick exact colors first? Try the <a>Color Picker</a> to find the perfect HEX or RGB values. Once your design is final, wrap your screenshots with the <b>Screenshot Mockup</b> tool to present your gradient in a polished browser frame for portfolios and social media.',
    fr: 'Besoin de choisir des couleurs exactes d\'abord ? Essayez le <a>Sélecteur de couleurs</a> pour trouver les valeurs HEX ou RGB parfaites. Une fois votre design finalisé, encadrez vos captures d\'écran avec l\'outil <b>Screenshot Mockup</b> pour présenter votre dégradé dans un cadre de navigateur élégant pour les portfolios et les réseaux sociaux.',
    es: '¿Necesitas elegir colores exactos primero? Prueba el <a>Selector de colores</a> para encontrar los valores HEX o RGB perfectos. Una vez que tu diseño esté finalizado, enmarca tus capturas de pantalla con la herramienta <b>Screenshot Mockup</b> para presentar tu gradiente en un marco de navegador pulido para portfolios y redes sociales.',
    pt: 'Precisa escolher cores exatas primeiro? Experimente o <a>Seletor de cores</a> para encontrar os valores HEX ou RGB perfeitos. Quando seu design estiver finalizado, emoldure suas capturas de tela com a ferramenta <b>Screenshot Mockup</b> para apresentar seu gradiente em uma moldura de navegador polida para portfólios e redes sociais.',
    de: 'Musst du zuerst genaue Farben auswählen? Probiere den <a>Farbwähler</a>, um die perfekten HEX- oder RGB-Werte zu finden. Wenn dein Design fertig ist, rahme deine Screenshots mit dem <b>Screenshot Mockup</b>-Tool ein, um deinen Verlauf in einem eleganten Browser-Rahmen für Portfolios und Social Media zu präsentieren.',
  },
}

export default function GradientClient({ locale = 'en' as Locale }: { locale?: Locale } = {}) {
  const [c1, setC1] = useState('#6366F1')
  const [c2, setC2] = useState('#EC4899')
  const [angle, setAngle] = useState(135)
  const [type, setType] = useState<'linear' | 'radial'>('linear')
  const [copied, setCopied] = useState(false)

  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

  const gradient = type === 'linear'
    ? `linear-gradient(${angle}deg, ${c1}, ${c2})`
    : `radial-gradient(circle, ${c1}, ${c2})`

  const css = `background: ${gradient};`

  const copy = useCallback(() => {
    navigator.clipboard.writeText(css)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [css])

  const applyPreset = (p: typeof PRESETS[0]) => {
    setC1(p.c1); setC2(p.c2); setAngle(p.angle); setType('linear')
  }

  const randomize = () => {
    const hex = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
    setC1(hex()); setC2(hex()); setAngle(Math.floor(Math.random() * 360))
  }

  return (
    <ToolShell name="Gradient Generator" icon="◆" currentPath="/gradient-generator" locale={locale}>
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 860, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: 'linear-gradient(135deg, #6366F1, #EC4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>G</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>GradientLab</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>{t('backAllTools', locale)}</a>
        </nav>

        <section style={{ maxWidth: 860, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            {lt('titleGradient')} <span style={{ background: 'linear-gradient(135deg, #6366F1, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{lt('titleGenerator')}</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>{lt('subtitle')}</p>
        </section>

        <section style={{ maxWidth: 860, margin: '0 auto', padding: '0 28px 20px', display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20, alignItems: 'start' }}>
          {/* Preview */}
          <div>
            <div style={{
              width: '100%', aspectRatio: '16/9', borderRadius: 18,
              background: gradient, border: '1.5px solid #E8E4DB',
              marginBottom: 14, transition: 'background .3s',
            }} />

            {/* CSS Output */}
            <div style={{
              background: '#0E0E11', borderRadius: 14, padding: '18px 20px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: 14,
            }}>
              <code style={{ fontFamily: fm, fontSize: 13, color: '#E8E6F0', wordBreak: 'break-all', flex: 1, marginRight: 12 }}>
                {css}
              </code>
              <button onClick={copy} style={{
                fontFamily: fb, fontSize: 12, fontWeight: 700, padding: '8px 18px', borderRadius: 8,
                border: 'none', cursor: 'pointer', flexShrink: 0,
                background: copied ? '#22A065' : '#6366F1', color: '#fff',
              }}>{copied ? t('copied', locale) : lt('copyCSS')}</button>
            </div>

            {/* Presets */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 10 }}>{lt('presets')}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}>
                {PRESETS.map((p) => (
                  <button key={p.name} onClick={() => applyPreset(p)} title={p.name} style={{
                    aspectRatio: '1', borderRadius: 12, cursor: 'pointer',
                    background: `linear-gradient(${p.angle}deg, ${p.c1}, ${p.c2})`,
                    border: '2px solid transparent', transition: 'all .15s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 24, position: 'sticky', top: 20 }}>
            {/* Type */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 8 }}>{lt('type')}</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {(['linear', 'radial'] as const).map(tp => (
                  <button key={tp} onClick={() => setType(tp)} style={{
                    flex: 1, fontFamily: fb, fontSize: 13, fontWeight: 600, padding: '8px', borderRadius: 8, cursor: 'pointer',
                    border: type === tp ? '1.5px solid #6366F1' : '1.5px solid #E8E4DB',
                    background: type === tp ? '#6366F108' : 'transparent',
                    color: type === tp ? '#6366F1' : '#6B6560',
                  }}>{lt(tp)}</button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 8 }}>{lt('colors')}</div>
              {[{ label: lt('color1'), val: c1, set: setC1 }, { label: lt('color2'), val: c2, set: setC2 }].map((c) => (
                <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <input type="color" value={c.val} onChange={e => c.set(e.target.value)}
                    style={{ width: 44, height: 44, border: 'none', borderRadius: 10, cursor: 'pointer', padding: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, color: '#9A958A', marginBottom: 2 }}>{c.label}</div>
                    <input type="text" value={c.val} onChange={e => c.set(e.target.value)}
                      style={{
                        width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8,
                        padding: '6px 10px', fontFamily: fm, fontSize: 13, color: '#1C1B18',
                        background: '#F5F3EE', outline: 'none', textTransform: 'uppercase',
                      }} />
                  </div>
                </div>
              ))}
              <button onClick={() => { const tmp = c1; setC1(c2); setC2(tmp) }} style={{
                fontFamily: fb, fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 7,
                border: '1.5px solid #E8E4DB', background: 'transparent', color: '#6B6560',
                cursor: 'pointer', width: '100%', marginTop: 4,
              }}>⇅ {lt('swapColors')}</button>
            </div>

            {/* Angle */}
            {type === 'linear' && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px' }}>{lt('angle')}</span>
                  <span style={{ fontFamily: fm, fontSize: 14, fontWeight: 700, color: '#6366F1' }}>{angle}°</span>
                </div>
                <input type="range" min="0" max="360" value={angle} onChange={e => setAngle(+e.target.value)}
                  style={{ width: '100%', accentColor: '#6366F1' }} />
                <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
                  {[0, 45, 90, 135, 180, 270].map(a => (
                    <button key={a} onClick={() => setAngle(a)} style={{
                      flex: 1, fontFamily: fm, fontSize: 11, padding: '5px', borderRadius: 6,
                      border: angle === a ? '1px solid #6366F1' : '1px solid #E8E4DB',
                      background: angle === a ? '#6366F108' : 'transparent',
                      color: angle === a ? '#6366F1' : '#9A958A', cursor: 'pointer',
                    }}>{a}°</button>
                  ))}
                </div>
              </div>
            )}

            {/* Random */}
            <button onClick={randomize} style={{
              fontFamily: fb, fontSize: 14, fontWeight: 700, padding: '12px', borderRadius: 10,
              border: 'none', background: '#1C1B18', color: '#fff', cursor: 'pointer', width: '100%',
            }}>{lt('randomize')}</button>
          </div>
        </section>

        {/* SEO */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{lt('seoH2')}</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            {lt('seoP1')}
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>{lt('seoH3a')}</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            {lt('seoP2')}
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>{lt('seoH3b')}</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            {lt('seoP3')}
          </p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 16 }}>
            {(() => {
              const parts = lt('seoP4').split(/<\/?[ab]>/)
              return <>
                {parts[0]}<a href="/color-picker" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{parts[1]}</a>{parts[2]}<a href="/screenshot-mockup" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{parts[3]}</a>{parts[4]}
              </>
            })()}
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
