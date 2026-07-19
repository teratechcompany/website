import { requireRole }    from '@/lib/auth/guards'
import { ROLES }          from '@/constants/roles'
import dbConnect          from '@/lib/db/mongoose'
import { Application }   from '@/lib/db/models/Application'
import { Intern }         from '@/lib/db/models/Intern'
import { LeaveRequest }   from '@/lib/db/models/LeaveRequest'

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
    { label:'Open Applications', value:openApps,     color:'var(--brand-blue)' },
    { label:'Active Interns',    value:activeInterns, color:'var(--brand-cyan)' },
    { label:'Pending Leave',     value:pendingLeave,  color:'var(--brand-orange)' },
  ]

  return (
    <div>
      <h1 style={{ fontSize:28, fontWeight:300, marginBottom:'var(--s8)' }}>Internal Dashboard</h1>
      <p style={{ color:'var(--white-muted)', marginBottom:'var(--s40)' }}>Operations overview</p>

      {/* KPI strip */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'var(--s16)', marginBottom:'var(--s48)' }}>
        {KPIs.map(k => (
          <div key={k.label} className="card" style={{ padding:'var(--s24)' }}>
            <p style={{ fontSize:40, fontWeight:200, color:k.color, letterSpacing:'-0.04em', lineHeight:1, marginBottom:'var(--s8)' }}>{k.value}</p>
            <p style={{ fontSize:'var(--text-sm)', color:'var(--white-muted)' }}>{k.label}</p>
          </div>
        ))}
      </div>

      {/* Recent applications */}
      <div className="card" style={{ padding:0, overflow:'hidden' }}>
        <div style={{ padding:'var(--s20) var(--s24)', borderBottom:'1px solid var(--white-faint)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <h2 style={{ fontSize:'var(--text-md)', fontWeight:400 }}>Recent applications</h2>
          <a href="/internal/ats" style={{ fontSize:'var(--text-sm)', color:'var(--brand-blue)' }}>View pipeline →</a>
        </div>
        <table className="data-table">
          <thead><tr><th>Applicant</th><th>Track</th><th>Status</th><th>Received</th></tr></thead>
          <tbody>
            {(recentApps as any[]).map(a => (
              <tr key={a._id}>
                <td>{a.personalInfo?.name ?? '—'}</td>
                <td style={{ textTransform:'capitalize' }}>{a.track}</td>
                <td><span className={`badge ${a.status==='submitted'?'badge-orange':a.status==='screening'?'badge-blue':'badge-cyan'}`} style={{ fontSize:11 }}>{a.status}</span></td>
                <td style={{ color:'var(--white-subtle)', fontSize:12 }}>{new Date(a.createdAt).toLocaleDateString('en-CM',{ dateStyle:'short' })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
