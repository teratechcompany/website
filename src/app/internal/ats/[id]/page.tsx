'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

const STATUSES = ['submitted','screening','interview','offered','accepted','rejected']
const BADGE: Record<string,string> = { submitted:'badge-gray', screening:'badge-blue', interview:'badge-cyan', offered:'badge-orange', accepted:'badge-green', rejected:'badge-red' }

export default function ApplicationDetailPage() {
  const { id } = useParams<{ id:string }>()
  const router  = useRouter()
  const [app,    setApp]    = useState<any>(null)
  const [loading,setLoading]= useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch(`/api/internal/applications/${id}`).then(r=>r.json()).then(setApp).finally(()=>setLoading(false))
  }, [id])

  const updateStatus = async (status:string) => {
    setSaving(true)
    await fetch(`/api/internal/applications/${id}`, { method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ status }) })
    setApp((a:any)=>({ ...a, status }))
    setSaving(false)
  }

  if (loading) return <div style={{ padding:'var(--s40)', color:'var(--white-muted)' }}>Loading…</div>
  if (!app)    return <div style={{ padding:'var(--s40)', color:'var(--danger)' }}>Application not found.</div>

  const p = app.personalInfo ?? {}
  const b = app.background   ?? {}

  return (
    <div style={{ maxWidth:800 }}>
      <Link href="/internal/ats" style={{ fontSize:'var(--text-sm)', color:'var(--white-muted)', marginBottom:'var(--s24)', display:'inline-flex', gap:'var(--s6)' }}>← Pipeline</Link>

      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'var(--s32)', flexWrap:'wrap', gap:'var(--s16)' }}>
        <div>
          <h1 style={{ fontSize:24, fontWeight:300, marginBottom:'var(--s6)' }}>{p.name}</h1>
          <p style={{ color:'var(--white-muted)', fontSize:'var(--text-sm)' }}>{p.email} · {p.phone} · {p.location}</p>
        </div>
        <span className={`badge ${BADGE[app.status] ?? 'badge-gray'}`} style={{ fontSize:13, padding:'6px 14px' }}>{app.status}</span>
      </div>

      {/* Status change */}
      <div className="card" style={{ marginBottom:'var(--s24)', padding:'var(--s20)' }}>
        <p style={{ fontSize:11, fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--white-muted)', marginBottom:'var(--s12)' }}>Change status</p>
        <div style={{ display:'flex', gap:'var(--s8)', flexWrap:'wrap' }}>
          {STATUSES.map(s => (
            <button key={s} disabled={s===app.status || saving} onClick={()=>updateStatus(s)}
              className={`btn btn-sm ${s===app.status?'btn-blue':'btn-ghost'}`} style={{ textTransform:'capitalize' }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Details grid */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'var(--s16)', marginBottom:'var(--s24)' }}>
        <div className="card">
          <p style={{ fontSize:11, fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--white-muted)', marginBottom:'var(--s12)' }}>Track</p>
          <p style={{ fontSize:'var(--text-md)', fontWeight:300, color:'var(--white)', textTransform:'capitalize' }}>{app.track}</p>
        </div>
        <div className="card">
          <p style={{ fontSize:11, fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--white-muted)', marginBottom:'var(--s12)' }}>Documents</p>
          <div style={{ display:'flex', flexDirection:'column', gap:'var(--s8)' }}>
            {app.cvUrl        && <a href={app.cvUrl}        target="_blank" rel="noopener noreferrer" style={{ fontSize:'var(--text-sm)', color:'var(--brand-blue)' }}>View CV ↗</a>}
            {app.portfolioUrl && <a href={app.portfolioUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize:'var(--text-sm)', color:'var(--brand-blue)' }}>Portfolio ↗</a>}
            {!app.cvUrl && !app.portfolioUrl && <p style={{ fontSize:'var(--text-sm)', color:'var(--white-subtle)' }}>No documents submitted</p>}
          </div>
        </div>
      </div>

      {/* Background */}
      {[['Education', b.education], ['Experience', b.experience], ['Motivation', b.motivation], ['Availability', b.availability]].map(([label, val]) => val && (
        <div key={label as string} className="card" style={{ marginBottom:'var(--s12)' }}>
          <p style={{ fontSize:11, fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--white-muted)', marginBottom:'var(--s12)' }}>{label}</p>
          <p style={{ fontSize:'var(--text-sm)', color:'var(--white-dim)', lineHeight:1.7 }}>{val}</p>
        </div>
      ))}
    </div>
  )
}
