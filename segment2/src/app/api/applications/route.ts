import { NextResponse }           from 'next/server'
import { z }                      from 'zod'
import { getServerSession }       from 'next-auth'
import { authOptions }            from '@/lib/auth/config'
import dbConnect                  from '@/lib/db/mongoose'
import { Application }            from '@/lib/db/models/Application'
import { safeString, safeEmail, safeUrl } from '@/lib/security/sanitize'
import { rateLimit }              from '@/lib/security/rateLimit'
import { sendApplicationReceived } from '@/lib/email/templates/applicationReceived'
import { TRACKS }                 from '@/constants/tracks'

const trackIds = TRACKS.map(t => t.id) as [string,...string[]]

const schema = z.object({
  track: z.enum(trackIds),
  personalInfo: z.object({
    name:        safeString(100),
    email:       safeEmail(),
    phone:       safeString(20),
    location:    safeString(200),
    nationality: safeString(100),
  }),
  background: z.object({
    education:    safeString(2000),
    experience:   safeString(2000),
    motivation:   safeString(3000),
    availability: safeString(200),
  }),
  cvUrl:        safeUrl().optional(),
  portfolioUrl: safeUrl().optional(),
})

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error:'Unauthorized' }, { status:401 })

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!rateLimit(`apply:${ip}`, 3, 3_600_000).ok)
    return NextResponse.json({ error:'Too many applications. Please try again later.' }, { status:429 })

  const parsed = schema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error:parsed.error.flatten().fieldErrors }, { status:400 })

  await dbConnect()
  const uid = (session.user as any).id
  const existing = await Application.exists({ userId:uid, status:{ $nin:['rejected','withdrawn'] } })
  if (existing) return NextResponse.json({ error:'You already have an active application.' }, { status:409 })

  const app = await Application.create({
    userId: uid, ...parsed.data,
    status:'submitted', submittedAt:new Date(),
  })

  const trackLabel = TRACKS.find(t => t.id === parsed.data.track)?.label ?? parsed.data.track
  await sendApplicationReceived(parsed.data.personalInfo.email, parsed.data.personalInfo.name, trackLabel)

  return NextResponse.json({ id:app._id }, { status:201 })
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error:'Unauthorized' }, { status:401 })
  await dbConnect()
  const apps = await Application.find({ userId:(session.user as any).id }).sort({ createdAt:-1 }).lean()
  return NextResponse.json(apps)
}
