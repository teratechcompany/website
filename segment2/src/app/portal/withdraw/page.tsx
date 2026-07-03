'use client'
import { useState }  from 'react'
import { useRouter } from 'next/navigation'
import { ROUTES }    from '@/constants/routes'
import { Button }    from '@/components/ui/Button'

export default function WithdrawPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  const withdraw = async () => {
    setLoading(true)
    const apps = await fetch('/api/applications').then(r=>r.json())
    const app  = apps[0]
    if (!app) { setError('No active application found.'); setLoading(false); return }
    const res  = await fetch(`/api/applications/${app._id}`, { method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ status:'withdrawn' }) })
    setLoading(false)
    if (res.ok) router.push(ROUTES.PORTAL)
    else        setError('Could not withdraw at this stage.')
  }

  return (
    <div style={{ maxWidth:480 }}>
      <h1 style={{ fontSize:24, fontWeight:300, marginBottom:'var(--s16)' }}>Withdraw application</h1>
      <p style={{ color:'var(--white-muted)', marginBottom:'var(--s32)', lineHeight:1.65 }}>
        Withdrawing is permanent. Your application will be closed and you will not be able to reopen it. You may apply again in a future cycle.
      </p>
      {error && <p role="alert" style={{ color:'var(--danger)', fontSize:'var(--text-sm)', marginBottom:'var(--s16)' }}>{error}</p>}
      <div style={{ display:'flex', gap:'var(--s12)' }}>
        <Button variant="ghost" onClick={()=>router.back()}>Cancel</Button>
        <Button variant="danger" loading={loading} onClick={withdraw}>Confirm withdrawal</Button>
      </div>
    </div>
  )
}
