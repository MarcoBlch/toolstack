'use client'
import { useState, useMemo, useCallback } from 'react'
import ToolShell from '@/components/ToolShell'
import { t, type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  return [parseInt(h.substring(0, 2), 16), parseInt(h.substring(2, 4), 16), parseInt(h.substring(4, 6), 16)]
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, '0')).join('').toUpperCase()
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0, l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}

function generateShades(hex: string, count: number = 7): string[] {
  const [r, g, b] = hexToRgb(hex)
  return Array.from({ length: count }, (_, i) => {
    const factor = 1 - (i / (count - 1)) * 0.85
    return rgbToHex(Math.round(r * factor), Math.round(g * factor), Math.round(b * factor))
  })
}

function generateTints(hex: string, count: number = 7): string[] {
  const [r, g, b] = hexToRgb(hex)
  return Array.from({ length: count }, (_, i) => {
    const factor = i / (count - 1)
    return rgbToHex(Math.round(r + (255 - r) * factor), Math.round(g + (255 - g) * factor), Math.round(b + (255 - b) * factor))
  })
}

function complementary(hex: string): string {
  const [r, g, b] = hexToRgb(hex)
  return rgbToHex(255 - r, 255 - g, 255 - b)
}

function analogous(hex: string): [string, string] {
  const [r, g, b] = hexToRgb(hex)
  const [h, s, l] = rgbToHsl(r, g, b)
  const hslToHex = (h: number, s: number, l: number) => {
    const hh = ((h % 360) + 360) % 360
    const c = document.createElement('canvas').getContext('2d')!
    c.fillStyle = `hsl(${hh}, ${s}%, ${l}%)`
    return c.fillStyle
  }
  return [hslToHex(h - 30, s, l), hslToHex(h + 30, s, l)]
}

