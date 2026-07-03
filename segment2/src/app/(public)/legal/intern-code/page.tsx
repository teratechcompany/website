import type { Metadata } from 'next'
export const metadata: Metadata = { title:'Intern Code of Conduct — Tera-Tech Ltd' }
export default function Page() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth:780 }}>
        <p className="eyebrow">Legal</p>
        <h1 className="page-title" style={{ marginBottom:'var(--s48)' }}>Intern Code of Conduct</h1>
        <div className="prose">
          <p>All Tera-Tech interns are expected to uphold professional standards throughout their participation in the programme. This code applies from the date of offer acceptance through the end of the internship period.</p>
          <h2>Professionalism</h2>
          <p>Interns must maintain professional conduct in all interactions with team members, mentors, and clients. This includes punctuality, meeting commitments, and communicating proactively about any difficulties.</p>
          <h2>Confidentiality</h2>
          <p>Client project details, internal systems, and business information must not be shared outside Tera-Tech without explicit written permission. This obligation continues after the programme ends.</p>
          <h2>Integrity</h2>
          <p>Interns must represent their skills and progress honestly. Plagiarism of code, designs, or documents is grounds for immediate termination of participation.</p>
          <h2>Respect</h2>
          <p>Tera-Tech operates a zero-tolerance policy for harassment, discrimination, or bullying of any kind. All participants deserve to work in a safe, respectful environment.</p>
          <h2>Equipment and resources</h2>
          <p>Any equipment provided by Tera-Tech must be returned in good condition at programme end. Company accounts and access credentials must not be used for personal purposes.</p>
        </div>
        <p style={{ fontSize:12, color:'var(--white-subtle)', marginTop:'var(--s48)', paddingTop:'var(--s24)', borderTop:'1px solid var(--white-faint)' }}>Last updated: {new Date().toLocaleDateString('en-CM', { dateStyle:'long' })} · Tera-Tech Ltd · contact@teratechcompany.tech</p>
      </div>
    </section>
  )
}
