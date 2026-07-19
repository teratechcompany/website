'use client'
import { useState, useRef } from 'react'

export function FileUploader({ applicationId }: { applicationId: string }) {
  const [uploading, setUploading]  = useState(false)
  const [uploaded,  setUploaded]   = useState<string | null>(null)
  const [error,     setError]      = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const upload = async (file: File) => {
    if (!file) return
    setUploading(true); setError('')
    const fd = new FormData()
    fd.append('file', file)
    const res  = await fetch('/api/upload', { method: 'POST', body: fd })
    const data = await res.json()
    setUploading(false)
    if (!res.ok) { setError(data.error ?? 'Upload failed'); return }
    setUploaded(data.url)
  }

  return (
    <div className="card" style={{ padding: 'var(--s24)' }}>
      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--white-muted)', marginBottom: 'var(--s16)' }}>
        Upload new CV
      </p>
      <div
        onClick={() => fileRef.current?.click()}
        style={{ border: '2px dashed var(--white-faint)', borderRadius: 'var(--radius-soft)', padding: 'var(--s32)', textAlign: 'center', cursor: 'pointer', transition: 'border-color 0.2s', marginBottom: 'var(--s16)' }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--brand-blue-border)')}
        onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--white-faint)')}>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--white-muted)', marginBottom: 'var(--s6)' }}>
          {uploading ? 'Uploading…' : 'Click to select a file'}
        </p>
        <p style={{ fontSize: 11, color: 'var(--white-subtle)' }}>PDF, JPG, or PNG · max 10 MB</p>
        <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" style={{ display: 'none' }}
          onChange={e => { const f = e.target.files?.[0]; if (f) upload(f) }} />
      </div>
      {uploaded && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--s12)', background: 'rgba(34,197,94,0.08)', borderRadius: 'var(--radius-sharp)', border: '1px solid rgba(34,197,94,0.2)' }}>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--success)' }}>✓ Uploaded successfully</p>
          <a href={uploaded} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'var(--brand-blue)' }}>View ↗</a>
        </div>
      )}
      {error && <p role="alert" style={{ fontSize: 12, color: 'var(--danger)' }}>{error}</p>}
    </div>
  )
}
