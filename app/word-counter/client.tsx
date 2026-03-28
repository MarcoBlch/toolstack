'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'
import { t, type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

function analyze(text: string) {
  const trimmed = text.trim()
  if (!trimmed) return { words: 0, chars: text.length, charsNoSpace: 0, sentences: 0, paragraphs: 0, readMin: 0, readSec: 0, speakMin: 0, speakSec: 0, topWords: [] as [string, number][] }

  const words = trimmed.split(/\s+/).filter(Boolean).length
  const chars = text.length
  const charsNoSpace = text.replace(/\s/g, '').length
  const sentences = (trimmed.match(/[.!?]+/g) || []).length || (trimmed.length > 0 ? 1 : 0)
  const paragraphs = trimmed.split(/\n\s*\n/).filter(p => p.trim()).length || 1
  const readTime = words / 238
  const speakTime = words / 150

  // Top words
  const freq: Record<string, number> = {}
  trimmed.toLowerCase().split(/\s+/).filter(w => w.length > 2).forEach(w => {
    const clean = w.replace(/[^a-zA-ZÀ-ÿ]/g, '')
    if (clean.length > 2) freq[clean] = (freq[clean] || 0) + 1
  })
  const topWords = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 8) as [string, number][]

  return {
    words, chars, charsNoSpace, sentences, paragraphs,
    readMin: Math.floor(readTime), readSec: Math.round((readTime % 1) * 60),
    speakMin: Math.floor(speakTime), speakSec: Math.round((speakTime % 1) * 60),
    topWords,
  }
}

