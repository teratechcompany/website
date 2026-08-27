'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ROUTES }   from '@/constants/routes'
import styles from './ApplicationForm.module.css'
import { Step1Personal }   from './Step1Personal'
import { Step2Track }      from './Step2Track'
import { Step3Background } from './Step3Background'
import { Step4Documents }  from './Step4Documents'
import { Step5Review }     from './Step5Review'

export type FormData = {
  track:       string
  personalInfo:{ name:string; email:string; phone:string; location:string; nationality:string }
  background:  { education:string; experience:string; motivation:string; availability:string }
  cvUrl?:      string
  portfolioUrl?:string
}

const EMPTY: FormData = {
  track:'',
  personalInfo:{ name:'', email:'', phone:'', location:'', nationality:'' },
  background:  { education:'', experience:'', motivation:'', availability:'' },
}

const STEPS = ['Personal Info','Speciality','Background','Documents','Review']

export function ApplicationForm() {
  const router          = useRouter()
  const [step, setStep] = useState(1)
  const [data, setData] = useState<FormData>(EMPTY)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError]           = useState('')

  const next  = () => setStep(s => Math.min(s+1, 5))
  const back  = () => setStep(s => Math.max(s-1, 1))
  const patch = (partial: Partial<FormData>) => setData(d => ({ ...d, ...partial }))

  const submit = async () => {
    setSubmitting(true); setError('')
    const res  = await fetch('/api/applications', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data) })
    const json = await res.json()
    setSubmitting(false)
    if (!res.ok) { setError(json.error ?? 'Submission failed. Please try again.'); return }
    router.push(ROUTES.APPLY_SUCCESS)
  }

  return (
    <div className={styles.container}>
      {/* Step bar */}
      <div className={styles.stepBar}>
        {STEPS.map((_,i) => (
          <div key={i} className={`${styles.stepIndicator} ${i+1 < step ? styles.stepIndicatorPast : i+1 === step ? styles.stepIndicatorActive : styles.stepIndicatorFuture}`} />
        ))}
      </div>

      {/* Step label */}
      <div className={styles.stepLabelContainer}>
        <p className={styles.stepLabel}>
          Step {step} of {STEPS.length} — {STEPS[step-1]}
        </p>
        <p className={styles.stepProgress}>
          {Math.round(((step-1)/STEPS.length)*100)}% complete
        </p>
      </div>

      {/* Step panels */}
      {step === 1 && <Step1Personal data={data} onChange={patch} onNext={next} />}
      {step === 2 && <Step2Track    data={data} onChange={patch} onNext={next} onBack={back} />}
      {step === 3 && <Step3Background data={data} onChange={patch} onNext={next} onBack={back} />}
      {step === 4 && <Step4Documents  data={data} onChange={patch} onNext={next} onBack={back} />}
      {step === 5 && <Step5Review data={data} onBack={back} onSubmit={submit} submitting={submitting} error={error} />}
    </div>
  )
}
