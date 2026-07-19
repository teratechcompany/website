'use client'
import { useState }    from 'react'
import { useRouter }   from 'next/navigation'
import { Input }       from '@/components/ui/Input'
import { Button }      from '@/components/ui/Button'

export default function NewBlogPostPage() {
  const router = useRouter()
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', tags: '', coverImage: '', readTime: '5', published: false })
  const [saving, setSaving] = useState(false)
  const [error,  setError]  = useState('')
  const update = (k: keyof typeof form) => (v: string | boolean) => setForm(f => ({ ...f, [k]: v }))

  const save = async (pub: boolean) => {
    setSaving(true); setError('')
    const res = await fetch('/api/admin/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean), readTime: Number(form.readTime), published: pub }),
    })
    const data = await res.json()
    setSaving(false)
    if (!res.ok) { setError(JSON.stringify(data.error)); return }
    router.push('/admin/cms')
  }

  return (
    <div style={{ maxWidth: 860 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--s32)', flexWrap: 'wrap', gap: 'var(--s12)' }}>
        <h1 style={{ fontSize: 24, fontWeight: 300 }}>New blog post</h1>
        <div style={{ display: 'flex', gap: 'var(--s8)' }}>
          <Button variant="ghost" onClick={() => save(false)} loading={saving}>Save draft</Button>
          <Button variant="blue"  onClick={() => save(true)}  loading={saving}>Publish</Button>
        </div>
      </div>

      {error && <p role="alert" style={{ color: 'var(--danger)', fontSize: 'var(--text-sm)', marginBottom: 'var(--s16)', padding: 'var(--s12)', background: 'rgba(239,68,68,0.08)', borderRadius: 'var(--radius-sharp)' }}>{error}</p>}

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--s24)', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s16)' }}>
          <Input id="title"   label="Title"   value={form.title}   onChange={e => update('title')(e.target.value)}   placeholder="Post title" required />
          <Input id="excerpt" label="Excerpt (shown in listing)" value={form.excerpt} onChange={e => update('excerpt')(e.target.value)} placeholder="Brief summary — max 400 characters" />
          <div className="field">
            <label className="label" htmlFor="content">Content (HTML)</label>
            <textarea id="content" className="input" value={form.content} onChange={e => update('content')(e.target.value)} rows={20} placeholder="<p>Start writing your post...</p>" style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }} />
            <span className="field-hint">HTML is supported. Use &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;blockquote&gt;, &lt;code&gt;, &lt;pre&gt;.</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s16)' }}>
          <Input id="tags"       label="Tags (comma separated)"  value={form.tags}       onChange={e => update('tags')(e.target.value)}       placeholder="tech, internship, cameroon" />
          <Input id="coverImage" label="Cover image URL"          value={form.coverImage} onChange={e => update('coverImage')(e.target.value)} placeholder="https://..." type="url" />
          <Input id="readTime"   label="Read time (minutes)"      value={form.readTime}   onChange={e => update('readTime')(e.target.value)}   type="number" min="1" max="60" />
          <div className="card" style={{ padding: 'var(--s16)' }}>
            <p style={{ fontSize: 12, color: 'var(--white-muted)', marginBottom: 'var(--s8)' }}>After saving, the post will appear at:</p>
            <p style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--brand-blue)' }}>/blog/[slug]</p>
          </div>
        </div>
      </div>
    </div>
  )
}
