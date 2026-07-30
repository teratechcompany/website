'use client'
export const dynamic = 'force-dynamic';
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useDebounce } from '@/hooks/useDebounce'

type Result = { _id: string; _type: 'blog'|'event'|'alumni'|'career'; title?: string; name?: string; slug: string; excerpt?: string; description?: string; company?: string; role?: string; track?: string; type?: string; date?: string; department?: string }

const TYPE_LABEL: Record<string, string> = { blog: 'Blog', event: 'Event', alumni: 'Alumni', career: 'Career' }
const TYPE_PATH:  Record<string, string> = { blog: '/blog', event: '/events', alumni: '/alumni', career: '/careers' }
const TYPE_BADGE: Record<string, string> = { blog: 'badge-blue', event: 'badge-green', alumni: 'badge-cyan', career: 'badge-orange' }

function SearchContent() {
  const sp     = useSearchParams()
  const router = useRouter()
  const [q,       setQ]       = useState(sp.get('q') ?? '')
  const [results, setResults] = useState<Result[]>([])
  const [loading, setLoading] = useState(false)
  const [searched,setSearched]= useState(false)
  const dq = useDebounce(q, 400)

  useEffect(() => {
    if (!dq.trim() || dq.length < 2) { setResults([]); setSearched(false); return }
    setLoading(true); setSearched(false)
    fetch(`/api/search?q=${encodeURIComponent(dq)}`)
      .then(r => r.json())
      .then(d => { setResults(d.results ?? []); setSearched(true) })
      .finally(() => setLoading(false))
  }, [dq])

  const label = (r: Result) => r.title ?? r.name ?? 'Untitled'
  const sub   = (r: Result) => r.excerpt ?? r.description ?? (r.company ? `${r.role} at ${r.company}` : r.department) ?? ''

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 760 }}>
        <p className="eyebrow">Search</p>
        <h1 className="page-title" style={{ marginBottom: 'var(--s32)' }}>Find anything.</h1>

        {/* Search input */}
        <div style={{ position: 'relative', marginBottom: 'var(--s40)' }}>
          <input
            value={q} onChange={e => setQ(e.target.value)}
            className="input" placeholder="Search blog posts, events, alumni, careers…"
            style={{ paddingLeft: 'var(--s44)', fontSize: 'var(--text-md)', height: 52 }}
            autoFocus aria-label="Search"
          />
          <span aria-hidden style={{ position: 'absolute', left: 'var(--s16)', top: '50%', transform: 'translateY(-50%)', color: 'var(--white-subtle)', fontSize: 18 }}>🔍</span>
          {loading && <span style={{ position: 'absolute', right: 'var(--s16)', top: '50%', transform: 'translateY(-50%)', color: 'var(--white-subtle)', fontSize: 12 }}>···</span>}
        </div>

        {/* Results */}
        {searched && results.length === 0 && (
          <div style={{ textAlign: 'center', padding: 'var(--s48)', color: 'var(--white-muted)' }}>
            <p style={{ fontSize: 'var(--text-lg)', fontWeight: 300, marginBottom: 'var(--s8)' }}>No results for "{q}"</p>
            <p style={{ fontSize: 'var(--text-sm)' }}>Try different keywords or browse the sections below.</p>
            <div style={{ display: 'flex', gap: 'var(--s12)', justifyContent: 'center', marginTop: 'var(--s24)', flexWrap: 'wrap' }}>
              {['/blog', '/events', '/alumni', '/careers'].map(p => (
                <Link key={p} href={p} className="btn btn-ghost btn-sm">{p.replace('/', '').charAt(0).toUpperCase() + p.slice(2)} →</Link>
              ))}
            </div>
          </div>
        )}

        {results.length > 0 && (
          <div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--white-muted)', marginBottom: 'var(--s20)' }}>
              {results.length} result{results.length !== 1 ? 's' : ''} for "{q}"
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s10)' }}>
              {results.map(r => (
                <Link key={r._id} href={`${TYPE_PATH[r._type]}/${r.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="card" style={{ display: 'flex', gap: 'var(--s16)', alignItems: 'flex-start' }}>
                    <div style={{ flexShrink: 0, marginTop: 2 }}>
                      <span className={`badge ${TYPE_BADGE[r._type] ?? 'badge-gray'}`} style={{ fontSize: 10 }}>{TYPE_LABEL[r._type]}</span>
                    </div>
                    <div>
                      <p style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--white)', marginBottom: 4 }}>{label(r)}</p>
                      {sub(r) && <p style={{ fontSize: 12, color: 'var(--white-muted)', lineHeight: 1.5 }}>{String(sub(r)).slice(0, 160)}</p>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {!q && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--s16)', marginTop: 'var(--s16)' }}>
            {[
              { label: 'Browse blog posts', href: '/blog',    desc: 'Articles from the Tera-Tech team' },
              { label: 'Upcoming events',   href: '/events',  desc: 'Workshops, meetups, and announcements' },
              { label: 'Alumni profiles',   href: '/alumni',  desc: 'Stories from our programme graduates' },
              { label: 'Open positions',    href: '/careers', desc: 'Join the Tera-Tech team' },
            ].map(l => (
              <Link key={l.href} href={l.href} style={{ textDecoration: 'none' }}>
                <div className="card">
                  <p style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--white)', marginBottom: 4 }}>{l.label} →</p>
                  <p style={{ fontSize: 12, color: 'var(--white-muted)' }}>{l.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}