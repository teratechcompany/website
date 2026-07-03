import { NextResponse }           from 'next/server'
import { getServerSession }       from 'next-auth'
import { authOptions }            from '@/lib/auth/config'
import dbConnect                  from '@/lib/db/mongoose'
import { Application }            from '@/lib/db/models/Application'

export async function GET(_req: Request, { params }:{ params:{ id:string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error:'Unauthorized' }, { status:401 })
  await dbConnect()
  const app = await Application.findOne({ _id:params.id, userId:(session.user as any).id }).lean()
  if (!app) return NextResponse.json({ error:'Not found' }, { status:404 })
  return NextResponse.json(app)
}

export async function PATCH(req: Request, { params }:{ params:{ id:string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error:'Unauthorized' }, { status:401 })
  const { status } = await req.json().catch(() => ({}))
  if (status !== 'withdrawn') return NextResponse.json({ error:'Invalid action' }, { status:400 })
  await dbConnect()
  const app = await Application.findOneAndUpdate(
    { _id:params.id, userId:(session.user as any).id, status:{ $in:['submitted','screening','interview'] } },
    { status:'withdrawn' }, { new:true }
  )
  if (!app) return NextResponse.json({ error:'Cannot withdraw at this stage' }, { status:409 })
  return NextResponse.json({ message:'Application withdrawn' })
}
