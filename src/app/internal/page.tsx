import { requireRole }    from '@/lib/auth/guards'
import { ROLES }          from '@/constants/roles'
import dbConnect          from '@/lib/db/mongoose'
import { Application }   from '@/lib/db/models/Application'
import { Intern }         from '@/lib/db/models/Intern'
import { LeaveRequest }   from '@/lib/db/models/LeaveRequest'
import styles from './InternalDashboard.module.css'

export default async function InternalDashboard() {
  await requireRole(ROLES.STAFF, ROLES.HR_ADMIN, ROLES.ADMIN)
  await dbConnect()

  const [openApps, activeInterns, pendingLeave] = await Promise.all([
    Application.countDocuments({ status:{ $in:['submitted','screening','interview'] } }),
    Intern.countDocuments({ status:'active' }),
    LeaveRequest.countDocuments({ status:'pending' }),
  ])

  const recentApps = await Application.find({ status:{ $in:['submitted','screening'] } })
    .sort({ createdAt:-1 }).limit(8)
    .select('personalInfo.name track status createdAt').lean()

  const KPIs = [
    { label:'Open Applications', value:openApps,     colorClass:styles.colorBlue },
    { label:'Active Interns',    value:activeInterns, colorClass:styles.colorCyan },
    { label:'Pending Leave',     value:pendingLeave,  colorClass:styles.colorOrange },
  ]

  return (
    <div>
      <h1 className={styles.title}>Internal Dashboard</h1>
      <p className={styles.subtitle}>Operations overview</p>

      {/* KPI strip */}
      <div className={styles.kpiGrid}>
        {KPIs.map(k => (
          <div key={k.label} className={`card ${styles.kpiCard}`}>
            <p className={`${styles.kpiValue} ${k.colorClass}`}>{k.value}</p>
            <p className={styles.kpiLabel}>{k.label}</p>
          </div>
        ))}
      </div>

      {/* Recent applications */}
      <div className={`card ${styles.tableCard}`}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>Recent applications</h2>
          <a href="/internal/ats" className={styles.tableLink}>View pipeline →</a>
        </div>
        <table className="data-table">
          <thead><tr><th>Applicant</th><th>Track</th><th>Status</th><th>Received</th></tr></thead>
          <tbody>
            {(recentApps as any[]).map(a => (
              <tr key={a._id}>
                <td>{a.personalInfo?.name ?? '—'}</td>
                <td className={styles.trackCell}>{a.track}</td>
                <td><span className={`badge ${a.status==='submitted'?'badge-orange':a.status==='screening'?'badge-blue':'badge-cyan'} ${styles.statusBadge}`}>{a.status}</span></td>
                <td className={styles.dateCell}>{new Date(a.createdAt).toLocaleDateString('en-CM',{ dateStyle:'short' })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
