'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"
const accent = '#8B5CF6'

const labelStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, color: '#9A958A',
  textTransform: 'uppercase', letterSpacing: '.8px',
  display: 'block', marginBottom: 4,
}
const inputStyle: React.CSSProperties = {
  width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8,
  padding: '10px 12px', fontSize: 14, fontFamily: fb, color: '#1C1B18',
  background: '#F5F3EE', outline: 'none',
}

const PREFIXES = ['Go', 'My', 'The', 'Quick', 'Smart', 'Pro', 'Easy', 'Open', 'True', 'Nova', 'Neo', 'Zen', 'Bright', 'Swift', 'Peak', 'Core', 'Apex', 'Flux']
const SUFFIXES = ['ly', 'ify', 'Hub', 'Lab', 'Box', 'Stack', 'Flow', 'Base', 'Craft', 'Wave', 'Mind', 'Forge', 'Works', 'Space', 'Nest', 'Sync']

const INDUSTRY_TERMS: Record<string, string[]> = {
  Tech: ['digital', 'byte', 'code', 'pixel', 'data', 'cloud', 'logic', 'nano'],
  Food: ['fresh', 'taste', 'bite', 'spice', 'harvest', 'kitchen', 'plate', 'savor'],
  Fashion: ['style', 'thread', 'velvet', 'loom', 'drape', 'stitch', 'luxe', 'charm'],
  Health: ['vita', 'pulse', 'glow', 'bloom', 'care', 'zen', 'pure', 'thrive'],
  Finance: ['vault', 'ledger', 'capital', 'mint', 'equity', 'wealth', 'fund', 'coin'],
  Creative: ['spark', 'muse', 'ink', 'canvas', 'prism', 'hue', 'craft', 'vision'],
  Retail: ['shop', 'cart', 'market', 'deal', 'shelf', 'store', 'goods', 'pick'],
  Service: ['trust', 'link', 'bridge', 'assist', 'solve', 'path', 'reach', 'guide'],
}

const STYLE_TAGS: Record<string, string> = {
  Modern: 'Modern',
  Classic: 'Classic',
  Fun: 'Creative',
  Professional: 'Professional',
  Minimal: 'Minimal',
}

