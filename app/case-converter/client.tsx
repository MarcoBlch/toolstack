'use client'
import { useState, useCallback } from 'react'
import ToolShell from '@/components/ToolShell'
import { t, type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

const CASES = [
  { id: 'upper', name: 'UPPERCASE', fn: (t: string) => t.toUpperCase(), example: 'HELLO WORLD' },
  { id: 'lower', name: 'lowercase', fn: (t: string) => t.toLowerCase(), example: 'hello world' },
  { id: 'title', name: 'Title Case', fn: (t: string) => t.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()), example: 'Hello World' },
  { id: 'sentence', name: 'Sentence case', fn: (t: string) => { const s = t.toLowerCase(); return s.charAt(0).toUpperCase() + s.slice(1).replace(/([.!?]\s+)(\w)/g, (_, p, c) => p + c.toUpperCase()) }, example: 'Hello world. How are you?' },
  { id: 'camel', name: 'camelCase', fn: (t: string) => t.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()), example: 'helloWorld' },
  { id: 'pascal', name: 'PascalCase', fn: (t: string) => { const c = t.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()); return c.charAt(0).toUpperCase() + c.slice(1) }, example: 'HelloWorld' },
  { id: 'snake', name: 'snake_case', fn: (t: string) => t.toLowerCase().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, ''), example: 'hello_world' },
  { id: 'kebab', name: 'kebab-case', fn: (t: string) => t.toLowerCase().replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, ''), example: 'hello-world' },
  { id: 'constant', name: 'CONSTANT_CASE', fn: (t: string) => t.toUpperCase().replace(/\s+/g, '_').replace(/[^A-Z0-9_]/g, ''), example: 'HELLO_WORLD' },
  { id: 'dot', name: 'dot.case', fn: (t: string) => t.toLowerCase().replace(/\s+/g, '.').replace(/[^a-zA-Z0-9.]/g, ''), example: 'hello.world' },
  { id: 'toggle', name: 'tOGGLE cASE', fn: (t: string) => [...t].map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join(''), example: 'hELLO wORLD' },
  { id: 'alternating', name: 'aLtErNaTiNg', fn: (t: string) => [...t].map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join(''), example: 'hElLo WoRlD' },
]

