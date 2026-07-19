'use client'
import { useState }  from 'react'
import Link          from 'next/link'
import { Input }     from '@/components/ui/Input'
import { Button }    from '@/components/ui/Button'
import { ROUTES }    from '@/constants/routes'

export default function ForgotPasswordPage() {
  const [email,  setEmail]  = useState('')
  const [status, setStatus] = useState<'idle'|'loading'|'done'>('idle')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setStatus('loading')
    await fetch('/api/auth/reset', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) })
    setStatus('done')
  }

  return (
    <div className="card" style={{ width: '100%', maxWidth: 400, padding: 'var(--s32)' }}>
      <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 400, marginBottom: 'var(--s8)' }}>Forgot password</h1>
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--white-muted)', marginBottom: 'var(--s24)' }}>
        Enter your email and we'll send a reset link.
      </p>

      {status === 'done' ? (
        <div style={{ textAlign: 'center', padding: 'var(--s24)' }}>
          <p style={{ fontSize: 32, marginBottom: 'var(--s12)' }}>📬</p>
          <p style={{ fontWeight: 500, marginBottom: 'var(--s8)' }}>Check your inbox</p>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--white-muted)', marginBottom: 'var(--s24)' }}>
            If <strong>{email}</strong> is registered, you'll receive a reset link within a few minutes.
          </p>
          <Link href={ROUTES.LOGIN} className="btn btn-ghost btn-sm">Back to sign in</Link>
        </div>
      ) : (
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s16)' }}>
          <Input id="reset-email" type="email" label="Email address" value={email}
            onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required autoFocus />
          <Button type="submit" variant="blue" loading={status === 'loading'}>Send reset link</Button>
          <Link href={ROUTES.LOGIN} style={{ fontSize: 'var(--text-sm)', color: 'var(--white-muted)', textAlign: 'center' }}>
            Back to sign in
          </Link>
        </form>
      )}
    </div>
  )
}
