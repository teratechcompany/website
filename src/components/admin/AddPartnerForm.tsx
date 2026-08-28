'use client'
import { useState } from 'react'
import { Input }    from '@/components/ui/Input'
import { Button }   from '@/components/ui/Button'
import styles from './AddPartnerForm.module.css'

export function AddPartnerForm() {
  const [form, setForm] = useState({ name: '', sector: '', location: '', website: '', logo: '', placements: '0' })
  const [saving, setSaving] = useState(false)
  const [done,   setDone]   = useState(false)
  const [error,  setError]  = useState('')
  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }))

  const save = async (ev: React.FormEvent) => {
    ev.preventDefault(); setSaving(true); setError('')
    const res  = await fetch('/api/admin/partners', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, placements: Number(form.placements) }) })
    const data = await res.json()
    setSaving(false)
    if (!res.ok) { setError(JSON.stringify(data.error)); return }
    setDone(true); setForm({ name: '', sector: '', location: '', website: '', logo: '', placements: '0' })
    setTimeout(() => setDone(false), 3000)
    window.location.reload()
  }

  return (
    <div className={`card ${styles.card}`}>
      <p className={styles.title}>Add new partner</p>
      <form onSubmit={save} className={styles.form}>
        <Input id="p-name"       label="Company name"    value={form.name}       onChange={update('name')}       required placeholder="Acme Ltd" />
        <Input id="p-sector"     label="Sector"           value={form.sector}     onChange={update('sector')}     placeholder="Fintech, EdTech…" />
        <Input id="p-location"   label="Location"         value={form.location}   onChange={update('location')}   placeholder="Douala, Cameroon" />
        <Input id="p-website"    label="Website URL"      value={form.website}    onChange={update('website')}    type="url" placeholder="https://…" />
        <Input id="p-logo"       label="Logo URL"         value={form.logo}       onChange={update('logo')}       type="url" placeholder="https://…" />
        <Input id="p-placements" label="Placements to date" value={form.placements} onChange={update('placements')} type="number" min="0" />
        {error && <p role="alert" className={styles.error}>{error}</p>}
        <Button type="submit" variant="blue" loading={saving}>{done ? '✓ Partner added' : 'Add partner'}</Button>
      </form>
    </div>
  )
}
