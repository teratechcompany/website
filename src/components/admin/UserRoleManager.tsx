'use client'
import { useState } from 'react'
import { ROLES, ROLE_LABELS } from '@/constants/roles'
import type { Role } from '@/constants/roles'

export function UserRoleManager({ userId, currentRole }: { userId:string; currentRole:Role }) {
  const [role, setRole]       = useState<Role>(currentRole)
  const [saving, setSaving]   = useState(false)

  const save = async (newRole: Role) => {
    setSaving(true)
    await fetch('/api/admin/users', { method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ userId, role:newRole }) })
    setRole(newRole)
    setSaving(false)
  }

  return (
    <select value={role} onChange={e=>save(e.target.value as Role)} disabled={saving}
      style={{ background:'var(--black-elevated)', border:'1px solid var(--white-faint)', borderRadius:'var(--radius-sharp)', color:'var(--white)', padding:'4px 8px', fontSize:12, cursor:'pointer' }}>
      {Object.values(ROLES).map(r => <option key={r} value={r}>{ROLE_LABELS[r]}</option>)}
    </select>
  )
}
