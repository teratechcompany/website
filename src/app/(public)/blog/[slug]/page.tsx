import type { Metadata }  from 'next'
import { notFound }       from 'next/navigation'
import Link               from 'next/link'
import dbConnect          from '@/lib/db/mongoose'
import { BlogPost }       from '@/lib/db/models/BlogPost'
import { formatDate }     from '@/lib/utils/format'

interface Props { params: { slug: string } }

async function getPost(slug: string) {
  await dbConnect()
  return BlogPost.findOne({ slug, published:true }).lean()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return { title:'Post not found' }
  return { title:(post as any).title, description:(post as any).excerpt }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug) as any
  if (!post) notFound()
  return (
    <article className="section">
      <div className="container" style={{ maxWidth:800 }}>
        {/* Back */}
        <Link href="/blog" style={{ fontSize:'var(--text-sm)', color:'var(--white-muted)', display:'inline-flex', alignItems:'center', gap:'var(--s6)', marginBottom:'var(--s32)' }}>
          ← Back to blog
        </Link>

        {/* Tags */}
        <div style={{ display:'flex', gap:6, marginBottom:'var(--s20)', flexWrap:'wrap' }}>
          {post.tags?.map((t:string) => <span key={t} className="badge badge-blue" style={{ fontSize:11 }}>{t}</span>)}
        </div>

        {/* Title */}
        <h1 style={{ fontSize:'clamp(28px,4vw,48px)', fontWeight:300, letterSpacing:'-0.03em', color:'var(--text-heading)', lineHeight:1.1, marginBottom:'var(--s20)' }}>
          {post.title}
        </h1>

        {/* Meta */}
        <div style={{ display:'flex', gap:'var(--s16)', alignItems:'center', marginBottom:'var(--s40)', paddingBottom:'var(--s32)', borderBottom:'1px solid var(--white-faint)', flexWrap:'wrap' }}>
          <p style={{ fontSize:'var(--text-sm)', color:'var(--white-muted)' }}>By <strong style={{ color:'var(--white)' }}>{post.author}</strong></p>
          <span style={{ color:'var(--white-subtle)', fontSize:12 }}>·</span>
          <p style={{ fontSize:'var(--text-sm)', color:'var(--white-muted)' }}>{formatDate(post.publishedAt)}</p>
          <span style={{ color:'var(--white-subtle)', fontSize:12 }}>·</span>
          <p style={{ fontSize:'var(--text-sm)', color:'var(--white-muted)' }}>{post.readTime} min read</p>
        </div>

        {/* Cover image */}
        {post.coverImage && (
          <img src={post.coverImage} alt={post.title} style={{ width:'100%', aspectRatio:'16/9', objectFit:'cover', borderRadius:'var(--radius-soft)', marginBottom:'var(--s40)', border:'1px solid var(--white-faint)' }} />
        )}

        {/* Content */}
        <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />

        {/* Footer */}
        <div style={{ marginTop:'var(--s64)', paddingTop:'var(--s32)', borderTop:'1px solid var(--white-faint)', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'var(--s16)' }}>
          <Link href="/blog" className="btn btn-ghost btn-sm">← All posts</Link>
          <p style={{ fontSize:'var(--text-sm)', color:'var(--white-subtle)' }}>Published {formatDate(post.publishedAt)}</p>
        </div>
      </div>
    </article>
  )
}
