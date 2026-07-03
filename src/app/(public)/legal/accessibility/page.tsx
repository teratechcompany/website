import type { Metadata } from 'next'
export const metadata: Metadata = { title:'Accessibility — Tera-Tech Ltd' }
export default function Page() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth:780 }}>
        <p className="eyebrow">Legal</p>
        <h1 className="page-title" style={{ marginBottom:'var(--s48)' }}>Accessibility Statement</h1>
        <div className="prose">
          <p>Tera-Tech Ltd is committed to making this website accessible to all users, including those with disabilities. We aim to meet WCAG 2.1 Level AA conformance.</p>
          <h2>Our commitments</h2>
          <p>All pages include semantic HTML, keyboard navigation support, visible focus indicators, and sufficient colour contrast ratios. All interactive elements are operable without a mouse. Images have descriptive alt text.</p>
          <h2>Known limitations</h2>
          <p>Some PDF documents linked from the site may not be fully accessible. We are working to remediate these. The WebGL globe visualisation on the home page is decorative and does not convey information that is not available elsewhere on the page.</p>
          <h2>Feedback</h2>
          <p>If you experience any accessibility barriers, please contact us at <a href="mailto:contact@teratechcompany.tech">contact@teratechcompany.tech</a>. We aim to respond within 5 business days.</p>
        </div>
        <p style={{ fontSize:12, color:'var(--white-subtle)', marginTop:'var(--s48)', paddingTop:'var(--s24)', borderTop:'1px solid var(--white-faint)' }}>Last updated: {new Date().toLocaleDateString('en-CM', { dateStyle:'long' })} · Tera-Tech Ltd · contact@teratechcompany.tech</p>
      </div>
    </section>
  )
}
