'use client'
import { Button } from '@/components/ui/Button'
import { TRACKS } from '@/constants/tracks'
import type { FormData } from './index'
import styles from './ApplicationForm.module.css'

interface Props { data:FormData; onBack:()=>void; onSubmit:()=>void; submitting:boolean; error:string }

const Row = ({ label, value }:{ label:string; value?:string }) => value ? (
  <div className={styles.reviewRow}>
    <p className={styles.reviewRowLabel}>{label}</p>
    <p className={styles.reviewRowValue}>{value}</p>
  </div>
) : null

export function Step5Review({ data, onBack, onSubmit, submitting, error }: Props) {
  const track = TRACKS.find(t => t.id === data.track)
  const p     = data.personalInfo
  const b     = data.background

  return (
    <div>
      <h2 className={styles.stepTitle}>Review your application</h2>
      <p className={styles.stepSubtitle}>Check everything carefully before submitting. You cannot edit after submission.</p>

      <div className={`card ${styles.reviewCard}`}>
        <p className={styles.reviewSectionLabel}>Speciality</p>
        <p className={styles.reviewValueLarge}>{track?.label}</p>
      </div>

      <div className={`card ${styles.reviewCard}`}>
        <p className={styles.reviewSectionLabel}>Personal</p>
        <Row label="Name"        value={p.name} />
        <Row label="Email"       value={p.email} />
        <Row label="Phone"       value={p.phone} />
        <Row label="Location"    value={p.location} />
        <Row label="Nationality" value={p.nationality} />
      </div>

      <div className={`card ${styles.reviewCard}`}>
        <p className={styles.reviewSectionLabel}>Background</p>
        <Row label="Education"    value={b.education} />
        <Row label="Experience"   value={b.experience} />
        <Row label="Motivation"   value={b.motivation} />
        <Row label="Availability" value={b.availability} />
        {data.cvUrl        && <Row label="CV"        value={data.cvUrl} />}
        {data.portfolioUrl && <Row label="Portfolio" value={data.portfolioUrl} />}
      </div>

      {error && <p role="alert" className={styles.reviewError}>{error}</p>}

      <div className={styles.stepActionsReview}>
        <Button variant="ghost" onClick={onBack} disabled={submitting}>← Back</Button>
        <Button variant="orange" onClick={onSubmit} loading={submitting} className={styles.submitBtn}>
          Submit application
        </Button>
      </div>
    </div>
  )
}
