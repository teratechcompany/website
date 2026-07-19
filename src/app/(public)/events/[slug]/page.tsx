import type { Metadata }  from 'next'
import { notFound }       from 'next/navigation'
import Link               from 'next/link'
import dbConnect          from '@/lib/db/mongoose'
import { Event }          from '@/lib/db/models/Event'
import { formatDate }     from '@/lib/utils/format'

interface Props { params: { slug: string } }

async function getEvent(slug: string) {
  await dbConnect()
  return Event.findOne({ slug, published:true }).lean()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const e = await getEvent(params.slug)
  if (!e) return { title:'Event not found' }
  return { title:(e as any).title, description:(e as any).description }
}

export default async function EventDetailPage({ params }: Props) {
  const e = await getEvent(params.slug) as any
  if (!e) notFound()
  return (
    <article className="section">
      <div className="container" style={{ maxWidth:860 }}>
        <Link href="/events" style={{ fontSize:'var(--text-sm)', color:'var(--white-muted)', display:'inline-flex', alignItems:'center', gap:'var(--s6)', marginBottom:'var(--s32)' }}>← All events</Link>

        <span className={`badge ${e.type === 'upcoming' ? 'badge-green' : 'badge-gray'}`} style={{ marginBottom:'var(--s16)', display:'inline-flex' }}>
          {e.type === 'upcoming' ? 'Upcoming' : 'Past event'}
        </span>

        <h1 style={{ fontSize:'clamp(28px,4vw,52px)', fontWeight:300, letterSpacing:'-0.03em', color:'var(--text-heading)', lineHeight:1.1, marginBottom:'var(--s20)' }}>{e.title}</h1>

        <div style={{ display:'flex', gap:'var(--s16)', alignItems:'center', marginBottom:'var(--s40)', paddingBottom:'var(--s32)', borderBottom:'1px solid var(--white-faint)', flexWrap:'wrap' }}>
          <p style={{ fontSize:'var(--text-sm)', color:'var(--white-muted)' }}>📅 {formatDate(e.date)}</p>
          <span style={{ color:'var(--white-subtle)' }}>·</span>
          <p style={{ fontSize:'var(--text-sm)', color:'var(--white-muted)' }}>📍 {e.location}{e.virtual ? ' · Virtual' : ''}</p>
          {e.capacity && <><span style={{ color:'var(--white-subtle)' }}>·</span><p style={{ fontSize:'var(--text-sm)', color:'var(--white-muted)' }}>Capacity: {e.capacity}</p></>}
        </div>

        {e.coverImage && <img src={e.coverImage} alt={e.title} style={{ width:'100%', aspectRatio:'16/9', objectFit:'cover', borderRadius:'var(--radius-soft)', marginBottom:'var(--s40)', border:'1px solid var(--white-faint)' }} />}

        {e.content && <div className="prose" dangerouslySetInnerHTML={{ __html: e.content }} />}

        {/* Event report */}
        {e.type === 'past' && e.reportContent && (
          <div style={{ marginTop:'var(--s64)', padding:'var(--s32)', background:'var(--brand-blue-faint)', border:'1px solid var(--brand-blue-border)', borderRadius:'var(--radius-soft)' }}>
            <p style={{ fontSize:11, fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--text-eyebrow)', marginBottom:'var(--s16)' }}>Event report</p>
            <div className="prose" dangerouslySetInnerHTML={{ __html: e.reportContent }} />
          </div>
        )}

        <div style={{ marginTop:'var(--s48)', paddingTop:'var(--s32)', borderTop:'1px solid var(--white-faint)' }}>
          <Link href="/events" className="btn btn-ghost btn-sm">← All events</Link>
        </div>
      </div>
    </article>
  )
}
