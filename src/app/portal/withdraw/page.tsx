'use client'
import { useState }  from 'react'
import { useRouter } from 'next/navigation'
import { ROUTES }    from '@/constants/routes'
import { Button }    from '@/components/ui/Button'
import styles from './WithdrawPage.module.css'

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
    <div className={styles.container}>
      <h1 className={styles.title}>Withdraw application</h1>
      <p className={styles.text}>
        Withdrawing is permanent. Your application will be closed and you will not be able to reopen it. You may apply again in a future cycle.
      </p>
      {error && <p role="alert" className={styles.error}>{error}</p>}
      <div className={styles.actions}>
        <Button variant="ghost" onClick={()=>router.back()}>Cancel</Button>
        <Button variant="danger" loading={loading} onClick={withdraw}>Confirm withdrawal</Button>
      </div>
    </div>
  )
}
