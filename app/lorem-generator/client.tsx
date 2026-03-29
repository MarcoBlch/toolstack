'use client'
import { useState, useMemo, useCallback } from 'react'
import ToolShell from '@/components/ToolShell'
import { t, type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

const LABELS: Record<string, Record<Locale, string>> = {
  navTitle:      { en: 'Lorem Ipsum Generator',   fr: 'Générateur Lorem Ipsum',          es: 'Generador Lorem Ipsum',         pt: 'Gerador Lorem Ipsum',           de: 'Lorem-Ipsum-Generator' },
  titleA:        { en: 'Lorem ipsum',             fr: 'Lorem ipsum',                     es: 'Lorem ipsum',                   pt: 'Lorem ipsum',                   de: 'Lorem ipsum' },
  titleB:        { en: 'generator',               fr: 'générateur',                      es: 'generador',                     pt: 'gerador',                       de: 'Generator' },
  subtitle:      { en: 'Placeholder text, generated instantly.', fr: 'Texte de remplacement, généré instantanément.', es: 'Texto de marcador, generado al instante.', pt: 'Texto de espaço reservado, gerado instantaneamente.', de: 'Platzhaltertext, sofort generiert.' },
  paragraphs:    { en: 'paragraphs',              fr: 'paragraphes',                     es: 'párrafos',                      pt: 'parágrafos',                    de: 'Absätze' },
  sentences:     { en: 'sentences',               fr: 'phrases',                         es: 'oraciones',                     pt: 'frases',                        de: 'Sätze' },
  words:         { en: 'words',                   fr: 'mots',                            es: 'palabras',                      pt: 'palavras',                      de: 'Wörter' },
  startWithLorem:{ en: 'Start with "Lorem ipsum..."', fr: 'Commencer par "Lorem ipsum..."', es: 'Comenzar con "Lorem ipsum..."', pt: 'Começar com "Lorem ipsum..."', de: 'Mit "Lorem ipsum..." beginnen' },
  regenerate:    { en: 'Regenerate',              fr: 'Régénérer',                       es: 'Regenerar',                     pt: 'Regenerar',                     de: 'Neu generieren' },
  copyText:      { en: 'Copy text',               fr: 'Copier le texte',                 es: 'Copiar texto',                  pt: 'Copiar texto',                  de: 'Text kopieren' },
  copied:        { en: 'Copied!',                 fr: 'Copié !',                         es: '¡Copiado!',                     pt: 'Copiado!',                      de: 'Kopiert!' },
  chars:         { en: 'chars',                   fr: 'caractères',                      es: 'caracteres',                    pt: 'caracteres',                    de: 'Zeichen' },
}

const WORDS = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt neque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur adipisci velit sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem'.split(' ')

const FIRST_SENTENCE = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

function randomWords(count: number): string {
  const result: string[] = []
  for (let i = 0; i < count; i++) {
    result.push(WORDS[Math.floor(Math.random() * WORDS.length)])
  }
  return result.join(' ')
}

function randomSentence(): string {
  const len = 8 + Math.floor(Math.random() * 12)
  const words = randomWords(len)
  return words.charAt(0).toUpperCase() + words.slice(1) + '.'
}

function randomParagraph(): string {
  const count = 3 + Math.floor(Math.random() * 4)
  return Array.from({ length: count }, () => randomSentence()).join(' ')
}

function generate(mode: string, count: number, startClassic: boolean): string {
  if (mode === 'paragraphs') {
    const paras = Array.from({ length: count }, (_, i) => {
      if (i === 0 && startClassic) return FIRST_SENTENCE + ' ' + Array.from({ length: 2 + Math.floor(Math.random() * 3) }, () => randomSentence()).join(' ')
      return randomParagraph()
    })
    return paras.join('\n\n')
  }
  if (mode === 'sentences') {
    const sentences = Array.from({ length: count }, (_, i) => {
      if (i === 0 && startClassic) return FIRST_SENTENCE
      return randomSentence()
    })
    return sentences.join(' ')
  }
  // words
  if (startClassic) {
    const classic = 'Lorem ipsum dolor sit amet'.split(' ').slice(0, Math.min(count, 5))
    const remaining = count - classic.length
    if (remaining > 0) return classic.join(' ') + ' ' + randomWords(remaining)
    return classic.slice(0, count).join(' ')
  }
  return randomWords(count)
}

export default function LoremClient({ locale = 'en' as Locale }: { locale?: Locale } = {}) {
  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

  const [mode, setMode] = useState('paragraphs')
  const [count, setCount] = useState(3)
  const [startClassic, setStartClassic] = useState(true)
  const [copied, setCopied] = useState(false)
  const [seed, setSeed] = useState(0)

  const text = useMemo(() => generate(mode, count, startClassic), [mode, count, startClassic, seed])
  const wordCount = text.split(/\s+/).filter(Boolean).length
  const charCount = text.length

  const copy = useCallback(() => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [text])

  const maxCount = mode === 'paragraphs' ? 20 : mode === 'sentences' ? 50 : 500

  const modeLabel = (m: string) => {
    if (m === 'paragraphs') return lt('paragraphs')
    if (m === 'sentences') return lt('sentences')
    return lt('words')
  }

  return (
    <ToolShell name={lt('navTitle')} icon="¶" currentPath="/lorem-generator" locale={locale}>
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 860, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 800 }}>L</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>LoremFast</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>{t('backAllTools', locale)}</a>
        </nav>

        <section style={{ maxWidth: 860, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            {lt('titleA')} <span style={{ color: '#8B5CF6' }}>{lt('titleB')}</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>{lt('subtitle')}</p>
        </section>

        <section style={{ maxWidth: 860, margin: '0 auto', padding: '0 28px 20px' }}>
          {/* Controls */}
          <div style={{
            display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'center',
            flexWrap: 'wrap', marginBottom: 20,
          }}>
            {/* Mode */}
            <div style={{ display: 'flex', gap: 4, background: '#F0EDE5', borderRadius: 10, padding: 3 }}>
              {['paragraphs', 'sentences', 'words'].map(m => (
                <button key={m} onClick={() => { setMode(m); setCount(m === 'paragraphs' ? 3 : m === 'sentences' ? 5 : 50) }}
                  style={{
                    fontFamily: fb, fontSize: 13, fontWeight: 600, padding: '7px 16px', borderRadius: 8,
                    border: 'none', cursor: 'pointer',
                    background: mode === m ? '#fff' : 'transparent',
                    color: mode === m ? '#1C1B18' : '#9A958A',
                    boxShadow: mode === m ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                  }}>{modeLabel(m)}</button>
              ))}
            </div>

            {/* Count */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button onClick={() => setCount(Math.max(1, count - 1))} style={{
                width: 32, height: 32, borderRadius: 8, border: '1.5px solid #E8E4DB',
                background: '#fff', cursor: 'pointer', fontSize: 16, fontWeight: 700, color: '#6B6560',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>−</button>
              <span style={{ fontFamily: fm, fontSize: 18, fontWeight: 700, minWidth: 32, textAlign: 'center' }}>{count}</span>
              <button onClick={() => setCount(Math.min(maxCount, count + 1))} style={{
                width: 32, height: 32, borderRadius: 8, border: '1.5px solid #E8E4DB',
                background: '#fff', cursor: 'pointer', fontSize: 16, fontWeight: 700, color: '#6B6560',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>+</button>
            </div>

            {/* Classic start */}
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#6B6560', cursor: 'pointer' }}>
              <input type="checkbox" checked={startClassic} onChange={e => setStartClassic(e.target.checked)}
                style={{ accentColor: '#8B5CF6' }} />
              {lt('startWithLorem')}
            </label>

            {/* Regenerate */}
            <button onClick={() => setSeed(s => s + 1)} style={{
              fontFamily: fb, fontSize: 13, fontWeight: 600, padding: '7px 16px', borderRadius: 8,
              border: '1.5px solid #E8E4DB', background: '#fff', color: '#6B6560', cursor: 'pointer',
            }}>{lt('regenerate')}</button>
          </div>
        </section>

        {/* Output */}
        <section style={{ maxWidth: 860, margin: '0 auto', padding: '0 28px 20px' }}>
          <div style={{
            background: '#fff', borderRadius: 16, border: '1.5px solid #E8E4DB',
            overflow: 'hidden',
          }}>
            <div style={{
              padding: '20px 24px', fontSize: 15, lineHeight: 1.8, color: '#4A4640',
              whiteSpace: 'pre-wrap', maxHeight: 400, overflow: 'auto',
            }}>
              {text}
            </div>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '12px 20px', borderTop: '1px solid #E8E4DB', background: '#FAFAF8',
            }}>
              <div style={{ display: 'flex', gap: 16, fontSize: 12, fontFamily: fm, color: '#9A958A' }}>
                <span>{wordCount} {lt('words')}</span>
                <span>{charCount} {lt('chars')}</span>
                <span>{count} {modeLabel(mode)}</span>
              </div>
              <button onClick={copy} style={{
                fontFamily: fb, fontSize: 13, fontWeight: 700, padding: '8px 20px', borderRadius: 8,
                border: 'none', cursor: 'pointer',
                background: copied ? '#22A06515' : '#8B5CF6',
                color: copied ? '#22A065' : '#fff',
              }}>{copied ? lt('copied') : lt('copyText')}</button>
            </div>
          </div>
        </section>

        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free lorem ipsum generator</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            LoremFast generates placeholder text for your designs, mockups, and layouts. Choose between paragraphs, sentences, or exact word counts and optionally start with the classic "Lorem ipsum dolor sit amet..." opening. Copy the result with a single click and paste it directly into your project. It is built for web designers, developers, and content creators who need realistic-looking dummy text without any hassle.
          </p>

          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>The history behind lorem ipsum</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Lorem ipsum text originates from a work by the Roman philosopher Cicero written in 45 BC. Typesetters in the 1500s scrambled a passage from "de Finibus Bonorum et Malorum" to create filler text that mimics the visual rhythm of natural language without being distracting. Because the words resemble Latin but are intentionally meaningless, they let reviewers focus on design elements rather than reading the content.
          </p>

          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 16 }}>
            Once your real content is written, use the <a href="/word-counter" style={{ color: '#FF6B35', textDecoration: 'underline' }}>word counter</a> to verify it matches the target length. For formatting your content in Markdown, the <a href="/markdown-editor" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Markdown editor</a> provides a live preview so you can see the final result instantly.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
