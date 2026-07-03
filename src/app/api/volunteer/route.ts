import { NextResponse }     from 'next/server'
import { z }                from 'zod'
import bcrypt               from 'bcryptjs'
import dbConnect            from '@/lib/db/mongoose'
import { User }             from '@/lib/db/models/User'
import { safeString, safeEmail } from '@/lib/security/sanitize'
import { rateLimit }        from '@/lib/security/rateLimit'
import { resend, FROM }     from '@/lib/email/client'

const schema = z.object({
  name:        safeString(100),
  email:       safeEmail(),
  skills:      safeString(500),
  motivation:  safeString(1000),
  availability:safeString(200),
})

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!rateLimit(`volunteer:${ip}`, 3, 3_600_000).ok)
    return NextResponse.json({ error:'Too many requests' }, { status:429 })

  const parsed = schema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error:parsed.error.flatten().fieldErrors }, { status:400 })

  await dbConnect()
  const exists = await User.exists({ email:parsed.data.email })
  if (!exists) {
    const pw = await bcrypt.hash(Math.random().toString(36), 12)
    await User.create({ name:parsed.data.name, email:parsed.data.email, password:pw, role:'volunteer' })
  }

  await resend.emails.send({
    from:FROM, to:FROM,
    subject:`Volunteer application: ${parsed.data.name}`,
    html:`<p><strong>${parsed.data.name}</strong> (${parsed.data.email})</p><p><strong>Skills:</strong> ${parsed.data.skills}</p><p><strong>Motivation:</strong> ${parsed.data.motivation}</p><p><strong>Availability:</strong> ${parsed.data.availability}</p>`,
  })

  return NextResponse.json({ message:'Application received! We will be in touch within 5 business days.' }, { status:201 })
}
