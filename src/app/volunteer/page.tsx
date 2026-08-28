'use client'
import { useState } from 'react'
import { Input }    from '@/components/ui/Input'
import { Button }   from '@/components/ui/Button'
import styles from './VolunteerPage.module.css'

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
    <section className="section"><div className={`container ${styles.successContainer}`}>
      <div className={styles.successIcon}>✓</div>
      <h1 className={styles.successTitle}>Application received!</h1>
      <p className={styles.successMsg}>{msg}</p>
    </div></section>
  )

  return (
    <section className="section"><div className={`container ${styles.container}`}>
      <p className="eyebrow">Join the team</p>
      <h1 className={`page-title ${styles.title}`}>Volunteer with Tera-Tech</h1>
      <p className={styles.subtitle}>Mentors, trainers, and community contributors help us run a better programme. If you have skills to share, we want to hear from you.</p>
      <form onSubmit={submit} className={styles.form}>
        <div className="grid-2">
          <Input id="v-name"  label="Full name"    value={form.name}  onChange={e=>update('name')(e.target.value)}  required placeholder="Your name" />
          <Input id="v-email" label="Email"        value={form.email} onChange={e=>update('email')(e.target.value)} required type="email" placeholder="you@example.com" />
        </div>
        <Textarea id="v-skills" label="Skills & expertise" value={form.skills} onChange={update('skills')} placeholder="What can you contribute? Mentoring, training, design, writing..." />
        <Textarea id="v-motiv"  label="Why volunteer with us?" value={form.motivation} onChange={update('motivation')} placeholder="Tell us what motivates you to give back to the tech community." />
        <Input id="v-avail" label="Availability" value={form.availability} onChange={e=>update('availability')(e.target.value)} placeholder="e.g. Weekends, 4 hrs/week, from June" />
        {status === 'error' && <p role="alert" className={styles.error}>{msg}</p>}
        <Button type="submit" variant="blue" loading={status==='loading'} className={styles.submitBtn}>Submit volunteer application</Button>
      </form>
    </div></section>
  )
}
