import type { Metadata } from 'next'
export const metadata: Metadata = { title:'Search — Tera-Tech Ltd' }
export default function Page() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth:900 }}>
        <p className="eyebrow">Search</p>
        <h1 className="page-title">Search</h1>
        <p style={{ fontSize:'var(--text-md)', color:'var(--white-muted)', maxWidth:600 }}>Search across blog posts, events, alumni profiles, and careers.</p>
      </div>
    </section>
  )
}
