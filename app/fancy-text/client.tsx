'use client'
import { useState, useCallback } from 'react'
import ToolShell from '@/components/ToolShell'
import { t, type Locale } from '@/lib/i18n'

const makeMapper = (u: number, l: number, d: number | null = null) => (text: string) =>
  [...text].map(ch => {
    const c = ch.charCodeAt(0)
    if (c >= 65 && c <= 90 && u) return String.fromCodePoint(u + (c - 65))
    if (c >= 97 && c <= 122 && l) return String.fromCodePoint(l + (c - 97))
    if (c >= 48 && c <= 57 && d) return String.fromCodePoint(d + (c - 48))
    return ch
  }).join('')

const combiner = (ch: string) => (t: string) => [...t].map(c => c === ' ' ? ' ' : c + ch).join('')
const scMap = 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢ'
const smallCaps = (t: string) => [...t].map(c => { const i = c.toLowerCase().charCodeAt(0) - 97; return i >= 0 && i < 26 ? scMap[i] : c }).join('')
const flipMap: Record<string, string> = { a:'ɐ',b:'q',c:'ɔ',d:'p',e:'ǝ',f:'ɟ',g:'ƃ',h:'ɥ',i:'ᴉ',j:'ɾ',k:'ʞ',l:'l',m:'ɯ',n:'u',o:'o',p:'d',q:'b',r:'ɹ',s:'s',t:'ʇ',u:'n',v:'ʌ',w:'ʍ',x:'x',y:'ʎ',z:'z',A:'∀',B:'ᗺ',C:'Ɔ',D:'ᗡ',E:'Ǝ',F:'Ⅎ',G:'⅁',H:'H',I:'I',J:'ſ',K:'ʞ',L:'˥',M:'W',N:'N',O:'O',P:'Ԁ',R:'ᴚ',S:'S',T:'⊥',U:'∩',V:'Λ',W:'M',X:'X',Y:'⅄',Z:'Z' }
const flip = (t: string) => [...t].reverse().map(c => flipMap[c] || c).join('')
const bubble = (t: string) => [...t].map(c => { const v = c.charCodeAt(0); if (v>=65&&v<=90) return String.fromCodePoint(0x24B6+(v-65)); if (v>=97&&v<=122) return String.fromCodePoint(0x24D0+(v-97)); return c }).join('')
const fullwidth = (t: string) => [...t].map(c => { const v = c.charCodeAt(0); if (v>=33&&v<=126) return String.fromCodePoint(0xFF01+(v-33)); if (v===32) return '\u3000'; return c }).join('')

