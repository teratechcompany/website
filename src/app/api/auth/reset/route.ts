import { NextResponse }    from 'next/server'
import { z }               from 'zod'
import crypto              from 'crypto'
import dbConnect           from '@/lib/db/mongoose'
import { User }            from '@/lib/db/models/User'
import { ResetToken }      from '@/lib/db/models/ResetToken'
import { resend, FROM }    from '@/lib/email/client'
import { safeEmail }       from '@/lib/security/sanitize'
import { rateLimit }       from '@/lib/security/rateLimit'

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!rateLimit(`reset:${ip}`, 3, 3_600_000).ok)
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })

  const parsed = z.object({ email: safeEmail() }).safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Invalid email' }, { status: 400 })

  await dbConnect()
  const user = await User.findOne({ email: parsed.data.email })
  // Always succeed — never confirm whether email exists
  if (!user) return NextResponse.json({ message: 'If that email is registered, a reset link has been sent.' })

  const token     = crypto.randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000)
  await ResetToken.deleteMany({ email: parsed.data.email })
  await ResetToken.create({ email: parsed.data.email, token, expiresAt })

  const url = `${process.env.NEXTAUTH_URL}/auth/reset/${token}`
  await resend.emails.send({
    from: FROM, to: parsed.data.email,
    subject: 'Reset your Tera-Tech password',
    html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#0072CE;padding:24px 32px"><h1 style="color:#fff;font-weight:300;font-size:22px;margin:0">Tera-Tech Ltd</h1></div>
      <div style="padding:32px">
        <h2 style="font-weight:400;color:#111;margin-bottom:16px">Reset your password</h2>
        <p style="color:#555;margin-bottom:24px">This link expires in 1 hour.</p>
        <a href="${url}" style="display:inline-block;padding:12px 24px;background:#0072CE;color:#fff;text-decoration:none;border-radius:4px;font-size:14px">Reset password</a>
        <p style="margin-top:24px;font-size:13px;color:#888">If you didn't request this, ignore this email.</p>
        <p style="font-size:12px;color:#aaa;margin-top:24px">Tera-Tech Ltd · contact@teratechcompany.tech</p>
      </div></div>`,
  })
  return NextResponse.json({ message: 'If that email is registered, a reset link has been sent.' })
}
