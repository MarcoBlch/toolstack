'use client'
import { useState, useCallback, useRef } from 'react'
import ToolShell from '@/components/ToolShell'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

const ALGOS = [
  { id: 'MD5', webCrypto: null, label: 'MD5' },
  { id: 'SHA-1', webCrypto: 'SHA-1', label: 'SHA-1' },
  { id: 'SHA-256', webCrypto: 'SHA-256', label: 'SHA-256' },
  { id: 'SHA-384', webCrypto: 'SHA-384', label: 'SHA-384' },
  { id: 'SHA-512', webCrypto: 'SHA-512', label: 'SHA-512' },
]

// Simple MD5 implementation (Web Crypto doesn't support MD5)
function md5(str: string): string {
  function rotl(n: number, b: number) { return (n << b) | (n >>> (32 - b)) }
  function fF(b: number, c: number, d: number) { return (b & c) | (~b & d) }
  function fG(b: number, c: number, d: number) { return (b & d) | (c & ~d) }
  function fH(b: number, c: number, d: number) { return b ^ c ^ d }
  function fI(b: number, c: number, d: number) { return c ^ (b | ~d) }

  const bytes: number[] = []
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i)
    if (c < 128) bytes.push(c)
    else if (c < 2048) { bytes.push(192 | (c >> 6)); bytes.push(128 | (c & 63)) }
    else { bytes.push(224 | (c >> 12)); bytes.push(128 | ((c >> 6) & 63)); bytes.push(128 | (c & 63)) }
  }

  const bitLen = bytes.length * 8
  bytes.push(0x80)
  while (bytes.length % 64 !== 56) bytes.push(0)
  for (let i = 0; i < 8; i++) bytes.push((bitLen >>> (i * 8)) & 0xff)

  const K = [
    0xd76aa478,0xe8c7b756,0x242070db,0xc1bdceee,0xf57c0faf,0x4787c62a,0xa8304613,0xfd469501,
    0x698098d8,0x8b44f7af,0xffff5bb1,0x895cd7be,0x6b901122,0xfd987193,0xa679438e,0x49b40821,
    0xf61e2562,0xc040b340,0x265e5a51,0xe9b6c7aa,0xd62f105d,0x02441453,0xd8a1e681,0xe7d3fbc8,
    0x21e1cde6,0xc33707d6,0xf4d50d87,0x455a14ed,0xa9e3e905,0xfcefa3f8,0x676f02d9,0x8d2a4c8a,
    0xfffa3942,0x8771f681,0x6d9d6122,0xfde5380c,0xa4beea44,0x4bdecfa9,0xf6bb4b60,0xbebfbc70,
    0x289b7ec6,0xeaa127fa,0xd4ef3085,0x04881d05,0xd9d4d039,0xe6db99e5,0x1fa27cf8,0xc4ac5665,
    0xf4292244,0x432aff97,0xab9423a7,0xfc93a039,0x655b59c3,0x8f0ccc92,0xffeff47d,0x85845dd1,
    0x6fa87e4f,0xfe2ce6e0,0xa3014314,0x4e0811a1,0xf7537e82,0xbd3af235,0x2ad7d2bb,0xeb86d391
  ]
  const S = [7,12,17,22,7,12,17,22,7,12,17,22,7,12,17,22,5,9,14,20,5,9,14,20,5,9,14,20,5,9,14,20,4,11,16,23,4,11,16,23,4,11,16,23,4,11,16,23,6,10,15,21,6,10,15,21,6,10,15,21,6,10,15,21]

  let a0 = 0x67452301, b0 = 0xefcdab89, c0 = 0x98badcfe, d0 = 0x10325476

  for (let off = 0; off < bytes.length; off += 64) {
    const M: number[] = []
    for (let j = 0; j < 16; j++) M[j] = bytes[off+j*4] | (bytes[off+j*4+1]<<8) | (bytes[off+j*4+2]<<16) | (bytes[off+j*4+3]<<24)
    let a = a0, b = b0, c = c0, d = d0
    for (let i = 0; i < 64; i++) {
      let f: number, g: number
      if (i < 16) { f = fF(b,c,d); g = i }
      else if (i < 32) { f = fG(b,c,d); g = (5*i+1)%16 }
      else if (i < 48) { f = fH(b,c,d); g = (3*i+5)%16 }
      else { f = fI(b,c,d); g = (7*i)%16 }
      const tmp = d; d = c; c = b; b = (b + rotl((a + f + K[i] + M[g]) | 0, S[i])) | 0; a = tmp
    }
    a0 = (a0 + a) | 0; b0 = (b0 + b) | 0; c0 = (c0 + c) | 0; d0 = (d0 + d) | 0
  }

  const hex = (n: number) => Array.from({length:4},(_,i)=>((n>>>(i*8))&0xff).toString(16).padStart(2,'0')).join('')
  return hex(a0) + hex(b0) + hex(c0) + hex(d0)
}

