'use client'
import { useState } from 'react'
import styles from './AlumniActions.module.css'

export function AlumniActions({ id }: { id:string }) {
  const [saving, setSaving] = useState(false)
  const act = async (approved:boolean) => {
    setSaving(true)
    await fetch('/api/admin/alumni', { method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ id, approved }) })
    setSaving(false)
    window.location.reload()
  }
  return (
    <div className={styles.container}>
      <button className="btn btn-sm btn-blue"  disabled={saving} onClick={()=>act(true)}>Approve</button>
      <button className="btn btn-sm btn-ghost" disabled={saving} onClick={()=>act(false)}>Reject</button>
    </div>
  )
}
