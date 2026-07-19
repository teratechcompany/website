import { requireRole }  from '@/lib/auth/guards'
import { ROLES }        from '@/constants/roles'
import dbConnect        from '@/lib/db/mongoose'
import { Application }  from '@/lib/db/models/Application'
import { FileUploader } from '@/components/portal/FileUploader'

export default async function DocumentsPage() {
  const session = await requireRole(ROLES.APPLICANT, ROLES.INTERN, ROLES.STAFF, ROLES.HR_ADMIN, ROLES.ADMIN)
  await dbConnect()
  const app = await Application.findOne({ userId: (session.user as any).id }).sort({ createdAt: -1 }).lean() as any

  return (
    <div style={{ maxWidth: 600 }}>
      <h1 style={{ fontSize: 24, fontWeight: 300, marginBottom: 'var(--s8)' }}>Documents</h1>
      <p style={{ color: 'var(--white-muted)', marginBottom: 'var(--s40)' }}>
        Upload or update your CV and portfolio link. These are shared with our review team and partner companies.
      </p>

      {app ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s24)' }}>
          {/* Current documents */}
          <div className="card">
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--white-muted)', marginBottom: 'var(--s16)' }}>Current documents</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s12)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--s12)', background: 'var(--black-elevated)', borderRadius: 'var(--radius-sharp)' }}>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--white-muted)' }}>CV / Resume</p>
                {app.cvUrl
                  ? <a href={app.cvUrl} target="_blank" rel="noopener noreferrer" className="btn btn-blue btn-sm">View ↗</a>
                  : <span className="badge badge-gray" style={{ fontSize: 10 }}>Not uploaded</span>}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--s12)', background: 'var(--black-elevated)', borderRadius: 'var(--radius-sharp)' }}>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--white-muted)' }}>Portfolio / GitHub</p>
                {app.portfolioUrl
                  ? <a href={app.portfolioUrl} target="_blank" rel="noopener noreferrer" className="btn btn-blue btn-sm">View ↗</a>
                  : <span className="badge badge-gray" style={{ fontSize: 10 }}>Not provided</span>}
              </div>
            </div>
          </div>

          {/* Upload */}
          <FileUploader applicationId={app._id.toString()} />
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: 'var(--s48)' }}>
          <p style={{ color: 'var(--white-muted)' }}>No active application. Submit an application first to manage documents.</p>
        </div>
      )}
    </div>
  )
}
