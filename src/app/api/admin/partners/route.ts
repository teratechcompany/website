import { NextResponse }  from 'next/server'
import { z }             from 'zod'
import { requireRole }   from '@/lib/auth/guards'
import { ROLES }         from '@/constants/roles'
import dbConnect         from '@/lib/db/mongoose'
import { Partner }       from '@/lib/db/models/Partner'
import { safeString, safeUrl } from '@/lib/security/sanitize'

const schema = z.object({
  name:       safeString(200),
  logo:       safeUrl().optional(),
  website:    safeUrl().optional(),
  sector:     safeString(100).optional().default(''),
  location:   safeString(200).optional().default(''),
  contact:    safeString(200).optional(),
  placements: z.number().int().nonnegative().optional().default(0),
  since:      z.number().int().optional(),
})

export async function GET() {
  await dbConnect()
  const partners = await Partner.find({ active: true }).sort({ placements: -1 }).lean()
  return NextResponse.json(partners)
}

export async function POST(req: Request) {
  await requireRole(ROLES.ADMIN)
  const parsed = schema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 })
  await dbConnect()
  const partner = await Partner.create(parsed.data)
  return NextResponse.json({ id: partner._id }, { status: 201 })
}

export async function PATCH(req: Request) {
  await requireRole(ROLES.ADMIN)
  const { id, ...update } = await req.json().catch(() => ({}))
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
  await dbConnect()
  const partner = await Partner.findByIdAndUpdate(id, update, { new: true })
  return NextResponse.json(partner)
}
