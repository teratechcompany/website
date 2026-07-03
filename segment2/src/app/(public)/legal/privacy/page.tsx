import type { Metadata } from 'next'
export const metadata: Metadata = { title:'Privacy Policy — Tera-Tech Ltd' }
export default function Page() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth:780 }}>
        <p className="eyebrow">Legal</p>
        <h1 className="page-title" style={{ marginBottom:'var(--s48)' }}>Privacy Policy</h1>
        <div className="prose">
          <p>Tera-Tech Ltd (<strong>we, us</strong>) is the data controller for information collected through this website and our internship programme. We collect only the information necessary to operate the programme, communicate with applicants, and fulfil our legal obligations.</p>
          <h2>What we collect</h2>
          <p>We collect name, email, phone number, CV, portfolio links, and application content submitted through the application form. We also collect standard web server logs including IP addresses and browser information.</p>
          <h2>How we use it</h2>
          <p>Application data is used solely to evaluate and manage internship applications. Contact information is used to communicate about the programme. We do not sell data to third parties and do not use it for advertising.</p>
          <h2>Storage and retention</h2>
          <p>Data is stored on MongoDB Atlas servers (EU region). Unsuccessful applications are deleted after 12 months. Active intern records are kept for 5 years for HR compliance.</p>
          <h2>Your rights</h2>
          <p>You may request access to, correction of, or deletion of your personal data at any time by emailing contact@teratechcompany.tech. We will respond within 30 days.</p>
          <h2>Cookies</h2>
          <p>We use only a single session cookie for authentication. No advertising or tracking cookies are set. See our <a href="/legal/cookies">Cookie Policy</a> for details.</p>
        </div>
        <p style={{ fontSize:12, color:'var(--white-subtle)', marginTop:'var(--s48)', paddingTop:'var(--s24)', borderTop:'1px solid var(--white-faint)' }}>Last updated: {new Date().toLocaleDateString('en-CM', { dateStyle:'long' })} · Tera-Tech Ltd · contact@teratechcompany.tech</p>
      </div>
    </section>
  )
}
