import { z } from 'zod'
import DOMPurify from 'isomorphic-dompurify'

export const sanitize   = (s: string) => DOMPurify.sanitize(s.trim())
export const safeString = (max = 255) => z.string().trim().max(max).transform(sanitize)
export const safeEmail  = ()           => z.string().trim().toLowerCase().email().max(254)
export const safeUrl    = ()           => z.string().url().max(2048).refine(
  u => ['http:', 'https:'].includes(new URL(u).protocol),
  { message: 'Only http/https URLs allowed' }
)
export const safeName   = ()           => safeString(100).refine(s => s.length >= 2, 'Too short')
