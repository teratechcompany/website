'use client'
import { useState }     from 'react'
import { useRouter }    from 'next/navigation'
import Link             from 'next/link'
import { Input }        from '@/components/ui/Input'
import { Button }       from '@/components/ui/Button'
import { ROUTES }       from '@/constants/routes'

export default function RegisterPage() {
  const router = useRouter()
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const [success,  setSuccess]  = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError(''); setLoading(true)
    const fd   = new FormData(e.currentTarget)
    const body = { name: fd.get('name'), email: fd.get('email'), password: fd.get('password') }

    const res  = await fetch('/api/auth/register', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { setError(data.error ?? 'Registration failed. Please try again.'); return }
    setSuccess(true)
  }

  if (success) return (
    <div className="card" style={{ width:'100%', maxWidth:400, padding:'var(--s32)', textAlign:'center' }}>
      <p style={{ fontSize: 40, marginBottom:'var(--s16)' }}>✓</p>
      <h1 style={{ fontSize:'var(--text-xl)', marginBottom:'var(--s12)' }}>Account created!</h1>
      <p style={{ color:'var(--white-muted)', marginBottom:'var(--s24)' }}>Check your inbox to verify your email, then sign in.</p>
      <Link href={ROUTES.LOGIN} className="btn btn-blue" style={{ width:'100%', justifyContent:'center' }}>Sign in</Link>
    </div>
  )

  return (
    <div className="card" style={{ width:'100%', maxWidth:400, padding:'var(--s32)' }}>
      <h1 style={{ fontSize:'var(--text-xl)', fontWeight:400, marginBottom:'var(--s8)' }}>Create account</h1>
      <p style={{ fontSize:'var(--text-sm)', color:'var(--white-muted)', marginBottom:'var(--s24)' }}>Join the Tera-Tech community</p>

      <form onSubmit={onSubmit} style={{ display:'flex', flexDirection:'column', gap:'var(--s16)' }}>
        <Input name="name" id="name" type="text" label="Full name" placeholder="Amina Fouda" required autoFocus />
        <Input name="email" id="email" type="email" label="Email address" placeholder="you@example.com" required autoComplete="email" />
        <Input name="password" id="password" type="password" label="Password"
          placeholder="Minimum 8 characters" required minLength={8}
          hint="Must contain uppercase, lowercase, and a number" />
        {error && <p role="alert" style={{ fontSize:'var(--text-sm)', color:'var(--danger)', padding:'var(--s8) var(--s12)', background:'rgba(239,68,68,0.08)', borderRadius:'var(--radius-sharp)', border:'1px solid rgba(239,68,68,0.2)' }}>{error}</p>}
        <Button type="submit" variant="blue" loading={loading} style={{ marginTop:'var(--s4)' }}>Create account</Button>
      </form>

      <p style={{ marginTop:'var(--s20)', fontSize:'var(--text-sm)', color:'var(--white-muted)', textAlign:'center' }}>
        Already have an account?{' '}
        <Link href={ROUTES.LOGIN} style={{ color:'var(--brand-blue)' }}>Sign in</Link>
      </p>
    </div>
  )
}
