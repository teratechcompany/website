import { requireRole }  from '@/lib/auth/guards'
import { ROLES }        from '@/constants/roles'
import Link             from 'next/link'

const NAV_GROUPS = [
  { label:'Recruitment', links:[
    { label:'ATS Pipeline',      href:'/internal/ats' },
    { label:'Applications',      href:'/internal/ats' },
  ]},
  { label:'Interns', links:[
    { label:'Active Cohort',     href:'/internal/interns' },
    { label:'Performance',       href:'/internal/hr/reviews' },
    { label:'Leave Requests',    href:'/internal/hr/leave' },
    { label:'Exit Interviews',   href:'/internal/hr/exits' },
  ]},
  { label:'Finance', links:[
    { label:'Overview',          href:'/internal/finance' },
    { label:'Payroll',           href:'/internal/finance/payroll' },
    { label:'Reports',           href:'/internal/finance/reports' },
  ]},
  { label:'Operations', links:[
    { label:'Projects',          href:'/internal/projects' },
    { label:'Assets',            href:'/internal/assets' },
    { label:'Documents',         href:'/internal/docs' },
    { label:'Communications',    href:'/internal/comms' },
  ]},
]

export default async function InternalLayout({ children }: { children:React.ReactNode }) {
  await requireRole(ROLES.STAFF, ROLES.HR_ADMIN, ROLES.ADMIN)
  return (
    <div style={{ minHeight:'100vh', display:'flex', background:'var(--black)' }}>
      {/* Sidebar */}
      <aside style={{ width:224, borderRight:'1px solid var(--white-faint)', padding:'var(--s20)', flexShrink:0, paddingTop:'calc(var(--nav-height) + var(--s24))', display:'flex', flexDirection:'column', gap:'var(--s24)', position:'sticky', top:0, height:'100vh', overflowY:'auto' }}>
        <div>
          <p style={{ fontSize:10, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--white-subtle)', marginBottom:'var(--s8)' }}>Internal</p>
          <Link href="/internal" style={{ fontSize:'var(--text-sm)', color:'var(--white-dim)', fontWeight:500 }}>Dashboard</Link>
        </div>
        {NAV_GROUPS.map(g => (
          <div key={g.label}>
            <p style={{ fontSize:10, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--white-subtle)', marginBottom:'var(--s10)' }}>{g.label}</p>
            <div style={{ display:'flex', flexDirection:'column', gap:'var(--s4)' }}>
              {g.links.map(l => (
                <Link key={l.href+l.label} href={l.href} className="nav-link" style={{ fontSize:'var(--text-sm)', padding:'var(--s6) var(--s8)', borderRadius:'var(--radius-sharp)' }}>{l.label}</Link>
              ))}
            </div>
          </div>
        ))}
        <div style={{ marginTop:'auto', paddingTop:'var(--s16)', borderTop:'1px solid var(--white-faint)' }}>
          <Link href="/admin" style={{ fontSize:12, color:'var(--white-subtle)' }}>→ Admin panel</Link>
        </div>
      </aside>
      <main style={{ flex:1, padding:'var(--s40)', paddingTop:'calc(var(--nav-height) + var(--s40))', maxWidth:'calc(100vw - 224px)', overflowX:'auto' }}>
        {children}
      </main>
    </div>
  )
}
