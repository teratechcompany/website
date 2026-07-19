'use client'
import { useState }  from 'react'
import { useRouter } from 'next/navigation'
import { Input }     from '@/components/ui/Input'
import { Button }    from '@/components/ui/Button'

export default function NewEventPage() {
  const router = useRouter()
  const [form, setForm] = useState({ title: '', description: '', content: '', location: '', date: '', type: 'upcoming', virtual: false, capacity: '', coverImage: '', published: false })
  const [saving, setSaving] = useState(false)
  const [error,  setError]  = useState('')
  const update = (k: keyof typeof form) => (v: string | boolean) => setForm(f => ({ ...f, [k]: v }))

  const save = async (pub: boolean) => {
    setSaving(true); setError('')
    const res = await fetch('/api/admin/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, capacity: form.capacity ? Number(form.capacity) : undefined, published: pub }),
    })
    const data = await res.json()
    setSaving(false)
    if (!res.ok) { setError(JSON.stringify(data.error)); return }
    router.push('/admin/cms')
  }

  return (
    <div style={{ maxWidth: 760 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--s32)', flexWrap: 'wrap', gap: 'var(--s12)' }}>
        <h1 style={{ fontSize: 24, fontWeight: 300 }}>New event</h1>
        <div style={{ display: 'flex', gap: 'var(--s8)' }}>
          <Button variant="ghost" onClick={() => save(false)} loading={saving}>Save draft</Button>
          <Button variant="blue"  onClick={() => save(true)}  loading={saving}>Publish</Button>
        </div>
      </div>
      {error && <p role="alert" style={{ color: 'var(--danger)', fontSize: 'var(--text-sm)', marginBottom: 'var(--s16)' }}>{error}</p>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s16)' }}>
        <div className="grid-2">
          <Input id="ev-title"    label="Event title"       value={form.title}       onChange={e => update('title')(e.target.value)}       required />
          <div className="field">
            <label className="label" htmlFor="ev-type">Type</label>
            <select id="ev-type" className="input" value={form.type} onChange={e => update('type')(e.target.value)}>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
            </select>
          </div>
          <Input id="ev-date"     label="Date"              value={form.date}        onChange={e => update('date')(e.target.value)}        type="datetime-local" required />
          <Input id="ev-location" label="Location"           value={form.location}    onChange={e => update('location')(e.target.value)}    placeholder="Bamenda, Cameroon" />
          <Input id="ev-capacity" label="Capacity (optional)" value={form.capacity}   onChange={e => update('capacity')(e.target.value)}    type="number" min="1" />
          <Input id="ev-cover"    label="Cover image URL"    value={form.coverImage}  onChange={e => update('coverImage')(e.target.value)}  type="url" placeholder="https://..." />
        </div>
        <Input id="ev-desc" label="Short description (shown in listing)" value={form.description} onChange={e => update('description')(e.target.value)} placeholder="One or two sentences about the event." />
        <div className="field">
          <label className="label" htmlFor="ev-content">Full event description / report (HTML)</label>
          <textarea id="ev-content" className="input" value={form.content} onChange={e => update('content')(e.target.value)} rows={10} placeholder="<p>Full details, agenda, or post-event report...</p>" style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }} />
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--s10)', cursor: 'pointer', fontSize: 'var(--text-sm)', color: 'var(--white-muted)' }}>
          <input type="checkbox" checked={form.virtual} onChange={e => update('virtual')(e.target.checked)} />
          Virtual / online event
        </label>
      </div>
    </div>
  )
}
