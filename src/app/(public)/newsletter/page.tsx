'use client'
import { useState } from 'react'
import { APP } from '@/constants/config'

const PAST = [
  { title: 'Cohort 2025-Q1 results: 94% placement rate', date: 'June 2025', desc: 'Our latest cohort saw 17 of 18 interns placed within 4 months. This edition covers what worked, what changed, and who hired.' },
  { title: 'Launching Scool: from spec to live in 90 days', date: 'March 2025', desc: 'A deep-dive into how the Tera-Tech backend and frontend teams shipped a full school management system from zero to production.' },
  { title: 'AI in Cameroon: what we are building at Tera-Tech', date: 'December 2024', desc: 'Coverage of our Padi mobile learning app and PACE7 edge AI project, with updates from the team.' },
]

export default function NewsletterPage() {
  const [email,  setEmail]  = useState('')
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [msg,    setMsg]    = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setStatus('loading')
    const res = await fetch('/api/newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) })
    if (res.ok) { setStatus('success'); setMsg('You\'re subscribed! Watch your inbox.'); setEmail('') }
    else        { setStatus('error');   setMsg('Something went wrong. Please try again.') }
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 760 }}>
        <p className="eyebrow">Stay connected</p>
        <h1 className="page-title" style={{ marginBottom: 'var(--s20)' }}>The Tera-Tech Newsletter</h1>
        <p style={{ fontSize: 'var(--text-md)', color: 'var(--white-muted)', lineHeight: 1.7, maxWidth: 560, marginBottom: 'var(--s48)' }}>
          Cohort news, project launches, alumni stories, events, and the latest from the Cameroonian tech ecosystem — delivered to your inbox. No spam, no frequency promises we can't keep.
        </p>

        {/* Subscribe */}
        <div className="card" style={{ padding: 'var(--s32)', marginBottom: 'var(--s64)', borderColor: 'rgba(0,114,206,0.2)' }}>
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: 'var(--s24)' }}>
              <p style={{ fontSize: 32, marginBottom: 'var(--s12)' }}>✓</p>
              <p style={{ fontSize: 'var(--text-md)', fontWeight: 300, color: 'var(--success)', marginBottom: 'var(--s8)' }}>You're in!</p>
              <p style={{ color: 'var(--white-muted)', fontSize: 'var(--text-sm)' }}>{msg}</p>
            </div>
          ) : (
            <form onSubmit={submit}>
              <p style={{ fontWeight: 500, fontSize: 'var(--text-md)', marginBottom: 'var(--s8)' }}>Subscribe to the newsletter</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--white-muted)', marginBottom: 'var(--s20)' }}>Join {APP.stats.interns} engineers already in the community.</p>
              <div style={{ display: 'flex', gap: 'var(--s8)', flexWrap: 'wrap' }}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="input" placeholder="your@email.com" required style={{ flex: 1, minWidth: 220 }} aria-label="Email address" />
                <button type="submit" className="btn btn-blue" disabled={status === 'loading'}>{status === 'loading' ? '···' : 'Subscribe'}</button>
              </div>
              {status === 'error' && <p role="alert" style={{ fontSize: 'var(--text-sm)', color: 'var(--danger)', marginTop: 'var(--s10)' }}>{msg}</p>}
              <p style={{ fontSize: 11, color: 'var(--white-subtle)', marginTop: 'var(--s12)' }}>
                We respect your privacy. Unsubscribe at any time. Read our <a href="/legal/privacy" style={{ color: 'var(--white-muted)' }}>Privacy Policy</a>.
              </p>
            </form>
          )}
        </div>

        {/* Past issues */}
        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 300, marginBottom: 'var(--s32)', color: 'var(--white)' }}>Past issues</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s16)' }}>
          {PAST.map(p => (
            <div key={p.title} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--s16)', flexWrap: 'wrap', marginBottom: 'var(--s10)' }}>
                <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 500, color: 'var(--white)' }}>{p.title}</h3>
                <span style={{ fontSize: 11, color: 'var(--white-subtle)', flexShrink: 0 }}>{p.date}</span>
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--white-muted)', lineHeight: 1.65 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
