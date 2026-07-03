import Link from 'next/link'
import { ROUTES } from '@/constants/routes'
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--s24)', background: 'var(--black)' }}>
      <Link href={ROUTES.HOME} style={{ marginBottom: 'var(--s32)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 24, height: 24, background: 'var(--brand-blue)', borderRadius: 'var(--radius-sharp)', display: 'inline-block' }} aria-hidden />
        <span style={{ fontWeight: 700, fontSize: 14 }}>TERA<span style={{ color: 'var(--brand-blue)' }}>-</span>TECH<span style={{ color: 'var(--brand-orange)' }}>.</span></span>
      </Link>
      {children}
    </main>
  )
}
