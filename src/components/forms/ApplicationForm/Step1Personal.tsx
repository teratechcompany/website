'use client'
import { Input }     from '@/components/ui/Input'
import { Button }    from '@/components/ui/Button'
import type { FormData } from './index'

interface Props { data:FormData; onChange:(p:Partial<FormData>)=>void; onNext:()=>void }

export function Step1Personal({ data, onChange, onNext }: Props) {
  const p = data.personalInfo
  const update = (k: keyof typeof p, v: string) =>
    onChange({ personalInfo:{ ...p, [k]:v } })

  const valid = p.name && p.email && p.phone && p.location

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'var(--s20)' }}>
      <h2 style={{ fontSize:'var(--text-xl)', fontWeight:300, marginBottom:'var(--s8)' }}>Personal information</h2>
      <div className="grid-2">
        <Input id="name"        label="Full name"         value={p.name}        onChange={e=>update('name',e.target.value)}        placeholder="Amina Fouda"          required />
        <Input id="email"       label="Email address"     value={p.email}       onChange={e=>update('email',e.target.value)}       placeholder="amina@example.com"    required type="email" />
        <Input id="phone"       label="Phone number"      value={p.phone}       onChange={e=>update('phone',e.target.value)}       placeholder="+237 6XX XXX XXX"     required />
        <Input id="location"    label="City, Country"     value={p.location}    onChange={e=>update('location',e.target.value)}    placeholder="Bamenda, Cameroon"     required />
        <Input id="nationality" label="Nationality"       value={p.nationality} onChange={e=>update('nationality',e.target.value)} placeholder="Cameroonian" className="grid-col-span-2" />
      </div>
      <div style={{ display:'flex', justifyContent:'flex-end', marginTop:'var(--s16)' }}>
        <Button variant="blue" disabled={!valid} onClick={onNext}>Continue →</Button>
      </div>
    </div>
  )
}
