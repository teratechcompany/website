import type { Metadata } from 'next'
export const metadata: Metadata = { title:'Blog — Tera-Tech Ltd' }

async function getPosts() {
  try { const r = await fetch(`${process.env.NEXTAUTH_URL}/api/blog`, { next:{ revalidate:300 } }); return r.ok ? r.json() : { posts:[], total:0 } }
  catch { return { posts:[], total:0 } }
}

export default async function BlogPage() {
  const { posts } = await getPosts()
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">From the team</p>
        <h1 className="page-title" style={{ marginBottom:'var(--s48)' }}>Blog</h1>
        {posts.length === 0 ? (
          <div style={{ textAlign:'center', padding:'var(--s64)', color:'var(--white-muted)' }}>
            <p style={{ fontSize:'var(--text-lg)', fontWeight:300, marginBottom:'var(--s8)' }}>Coming soon</p>
            <p style={{ fontSize:'var(--text-sm)' }}>We are working on our first posts. Check back soon.</p>
          </div>
        ) : (
          <div className="grid-3">
            {posts.map((p: any) => (
              <a key={p._id} href={`/blog/${p.slug}`} className="card" style={{ textDecoration:'none', display:'flex', flexDirection:'column' }}>
                {p.coverImage && <img src={p.coverImage} alt={p.title} style={{ width:'100%', aspectRatio:'16/9', objectFit:'cover', borderRadius:'var(--radius-sharp)', marginBottom:'var(--s16)' }} />}
                <div style={{ display:'flex', gap:6, marginBottom:'var(--s12)', flexWrap:'wrap' }}>
                  {p.tags?.slice(0,2).map((t:string)=><span key={t} className="badge badge-blue" style={{ fontSize:10 }}>{t}</span>)}
                </div>
                <h2 style={{ fontSize:'var(--text-md)', fontWeight:400, marginBottom:'var(--s8)', flexGrow:1 }}>{p.title}</h2>
                <p style={{ fontSize:'var(--text-sm)', color:'var(--white-muted)', lineHeight:1.6, marginBottom:'var(--s16)' }}>{p.excerpt}</p>
                <p style={{ fontSize:11, color:'var(--white-subtle)' }}>{p.author} · {p.readTime} min read</p>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
