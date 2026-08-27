'use client'
import { useState, useRef } from 'react'
import styles from './FileUploader.module.css'

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
    <div className={`card ${styles.card}`}>
      <p className={styles.title}>
        Upload new CV
      </p>
      <div
        onClick={() => fileRef.current?.click()}
        className={styles.dropzone}>
        <p className={styles.statusText}>
          {uploading ? 'Uploading…' : 'Click to select a file'}
        </p>
        <p className={styles.helperText}>PDF, JPG, or PNG · max 10 MB</p>
        <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" className={styles.input}
          onChange={e => { const f = e.target.files?.[0]; if (f) upload(f) }} />
      </div>
      {uploaded && (
        <div className={styles.successBox}>
          <p className={styles.successText}>✓ Uploaded successfully</p>
          <a href={uploaded} target="_blank" rel="noopener noreferrer" className={styles.link}>View ↗</a>
        </div>
      )}
      {error && <p role="alert" className={styles.error}>{error}</p>}
    </div>
  )
}
