import { requireRole }  from '@/lib/auth/guards'
import { ROLES }        from '@/constants/roles'
import Link             from 'next/link'
import dbConnect        from '@/lib/db/mongoose'
import { BlogPost }     from '@/lib/db/models/BlogPost'
import { Event }        from '@/lib/db/models/Event'

export default async function CMSPage() {
  await requireRole(ROLES.ADMIN)
  await dbConnect()
  const [posts, events] = await Promise.all([
    BlogPost.find().sort({ createdAt: -1 }).select('title slug published createdAt').lean(),
    Event.find().sort({ date: -1 }).select('title slug type date published').lean(),
  ])

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 300, marginBottom: 'var(--s8)' }}>Content Management</h1>
      <p style={{ color: 'var(--white-muted)', marginBottom: 'var(--s40)' }}>Manage blog posts and events</p>

      {/* Blog posts */}
      <div style={{ marginBottom: 'var(--s48)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--s24)' }}>
          <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 300 }}>Blog posts ({posts.length})</h2>
          <Link href="/admin/cms/blog/new" className="btn btn-blue btn-sm">+ New post</Link>
        </div>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="data-table">
            <thead><tr><th>Title</th><th>Status</th><th>Created</th><th>Actions</th></tr></thead>
            <tbody>
              {posts.length === 0
                ? <tr><td colSpan={4} style={{ textAlign: 'center', color: 'var(--white-subtle)', padding: 'var(--s32)' }}>No posts yet — create your first one.</td></tr>
                : (posts as any[]).map(p => (
                  <tr key={p._id}>
                    <td style={{ fontWeight: 500 }}>{p.title}</td>
                    <td><span className={`badge ${p.published ? 'badge-green' : 'badge-gray'}`} style={{ fontSize: 10 }}>{p.published ? 'Published' : 'Draft'}</span></td>
                    <td style={{ fontSize: 12, color: 'var(--white-subtle)' }}>{new Date(p.createdAt).toLocaleDateString('en-CM', { dateStyle: 'short' })}</td>
                    <td style={{ display: 'flex', gap: 'var(--s8)' }}>
                      <Link href={`/admin/cms/blog/${p._id}`} style={{ fontSize: 12, color: 'var(--brand-blue)' }}>Edit</Link>
                      <a href={`/blog/${p.slug}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'var(--white-subtle)' }}>View ↗</a>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* Events */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--s24)' }}>
          <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 300 }}>Events ({events.length})</h2>
          <Link href="/admin/cms/events/new" className="btn btn-blue btn-sm">+ New event</Link>
        </div>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="data-table">
            <thead><tr><th>Title</th><th>Type</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {events.length === 0
                ? <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--white-subtle)', padding: 'var(--s32)' }}>No events yet.</td></tr>
                : (events as any[]).map(e => (
                  <tr key={e._id}>
                    <td style={{ fontWeight: 500 }}>{e.title}</td>
                    <td><span className={`badge ${e.type === 'upcoming' ? 'badge-green' : 'badge-gray'}`} style={{ fontSize: 10 }}>{e.type}</span></td>
                    <td style={{ fontSize: 12, color: 'var(--white-muted)' }}>{new Date(e.date).toLocaleDateString('en-CM', { dateStyle: 'short' })}</td>
                    <td><span className={`badge ${e.published ? 'badge-cyan' : 'badge-gray'}`} style={{ fontSize: 10 }}>{e.published ? 'Live' : 'Draft'}</span></td>
                    <td><Link href={`/admin/cms/events/${e._id}`} style={{ fontSize: 12, color: 'var(--brand-blue)' }}>Edit</Link></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
