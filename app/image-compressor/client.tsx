'use client'
import { useState, useRef, useCallback } from 'react'
import ToolShell from '@/components/ToolShell'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

function formatSize(bytes: number) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / 1048576).toFixed(2) + ' MB'
}

type CompressedImage = {
  name: string
  originalSize: number
  compressedSize: number
  originalUrl: string
  compressedUrl: string
  compressedBlob: Blob
  width: number
  height: number
}

export default function ImageCompressorClient() {
  const [images, setImages] = useState<CompressedImage[]>([])
  const [quality, setQuality] = useState(75)
  const [processing, setProcessing] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const compress = useCallback(async (files: FileList | File[]) => {
    setProcessing(true)
    const results: CompressedImage[] = []

    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) continue

      const originalUrl = URL.createObjectURL(file)
      const img = new Image()
      await new Promise<void>((resolve) => {
        img.onload = () => resolve()
        img.src = originalUrl
      })

      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0)

      const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg'
      const qualityValue = outputType === 'image/png' ? undefined : quality / 100

      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((b) => resolve(b!), outputType, qualityValue)
      })

      const compressedUrl = URL.createObjectURL(blob)

      results.push({
        name: file.name,
        originalSize: file.size,
        compressedSize: blob.size,
        originalUrl,
        compressedUrl,
        compressedBlob: blob,
        width: img.naturalWidth,
        height: img.naturalHeight,
      })
    }

    setImages(prev => [...results, ...prev])
    setProcessing(false)
  }, [quality])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files.length) compress(e.dataTransfer.files)
  }, [compress])

  const download = (img: CompressedImage) => {
    const a = document.createElement('a')
    a.href = img.compressedUrl
    const ext = img.compressedBlob.type === 'image/png' ? '.png' : '.jpg'
    a.download = img.name.replace(/\.[^.]+$/, '') + '-compressed' + ext
    a.click()
  }

  const downloadAll = () => images.forEach(download)

  const totalOriginal = images.reduce((s, i) => s + i.originalSize, 0)
  const totalCompressed = images.reduce((s, i) => s + i.compressedSize, 0)
  const totalSaved = totalOriginal > 0 ? Math.round((1 - totalCompressed / totalOriginal) * 100) : 0

  return (
    <ToolShell name="Image Compressor" icon="🗜" currentPath="/image-compressor">
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 860, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: '#D85A30', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 800 }}>C</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>CompressIt</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>← All tools</a>
        </nav>

        <section style={{ maxWidth: 860, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            Image <span style={{ color: '#D85A30' }}>compressor</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>Drop images. Get smaller files. Nothing leaves your browser.</p>
        </section>

        <section style={{ maxWidth: 860, margin: '0 auto', padding: '0 28px 20px' }}>
          {/* Quality slider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, justifyContent: 'center' }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px' }}>Quality</span>
            <input type="range" min="10" max="95" step="5" value={quality} onChange={e => setQuality(+e.target.value)}
              style={{ width: 200, accentColor: '#D85A30' }} />
            <span style={{ fontFamily: fm, fontSize: 16, fontWeight: 700, color: '#D85A30', minWidth: 40 }}>{quality}%</span>
          </div>

          {/* Drop zone */}
          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            style={{
              background: dragOver ? '#D85A3008' : '#fff',
              border: `2px dashed ${dragOver ? '#D85A30' : '#E8E4DB'}`,
              borderRadius: 18, padding: '48px 28px', textAlign: 'center',
              cursor: 'pointer', transition: 'all .2s', marginBottom: 20,
            }}
          >
            <input ref={inputRef} type="file" accept="image/*" multiple hidden
              onChange={e => e.target.files && compress(e.target.files)} />
            <div style={{ fontSize: 36, marginBottom: 12, opacity: 0.4 }}>
              {processing ? '⏳' : '🖼️'}
            </div>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#1C1B18', marginBottom: 4 }}>
              {processing ? 'Compressing...' : 'Drop images here or click to browse'}
            </div>
            <div style={{ fontSize: 13, color: '#9A958A' }}>
              JPEG, PNG, WebP — up to 50MB per image
            </div>
          </div>

          {/* Stats bar */}
          {images.length > 0 && (
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB',
              padding: '16px 20px', marginBottom: 16,
            }}>
              <div style={{ display: 'flex', gap: 24 }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.6px' }}>Images</div>
                  <div style={{ fontFamily: fm, fontSize: 18, fontWeight: 700 }}>{images.length}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.6px' }}>Original</div>
                  <div style={{ fontFamily: fm, fontSize: 18, fontWeight: 700 }}>{formatSize(totalOriginal)}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.6px' }}>Compressed</div>
                  <div style={{ fontFamily: fm, fontSize: 18, fontWeight: 700, color: '#22A065' }}>{formatSize(totalCompressed)}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.6px' }}>Saved</div>
                  <div style={{ fontFamily: fm, fontSize: 18, fontWeight: 700, color: '#D85A30' }}>{totalSaved}%</div>
                </div>
              </div>
              <button onClick={downloadAll} style={{
                fontFamily: fb, fontSize: 13, fontWeight: 700, padding: '10px 20px', borderRadius: 10,
                border: 'none', background: '#D85A30', color: '#fff', cursor: 'pointer',
              }}>Download all</button>
            </div>
          )}

          {/* Image results */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {images.map((img, i) => {
              const saved = Math.round((1 - img.compressedSize / img.originalSize) * 100)
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB',
                  padding: '14px 18px',
                }}>
                  <img src={img.compressedUrl} alt="" style={{
                    width: 56, height: 56, borderRadius: 10, objectFit: 'cover',
                    border: '1px solid #E8E4DB',
                  }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{img.name}</div>
                    <div style={{ fontSize: 12, color: '#9A958A', marginTop: 2 }}>
                      {img.width}×{img.height} · {formatSize(img.originalSize)} → <span style={{ color: '#22A065', fontWeight: 600 }}>{formatSize(img.compressedSize)}</span>
                    </div>
                  </div>
                  <div style={{
                    fontFamily: fm, fontSize: 14, fontWeight: 700,
                    color: saved > 0 ? '#22A065' : '#E24B4A',
                    minWidth: 50, textAlign: 'right',
                  }}>-{saved}%</div>
                  <button onClick={() => download(img)} style={{
                    fontFamily: fb, fontSize: 12, fontWeight: 700, padding: '8px 14px', borderRadius: 8,
                    border: '1.5px solid #E8E4DB', background: 'transparent', color: '#6B6560',
                    cursor: 'pointer', flexShrink: 0,
                  }}>Save</button>
                </div>
              )
            })}
          </div>
        </section>

        <section style={{ maxWidth: 640, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free image compressor — 100% private</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            CompressIt reduces image file sizes directly in your browser using the Canvas API. No images are ever uploaded to any server. Supports JPEG, PNG, and WebP. Adjust the quality slider to balance file size and image quality. Perfect for optimizing images for web, email, and social media.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
