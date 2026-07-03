import type { Metadata } from 'next'
export const metadata: Metadata = { title:'Cookie Policy — Tera-Tech Ltd' }
export default function Page() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth:780 }}>
        <p className="eyebrow">Legal</p>
        <h1 className="page-title" style={{ marginBottom:'var(--s48)' }}>Cookie Policy</h1>
        <div className="prose">
          <p>Tera-Tech Ltd uses minimal, strictly necessary cookies only. We do not use advertising cookies, tracking pixels, or third-party analytics cookies.</p>
          <h2>Cookies we set</h2>
          <p>We set one authentication session cookie (<code>next-auth.session-token</code>) when you sign in. This cookie expires when your session ends or after 7 days. It is essential for the authenticated portal to function.</p>
          <h2>Cookies we do not set</h2>
          <p>We do not set Google Analytics, Facebook Pixel, advertising, or marketing cookies. We do not use cookie consent banners because we only set necessary cookies that do not require consent under applicable law.</p>
          <h2>Third parties</h2>
          <p>Our email delivery provider (Resend) and file storage provider (Cloudinary) may set their own cookies on their respective domains when you interact with those services. We do not control those cookies.</p>
        </div>
        <p style={{ fontSize:12, color:'var(--white-subtle)', marginTop:'var(--s48)', paddingTop:'var(--s24)', borderTop:'1px solid var(--white-faint)' }}>Last updated: {new Date().toLocaleDateString('en-CM', { dateStyle:'long' })} · Tera-Tech Ltd · contact@teratechcompany.tech</p>
      </div>
    </section>
  )
}
