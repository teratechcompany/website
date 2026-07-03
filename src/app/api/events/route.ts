import { NextResponse } from 'next/server'
import dbConnect        from '@/lib/db/mongoose'
import { Event }        from '@/lib/db/models/Event'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  await dbConnect()
  const { searchParams } = new URL(req.url)
  const type   = searchParams.get('type') as 'upcoming'|'past'|null
  const filter: Record<string,unknown> = { published:true }
  if (type) filter.type = type
  const events = await Event.find(filter).sort({ date: type === 'past' ? -1 : 1 }).lean()
  return NextResponse.json(events)
}
