import Link from 'next/link'
import { ROUTES } from '@/constants/routes'
import { APP }    from '@/constants/config'

export default function NotFound() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'var(--s16)', textAlign: 'center', padding: 'var(--s24)' }}>
      <div style={{
        width: 80, height: 80,
        background: 'var(--brand-blue-faint)',
        border: '1px solid rgba(0,114,206,0.3)',
        borderRadius: 'var(--radius-sharp)', // blue = sharp
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 28, fontWeight: 200, color: 'var(--brand-blue)',
        marginBottom: 'var(--s8)',
      }}>
        404
      </div>
      <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 400 }}>Page not found</h1>
      <p style={{ color: 'var(--white-muted)', maxWidth: 380 }}>
        The page you're looking for doesn't exist or has moved.
      </p>
      <div style={{ display: 'flex', gap: 'var(--s12)', marginTop: 'var(--s8)' }}>
        <Link href={ROUTES.HOME}  className="btn btn-blue">Back home</Link>
        <Link href={ROUTES.APPLY} className="btn btn-orange">Apply now</Link>
      </div>
    </main>
  )
}