const LABELS: Record<string, Record<Locale, string>> = {
  // Title
  titleWord: { en: 'Word & character', fr: 'Compteur de mots', es: 'Contador de palabras', pt: 'Contador de palavras', de: 'Wort- & Zeichen' },
  titleCounter: { en: 'counter', fr: 'et caractères', es: 'y caracteres', pt: 'e caracteres', de: 'zähler' },
  subtitle: {
    en: 'Paste your text. Get instant stats.',
    fr: 'Collez votre texte. Obtenez des statistiques instantanées.',
    es: 'Pega tu texto. Obtén estadísticas al instante.',
    pt: 'Cole seu texto. Obtenha estatísticas instantâneas.',
    de: 'Text einfügen. Sofort Statistiken erhalten.',
  },
  placeholder: {
    en: 'Type or paste your text here to count words, characters, sentences, and more...',
    fr: 'Tapez ou collez votre texte ici pour compter les mots, caractères, phrases et plus...',
    es: 'Escribe o pega tu texto aquí para contar palabras, caracteres, frases y más...',
    pt: 'Digite ou cole seu texto aqui para contar palavras, caracteres, frases e mais...',
    de: 'Text hier eingeben oder einfügen, um Wörter, Zeichen, Sätze und mehr zu zählen...',
  },

  // Stat labels
  words: { en: 'Words', fr: 'Mots', es: 'Palabras', pt: 'Palavras', de: 'Wörter' },
  characters: { en: 'Characters', fr: 'Caractères', es: 'Caracteres', pt: 'Caracteres', de: 'Zeichen' },
  noSpaces: { en: 'No spaces', fr: 'Sans espaces', es: 'Sin espacios', pt: 'Sem espaços', de: 'Ohne Leerzeichen' },
  sentences: { en: 'Sentences', fr: 'Phrases', es: 'Frases', pt: 'Frases', de: 'Sätze' },
  paragraphs: { en: 'Paragraphs', fr: 'Paragraphes', es: 'Párrafos', pt: 'Parágrafos', de: 'Absätze' },
  readingTime: { en: 'Reading time', fr: 'Temps de lecture', es: 'Tiempo de lectura', pt: 'Tempo de leitura', de: 'Lesezeit' },

  // Keywords
  topKeywords: { en: 'Top keywords', fr: 'Mots-clés principaux', es: 'Palabras clave principales', pt: 'Palavras-chave principais', de: 'Top-Schlüsselwörter' },
  startTyping: {
    en: 'Start typing to see keywords...',
    fr: 'Commencez à taper pour voir les mots-clés...',
    es: 'Empieza a escribir para ver las palabras clave...',
    pt: 'Comece a digitar para ver as palavras-chave...',
    de: 'Tippe etwas ein, um Schlüsselwörter zu sehen...',
  },

  // SEO
  seoH2: {
    en: 'Free word counter & character counter',
    fr: 'Compteur de mots et de caractères gratuit',
    es: 'Contador de palabras y caracteres gratis',
    pt: 'Contador de palavras e caracteres grátis',
    de: 'Kostenloser Wort- & Zeichenzähler',
  },
  seoP1: {
    en: 'WordTool counts words, characters (with and without spaces), sentences, paragraphs, and calculates reading time based on an average of 238 words per minute. It also estimates speaking time at 150 words per minute and displays your top keywords along with their frequency. This makes it ideal for essays, blog posts, social media captions, academic papers, and any writing where length and density matter.',
    fr: 'WordTool compte les mots, les caractères (avec et sans espaces), les phrases, les paragraphes et calcule le temps de lecture sur la base d\'une moyenne de 238 mots par minute. Il estime également le temps de parole à 150 mots par minute et affiche vos mots-clés principaux avec leur fréquence. Cela le rend idéal pour les dissertations, les articles de blog, les légendes sur les réseaux sociaux, les travaux universitaires et tout texte où la longueur et la densité comptent.',
    es: 'WordTool cuenta palabras, caracteres (con y sin espacios), frases, párrafos y calcula el tiempo de lectura basándose en un promedio de 238 palabras por minuto. También estima el tiempo de habla a 150 palabras por minuto y muestra tus palabras clave principales junto con su frecuencia. Esto lo hace ideal para ensayos, publicaciones de blog, subtítulos en redes sociales, trabajos académicos y cualquier texto donde la extensión y la densidad importan.',
    pt: 'O WordTool conta palavras, caracteres (com e sem espaços), frases, parágrafos e calcula o tempo de leitura com base em uma média de 238 palavras por minuto. Também estima o tempo de fala a 150 palavras por minuto e exibe suas palavras-chave principais junto com sua frequência. Isso o torna ideal para redações, posts de blog, legendas em redes sociais, trabalhos acadêmicos e qualquer texto onde extensão e densidade importam.',
    de: 'WordTool zählt Wörter, Zeichen (mit und ohne Leerzeichen), Sätze, Absätze und berechnet die Lesezeit basierend auf durchschnittlich 238 Wörtern pro Minute. Es schätzt auch die Sprechzeit bei 150 Wörtern pro Minute und zeigt deine Top-Schlüsselwörter mit ihrer Häufigkeit an. Damit ist es ideal für Aufsätze, Blogbeiträge, Social-Media-Texte, wissenschaftliche Arbeiten und jedes Schreiben, bei dem Länge und Dichte wichtig sind.',
  },
  seoH3a: {
    en: 'Why reading time and keyword density matter',
    fr: 'Pourquoi le temps de lecture et la densité des mots-clés comptent',
    es: 'Por qué importan el tiempo de lectura y la densidad de palabras clave',
    pt: 'Por que o tempo de leitura e a densidade de palavras-chave importam',
    de: 'Warum Lesezeit und Schlüsselwortdichte wichtig sind',
  },
  seoP2: {
    en: 'Knowing how long your content takes to read helps you calibrate for your audience. A quick social media caption should take seconds, while an in-depth article might take five to ten minutes. The keyword density panel shows which terms appear most often so you can spot unintentional repetition or confirm that your focus topic comes through clearly, without resorting to keyword stuffing.',
    fr: 'Savoir combien de temps votre contenu prend à lire vous aide à vous calibrer pour votre audience. Une légende rapide sur les réseaux sociaux ne devrait prendre que quelques secondes, tandis qu\'un article approfondi peut nécessiter cinq à dix minutes. Le panneau de densité des mots-clés montre quels termes apparaissent le plus souvent pour que vous puissiez repérer les répétitions involontaires ou confirmer que votre sujet principal ressort clairement, sans recourir au bourrage de mots-clés.',
    es: 'Saber cuánto tiempo tarda tu contenido en leerse te ayuda a calibrarlo para tu audiencia. Un subtítulo rápido en redes sociales debería tomar segundos, mientras que un artículo en profundidad podría llevar de cinco a diez minutos. El panel de densidad de palabras clave muestra qué términos aparecen con más frecuencia para que puedas detectar repeticiones involuntarias o confirmar que tu tema principal se transmite con claridad, sin recurrir al relleno de palabras clave.',
    pt: 'Saber quanto tempo seu conteúdo leva para ser lido ajuda você a se calibrar para seu público. Uma legenda rápida de rede social deve levar segundos, enquanto um artigo aprofundado pode levar de cinco a dez minutos. O painel de densidade de palavras-chave mostra quais termos aparecem com mais frequência para que você possa identificar repetições involuntárias ou confirmar que seu tópico principal está sendo transmitido com clareza, sem recorrer ao excesso de palavras-chave.',
    de: 'Zu wissen, wie lange dein Inhalt zum Lesen braucht, hilft dir, ihn für dein Publikum zu kalibrieren. Eine kurze Social-Media-Beschriftung sollte Sekunden dauern, während ein ausführlicher Artikel fünf bis zehn Minuten beanspruchen kann. Das Schlüsselwort-Dichte-Panel zeigt, welche Begriffe am häufigsten vorkommen, damit du unbeabsichtigte Wiederholungen erkennen oder bestätigen kannst, dass dein Fokusthema klar durchkommt, ohne auf Keyword-Stuffing zurückzugreifen.',
  },
  seoH3b: {
    en: 'Meeting character limits across platforms',
    fr: 'Respecter les limites de caractères sur les différentes plateformes',
    es: 'Cumplir con los límites de caracteres en las plataformas',
    pt: 'Respeitando os limites de caracteres nas plataformas',
    de: 'Zeichenlimits auf verschiedenen Plattformen einhalten',
  },
  seoP3: {
    en: 'Different platforms enforce different limits. X/Twitter allows 280 characters, Instagram captions max out at 2,200, and meta descriptions perform best under 160 characters. WordTool shows both character counts with and without spaces so you can stay within bounds. Paste your text, check the numbers, and trim only what you need to — no guesswork required.',
    fr: 'Différentes plateformes imposent différentes limites. X/Twitter autorise 280 caractères, les légendes Instagram plafonnent à 2 200 et les méta-descriptions fonctionnent mieux sous 160 caractères. WordTool affiche les comptages de caractères avec et sans espaces pour que vous puissiez rester dans les limites. Collez votre texte, vérifiez les chiffres et supprimez uniquement le nécessaire — aucune estimation requise.',
    es: 'Las diferentes plataformas imponen diferentes límites. X/Twitter permite 280 caracteres, los subtítulos de Instagram alcanzan un máximo de 2.200 y las meta descripciones funcionan mejor bajo 160 caracteres. WordTool muestra ambos conteos de caracteres con y sin espacios para que puedas mantenerte dentro de los límites. Pega tu texto, revisa los números y recorta solo lo necesario — sin adivinanzas.',
    pt: 'Diferentes plataformas impõem diferentes limites. X/Twitter permite 280 caracteres, legendas do Instagram chegam a no máximo 2.200 e meta descrições funcionam melhor com menos de 160 caracteres. O WordTool mostra ambas as contagens de caracteres com e sem espaços para que você possa ficar dentro dos limites. Cole seu texto, confira os números e corte apenas o necessário — sem adivinhação.',
    de: 'Verschiedene Plattformen haben unterschiedliche Limits. X/Twitter erlaubt 280 Zeichen, Instagram-Beschriftungen maximal 2.200 und Meta-Beschreibungen funktionieren am besten unter 160 Zeichen. WordTool zeigt beide Zeichenanzahlen mit und ohne Leerzeichen, damit du innerhalb der Grenzen bleibst. Füge deinen Text ein, überprüfe die Zahlen und kürze nur das Nötige — kein Rätselraten erforderlich.',
  },
  seoP4: {
    en: 'After counting your words, use the <a>case converter</a> to fix capitalization issues. If you need placeholder text for a new design, try the <b>lorem ipsum generator</b>. And to compare two versions of your text side by side, the <c>diff checker</c> highlights every change.',
    fr: 'Après avoir compté vos mots, utilisez le <a>convertisseur de casse</a> pour corriger les problèmes de majuscules. Si vous avez besoin d\'un texte de remplissage pour un nouveau design, essayez le <b>générateur de lorem ipsum</b>. Et pour comparer deux versions de votre texte côte à côte, le <c>comparateur de différences</c> met en évidence chaque changement.',
    es: 'Después de contar tus palabras, usa el <a>convertidor de mayúsculas</a> para corregir problemas de capitalización. Si necesitas texto de relleno para un nuevo diseño, prueba el <b>generador de lorem ipsum</b>. Y para comparar dos versiones de tu texto una al lado de la otra, el <c>comparador de diferencias</c> resalta cada cambio.',
    pt: 'Depois de contar suas palavras, use o <a>conversor de maiúsculas</a> para corrigir problemas de capitalização. Se precisar de texto provisório para um novo design, experimente o <b>gerador de lorem ipsum</b>. E para comparar duas versões do seu texto lado a lado, o <c>comparador de diferenças</c> destaca cada alteração.',
    de: 'Nachdem du deine Wörter gezählt hast, nutze den <a>Groß-/Kleinschreibung-Konverter</a> um Kapitalisierungsprobleme zu beheben. Wenn du Platzhaltertext für ein neues Design brauchst, probiere den <b>Lorem-Ipsum-Generator</b>. Und um zwei Versionen deines Textes nebeneinander zu vergleichen, hebt der <c>Diff-Checker</c> jede Änderung hervor.',
  },
}