const STYLES = [
  { name: 'Bold', fn: makeMapper(0x1D400, 0x1D41A, 0x1D7CE), preview: '𝐇𝐞𝐥𝐥𝐨', cat: 'classic' },
  { name: 'Italic', fn: makeMapper(0x1D434, 0x1D44E), preview: '𝐻𝑒𝑙𝑙𝑜', cat: 'classic' },
  { name: 'Bold Italic', fn: makeMapper(0x1D468, 0x1D482), preview: '𝑯𝒆𝒍𝒍𝒐', cat: 'classic' },
  { name: 'Script', fn: makeMapper(0x1D49C, 0x1D4B6), preview: '𝒽ℯ𝓁𝓁ℴ', cat: 'fancy' },
  { name: 'Bold Script', fn: makeMapper(0x1D4D0, 0x1D4EA), preview: '𝓗𝓮𝓵𝓵𝓸', cat: 'fancy' },
  { name: 'Fraktur', fn: makeMapper(0x1D504, 0x1D51E), preview: '𝔥𝔢𝔩𝔩𝔬', cat: 'fancy' },
  { name: 'Double Struck', fn: makeMapper(0x1D538, 0x1D552, 0x1D7D8), preview: 'ℍ𝕖𝕝𝕝𝕠', cat: 'fancy' },
  { name: 'Sans Bold', fn: makeMapper(0x1D5D4, 0x1D5EE, 0x1D7EC), preview: '𝗛𝗲𝗹𝗹𝗼', cat: 'classic' },
  { name: 'Monospace', fn: makeMapper(0x1D670, 0x1D68A, 0x1D7F6), preview: '𝙷𝚎𝚕𝚕𝚘', cat: 'classic' },
  { name: 'Small Caps', fn: smallCaps, preview: 'ʜᴇʟʟᴏ', cat: 'style' },
  { name: 'Circled', fn: bubble, preview: 'Ⓗⓔⓛⓛⓞ', cat: 'shape' },
  { name: 'Upside Down', fn: flip, preview: 'ollǝH', cat: 'fun' },
  { name: 'Vaporwave', fn: fullwidth, preview: 'Ｈｅｌｌｏ', cat: 'style' },
  { name: 'A E S T H E T I C', fn: (t: string) => [...t].join(' ').toUpperCase(), preview: 'H E L L O', cat: 'style' },
  { name: 'Strikethrough', fn: combiner('\u0336'), preview: 'H̶e̶l̶l̶o̶', cat: 'effect' },
  { name: 'Underline', fn: combiner('\u0332'), preview: 'H̲e̲l̲l̲o̲', cat: 'effect' },
  { name: 'Sparkles', fn: (t: string) => [...t].map(c => c === ' ' ? ' ' : c + '✦').join(''), preview: 'H✦e✦l✦l✦o✦', cat: 'deco' },
  { name: 'Flower Frame', fn: (t: string) => '⋆˚✿˖° ' + t + ' °˖✿˚⋆', preview: '⋆˚✿˖° Hello °˖✿˚⋆', cat: 'deco' },
  { name: 'Royal Frame', fn: (t: string) => '꧁ ' + t + ' ꧂', preview: '꧁ Hello ꧂', cat: 'deco' },
  { name: 'Hearts', fn: (t: string) => [...t].map(c => c === ' ' ? ' ' : c + '♡').join(''), preview: 'H♡e♡l♡l♡o♡', cat: 'deco' },
]

