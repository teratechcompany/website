import { NextResponse }  from 'next/server'
import { getSession }    from '@/lib/auth/guards'
import { rateLimit }     from '@/lib/security/rateLimit'

const ALLOWED_TYPES = ['application/pdf','image/jpeg','image/png','image/webp']
const MAX_SIZE      = 10 * 1024 * 1024  // 10 MB

export async function POST(req: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error:'Unauthorized' }, { status:401 })

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!rateLimit(`upload:${ip}`, 10, 3_600_000).ok)
    return NextResponse.json({ error:'Upload limit reached' }, { status:429 })

  const form = await req.formData().catch(()=>null)
  if (!form) return NextResponse.json({ error:'Invalid form data' }, { status:400 })

  const file = form.get('file') as File | null
  if (!file) return NextResponse.json({ error:'No file provided' }, { status:400 })
  if (!ALLOWED_TYPES.includes(file.type)) return NextResponse.json({ error:'File type not allowed' }, { status:400 })
  if (file.size > MAX_SIZE) return NextResponse.json({ error:'File too large (max 10 MB)' }, { status:400 })

  // Upload to Cloudinary
  const CLOUD = process.env.CLOUDINARY_CLOUD_NAME
  const KEY   = process.env.CLOUDINARY_API_KEY
  const SEC   = process.env.CLOUDINARY_API_SECRET
  if (!CLOUD || !KEY || !SEC) return NextResponse.json({ error:'Storage not configured' }, { status:500 })

  const ts  = Math.round(Date.now()/1000)
  const sig = await cloudinarySign({ timestamp:ts, folder:'teratech' }, SEC)

  const upload = new FormData()
  upload.append('file',      file)
  upload.append('api_key',   KEY)
  upload.append('timestamp', String(ts))
  upload.append('signature', sig)
  upload.append('folder',    'teratech')

  const res  = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/auto/upload`, { method:'POST', body:upload })
  const data = await res.json()
  if (!res.ok) return NextResponse.json({ error:'Upload failed' }, { status:500 })

  return NextResponse.json({ url: data.secure_url, publicId: data.public_id })
}

async function cloudinarySign(params: Record<string,unknown>, secret: string) {
  const str = Object.keys(params).sort().map(k=>`${k}=${params[k]}`).join('&') + secret
  const buf = new TextEncoder().encode(str)
  const hash= await crypto.subtle.digest('SHA-1', buf)
  return Array.from(new Uint8Array(hash)).map(b=>b.toString(16).padStart(2,'0')).join('')
}
