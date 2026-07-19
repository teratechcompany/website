'use client'
import { useState }  from 'react'
import { TRACKS }    from '@/constants/tracks'
import { APP }       from '@/constants/config'

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
      <div style={{ padding: 'var(--s32)', background: 'var(--brand-blue-faint)', border: '1px solid var(--brand-blue-border)', borderRadius: 'var(--radius-soft)', marginBottom: 'var(--s16)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--s24)', flexWrap: 'wrap', gap: 'var(--s12)' }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-eyebrow)', marginBottom: 'var(--s8)' }}>
              Internship Offer — Tera-Tech Ltd
            </p>
            <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 300, color: 'var(--white)' }}>
              {track?.label ?? app.track}
            </h2>
          </div>
          <span className={`badge ${accepted ? 'badge-green' : 'badge-orange'}`} style={{ fontSize: 12, padding: '6px 14px' }}>
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
          <div key={label} style={{ display: 'flex', gap: 'var(--s16)', paddingBottom: 'var(--s10)', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: 'var(--s10)' }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--white-muted)', minWidth: 120, flexShrink: 0 }}>{label}</p>
            <p style={{ fontSize: 12, color: 'var(--white-dim)' }}>{val}</p>
          </div>
        ))}
      </div>

      {/* Programme terms */}
      <div className="card" style={{ marginBottom: 'var(--s24)' }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--white-muted)', marginBottom: 'var(--s16)' }}>
          Programme terms
        </p>
        {[
          'You will be embedded in live project teams and assigned production-level tasks from week one.',
          'You will be assigned a senior mentor who will provide weekly code reviews and career guidance.',
          'You are expected to maintain professional standards as described in the Intern Code of Conduct.',
          'Tera-Tech will actively facilitate placement introductions with partner companies upon successful completion.',
          'This offer is contingent on the satisfactory verification of information provided in your application.',
        ].map((t, i) => (
          <div key={i} style={{ display: 'flex', gap: 'var(--s10)', marginBottom: 'var(--s10)' }}>
            <span aria-hidden style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--brand-blue)', marginTop: 8, flexShrink: 0 }} />
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--white-muted)', lineHeight: 1.65 }}>{t}</p>
          </div>
        ))}
        <p style={{ fontSize: 12, color: 'var(--white-subtle)', marginTop: 'var(--s16)' }}>
          By accepting, you confirm you have read and agree to the{' '}
          <a href="/legal/intern-code" style={{ color: 'var(--brand-blue)' }}>Intern Code of Conduct</a>
          {' '}and{' '}
          <a href="/legal/terms" style={{ color: 'var(--brand-blue)' }}>Terms of Service</a>.
        </p>
      </div>

      {/* Action */}
      {!accepted ? (
        <>
          {error && <p role="alert" style={{ fontSize: 'var(--text-sm)', color: 'var(--danger)', marginBottom: 'var(--s16)' }}>{error}</p>}
          <div style={{ display: 'flex', gap: 'var(--s12)' }}>
            <button className="btn btn-orange" style={{ flex: 1, justifyContent: 'center' }} onClick={accept} disabled={accepting}>
              {accepting ? '···' : 'Accept offer'}
            </button>
            <a href={`mailto:${APP.email}?subject=Offer query — ${app.personalInfo?.name}`} className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>
              Contact us with a question
            </a>
          </div>
        </>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: 'var(--s32)', borderColor: 'rgba(34,197,94,0.2)', background: 'rgba(34,197,94,0.05)' }}>
          <p style={{ fontSize: 'var(--text-lg)', fontWeight: 300, color: 'var(--success)', marginBottom: 'var(--s8)' }}>Welcome to Tera-Tech!</p>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--white-muted)' }}>Your onboarding coordinator will reach out within 2 business days with next steps.</p>
        </div>
      )}
    </div>
  )
}
