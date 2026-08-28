import { requireRole }  from '@/lib/auth/guards'
import { ROLES }        from '@/constants/roles'
import Link             from 'next/link'
import { ROUTES }       from '@/constants/routes'
import styles from './PortalLayout.module.css'

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
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <p className={styles.sidebarTitle}>Intern Portal</p>
        {NAV.map(n => (
          <Link key={n.href} href={n.href} className={`nav-link ${styles.navLink}`}>{n.label}</Link>
        ))}
        <div className={styles.footer}>
          <Link href={ROUTES.PORTAL+'/withdraw'} className={styles.withdrawLink}>Withdraw application</Link>
        </div>
      </aside>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}
