import { NextResponse }  from 'next/server'
import { z }             from 'zod'
import { requireRole }   from '@/lib/auth/guards'
import { ROLES }         from '@/constants/roles'
import dbConnect         from '@/lib/db/mongoose'
import { BlogPost }      from '@/lib/db/models/BlogPost'
import { safeString }    from '@/lib/security/sanitize'
import { slugify }       from '@/lib/utils/slugify'

const schema = z.object({
  title:      safeString(200),
  excerpt:    safeString(400),
  content:    z.string().max(100_000),
  tags:       z.array(safeString(50)).max(10).optional().default([]),
  coverImage: z.string().url().max(500).optional(),
  published:  z.boolean().optional().default(false),
  readTime:   z.number().int().min(1).max(60).optional().default(5),
})

export async function POST(req: Request) {
  const session = await requireRole(ROLES.ADMIN)
  const parsed  = schema.safeParse(await req.json().catch(()=>null))
  if (!parsed.success) return NextResponse.json({ error:parsed.error.flatten().fieldErrors }, { status:400 })

  await dbConnect()
  const slug = slugify(parsed.data.title)
  const post = await BlogPost.create({
    ...parsed.data, slug,
    author:   session.user.name,
    authorId: (session.user as any).id,
    publishedAt: new Date(),
  })
  return NextResponse.json({ id:post._id, slug }, { status:201 })
}

export async function GET() {
  await requireRole(ROLES.ADMIN)
  await dbConnect()
  const posts = await BlogPost.find().sort({ createdAt:-1 }).lean()
  return NextResponse.json(posts)
}
