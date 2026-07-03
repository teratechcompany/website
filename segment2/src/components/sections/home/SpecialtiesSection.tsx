import { TRACKS } from '@/constants/tracks'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'
export function SpecialtiesSection() {
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Learning Tracks</p>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'var(--s48)', flexWrap:'wrap', gap:'var(--s16)' }}>
          <h2 className="section-title" style={{ marginBottom:0 }}>Pick the stack.<br />We handle the rest.</h2>
          <Link href={ROUTES.SERVICES} className="btn btn-ghost">View all tracks</Link>
        </div>
        <div className="grid-4">
          {TRACKS.map(t => (
            <div key={t.id} className="card" style={{ position:'relative', overflow:'hidden' }}>
              <div aria-hidden style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'var(--brand-blue)', transform:'scaleX(0)', transformOrigin:'left', transition:'transform 0.3s var(--ease)' }} className="card-accent-line" />
              <div style={{ width:36, height:36, background:'var(--brand-blue-faint)', border:'1px solid rgba(0,114,206,0.15)', borderRadius:'var(--radius-sharp)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, marginBottom:'var(--s16)' }} aria-hidden>{t.icon}</div>
              <h3 style={{ fontSize:'var(--text-base)', fontWeight:500, color:'var(--white)', marginBottom:'var(--s6)', letterSpacing:'-0.01em' }}>{t.label}</h3>
              <p style={{ fontSize:'var(--text-sm)', color:'var(--white-muted)', marginBottom:'var(--s16)' }}>{t.outcome}</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:4 }}>
                {t.tools.map(tool => <span key={tool} className="badge badge-cyan" style={{ fontSize:10 }}>{tool}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`.card:hover .card-accent-line{transform:scaleX(1)!important}`}</style>
    </section>
  )
}