const StatBox = ({ label, value, mono = false }: { label: string; value: string | number; mono?: boolean }) => (
  <div style={{ background: '#F5F3EE', borderRadius: 12, padding: '16px 18px', textAlign: 'center' }}>
    <div style={{ fontSize: 10, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 6 }}>{label}</div>
    <div style={{ fontSize: 26, fontWeight: 700, fontFamily: mono ? fm : fb, letterSpacing: '-1px', color: '#1C1B18' }}>{value}</div>
  </div>
)

export default function WordCounterClient({ locale = 'en' as Locale }: { locale?: Locale } = {}) {
  const [text, setText] = useState('')
  const stats = useMemo(() => analyze(text), [text])

  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

  return (
    <ToolShell name="Word Counter" icon="¶" currentPath="/word-counter" locale={locale}>
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 860, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>¶</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>WordTool</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>{t('backAllTools', locale)}</a>
        </nav>

        <section style={{ maxWidth: 860, margin: '0 auto', padding: '32px 28px 20px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            {lt('titleWord')} <span style={{ color: '#3B82F6' }}>{lt('titleCounter')}</span>
          </h1>
          <p style={{ fontSize: 15, color: '#6B6560', marginBottom: 28 }}>
            {lt('subtitle')}
          </p>
        </section>

        <section style={{ maxWidth: 860, margin: '0 auto', padding: '0 28px 20px' }}>
          {/* Stats bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 10, marginBottom: 20 }}>
            <StatBox label={lt('words')} value={stats.words} mono />
            <StatBox label={lt('characters')} value={stats.chars} mono />
            <StatBox label={lt('noSpaces')} value={stats.charsNoSpace} mono />
            <StatBox label={lt('sentences')} value={stats.sentences} mono />
            <StatBox label={lt('paragraphs')} value={stats.paragraphs} mono />
            <StatBox label={lt('readingTime')} value={stats.readMin > 0 ? `${stats.readMin}m ${stats.readSec}s` : `${stats.readSec}s`} />
          </div>
        </section>

        <section style={{ maxWidth: 860, margin: '0 auto', padding: '0 28px 20px', display: 'grid', gridTemplateColumns: '1fr 260px', gap: 20 }}>
          {/* Textarea */}
          <div style={{ background: '#fff', borderRadius: 14, border: '2px solid #E8E4DB', overflow: 'hidden' }}>
            <textarea value={text} onChange={e => setText(e.target.value)}
              placeholder={lt('placeholder')}
              style={{
                width: '100%', minHeight: 360, border: 'none', padding: 20, fontSize: 16,
                fontFamily: fb, color: '#1C1B18', resize: 'vertical', outline: 'none', background: 'transparent', lineHeight: 1.7,
              }} />
          </div>

          {/* Keyword density */}
          <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: 20, alignSelf: 'start' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 14 }}>
              {lt('topKeywords')}
            </div>
            {stats.topWords.length === 0 ? (
              <p style={{ fontSize: 13, color: '#B0AAA0', fontStyle: 'italic' }}>{lt('startTyping')}</p>
            ) : (
              stats.topWords.map(([word, count]) => (
                <div key={word} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #F0EDE5' }}>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{word}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: Math.min(count / (stats.topWords[0]?.[1] || 1) * 40, 40), height: 4, borderRadius: 2, background: '#3B82F6' }} />
                    <span style={{ fontSize: 11, fontFamily: fm, color: '#9A958A', minWidth: 18, textAlign: 'right' }}>{count}</span>
                  </div>
                </div>
              ))
            )}
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
              const parts = lt('seoP4').split(/<\/?[abc]>/)
              return <>
                {parts[0]}<a href="/case-converter" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{parts[1]}</a>{parts[2]}<a href="/lorem-generator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{parts[3]}</a>{parts[4]}<a href="/diff-checker" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{parts[5]}</a>{parts[6]}
              </>
            })()}
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
