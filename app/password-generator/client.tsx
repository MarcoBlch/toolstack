'use client'
import { useState, useCallback, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'

const CHARS = { upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', lower: 'abcdefghijklmnopqrstuvwxyz', numbers: '0123456789', symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?' }
const fb = "'Outfit', sans-serif"
const fm = "'JetBrains Mono', monospace"

export default function PassClient({
  defaultLength,
}: {
  defaultLength?: number
} = {}) {
  const [len, setLen] = useState(defaultLength || 16)
  const [opts, setOpts] = useState({ upper: true, lower: true, numbers: true, symbols: true })
  const [passwords, setPasswords] = useState<string[]>([])
  const [copied, setCopied] = useState<number | null>(null)

  const gen = useCallback(() => {
    let cs = ''
    if (opts.upper) cs += CHARS.upper; if (opts.lower) cs += CHARS.lower
    if (opts.numbers) cs += CHARS.numbers; if (opts.symbols) cs += CHARS.symbols
    if (!cs) cs = CHARS.lower
    const a = new Uint32Array(len); crypto.getRandomValues(a)
    const pw = Array.from(a, x => cs[x % cs.length]).join('')
    setPasswords(p => [pw, ...p].slice(0, 6))
  }, [len, opts])

  useEffect(() => { gen() }, [])

  const copy = (pw: string, i: number) => { navigator.clipboard.writeText(pw); setCopied(i); setTimeout(() => setCopied(null), 1500) }

  const strength = (() => {
    let s = Math.min(len * 4, 40); let t = 0
    if (opts.upper) t++; if (opts.lower) t++; if (opts.numbers) t++; if (opts.symbols) t++
    s += t * 15; if (len >= 16) s += 10; if (len >= 24) s += 10
    return Math.min(s, 100)
  })()
  const sInfo = strength >= 80 ? { l: 'Strong', c: '#22A065' } : strength >= 60 ? { l: 'Good', c: '#97C459' } : strength >= 30 ? { l: 'Fair', c: '#EF9F27' } : { l: 'Weak', c: '#E24B4A' }

  return (
    <ToolShell name="Password Generator" icon="⬡" currentPath="/password-generator">
      <div style={{ background: '#0E0E11', minHeight: '100vh', color: '#E8E6F0', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: '#22D97A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0E0E11', fontSize: 12, fontWeight: 800 }}>P</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>PassForge</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#5A586E', textDecoration: 'none' }}>← All tools</a>
        </nav>

        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 6 }}>
            Strong passwords, <span style={{ color: '#22D97A' }}>instantly</span>
          </h1>
          <p style={{ fontSize: 14, color: '#5A586E', marginBottom: 24 }}>Cryptographically secure. Never stored. 100% local.</p>
        </section>

        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 32px' }}>
          {passwords[0] && (
            <div style={{ background: '#17171C', borderRadius: 16, border: '1.5px solid #25252E', padding: '20px 24px', marginBottom: 16 }}>
              <div style={{ fontFamily: fm, fontSize: 'clamp(14px, 2.5vw, 18px)', wordBreak: 'break-all', lineHeight: 1.6, marginBottom: 14, letterSpacing: '.5px' }}>
                {[...passwords[0]].map((ch, i) => (
                  <span key={i} style={{ color: CHARS.symbols.includes(ch) ? '#22D97A' : CHARS.numbers.includes(ch) ? '#8B5CF6' : CHARS.upper.includes(ch) ? '#E8E6F0' : '#8A88A0' }}>{ch}</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <button onClick={() => copy(passwords[0], 0)} style={{ fontFamily: fb, fontSize: 13, fontWeight: 700, padding: '10px 24px', borderRadius: 10, cursor: 'pointer', background: copied === 0 ? '#22D97A15' : '#22D97A', color: copied === 0 ? '#22D97A' : '#0E0E11', border: copied === 0 ? '1.5px solid #22D97A30' : '1.5px solid transparent' }}>
                  {copied === 0 ? 'Copied!' : 'Copy'}
                </button>
                <button onClick={gen} style={{ fontFamily: fb, fontSize: 13, fontWeight: 700, padding: '10px 24px', borderRadius: 10, cursor: 'pointer', background: 'transparent', color: '#8A88A0', border: '1.5px solid #25252E' }}>Regenerate</button>
                <div style={{ flex: 1 }} />
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: sInfo.c, marginBottom: 3 }}>{sInfo.l}</div>
                  <div style={{ width: 80, height: 4, borderRadius: 2, background: '#25252E', overflow: 'hidden' }}>
                    <div style={{ width: `${strength}%`, height: '100%', borderRadius: 2, background: sInfo.c, transition: 'all .3s' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div style={{ background: '#17171C', borderRadius: 16, border: '1.5px solid #25252E', padding: 24, marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#5A586E', textTransform: 'uppercase', letterSpacing: '.8px' }}>Length</span>
              <span style={{ fontFamily: fm, fontSize: 16, fontWeight: 700, color: '#22D97A' }}>{len}</span>
            </div>
            <input type="range" min="6" max="64" value={len} onChange={e => { setLen(+e.target.value); setTimeout(gen, 30) }}
              style={{ width: '100%', accentColor: '#22D97A' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 16 }}>
              {[{ k: 'upper', l: 'A-Z', d: 'Uppercase' }, { k: 'lower', l: 'a-z', d: 'Lowercase' }, { k: 'numbers', l: '0-9', d: 'Numbers' }, { k: 'symbols', l: '!@#', d: 'Symbols' }].map(o => (
                <button key={o.k} onClick={() => { setOpts(p => ({ ...p, [o.k]: !p[o.k as keyof typeof p] })); setTimeout(gen, 30) }}
                  style={{ padding: '12px 14px', borderRadius: 10, cursor: 'pointer', border: `1.5px solid ${opts[o.k as keyof typeof opts] ? '#22D97A30' : '#25252E'}`, background: opts[o.k as keyof typeof opts] ? '#22D97A15' : 'transparent', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontFamily: fm, fontSize: 14, fontWeight: 700, color: opts[o.k as keyof typeof opts] ? '#22D97A' : '#5A586E', minWidth: 28 }}>{o.l}</span>
                  <span style={{ fontSize: 12, color: opts[o.k as keyof typeof opts] ? '#E8E6F0' : '#5A586E' }}>{o.d}</span>
                </button>
              ))}
            </div>
          </div>

          {passwords.length > 1 && (
            <div style={{ background: '#17171C', borderRadius: 16, border: '1.5px solid #25252E', padding: '14px 18px' }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#5A586E', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 10 }}>Recent</div>
              {passwords.slice(1).map((pw, i) => (
                <div key={i} onClick={() => copy(pw, i + 1)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 8px', borderRadius: 8, cursor: 'pointer' }}>
                  <span style={{ fontFamily: fm, fontSize: 12, color: '#8A88A0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, marginRight: 12 }}>{pw}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: copied === i + 1 ? '#22D97A' : '#5A586E', flexShrink: 0 }}>{copied === i + 1 ? 'Copied!' : 'Copy'}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* SEO */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #1C1C24' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free secure password generator</h2>
          <p style={{ fontSize: 13, color: '#5A586E', lineHeight: 1.8 }}>
            PassForge generates cryptographically secure passwords using your browser's built-in Web Crypto API. No passwords are ever sent to a server or stored anywhere. Choose a length between 6 and 64 characters, toggle individual character types on or off, and watch the real-time strength meter update as you adjust settings. Copy any generated password with a single click and move on with confidence.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>Why cryptographic randomness matters</h3>
          <p style={{ fontSize: 13, color: '#5A586E', lineHeight: 1.8 }}>
            Many password generators rely on basic random number functions that can produce predictable patterns. PassForge uses the Web Crypto API, the same cryptographic engine that secures HTTPS connections, to produce truly unpredictable output. This means every character in your password is chosen from a uniform distribution, eliminating biases that attackers could exploit. The result is a password that resists brute-force attacks far better than one you would create by hand.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>Password strength and best practices</h3>
          <p style={{ fontSize: 13, color: '#5A586E', lineHeight: 1.8 }}>
            A strong password is long and includes a mix of uppercase letters, lowercase letters, numbers, and symbols. Aim for at least 16 characters when protecting important accounts. Avoid reusing passwords across services, because a breach on one site can compromise all your other accounts. Use a password manager to store your generated passwords securely. PassForge makes it easy to create a unique, strong password every time you sign up for something new.
          </p>
          <p style={{ fontSize: 13, color: '#5A586E', lineHeight: 1.8, marginTop: 16 }}>
            Need to verify data integrity? Try the <a href="/hash-generator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Hash Generator</a> to create SHA-256 and MD5 hashes. You can also encode sensitive strings with the <a href="/base64" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Base64 Encoder</a> for safe transport in URLs and APIs.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
