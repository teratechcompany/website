import { requireRole }  from '@/lib/auth/guards'
import { ROLES }        from '@/constants/roles'
import Link             from 'next/link'
import styles from './InternalLayout.module.css'

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
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div>
          <p className={styles.sectionTitle}>Internal</p>
          <Link href="/internal" className={styles.dashboardLink}>Dashboard</Link>
        </div>
        {NAV_GROUPS.map(g => (
          <div key={g.label}>
            <p className={styles.groupTitle}>{g.label}</p>
            <div className={styles.linkGroup}>
              {g.links.map(l => (
                <Link key={l.href+l.label} href={l.href} className={`nav-link ${styles.navLink}`}>{l.label}</Link>
              ))}
            </div>
          </div>
        ))}
        <div className={styles.footer}>
          <Link href="/admin" className={styles.adminLink}>→ Admin panel</Link>
        </div>
      </aside>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}
