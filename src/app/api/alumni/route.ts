import { NextResponse }           from 'next/server'
import { z }                      from 'zod'
import dbConnect                  from '@/lib/db/mongoose'
import { AlumniProfile }          from '@/lib/db/models/AlumniProfile'
import { safeString, safeUrl }    from '@/lib/security/sanitize'
import { rateLimit }              from '@/lib/security/rateLimit'
import { slugify }                from '@/lib/utils/slugify'

const schema = z.object({
  name:     safeString(100),
  track:    safeString(50),
  cohort:   z.number().int().min(2018).max(new Date().getFullYear()),
  company:  safeString(200),
  role:     safeString(200),
  quote:    safeString(500),
  bio:      safeString(1000).optional(),
  linkedIn: safeUrl().optional(),
  location: safeString(200).optional(),
})

export async function GET(req: Request) {
  await dbConnect()
  const { searchParams } = new URL(req.url)
  const track  = searchParams.get('track')
  const filter: Record<string,unknown> = { approved:true }
  if (track) filter.track = track
  const profiles = await AlumniProfile.find(filter).sort({ cohort:-1 }).lean()
  return NextResponse.json(profiles)
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!rateLimit(`alumni:${ip}`, 3, 3_600_000).ok)
    return NextResponse.json({ error:'Too many requests' }, { status:429 })

  const parsed = schema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error:parsed.error.flatten().fieldErrors }, { status:400 })

  await dbConnect()
  const slug = slugify(`${parsed.data.name}-${parsed.data.cohort}`)
  await AlumniProfile.create({ ...parsed.data, slug, approved:false })
  return NextResponse.json({ message:'Submission received. Our team will review and publish your profile.' }, { status:201 })
}
