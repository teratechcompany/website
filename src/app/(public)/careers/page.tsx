import type { Metadata } from 'next'
import Link              from 'next/link'
import { ROUTES }        from '@/constants/routes'
export const metadata: Metadata = { title:'Careers — Tera-Tech Ltd' }

async function getJobs() {
  try { const r = await fetch(`${process.env.NEXTAUTH_URL}/api/careers`, { next:{ revalidate:300 } }); return r.ok ? r.json() : [] }
  catch { return [] }
}

export default async function CareersPage() {
  const jobs = await getJobs()
  return (
    <section className="section"><div className="container">
      <p className="eyebrow">Work with us</p>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'var(--s64)', flexWrap:'wrap', gap:'var(--s16)' }}>
        <h1 className="page-title" style={{ marginBottom:0 }}>Open positions</h1>
        <Link href={ROUTES.VOLUNTEER} className="btn btn-ghost">Volunteer instead</Link>
      </div>
      {jobs.length === 0 ? (
        <div style={{ textAlign:'center', padding:'var(--s64)', border:'1px solid var(--white-faint)', borderRadius:'var(--radius-soft)', color:'var(--white-muted)' }}>
          <p style={{ fontSize:'var(--text-lg)', fontWeight:300, marginBottom:'var(--s8)' }}>No open positions right now</p>
          <p style={{ fontSize:'var(--text-sm)' }}>Check back soon, or <a href={`mailto:${process.env.NEXTAUTH_URL ? 'contact@teratechcompany.tech' : '#'}`} style={{ color:'var(--brand-blue)' }}>send a speculative application</a>.</p>
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:'var(--s12)' }}>
          {jobs.map((j:any) => (
            <a key={j._id} href={`/careers/${j.slug}`} className="card" style={{ textDecoration:'none', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'var(--s16)' }}>
              <div>
                <h2 style={{ fontSize:'var(--text-md)', fontWeight:400, marginBottom:'var(--s6)' }}>{j.title}</h2>
                <p style={{ fontSize:'var(--text-sm)', color:'var(--white-muted)' }}>{j.department} · {j.location}{j.remote ? ' · Remote OK' : ''}</p>
              </div>
              <div style={{ display:'flex', gap:6, flexShrink:0 }}>
                <span className="badge badge-blue">{j.type}</span>
                {j.salary && <span className="badge badge-gray">{j.salary}</span>}
              </div>
            </a>
          ))}
        </div>
      )}
    </div></section>
  )
}
