'use client'
import { useState, useCallback, useRef } from 'react'
import ToolShell from '@/components/ToolShell'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

type LineItem = { id: number; desc: string; qty: number; price: number }

const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
  { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
  { code: 'MXN', symbol: 'MX$', name: 'Mexican Peso' },
]

const COLORS = ['#1C1B18', '#3B82F6', '#22A065', '#8B5CF6', '#E8457A', '#D85A30', '#0EA5E9', '#059669']

let nextId = 1

export default function InvoiceClient() {
  const [fromName, setFromName] = useState('')
  const [fromAddress, setFromAddress] = useState('')
  const [fromEmail, setFromEmail] = useState('')
  const [toName, setToName] = useState('')
  const [toAddress, setToAddress] = useState('')
  const [toEmail, setToEmail] = useState('')
  const [invoiceNum, setInvoiceNum] = useState('INV-001')
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0])
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date(); d.setDate(d.getDate() + 30); return d.toISOString().split('T')[0]
  })
  const [items, setItems] = useState<LineItem[]>([{ id: nextId++, desc: '', qty: 1, price: 0 }])
  const [taxRate, setTaxRate] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [notes, setNotes] = useState('Payment is due within 30 days. Thank you for your business.')
  const [currency, setCurrency] = useState('EUR')
  const [accentColor, setAccentColor] = useState('#3B82F6')
  const printRef = useRef<HTMLDivElement>(null)

  const cur = CURRENCIES.find(c => c.code === currency) || CURRENCIES[1]

  const addItem = () => setItems([...items, { id: nextId++, desc: '', qty: 1, price: 0 }])
  const removeItem = (id: number) => setItems(items.filter(i => i.id !== id))
  const updateItem = (id: number, field: keyof LineItem, value: string | number) => {
    setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i))
  }

  const subtotal = items.reduce((sum, i) => sum + i.qty * i.price, 0)
  const discountAmount = subtotal * (discount / 100)
  const taxableAmount = subtotal - discountAmount
  const taxAmount = taxableAmount * (taxRate / 100)
  const total = taxableAmount + taxAmount

  const fmt = (n: number) => {
    const f = n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return `${cur.symbol}${f}`
  }

  const handlePrint = useCallback(() => {
    const el = printRef.current
    if (!el) return
    const win = window.open('', '_blank', 'width=800,height=1100')
    if (!win) return
    win.document.write(`<!DOCTYPE html><html><head><title>Invoice ${invoiceNum}</title>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
      <style>
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family:'Outfit',sans-serif; color:#1C1B18; padding:48px; background:#fff; }
        @media print { body { padding:0; } @page { margin:20mm; } }
      </style></head><body>${el.innerHTML}</body></html>`)
    win.document.close()
    setTimeout(() => { win.print(); win.close() }, 400)
  }, [invoiceNum])

  const inputStyle = {
    width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8, padding: '10px 12px',
    fontSize: 14, fontFamily: fb, color: '#1C1B18', background: '#F5F3EE', outline: 'none',
  }
  const labelStyle = {
    fontSize: 11, fontWeight: 600 as const, color: '#9A958A', textTransform: 'uppercase' as const,
    letterSpacing: '.6px', display: 'block' as const, marginBottom: 4,
  }

  return (
    <ToolShell name="Invoice Generator" icon="📄" currentPath="/invoice-generator">
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 800 }}>$</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>InvoiceForge</span>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button onClick={handlePrint} style={{
              fontFamily: fb, fontSize: 13, fontWeight: 700, padding: '9px 22px', borderRadius: 10,
              border: 'none', background: accentColor, color: '#fff', cursor: 'pointer',
            }}>Download PDF</button>
            <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>← All tools</a>
          </div>
        </nav>

        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '16px 28px 40px', display: 'grid', gridTemplateColumns: '380px 1fr', gap: 24, alignItems: 'start' }}>
          {/* LEFT: Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Settings */}
            <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Settings</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                <div>
                  <label style={labelStyle}>Currency</label>
                  <select value={currency} onChange={e => setCurrency(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                    {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code} — {c.symbol}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Accent color</label>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {COLORS.map(c => (
                      <button key={c} onClick={() => setAccentColor(c)} style={{
                        width: 28, height: 28, borderRadius: 6, background: c, cursor: 'pointer',
                        border: accentColor === c ? '2px solid #1C1B18' : '2px solid transparent',
                      }} />
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                <div>
                  <label style={labelStyle}>Invoice #</label>
                  <input value={invoiceNum} onChange={e => setInvoiceNum(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Date</label>
                  <input type="date" value={invoiceDate} onChange={e => setInvoiceDate(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Due date</label>
                  <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} style={inputStyle} />
                </div>
              </div>
            </div>

            {/* From */}
            <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>From (your business)</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <input placeholder="Business name" value={fromName} onChange={e => setFromName(e.target.value)} style={inputStyle} />
                <input placeholder="Address" value={fromAddress} onChange={e => setFromAddress(e.target.value)} style={inputStyle} />
                <input placeholder="Email" value={fromEmail} onChange={e => setFromEmail(e.target.value)} style={inputStyle} />
              </div>
            </div>

            {/* To */}
            <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>To (client)</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <input placeholder="Client name" value={toName} onChange={e => setToName(e.target.value)} style={inputStyle} />
                <input placeholder="Address" value={toAddress} onChange={e => setToAddress(e.target.value)} style={inputStyle} />
                <input placeholder="Email" value={toEmail} onChange={e => setToEmail(e.target.value)} style={inputStyle} />
              </div>
            </div>

            {/* Items */}
            <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Line items</div>
              {items.map((item, idx) => (
                <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '1fr 60px 80px 28px', gap: 6, marginBottom: 8, alignItems: 'end' }}>
                  <div>
                    {idx === 0 && <label style={labelStyle}>Description</label>}
                    <input placeholder="Service or product" value={item.desc} onChange={e => updateItem(item.id, 'desc', e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    {idx === 0 && <label style={labelStyle}>Qty</label>}
                    <input type="number" min="1" value={item.qty} onChange={e => updateItem(item.id, 'qty', +e.target.value)} style={{ ...inputStyle, textAlign: 'center' }} />
                  </div>
                  <div>
                    {idx === 0 && <label style={labelStyle}>Price</label>}
                    <input type="number" min="0" step="0.01" value={item.price || ''} onChange={e => updateItem(item.id, 'price', +e.target.value)} style={{ ...inputStyle, textAlign: 'right' }} placeholder="0.00" />
                  </div>
                  <button onClick={() => items.length > 1 && removeItem(item.id)} style={{
                    width: 28, height: 38, borderRadius: 6, border: '1px solid #E8E4DB', background: 'transparent',
                    color: items.length > 1 ? '#E24B4A' : '#E8E4DB', cursor: items.length > 1 ? 'pointer' : 'default',
                    fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>×</button>
                </div>
              ))}
              <button onClick={addItem} style={{
                fontFamily: fb, fontSize: 13, fontWeight: 600, padding: '8px 16px', borderRadius: 8,
                border: '1.5px dashed #E8E4DB', background: 'transparent', color: '#6B6560',
                cursor: 'pointer', width: '100%', marginTop: 4,
              }}>+ Add line item</button>
            </div>

            {/* Tax & discount */}
            <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={labelStyle}>Tax rate (%)</label>
                  <input type="number" min="0" max="100" value={taxRate || ''} onChange={e => setTaxRate(+e.target.value)} style={inputStyle} placeholder="0" />
                </div>
                <div>
                  <label style={labelStyle}>Discount (%)</label>
                  <input type="number" min="0" max="100" value={discount || ''} onChange={e => setDiscount(+e.target.value)} style={inputStyle} placeholder="0" />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: 20 }}>
              <label style={labelStyle}>Notes / terms</label>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3}
                style={{ ...inputStyle, resize: 'none', fontFamily: fb }} />
            </div>
          </div>

          {/* RIGHT: Live Preview */}
          <div style={{ position: 'sticky', top: 20 }}>
            <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
              <div ref={printRef}>
                <div style={{ padding: '40px 44px', fontFamily: "'Outfit', -apple-system, sans-serif" }}>
                  {/* Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 36 }}>
                    <div>
                      <div style={{ fontSize: 24, fontWeight: 800, color: accentColor, letterSpacing: '-0.5px', marginBottom: 4 }}>
                        {fromName || 'Your Business'}
                      </div>
                      {fromAddress && <div style={{ fontSize: 12, color: '#6B6560', lineHeight: 1.6 }}>{fromAddress}</div>}
                      {fromEmail && <div style={{ fontSize: 12, color: '#6B6560' }}>{fromEmail}</div>}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 32, fontWeight: 800, color: '#1C1B18', letterSpacing: '-1px' }}>INVOICE</div>
                      <div style={{ fontSize: 13, fontFamily: "'JetBrains Mono', monospace", color: accentColor, marginTop: 2 }}>{invoiceNum}</div>
                    </div>
                  </div>

                  {/* Dates + Bill To */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 6 }}>Bill to</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#1C1B18' }}>{toName || 'Client Name'}</div>
                      {toAddress && <div style={{ fontSize: 12, color: '#6B6560', marginTop: 2 }}>{toAddress}</div>}
                      {toEmail && <div style={{ fontSize: 12, color: '#6B6560' }}>{toEmail}</div>}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ marginBottom: 8 }}>
                        <div style={{ fontSize: 10, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px' }}>Date</div>
                        <div style={{ fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>{invoiceDate}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px' }}>Due date</div>
                        <div style={{ fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>{dueDate}</div>
                      </div>
                    </div>
                  </div>

                  {/* Table */}
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
                    <thead>
                      <tr style={{ borderBottom: `2px solid ${accentColor}` }}>
                        <th style={{ textAlign: 'left', fontSize: 10, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', padding: '8px 0' }}>Description</th>
                        <th style={{ textAlign: 'center', fontSize: 10, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', padding: '8px 0', width: 60 }}>Qty</th>
                        <th style={{ textAlign: 'right', fontSize: 10, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', padding: '8px 0', width: 90 }}>Price</th>
                        <th style={{ textAlign: 'right', fontSize: 10, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', padding: '8px 0', width: 100 }}>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, idx) => (
                        <tr key={item.id} style={{ borderBottom: '1px solid #E8E4DB' }}>
                          <td style={{ padding: '10px 0', fontSize: 13, color: '#1C1B18' }}>{item.desc || '—'}</td>
                          <td style={{ padding: '10px 0', fontSize: 13, textAlign: 'center', fontFamily: "'JetBrains Mono', monospace", color: '#6B6560' }}>{item.qty}</td>
                          <td style={{ padding: '10px 0', fontSize: 13, textAlign: 'right', fontFamily: "'JetBrains Mono', monospace", color: '#6B6560' }}>{fmt(item.price)}</td>
                          <td style={{ padding: '10px 0', fontSize: 13, textAlign: 'right', fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>{fmt(item.qty * item.price)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Totals */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ width: 240 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13 }}>
                        <span style={{ color: '#6B6560' }}>Subtotal</span>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{fmt(subtotal)}</span>
                      </div>
                      {discount > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13 }}>
                          <span style={{ color: '#6B6560' }}>Discount ({discount}%)</span>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#22A065' }}>-{fmt(discountAmount)}</span>
                        </div>
                      )}
                      {taxRate > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13 }}>
                          <span style={{ color: '#6B6560' }}>Tax ({taxRate}%)</span>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{fmt(taxAmount)}</span>
                        </div>
                      )}
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0 0', borderTop: `2px solid ${accentColor}`, marginTop: 8 }}>
                        <span style={{ fontSize: 15, fontWeight: 700 }}>Total</span>
                        <span style={{ fontSize: 20, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace", color: accentColor }}>{fmt(total)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  {notes && (
                    <div style={{ marginTop: 32, paddingTop: 20, borderTop: '1px solid #E8E4DB' }}>
                      <div style={{ fontSize: 10, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 6 }}>Notes</div>
                      <div style={{ fontSize: 12, color: '#6B6560', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{notes}</div>
                    </div>
                  )}

                  {/* Footer */}
                  <div style={{ marginTop: 40, textAlign: 'center', fontSize: 11, color: '#B0AAA0' }}>
                    Generated with tools4free.site — Free invoice generator
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section style={{ maxWidth: 640, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free invoice generator — no signup, no watermark</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            InvoiceForge creates professional invoices instantly in your browser. Add your business details, client info, line items with quantities and prices, tax rates, and discounts. See a live preview as you type. Download as PDF with one click. Supports 10 currencies including USD, EUR, GBP, BRL, and JPY. Customize the accent color to match your brand. All data stays in your browser — nothing is sent to any server. No account needed, no watermark, completely free.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