const LABELS: Record<string, Record<Locale, string>> = {
  // Title
  titleCase: { en: 'Text case', fr: 'Convertisseur de', es: 'Convertidor de', pt: 'Conversor de', de: 'Text-Groß-/' },
  titleConverter: { en: 'converter', fr: 'casse', es: 'mayúsculas', pt: 'maiúsculas', de: 'Kleinschreibung' },
  subtitle: {
    en: 'Paste your text. Click any case to convert. Click again to copy.',
    fr: 'Collez votre texte. Cliquez sur un style pour convertir. Cliquez à nouveau pour copier.',
    es: 'Pega tu texto. Haz clic en cualquier estilo para convertir. Haz clic de nuevo para copiar.',
    pt: 'Cole seu texto. Clique em qualquer estilo para converter. Clique novamente para copiar.',
    de: 'Text einfügen. Klicke auf einen Stil zum Konvertieren. Erneut klicken zum Kopieren.',
  },
  placeholder: {
    en: 'Type or paste your text here...',
    fr: 'Tapez ou collez votre texte ici...',
    es: 'Escribe o pega tu texto aquí...',
    pt: 'Digite ou cole seu texto aqui...',
    de: 'Text hier eingeben oder einfügen...',
  },
  chars: { en: 'chars', fr: 'car.', es: 'car.', pt: 'car.', de: 'Zeichen' },
  clear: { en: 'Clear', fr: 'Effacer', es: 'Borrar', pt: 'Limpar', de: 'Löschen' },
  clickToCopy: { en: 'Click to copy', fr: 'Cliquez pour copier', es: 'Clic para copiar', pt: 'Clique para copiar', de: 'Klicken zum Kopieren' },

  // SEO
  seoH2: {
    en: 'Free text case converter',
    fr: 'Convertisseur de casse gratuit',
    es: 'Convertidor de mayúsculas gratis',
    pt: 'Conversor de maiúsculas grátis',
    de: 'Kostenloser Groß-/Kleinschreibung-Konverter',
  },
  seoP1: {
    en: 'CaseFlip converts text between 12 different cases: UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, dot.case, tOGGLE cASE, and aLtErNaTiNg case. It is a fast, reliable way for developers to convert variable names, for writers to fix capitalization mistakes, and for content creators to style their text. All processing happens locally in your browser.',
    fr: 'CaseFlip convertit le texte entre 12 casses différentes : MAJUSCULES, minuscules, Casse Titre, Casse phrase, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, dot.case, cAsSe InVeRsÉe et cAsSe AlTeRnÉe. C\'est un moyen rapide et fiable pour les développeurs de convertir des noms de variables, pour les rédacteurs de corriger les erreurs de majuscules et pour les créateurs de contenu de styliser leur texte. Tout le traitement se fait localement dans votre navigateur.',
    es: 'CaseFlip convierte texto entre 12 estilos de mayúsculas diferentes: MAYÚSCULAS, minúsculas, Tipo Título, Tipo oración, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, dot.case, cAsSe InVeRtIdA y cAsSe AlTeRnAdA. Es una forma rápida y fiable para que los desarrolladores conviertan nombres de variables, los escritores corrijan errores de capitalización y los creadores de contenido estilicen su texto. Todo el procesamiento ocurre localmente en tu navegador.',
    pt: 'O CaseFlip converte texto entre 12 estilos de maiúsculas diferentes: MAIÚSCULAS, minúsculas, Tipo Título, Tipo frase, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, dot.case, cAsSa InVeRtIdA e cAsSa AlTeRnAdA. É uma forma rápida e confiável para desenvolvedores converterem nomes de variáveis, escritores corrigirem erros de capitalização e criadores de conteúdo estilizarem seu texto. Todo o processamento acontece localmente no seu navegador.',
    de: 'CaseFlip konvertiert Text zwischen 12 verschiedenen Schreibweisen: GROSSBUCHSTABEN, kleinbuchstaben, Titelschreibweise, Satzschreibweise, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, dot.case, wEcHsElScHrEiBuNg und aLtErNiErEnD. Es ist ein schneller, zuverlässiger Weg für Entwickler, Variablennamen zu konvertieren, für Autoren, Großschreibungsfehler zu beheben, und für Content-Ersteller, ihren Text zu stylen. Alle Verarbeitung geschieht lokal in deinem Browser.',
  },
  seoH3a: {
    en: 'Case styles explained for developers',
    fr: 'Les styles de casse expliqués aux développeurs',
    es: 'Estilos de mayúsculas explicados para desarrolladores',
    pt: 'Estilos de maiúsculas explicados para desenvolvedores',
    de: 'Schreibweisen für Entwickler erklärt',
  },
  seoP2: {
    en: 'Different programming languages and frameworks follow different naming conventions. JavaScript typically uses camelCase for variables and PascalCase for classes. Python favors snake_case, while CSS class names and URL slugs use kebab-case. CONSTANT_CASE is the standard for environment variables and configuration constants. Converting between these formats manually is tedious and error-prone, which is exactly why a dedicated converter saves time.',
    fr: 'Les différents langages de programmation et frameworks suivent des conventions de nommage différentes. JavaScript utilise généralement camelCase pour les variables et PascalCase pour les classes. Python privilégie snake_case, tandis que les noms de classes CSS et les slugs d\'URL utilisent kebab-case. CONSTANT_CASE est la norme pour les variables d\'environnement et les constantes de configuration. Convertir manuellement entre ces formats est fastidieux et source d\'erreurs, c\'est exactement pourquoi un convertisseur dédié fait gagner du temps.',
    es: 'Los diferentes lenguajes de programación y frameworks siguen diferentes convenciones de nombres. JavaScript típicamente usa camelCase para variables y PascalCase para clases. Python favorece snake_case, mientras que los nombres de clases CSS y los slugs de URL usan kebab-case. CONSTANT_CASE es el estándar para variables de entorno y constantes de configuración. Convertir manualmente entre estos formatos es tedioso y propenso a errores, que es exactamente por qué un convertidor dedicado ahorra tiempo.',
    pt: 'Diferentes linguagens de programação e frameworks seguem diferentes convenções de nomenclatura. JavaScript tipicamente usa camelCase para variáveis e PascalCase para classes. Python favorece snake_case, enquanto nomes de classes CSS e slugs de URL usam kebab-case. CONSTANT_CASE é o padrão para variáveis de ambiente e constantes de configuração. Converter manualmente entre esses formatos é tedioso e propenso a erros, que é exatamente por que um conversor dedicado economiza tempo.',
    de: 'Verschiedene Programmiersprachen und Frameworks folgen unterschiedlichen Namenskonventionen. JavaScript verwendet typischerweise camelCase für Variablen und PascalCase für Klassen. Python bevorzugt snake_case, während CSS-Klassennamen und URL-Slugs kebab-case verwenden. CONSTANT_CASE ist der Standard für Umgebungsvariablen und Konfigurationskonstanten. Manuelles Konvertieren zwischen diesen Formaten ist mühsam und fehleranfällig, weshalb ein dedizierter Konverter Zeit spart.',
  },
  seoH3b: {
    en: 'Practical uses beyond coding',
    fr: 'Utilisations pratiques au-delà du code',
    es: 'Usos prácticos más allá de la programación',
    pt: 'Usos práticos além da programação',
    de: 'Praktische Anwendungen jenseits der Programmierung',
  },
  seoP3: {
    en: 'Case conversion is not just for programmers. Writers use Title Case to format headings consistently. Marketers convert text to uppercase for attention-grabbing headlines in email campaigns. If you accidentally leave caps lock on, the lowercase option fixes everything in one click. Sentence case is helpful when you want to normalize pasted text that came in with inconsistent capitalization from different sources.',
    fr: 'La conversion de casse n\'est pas réservée aux programmeurs. Les rédacteurs utilisent la Casse Titre pour formater les titres de manière cohérente. Les marketeurs convertissent le texte en majuscules pour des titres accrocheurs dans les campagnes email. Si vous avez accidentellement laissé le verrouillage des majuscules activé, l\'option minuscules corrige tout en un clic. La casse de phrase est utile quand vous voulez normaliser du texte collé provenant de différentes sources avec une capitalisation incohérente.',
    es: 'La conversión de mayúsculas no es solo para programadores. Los escritores usan Tipo Título para formatear títulos de forma consistente. Los especialistas en marketing convierten texto a mayúsculas para titulares llamativos en campañas de correo electrónico. Si accidentalmente dejaste el bloqueo de mayúsculas activado, la opción de minúsculas arregla todo en un clic. El tipo oración es útil cuando quieres normalizar texto pegado que llegó con capitalización inconsistente de diferentes fuentes.',
    pt: 'A conversão de maiúsculas não é apenas para programadores. Escritores usam Tipo Título para formatar cabeçalhos de forma consistente. Profissionais de marketing convertem texto para maiúsculas para títulos chamativos em campanhas de email. Se você acidentalmente deixou o caps lock ativado, a opção de minúsculas corrige tudo com um clique. O tipo frase é útil quando você quer normalizar texto colado que veio com capitalização inconsistente de diferentes fontes.',
    de: 'Groß-/Kleinschreibungskonvertierung ist nicht nur für Programmierer. Autoren nutzen Titelschreibweise, um Überschriften einheitlich zu formatieren. Marketer konvertieren Text in Großbuchstaben für aufmerksamkeitsstarke Überschriften in E-Mail-Kampagnen. Wenn du versehentlich die Feststelltaste eingeschaltet lässt, behebt die Kleinbuchstaben-Option alles mit einem Klick. Satzschreibweise ist hilfreich, wenn du eingefügten Text normalisieren willst, der mit inkonsistenter Großschreibung aus verschiedenen Quellen kam.',
  },
  seoP4: {
    en: 'Want decorative text styles beyond standard casing? Try the <a>fancy text generator</a> for Unicode fonts. You can also use the <b>word counter</b> to check the length of your converted text before publishing.',
    fr: 'Vous voulez des styles de texte décoratifs au-delà de la casse standard ? Essayez le <a>générateur de texte stylé</a> pour les polices Unicode. Vous pouvez aussi utiliser le <b>compteur de mots</b> pour vérifier la longueur de votre texte converti avant de publier.',
    es: '¿Quieres estilos de texto decorativos más allá de las mayúsculas estándar? Prueba el <a>generador de texto elegante</a> para fuentes Unicode. También puedes usar el <b>contador de palabras</b> para verificar la longitud de tu texto convertido antes de publicar.',
    pt: 'Quer estilos de texto decorativos além das maiúsculas padrão? Experimente o <a>gerador de texto estilizado</a> para fontes Unicode. Você também pode usar o <b>contador de palavras</b> para verificar o tamanho do seu texto convertido antes de publicar.',
    de: 'Möchtest du dekorative Textstile jenseits der Standard-Schreibweise? Probiere den <a>Fancy-Text-Generator</a> für Unicode-Schriften. Du kannst auch den <b>Wortzähler</b> nutzen, um die Länge deines konvertierten Textes vor der Veröffentlichung zu prüfen.',
  },
}

