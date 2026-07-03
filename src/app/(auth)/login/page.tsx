'use client'
import { useState }         from 'react'
import { useRouter }        from 'next/navigation'
import { signIn }           from 'next-auth/react'
import Link                 from 'next/link'
import { Input }            from '@/components/ui/Input'
import { Button }           from '@/components/ui/Button'
import { ROUTES }           from '@/constants/routes'

export default function LoginPage() {
  const router = useRouter()
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError(''); setLoading(true)
    const fd  = new FormData(e.currentTarget)
    const res = await signIn('credentials', { email: fd.get('email'), password: fd.get('password'), redirect: false })
    setLoading(false)
    if (res?.error === 'EMAIL_NOT_VERIFIED') { setError('Please verify your email first. Check your inbox.'); return }
    if (res?.error) { setError('Invalid email or password.'); return }
    router.replace(ROUTES.PORTAL)
  }

  return (
    <div className="card" style={{ width: '100%', maxWidth: 400, padding: 'var(--s32)' }}>
      <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 400, marginBottom: 'var(--s8)' }}>Sign in</h1>
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--white-muted)', marginBottom: 'var(--s24)' }}>Welcome back to Tera-Tech</p>

      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s16)' }}>
        <Input name="email" id="email" type="email" label="Email address" placeholder="you@example.com"
          required autoComplete="email" autoFocus />
        <Input name="password" id="password" type="password" label="Password" placeholder="••••••••"
          required autoComplete="current-password" />
        {error && <p role="alert" style={{ fontSize: 'var(--text-sm)', color: 'var(--danger)', padding: 'var(--s8) var(--s12)', background: 'rgba(239,68,68,0.08)', borderRadius: 'var(--radius-sharp)', border: '1px solid rgba(239,68,68,0.2)' }}>{error}</p>}
        <Button type="submit" variant="blue" loading={loading} style={{ marginTop: 'var(--s4)' }}>
          Sign in
        </Button>
      </form>

      <div style={{ marginTop: 'var(--s20)', display: 'flex', flexDirection: 'column', gap: 'var(--s8)', fontSize: 'var(--text-sm)', textAlign: 'center' }}>
        <Link href="/auth/reset" style={{ color: 'var(--white-muted)' }}>Forgot password?</Link>
        <p style={{ color: 'var(--white-muted)' }}>
          No account?{' '}
          <Link href={ROUTES.REGISTER} style={{ color: 'var(--brand-blue)' }}>Register here</Link>
        </p>
        <p style={{ color: 'var(--white-muted)' }}>
          Want to apply?{' '}
          <Link href={ROUTES.APPLY} style={{ color: 'var(--brand-orange)' }}>Apply Now →</Link>
        </p>
      </div>
    </div>
  )
}
