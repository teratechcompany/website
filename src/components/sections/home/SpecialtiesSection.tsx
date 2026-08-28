import { TRACKS } from '@/constants/tracks'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'
import styles from './SpecialtiesSection.module.css'

export function SpecialtiesSection() {
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Learning Tracks</p>
        <div className={styles.headerRow}>
          <h2 className={`section-title ${styles.titleNoMargin}`}>Pick the stack.<br />We handle the rest.</h2>
          <Link href={ROUTES.SERVICES} className="btn btn-ghost">View all tracks</Link>
        </div>
        <div className="grid-4">
          {TRACKS.map(t => (
            <div key={t.id} className={`card ${styles.card}`}>
              <div aria-hidden className={styles.accentLine} />
              <div className={styles.iconBox} aria-hidden>{t.icon}</div>
              <h3 className={styles.trackTitle}>{t.label}</h3>
              <p className={styles.trackOutcome}>{t.outcome}</p>
              <div className={styles.toolsRow}>
                {t.tools.map(tool => <span key={tool} className={`badge badge-cyan ${styles.toolBadge}`}>{tool}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
