import type { Metadata } from 'next'
export const metadata: Metadata = { title:'About — Tera-Tech Ltd' }
export default function Page() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth:900 }}>
        <p className="eyebrow">About Tera-Tech</p>
        <h1 className="page-title">About Tera-Tech</h1>
        <p style={{ fontSize:'var(--text-md)', color:'var(--white-muted)', maxWidth:600 }}>Systems innovation company connecting Cameroonian tech talent to regional and global opportunities since 2018.</p>
      </div>
    </section>
  )
}
