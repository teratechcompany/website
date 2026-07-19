import type { Metadata } from 'next'
import Link              from 'next/link'
import { ROUTES }        from '@/constants/routes'
import { APP }           from '@/constants/config'

export const metadata: Metadata = {
  title: 'Partners — Tera-Tech Ltd',
  description: `${APP.stats.partners} companies that hire and collaborate with Tera-Tech interns and graduates.`,
}

async function getPartners() {
  try {
    const r = await fetch(`${process.env.NEXTAUTH_URL}/api/partners`, { next: { revalidate: 3600 } })
    return r.ok ? r.json() : []
  } catch { return [] }
}

const SECTORS = ['Fintech','EdTech','Logistics','Healthcare','Media','Government','NGO','Startup']

export default async function PartnersPage() {
  const partners = await getPartners()

  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Our network</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s64)', alignItems: 'center', marginBottom: 'var(--s80)' }}>
          <div>
            <h1 className="page-title" style={{ marginBottom: 'var(--s20)' }}>
              {APP.stats.partners} partner organisations<br />and counting.
            </h1>
            <p style={{ fontSize: 'var(--text-md)', color: 'var(--white-muted)', lineHeight: 1.7 }}>
              Tera-Tech partner companies commit to reviewing our graduates for open roles, hosting live project work during internships, and contributing to the regional tech ecosystem. Our 95% hire rate is built on these relationships.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--s12)' }}>
            {SECTORS.map(s => (
              <div key={s} style={{ padding: 'var(--s16)', background: 'var(--black-surface)', border: '1px solid var(--white-faint)', borderRadius: 'var(--radius-sharp)', textAlign: 'center' }}>
                <p style={{ fontSize: 12, color: 'var(--white-muted)', fontWeight: 500 }}>{s}</p>
              </div>
            ))}
          </div>
        </div>

        {partners.length === 0 ? (
          /* Placeholder grid when no DB partners yet */
          <div>
            <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 300, marginBottom: 'var(--s40)', color: 'var(--white)' }}>Our partners</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--s16)', marginBottom: 'var(--s64)' }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} style={{ height: 80, background: 'var(--black-surface)', border: '1px solid var(--white-faint)', borderRadius: 'var(--radius-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <p style={{ fontSize: 11, color: 'var(--white-subtle)', letterSpacing: '0.06em' }}>PARTNER LOGO</p>
                </div>
              ))}
            </div>
            <p style={{ textAlign: 'center', fontSize: 'var(--text-sm)', color: 'var(--white-subtle)' }}>
              Partner logos are managed in the Admin → Partners panel.
            </p>
          </div>
        ) : (
          <div>
            <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 300, marginBottom: 'var(--s40)' }}>Our partners</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--s16)' }}>
              {(partners as any[]).map((p: any) => (
                <a key={p._id} href={p.website ?? '#'} target="_blank" rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}>
                  <div className="card" style={{ textAlign: 'center', padding: 'var(--s24)', minHeight: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'var(--s10)' }}>
                    {p.logo
                      ? <img src={p.logo} alt={p.name} style={{ maxHeight: 40, maxWidth: '80%', objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.7 }} />
                      : <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--white)' }}>{p.name}</p>
                    }
                    {p.placements > 0 && <span className="badge badge-blue" style={{ fontSize: 10 }}>{p.placements} placements</span>}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Partner CTA */}
        <div style={{ marginTop: 'var(--s80)', padding: 'var(--s48)', border: '1px solid rgba(0,114,206,0.2)', borderRadius: 'var(--radius-soft)', background: 'var(--brand-blue-faint)', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 300, marginBottom: 'var(--s12)' }}>Become a partner</h2>
          <p style={{ color: 'var(--white-muted)', maxWidth: 540, margin: '0 auto var(--s32)', lineHeight: 1.7 }}>
            Partner companies get early access to our intern cohorts, dedicated hiring support, and the opportunity to shape the skills we teach. If you want to hire the next generation of Cameroonian engineers, let's talk.
          </p>
          <Link href={ROUTES.CONTACT} className="btn btn-blue btn-lg">Get in touch</Link>
        </div>
      </div>
    </section>
  )
}
