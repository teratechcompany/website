'use client'
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams }     from 'next/navigation'
import Link                    from 'next/link'
import { ROUTES }              from '@/constants/routes'

function VerifyContent() {
  const sp     = useSearchParams()
  const [status, setStatus] = useState<'loading'|'success'|'error'>('loading')

  useEffect(() => {
    const token = sp.get('token')
    if (!token) { setStatus('error'); return }
    fetch(`/api/auth/verify?token=${token}`)
      .then(r => setStatus(r.ok || r.redirected ? 'success' : 'error'))
      .catch(() => setStatus('error'))
  }, [sp])
  const searchParams = useSearchParams();
  return (
    <div className="card" style={{ width: '100%', maxWidth: 400, padding: 'var(--s32)', textAlign: 'center' }}>
      {status === 'loading' && <><p style={{ fontSize: 32, marginBottom: 'var(--s16)' }}>⏳</p><p style={{ color: 'var(--white-muted)' }}>Verifying your email…</p></>}
      {status === 'success' && (
        <>
          <p style={{ fontSize: 40, marginBottom: 'var(--s16)' }}>✓</p>
          <p style={{ fontWeight: 500, marginBottom: 'var(--s8)' }}>Email verified!</p>
          <p style={{ color: 'var(--white-muted)', marginBottom: 'var(--s24)', fontSize: 'var(--text-sm)' }}>Your account is active. You can now sign in.</p>
          <Link href={ROUTES.LOGIN} className="btn btn-blue" style={{ display: 'inline-flex' }}>Sign in</Link>
        </>
      )}
      {status === 'error' && (
        <>
          <p style={{ fontSize: 40, marginBottom: 'var(--s16)' }}>✕</p>
          <p style={{ fontWeight: 500, marginBottom: 'var(--s8)', color: 'var(--danger)' }}>Verification failed</p>
          <p style={{ color: 'var(--white-muted)', marginBottom: 'var(--s24)', fontSize: 'var(--text-sm)' }}>The link is invalid or has expired. Request a new one.</p>
          <Link href={ROUTES.LOGIN} className="btn btn-ghost btn-sm">Back to sign in</Link>
        </>
      )}
    </div>
  )
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyContent />
    </Suspense>
  );
}
