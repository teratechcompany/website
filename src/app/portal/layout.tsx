import { requireRole }  from '@/lib/auth/guards'
import { ROLES }        from '@/constants/roles'
import Link             from 'next/link'
import { ROUTES }       from '@/constants/routes'

const NAV = [
  { label:'Dashboard',  href:ROUTES.PORTAL },
  { label:'Status',     href:ROUTES.PORTAL+'/status' },
  { label:'Offer',      href:ROUTES.PORTAL+'/offer' },
  { label:'Onboarding', href:ROUTES.PORTAL+'/onboarding' },
  { label:'Documents',  href:ROUTES.PORTAL+'/documents' },
]

export default async function PortalLayout({ children }: { children:React.ReactNode }) {
  await requireRole(ROLES.APPLICANT, ROLES.INTERN, ROLES.STAFF, ROLES.HR_ADMIN, ROLES.ADMIN)
  return (
    <div style={{ minHeight:'100vh', display:'flex', background:'var(--black)' }}>
      {/* Sidebar */}
      <aside style={{ width:220, borderRight:'1px solid var(--white-faint)', padding:'var(--s24)', flexShrink:0, paddingTop:'calc(var(--nav-height) + var(--s24))' }}>
        <p style={{ fontSize:11, fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--white-subtle)', marginBottom:'var(--s16)' }}>Intern Portal</p>
        {NAV.map(n => (
          <Link key={n.href} href={n.href} className="nav-link" style={{ display:'block', marginBottom:'var(--s4)' }}>{n.label}</Link>
        ))}
        <div style={{ marginTop:'var(--s32)', paddingTop:'var(--s24)', borderTop:'1px solid var(--white-faint)' }}>
          <Link href={ROUTES.PORTAL+'/withdraw'} style={{ fontSize:12, color:'var(--white-subtle)', transition:'color var(--dur-fast)' }}>Withdraw application</Link>
        </div>
      </aside>
      <main style={{ flex:1, padding:'var(--s40)', paddingTop:'calc(var(--nav-height) + var(--s40))' }}>
        {children}
      </main>
    </div>
  )
}