async function hashText(text: string, algo: string): Promise<string> {
  if (algo === 'MD5') return md5(text)
  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  const hashBuffer = await crypto.subtle.digest(algo, data)
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('')
}

type HashResult = { algo: string; hash: string }

export default function HashClient({
  defaultInput,
}: {
  defaultInput?: string
} = {}) {
  const [input, setInput] = useState(defaultInput || '')
  const [results, setResults] = useState<HashResult[]>([])
  const [copied, setCopied] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const generateAll = useCallback(async (text: string) => {
    if (!text) { setResults([]); return }
    setLoading(true)
    const hashes: HashResult[] = []
    for (const algo of ALGOS) {
      const hash = await hashText(text, algo.webCrypto || algo.id)
      hashes.push({ algo: algo.label, hash })
    }
    setResults(hashes)
    setLoading(false)
  }, [])

  const handleInput = (text: string) => {
    setInput(text)
    generateAll(text)
  }

  const copy = (hash: string, algo: string) => {
    navigator.clipboard.writeText(hash)
    setCopied(algo)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <ToolShell name="Hash Generator" icon="#" currentPath="/hash-generator">
      <div style={{ background: '#0E0E11', minHeight: '100vh', color: '#E8E6F0', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 760, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: '#22C55E', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0E0E11', fontSize: 13, fontWeight: 800 }}>#</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>HashCalc</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#5A586E', textDecoration: 'none' }}>← All tools</a>
        </nav>

        <section style={{ maxWidth: 760, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            Hash <span style={{ color: '#22C55E' }}>generator</span>
          </h1>
          <p style={{ fontSize: 14, color: '#5A586E', marginBottom: 20 }}>MD5, SHA-1, SHA-256, SHA-384, SHA-512 — all at once.</p>
        </section>

        <section style={{ maxWidth: 760, margin: '0 auto', padding: '0 28px 20px' }}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: '#5A586E', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 6 }}>Input text</div>
            <textarea value={input} onChange={e => handleInput(e.target.value)}
              placeholder="Enter text to hash..."
              style={{
                width: '100%', minHeight: 120, background: '#17171C', border: '1.5px solid #25252E',
                borderRadius: 12, padding: 16, fontSize: 14, fontFamily: fm, color: '#E8E6F0',
                resize: 'vertical', outline: 'none', lineHeight: 1.6,
              }} />
          </div>

          {results.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {results.map(r => (
                <div key={r.algo} onClick={() => copy(r.hash, r.algo)} style={{
                  background: '#17171C', borderRadius: 12, border: `1.5px solid ${copied === r.algo ? '#22C55E30' : '#25252E'}`,
                  padding: '14px 18px', cursor: 'pointer', transition: 'all .15s',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#22C55E', fontFamily: fm }}>{r.algo}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: copied === r.algo ? '#22C55E' : '#5A586E' }}>
                      {copied === r.algo ? 'Copied!' : 'Click to copy'}
                    </span>
                  </div>
                  <div style={{ fontFamily: fm, fontSize: 12, color: '#8A88A0', wordBreak: 'break-all', lineHeight: 1.5 }}>
                    {r.hash}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section style={{ maxWidth: 640, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #1C1C24' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free hash generator</h2>
          <p style={{ fontSize: 13, color: '#5A586E', lineHeight: 1.8 }}>
            HashCalc generates MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes from any text input. Uses the Web Crypto API for hardware-accelerated hashing (except MD5 which uses a JavaScript implementation). All computation happens locally in your browser — your data is never transmitted.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