const LABELS: Record<string, Record<Locale, string>> = {
  // Title
  titleColor: { en: 'Color', fr: 'Sélecteur de', es: 'Selector de', pt: 'Seletor de', de: 'Farb' },
  titlePicker: { en: 'picker', fr: 'couleurs', es: 'colores', pt: 'cores', de: 'wähler' },
  subtitle: {
    en: 'Pick a color. Get every format. Generate palettes.',
    fr: 'Choisissez une couleur. Obtenez chaque format. Générez des palettes.',
    es: 'Elige un color. Obtén cada formato. Genera paletas.',
    pt: 'Escolha uma cor. Obtenha todos os formatos. Gere paletas.',
    de: 'Farbe wählen. Jedes Format erhalten. Paletten generieren.',
  },

  // Palette labels
  shades: { en: 'Shades (darker)', fr: 'Nuances (plus foncé)', es: 'Sombras (más oscuro)', pt: 'Tons (mais escuro)', de: 'Schattierungen (dunkler)' },
  tints: { en: 'Tints (lighter)', fr: 'Teintes (plus clair)', es: 'Tintes (más claro)', pt: 'Matizes (mais claro)', de: 'Tönungen (heller)' },
  complementary: { en: 'Complementary', fr: 'Complémentaire', es: 'Complementario', pt: 'Complementar', de: 'Komplementär' },

  // Values
  colorValues: { en: 'Color values', fr: 'Valeurs de couleur', es: 'Valores de color', pt: 'Valores de cor', de: 'Farbwerte' },
  clickToCopy: { en: '(click to copy)', fr: '(cliquez pour copier)', es: '(clic para copiar)', pt: '(clique para copiar)', de: '(klicken zum Kopieren)' },
  details: { en: 'Details', fr: 'Détails', es: 'Detalles', pt: 'Detalhes', de: 'Details' },
  red: { en: 'Red:', fr: 'Rouge :', es: 'Rojo:', pt: 'Vermelho:', de: 'Rot:' },
  green: { en: 'Green:', fr: 'Vert :', es: 'Verde:', pt: 'Verde:', de: 'Grün:' },
  blue: { en: 'Blue:', fr: 'Bleu :', es: 'Azul:', pt: 'Azul:', de: 'Blau:' },
  hue: { en: 'Hue:', fr: 'Teinte :', es: 'Tono:', pt: 'Matiz:', de: 'Farbton:' },
  sat: { en: 'Sat:', fr: 'Sat. :', es: 'Sat.:', pt: 'Sat.:', de: 'Sätt.:' },
  light: { en: 'Light:', fr: 'Lum. :', es: 'Luz:', pt: 'Luz:', de: 'Hell.:' },

  // SEO
  seoH2: {
    en: 'Free color picker & converter',
    fr: 'Sélecteur et convertisseur de couleurs gratuit',
    es: 'Selector y convertidor de colores gratis',
    pt: 'Seletor e conversor de cores grátis',
    de: 'Kostenloser Farbwähler & Konverter',
  },
  seoP1: {
    en: 'ColorPick is a free online color picker that lets you choose any color and instantly view its value in HEX, RGB, HSL, CSS, and Tailwind formats. Click any value to copy it to your clipboard. The tool also generates shades, tints, and complementary colors so you can build a complete palette without switching between apps. Everything runs in your browser, meaning your selections are never sent to a server.',
    fr: 'ColorPick est un sélecteur de couleurs en ligne gratuit qui vous permet de choisir n\'importe quelle couleur et de visualiser instantanément sa valeur en formats HEX, RGB, HSL, CSS et Tailwind. Cliquez sur n\'importe quelle valeur pour la copier dans votre presse-papiers. L\'outil génère également des nuances, des teintes et des couleurs complémentaires pour construire une palette complète sans changer d\'application. Tout fonctionne dans votre navigateur, vos sélections ne sont jamais envoyées à un serveur.',
    es: 'ColorPick es un selector de colores en línea gratuito que te permite elegir cualquier color y ver instantáneamente su valor en formatos HEX, RGB, HSL, CSS y Tailwind. Haz clic en cualquier valor para copiarlo al portapapeles. La herramienta también genera sombras, tintes y colores complementarios para que puedas construir una paleta completa sin cambiar de aplicación. Todo funciona en tu navegador, lo que significa que tus selecciones nunca se envían a un servidor.',
    pt: 'O ColorPick é um seletor de cores online gratuito que permite escolher qualquer cor e visualizar instantaneamente seu valor nos formatos HEX, RGB, HSL, CSS e Tailwind. Clique em qualquer valor para copiá-lo para a área de transferência. A ferramenta também gera tons, matizes e cores complementares para que você possa construir uma paleta completa sem alternar entre aplicativos. Tudo funciona no seu navegador, o que significa que suas seleções nunca são enviadas a um servidor.',
    de: 'ColorPick ist ein kostenloser Online-Farbwähler, mit dem du jede Farbe auswählen und ihren Wert sofort in HEX, RGB, HSL, CSS und Tailwind-Formaten anzeigen kannst. Klicke auf einen Wert, um ihn in die Zwischenablage zu kopieren. Das Tool generiert auch Schattierungen, Tönungen und Komplementärfarben, damit du eine vollständige Palette erstellen kannst, ohne zwischen Apps zu wechseln. Alles läuft in deinem Browser, deine Auswahlen werden nie an einen Server gesendet.',
  },
  seoH3a: {
    en: 'Understanding color formats',
    fr: 'Comprendre les formats de couleur',
    es: 'Entendiendo los formatos de color',
    pt: 'Entendendo os formatos de cor',
    de: 'Farbformate verstehen',
  },
  seoP2: {
    en: 'HEX codes are the most common format for web colors, using six characters to represent red, green, and blue channels. RGB breaks the same information into three decimal values, which is useful for JavaScript and CSS functions. HSL describes color by hue, saturation, and lightness, making it easier to create consistent palettes because you can adjust brightness without changing the base hue. ColorPick displays all three formats simultaneously so you always have the one you need.',
    fr: 'Les codes HEX sont le format le plus courant pour les couleurs web, utilisant six caractères pour représenter les canaux rouge, vert et bleu. RGB décompose la même information en trois valeurs décimales, utiles pour les fonctions JavaScript et CSS. HSL décrit la couleur par teinte, saturation et luminosité, facilitant la création de palettes cohérentes car vous pouvez ajuster la luminosité sans changer la teinte de base. ColorPick affiche les trois formats simultanément pour que vous ayez toujours celui dont vous avez besoin.',
    es: 'Los códigos HEX son el formato más común para colores web, usando seis caracteres para representar los canales rojo, verde y azul. RGB descompone la misma información en tres valores decimales, lo que es útil para funciones JavaScript y CSS. HSL describe el color por tono, saturación y luminosidad, facilitando la creación de paletas consistentes porque puedes ajustar el brillo sin cambiar el tono base. ColorPick muestra los tres formatos simultáneamente para que siempre tengas el que necesitas.',
    pt: 'Os códigos HEX são o formato mais comum para cores web, usando seis caracteres para representar os canais vermelho, verde e azul. RGB divide a mesma informação em três valores decimais, úteis para funções JavaScript e CSS. HSL descreve a cor por matiz, saturação e luminosidade, facilitando a criação de paletas consistentes porque você pode ajustar o brilho sem mudar o matiz base. O ColorPick exibe os três formatos simultaneamente para que você sempre tenha o que precisa.',
    de: 'HEX-Codes sind das gängigste Format für Webfarben und verwenden sechs Zeichen zur Darstellung der Rot-, Grün- und Blaukanäle. RGB teilt dieselbe Information in drei Dezimalwerte auf, was für JavaScript- und CSS-Funktionen nützlich ist. HSL beschreibt Farbe durch Farbton, Sättigung und Helligkeit, was das Erstellen konsistenter Paletten erleichtert, da du die Helligkeit anpassen kannst, ohne den Grundfarbton zu ändern. ColorPick zeigt alle drei Formate gleichzeitig an, damit du immer das richtige hast.',
  },
  seoH3b: {
    en: 'Shades, tints, and complementary colors',
    fr: 'Nuances, teintes et couleurs complémentaires',
    es: 'Sombras, tintes y colores complementarios',
    pt: 'Tons, matizes e cores complementares',
    de: 'Schattierungen, Tönungen und Komplementärfarben',
  },
  seoP3: {
    en: 'Shades are created by mixing a color with black, producing darker variations that work well for text, borders, and hover states. Tints mix the color with white, giving you lighter options ideal for backgrounds and subtle accents. Complementary colors sit on the opposite side of the color wheel and create strong visual contrast when paired together. ColorPick generates all of these automatically from your selected color.',
    fr: 'Les nuances sont créées en mélangeant une couleur avec du noir, produisant des variations plus foncées idéales pour le texte, les bordures et les états de survol. Les teintes mélangent la couleur avec du blanc, offrant des options plus claires idéales pour les arrière-plans et les accents subtils. Les couleurs complémentaires se trouvent du côté opposé du cercle chromatique et créent un contraste visuel fort lorsqu\'elles sont associées. ColorPick génère tout cela automatiquement à partir de votre couleur sélectionnée.',
    es: 'Las sombras se crean mezclando un color con negro, produciendo variaciones más oscuras que funcionan bien para texto, bordes y estados hover. Los tintes mezclan el color con blanco, dándote opciones más claras ideales para fondos y acentos sutiles. Los colores complementarios se encuentran en el lado opuesto del círculo cromático y crean un fuerte contraste visual cuando se combinan. ColorPick genera todo esto automáticamente a partir de tu color seleccionado.',
    pt: 'Os tons são criados misturando uma cor com preto, produzindo variações mais escuras que funcionam bem para texto, bordas e estados hover. Os matizes misturam a cor com branco, oferecendo opções mais claras ideais para fundos e acentos sutis. As cores complementares ficam no lado oposto do círculo cromático e criam forte contraste visual quando combinadas. O ColorPick gera tudo isso automaticamente a partir da sua cor selecionada.',
    de: 'Schattierungen werden durch Mischen einer Farbe mit Schwarz erstellt und erzeugen dunklere Variationen, die gut für Text, Ränder und Hover-Zustände funktionieren. Tönungen mischen die Farbe mit Weiß und geben dir hellere Optionen, ideal für Hintergründe und subtile Akzente. Komplementärfarben befinden sich auf der gegenüberliegenden Seite des Farbkreises und erzeugen starken visuellen Kontrast, wenn sie zusammen verwendet werden. ColorPick generiert all dies automatisch aus deiner ausgewählten Farbe.',
  },
  seoP4: {
    en: 'Once you have chosen your palette, use the <a>Gradient Generator</a> to blend your colors into smooth CSS gradients. You can also apply your brand color to a custom <b>Favicon</b> to keep your website identity consistent across browser tabs.',
    fr: 'Une fois votre palette choisie, utilisez le <a>Générateur de dégradés</a> pour mélanger vos couleurs en dégradés CSS fluides. Vous pouvez aussi appliquer votre couleur de marque à un <b>Favicon</b> personnalisé pour garder l\'identité de votre site web cohérente dans les onglets du navigateur.',
    es: 'Una vez que hayas elegido tu paleta, usa el <a>Generador de degradados</a> para mezclar tus colores en gradientes CSS suaves. También puedes aplicar tu color de marca a un <b>Favicon</b> personalizado para mantener la identidad de tu sitio web consistente en las pestañas del navegador.',
    pt: 'Depois de escolher sua paleta, use o <a>Gerador de gradientes</a> para misturar suas cores em gradientes CSS suaves. Você também pode aplicar sua cor de marca a um <b>Favicon</b> personalizado para manter a identidade do seu site consistente nas abas do navegador.',
    de: 'Nachdem du deine Palette gewählt hast, nutze den <a>Gradient-Generator</a>, um deine Farben in sanfte CSS-Verläufe zu mischen. Du kannst auch deine Markenfarbe auf ein benutzerdefiniertes <b>Favicon</b> anwenden, um die Identität deiner Website über Browser-Tabs hinweg konsistent zu halten.',
  },
}