// Simple hash function for deterministic-ish generation
function simpleHash(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function dropLastVowel(s: string): string {
  const vowels = 'aeiouAEIOU'
  for (let i = s.length - 1; i >= 1; i--) {
    if (vowels.includes(s[i])) {
      return s.slice(0, i) + s.slice(i + 1)
    }
  }
  return s
}

function generateNames(keywords: string, industry: string, style: string, seed: number): { name: string; tag: string }[] {
  const kws = keywords.trim().split(/\s+/).filter(Boolean).slice(0, 3)
  const baseWord = kws[0] || 'brand'
  const allKws = kws.join('')
  const hash = simpleHash(allKws + industry + style + seed)
  const terms = INDUSTRY_TERMS[industry] || INDUSTRY_TERMS.Tech
  const styleTag = STYLE_TAGS[style] || 'Modern'

  const names: { name: string; tag: string }[] = []
  const seen = new Set<string>()

  function add(n: string, tag: string) {
    const lower = n.toLowerCase()
    if (!seen.has(lower) && names.length < 20) {
      seen.add(lower)
      names.push({ name: n, tag })
    }
  }

  // Prefix + keyword combinations
  for (let i = 0; i < PREFIXES.length && names.length < 20; i++) {
    const idx = (hash + i) % PREFIXES.length
    const prefix = PREFIXES[idx]
    add(`${prefix}${capitalize(baseWord)}`, styleTag)
  }

  // Keyword + suffix combinations
  for (let i = 0; i < SUFFIXES.length && names.length < 20; i++) {
    const idx = (hash + i * 3) % SUFFIXES.length
    const suffix = SUFFIXES[idx]
    add(`${capitalize(baseWord)}${suffix}`, styleTag === 'Modern' ? 'Creative' : styleTag)
  }

  // Industry term + keyword
  for (let i = 0; i < terms.length && names.length < 20; i++) {
    const idx = (hash + i * 7) % terms.length
    const term = terms[idx]
    add(`${capitalize(term)}${capitalize(baseWord)}`, 'Professional')
  }

  // Keyword + industry term
  for (let i = 0; i < terms.length && names.length < 20; i++) {
    const idx = (hash + i * 11) % terms.length
    const term = terms[idx]
    add(`${capitalize(baseWord)}${capitalize(term)}`, 'Modern')
  }

  // Joined keywords
  if (kws.length >= 2) {
    add(kws.map(capitalize).join(''), styleTag)
    add(kws.map(capitalize).join('') + 'HQ', 'Professional')
  }

  // Flickr style (drop last vowel)
  add(capitalize(dropLastVowel(baseWord)) + 'r', 'Creative')
  add(capitalize(dropLastVowel(allKws)), 'Minimal')

  // Add "er" variant
  add(capitalize(baseWord) + 'er', styleTag)
  add(capitalize(baseWord) + 'ify', 'Creative')

  // Prefix + industry term
  for (let i = 0; i < 5 && names.length < 20; i++) {
    const pIdx = (hash + i * 13) % PREFIXES.length
    const tIdx = (hash + i * 17) % terms.length
    add(`${PREFIXES[pIdx]}${capitalize(terms[tIdx])}`, 'Modern')
  }

  // Second keyword combos
  if (kws.length >= 2) {
    const second = kws[1]
    for (let i = 0; i < SUFFIXES.length && names.length < 20; i++) {
      const idx = (hash + i * 19) % SUFFIXES.length
      add(`${capitalize(second)}${SUFFIXES[idx]}`, 'Creative')
    }
  }

  // Fill remaining with more prefix combos
  for (let i = 0; names.length < 20 && i < 40; i++) {
    const pIdx = (hash + i * 23) % PREFIXES.length
    const sIdx = (hash + i * 29) % SUFFIXES.length
    add(`${PREFIXES[pIdx]}${SUFFIXES[sIdx]}`, 'Modern')
  }

  return names.slice(0, 20)
}

export default function BusinessNameClient({
  defaultKeywords,
  defaultIndustry,
}: {
  defaultKeywords?: string
  defaultIndustry?: string
} = {}) {
  const [keywords, setKeywords] = useState(defaultKeywords || '')
  const [industry, setIndustry] = useState(defaultIndustry || 'Tech')
  const [style, setStyle] = useState('Modern')
  const [seed, setSeed] = useState(0)
  const [copied, setCopied] = useState<string | null>(null)

  const names = useMemo(() => {
    return generateNames(keywords || 'brand', industry, style, seed)
  }, [keywords, industry, style, seed])

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied(null), 1500)
  }

  const domainLink = (name: string) =>
    `https://www.namecheap.com/domains/registration/results/?domain=${encodeURIComponent(name.toLowerCase().replace(/\s/g, ''))}.com`

  return (
    <ToolShell name="Business Name Generator" icon="💡" currentPath="/business-name-generator">
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>💡</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>Business Name Generator</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>← All tools</a>
        </nav>

        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            Business <span style={{ color: accent }}>Name</span> Generator
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>Generate creative company names. Check domain availability instantly.</p>
        </section>

        {/* Input card */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            {/* Keywords */}
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Keywords (1-3 words)</label>
              <input
                type="text"
                value={keywords}
                onChange={e => setKeywords(e.target.value)}
                placeholder="e.g. cloud sync"
                style={inputStyle}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              {/* Industry */}
              <div>
                <label style={labelStyle}>Industry</label>
                <select value={industry} onChange={e => setIndustry(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                  {Object.keys(INDUSTRY_TERMS).map(ind => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>

              {/* Style */}
              <div>
                <label style={labelStyle}>Style</label>
                <select value={style} onChange={e => setStyle(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option value="Modern">Modern</option>
                  <option value="Classic">Classic</option>
                  <option value="Fun">Fun</option>
                  <option value="Professional">Professional</option>
                  <option value="Minimal">Minimal</option>
                </select>
              </div>
            </div>

            {/* Generate More button */}
            <button
              onClick={() => setSeed(s => s + 1)}
              style={{
                fontFamily: fb, fontSize: 14, fontWeight: 700, padding: '12px 28px',
                borderRadius: 10, border: 'none', cursor: 'pointer',
                background: accent, color: '#fff',
                transition: 'all .15s', width: '100%',
              }}
            >
              Generate More Names
            </button>
          </div>
        </section>

        {/* Generated names grid */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            <div style={{ ...labelStyle, marginBottom: 14 }}>Generated Names ({names.length})</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {names.map((item, i) => (
                <div key={`${item.name}-${i}`} style={{
                  padding: '14px 16px', borderRadius: 12,
                  background: '#FAFAF8', border: '1px solid #E8E4DB',
                  display: 'flex', flexDirection: 'column', gap: 8,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: '#1C1B18', lineHeight: 1.3 }}>{item.name}</span>
                    <span style={{
                      fontSize: 10, fontWeight: 600, color: accent,
                      background: accent + '15', padding: '2px 8px',
                      borderRadius: 4, whiteSpace: 'nowrap', flexShrink: 0,
                    }}>{item.tag}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      onClick={() => handleCopy(item.name)}
                      style={{
                        fontFamily: fb, fontSize: 11, fontWeight: 600, padding: '4px 10px',
                        borderRadius: 5, border: 'none', cursor: 'pointer',
                        background: copied === item.name ? accent : '#F5F3EE',
                        color: copied === item.name ? '#fff' : '#6B6560',
                        transition: 'all .15s',
                      }}
                    >
                      {copied === item.name ? 'Copied!' : 'Copy'}
                    </button>
                    <a
                      href={domainLink(item.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: fb, fontSize: 11, fontWeight: 600, padding: '4px 10px',
                        borderRadius: 5, border: '1px solid #E8E4DB',
                        background: '#fff', color: '#6B6560', textDecoration: 'none',
                        transition: 'all .15s',
                      }}
                    >
                      Check domain
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEO text */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free Business Name Generator</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            This business name generator creates unique, brandable company name ideas based on your keywords, industry, and preferred style. Whether you are launching a tech startup, opening a restaurant, or starting a creative agency, this tool generates 20 name ideas at a time using proven naming patterns from successful brands. Each name comes with a one-click domain availability check through Namecheap.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>How the Name Generator Works</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            The generator uses a combination of techniques: adding modern prefixes and suffixes to your keywords, combining your words with industry-specific terms, applying creative modifications like dropping vowels (Flickr style) or adding common brand endings, and mixing keywords to create compound names. The algorithm adapts based on your chosen industry and style preferences to produce relevant, on-brand suggestions.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>Tips for Choosing a Business Name</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            The best business names are short, memorable, and easy to spell. Avoid names that are too similar to existing brands or hard to pronounce. Check that the matching .com domain is available before committing to a name. Consider how the name will look as a logo, on social media profiles, and in email addresses. A great name should hint at what your business does while still being distinctive enough to stand out in your industry.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>Startup Name Ideas by Industry</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Tech startups often use compound words, dropped vowels, or made-up terms that sound futuristic. Food businesses benefit from names that evoke freshness, flavor, or experience. Fashion brands lean toward elegant or minimal names. Finance companies need names that convey trust and stability. Use the industry filter to generate names specifically tailored to your sector, then hit Generate More for fresh batches of ideas.
          </p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 14 }}>
            Ready to create your brand identity? Build a professional invoice with our <a href="/invoice-generator" style={{ color: accent, textDecoration: 'underline' }}>free invoice generator</a>. Planning your finances? Try the <a href="/roi-calculator" style={{ color: accent, textDecoration: 'underline' }}>ROI calculator</a>.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
