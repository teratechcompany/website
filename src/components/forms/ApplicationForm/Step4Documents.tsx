'use client'
import { Input }  from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import type { FormData } from './index'
import styles from './ApplicationForm.module.css'

interface Props { data:FormData; onChange:(p:Partial<FormData>)=>void; onNext:()=>void; onBack:()=>void }

export function Step4Documents({ data, onChange, onNext, onBack }: Props) {
  return (
    <div className={styles.stepContainer}>
      <h2 className={styles.stepTitleDoc}>Documents</h2>
      <p className={styles.stepSubtitleDoc}>Both fields are optional but strongly recommended. Link to publicly accessible files (Google Drive, Dropbox, etc.).</p>

      <Input id="cvUrl" type="url" label="CV / Resume URL" value={data.cvUrl ?? ''} onChange={e=>onChange({ cvUrl:e.target.value||undefined })} placeholder="https://drive.google.com/..." hint="Direct link to your CV (PDF preferred)" />
      <Input id="portfolioUrl" type="url" label="Portfolio / GitHub URL" value={data.portfolioUrl ?? ''} onChange={e=>onChange({ portfolioUrl:e.target.value||undefined })} placeholder="https://github.com/yourusername" hint="Projects, work samples, or GitHub profile" />

      <div className={`card-flat ${styles.cardNotice}`}>
        <p className={styles.noticeText}>
          Make sure your links are set to <strong className={styles.noticeStrong}>publicly viewable</strong> before submitting.
        </p>
      </div>

      <div className={styles.stepActions}>
        <Button variant="ghost" onClick={onBack}>← Back</Button>
        <Button variant="blue"  onClick={onNext}>Review application →</Button>
      </div>
    </div>
  )
}
