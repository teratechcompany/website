/**
 * One-time promotion endpoint.
 * POST /api/auth/promote
 * Body: { email: "you@...", secret: "<PROMOTE_SECRET from .env.local>" }
 * Disable by removing PROMOTE_SECRET from env after setup.
 */
import { NextResponse } from 'next/server'
import dbConnect        from '@/lib/db/mongoose'
import { User }         from '@/lib/db/models/User'
import { rateLimit }    from '@/lib/security/rateLimit'

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!rateLimit(`promote:${ip}`, 3, 3_600_000).ok)
    return NextResponse.json({ error: 'Too many attempts' }, { status: 429 })

  const SECRET = process.env.PROMOTE_SECRET
  if (!SECRET)
    return NextResponse.json({ error: 'Promotion not enabled. Set PROMOTE_SECRET in .env.local' }, { status: 403 })

  const { email, secret } = await req.json().catch(() => ({}))
  if (!email || secret !== SECRET)
    return NextResponse.json({ error: 'Invalid request' }, { status: 403 })

  await dbConnect()
  const user = await User.findOneAndUpdate(
    { email: String(email).toLowerCase().trim() },
    { role: 'admin', emailVerified: true },
    { new: true }
  )
  if (!user) return NextResponse.json({ error: 'No account with that email' }, { status: 404 })
  return NextResponse.json({ message: `${user.email} is now admin. Sign in at /login.` })
}
