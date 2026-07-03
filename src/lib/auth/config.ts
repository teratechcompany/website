import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import dbConnect from '@/lib/db/mongoose'
import { User } from '@/lib/db/models/User'
import { safeEmail } from '@/lib/security/sanitize'
import { z } from 'zod'

const loginSchema = z.object({
  email:    safeEmail(),
  password: z.string().min(8).max(128),
})

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: { email: {}, password: {} },
      async authorize(creds) {
        const parsed = loginSchema.safeParse(creds)
        if (!parsed.success) return null
        await dbConnect()
        const user = await User.findOne({ email: parsed.data.email }).select('+password')
        if (!user) return null
        const match = await bcrypt.compare(parsed.data.password, user.password)
        if (!match) return null
        if (!user.emailVerified) throw new Error('EMAIL_NOT_VERIFIED')
        return { id: String(user._id), email: user.email, name: user.name, role: user.role }
      },
    }),
  ],
  callbacks: {
    jwt:     ({ token, user }) => user ? { ...token, id: user.id, role: (user as any).role } : token,
    session: ({ session, token }) => ({
      ...session,
      user: { ...session.user, id: token.id as string, role: token.role as string },
    }),
  },
  pages:   { signIn: '/login', error: '/login' },
  session: { strategy: 'jwt', maxAge: 7 * 24 * 60 * 60 },
  secret:  process.env.NEXTAUTH_SECRET,
}
