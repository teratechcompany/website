import { NextResponse }  from 'next/server'
import { z }             from 'zod'
import bcrypt            from 'bcryptjs'
import dbConnect         from '@/lib/db/mongoose'
import { User }          from '@/lib/db/models/User'
import { ResetToken }    from '@/lib/db/models/ResetToken'

export async function POST(req: Request, { params }: { params: { token: string } }) {
  const parsed = z.object({
    password: z.string().min(8).max(128)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Must include upper, lower, and number'),
  }).safeParse(await req.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten().fieldErrors.password?.[0] ?? 'Invalid' }, { status: 400 })

  await dbConnect()
  const record = await ResetToken.findOne({ token: params.token, expiresAt: { $gt: new Date() } })
  if (!record) return NextResponse.json({ error: 'This reset link is invalid or has expired.' }, { status: 400 })

  await User.updateOne({ email: record.email }, { password: await bcrypt.hash(parsed.data.password, 12), emailVerified: true })
  await ResetToken.deleteOne({ _id: record._id })

  return NextResponse.json({ message: 'Password updated. You can now sign in.' })
}
