'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ROUTES }   from '@/constants/routes'
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
    <div style={{ maxWidth:680, margin:'0 auto', padding:'0 var(--s24)' }}>
      {/* Step bar */}
      <div style={{ display:'flex', gap:4, marginBottom:'var(--s32)' }}>
        {STEPS.map((_,i) => (
          <div key={i} style={{ height:3, flex:1, borderRadius:2, background: i+1 < step ? 'var(--brand-cyan)' : i+1 === step ? 'var(--brand-blue)' : 'var(--white-faint)', transition:'background 0.4s var(--ease)' }} />
        ))}
      </div>

      {/* Step label */}
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'var(--s32)' }}>
        <p style={{ fontSize:'var(--text-xs)', color:'var(--white-muted)', letterSpacing:'0.06em', textTransform:'uppercase' }}>
          Step {step} of {STEPS.length} — {STEPS[step-1]}
        </p>
        <p style={{ fontSize:'var(--text-xs)', color:'var(--white-subtle)' }}>
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
