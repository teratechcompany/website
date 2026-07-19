import { requireRole }   from '@/lib/auth/guards'
import { ROLES }         from '@/constants/roles'
import dbConnect         from '@/lib/db/mongoose'
import { LeaveRequest }  from '@/lib/db/models/LeaveRequest'
import { LeaveActions }  from '@/components/internal/LeaveActions'

export default async function LeavePage() {
  await requireRole(ROLES.HR_ADMIN, ROLES.ADMIN)
  await dbConnect()
  const requests = await LeaveRequest.find().populate('userId','name email').sort({ createdAt:-1 }).lean() as any[]
  const pending   = requests.filter(r => r.status === 'pending')
  const resolved  = requests.filter(r => r.status !== 'pending')

  return (
    <div>
      <h1 style={{ fontSize:28, fontWeight:300, marginBottom:'var(--s8)' }}>Leave Requests</h1>
      <p style={{ color:'var(--white-muted)', marginBottom:'var(--s40)' }}>{pending.length} pending approval</p>

      {pending.length > 0 && (
        <>
          <p className="eyebrow" style={{ marginBottom:'var(--s20)' }}>Pending</p>
          <div style={{ display:'flex', flexDirection:'column', gap:'var(--s12)', marginBottom:'var(--s48)' }}>
            {pending.map(r => <LeaveCard key={r._id} request={r} />)}
          </div>
        </>
      )}

      {resolved.length > 0 && (
        <>
          <p className="eyebrow" style={{ marginBottom:'var(--s20)' }}>Resolved</p>
          <div style={{ display:'flex', flexDirection:'column', gap:'var(--s10)' }}>
            {resolved.map(r => <LeaveCard key={r._id} request={r} resolved />)}
          </div>
        </>
      )}
    </div>
  )
}

function LeaveCard({ request: r, resolved=false }: { request:any; resolved?:boolean }) {
  return (
    <div className="card" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'var(--s16)', opacity:resolved?0.7:1 }}>
      <div>
        <p style={{ fontSize:'var(--text-sm)', fontWeight:500, color:'var(--white)', marginBottom:4 }}>{r.userId?.name}</p>
        <p style={{ fontSize:12, color:'var(--white-muted)' }}>{r.type} leave · {r.days} day{r.days!==1?'s':''} · {new Date(r.from).toLocaleDateString('en-CM',{dateStyle:'short'})} – {new Date(r.to).toLocaleDateString('en-CM',{dateStyle:'short'})}</p>
        <p style={{ fontSize:12, color:'var(--white-subtle)', marginTop:4 }}>{r.reason}</p>
      </div>
      {resolved
        ? <span className={`badge ${r.status==='approved'?'badge-green':'badge-red'}`} style={{ fontSize:11 }}>{r.status}</span>
        : <LeaveActions id={r._id.toString()} />
      }
    </div>
  )
}
