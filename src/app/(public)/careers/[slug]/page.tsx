import type { Metadata }  from 'next'
import { notFound }       from 'next/navigation'
import Link               from 'next/link'
import { ROUTES }         from '@/constants/routes'
import dbConnect          from '@/lib/db/mongoose'
import { CareerPost }     from '@/lib/db/models/CareerPost'
import { formatDate }     from '@/lib/utils/format'

interface Props { params: { slug: string } }

async function getJob(slug: string) {
  await dbConnect()
  return CareerPost.findOne({ slug, active:true }).lean()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const j = await getJob(params.slug) as any
  if (!j) return { title:'Position not found' }
  return { title:`${j.title} — Careers — Tera-Tech` }
}

export default async function CareerDetailPage({ params }: Props) {
  const j = await getJob(params.slug) as any
  if (!j) notFound()
  return (
    <section className="section">
      <div className="container" style={{ maxWidth:860 }}>
        <Link href="/careers" style={{ fontSize:'var(--text-sm)', color:'var(--white-muted)', marginBottom:'var(--s32)', display:'inline-flex', alignItems:'center', gap:'var(--s6)' }}>← All positions</Link>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'var(--s32)', flexWrap:'wrap', gap:'var(--s20)' }}>
          <div>
            <h1 style={{ fontSize:'clamp(24px,4vw,44px)', fontWeight:300, letterSpacing:'-0.03em', marginBottom:'var(--s12)' }}>{j.title}</h1>
            <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
              <span className="badge badge-blue">{j.type}</span>
              <span className="badge badge-gray">{j.department}</span>
              <span className="badge badge-gray">{j.location}{j.remote ? ' · Remote OK' : ''}</span>
              {j.salary && <span className="badge badge-cyan">{j.salary}</span>}
            </div>
          </div>
          <Link href={ROUTES.APPLY} className="btn btn-orange">Apply Now</Link>
        </div>

        {j.closingDate && <p style={{ fontSize:'var(--text-sm)', color:'var(--brand-orange-light)', marginBottom:'var(--s32)' }}>Applications close {formatDate(j.closingDate)}</p>}

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'var(--s40)', alignItems:'start' }}>
          <div>
            <div className="prose" dangerouslySetInnerHTML={{ __html: j.description }} />
            {j.requirements?.length > 0 && (
              <div style={{ marginTop:'var(--s32)' }}>
                <h3 style={{ fontSize:'var(--text-md)', fontWeight:400, marginBottom:'var(--s16)' }}>Requirements</h3>
                <ul style={{ display:'flex', flexDirection:'column', gap:'var(--s8)' }}>
                  {j.requirements.map((r:string, i:number) => (
                    <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:'var(--s10)', fontSize:'var(--text-sm)', color:'var(--white-muted)' }}>
                      <span aria-hidden style={{ width:4, height:4, borderRadius:'50%', background:'var(--brand-blue)', marginTop:8, flexShrink:0 }} />{r}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div>
            {j.nice?.length > 0 && (
              <div className="card" style={{ marginBottom:'var(--s24)' }}>
                <p style={{ fontSize:11, fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--text-eyebrow)', marginBottom:'var(--s16)' }}>Nice to have</p>
                <ul style={{ display:'flex', flexDirection:'column', gap:'var(--s8)' }}>
                  {j.nice.map((n:string, i:number) => <li key={i} style={{ fontSize:'var(--text-sm)', color:'var(--white-muted)' }}>· {n}</li>)}
                </ul>
              </div>
            )}
            <div className="card" style={{ textAlign:'center', padding:'var(--s32)', borderColor:'rgba(0,114,206,0.2)' }}>
              <p style={{ fontSize:'var(--text-md)', fontWeight:300, marginBottom:'var(--s12)' }}>Ready to apply?</p>
              <p style={{ fontSize:'var(--text-sm)', color:'var(--white-muted)', marginBottom:'var(--s20)' }}>The process takes 15 minutes.</p>
              <Link href={ROUTES.APPLY} className="btn btn-orange" style={{ width:'100%', justifyContent:'center' }}>Start application</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