const LABELS: Record<string, Record<Locale, string>> = {
  // Title
  makeYourText: { en: 'Make your text', fr: 'Rendez votre texte', es: 'Haz tu texto', pt: 'Deixe seu texto', de: 'Mach deinen Text' },
  fancy: { en: 'fancy', fr: 'stylé', es: 'elegante', pt: 'estiloso', de: 'fancy' },
  subtitle: {
    en: 'Type anything. Copy a style. Paste it on Instagram, TikTok, X, or anywhere.',
    fr: 'Tapez ce que vous voulez. Copiez un style. Collez-le sur Instagram, TikTok, X ou ailleurs.',
    es: 'Escribe lo que quieras. Copia un estilo. Pégalo en Instagram, TikTok, X o donde quieras.',
    pt: 'Digite qualquer coisa. Copie um estilo. Cole no Instagram, TikTok, X ou em qualquer lugar.',
    de: 'Tippe etwas ein. Kopiere einen Stil. Füge ihn auf Instagram, TikTok, X oder überall ein.',
  },
  placeholder: {
    en: 'Type or paste your text here...',
    fr: 'Tapez ou collez votre texte ici...',
    es: 'Escribe o pega tu texto aquí...',
    pt: 'Digite ou cole seu texto aqui...',
    de: 'Text hier eingeben oder einfügen...',
  },

  // Category filters
  catAll: { en: 'All', fr: 'Tous', es: 'Todos', pt: 'Todos', de: 'Alle' },
  catClassic: { en: 'Classic', fr: 'Classique', es: 'Clásico', pt: 'Clássico', de: 'Klassisch' },
  catFancy: { en: 'Fancy', fr: 'Fantaisie', es: 'Fantasía', pt: 'Fantasia', de: 'Ausgefallen' },
  catStyle: { en: 'Style', fr: 'Style', es: 'Estilo', pt: 'Estilo', de: 'Stil' },
  catShape: { en: 'Shape', fr: 'Forme', es: 'Forma', pt: 'Forma', de: 'Form' },
  catFun: { en: 'Fun', fr: 'Amusant', es: 'Divertido', pt: 'Divertido', de: 'Spaß' },
  catEffects: { en: 'Effects', fr: 'Effets', es: 'Efectos', pt: 'Efeitos', de: 'Effekte' },
  catDecorative: { en: 'Decorative', fr: 'Décoratif', es: 'Decorativo', pt: 'Decorativo', de: 'Dekorativ' },

  // SEO section
  seoH2: {
    en: 'Free fancy text generator for Instagram, TikTok & more',
    fr: 'Générateur de texte stylé gratuit pour Instagram, TikTok et plus',
    es: 'Generador de texto elegante gratis para Instagram, TikTok y más',
    pt: 'Gerador de texto estilizado grátis para Instagram, TikTok e mais',
    de: 'Kostenloser Fancy-Text-Generator für Instagram, TikTok & mehr',
  },
  seoP1: {
    en: 'FancyType converts your regular text into stylish Unicode fonts that work everywhere — Instagram bios, TikTok usernames, X/Twitter posts, Discord, WhatsApp, and any platform that supports text. Choose from 20+ styles including bold, italic, script, cursive, double-struck, fraktur, small caps, bubble letters, and decorative frames. Simply type, pick a style, click copy, and paste it wherever you want to stand out.',
    fr: 'FancyType convertit votre texte ordinaire en polices Unicode élégantes qui fonctionnent partout — bios Instagram, noms d\'utilisateur TikTok, publications X/Twitter, Discord, WhatsApp et toute plateforme supportant le texte. Choisissez parmi plus de 20 styles dont le gras, l\'italique, le script, le cursif, le double-barré, le fraktur, les petites majuscules, les lettres cerclées et les cadres décoratifs. Tapez, choisissez un style, cliquez sur copier et collez-le où vous voulez vous démarquer.',
    es: 'FancyType convierte tu texto normal en elegantes fuentes Unicode que funcionan en todas partes — bios de Instagram, nombres de usuario de TikTok, publicaciones de X/Twitter, Discord, WhatsApp y cualquier plataforma que soporte texto. Elige entre más de 20 estilos incluyendo negrita, cursiva, script, doble raya, fraktur, versalitas, letras circulares y marcos decorativos. Simplemente escribe, elige un estilo, haz clic en copiar y pégalo donde quieras destacar.',
    pt: 'O FancyType converte seu texto comum em fontes Unicode estilosas que funcionam em qualquer lugar — bios do Instagram, nomes de usuário do TikTok, posts do X/Twitter, Discord, WhatsApp e qualquer plataforma que suporte texto. Escolha entre mais de 20 estilos incluindo negrito, itálico, script, cursivo, duplo traço, fraktur, versaletes, letras circulares e molduras decorativas. Basta digitar, escolher um estilo, clicar em copiar e colar onde quiser se destacar.',
    de: 'FancyType wandelt deinen normalen Text in stilvolle Unicode-Schriften um, die überall funktionieren — Instagram-Bios, TikTok-Benutzernamen, X/Twitter-Posts, Discord, WhatsApp und jede Plattform, die Text unterstützt. Wähle aus über 20 Stilen wie Fett, Kursiv, Schreibschrift, Fraktur, Doppelstrich, Kapitälchen, Kreisbuchstaben und dekorative Rahmen. Einfach tippen, einen Stil wählen, auf Kopieren klicken und dort einfügen, wo du auffallen willst.',
  },
  seoH3a: {
    en: 'How Unicode font styles work',
    fr: 'Comment fonctionnent les styles de polices Unicode',
    es: 'Cómo funcionan los estilos de fuentes Unicode',
    pt: 'Como funcionam os estilos de fontes Unicode',
    de: 'Wie Unicode-Schriftstile funktionieren',
  },
  seoP2: {
    en: 'Unlike regular fonts that depend on the platform you are using, Unicode text styles are built into the character set itself. Each "fancy" letter is actually a separate Unicode code point, which means it displays correctly on virtually every device and operating system without requiring any special font installation. This is why your styled text looks the same whether someone views it on an iPhone, Android phone, Windows PC, or Mac.',
    fr: 'Contrairement aux polices classiques qui dépendent de la plateforme utilisée, les styles de texte Unicode sont intégrés dans le jeu de caractères lui-même. Chaque lettre « stylée » est en réalité un point de code Unicode distinct, ce qui signifie qu\'elle s\'affiche correctement sur pratiquement tous les appareils et systèmes d\'exploitation sans nécessiter l\'installation d\'une police spéciale. C\'est pourquoi votre texte stylé a le même rendu que ce soit sur un iPhone, un téléphone Android, un PC Windows ou un Mac.',
    es: 'A diferencia de las fuentes normales que dependen de la plataforma que estás usando, los estilos de texto Unicode están integrados en el conjunto de caracteres. Cada letra "elegante" es en realidad un punto de código Unicode separado, lo que significa que se muestra correctamente en prácticamente cualquier dispositivo y sistema operativo sin necesidad de instalar ninguna fuente especial. Por eso tu texto estilizado se ve igual ya sea que alguien lo vea en un iPhone, un teléfono Android, un PC con Windows o un Mac.',
    pt: 'Ao contrário das fontes normais que dependem da plataforma que você está usando, os estilos de texto Unicode são incorporados no próprio conjunto de caracteres. Cada letra "estilizada" é na verdade um ponto de código Unicode separado, o que significa que ela é exibida corretamente em praticamente qualquer dispositivo e sistema operacional sem necessitar de instalação de fonte especial. Por isso seu texto estilizado fica igual seja visualizado em um iPhone, Android, PC Windows ou Mac.',
    de: 'Im Gegensatz zu normalen Schriftarten, die von der verwendeten Plattform abhängen, sind Unicode-Textstile in den Zeichensatz selbst eingebaut. Jeder „fancy" Buchstabe ist tatsächlich ein separater Unicode-Codepunkt, was bedeutet, dass er auf praktisch jedem Gerät und Betriebssystem korrekt angezeigt wird, ohne dass eine spezielle Schriftart installiert werden muss. Deshalb sieht dein gestylter Text gleich aus, egal ob ihn jemand auf einem iPhone, Android-Telefon, Windows-PC oder Mac betrachtet.',
  },
  seoH3b: {
    en: 'Best uses for fancy text on social media',
    fr: 'Meilleures utilisations du texte stylé sur les réseaux sociaux',
    es: 'Mejores usos del texto elegante en redes sociales',
    pt: 'Melhores usos para texto estilizado nas redes sociais',
    de: 'Beste Verwendungen für Fancy-Text in sozialen Medien',
  },
  seoP3: {
    en: 'Styled text is a simple way to make your social media profiles and posts more eye-catching. Many creators use bold or italic Unicode text in their Instagram bios to highlight key information. On TikTok, unique usernames with script or double-struck letters help you stand out. The same applies to Discord server names, YouTube channel descriptions, and X/Twitter posts where you want to draw attention to specific words.',
    fr: 'Le texte stylé est un moyen simple de rendre vos profils et publications sur les réseaux sociaux plus accrocheurs. De nombreux créateurs utilisent du texte Unicode en gras ou en italique dans leurs bios Instagram pour mettre en valeur des informations clés. Sur TikTok, des noms d\'utilisateur uniques avec des lettres script ou double-barré vous aident à vous démarquer. Il en va de même pour les noms de serveurs Discord, les descriptions de chaînes YouTube et les publications X/Twitter où vous souhaitez attirer l\'attention sur des mots spécifiques.',
    es: 'El texto estilizado es una forma sencilla de hacer que tus perfiles y publicaciones en redes sociales sean más llamativos. Muchos creadores usan texto Unicode en negrita o cursiva en sus bios de Instagram para resaltar información clave. En TikTok, nombres de usuario únicos con letras script o doble raya te ayudan a destacar. Lo mismo aplica para nombres de servidores de Discord, descripciones de canales de YouTube y publicaciones de X/Twitter donde quieres llamar la atención sobre palabras específicas.',
    pt: 'Texto estilizado é uma forma simples de tornar seus perfis e publicações nas redes sociais mais atraentes. Muitos criadores usam texto Unicode em negrito ou itálico em suas bios do Instagram para destacar informações importantes. No TikTok, nomes de usuário únicos com letras script ou duplo traço ajudam você a se destacar. O mesmo se aplica a nomes de servidores Discord, descrições de canais do YouTube e publicações no X/Twitter onde você quer chamar atenção para palavras específicas.',
    de: 'Gestylter Text ist eine einfache Möglichkeit, deine Social-Media-Profile und Posts auffälliger zu gestalten. Viele Creator nutzen fetten oder kursiven Unicode-Text in ihren Instagram-Bios, um wichtige Informationen hervorzuheben. Auf TikTok helfen einzigartige Benutzernamen mit Schreibschrift oder Doppelstrich-Buchstaben dir aufzufallen. Das gilt auch für Discord-Servernamen, YouTube-Kanalbeschreibungen und X/Twitter-Posts, bei denen du Aufmerksamkeit auf bestimmte Wörter lenken willst.',
  },
  seoP4: {
    en: 'Need to check your text length after styling? Use our <a>word counter</a> to verify character counts. You can also try the <b>case converter</b> for standard capitalization changes, or browse the <c>emoji picker</c> to pair emojis with your fancy text.',
    fr: 'Besoin de vérifier la longueur de votre texte après le stylage ? Utilisez notre <a>compteur de mots</a> pour vérifier le nombre de caractères. Vous pouvez aussi essayer le <b>convertisseur de casse</b> pour les changements de majuscules standard, ou parcourir le <c>sélecteur d\'emojis</c> pour associer des emojis à votre texte stylé.',
    es: '¿Necesitas comprobar la longitud de tu texto después de estilizarlo? Usa nuestro <a>contador de palabras</a> para verificar el conteo de caracteres. También puedes probar el <b>convertidor de mayúsculas</b> para cambios de capitalización estándar, o explorar el <c>selector de emojis</c> para combinar emojis con tu texto elegante.',
    pt: 'Precisa verificar o tamanho do seu texto depois de estilizá-lo? Use nosso <a>contador de palavras</a> para verificar a contagem de caracteres. Você também pode experimentar o <b>conversor de maiúsculas</b> para mudanças de capitalização padrão, ou navegar pelo <c>seletor de emojis</c> para combinar emojis com seu texto estilizado.',
    de: 'Musst du die Textlänge nach dem Styling prüfen? Nutze unseren <a>Wortzähler</a> zur Überprüfung der Zeichenanzahl. Du kannst auch den <b>Groß-/Kleinschreibung-Konverter</b> für Standard-Änderungen der Großschreibung ausprobieren, oder den <c>Emoji-Picker</c> durchstöbern, um Emojis mit deinem Fancy-Text zu kombinieren.',
  },
}

