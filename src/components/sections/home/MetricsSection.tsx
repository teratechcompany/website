import { APP } from '@/constants/config'
import styles from './MetricsSection.module.css'

const METRICS = [
  { value:APP.stats.interns,     label:'Interns placed',              color:'var(--brand-blue)' },
  { value:APP.stats.partners,    label:'Partner companies',            color:'var(--brand-cyan)' },
  { value:APP.stats.hireRate,    label:'Hire rate within 6 months',    color:'var(--brand-blue)' },
  { value:`${APP.stats.tracks}`, label:'Active speciality tracks',     color:'var(--brand-cyan)' },
]
export function MetricsSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className="grid-4">
          {METRICS.map((m,i) => (
            <div key={i} className={`card ${styles.card}`}>
              <p className={styles.value} style={{ color:m.color }}>{m.value}</p>
              <p className={styles.label}>{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
