import type { Metadata } from 'next'
export const metadata: Metadata = { title:'Terms of Service — Tera-Tech Ltd' }
export default function Page() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth:780 }}>
        <p className="eyebrow">Legal</p>
        <h1 className="page-title" style={{ marginBottom:'var(--s48)' }}>Terms of Service</h1>
        <div className="prose">
          <p>These terms govern your use of the Tera-Tech Ltd website and internship programme. By accessing our services, you agree to these terms.</p>
          <h2>Programme participation</h2>
          <p>The Tera-Tech internship programme is an unpaid training opportunity. Participation does not constitute employment. Interns must comply with the <a href="/legal/intern-code">Intern Code of Conduct</a>.</p>
          <h2>Intellectual property</h2>
          <p>Work produced during the programme that relates to client projects belongs to the respective clients. Internal tools developed may be owned jointly, as specified in individual agreements.</p>
          <h2>Application integrity</h2>
          <p>All information submitted in applications must be accurate. Misrepresentation will result in immediate disqualification or termination of participation.</p>
          <h2>Liability</h2>
          <p>Tera-Tech Ltd is not liable for outcomes after programme completion, including employment decisions made by partner companies.</p>
          <h2>Governing law</h2>
          <p>These terms are governed by the laws of the Republic of Cameroon.</p>
        </div>
        <p style={{ fontSize:12, color:'var(--white-subtle)', marginTop:'var(--s48)', paddingTop:'var(--s24)', borderTop:'1px solid var(--white-faint)' }}>Last updated: {new Date().toLocaleDateString('en-CM', { dateStyle:'long' })} · Tera-Tech Ltd · contact@teratechcompany.tech</p>
      </div>
    </section>
  )
}
