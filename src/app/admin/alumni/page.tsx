import { requireRole }   from '@/lib/auth/guards'
import { ROLES }         from '@/constants/roles'
import dbConnect         from '@/lib/db/mongoose'
import { AlumniProfile } from '@/lib/db/models/AlumniProfile'
import { AlumniActions } from '@/components/admin/AlumniActions'

export default async function AdminAlumniPage() {
  await requireRole(ROLES.ADMIN)
  await dbConnect()
  const pending  = await AlumniProfile.find({ approved:false }).sort({ createdAt:-1 }).lean() as any[]
  const approved = await AlumniProfile.find({ approved:true  }).sort({ createdAt:-1 }).limit(20).lean() as any[]
  return (
    <div>
      <h1 style={{ fontSize:28, fontWeight:300, marginBottom:'var(--s8)' }}>Alumni Submissions</h1>
      <p style={{ color:'var(--white-muted)', marginBottom:'var(--s40)' }}>{pending.length} pending review</p>

      {pending.length > 0 && (
        <>
          <p className="eyebrow" style={{ marginBottom:'var(--s20)' }}>Pending approval</p>
          <div style={{ display:'flex', flexDirection:'column', gap:'var(--s12)', marginBottom:'var(--s48)' }}>
            {pending.map(a => (
              <div key={a._id} className="card" style={{ display:'grid', gridTemplateColumns:'1fr auto', gap:'var(--s16)', alignItems:'start' }}>
                <div>
                  <p style={{ fontWeight:600, fontSize:'var(--text-sm)', marginBottom:4 }}>{a.name}</p>
                  <p style={{ fontSize:12, color:'var(--white-muted)', marginBottom:4 }}>{a.role} at {a.company} · {a.track} · Cohort {a.cohort}</p>
                  <p style={{ fontSize:12, color:'var(--white-subtle)', fontStyle:'italic' }}>"{a.quote?.slice(0,120)}"</p>
                </div>
                <AlumniActions id={a._id.toString()} />
              </div>
            ))}
          </div>
        </>
      )}

      <p className="eyebrow" style={{ marginBottom:'var(--s20)' }}>Published ({approved.length})</p>
      <div className="card" style={{ padding:0, overflow:'hidden' }}>
        <table className="data-table">
          <thead><tr><th>Name</th><th>Company</th><th>Track</th><th>Cohort</th></tr></thead>
          <tbody>
            {approved.length === 0
              ? <tr><td colSpan={4} style={{ textAlign:'center', color:'var(--white-subtle)', padding:'var(--s32)' }}>None yet</td></tr>
              : approved.map(a => (
                <tr key={a._id}>
                  <td>{a.name}</td>
                  <td style={{ color:'var(--white-muted)' }}>{a.company}</td>
                  <td style={{ textTransform:'capitalize' }}>{a.track}</td>
                  <td>{a.cohort}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
