import type { Metadata } from 'next'
import { TRACKS }        from '@/constants/tracks'
import Link              from 'next/link'
import { ROUTES }        from '@/constants/routes'
export const metadata: Metadata = { title:'Specialities — Tera-Tech Ltd' }
export default function ServicesPage() {
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Learning Tracks</p>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'var(--s64)', flexWrap:'wrap', gap:'var(--s16)' }}>
          <h1 className="page-title" style={{ marginBottom:0 }}>Eight specialities.<br />One programme.</h1>
          <Link href={ROUTES.APPLY} className="btn btn-orange">Apply now</Link>
        </div>
        <div className="grid-2" style={{ gap:'var(--s24)' }}>
          {TRACKS.map(t => (
            <div key={t.id} className="card" style={{ padding:'var(--s32)' }}>
              <h2 style={{ fontSize:'var(--text-lg)', fontWeight:400, marginBottom:'var(--s8)' }}>{t.label}</h2>
              <p style={{ fontSize:'var(--text-sm)', color:'var(--white-muted)', marginBottom:'var(--s20)' }}>{t.outcome}</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                {t.tools.map(tool => <span key={tool} className="badge badge-blue" style={{ fontSize:11 }}>{tool}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
