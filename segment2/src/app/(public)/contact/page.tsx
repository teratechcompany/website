'use client'
import { useState }  from 'react'
import { Input }     from '@/components/ui/Input'
import { Button }    from '@/components/ui/Button'
import { APP }       from '@/constants/config'

const Textarea = ({ label, id, value, onChange, placeholder }: { label:string;id:string;value:string;onChange:(v:string)=>void;placeholder:string }) => (
  <div className="field">
    <label className="label" htmlFor={id}>{label}</label>
    <textarea id={id} className="input" value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={5} />
  </div>
)

export default function ContactPage() {
  const [form, setForm]       = useState({ name:'', email:'', subject:'', message:'' })
  const [status, setStatus]   = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [message, setMessage] = useState('')

  const update = (k: keyof typeof form) => (v: string) => setForm(f=>({...f,[k]:v}))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setStatus('loading')
    const res = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) })
    if (res.ok) { setStatus('success'); setMessage('Message sent! We will respond within 2 business days.'); setForm({ name:'', email:'', subject:'', message:'' }) }
    else        { setStatus('error');   setMessage('Something went wrong. Please email us directly.') }
  }

  return (
    <section className="section">
      <div className="container">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'var(--s64)', alignItems:'start' }}>
          <div>
            <p className="eyebrow">Get in touch</p>
            <h1 className="page-title">Contact us</h1>
            <p style={{ fontSize:'var(--text-md)', color:'var(--white-muted)', marginBottom:'var(--s40)', lineHeight:1.65 }}>
              Questions about the programme, partnerships, or anything else — we read every message.
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:'var(--s20)' }}>
              {[
                { label:'Email',   value:APP.email,   href:`mailto:${APP.email}` },
                { label:'Phone',   value:APP.phone,   href:`tel:${APP.phone.replace(/\s/g,'')}` },
                { label:'Address', value:APP.address, href:'https://maps.google.com/?q=Bamenda+Cameroon' },
              ].map(c => (
                <div key={c.label}>
                  <p style={{ fontSize:11, fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--white-subtle)', marginBottom:4 }}>{c.label}</p>
                  <a href={c.href} target={c.label==='Address'?'_blank':'_self'} rel="noopener noreferrer" style={{ fontSize:'var(--text-sm)', color:'var(--brand-blue-light)' }}>{c.value}</a>
                </div>
              ))}
            </div>
          </div>
          <div className="card" style={{ padding:'var(--s32)' }}>
            {status === 'success' ? (
              <div style={{ textAlign:'center', padding:'var(--s32)' }}>
                <div style={{ fontSize:32, marginBottom:'var(--s16)', color:'var(--brand-blue)' }}>✓</div>
                <p style={{ fontSize:'var(--text-md)', marginBottom:'var(--s8)' }}>Message sent</p>
                <p style={{ color:'var(--white-muted)', fontSize:'var(--text-sm)' }}>{message}</p>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:'var(--s16)' }}>
                <div className="grid-2">
                  <Input id="contact-name"    label="Name"    value={form.name}    onChange={e=>update('name')(e.target.value)}    placeholder="Your name"  required />
                  <Input id="contact-email"   label="Email"   value={form.email}   onChange={e=>update('email')(e.target.value)}   type="email" placeholder="you@example.com" required />
                </div>
                <Input id="contact-subject"   label="Subject" value={form.subject} onChange={e=>update('subject')(e.target.value)} placeholder="How can we help?" required />
                <Textarea id="contact-msg" label="Message" value={form.message} onChange={update('message')} placeholder="Tell us what's on your mind..." />
                {status === 'error' && <p role="alert" style={{ fontSize:'var(--text-sm)', color:'var(--danger)' }}>{message}</p>}
                <Button type="submit" variant="blue" loading={status==='loading'}>Send message</Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
