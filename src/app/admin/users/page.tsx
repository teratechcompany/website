import { requireRole }  from '@/lib/auth/guards'
import { ROLES }        from '@/constants/roles'
import dbConnect        from '@/lib/db/mongoose'
import { User }         from '@/lib/db/models/User'
import { UserRoleManager } from '@/components/admin/UserRoleManager'

export default async function UsersPage() {
  await requireRole(ROLES.ADMIN)
  await dbConnect()
  const users = await User.find().sort({ createdAt:-1 }).select('name email role emailVerified createdAt').lean() as any[]
  return (
    <div>
      <h1 style={{ fontSize:28, fontWeight:300, marginBottom:'var(--s8)' }}>Users & Roles</h1>
      <p style={{ color:'var(--white-muted)', marginBottom:'var(--s40)' }}>{users.length} registered accounts</p>
      <div className="card" style={{ padding:0, overflow:'hidden' }}>
        <table className="data-table">
          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Verified</th><th>Joined</th><th>Actions</th></tr></thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td style={{ color:'var(--white-muted)', fontSize:12 }}>{u.email}</td>
                <td><UserRoleManager userId={u._id.toString()} currentRole={u.role} /></td>
                <td>{u.emailVerified ? <span className="badge badge-green" style={{ fontSize:10 }}>Yes</span> : <span className="badge badge-red" style={{ fontSize:10 }}>No</span>}</td>
                <td style={{ fontSize:12, color:'var(--white-subtle)' }}>{new Date(u.createdAt).toLocaleDateString('en-CM',{ dateStyle:'short' })}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