const CAT_KEYS: Record<string, string> = {
  all: 'catAll', classic: 'catClassic', fancy: 'catFancy', style: 'catStyle',
  shape: 'catShape', fun: 'catFun', effect: 'catEffects', deco: 'catDecorative',
}

const CATS = [
  { id: 'all' }, { id: 'classic' }, { id: 'fancy' }, { id: 'style' },
  { id: 'shape' }, { id: 'fun' }, { id: 'effect' }, { id: 'deco' },
]

export default function FancyTextClient({ locale = 'en' as Locale }: { locale?: Locale } = {}) {
  const [input, setInput] = useState('')
  const [cat, setCat] = useState('all')
  const [copied, setCopied] = useState<number | null>(null)

  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

  const filtered = cat === 'all' ? STYLES : STYLES.filter(s => s.cat === cat)

  const handleCopy = useCallback((text: string, idx: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(idx)
      setTimeout(() => setCopied(null), 1500)
    })
  }, [])

  return (
    <ToolShell name="Fancy Text Generator" icon="✦" currentPath="/fancy-text" locale={locale}>
      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      <div style={{ background: '#FFFBF5', minHeight: '100vh', color: '#1C1B18', fontFamily: "'Outfit', sans-serif" }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 860, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 22 }}>✦</span>
            <span style={{ fontSize: 17, fontWeight: 700 }}>FancyType</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>{t('backAllTools', locale)}</a>
        </nav>

        <section style={{ maxWidth: 860, margin: '0 auto', padding: '48px 28px 20px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-1px', marginBottom: 10 }}>
            {lt('makeYourText')} <span style={{ color: '#FF6B35', fontStyle: 'italic' }}>{lt('fancy')}</span>
          </h1>
          <p style={{ fontSize: 15, color: '#6B6560', maxWidth: 420, margin: '0 auto 32px' }}>
            {lt('subtitle')}
          </p>

          <div style={{ maxWidth: 580, margin: '0 auto 28px', background: '#fff', borderRadius: 14, border: '2px solid #E8E4DB', overflow: 'hidden' }}>
            <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={lt('placeholder')}
              rows={3} style={{ width: '100%', border: 'none', padding: 18, fontSize: 17, fontFamily: "'Outfit',sans-serif", color: '#1C1B18', resize: 'none', outline: 'none', background: 'transparent' }} />
          </div>

          <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
            {CATS.map(c => (
              <button key={c.id} onClick={() => setCat(c.id)} style={{
                fontFamily: "'Outfit',sans-serif", fontSize: 13, fontWeight: 600,
                padding: '7px 16px', borderRadius: 100, cursor: 'pointer',
                border: cat === c.id ? '1.5px solid #FF6B35' : '1.5px solid #E8E4DB',
                background: cat === c.id ? '#FF6B3510' : 'transparent',
                color: cat === c.id ? '#FF6B35' : '#6B6560',
              }}>{lt(CAT_KEYS[c.id])}</button>
            ))}
          </div>
        </section>

        <section style={{ maxWidth: 860, margin: '0 auto', padding: '0 28px 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 10 }}>
            {filtered.map((style, i) => {
              const result = input ? style.fn(input) : style.preview
              const isCopied = copied === i
              return (
                <div key={style.name} onClick={() => input && handleCopy(result, i)} style={{
                  background: '#fff', borderRadius: 12, border: `1.5px solid ${isCopied ? '#22A065' : '#E8E4DB'}`,
                  padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
                  cursor: input ? 'pointer' : 'default', transition: 'all .15s',
                  animation: `fadeIn .3s ${i * 0.02}s ease-out both`,
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 5 }}>{style.name}</div>
                    <div style={{ fontSize: 16, wordBreak: 'break-word', color: input ? '#1C1B18' : '#B0AAA0', fontStyle: input ? 'normal' : 'italic', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as any }}>{result}</div>
                  </div>
                  <button onClick={e => { e.stopPropagation(); input && handleCopy(result, i) }} disabled={!input} style={{
                    fontFamily: "'Outfit',sans-serif", fontSize: 12, fontWeight: 700,
                    padding: '7px 14px', borderRadius: 7, border: `1.5px solid ${isCopied ? '#22A065' : '#E8E4DB'}`,
                    background: isCopied ? '#22A06510' : 'transparent', color: isCopied ? '#22A065' : '#6B6560',
                    cursor: input ? 'pointer' : 'default', flexShrink: 0,
                  }}>{isCopied ? t('copied', locale) : t('copy', locale)}</button>
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
              const parts = lt('seoP4').split(/<\/?[abc]>/)
              return <>
                {parts[0]}<a href="/word-counter" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{parts[1]}</a>{parts[2]}<a href="/case-converter" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{parts[3]}</a>{parts[4]}<a href="/emoji-picker" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{parts[5]}</a>{parts[6]}
              </>
            })()}
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
