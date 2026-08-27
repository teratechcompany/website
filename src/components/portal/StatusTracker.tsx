import type { AppStatus } from '@/lib/db/models/Application'
import styles from './StatusTracker.module.css'

const STEPS: { key: AppStatus; label: string; sub: string }[] = [
  { key:'submitted', label:'Application submitted', sub:'Your application has been received.' },
  { key:'screening', label:'Under screening',       sub:'We are reviewing your background and portfolio.' },
  { key:'interview', label:'Interview stage',       sub:'You have been invited for a technical interview.' },
  { key:'offered',   label:'Offer extended',        sub:'An offer letter is ready in your portal.' },
  { key:'accepted',  label:'Accepted',              sub:'Welcome to Tera-Tech! Onboarding is next.' },
]
const ORDER: AppStatus[] = ['submitted','screening','interview','offered','accepted']

export function StatusTracker({ status }: { status: AppStatus }) {
  if (status === 'withdrawn' || status === 'rejected') {
    return (
      <div className={`card ${styles.card}`}>
        <p className={styles.title}>
          {status === 'withdrawn' ? 'Application withdrawn' : 'Application unsuccessful'}
        </p>
        <p className={styles.subtitle}>
          {status === 'rejected' ? 'Thank you for applying. You may apply again in the next cycle.' : 'You have withdrawn this application.'}
        </p>
      </div>
    )
  }

  const currentIdx = ORDER.indexOf(status)

  return (
    <div>
      {STEPS.map((step, i) => {
        const done    = i < currentIdx
        const current = i === currentIdx
        const pending = i > currentIdx
        return (
          <div key={step.key} className="status-step">
            <div className={`status-dot ${done ? 'done' : current ? 'current' : 'pending'}`}>
              {done ? '✓' : i + 1}
            </div>
            <div>
              <p className={`${styles.label} ${done || current ? styles.labelActive : styles.labelPending}`}>
                {step.label}
              </p>
              <p className={`${styles.subtext} ${done ? styles.subtextDone : current ? styles.subtextCurrent : styles.subtextPending}`}>
                {current ? step.sub : done ? 'Completed' : 'Pending'}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
