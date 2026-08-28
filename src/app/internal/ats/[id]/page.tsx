'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from './ATSDetail.module.css'

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

  if (loading) return <div className={styles.loading}>Loading…</div>
  if (!app)    return <div className={styles.notFound}>Application not found.</div>

  const p = app.personalInfo ?? {}
  const b = app.background   ?? {}

  return (
    <div className={styles.container}>
      <Link href="/internal/ats" className={styles.backLink}>← Pipeline</Link>

      <div className={styles.header}>
        <div>
          <h1 className={styles.name}>{p.name}</h1>
          <p className={styles.contact}>{p.email} · {p.phone} · {p.location}</p>
        </div>
        <span className={`badge ${BADGE[app.status] ?? 'badge-gray'} ${styles.statusBadge}`}>{app.status}</span>
      </div>

      {/* Status change */}
      <div className={`card ${styles.statusCard}`}>
        <p className={styles.sectionTitle}>Change status</p>
        <div className={styles.btnRow}>
          {STATUSES.map(s => (
            <button key={s} disabled={s===app.status || saving} onClick={()=>updateStatus(s)}
              className={`btn btn-sm ${s===app.status?'btn-blue':'btn-ghost'} ${styles.statusBtn}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Details grid */}
      <div className={styles.grid}>
        <div className="card">
          <p className={styles.sectionTitle}>Track</p>
          <p className={styles.trackName}>{app.track}</p>
        </div>
        <div className="card">
          <p className={styles.sectionTitle}>Documents</p>
          <div className={styles.docsList}>
            {app.cvUrl        && <a href={app.cvUrl}        target="_blank" rel="noopener noreferrer" className={styles.docLink}>View CV ↗</a>}
            {app.portfolioUrl && <a href={app.portfolioUrl} target="_blank" rel="noopener noreferrer" className={styles.docLink}>Portfolio ↗</a>}
            {!app.cvUrl && !app.portfolioUrl && <p className={styles.noDocs}>No documents submitted</p>}
          </div>
        </div>
      </div>

      {/* Background */}
      {[['Education', b.education], ['Experience', b.experience], ['Motivation', b.motivation], ['Availability', b.availability]].map(([label, val]) => val && (
        <div key={label as string} className={`card ${styles.bgCard}`}>
          <p className={styles.sectionTitle}>{label}</p>
          <p className={styles.bgText}>{val as string}</p>
        </div>
      ))}
    </div>
  )
}
