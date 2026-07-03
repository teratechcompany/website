import { NextResponse }       from 'next/server'
import { z }                  from 'zod'
import { safeEmail }          from '@/lib/security/sanitize'
import { rateLimit }          from '@/lib/security/rateLimit'
import { resend, FROM }       from '@/lib/email/client'

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!rateLimit(`newsletter:${ip}`, 3, 3_600_000).ok)
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 })

  const parsed = z.object({ email: safeEmail() }).safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })

  await resend.emails.send({
    from:    FROM,
    to:      FROM,
    subject: `Newsletter signup: ${parsed.data.email}`,
    html:    `<p>New newsletter subscriber: <strong>${parsed.data.email}</strong></p>`,
  })

  return NextResponse.json({ message: 'Subscribed! Welcome to the Tera-Tech community.' })
}
