import type { Metadata } from 'next'
export const metadata: Metadata = { title:'Partners — Tera-Tech Ltd' }
export default function Page() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth:900 }}>
        <p className="eyebrow">Our Partners</p>
        <h1 className="page-title">Our Partners</h1>
        <p style={{ fontSize:'var(--text-md)', color:'var(--white-muted)', maxWidth:600 }}>40+ companies across Cameroon and beyond that hire and collaborate with Tera-Tech interns and graduates.</p>
      </div>
    </section>
  )
}
