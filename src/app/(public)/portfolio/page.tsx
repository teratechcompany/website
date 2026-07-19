import type { Metadata }  from 'next'
import Link               from 'next/link'
import { PROJECTS, PROJECT_CATEGORY_LABELS, PROJECT_STATUS_LABELS, type ProjectCategory } from '@/constants/portfolio'
import { ROUTES }         from '@/constants/routes'

export const metadata: Metadata = {
  title:       'Portfolio — Tera-Tech Ltd',
  description: 'Products and systems built by Tera-Tech Ltd — from internal SaaS tools to client platforms and R&D projects.',
}

const STATUS_BADGE: Record<string, string> = {
  live:        'badge-green',
  beta:        'badge-cyan',
  development: 'badge-orange',
  concept:     'badge-gray',
}

const CATEGORIES: ProjectCategory[] = ['internal','client','r&d']

export default function PortfolioPage() {
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Our work</p>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'var(--s64)', flexWrap:'wrap', gap:'var(--s16)' }}>
          <h1 className="page-title" style={{ marginBottom:0 }}>
            Products we build<br />and ship.
          </h1>
          <Link href={ROUTES.APPLY} className="btn btn-orange">Join us to build</Link>
        </div>

        {CATEGORIES.map(cat => {
          const projects = PROJECTS.filter(p => p.category === cat)
          if (projects.length === 0) return null
          return (
            <div key={cat} style={{ marginBottom:'var(--s80)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'var(--s16)', marginBottom:'var(--s32)' }}>
                <p style={{ fontSize:11, fontWeight:600, letterSpacing:'0.10em', textTransform:'uppercase', color:'var(--text-eyebrow)' }}>
                  {PROJECT_CATEGORY_LABELS[cat]}
                </p>
                <div style={{ flex:1, height:1, background:'var(--white-faint)' }} />
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'var(--s24)' }}>
                {projects.map(p => (
                  <div key={p.id} className="card" style={{ padding:'var(--s32)', display:'flex', flexDirection:'column' }}>
                    {/* Header */}
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'var(--s20)', gap:'var(--s12)' }}>
                      <div>
                        {/* Product name — blue sharp box */}
                        <div style={{ display:'flex', alignItems:'center', gap:'var(--s10)', marginBottom:'var(--s6)' }}>
                          <div style={{ width:36, height:36, background:'var(--brand-blue)', borderRadius:'var(--radius-sharp)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, color:'var(--white)', letterSpacing:'-0.02em', flexShrink:0 }}>
                            {p.name[0]}
                          </div>
                          <h2 style={{ fontSize:'var(--text-xl)', fontWeight:300, letterSpacing:'-0.03em', color:'var(--white)' }}>
                            {p.name}
                          </h2>
                        </div>
                        <p style={{ fontSize:'var(--text-sm)', color:'var(--brand-blue-light)', fontWeight:500 }}>{p.tagline}</p>
                      </div>
                      <span className={`badge ${STATUS_BADGE[p.status] ?? 'badge-gray'}`} style={{ flexShrink:0 }}>
                        {PROJECT_STATUS_LABELS[p.status]}
                      </span>
                    </div>

                    {/* Description */}
                    <p style={{ fontSize:'var(--text-sm)', color:'var(--white-muted)', lineHeight:1.75, marginBottom:'var(--s20)', flexGrow:1 }}>
                      {p.description}
                    </p>

                    {/* Features */}
                    <div style={{ marginBottom:'var(--s20)' }}>
                      <p style={{ fontSize:11, fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--white-subtle)', marginBottom:'var(--s10)' }}>Key features</p>
                      <div style={{ display:'flex', flexDirection:'column', gap:'var(--s6)' }}>
                        {p.features.slice(0,4).map(f => (
                          <div key={f} style={{ display:'flex', alignItems:'flex-start', gap:'var(--s8)' }}>
                            <span aria-hidden style={{ width:4, height:4, borderRadius:'50%', background:'var(--brand-blue)', marginTop:7, flexShrink:0 }} />
                            <p style={{ fontSize:12, color:'var(--white-muted)' }}>{f}</p>
                          </div>
                        ))}
                        {p.features.length > 4 && (
                          <p style={{ fontSize:11, color:'var(--white-subtle)', marginLeft:'var(--s12)' }}>+{p.features.length - 4} more</p>
                        )}
                      </div>
                    </div>

                    {/* Tech stack */}
                    <div style={{ display:'flex', flexWrap:'wrap', gap:4, marginBottom:'var(--s16)' }}>
                      {p.tech.map(t => <span key={t} className="badge badge-blue" style={{ fontSize:10 }}>{t}</span>)}
                    </div>

                    {/* Links */}
                    {(p.liveUrl || p.repoUrl) && (
                      <div style={{ display:'flex', gap:'var(--s8)', paddingTop:'var(--s16)', borderTop:'1px solid var(--white-faint)' }}>
                        {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-blue btn-sm">View live ↗</a>}
                        {p.repoUrl && <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">Repository ↗</a>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        {/* CTA */}
        <div style={{ marginTop:'var(--s64)', padding:'var(--s48)', border:'1px solid rgba(0,114,206,0.2)', borderRadius:'var(--radius-soft)', textAlign:'center', background:'var(--brand-blue-faint)' }}>
          <h2 style={{ fontSize:'var(--text-xl)', fontWeight:300, marginBottom:'var(--s12)' }}>Want to build the next one?</h2>
          <p style={{ color:'var(--white-muted)', maxWidth:480, margin:'0 auto var(--s24)' }}>These products were built by our interns and team. Apply to join the next cohort and ship something real.</p>
          <Link href={ROUTES.APPLY} className="btn btn-orange">Apply for an internship</Link>
        </div>
      </div>
    </section>
  )
}
