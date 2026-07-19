import { NextResponse }  from 'next/server'
import { requireRole }   from '@/lib/auth/guards'
import { ROLES }         from '@/constants/roles'
import { z }             from 'zod'
import dbConnect         from '@/lib/db/mongoose'
import { User }          from '@/lib/db/models/User'
import { AuditLog }      from '@/lib/db/models/AuditLog'

const schema = z.object({
  userId: z.string().length(24),
  role:   z.enum(['applicant','intern','volunteer','staff','hr_admin','admin']),
})

export async function PATCH(req: Request) {
  const session = await requireRole(ROLES.ADMIN)
  const parsed  = schema.safeParse(await req.json().catch(()=>null))
  if (!parsed.success) return NextResponse.json({ error:'Invalid input' }, { status:400 })

  await dbConnect()
  const user = await User.findByIdAndUpdate(parsed.data.userId, { role:parsed.data.role }, { new:true })
  if (!user) return NextResponse.json({ error:'User not found' }, { status:404 })

  await AuditLog.create({ userId:(session.user as any).id, action:`role→${parsed.data.role}`, resource:'User', resourceId:user._id, ip:req.headers.get('x-forwarded-for')??'unknown' })
  return NextResponse.json({ id:user._id, role:user.role })
}
