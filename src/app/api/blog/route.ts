import { NextResponse } from 'next/server'
import dbConnect        from '@/lib/db/mongoose'
import { BlogPost }     from '@/lib/db/models/BlogPost'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  await dbConnect()
  const { searchParams } = new URL(req.url)
  const tag    = searchParams.get('tag')
  const page   = Math.max(1, Number(searchParams.get('page') ?? 1))
  const limit  = 9
  const filter: Record<string,unknown> = { published:true }
  if (tag) filter.tags = tag
  const [posts, total] = await Promise.all([
    BlogPost.find(filter).sort({ publishedAt:-1 }).skip((page-1)*limit).limit(limit).lean(),
    BlogPost.countDocuments(filter),
  ])
  return NextResponse.json({ posts, total, page, pages:Math.ceil(total/limit) })
}
