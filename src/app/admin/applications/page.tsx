import { requireRole }  from '@/lib/auth/guards'
import { ROLES }        from '@/constants/roles'
import Link             from 'next/link'
import dbConnect        from '@/lib/db/mongoose'
import { Application }  from '@/lib/db/models/Application'

const BADGE: Record<string, string> = {
  draft:'badge-gray', submitted:'badge-orange', screening:'badge-blue',
  interview:'badge-cyan', offered:'badge-cyan', accepted:'badge-green',
  rejected:'badge-red', withdrawn:'badge-gray',
}

export default async function AdminApplicationsPage() {
  await requireRole(ROLES.ADMIN)
  await dbConnect()
  const apps = await Application.find().sort({ createdAt: -1 }).lean() as any[]

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 300, marginBottom: 'var(--s8)' }}>All Applications</h1>
      <p style={{ color: 'var(--white-muted)', marginBottom: 'var(--s40)' }}>{apps.length} total applications</p>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="data-table">
          <thead><tr><th>Applicant</th><th>Track</th><th>Status</th><th>Submitted</th><th>Actions</th></tr></thead>
          <tbody>
            {apps.length === 0
              ? <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--white-subtle)', padding: 'var(--s32)' }}>No applications yet</td></tr>
              : apps.map(a => (
                <tr key={a._id}>
                  <td>
                    <div>
                      <p style={{ fontWeight: 500, fontSize: 'var(--text-sm)' }}>{a.personalInfo?.name ?? '—'}</p>
                      <p style={{ fontSize: 11, color: 'var(--white-subtle)' }}>{a.personalInfo?.email}</p>
                    </div>
                  </td>
                  <td style={{ textTransform: 'capitalize', fontSize: 'var(--text-sm)' }}>{a.track}</td>
                  <td><span className={`badge ${BADGE[a.status] ?? 'badge-gray'}`} style={{ fontSize: 10 }}>{a.status}</span></td>
                  <td style={{ fontSize: 12, color: 'var(--white-subtle)' }}>{a.submittedAt ? new Date(a.submittedAt).toLocaleDateString('en-CM', { dateStyle: 'short' }) : '—'}</td>
                  <td><Link href={`/internal/ats/${a._id}`} style={{ fontSize: 12, color: 'var(--brand-blue)' }}>Review →</Link></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
