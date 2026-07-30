export const dynamic = 'force-dynamic';
import type { MetadataRoute } from 'next'
import dbConnect              from '@/lib/db/mongoose'
import { BlogPost }           from '@/lib/db/models/BlogPost'
import { Event }              from '@/lib/db/models/Event'
import { AlumniProfile }      from '@/lib/db/models/AlumniProfile'
import { CareerPost }         from '@/lib/db/models/CareerPost'
import { APP }                from '@/constants/config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await dbConnect()
  const [posts, events, alumni, jobs] = await Promise.all([
    BlogPost.find({ published:true }).select('slug updatedAt').lean(),
    Event.find({ published:true }).select('slug updatedAt').lean(),
    AlumniProfile.find({ approved:true }).select('slug updatedAt').lean(),
    CareerPost.find({ active:true }).select('slug updatedAt').lean(),
  ])

  const base = APP.url
  const now  = new Date()

  const statics: MetadataRoute.Sitemap = [
    '/', '/about', '/services', '/portfolio', '/team', '/contact',
    '/faq', '/partners', '/blog', '/events', '/alumni', '/alumni/submit',
    '/careers', '/volunteer', '/newsletter',
    '/legal/privacy', '/legal/terms', '/legal/cookies', '/legal/accessibility',
  ].map(url => ({ url:`${base}${url}`, lastModified:now, changeFrequency:'monthly', priority: url==='/'?1:0.8 }))

  return [
    ...statics,
    ...(posts   as any[]).map(p => ({ url:`${base}/blog/${p.slug}`,    lastModified:p.updatedAt??now, changeFrequency:'weekly'  as const, priority:0.7 })),
    ...(events  as any[]).map(e => ({ url:`${base}/events/${e.slug}`,  lastModified:e.updatedAt??now, changeFrequency:'monthly' as const, priority:0.6 })),
    ...(alumni  as any[]).map(a => ({ url:`${base}/alumni/${a.slug}`,  lastModified:a.updatedAt??now, changeFrequency:'monthly' as const, priority:0.6 })),
    ...(jobs    as any[]).map(j => ({ url:`${base}/careers/${j.slug}`, lastModified:j.updatedAt??now, changeFrequency:'weekly'  as const, priority:0.7 })),
  ]
}
