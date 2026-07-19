import { NextResponse }   from 'next/server'
import { requireRole }    from '@/lib/auth/guards'
import { ROLES }          from '@/constants/roles'
import dbConnect          from '@/lib/db/mongoose'
import { AlumniProfile }  from '@/lib/db/models/AlumniProfile'
import { AuditLog }       from '@/lib/db/models/AuditLog'

export async function PATCH(req: Request) {
  const session = await requireRole(ROLES.ADMIN)
  const { id, approved } = await req.json().catch(()=>({}))
  if (!id || typeof approved !== 'boolean') return NextResponse.json({ error:'Invalid input' }, { status:400 })

  await dbConnect()
  const profile = await AlumniProfile.findByIdAndUpdate(id, { approved }, { new:true })
  if (!profile) return NextResponse.json({ error:'Not found' }, { status:404 })

  await AuditLog.create({ userId:(session.user as any).id, action:approved?'alumni_approved':'alumni_rejected', resource:'AlumniProfile', resourceId:profile._id })
  return NextResponse.json(profile)
}
