'use client'
import { useState } from 'react'
export function AlumniActions({ id }: { id:string }) {
  const [saving, setSaving] = useState(false)
  const act = async (approved:boolean) => {
    setSaving(true)
    await fetch('/api/admin/alumni', { method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ id, approved }) })
    setSaving(false)
    window.location.reload()
  }
  return (
    <div style={{ display:'flex', gap:'var(--s8)', flexShrink:0 }}>
      <button className="btn btn-sm btn-blue"  disabled={saving} onClick={()=>act(true)}>Approve</button>
      <button className="btn btn-sm btn-ghost" disabled={saving} onClick={()=>act(false)}>Reject</button>
    </div>
  )
}
