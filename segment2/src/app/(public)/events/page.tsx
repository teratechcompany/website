import type { Metadata } from 'next'
export const metadata: Metadata = { title:'Events — Tera-Tech Ltd' }

async function getEvents(type: string) {
  try { const r = await fetch(`${process.env.NEXTAUTH_URL}/api/events?type=${type}`, { next:{ revalidate:300 } }); return r.ok ? r.json() : [] }
  catch { return [] }
}

export default async function EventsPage() {
  const [upcoming, past] = await Promise.all([getEvents('upcoming'), getEvents('past')])
  const formatDate = (d:string) => new Date(d).toLocaleDateString('en-CM', { dateStyle:'medium' })

  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Community</p>
        <h1 className="page-title" style={{ marginBottom:'var(--s64)' }}>Events</h1>

        {upcoming.length > 0 && (
          <>
            <h2 style={{ fontSize:'var(--text-xl)', fontWeight:300, marginBottom:'var(--s32)', color:'var(--white)' }}>Upcoming events</h2>
            <div className="grid-2" style={{ marginBottom:'var(--s64)' }}>
              {upcoming.map((e:any) => (
                <a key={e._id} href={`/events/${e.slug}`} className="card" style={{ textDecoration:'none' }}>
                  <span className="badge badge-green" style={{ marginBottom:'var(--s12)' }}>{formatDate(e.date)}</span>
                  <h3 style={{ fontSize:'var(--text-md)', fontWeight:400, marginBottom:'var(--s8)' }}>{e.title}</h3>
                  <p style={{ fontSize:'var(--text-sm)', color:'var(--white-muted)', lineHeight:1.6 }}>{e.description}</p>
                  <p style={{ fontSize:12, color:'var(--white-subtle)', marginTop:'var(--s12)' }}>{e.location}{e.virtual ? ' · Virtual' : ''}</p>
                </a>
              ))}
            </div>
          </>
        )}

        {upcoming.length === 0 && (
          <div style={{ textAlign:'center', padding:'var(--s48)', marginBottom:'var(--s64)', border:'1px solid var(--white-faint)', borderRadius:'var(--radius-soft)' }}>
            <p style={{ fontSize:'var(--text-md)', fontWeight:300, color:'var(--white-muted)' }}>No upcoming events at the moment</p>
          </div>
        )}

        {past.length > 0 && (
          <>
            <h2 style={{ fontSize:'var(--text-xl)', fontWeight:300, marginBottom:'var(--s32)', color:'var(--white)' }}>Past events</h2>
            <div className="grid-3">
              {past.map((e:any) => (
                <a key={e._id} href={`/events/${e.slug}`} className="card" style={{ textDecoration:'none', opacity:0.8 }}>
                  <span className="badge badge-gray" style={{ marginBottom:'var(--s12)' }}>{formatDate(e.date)}</span>
                  <h3 style={{ fontSize:'var(--text-base)', fontWeight:400, marginBottom:'var(--s8)' }}>{e.title}</h3>
                  <p style={{ fontSize:'var(--text-sm)', color:'var(--white-muted)' }}>{e.description}</p>
                  {e.reportContent && <span className="badge badge-blue" style={{ marginTop:'var(--s12)' }}>Report available</span>}
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
