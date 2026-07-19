import { requireRole }   from '@/lib/auth/guards'
import { ROLES }         from '@/constants/roles'
import dbConnect         from '@/lib/db/mongoose'
import { Application }  from '@/lib/db/models/Application'
import { OfferCard }     from '@/components/portal/OfferCard'
import Link              from 'next/link'
import { ROUTES }        from '@/constants/routes'

export default async function OfferPage() {
  const session = await requireRole(ROLES.APPLICANT, ROLES.INTERN, ROLES.STAFF, ROLES.HR_ADMIN, ROLES.ADMIN)
  await dbConnect()
  const app = await Application.findOne({
    userId: (session.user as any).id,
    status: { $in: ['offered', 'accepted'] },
  }).sort({ createdAt: -1 }).lean() as any

  if (!app) return (
    <div style={{ maxWidth: 540 }}>
      <h1 style={{ fontSize: 24, fontWeight: 300, marginBottom: 'var(--s12)' }}>Offer letter</h1>
      <p style={{ color: 'var(--white-muted)', marginBottom: 'var(--s32)' }}>
        No offer has been issued yet. Check your application status for updates.
      </p>
      <Link href={ROUTES.PORTAL + '/status'} className="btn btn-blue">View application status</Link>
    </div>
  )

  return (
    <div style={{ maxWidth: 640 }}>
      <h1 style={{ fontSize: 24, fontWeight: 300, marginBottom: 'var(--s8)' }}>Your offer</h1>
      <p style={{ color: 'var(--white-muted)', marginBottom: 'var(--s40)' }}>
        {app.status === 'accepted'
          ? 'You have accepted your offer. Welcome to Tera-Tech!'
          : 'You have received an offer from Tera-Tech Ltd. Review the details below.'}
      </p>
      <OfferCard application={app} />
    </div>
  )
}
