'use client'
import { useState } from 'react'
interface Props { id: string }
export function LeaveActions({ id }: Props) {
  const [status, setStatus] = useState<'idle'|'loading'>('idle')
  const act = async (action:'approved'|'rejected') => {
    setStatus('loading')
    await fetch(`/api/internal/leave`, { method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ id, status:action }) })
    setStatus('idle')
    window.location.reload()
  }
  return (
    <div style={{ display:'flex', gap:'var(--s8)' }}>
      <button className="btn btn-sm btn-blue"  disabled={status==='loading'} onClick={()=>act('approved')}>Approve</button>
      <button className="btn btn-sm btn-ghost" disabled={status==='loading'} onClick={()=>act('rejected')}>Reject</button>
    </div>
  )
}
