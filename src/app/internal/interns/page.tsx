import { requireRole }  from '@/lib/auth/guards'
import { ROLES }        from '@/constants/roles'
import Link             from 'next/link'
import dbConnect        from '@/lib/db/mongoose'
import { Intern }       from '@/lib/db/models/Intern'

export default async function InternsPage() {
  await requireRole(ROLES.STAFF, ROLES.HR_ADMIN, ROLES.ADMIN)
  await dbConnect()
  const interns = await Intern.find({ status:'active' }).populate('userId', 'name email').sort({ startDate:-1 }).lean() as any[]

  return (
    <div>
      <h1 style={{ fontSize:28, fontWeight:300, marginBottom:'var(--s8)' }}>Active Interns</h1>
      <p style={{ color:'var(--white-muted)', marginBottom:'var(--s40)' }}>{interns.length} interns currently active</p>

      {interns.length === 0 ? (
        <div className="card" style={{ textAlign:'center', padding:'var(--s48)' }}>
          <p style={{ color:'var(--white-muted)' }}>No active interns. Accept applications in the ATS pipeline to onboard interns.</p>
          <Link href="/internal/ats" className="btn btn-blue" style={{ marginTop:'var(--s20)', display:'inline-flex' }}>Go to ATS →</Link>
        </div>
      ) : (
        <div className="card" style={{ padding:0, overflow:'hidden' }}>
          <table className="data-table">
            <thead><tr><th>Name</th><th>Track</th><th>Cohort</th><th>Mentor</th><th>Start</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {interns.map(intern => (
                <tr key={intern._id}>
                  <td>{intern.userId?.name ?? '—'}</td>
                  <td style={{ textTransform:'capitalize' }}>{intern.track}</td>
                  <td>{intern.cohort}</td>
                  <td style={{ color:'var(--white-muted)' }}>{intern.mentor ?? '—'}</td>
                  <td style={{ fontSize:12, color:'var(--white-subtle)' }}>{new Date(intern.startDate).toLocaleDateString('en-CM',{ dateStyle:'short' })}</td>
                  <td><span className="badge badge-green" style={{ fontSize:10 }}>{intern.status}</span></td>
                  <td><Link href={`/internal/interns/${intern._id}`} style={{ fontSize:12, color:'var(--brand-blue)' }}>View →</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
