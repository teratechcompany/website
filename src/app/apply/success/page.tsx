import type { Metadata } from 'next'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'
import { APP }    from '@/constants/config'
export const metadata: Metadata = { title:'Application submitted — Tera-Tech' }
export default function ApplySuccessPage() {
  return (
    <main style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'var(--s24)', background:'var(--black)' }}>
      <div style={{ textAlign:'center', maxWidth:520 }}>
        <div style={{ width:72, height:72, borderRadius:'var(--radius-sharp)', background:'var(--brand-blue-faint)', border:'1px solid var(--brand-blue-border)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:28, margin:'0 auto var(--s24)', color:'var(--brand-blue)' }}>✓</div>
        <h1 style={{ fontSize:28, fontWeight:300, marginBottom:'var(--s12)' }}>Application submitted</h1>
        <p style={{ color:'var(--white-muted)', lineHeight:1.7, marginBottom:'var(--s32)' }}>
          Thank you for applying to Tera-Tech Ltd. We will review your application and respond within 3–5 business days to the email address you provided.
        </p>
        <div style={{ display:'flex', gap:'var(--s12)', justifyContent:'center', flexWrap:'wrap' }}>
          <Link href={ROUTES.PORTAL} className="btn btn-blue">Track status in portal</Link>
          <a href={`https://wa.me/${APP.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Join WhatsApp community</a>
        </div>
      </div>
    </main>
  )
}
