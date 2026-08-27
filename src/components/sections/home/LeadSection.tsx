'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'
import styles from './LeadSection.module.css'

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
    <section className={styles.section}>
      <div className="container">
        <div className={styles.inner}>
          <p className="eyebrow">Ready to start?</p>
          {/* White heading, not orange */}
          <h2 className="section-title">Building your future<br />starts with one step.</h2>
          <p className={styles.subtitle}>
            The application takes 15 minutes. Rolling intake — apply any time.
          </p>
          <Link href={ROUTES.APPLY} className={`btn btn-orange btn-lg ${styles.applyBtn}`}>
            Start Your Application
          </Link>
          <div className={styles.dividerRow}>
            <hr className="divider" />
            <span className={styles.dividerText}>or stay updated</span>
            <hr className="divider" />
          </div>
          <form onSubmit={submit} className={styles.form}>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your.email@example.com" className={`input ${styles.emailInput}`} disabled={status==='loading'||status==='success'} aria-label="Email for newsletter" />
            <button type="submit" className="btn btn-blue" disabled={status==='loading'||status==='success'}>{status==='loading' ? '···' : 'Subscribe'}</button>
          </form>
          {message && <p role={status==='error'?'alert':'status'} className={`${styles.message} ${status==='error' ? styles.messageError : styles.messageSuccess}`}>{message}</p>}
        </div>
      </div>
    </section>
  )
}
