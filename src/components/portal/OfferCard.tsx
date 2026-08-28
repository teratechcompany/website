'use client'
import { useState }  from 'react'
import { TRACKS }    from '@/constants/tracks'
import { APP }       from '@/constants/config'
import styles from './OfferCard.module.css'

export function OfferCard({ application: app }: { application: any }) {
  const [accepting, setAccepting] = useState(false)
  const [accepted,  setAccepted]  = useState(app.status === 'accepted')
  const [error,     setError]     = useState('')
  const track = TRACKS.find(t => t.id === app.track)

  const accept = async () => {
    setAccepting(true); setError('')
    const res = await fetch(`/api/internal/applications/${app._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'accepted' }),
    })
    setAccepting(false)
    if (res.ok) setAccepted(true)
    else setError('Something went wrong. Please contact us at ' + APP.email)
  }

  return (
    <div>
      {/* Offer header */}
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <p className={styles.headerSub}>
              Internship Offer — Tera-Tech Ltd
            </p>
            <h2 className={styles.headerTitle}>
              {track?.label ?? app.track}
            </h2>
          </div>
          <span className={`badge ${accepted ? 'badge-green' : 'badge-orange'} ${styles.badge}`}>
            {accepted ? '✓ Accepted' : 'Offer pending'}
          </span>
        </div>

        {[
          ['Applicant',    app.personalInfo?.name],
          ['Email',        app.personalInfo?.email],
          ['Speciality',   track?.label ?? app.track],
          ['Organisation', APP.name],
          ['Location',     APP.address],
          ['Type',         'Internship (unpaid training programme)'],
          ['Duration',     '3 months (renewable by mutual agreement)'],
          ['Start',        'As discussed at interview'],
        ].map(([label, val]) => val && (
          <div key={label} className={styles.row}>
            <p className={styles.rowLabel}>{label}</p>
            <p className={styles.rowValue}>{val}</p>
          </div>
        ))}
      </div>

      {/* Programme terms */}
      <div className={`card ${styles.termsCard}`}>
        <p className={styles.termsHeader}>
          Programme terms
        </p>
        {[
          'You will be embedded in live project teams and assigned production-level tasks from week one.',
          'You will be assigned a senior mentor who will provide weekly code reviews and career guidance.',
          'You are expected to maintain professional standards as described in the Intern Code of Conduct.',
          'Tera-Tech will actively facilitate placement introductions with partner companies upon successful completion.',
          'This offer is contingent on the satisfactory verification of information provided in your application.',
        ].map((t, i) => (
          <div key={i} className={styles.termItem}>
            <span aria-hidden className={styles.termDot} />
            <p className={styles.termText}>{t}</p>
          </div>
        ))}
        <p className={styles.termsFooter}>
          By accepting, you confirm you have read and agree to the{' '}
          <a href="/legal/intern-code" className={styles.link}>Intern Code of Conduct</a>
          {' '}and{' '}
          <a href="/legal/terms" className={styles.link}>Terms of Service</a>.
        </p>
      </div>

      {/* Action */}
      {!accepted ? (
        <>
          {error && <p role="alert" className={styles.error}>{error}</p>}
          <div className={styles.actions}>
            <button className={`btn btn-orange ${styles.btn}`} onClick={accept} disabled={accepting}>
              {accepting ? '···' : 'Accept offer'}
            </button>
            <a href={`mailto:${APP.email}?subject=Offer query — ${app.personalInfo?.name}`} className={`btn btn-ghost ${styles.btn}`}>
              Contact us with a question
            </a>
          </div>
        </>
      ) : (
        <div className={`card ${styles.successCard}`}>
          <p className={styles.successTitle}>Welcome to Tera-Tech!</p>
          <p className={styles.successSub}>Your onboarding coordinator will reach out within 2 business days with next steps.</p>
        </div>
      )}
    </div>
  )
}
