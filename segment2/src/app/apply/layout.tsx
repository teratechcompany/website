import Link from 'next/link'
import { ROUTES } from '@/constants/routes'
export default function ApplyLayout({ children }: { children:React.ReactNode }) {
  return (
    <main style={{ minHeight:'100vh', background:'var(--black)', paddingTop:'var(--s64)', paddingBottom:'var(--s96)' }}>
      <div style={{ textAlign:'center', marginBottom:'var(--s48)' }}>
        <Link href={ROUTES.HOME} style={{ display:'inline-flex', alignItems:'center', gap:8, marginBottom:'var(--s16)' }}>
          <span style={{ width:24, height:24, background:'var(--brand-blue)', borderRadius:'var(--radius-sharp)', display:'inline-block' }} aria-hidden />
          <span style={{ fontWeight:700, fontSize:14 }}>TERA<span style={{ color:'var(--brand-blue)' }}>-</span>TECH<span style={{ color:'var(--brand-orange)' }}>.</span></span>
        </Link>
        <h1 style={{ fontSize:28, fontWeight:300, color:'var(--white)' }}>Apply for an Internship</h1>
        <p style={{ fontSize:'var(--text-sm)', color:'var(--white-muted)', marginTop:'var(--s8)' }}>Bamenda, Cameroon · Rolling intake · Free programme</p>
      </div>
      {children}
    </main>
  )
}
