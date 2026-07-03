import { requireRole }  from '@/lib/auth/guards'
import { ROLES }        from '@/constants/roles'
import Link             from 'next/link'
import { ROUTES }       from '@/constants/routes'
import dbConnect        from '@/lib/db/mongoose'
import { Application }  from '@/lib/db/models/Application'

export default async function PortalPage() {
  const session = await requireRole(ROLES.APPLICANT, ROLES.INTERN, ROLES.STAFF, ROLES.HR_ADMIN, ROLES.ADMIN)
  await dbConnect()
  const app = await Application.findOne({ userId:(session.user as any).id }).sort({ createdAt:-1 }).lean()

  return (
    <div>
      <h1 style={{ fontSize:28, fontWeight:300, marginBottom:'var(--s8)' }}>Welcome back, {session.user.name.split(' ')[0]}</h1>
      <p style={{ color:'var(--white-muted)', marginBottom:'var(--s40)' }}>Your Tera-Tech internship portal</p>

      {app ? (
        <div className="grid-2" style={{ gap:'var(--s16)', marginBottom:'var(--s40)' }}>
          <div className="card">
            <p style={{ fontSize:11, fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--white-muted)', marginBottom:'var(--s12)' }}>Application status</p>
            <p style={{ fontSize:'var(--text-lg)', fontWeight:300, color:'var(--brand-blue-light)', textTransform:'capitalize', marginBottom:'var(--s16)' }}>{(app as any).status}</p>
            <Link href={ROUTES.PORTAL+'/status'} className="btn btn-ghost btn-sm">View full status →</Link>
          </div>
          <div className="card">
            <p style={{ fontSize:11, fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--white-muted)', marginBottom:'var(--s12)' }}>Track</p>
            <p style={{ fontSize:'var(--text-md)', fontWeight:300, color:'var(--white)', marginBottom:'var(--s16)', textTransform:'capitalize' }}>{(app as any).track}</p>
            <p style={{ fontSize:12, color:'var(--white-subtle)' }}>Applied {new Date((app as any).submittedAt ?? (app as any).createdAt).toLocaleDateString('en-CM', { dateStyle:'medium' })}</p>
          </div>
        </div>
      ) : (
        <div className="card" style={{ textAlign:'center', padding:'var(--s48)', marginBottom:'var(--s40)' }}>
          <h2 style={{ fontSize:'var(--text-lg)', fontWeight:300, marginBottom:'var(--s12)' }}>No application yet</h2>
          <p style={{ color:'var(--white-muted)', marginBottom:'var(--s24)' }}>Submit your application to get started.</p>
          <Link href={ROUTES.APPLY} className="btn btn-orange">Apply now</Link>
        </div>
      )}
    </div>
  )
}
