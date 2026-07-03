import type { Role } from '@/constants/roles'

export interface SessionUser {
  id:    string
  name:  string
  email: string
  role:  Role
}

// Augment next-auth types
declare module 'next-auth' {
  interface Session { user: SessionUser }
  interface User    { role: Role }
}
declare module 'next-auth/jwt' {
  interface JWT { id: string; role: Role }
}
