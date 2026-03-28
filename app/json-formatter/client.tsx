'use client'
import { useState, useCallback } from 'react'
import ToolShell from '@/components/ToolShell'
import { t, LOCALE_CODES, type Locale } from '@/lib/i18n'

const fm = "'JetBrains Mono', monospace"
const fb = "'Outfit', -apple-system, sans-serif"

function syntaxHighlight(json: string): string {
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
    let cls = 'json-number'
    if (/^"/.test(match)) {
      cls = /:$/.test(match) ? 'json-key' : 'json-string'
    } else if (/true|false/.test(match)) {
      cls = 'json-bool'
    } else if (/null/.test(match)) {
      cls = 'json-null'
    }
    return `<span class="${cls}">${match}</span>`
  })
}

const LABELS: Record<string, Record<Locale, string>> = {
  // Title
  titleJSON: { en: 'JSON', fr: 'JSON', es: 'JSON', pt: 'JSON', de: 'JSON' },
  titleFormatter: { en: 'formatter', fr: 'formateur', es: 'formateador', pt: 'formatador', de: 'Formatierer' },
  titleValidator: { en: '& validator', fr: '& validateur', es: '& validador', pt: '& validador', de: '& Validierer' },
  subtitle: {
    en: 'Paste your JSON. Format, minify, or validate instantly.',
    fr: 'Collez votre JSON. Formatez, minifiez ou validez instantanément.',
    es: 'Pega tu JSON. Formatea, minifica o valida al instante.',
    pt: 'Cole seu JSON. Formate, minifique ou valide instantaneamente.',
    de: 'JSON einfügen. Sofort formatieren, minifizieren oder validieren.',
  },

  // Mode buttons
  format: { en: 'Format', fr: 'Formater', es: 'Formatear', pt: 'Formatar', de: 'Formatieren' },
  minify: { en: 'Minify', fr: 'Minifier', es: 'Minificar', pt: 'Minificar', de: 'Minifizieren' },
  validate: { en: 'Validate', fr: 'Valider', es: 'Validar', pt: 'Validar', de: 'Validieren' },

  // Labels
  indent: { en: 'Indent:', fr: 'Indentation :', es: 'Sangría:', pt: 'Recuo:', de: 'Einrückung:' },
  sampleJSON: { en: 'Sample JSON', fr: 'JSON exemple', es: 'JSON de ejemplo', pt: 'JSON de exemplo', de: 'Beispiel-JSON' },
  input: { en: 'Input', fr: 'Entrée', es: 'Entrada', pt: 'Entrada', de: 'Eingabe' },
  output: { en: 'Output', fr: 'Sortie', es: 'Salida', pt: 'Saída', de: 'Ausgabe' },
  placeholder: {
    en: 'Paste your JSON here...',
    fr: 'Collez votre JSON ici...',
    es: 'Pega tu JSON aquí...',
    pt: 'Cole seu JSON aqui...',
    de: 'JSON hier einfügen...',
  },
  outputPlaceholder: {
    en: 'Formatted output will appear here...',
    fr: 'Le résultat formaté apparaîtra ici...',
    es: 'El resultado formateado aparecerá aquí...',
    pt: 'O resultado formatado aparecerá aqui...',
    de: 'Formatierte Ausgabe erscheint hier...',
  },
  invalidJSON: { en: 'Invalid JSON', fr: 'JSON invalide', es: 'JSON inválido', pt: 'JSON inválido', de: 'Ungültiges JSON' },
  chars: { en: 'chars', fr: 'car.', es: 'car.', pt: 'car.', de: 'Zeichen' },
  lines: { en: 'lines', fr: 'lignes', es: 'líneas', pt: 'linhas', de: 'Zeilen' },

  // SEO
  seoH2: {
    en: 'Free JSON formatter, validator & minifier',
    fr: 'Formateur, validateur et minificateur JSON gratuit',
    es: 'Formateador, validador y minificador JSON gratis',
    pt: 'Formatador, validador e minificador JSON grátis',
    de: 'Kostenloser JSON-Formatierer, Validierer & Minifizierer',
  },
  seoP1: {
    en: 'JSONPretty formats, validates, and minifies JSON instantly in your browser. It features syntax highlighting with color-coded keys, strings, numbers, booleans, and null values. Choose between 2-space or 4-space indentation depending on your preference. All processing happens locally so your data never leaves your device. It is ideal for debugging API responses, formatting configuration files, and cleaning up messy JSON data from any source.',
    fr: 'JSONPretty formate, valide et minifie le JSON instantanément dans votre navigateur. Il propose la coloration syntaxique avec des clés, chaînes, nombres, booléens et valeurs null codés par couleur. Choisissez entre une indentation de 2 ou 4 espaces selon votre préférence. Tout le traitement se fait localement, vos données ne quittent jamais votre appareil. Idéal pour déboguer les réponses d\'API, formater les fichiers de configuration et nettoyer les données JSON désordonnées de toute source.',
    es: 'JSONPretty formatea, valida y minifica JSON instantáneamente en tu navegador. Presenta resaltado de sintaxis con claves, cadenas, números, booleanos y valores null codificados por colores. Elige entre indentación de 2 o 4 espacios según tu preferencia. Todo el procesamiento ocurre localmente, así que tus datos nunca salen de tu dispositivo. Es ideal para depurar respuestas de API, formatear archivos de configuración y limpiar datos JSON desordenados de cualquier fuente.',
    pt: 'O JSONPretty formata, valida e minifica JSON instantaneamente no seu navegador. Apresenta destaque de sintaxe com chaves, strings, números, booleanos e valores null codificados por cores. Escolha entre indentação de 2 ou 4 espaços de acordo com sua preferência. Todo o processamento acontece localmente, então seus dados nunca saem do seu dispositivo. É ideal para depurar respostas de API, formatar arquivos de configuração e limpar dados JSON bagunçados de qualquer fonte.',
    de: 'JSONPretty formatiert, validiert und minifiziert JSON sofort in deinem Browser. Es bietet Syntax-Highlighting mit farbcodierten Schlüsseln, Strings, Zahlen, Booleans und Null-Werten. Wähle zwischen 2- oder 4-Leerzeichen-Einrückung je nach Vorliebe. Alle Verarbeitung geschieht lokal, sodass deine Daten dein Gerät nie verlassen. Ideal zum Debuggen von API-Antworten, Formatieren von Konfigurationsdateien und Bereinigen unordentlicher JSON-Daten aus beliebigen Quellen.',
  },
  seoH3a: {
    en: 'JSON validation and error detection',
    fr: 'Validation JSON et détection d\'erreurs',
    es: 'Validación JSON y detección de errores',
    pt: 'Validação JSON e detecção de erros',
    de: 'JSON-Validierung und Fehlererkennung',
  },
  seoP2: {
    en: 'When your JSON is invalid, the formatter shows a clear error message pointing to the problem. Common issues include trailing commas, missing quotes around keys, single quotes instead of double quotes, and unescaped special characters. Catching these errors early saves time when debugging webhooks, API integrations, or configuration files. The validator checks your JSON against the specification so you can fix syntax issues before they cause runtime failures.',
    fr: 'Lorsque votre JSON est invalide, le formateur affiche un message d\'erreur clair pointant vers le problème. Les problèmes courants incluent les virgules en trop, les guillemets manquants autour des clés, les guillemets simples au lieu des doubles, et les caractères spéciaux non échappés. Détecter ces erreurs tôt fait gagner du temps lors du débogage de webhooks, d\'intégrations API ou de fichiers de configuration. Le validateur vérifie votre JSON par rapport à la spécification pour corriger les problèmes de syntaxe avant qu\'ils ne causent des erreurs à l\'exécution.',
    es: 'Cuando tu JSON es inválido, el formateador muestra un mensaje de error claro que señala el problema. Los problemas comunes incluyen comas al final, comillas faltantes alrededor de claves, comillas simples en lugar de dobles y caracteres especiales sin escapar. Detectar estos errores temprano ahorra tiempo al depurar webhooks, integraciones de API o archivos de configuración. El validador verifica tu JSON contra la especificación para que puedas corregir problemas de sintaxis antes de que causen fallos en tiempo de ejecución.',
    pt: 'Quando seu JSON é inválido, o formatador mostra uma mensagem de erro clara apontando para o problema. Problemas comuns incluem vírgulas finais, aspas faltando ao redor das chaves, aspas simples em vez de duplas e caracteres especiais não escapados. Detectar esses erros cedo economiza tempo ao depurar webhooks, integrações de API ou arquivos de configuração. O validador verifica seu JSON contra a especificação para que você possa corrigir problemas de sintaxe antes que causem falhas em tempo de execução.',
    de: 'Wenn dein JSON ungültig ist, zeigt der Formatierer eine klare Fehlermeldung, die auf das Problem hinweist. Häufige Probleme sind nachgestellte Kommas, fehlende Anführungszeichen um Schlüssel, einfache statt doppelte Anführungszeichen und nicht-escapte Sonderzeichen. Diese Fehler früh zu erkennen spart Zeit beim Debuggen von Webhooks, API-Integrationen oder Konfigurationsdateien. Der Validierer prüft dein JSON gegen die Spezifikation, damit du Syntaxprobleme beheben kannst, bevor sie Laufzeitfehler verursachen.',
  },
  seoH3b: {
    en: 'Beautifying vs. minifying JSON',
    fr: 'Embellir vs. minifier le JSON',
    es: 'Embellecer vs. minificar JSON',
    pt: 'Embelezar vs. minificar JSON',
    de: 'JSON verschönern vs. minifizieren',
  },
  seoP3: {
    en: 'Beautified JSON with proper indentation is easier to read and review, which makes it the preferred format during development and debugging. Minified JSON removes all whitespace and line breaks, reducing file size for production use where bandwidth matters. JSONPretty lets you switch between both modes instantly, so you can format for readability when inspecting data and minify when you need the most compact representation.',
    fr: 'Le JSON embelli avec une indentation correcte est plus facile à lire et à réviser, ce qui en fait le format préféré pendant le développement et le débogage. Le JSON minifié supprime tous les espaces et sauts de ligne, réduisant la taille du fichier pour la production où la bande passante compte. JSONPretty vous permet de basculer instantanément entre les deux modes, pour formater pour la lisibilité lors de l\'inspection des données et minifier quand vous avez besoin de la représentation la plus compacte.',
    es: 'El JSON embellecido con indentación adecuada es más fácil de leer y revisar, lo que lo convierte en el formato preferido durante el desarrollo y la depuración. El JSON minificado elimina todos los espacios en blanco y saltos de línea, reduciendo el tamaño del archivo para producción donde el ancho de banda importa. JSONPretty te permite alternar entre ambos modos al instante, para formatear para legibilidad al inspeccionar datos y minificar cuando necesitas la representación más compacta.',
    pt: 'JSON embelezado com indentação adequada é mais fácil de ler e revisar, o que o torna o formato preferido durante o desenvolvimento e depuração. JSON minificado remove todos os espaços em branco e quebras de linha, reduzindo o tamanho do arquivo para uso em produção onde a largura de banda importa. O JSONPretty permite alternar entre ambos os modos instantaneamente, para formatar para legibilidade ao inspecionar dados e minificar quando você precisa da representação mais compacta.',
    de: 'Verschönertes JSON mit korrekter Einrückung ist leichter zu lesen und zu überprüfen, was es zum bevorzugten Format während der Entwicklung und beim Debuggen macht. Minifiziertes JSON entfernt alle Leerzeichen und Zeilenumbrüche und reduziert die Dateigröße für die Produktion, wo Bandbreite zählt. JSONPretty lässt dich sofort zwischen beiden Modi wechseln, sodass du für Lesbarkeit formatieren kannst, wenn du Daten inspizierst, und minifizieren, wenn du die kompakteste Darstellung brauchst.',
  },
  seoP4: {
    en: 'Need to encode JSON data for transport? The <a>Base64 encoder</a> converts it to a safe string format. For testing patterns within your JSON values, the <b>regex tester</b> lets you validate strings against any pattern.',
    fr: 'Besoin d\'encoder des données JSON pour le transport ? L\'<a>encodeur Base64</a> les convertit en un format de chaîne sûr. Pour tester des motifs dans vos valeurs JSON, le <b>testeur de regex</b> vous permet de valider des chaînes contre n\'importe quel motif.',
    es: '¿Necesitas codificar datos JSON para el transporte? El <a>codificador Base64</a> los convierte a un formato de cadena seguro. Para probar patrones dentro de tus valores JSON, el <b>probador de regex</b> te permite validar cadenas contra cualquier patrón.',
    pt: 'Precisa codificar dados JSON para transporte? O <a>codificador Base64</a> os converte para um formato de string seguro. Para testar padrões dentro dos seus valores JSON, o <b>testador de regex</b> permite validar strings contra qualquer padrão.',
    de: 'Musst du JSON-Daten für den Transport kodieren? Der <a>Base64-Encoder</a> wandelt sie in ein sicheres String-Format um. Zum Testen von Mustern in deinen JSON-Werten lässt dich der <b>Regex-Tester</b> Strings gegen jedes Muster validieren.',
  },
}

