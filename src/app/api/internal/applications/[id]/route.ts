import { NextResponse }        from 'next/server'
import { requireRole }         from '@/lib/auth/guards'
import { ROLES }               from '@/constants/roles'
import dbConnect               from '@/lib/db/mongoose'
import { Application }         from '@/lib/db/models/Application'
import { AuditLog }            from '@/lib/db/models/AuditLog'
import { sendStatusUpdate }    from '@/lib/email/templates/statusUpdate'
import { User }                from '@/lib/db/models/User'

const VALID = ['submitted','screening','interview','offered','accepted','rejected']

export async function GET(_req: Request, { params }:{ params:{ id:string } }) {
  const session = await requireRole(ROLES.STAFF, ROLES.HR_ADMIN, ROLES.ADMIN)
  await dbConnect()
  const app = await Application.findById(params.id).lean()
  if (!app) return NextResponse.json({ error:'Not found' }, { status:404 })
  return NextResponse.json(app)
}

export async function PATCH(req: Request, { params }:{ params:{ id:string } }) {
  const session = await requireRole(ROLES.STAFF, ROLES.HR_ADMIN, ROLES.ADMIN)
  const { status, notes } = await req.json().catch(()=>({}))
  if (status && !VALID.includes(status)) return NextResponse.json({ error:'Invalid status' }, { status:400 })

  await dbConnect()
  const update: Record<string,unknown> = {}
  if (status) update.status = status
  if (notes !== undefined) update.notes = notes

  const app = await Application.findByIdAndUpdate(params.id, update, { new:true })
  if (!app) return NextResponse.json({ error:'Not found' }, { status:404 })

  // Audit
  await AuditLog.create({ userId:(session.user as any).id, action:status ? `status→${status}` : 'notes_update', resource:'Application', resourceId:app._id, ip: req.headers.get('x-forwarded-for') ?? 'unknown' })

  // Email on status change
  if (status) {
    const user = await User.findById(app.userId).select('name email')
    if (user) await sendStatusUpdate(user.email, user.name, status)
  }

  return NextResponse.json(app)
}
