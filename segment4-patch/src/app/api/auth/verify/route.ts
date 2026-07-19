import { NextResponse }  from 'next/server'
import { z }             from 'zod'
import dbConnect         from '@/lib/db/mongoose'
import { User }          from '@/lib/db/models/User'
import { ResetToken }    from '@/lib/db/models/ResetToken'

// Reuses ResetToken model for email verification tokens
export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get('token')
  if (!token) return NextResponse.redirect(new URL('/login?error=missing_token', req.url))

  await dbConnect()
  const record = await ResetToken.findOne({ token, expiresAt: { $gt: new Date() } })
  if (!record) return NextResponse.redirect(new URL('/login?error=invalid_token', req.url))

  await User.updateOne({ email: record.email }, { emailVerified: true })
  await ResetToken.deleteOne({ _id: record._id })

  return NextResponse.redirect(new URL('/login?verified=1', req.url))
}
