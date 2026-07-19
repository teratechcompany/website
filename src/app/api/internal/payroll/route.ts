import { NextResponse }    from 'next/server'
import { requireRole }     from '@/lib/auth/guards'
import { ROLES }           from '@/constants/roles'
import { z }               from 'zod'
import dbConnect           from '@/lib/db/mongoose'
import { PayrollRecord }   from '@/lib/db/models/PayrollRecord'
import { User }            from '@/lib/db/models/User'
import { AuditLog }        from '@/lib/db/models/AuditLog'

const schema = z.object({
  name:   z.string().min(1).max(100),
  period: z.string().regex(/^\d{4}-\d{2}$/),
  gross:  z.number().positive(),
  net:    z.number().nonnegative(),
  deductions: z.array(z.object({ label: z.string(), amount: z.number() })),
})

export async function GET() {
  await requireRole(ROLES.HR_ADMIN, ROLES.ADMIN)
  await dbConnect()
  const records = await PayrollRecord.find().populate('userId', 'name email').sort({ createdAt: -1 }).lean()
  return NextResponse.json(records)
}

export async function POST(req: Request) {
  const session = await requireRole(ROLES.HR_ADMIN, ROLES.ADMIN)
  const parsed  = schema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 })

  await dbConnect()
  // Find user by name — in production pass userId directly
  const user = await User.findOne({ name: new RegExp(parsed.data.name, 'i') }).select('_id')
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const record = await PayrollRecord.create({
    userId: user._id, period: parsed.data.period,
    gross: parsed.data.gross, net: parsed.data.net,
    deductions: parsed.data.deductions, currency: 'XAF', status: 'draft',
  })

  await AuditLog.create({
    userId: (session.user as any).id, action: 'payroll_created',
    resource: 'PayrollRecord', resourceId: record._id,
    meta: { period: parsed.data.period, net: parsed.data.net },
    ip: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown',
  })

  return NextResponse.json({ id: record._id }, { status: 201 })
}