export default function CaseConverterClient({ locale = 'en' as Locale }: { locale?: Locale } = {}) {
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

  const handleCopy = useCallback((text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 1500)
  }, [])

  return (
    <ToolShell name="Case Converter" icon="Aa" currentPath="/case-converter" locale={locale}>
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 860, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: '#E8457A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 800 }}>Aa</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>CaseFlip</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>{t('backAllTools', locale)}</a>
        </nav>

        <section style={{ maxWidth: 860, margin: '0 auto', padding: '32px 28px 20px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            {lt('titleCase')} <span style={{ color: '#E8457A' }}>{lt('titleConverter')}</span>
          </h1>
          <p style={{ fontSize: 15, color: '#6B6560', marginBottom: 28 }}>
            {lt('subtitle')}
          </p>

          <div style={{ maxWidth: 620, margin: '0 auto 32px', background: '#fff', borderRadius: 14, border: '2px solid #E8E4DB', overflow: 'hidden' }}>
            <textarea value={input} onChange={e => setInput(e.target.value)}
              placeholder={lt('placeholder')}
              rows={4} style={{
                width: '100%', border: 'none', padding: 18, fontSize: 16, fontFamily: fb,
                color: '#1C1B18', resize: 'none', outline: 'none', background: 'transparent', lineHeight: 1.6,
              }} />
            {input && (
              <div style={{ padding: '6px 16px 10px', borderTop: '1px solid #E8E4DB', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, color: '#9A958A' }}>{input.length} {lt('chars')}</span>
                <button onClick={() => setInput('')} style={{ fontSize: 12, fontWeight: 600, color: '#9A958A', background: 'none', border: 'none', cursor: 'pointer' }}>{lt('clear')}</button>
              </div>
            )}
          </div>
        </section>

        <section style={{ maxWidth: 860, margin: '0 auto', padding: '0 28px 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 10 }}>
            {CASES.map(c => {
              const result = input ? c.fn(input) : c.example
              const isCopied = copied === c.id
              return (
                <div key={c.id} onClick={() => input && handleCopy(result, c.id)} style={{
                  background: '#fff', borderRadius: 12, padding: '14px 18px',
                  border: `1.5px solid ${isCopied ? '#22A065' : '#E8E4DB'}`,
                  cursor: input ? 'pointer' : 'default', transition: 'all .15s',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.6px' }}>{c.name}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: isCopied ? '#22A065' : '#B0AAA0' }}>
                      {isCopied ? t('copied', locale) : input ? lt('clickToCopy') : ''}
                    </span>
                  </div>
                  <div style={{
                    fontSize: 15, fontFamily: ['camel', 'pascal', 'snake', 'kebab', 'constant', 'dot'].includes(c.id) ? fm : fb,
                    color: input ? '#1C1B18' : '#B0AAA0', fontStyle: input ? 'normal' : 'italic',
                    wordBreak: 'break-word', lineHeight: 1.5,
                    overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box',
                    WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as any,
                  }}>{result}</div>
                </div>
              )
            })}
          </div>
        </section>

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
                {parts[0]}<a href="/fancy-text" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{parts[1]}</a>{parts[2]}<a href="/word-counter" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{parts[3]}</a>{parts[4]}
              </>
            })()}
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
