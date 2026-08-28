import { requireRole }  from '@/lib/auth/guards'
import { ROLES }        from '@/constants/roles'
import dbConnect        from '@/lib/db/mongoose'
import { Application }  from '@/lib/db/models/Application'
import { FileUploader } from '@/components/portal/FileUploader'
import styles from './DocumentsPage.module.css'

export default async function DocumentsPage() {
  const session = await requireRole(ROLES.APPLICANT, ROLES.INTERN, ROLES.STAFF, ROLES.HR_ADMIN, ROLES.ADMIN)
  await dbConnect()
  const app = await Application.findOne({ userId: (session.user as any).id }).sort({ createdAt: -1 }).lean() as any

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Documents</h1>
      <p className={styles.subtitle}>
        Upload or update your CV and portfolio link. These are shared with our review team and partner companies.
      </p>

      {app ? (
        <div className={styles.content}>
          {/* Current documents */}
          <div className="card">
            <p className={styles.cardHeader}>Current documents</p>
            <div className={styles.list}>
              <div className={styles.listItem}>
                <p className={styles.itemLabel}>CV / Resume</p>
                {app.cvUrl
                  ? <a href={app.cvUrl} target="_blank" rel="noopener noreferrer" className="btn btn-blue btn-sm">View ↗</a>
                  : <span className={`badge badge-gray ${styles.notUploadedBadge}`}>Not uploaded</span>}
              </div>
              <div className={styles.listItem}>
                <p className={styles.itemLabel}>Portfolio / GitHub</p>
                {app.portfolioUrl
                  ? <a href={app.portfolioUrl} target="_blank" rel="noopener noreferrer" className="btn btn-blue btn-sm">View ↗</a>
                  : <span className={`badge badge-gray ${styles.notUploadedBadge}`}>Not provided</span>}
              </div>
            </div>
          </div>

          {/* Upload */}
          <FileUploader applicationId={app._id.toString()} />
        </div>
      ) : (
        <div className={`card ${styles.noAppCard}`}>
          <p className={styles.noAppText}>No active application. Submit an application first to manage documents.</p>
        </div>
      )}
    </div>
  )
}
