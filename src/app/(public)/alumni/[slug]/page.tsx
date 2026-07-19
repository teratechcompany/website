import type { Metadata }  from 'next'
import { notFound }       from 'next/navigation'
import Link               from 'next/link'
import dbConnect          from '@/lib/db/mongoose'
import { AlumniProfile }  from '@/lib/db/models/AlumniProfile'

interface Props { params: { slug: string } }

async function getAlumni(slug: string) {
  await dbConnect()
  return AlumniProfile.findOne({ slug, approved:true }).lean()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = await getAlumni(params.slug) as any
  if (!a) return { title:'Profile not found' }
  return { title:`${a.name} — Alumni — Tera-Tech`, description:a.quote }
}

const initials = (n:string) => n.split(' ').slice(0,2).map((w:string)=>w[0]).join('')

export default async function AlumniProfilePage({ params }: Props) {
  const a = await getAlumni(params.slug) as any
  if (!a) notFound()
  return (
    <section className="section">
      <div className="container" style={{ maxWidth:780 }}>
        <Link href="/alumni" style={{ fontSize:'var(--text-sm)', color:'var(--white-muted)', display:'inline-flex', alignItems:'center', gap:'var(--s6)', marginBottom:'var(--s32)' }}>← Alumni</Link>
        <div style={{ display:'flex', gap:'var(--s32)', alignItems:'flex-start', marginBottom:'var(--s48)', flexWrap:'wrap' }}>
          <div style={{ width:100, height:100, borderRadius:'50%', background:'linear-gradient(135deg,var(--brand-blue),var(--brand-cyan))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:32, fontWeight:600, color:'var(--white)', flexShrink:0 }}>
            {initials(a.name)}
          </div>
          <div>
            <h1 style={{ fontSize:'clamp(24px,4vw,40px)', fontWeight:300, letterSpacing:'-0.03em', marginBottom:'var(--s8)' }}>{a.name}</h1>
            <p style={{ fontSize:'var(--text-md)', color:'var(--brand-blue-light)', fontWeight:500, marginBottom:'var(--s12)' }}>{a.role} at {a.company}</p>
            <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
              <span className="badge badge-blue">{a.track}</span>
              <span className="badge badge-gray">Cohort {a.cohort}</span>
              {a.location && <span className="badge badge-gray">{a.location}</span>}
            </div>
          </div>
        </div>

        {a.quote && (
          <div style={{ borderLeft:'3px solid var(--brand-blue)', paddingLeft:'var(--s24)', marginBottom:'var(--s40)' }}>
            <p style={{ fontSize:'var(--text-lg)', fontWeight:300, color:'var(--white-dim)', fontStyle:'italic', lineHeight:1.65 }}>"{a.quote}"</p>
          </div>
        )}

        {a.bio && <p style={{ fontSize:'var(--text-md)', color:'var(--white-muted)', lineHeight:1.75, marginBottom:'var(--s40)' }}>{a.bio}</p>}

        {a.linkedIn && (
          <a href={a.linkedIn} target="_blank" rel="noopener noreferrer" className="btn btn-blue btn-sm">View LinkedIn profile ↗</a>
        )}

        <div style={{ marginTop:'var(--s48)', paddingTop:'var(--s32)', borderTop:'1px solid var(--white-faint)' }}>
          <Link href="/alumni" className="btn btn-ghost btn-sm">← All alumni</Link>
        </div>
      </div>
    </section>
  )
}
