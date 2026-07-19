import { NextResponse }  from 'next/server'
import { requireRole }   from '@/lib/auth/guards'
import { ROLES }         from '@/constants/roles'

// Settings are stored as environment variables / constants for now.
// This endpoint returns current public settings and allows admin to view them.
// In production, extend to write to a Settings collection in MongoDB.
export async function GET() {
  await requireRole(ROLES.ADMIN)
  return NextResponse.json({
    app: {
      name:    process.env.APP_NAME    ?? 'Tera-Tech Ltd',
      email:   process.env.EMAIL_FROM  ?? 'contact@teratechcompany.tech',
      url:     process.env.NEXTAUTH_URL ?? 'https://teratechcompany.tech',
    },
    integrations: {
      resend:     !!process.env.RESEND_API_KEY,
      cloudinary: !!process.env.CLOUDINARY_API_KEY,
      mongodb:    !!process.env.MONGODB_URI,
    },
  })
}
