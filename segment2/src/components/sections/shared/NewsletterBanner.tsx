'use client'
import { useState } from 'react'
export function NewsletterBanner() {
  const [email,  setEmail]  = useState('')
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const submit = async (e:React.FormEvent) => {
    e.preventDefault(); setStatus('loading')
    const res = await fetch('/api/newsletter', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ email }) })
    setStatus(res.ok ? 'success' : 'error')
    if (res.ok) setEmail('')
  }
  return (
    <section style={{ padding:'var(--s64) 0', background:'rgba(0,114,206,0.04)', borderTop:'1px solid rgba(0,114,206,0.1)', borderBottom:'1px solid rgba(0,114,206,0.1)' }}>
      <div className="container" style={{ maxWidth:560, textAlign:'center' }}>
        <p className="eyebrow">Stay informed</p>
        <h2 style={{ fontSize:'var(--text-xl)', fontWeight:300, marginBottom:'var(--s8)', color:'var(--text-heading)' }}>Get updates from Tera-Tech</h2>
        <p style={{ fontSize:'var(--text-sm)', color:'var(--white-muted)', marginBottom:'var(--s24)' }}>News, cohort announcements, and events — no spam.</p>
        {status === 'success' ? (
          <p style={{ color:'var(--success)', fontSize:'var(--text-sm)' }}>✓ Subscribed! Welcome to the community.</p>
        ) : (
          <form onSubmit={submit} style={{ display:'flex', gap:'var(--s8)', flexWrap:'wrap', justifyContent:'center' }}>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="input" style={{ flex:1, minWidth:220, maxWidth:320 }} placeholder="your@email.com" required aria-label="Email address" />
            <button type="submit" className="btn btn-blue" disabled={status==='loading'}>{status==='loading' ? '···' : 'Subscribe'}</button>
          </form>
        )}
      </div>
    </section>
  )
}
