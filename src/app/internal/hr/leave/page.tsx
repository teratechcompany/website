import { requireRole }   from '@/lib/auth/guards'
import { ROLES }         from '@/constants/roles'
import dbConnect         from '@/lib/db/mongoose'
import { LeaveRequest }  from '@/lib/db/models/LeaveRequest'
import { LeaveActions }  from '@/components/internal/LeaveActions'
import styles from './LeavePage.module.css'

export default async function LeavePage() {
  await requireRole(ROLES.HR_ADMIN, ROLES.ADMIN)
  await dbConnect()
  const requests = await LeaveRequest.find().populate('userId','name email').sort({ createdAt:-1 }).lean() as any[]
  const pending   = requests.filter(r => r.status === 'pending')
  const resolved  = requests.filter(r => r.status !== 'pending')

  return (
    <div>
      <h1 className={styles.title}>Leave Requests</h1>
      <p className={styles.subtitle}>{pending.length} pending approval</p>

      {pending.length > 0 && (
        <>
          <p className={`eyebrow ${styles.sectionTitle}`}>Pending</p>
          <div className={styles.pendingList}>
            {pending.map(r => <LeaveCard key={r._id} request={r} />)}
          </div>
        </>
      )}

      {resolved.length > 0 && (
        <>
          <p className={`eyebrow ${styles.sectionTitle}`}>Resolved</p>
          <div className={styles.resolvedList}>
            {resolved.map(r => <LeaveCard key={r._id} request={r} resolved />)}
          </div>
        </>
      )}
    </div>
  )
}

function LeaveCard({ request: r, resolved=false }: { request:any; resolved?:boolean }) {
  return (
    <div className={`card ${resolved ? styles.leaveCardResolved : styles.leaveCard}`}>
      <div>
        <p className={styles.cardName}>{r.userId?.name}</p>
        <p className={styles.cardDetails}>{r.type} leave · {r.days} day{r.days!==1?'s':''} · {new Date(r.from).toLocaleDateString('en-CM',{dateStyle:'short'})} – {new Date(r.to).toLocaleDateString('en-CM',{dateStyle:'short'})}</p>
        <p className={styles.cardReason}>{r.reason}</p>
      </div>
      {resolved
        ? <span className={`badge ${r.status==='approved'?'badge-green':'badge-red'} ${styles.statusBadge}`}>{r.status}</span>
        : <LeaveActions id={r._id.toString()} />
      }
    </div>
  )
}
