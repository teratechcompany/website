import type { Metadata } from 'next'
import Link              from 'next/link'
import { ROUTES }        from '@/constants/routes'
export const metadata: Metadata = { title:'Alumni — Tera-Tech Ltd' }

async function getAlumni() {
  try { const r = await fetch(`${process.env.NEXTAUTH_URL}/api/alumni`, { next:{ revalidate:300 } }); return r.ok ? r.json() : [] }
  catch { return [] }
}
const initials = (n:string) => n.split(' ').slice(0,2).map((w:string)=>w[0]).join('')

export default async function AlumniPage() {
  const alumni = await getAlumni()
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Our graduates</p>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'var(--s64)', flexWrap:'wrap', gap:'var(--s16)' }}>
          <h1 className="page-title" style={{ marginBottom:0 }}>Alumni</h1>
          <Link href={ROUTES.ALUMNI_SUBMIT} className="btn btn-ghost">Submit your profile</Link>
        </div>

        {alumni.length === 0 ? (
          <div style={{ textAlign:'center', padding:'var(--s64)', color:'var(--white-muted)' }}>
            <p style={{ fontSize:'var(--text-lg)', fontWeight:300 }}>Profiles coming soon</p>
          </div>
        ) : (
          <div className="grid-3">
            {alumni.map((a:any) => (
              <a key={a._id} href={`/alumni/${a.slug}`} className="card" style={{ textDecoration:'none' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'var(--s12)', marginBottom:'var(--s16)' }}>
                  <div style={{ width:48, height:48, borderRadius:'50%', background:'linear-gradient(135deg,var(--brand-blue),var(--brand-cyan))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, fontWeight:600, color:'var(--white)', flexShrink:0 }}>{initials(a.name)}</div>
                  <div>
                    <p style={{ fontWeight:600, fontSize:'var(--text-sm)' }}>{a.name}</p>
                    <p style={{ fontSize:12, color:'var(--white-muted)' }}>{a.role} @ {a.company}</p>
                  </div>
                </div>
                <div style={{ display:'flex', gap:6, marginBottom:'var(--s12)' }}>
                  <span className="badge badge-blue">{a.track}</span>
                  <span className="badge badge-gray">Cohort {a.cohort}</span>
                </div>
                {a.quote && <p style={{ fontSize:'var(--text-sm)', color:'var(--white-muted)', fontStyle:'italic', lineHeight:1.6 }}>"{a.quote.slice(0,120)}{a.quote.length>120?'…':''}"</p>}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
