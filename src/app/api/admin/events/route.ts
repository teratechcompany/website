import { NextResponse }  from 'next/server'
import { z }             from 'zod'
import { requireRole }   from '@/lib/auth/guards'
import { ROLES }         from '@/constants/roles'
import dbConnect         from '@/lib/db/mongoose'
import { Event }         from '@/lib/db/models/Event'
import { safeString }    from '@/lib/security/sanitize'
import { slugify }       from '@/lib/utils/slugify'

const schema = z.object({
  title:       safeString(200),
  description: safeString(500),
  content:     z.string().max(100_000).optional().default(''),
  type:        z.enum(['upcoming', 'past']),
  date:        z.string(),
  location:    safeString(300).optional().default(''),
  virtual:     z.boolean().optional().default(false),
  capacity:    z.number().int().positive().optional(),
  coverImage:  z.string().url().max(500).optional(),
  published:   z.boolean().optional().default(false),
})

export async function POST(req: Request) {
  await requireRole(ROLES.ADMIN)
  const parsed = schema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 })

  await dbConnect()
  const slug  = slugify(parsed.data.title + '-' + new Date(parsed.data.date).getFullYear())
  const event = await Event.create({ ...parsed.data, slug, date: new Date(parsed.data.date) })
  return NextResponse.json({ id: event._id, slug }, { status: 201 })
}

export async function GET() {
  await requireRole(ROLES.ADMIN)
  await dbConnect()
  const events = await Event.find().sort({ date: -1 }).lean()
  return NextResponse.json(events)
}
