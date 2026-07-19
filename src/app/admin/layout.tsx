import { requireRole }  from '@/lib/auth/guards'
import { ROLES }        from '@/constants/roles'
import Link             from 'next/link'

const NAV = [
  { label:'Dashboard',    href:'/admin' },
  { label:'Applications', href:'/admin/applications' },
  { label:'Users & Roles',href:'/admin/users' },
  { label:'Alumni',       href:'/admin/alumni' },
  { label:'Blog & Events',href:'/admin/cms' },
  { label:'Partners',     href:'/admin/partners' },
  { label:'Email',        href:'/admin/email' },
  { label:'Audit Log',    href:'/admin/audit' },
  { label:'Settings',     href:'/admin/settings' },
]

export default async function AdminLayout({ children }: { children:React.ReactNode }) {
  await requireRole(ROLES.ADMIN)
  return (
    <div style={{ minHeight:'100vh', display:'flex', background:'var(--black)' }}>
      <aside style={{ width:210, borderRight:'1px solid var(--white-faint)', padding:'var(--s20)', flexShrink:0, paddingTop:'calc(var(--nav-height) + var(--s24))', display:'flex', flexDirection:'column', gap:'var(--s4)' }}>
        <p style={{ fontSize:10, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--white-subtle)', marginBottom:'var(--s12)' }}>Admin</p>
        {NAV.map(n => (
          <Link key={n.href} href={n.href} className="nav-link" style={{ fontSize:'var(--text-sm)', padding:'var(--s8)', borderRadius:'var(--radius-sharp)' }}>{n.label}</Link>
        ))}
        <div style={{ marginTop:'auto', paddingTop:'var(--s16)', borderTop:'1px solid var(--white-faint)' }}>
          <Link href="/internal" style={{ fontSize:12, color:'var(--white-subtle)' }}>→ Internal</Link>
        </div>
      </aside>
      <main style={{ flex:1, padding:'var(--s40)', paddingTop:'calc(var(--nav-height) + var(--s40))', overflowX:'auto' }}>
        {children}
      </main>
    </div>
  )
}
