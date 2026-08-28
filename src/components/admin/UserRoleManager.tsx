'use client'
import { useState } from 'react'
import { ROLES, ROLE_LABELS } from '@/constants/roles'
import type { Role } from '@/constants/roles'
import styles from './UserRoleManager.module.css'

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
      className={styles.select}>
      {Object.values(ROLES).map(r => <option key={r} value={r}>{ROLE_LABELS[r]}</option>)}
    </select>
  )
}
