'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'

export function LeadSection() {
  const [email,   setEmail]   = useState('')
  const [status,  setStatus]  = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [message, setMessage] = useState('')

  const submit = async (e:React.FormEvent) => {
    e.preventDefault()
    if (!email.includes('@')) { setStatus('error'); setMessage('Enter a valid email.'); return }
    setStatus('loading')
    const res = await fetch('/api/newsletter', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ email }) })
    if (res.ok) { setStatus('success'); setMessage('Subscribed! Welcome to the community.'); setEmail('') }
    else        { setStatus('error');   setMessage('Something went wrong. Try again.') }
  }

  return (
    <section style={{ padding:'var(--s96) 0', background:'rgba(0,114,206,0.04)', borderTop:'1px solid rgba(0,114,206,0.10)' }}>
      <div className="container">
        <div style={{ maxWidth:640, margin:'0 auto', textAlign:'center' }}>
          <p className="eyebrow">Ready to start?</p>
          {/* White heading, not orange */}
          <h2 className="section-title">Building your future<br />starts with one step.</h2>
          <p style={{ fontSize:'var(--text-md)', color:'var(--white-muted)', marginBottom:'var(--s40)' }}>
            The application takes 15 minutes. Rolling intake — apply any time.
          </p>
          <Link href={ROUTES.APPLY} className="btn btn-orange btn-lg" style={{ marginBottom:'var(--s32)', display:'inline-flex' }}>
            Start Your Application
          </Link>
          <div style={{ display:'flex', alignItems:'center', gap:'var(--s16)', marginBottom:'var(--s32)' }}>
            <hr className="divider" />
            <span style={{ fontSize:11, color:'var(--white-subtle)', whiteSpace:'nowrap' }}>or stay updated</span>
            <hr className="divider" />
          </div>
          <form onSubmit={submit} style={{ display:'flex', gap:'var(--s8)', maxWidth:480, margin:'0 auto', flexWrap:'wrap' }}>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your.email@example.com" className="input" style={{ flex:1, minWidth:220 }} disabled={status==='loading'||status==='success'} aria-label="Email for newsletter" />
            <button type="submit" className="btn btn-blue" disabled={status==='loading'||status==='success'}>{status==='loading' ? '···' : 'Subscribe'}</button>
          </form>
          {message && <p role={status==='error'?'alert':'status'} style={{ fontSize:'var(--text-sm)', marginTop:'var(--s12)', color:status==='error'?'var(--danger)':'var(--success)' }}>{message}</p>}
        </div>
      </div>
    </section>
  )
}