const MODE_LABELS: Record<string, string> = {
  format: 'format',
  minify: 'minify',
  validate: 'validate',
}

export default function JSONFormatterClient({ locale = 'en' as Locale }: { locale?: Locale } = {}) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [mode, setMode] = useState<'format' | 'minify' | 'validate'>('format')
  const [copied, setCopied] = useState(false)
  const [indent, setIndent] = useState(2)

  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

  const process = useCallback(() => {
    if (!input.trim()) { setOutput(''); setError(''); return }
    try {
      const parsed = JSON.parse(input)
      setError('')
      if (mode === 'format') {
        setOutput(JSON.stringify(parsed, null, indent))
      } else if (mode === 'minify') {
        setOutput(JSON.stringify(parsed))
      } else {
        setOutput(JSON.stringify(parsed, null, indent))
      }
    } catch (e: any) {
      setError(e.message || lt('invalidJSON'))
      setOutput('')
    }
  }, [input, mode, indent, locale])

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  const handleSample = () => {
    const sample = JSON.stringify({
      name: "Tools4Free",
      version: "1.0.0",
      tools: ["FancyText", "QRDrop", "PassForge", "WordTool", "JSONPretty"],
      config: { theme: "dark", language: "en", premium: false },
      stats: { users: 12847, rating: 4.9 }
    })
    setInput(sample)
    setTimeout(() => {
      try {
        setOutput(JSON.stringify(JSON.parse(sample), null, indent))
        setError('')
      } catch {}
    }, 50)
  }

  return (
    <ToolShell name="JSON Formatter" icon="{ }" currentPath="/json-formatter" locale={locale}>
      <style>{`
        .json-key { color: #8B5CF6; }
        .json-string { color: #22A065; }
        .json-number { color: #E8457A; }
        .json-bool { color: #3B82F6; }
        .json-null { color: #9A958A; }
      `}</style>
      <div style={{ background: '#0E0E11', minHeight: '100vh', color: '#E8E6F0', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 800, fontFamily: fm }}>{'{ }'}</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>JSONPretty</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#5A586E', textDecoration: 'none' }}>{t('backAllTools', locale)}</a>
        </nav>

        <section style={{ maxWidth: 1000, margin: '0 auto', padding: '24px 28px 12px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 6 }}>
            {lt('titleJSON')} <span style={{ color: '#8B5CF6' }}>{lt('titleFormatter')}</span> {lt('titleValidator')}
          </h1>
          <p style={{ fontSize: 14, color: '#5A586E', marginBottom: 20 }}>{lt('subtitle')}</p>
        </section>

        {/* Controls bar */}
        <section style={{ maxWidth: 1000, margin: '0 auto', padding: '0 28px', display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap', alignItems: 'center' }}>
          {(['format', 'minify', 'validate'] as const).map(m => (
            <button key={m} onClick={() => { setMode(m); setTimeout(process, 50) }} style={{
              fontFamily: fb, fontSize: 13, fontWeight: 600, padding: '8px 18px', borderRadius: 8, cursor: 'pointer',
              border: mode === m ? '1.5px solid #8B5CF6' : '1.5px solid #25252E',
              background: mode === m ? '#8B5CF615' : 'transparent', color: mode === m ? '#8B5CF6' : '#8A88A0',
            }}>{lt(MODE_LABELS[m])}</button>
          ))}
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: 12, color: '#5A586E' }}>{lt('indent')}</span>
          {[2, 4].map(n => (
            <button key={n} onClick={() => setIndent(n)} style={{
              fontFamily: fm, fontSize: 12, fontWeight: 600, padding: '6px 12px', borderRadius: 6, cursor: 'pointer',
              border: indent === n ? '1px solid #8B5CF6' : '1px solid #25252E',
              background: indent === n ? '#8B5CF615' : 'transparent', color: indent === n ? '#8B5CF6' : '#5A586E',
            }}>{n}</button>
          ))}
          <button onClick={handleSample} style={{
            fontFamily: fb, fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 6, cursor: 'pointer',
            border: '1px solid #25252E', background: 'transparent', color: '#5A586E',
          }}>{lt('sampleJSON')}</button>
        </section>

        {/* Editor panels */}
        <section style={{ maxWidth: 1000, margin: '0 auto', padding: '0 28px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: '#5A586E', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 6 }}>{lt('input')}</div>
            <textarea value={input} onChange={e => { setInput(e.target.value); setTimeout(process, 50) }}
              placeholder={lt('placeholder')}
              style={{
                width: '100%', minHeight: 400, background: '#17171C', border: '1.5px solid #25252E', borderRadius: 12,
                padding: 18, fontSize: 13, fontFamily: fm, color: '#E8E6F0', resize: 'vertical', outline: 'none', lineHeight: 1.7,
              }} />
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: 10, fontWeight: 600, color: '#5A586E', textTransform: 'uppercase', letterSpacing: '.8px' }}>{lt('output')}</span>
              {output && (
                <button onClick={handleCopy} style={{
                  fontFamily: fb, fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 6, cursor: 'pointer',
                  border: `1px solid ${copied ? '#22A06530' : '#25252E'}`, background: copied ? '#22A06510' : 'transparent',
                  color: copied ? '#22A065' : '#5A586E',
                }}>{copied ? t('copied', locale) : t('copy', locale)}</button>
              )}
            </div>
            <div style={{
              width: '100%', minHeight: 400, background: '#17171C', border: `1.5px solid ${error ? '#E24B4A30' : '#25252E'}`,
              borderRadius: 12, padding: 18, fontSize: 13, fontFamily: fm, lineHeight: 1.7, overflow: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-word',
            }}>
              {error ? (
                <div style={{ color: '#E24B4A' }}>
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>{lt('invalidJSON')}</div>
                  <div style={{ fontSize: 12, opacity: 0.8 }}>{error}</div>
                </div>
              ) : output ? (
                <div dangerouslySetInnerHTML={{ __html: syntaxHighlight(output) }} />
              ) : (
                <span style={{ color: '#5A586E', fontStyle: 'italic' }}>{lt('outputPlaceholder')}</span>
              )}
            </div>
            {output && !error && (
              <div style={{ marginTop: 8, fontSize: 11, fontFamily: fm, color: '#5A586E' }}>
                {output.length.toLocaleString(LOCALE_CODES[locale])} {lt('chars')} · {output.split('\n').length} {lt('lines')}
              </div>
            )}
          </div>
        </section>

        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #1C1C24' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{lt('seoH2')}</h2>
          <p style={{ fontSize: 13, color: '#5A586E', lineHeight: 1.8 }}>
            {lt('seoP1')}
          </p>

          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>{lt('seoH3a')}</h3>
          <p style={{ fontSize: 13, color: '#5A586E', lineHeight: 1.8 }}>
            {lt('seoP2')}
          </p>

          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>{lt('seoH3b')}</h3>
          <p style={{ fontSize: 13, color: '#5A586E', lineHeight: 1.8 }}>
            {lt('seoP3')}
          </p>

          <p style={{ fontSize: 13, color: '#5A586E', lineHeight: 1.8, marginTop: 16 }}>
            {(() => {
              const parts = lt('seoP4').split(/<\/?[ab]>/)
              return <>
                {parts[0]}<a href="/base64" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{parts[1]}</a>{parts[2]}<a href="/regex-tester" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{parts[3]}</a>{parts[4]}
              </>
            })()}
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
