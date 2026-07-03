import { SignJWT, jwtVerify } from 'jose'

const secret = new TextEncoder().encode(
  process.env.CSRF_SECRET ?? 'dev-csrf-insecure-change-in-prod'
)

export const createCsrfToken = (sessionId: string) =>
  new SignJWT({ sid: sessionId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(secret)

export const verifyCsrfToken = async (token: string, sessionId: string) => {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload.sid === sessionId
  } catch { return false }
}
