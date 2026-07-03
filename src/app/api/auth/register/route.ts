import { NextResponse }           from 'next/server'
import bcrypt                     from 'bcryptjs'
import { z }                      from 'zod'
import dbConnect                  from '@/lib/db/mongoose'
import { User }                   from '@/lib/db/models/User'
import { safeEmail, safeName, safeString } from '@/lib/security/sanitize'
import { rateLimit }              from '@/lib/security/rateLimit'

const schema = z.object({
  name:     safeName(),
  email:    safeEmail(),
  password: z.string().min(8).max(128)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase and a number'),
})

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const rl  = rateLimit(`register:${ip}`, 5, 60_000)
  if (!rl.ok) return NextResponse.json({ error: 'Too many requests. Try again in a minute.' }, { status: 429 })

  const body   = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 })

  await dbConnect()
  const exists = await User.exists({ email: parsed.data.email })
  if (exists) return NextResponse.json({ error: 'An account with that email already exists.' }, { status: 409 })

  const password = await bcrypt.hash(parsed.data.password, 12)
  await User.create({ ...parsed.data, password })

  return NextResponse.json({ message: 'Account created. Please verify your email.' }, { status: 201 })
}
