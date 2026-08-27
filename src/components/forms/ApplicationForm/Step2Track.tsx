'use client'
import { TRACKS }    from '@/constants/tracks'
import { Button }    from '@/components/ui/Button'
import type { FormData } from './index'
import styles from './ApplicationForm.module.css'

interface Props { data:FormData; onChange:(p:Partial<FormData>)=>void; onNext:()=>void; onBack:()=>void }

export function Step2Track({ data, onChange, onNext, onBack }: Props) {
  return (
    <div className={styles.stepContainer}>
      <h2 className={styles.stepTitle}>Choose your speciality</h2>
      <p className={styles.stepSubtitle}>Select the track that best matches your skills and goals.</p>

      <div className={`grid-2 ${styles.trackGrid}`}>
        {TRACKS.map(t => {
          const selected = data.track === t.id
          return (
            <button key={t.id} onClick={()=>onChange({ track:t.id })}
              className={`${styles.trackCard} ${selected ? styles.trackCardSelected : styles.trackCardUnselected}`}>
              <p className={`${styles.trackLabel} ${selected ? styles.trackLabelSelected : styles.trackLabelUnselected}`}>{t.label}</p>
              <p className={styles.trackTools}>{t.tools.slice(0,3).join(' · ')}</p>
            </button>
          )
        })}
      </div>

      <div className={styles.stepActions}>
        <Button variant="ghost" onClick={onBack}>← Back</Button>
        <Button variant="blue"  disabled={!data.track} onClick={onNext}>Continue →</Button>
      </div>
    </div>
  )
}
