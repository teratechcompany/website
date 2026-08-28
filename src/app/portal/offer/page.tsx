import { requireRole }   from '@/lib/auth/guards'
import { ROLES }         from '@/constants/roles'
import dbConnect         from '@/lib/db/mongoose'
import { Application }  from '@/lib/db/models/Application'
import { OfferCard }     from '@/components/portal/OfferCard'
import Link              from 'next/link'
import { ROUTES }        from '@/constants/routes'
import styles from './OfferPage.module.css'

export default async function OfferPage() {
  const session = await requireRole(ROLES.APPLICANT, ROLES.INTERN, ROLES.STAFF, ROLES.HR_ADMIN, ROLES.ADMIN)
  await dbConnect()
  const app = await Application.findOne({
    userId: (session.user as any).id,
    status: { $in: ['offered', 'accepted'] },
  }).sort({ createdAt: -1 }).lean() as any

  if (!app) return (
    <div className={styles.noOfferContainer}>
      <h1 className={styles.noOfferTitle}>Offer letter</h1>
      <p className={styles.noOfferText}>
        No offer has been issued yet. Check your application status for updates.
      </p>
      <Link href={ROUTES.PORTAL + '/status'} className="btn btn-blue">View application status</Link>
    </div>
  )

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your offer</h1>
      <p className={styles.text}>
        {app.status === 'accepted'
          ? 'You have accepted your offer. Welcome to Tera-Tech!'
          : 'You have received an offer from Tera-Tech Ltd. Review the details below.'}
      </p>
      <OfferCard application={app} />
    </div>
  )
}
