import type { Metadata } from 'next'
export const metadata: Metadata = { title:'Newsletter — Tera-Tech Ltd' }
export default function Page() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth:900 }}>
        <p className="eyebrow">Newsletter</p>
        <h1 className="page-title">Newsletter</h1>
        <p style={{ fontSize:'var(--text-md)', color:'var(--white-muted)', maxWidth:600 }}>Stay updated on intern cohorts, events, and news from the Tera-Tech community.</p>
      </div>
    </section>
  )
}
