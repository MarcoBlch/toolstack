'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'

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

const StatBox = ({ label, value, mono = false }: { label: string; value: string | number; mono?: boolean }) => (
  <div style={{ background: '#F5F3EE', borderRadius: 12, padding: '16px 18px', textAlign: 'center' }}>
    <div style={{ fontSize: 10, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 6 }}>{label}</div>
    <div style={{ fontSize: 26, fontWeight: 700, fontFamily: mono ? fm : fb, letterSpacing: '-1px', color: '#1C1B18' }}>{value}</div>
  </div>
)

export default function WordCounterClient() {
  const [text, setText] = useState('')
  const stats = useMemo(() => analyze(text), [text])

  return (
    <ToolShell name="Word Counter" icon="¶" currentPath="/word-counter">
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 860, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>¶</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>WordTool</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>← All tools</a>
        </nav>

        <section style={{ maxWidth: 860, margin: '0 auto', padding: '32px 28px 20px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            Word & character <span style={{ color: '#3B82F6' }}>counter</span>
          </h1>
          <p style={{ fontSize: 15, color: '#6B6560', marginBottom: 28 }}>
            Paste your text. Get instant stats.
          </p>
        </section>

        <section style={{ maxWidth: 860, margin: '0 auto', padding: '0 28px 20px' }}>
          {/* Stats bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 10, marginBottom: 20 }}>
            <StatBox label="Words" value={stats.words} mono />
            <StatBox label="Characters" value={stats.chars} mono />
            <StatBox label="No spaces" value={stats.charsNoSpace} mono />
            <StatBox label="Sentences" value={stats.sentences} mono />
            <StatBox label="Paragraphs" value={stats.paragraphs} mono />
            <StatBox label="Reading time" value={stats.readMin > 0 ? `${stats.readMin}m ${stats.readSec}s` : `${stats.readSec}s`} />
          </div>
        </section>

        <section style={{ maxWidth: 860, margin: '0 auto', padding: '0 28px 20px', display: 'grid', gridTemplateColumns: '1fr 260px', gap: 20 }}>
          {/* Textarea */}
          <div style={{ background: '#fff', borderRadius: 14, border: '2px solid #E8E4DB', overflow: 'hidden' }}>
            <textarea value={text} onChange={e => setText(e.target.value)}
              placeholder="Type or paste your text here to count words, characters, sentences, and more..."
              style={{
                width: '100%', minHeight: 360, border: 'none', padding: 20, fontSize: 16,
                fontFamily: fb, color: '#1C1B18', resize: 'vertical', outline: 'none', background: 'transparent', lineHeight: 1.7,
              }} />
          </div>

          {/* Keyword density */}
          <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: 20, alignSelf: 'start' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 14 }}>
              Top keywords
            </div>
            {stats.topWords.length === 0 ? (
              <p style={{ fontSize: 13, color: '#B0AAA0', fontStyle: 'italic' }}>Start typing to see keywords...</p>
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
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free word counter & character counter</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            WordTool counts words, characters (with and without spaces), sentences, paragraphs, and calculates reading time based on an average of 238 words per minute. It also estimates speaking time at 150 words per minute and displays your top keywords along with their frequency. This makes it ideal for essays, blog posts, social media captions, academic papers, and any writing where length and density matter.
          </p>

          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>Why reading time and keyword density matter</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Knowing how long your content takes to read helps you calibrate for your audience. A quick social media caption should take seconds, while an in-depth article might take five to ten minutes. The keyword density panel shows which terms appear most often so you can spot unintentional repetition or confirm that your focus topic comes through clearly, without resorting to keyword stuffing.
          </p>

          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>Meeting character limits across platforms</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Different platforms enforce different limits. X/Twitter allows 280 characters, Instagram captions max out at 2,200, and meta descriptions perform best under 160 characters. WordTool shows both character counts with and without spaces so you can stay within bounds. Paste your text, check the numbers, and trim only what you need to — no guesswork required.
          </p>

          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 16 }}>
            After counting your words, use the <a href="/case-converter" style={{ color: '#FF6B35', textDecoration: 'underline' }}>case converter</a> to fix capitalization issues. If you need placeholder text for a new design, try the <a href="/lorem-generator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>lorem ipsum generator</a>. And to compare two versions of your text side by side, the <a href="/diff-checker" style={{ color: '#FF6B35', textDecoration: 'underline' }}>diff checker</a> highlights every change.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
