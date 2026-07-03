import { NextResponse }                     from 'next/server'
import { z }                                from 'zod'
import { safeString, safeEmail }            from '@/lib/security/sanitize'
import { rateLimit }                        from '@/lib/security/rateLimit'
import { resend, FROM }                     from '@/lib/email/client'

const schema = z.object({
  name:    safeString(100),
  email:   safeEmail(),
  subject: safeString(200),
  message: safeString(3000),
})

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!rateLimit(`contact:${ip}`, 5, 3_600_000).ok)
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 })

  const parsed = schema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input.' }, { status: 400 })

  const { name, email, subject, message } = parsed.data
  await resend.emails.send({
    from:    FROM,
    to:      FROM,
    reply_to: email,
    subject: `[Contact] ${subject}`,
    html:    `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><hr/><p>${message.replace(/\n/g, '<br>')}</p>`,
  })

  return NextResponse.json({ message: "Message sent. We'll respond within 2 business days." })
}
