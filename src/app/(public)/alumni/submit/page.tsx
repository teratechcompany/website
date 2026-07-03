'use client'
import { useState }  from 'react'
import { Input }     from '@/components/ui/Input'
import { Button }    from '@/components/ui/Button'
import { TRACKS }    from '@/constants/tracks'

const Textarea = ({ label, id, value, onChange, placeholder }: { label:string;id:string;value:string;onChange:(v:string)=>void;placeholder:string }) => (
  <div className="field">
    <label className="label" htmlFor={id}>{label}</label>
    <textarea id={id} className="input" value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={3} />
  </div>
)

export default function AlumniSubmitPage() {
  const [form, setForm] = useState({ name:'', track:'', cohort:'', company:'', role:'', quote:'', bio:'', linkedIn:'' })
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [msg, setMsg]       = useState('')
  const update = (k:keyof typeof form) => (v:string) => setForm(f=>({...f,[k]:v}))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setStatus('loading')
    const res = await fetch('/api/alumni', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ ...form, cohort:Number(form.cohort) }) })
    const json = await res.json()
    if (res.ok) { setStatus('success'); setMsg(json.message) }
    else        { setStatus('error');   setMsg(json.error ?? 'Submission failed.') }
  }

  if (status === 'success') return (
    <section className="section"><div className="container" style={{ maxWidth:560, textAlign:'center' }}>
      <div style={{ fontSize:40, marginBottom:'var(--s16)', color:'var(--brand-blue)' }}>✓</div>
      <h1 style={{ fontSize:24, fontWeight:300, marginBottom:'var(--s12)' }}>Submission received!</h1>
      <p style={{ color:'var(--white-muted)' }}>{msg}</p>
    </div></section>
  )

  return (
    <section className="section"><div className="container" style={{ maxWidth:640 }}>
      <p className="eyebrow">Alumni network</p>
      <h1 className="page-title" style={{ marginBottom:'var(--s8)' }}>Share your story</h1>
      <p style={{ color:'var(--white-muted)', marginBottom:'var(--s40)' }}>Your profile will be reviewed and published to inspire the next generation of Tera-Tech interns.</p>
      <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:'var(--s16)' }}>
        <div className="grid-2">
          <Input id="al-name" label="Full name"   value={form.name}   onChange={e=>update('name')(e.target.value)}   required placeholder="Amina Fouda" />
          <div className="field">
            <label className="label" htmlFor="al-track">Track</label>
            <select id="al-track" className="input" value={form.track} onChange={e=>update('track')(e.target.value)} required>
              <option value="">Select track</option>
              {TRACKS.map(t=><option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
          </div>
          <Input id="al-cohort"  label="Cohort year" value={form.cohort}  onChange={e=>update('cohort')(e.target.value)}  required placeholder="2023" type="number" min="2018" />
          <Input id="al-company" label="Company"     value={form.company} onChange={e=>update('company')(e.target.value)} required placeholder="Acme Ltd" />
          <Input id="al-role"    label="Job title"   value={form.role}    onChange={e=>update('role')(e.target.value)}    required placeholder="Software Engineer" className="grid-col-span-2" />
        </div>
        <Textarea id="al-quote" label="Quote (shown publicly)" value={form.quote} onChange={update('quote')} placeholder="What did your time at Tera-Tech mean for your career?" />
        <Textarea id="al-bio"   label="Short bio (optional)"  value={form.bio}   onChange={update('bio')}   placeholder="A few sentences about what you are working on now." />
        <Input id="al-linkedin" label="LinkedIn URL (optional)" value={form.linkedIn} onChange={e=>update('linkedIn')(e.target.value)} placeholder="https://linkedin.com/in/..." type="url" />
        {status === 'error' && <p role="alert" style={{ color:'var(--danger)', fontSize:'var(--text-sm)' }}>{msg}</p>}
        <Button type="submit" variant="blue" loading={status==='loading'} style={{ marginTop:'var(--s8)' }}>Submit profile</Button>
      </form>
    </div></section>
  )
}
