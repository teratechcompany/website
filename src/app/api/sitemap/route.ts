import { NextResponse } from 'next/server'
import dbConnect        from '@/lib/db/mongoose'
import { BlogPost }     from '@/lib/db/models/BlogPost'
import { Event }        from '@/lib/db/models/Event'
import { AlumniProfile } from '@/lib/db/models/AlumniProfile'
import { CareerPost }   from '@/lib/db/models/CareerPost'
import { APP }          from '@/constants/config'

const STATIC = [
  '/', '/about', '/services', '/portfolio', '/team', '/contact',
  '/faq', '/partners', '/blog', '/events', '/alumni', '/alumni/submit',
  '/careers', '/volunteer', '/newsletter', '/search',
  '/legal/privacy', '/legal/terms', '/legal/cookies', '/legal/accessibility',
]

export async function GET() {
  await dbConnect()
  const [posts, events, alumni, jobs] = await Promise.all([
    BlogPost.find({ published:true }).select('slug updatedAt').lean(),
    Event.find({ published:true }).select('slug updatedAt').lean(),
    AlumniProfile.find({ approved:true }).select('slug updatedAt').lean(),
    CareerPost.find({ active:true }).select('slug updatedAt').lean(),
  ])

  const urls = [
    ...STATIC.map(path => ({ path, updatedAt:new Date().toISOString() })),
    ...(posts    as any[]).map(p => ({ path:`/blog/${p.slug}`,    updatedAt:p.updatedAt?.toISOString() })),
    ...(events   as any[]).map(e => ({ path:`/events/${e.slug}`,  updatedAt:e.updatedAt?.toISOString() })),
    ...(alumni   as any[]).map(a => ({ path:`/alumni/${a.slug}`,  updatedAt:a.updatedAt?.toISOString() })),
    ...(jobs     as any[]).map(j => ({ path:`/careers/${j.slug}`, updatedAt:j.updatedAt?.toISOString() })),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${APP.url}${u.path}</loc>
    <lastmod>${u.updatedAt ?? new Date().toISOString()}</lastmod>
  </url>`).join('\n')}
</urlset>`

  return new NextResponse(xml, { headers: { 'Content-Type':'application/xml' } })
}
