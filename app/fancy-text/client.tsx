'use client'
import { useState, useCallback } from 'react'
import ToolShell from '@/components/ToolShell'

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

const CATS = [
  { id: 'all', label: 'All' }, { id: 'classic', label: 'Classic' },
  { id: 'fancy', label: 'Fancy' }, { id: 'style', label: 'Style' },
  { id: 'shape', label: 'Shape' }, { id: 'fun', label: 'Fun' },
  { id: 'effect', label: 'Effects' }, { id: 'deco', label: 'Decorative' },
]

export default function FancyTextClient() {
  const [input, setInput] = useState('')
  const [cat, setCat] = useState('all')
  const [copied, setCopied] = useState<number | null>(null)

  const filtered = cat === 'all' ? STYLES : STYLES.filter(s => s.cat === cat)

  const handleCopy = useCallback((text: string, idx: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(idx)
      setTimeout(() => setCopied(null), 1500)
    })
  }, [])

  return (
    <ToolShell name="Fancy Text Generator" icon="✦" currentPath="/fancy-text">
      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      <div style={{ background: '#FFFBF5', minHeight: '100vh', color: '#1C1B18', fontFamily: "'Outfit', sans-serif" }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 860, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 22 }}>✦</span>
            <span style={{ fontSize: 17, fontWeight: 700 }}>FancyType</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>← All tools</a>
        </nav>

        <section style={{ maxWidth: 860, margin: '0 auto', padding: '48px 28px 20px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-1px', marginBottom: 10 }}>
            Make your text <span style={{ color: '#FF6B35', fontStyle: 'italic' }}>fancy</span>
          </h1>
          <p style={{ fontSize: 15, color: '#6B6560', maxWidth: 420, margin: '0 auto 32px' }}>
            Type anything. Copy a style. Paste it on Instagram, TikTok, X, or anywhere.
          </p>

          <div style={{ maxWidth: 580, margin: '0 auto 28px', background: '#fff', borderRadius: 14, border: '2px solid #E8E4DB', overflow: 'hidden' }}>
            <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Type or paste your text here..."
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
              }}>{c.label}</button>
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
                  }}>{isCopied ? 'Copied!' : 'Copy'}</button>
                </div>
              )
            })}
          </div>
        </section>

        <section style={{ maxWidth: 640, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free fancy text generator for Instagram, TikTok & more</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            FancyType converts your regular text into stylish Unicode fonts that work everywhere — Instagram bios, TikTok usernames, X/Twitter posts, Discord, WhatsApp, and any platform that supports text. Choose from 20+ styles including bold, italic, script, cursive, double-struck, fraktur, small caps, bubble letters, and decorative frames. Simply type, pick a style, click copy, and paste.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
