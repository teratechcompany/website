import { withAuth }                    from 'next-auth/middleware'
import { NextResponse, type NextRequest } from 'next/server'

// Role → route prefix map
const ROLE_ROUTES: Record<string, string[]> = {
  '/portal':   ['applicant','intern','staff','hr_admin','admin'],
  '/internal': ['staff','hr_admin','admin'],
  '/admin':    ['admin'],
}

export default withAuth(
  function middleware(req: NextRequest & { nextauth: { token: { role?: string } | null } }) {
    const { pathname } = req.nextUrl
    const role = req.nextauth.token?.role ?? ''

    const entry = Object.entries(ROLE_ROUTES)
      .find(([prefix]) => pathname.startsWith(prefix))

    if (entry && !entry[1].includes(role))
      return NextResponse.redirect(new URL('/login', req.url))

    return NextResponse.next()
  },
  { callbacks: { authorized: ({ token }) => !!token } }
)

export const config = {
  matcher: ['/portal/:path*', '/internal/:path*', '/admin/:path*'],
}
