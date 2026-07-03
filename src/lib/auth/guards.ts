import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from './config'
import type { Role } from '@/constants/roles'

export async function requireAuth() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')
  return session
}

export async function requireRole(...roles: Role[]) {
  const session = await requireAuth()
  if (!roles.includes((session.user as any).role)) redirect('/')
  return session
}

export const getSession = () => getServerSession(authOptions)
