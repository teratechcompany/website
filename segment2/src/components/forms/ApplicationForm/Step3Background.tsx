'use client'
import { Button } from '@/components/ui/Button'
import { Input }  from '@/components/ui/Input'
import type { FormData } from './index'

interface Props { data:FormData; onChange:(p:Partial<FormData>)=>void; onNext:()=>void; onBack:()=>void }

const Textarea = ({ label, id, value, onChange, placeholder, maxLen=1000 }:{ label:string;id:string;value:string;onChange:(v:string)=>void;placeholder:string;maxLen?:number }) => (
  <div className="field">
    <label className="label" htmlFor={id}>{label}</label>
    <textarea id={id} className="input" value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} maxLength={maxLen} rows={4} />
    <span className="field-hint">{value.length}/{maxLen} characters</span>
  </div>
)

export function Step3Background({ data, onChange, onNext, onBack }: Props) {
  const b = data.background
  const update = (k: keyof typeof b, v: string) => onChange({ background:{ ...b, [k]:v } })
  const valid = b.education && b.motivation && b.availability

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'var(--s20)' }}>
      <h2 style={{ fontSize:'var(--text-xl)', fontWeight:300, marginBottom:'var(--s8)' }}>Your background</h2>
      <Textarea label="Education" id="education" value={b.education} onChange={v=>update('education',v)} placeholder="Tell us about your educational background, current studies, or relevant qualifications." />
      <Textarea label="Experience" id="experience" value={b.experience} onChange={v=>update('experience',v)} placeholder="Describe relevant projects, work experience, or self-study. Include links if available." maxLen={2000} />
      <Textarea label="Why Tera-Tech?" id="motivation" value={b.motivation} onChange={v=>update('motivation',v)} placeholder="Why do you want to join Tera-Tech? What do you hope to build or learn?" maxLen={3000} />
      <Input id="availability" label="When can you start?" value={b.availability} onChange={e=>update('availability',e.target.value)} placeholder="e.g. Immediately, September 2025, After exams in June" />
      <div style={{ display:'flex', justifyContent:'space-between', marginTop:'var(--s8)' }}>
        <Button variant="ghost" onClick={onBack}>← Back</Button>
        <Button variant="blue"  disabled={!valid} onClick={onNext}>Continue →</Button>
      </div>
    </div>
  )
}
