'use client'
import { useState } from 'react'
import { Input }    from '@/components/ui/Input'
import { Button }   from '@/components/ui/Button'

const Textarea = ({ label, id, value, onChange, placeholder }: { label:string;id:string;value:string;onChange:(v:string)=>void;placeholder:string }) => (
  <div className="field"><label className="label" htmlFor={id}>{label}</label><textarea id={id} className="input" value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={4} /></div>
)

export default function VolunteerPage() {
  const [form, setForm] = useState({ name:'', email:'', skills:'', motivation:'', availability:'' })
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [msg, setMsg]       = useState('')
  const update = (k:keyof typeof form) => (v:string) => setForm(f=>({...f,[k]:v}))

  const submit = async (e:React.FormEvent) => {
    e.preventDefault(); setStatus('loading')
    const res  = await fetch('/api/volunteer', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) })
    const json = await res.json()
    if (res.ok) { setStatus('success'); setMsg(json.message) }
    else        { setStatus('error');   setMsg(json.error ?? 'Submission failed.') }
  }

  if (status === 'success') return (
    <section className="section"><div className="container" style={{ maxWidth:560, textAlign:'center' }}>
      <div style={{ fontSize:40, marginBottom:'var(--s16)', color:'var(--brand-blue)' }}>✓</div>
      <h1 style={{ fontSize:24, fontWeight:300, marginBottom:'var(--s12)' }}>Application received!</h1>
      <p style={{ color:'var(--white-muted)' }}>{msg}</p>
    </div></section>
  )

  return (
    <section className="section"><div className="container" style={{ maxWidth:640 }}>
      <p className="eyebrow">Join the team</p>
      <h1 className="page-title" style={{ marginBottom:'var(--s8)' }}>Volunteer with Tera-Tech</h1>
      <p style={{ color:'var(--white-muted)', marginBottom:'var(--s40)' }}>Mentors, trainers, and community contributors help us run a better programme. If you have skills to share, we want to hear from you.</p>
      <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:'var(--s16)' }}>
        <div className="grid-2">
          <Input id="v-name"  label="Full name"    value={form.name}  onChange={e=>update('name')(e.target.value)}  required placeholder="Your name" />
          <Input id="v-email" label="Email"        value={form.email} onChange={e=>update('email')(e.target.value)} required type="email" placeholder="you@example.com" />
        </div>
        <Textarea id="v-skills" label="Skills & expertise" value={form.skills} onChange={update('skills')} placeholder="What can you contribute? Mentoring, training, design, writing..." />
        <Textarea id="v-motiv"  label="Why volunteer with us?" value={form.motivation} onChange={update('motivation')} placeholder="Tell us what motivates you to give back to the tech community." />
        <Input id="v-avail" label="Availability" value={form.availability} onChange={e=>update('availability')(e.target.value)} placeholder="e.g. Weekends, 4 hrs/week, from June" />
        {status === 'error' && <p role="alert" style={{ color:'var(--danger)', fontSize:'var(--text-sm)' }}>{msg}</p>}
        <Button type="submit" variant="blue" loading={status==='loading'} style={{ marginTop:'var(--s8)' }}>Submit volunteer application</Button>
      </form>
    </div></section>
  )
}
