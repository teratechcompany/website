import { requireRole }  from '@/lib/auth/guards'
import { ROLES }        from '@/constants/roles'
import dbConnect        from '@/lib/db/mongoose'
import { AuditLog }     from '@/lib/db/models/AuditLog'

export default async function AuditPage() {
  await requireRole(ROLES.ADMIN)
  await dbConnect()
  const logs = await AuditLog.find().populate('userId','name').sort({ createdAt:-1 }).limit(100).lean() as any[]
  return (
    <div>
      <h1 style={{ fontSize:28, fontWeight:300, marginBottom:'var(--s8)' }}>Audit Log</h1>
      <p style={{ color:'var(--white-muted)', marginBottom:'var(--s40)' }}>Last 100 system actions</p>
      <div className="card" style={{ padding:0, overflow:'hidden' }}>
        <table className="data-table">
          <thead><tr><th>User</th><th>Action</th><th>Resource</th><th>IP</th><th>When</th></tr></thead>
          <tbody>
            {logs.length === 0
              ? <tr><td colSpan={5} style={{ textAlign:'center', color:'var(--white-subtle)', padding:'var(--s32)' }}>No logs yet</td></tr>
              : logs.map(l => (
                <tr key={l._id}>
                  <td style={{ fontSize:12 }}>{l.userId?.name ?? 'System'}</td>
                  <td><code style={{ fontSize:11, color:'var(--brand-cyan)', background:'var(--black-elevated)', padding:'2px 6px', borderRadius:'var(--radius-sharp)' }}>{l.action}</code></td>
                  <td style={{ fontSize:12, color:'var(--white-muted)', textTransform:'capitalize' }}>{l.resource}</td>
                  <td style={{ fontSize:11, color:'var(--white-subtle)' }}>{l.ip ?? '—'}</td>
                  <td style={{ fontSize:11, color:'var(--white-subtle)' }}>{new Date(l.createdAt).toLocaleString('en-CM')}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
