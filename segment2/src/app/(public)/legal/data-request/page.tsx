import type { Metadata } from 'next'
export const metadata: Metadata = { title:'Data Request — Tera-Tech Ltd' }
export default function Page() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth:780 }}>
        <p className="eyebrow">Legal</p>
        <h1 className="page-title" style={{ marginBottom:'var(--s48)' }}>Data Request</h1>
        <div className="prose">
          <p>Under applicable data protection law, you have the right to access, correct, or delete personal data we hold about you. This page explains how to exercise those rights.</p>
          <h2>What you can request</h2>
          <p>You may request: a copy of all personal data we hold about you; correction of inaccurate data; deletion of your data (subject to legal retention requirements); restriction of processing; and data portability in a machine-readable format.</p>
          <h2>How to submit a request</h2>
          <p>Email <a href="mailto:contact@teratechcompany.tech">contact@teratechcompany.tech</a> with the subject line "Data Request" and include your full name and the email address associated with your account. We will respond within 30 days.</p>
          <h2>Identity verification</h2>
          <p>We will ask you to verify your identity before processing any request. This protects your data from being disclosed to or deleted by unauthorised parties.</p>
          <h2>Retention obligations</h2>
          <p>Some data may be retained beyond a deletion request where required by law — for example, HR compliance records for current or recent interns. We will inform you if this applies to your request.</p>
        </div>
        <p style={{ fontSize:12, color:'var(--white-subtle)', marginTop:'var(--s48)', paddingTop:'var(--s24)', borderTop:'1px solid var(--white-faint)' }}>Last updated: {new Date().toLocaleDateString('en-CM', { dateStyle:'long' })} · Tera-Tech Ltd · contact@teratechcompany.tech</p>
      </div>
    </section>
  )
}
