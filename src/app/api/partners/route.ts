import { NextResponse } from 'next/server'
import dbConnect        from '@/lib/db/mongoose'
import { Partner }      from '@/lib/db/models/Partner'

export async function GET() {
  await dbConnect()
  const partners = await Partner.find({ active: true }).sort({ placements: -1 }).lean()
  return NextResponse.json(partners)
}
