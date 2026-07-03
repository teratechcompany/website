import { NextResponse } from 'next/server'
import dbConnect        from '@/lib/db/mongoose'
import { CareerPost }   from '@/lib/db/models/CareerPost'

export const dynamic = 'force-dynamic'

export async function GET() {
  await dbConnect()
  const jobs = await CareerPost.find({ active:true }).sort({ createdAt:-1 }).lean()
  return NextResponse.json(jobs)
}
