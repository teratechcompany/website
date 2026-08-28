import { requireRole }   from '@/lib/auth/guards'
import { ROLES }         from '@/constants/roles'
import Link              from 'next/link'
import dbConnect         from '@/lib/db/mongoose'
import { Application }  from '@/lib/db/models/Application'
import styles from './ATSPage.module.css'

const COLUMNS = [
  { key:'submitted', label:'Submitted',  color:'var(--white-muted)' },
  { key:'screening', label:'Screening',  color:'var(--brand-blue)' },
  { key:'interview', label:'Interview',  color:'var(--brand-cyan)' },
  { key:'offered',   label:'Offered',    color:'var(--brand-orange)' },
  { key:'accepted',  label:'Accepted',   color:'var(--success)' },
]

export default async function ATSPage() {
  await requireRole(ROLES.STAFF, ROLES.HR_ADMIN, ROLES.ADMIN)
  await dbConnect()

  const apps = await Application.find({ status:{ $in:['submitted','screening','interview','offered','accepted'] } })
    .sort({ createdAt:-1 })
    .select('personalInfo.name personalInfo.email track status createdAt submittedAt')
    .lean() as any[]

  const grouped = Object.fromEntries(COLUMNS.map(c => [c.key, apps.filter(a => a.status === c.key)]))

  return (
    <div>
      <h1 className={styles.title}>ATS Pipeline</h1>
      <p className={styles.subtitle}>
        {apps.length} active applications across {COLUMNS.length} stages
      </p>

      {/* Kanban */}
      <div className={styles.kanbanGrid}>
        {COLUMNS.map(col => {
          const colStyle = { color: col.color }
          return (
          <div key={col.key}>
            {/* Column header */}
            <div className={styles.colHeader}>
              <p className={styles.colTitle} style={colStyle}>{col.label}</p>
              <span className={styles.colCount} style={colStyle}>{grouped[col.key]?.length ?? 0}</span>
            </div>

            {/* Cards */}
            <div className={styles.cardsContainer}>
              {(grouped[col.key] ?? []).map((app:any) => (
                <Link key={app._id} href={`/internal/ats/${app._id}`} className={styles.appLink}>
                  <div className={styles.appCard}>
                    <p className={styles.appName}>{app.personalInfo?.name ?? 'Unknown'}</p>
                    <p className={styles.appTrack}>{app.track}</p>
                    <p className={styles.appDate}>{new Date(app.submittedAt ?? app.createdAt).toLocaleDateString('en-CM',{ dateStyle:'short' })}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )})}
      </div>
    </div>
  )
}