export default function ColorClient({
  defaultColor,
  locale = 'en' as Locale,
}: {
  defaultColor?: string
  locale?: Locale
} = {}) {
  const [color, setColor] = useState(defaultColor || '#3B82F6')
  const [copied, setCopied] = useState<string | null>(null)

  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

  const [r, g, b] = useMemo(() => hexToRgb(color), [color])
  const [h, s, l] = useMemo(() => rgbToHsl(r, g, b), [r, g, b])
  const shades = useMemo(() => generateShades(color), [color])
  const tints = useMemo(() => generateTints(color), [color])
  const comp = useMemo(() => complementary(color), [color])

  const copy = useCallback((text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied(null), 1200)
  }, [])

  const ValueRow = ({ label, value }: { label: string; value: string }) => (
    <div onClick={() => copy(value)} style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '10px 14px', borderRadius: 10, cursor: 'pointer',
      background: copied === value ? '#22A06508' : 'transparent',
      border: `1px solid ${copied === value ? '#22A06530' : '#E8E4DB'}`,
      marginBottom: 6, transition: 'all .15s',
    }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.6px' }}>{label}</span>
      <span style={{ fontFamily: fm, fontSize: 14, fontWeight: 600, color: copied === value ? '#22A065' : '#1C1B18' }}>
        {copied === value ? t('copied', locale) : value}
      </span>
    </div>
  )

  return (
    <ToolShell name="Color Picker" icon="🎨" currentPath="/color-picker" locale={locale}>
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 20 }}>🎨</span>
            <span style={{ fontSize: 17, fontWeight: 700 }}>ColorPick</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>{t('backAllTools', locale)}</a>
        </nav>

        <section style={{ maxWidth: 800, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            {lt('titleColor')} <span style={{ color }}>{lt('titlePicker')}</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>{lt('subtitle')}</p>
        </section>

        <section style={{ maxWidth: 800, margin: '0 auto', padding: '0 28px 40px', display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'start' }}>
          {/* Left: picker + palettes */}
          <div>
            {/* Big color block + picker */}
            <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 24, marginBottom: 16 }}>
              <div style={{ width: '100%', height: 160, borderRadius: 14, background: color, marginBottom: 16, border: '1px solid #E8E4DB' }} />
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <input type="color" value={color} onChange={e => setColor(e.target.value)}
                  style={{ width: 56, height: 56, border: 'none', borderRadius: 12, cursor: 'pointer', padding: 0 }} />
                <input type="text" value={color} onChange={e => { if (/^#[0-9A-Fa-f]{0,6}$/.test(e.target.value)) setColor(e.target.value) }}
                  style={{ flex: 1, border: '2px solid #E8E4DB', borderRadius: 12, padding: '14px 16px', fontFamily: fm, fontSize: 20, fontWeight: 700, color: '#1C1B18', textAlign: 'center', background: '#F5F3EE', outline: 'none', textTransform: 'uppercase' }} />
              </div>
            </div>

            {/* Shades */}
            <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #E8E4DB', padding: 20, marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 10 }}>{lt('shades')}</div>
              <div style={{ display: 'flex', gap: 4 }}>
                {shades.map((c, i) => (
                  <div key={i} onClick={() => { setColor(c); copy(c) }} style={{
                    flex: 1, aspectRatio: '1', borderRadius: 10, background: c, cursor: 'pointer',
                    border: `2px solid ${color === c ? '#1C1B18' : 'transparent'}`,
                    transition: 'all .15s',
                  }} title={c} />
                ))}
              </div>
            </div>

            {/* Tints */}
            <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #E8E4DB', padding: 20, marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 10 }}>{lt('tints')}</div>
              <div style={{ display: 'flex', gap: 4 }}>
                {tints.map((c, i) => (
                  <div key={i} onClick={() => { setColor(c); copy(c) }} style={{
                    flex: 1, aspectRatio: '1', borderRadius: 10, background: c, cursor: 'pointer',
                    border: `2px solid ${color === c ? '#1C1B18' : '#E8E4DB'}`,
                    transition: 'all .15s',
                  }} title={c} />
                ))}
              </div>
            </div>

            {/* Complementary */}
            <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #E8E4DB', padding: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 10 }}>{lt('complementary')}</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <div onClick={() => copy(color)} style={{ flex: 1, height: 48, borderRadius: 10, background: color, cursor: 'pointer', border: '1px solid #E8E4DB' }} title={color} />
                <div onClick={() => { setColor(comp); copy(comp) }} style={{ flex: 1, height: 48, borderRadius: 10, background: comp, cursor: 'pointer', border: '1px solid #E8E4DB' }} title={comp} />
              </div>
            </div>
          </div>

          {/* Right: values */}
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 24, position: 'sticky', top: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 14 }}>
              {lt('colorValues')} <span style={{ fontSize: 10, color: '#B0AAA0' }}>{lt('clickToCopy')}</span>
            </div>
            <ValueRow label="HEX" value={color.toUpperCase()} />
            <ValueRow label="RGB" value={`rgb(${r}, ${g}, ${b})`} />
            <ValueRow label="HSL" value={`hsl(${h}, ${s}%, ${l}%)`} />
            <ValueRow label="CSS" value={`background: ${color};`} />
            <ValueRow label="Tailwind" value={`bg-[${color}]`} />

            <div style={{ marginTop: 16, padding: '14px', borderRadius: 12, background: '#F5F3EE' }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.6px', marginBottom: 8 }}>{lt('details')}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 12 }}>
                <div><span style={{ color: '#9A958A' }}>{lt('red')}</span> <span style={{ fontFamily: fm, fontWeight: 600 }}>{r}</span></div>
                <div><span style={{ color: '#9A958A' }}>{lt('green')}</span> <span style={{ fontFamily: fm, fontWeight: 600 }}>{g}</span></div>
                <div><span style={{ color: '#9A958A' }}>{lt('blue')}</span> <span style={{ fontFamily: fm, fontWeight: 600 }}>{b}</span></div>
                <div><span style={{ color: '#9A958A' }}>{lt('hue')}</span> <span style={{ fontFamily: fm, fontWeight: 600 }}>{h}°</span></div>
                <div><span style={{ color: '#9A958A' }}>{lt('sat')}</span> <span style={{ fontFamily: fm, fontWeight: 600 }}>{s}%</span></div>
                <div><span style={{ color: '#9A958A' }}>{lt('light')}</span> <span style={{ fontFamily: fm, fontWeight: 600 }}>{l}%</span></div>
              </div>
            </div>
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
                {parts[0]}<a href="/gradient-generator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{parts[1]}</a>{parts[2]}<a href="/favicon-generator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{parts[3]}</a>{parts[4]}
              </>
            })()}
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
