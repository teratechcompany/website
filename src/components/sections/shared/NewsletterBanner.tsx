'use client'
import { useState } from 'react'
import styles from './NewsletterBanner.module.css'

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
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <p className="eyebrow">Stay informed</p>
        <h2 className={styles.title}>Get updates from Tera-Tech</h2>
        <p className={styles.subtitle}>News, cohort announcements, and events — no spam.</p>
        {status === 'success' ? (
          <p className={styles.successMsg}>✓ Subscribed! Welcome to the community.</p>
        ) : (
          <form onSubmit={submit} className={styles.form}>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className={`input ${styles.emailInput}`} placeholder="your@email.com" required aria-label="Email address" />
            <button type="submit" className="btn btn-blue" disabled={status==='loading'}>{status==='loading' ? '···' : 'Subscribe'}</button>
          </form>
        )}
      </div>
    </section>
  )
}
