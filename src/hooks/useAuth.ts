'use client'
import { useSession } from 'next-auth/react'
import type { Role } from '@/constants/roles'

export function useAuth() {
  const { data: session, status } = useSession()
  const user = session?.user
  return {
    user,
    role:      user ? (user as any).role as Role : null,
    isLoading: status === 'loading',
    isAuthed:  status === 'authenticated',
    hasRole:   (...roles: Role[]) => roles.includes((user as any)?.role),
  }
}
