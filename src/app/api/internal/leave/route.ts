import { NextResponse }    from 'next/server'
import { requireRole }     from '@/lib/auth/guards'
import { ROLES }           from '@/constants/roles'
import dbConnect           from '@/lib/db/mongoose'
import { LeaveRequest }    from '@/lib/db/models/LeaveRequest'
import { AuditLog }        from '@/lib/db/models/AuditLog'

export async function PATCH(req: Request) {
  const session = await requireRole(ROLES.HR_ADMIN, ROLES.ADMIN)
  const { id, status } = await req.json().catch(()=>({}))
  if (!id || !['approved','rejected'].includes(status)) return NextResponse.json({ error:'Invalid' }, { status:400 })

  await dbConnect()
  const leave = await LeaveRequest.findByIdAndUpdate(id, { status, reviewedBy:(session.user as any).id }, { new:true })
  if (!leave) return NextResponse.json({ error:'Not found' }, { status:404 })

  await AuditLog.create({ userId:(session.user as any).id, action:`leave→${status}`, resource:'LeaveRequest', resourceId:leave._id })
  return NextResponse.json(leave)
}
