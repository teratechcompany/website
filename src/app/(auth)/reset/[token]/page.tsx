'use client'
import { useState }     from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link             from 'next/link'
import { Input }        from '@/components/ui/Input'
import { Button }       from '@/components/ui/Button'
import { ROUTES }       from '@/constants/routes'

export default function ResetPasswordPage() {
  const { token }  = useParams<{ token: string }>()
  const router     = useRouter()
  const [password, setPassword] = useState('')
  const [confirm,  setConfirm]  = useState('')
  const [status,   setStatus]   = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [msg,      setMsg]      = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) { setStatus('error'); setMsg('Passwords do not match.'); return }
    setStatus('loading'); setMsg('')
    const res  = await fetch(`/api/auth/reset/${token}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) })
    const data = await res.json()
    if (res.ok) {
      setStatus('success'); setMsg(data.message)
      setTimeout(() => router.push(ROUTES.LOGIN), 2500)
    } else {
      setStatus('error'); setMsg(data.error ?? 'Something went wrong.')
    }
  }

  if (status === 'success') return (
    <div className="card" style={{ width: '100%', maxWidth: 400, padding: 'var(--s32)', textAlign: 'center' }}>
      <p style={{ fontSize: 40, marginBottom: 'var(--s16)' }}>✓</p>
      <p style={{ fontWeight: 500, marginBottom: 'var(--s8)' }}>Password updated</p>
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--white-muted)' }}>Redirecting you to sign in…</p>
    </div>
  )

  return (
    <div className="card" style={{ width: '100%', maxWidth: 400, padding: 'var(--s32)' }}>
      <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 400, marginBottom: 'var(--s8)' }}>Set new password</h1>
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--white-muted)', marginBottom: 'var(--s24)' }}>
        Choose a strong password — at least 8 characters with uppercase and a number.
      </p>
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s16)' }}>
        <Input id="new-pw"  type="password" label="New password"     value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required minLength={8} autoFocus autoComplete="new-password" />
        <Input id="conf-pw" type="password" label="Confirm password" value={confirm}  onChange={e => setConfirm(e.target.value)}  placeholder="••••••••" required minLength={8} autoComplete="new-password" />
        {msg && <p role={status==='error'?'alert':'status'} style={{ fontSize: 'var(--text-sm)', color: status === 'error' ? 'var(--danger)' : 'var(--success)', padding: 'var(--s10) var(--s12)', background: status === 'error' ? 'rgba(239,68,68,0.08)' : 'rgba(34,197,94,0.08)', borderRadius: 'var(--radius-sharp)', border: `1px solid ${status === 'error' ? 'rgba(239,68,68,0.2)' : 'rgba(34,197,94,0.2)'}` }}>{msg}</p>}
        <Button type="submit" variant="blue" loading={status === 'loading'}>Update password</Button>
        <Link href={ROUTES.LOGIN} style={{ fontSize: 'var(--text-sm)', color: 'var(--white-muted)', textAlign: 'center' }}>Cancel</Link>
      </form>
    </div>
  )
}
