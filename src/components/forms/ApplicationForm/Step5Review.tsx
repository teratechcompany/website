'use client'
import { Button } from '@/components/ui/Button'
import { TRACKS } from '@/constants/tracks'
import type { FormData } from './index'

interface Props { data:FormData; onBack:()=>void; onSubmit:()=>void; submitting:boolean; error:string }

const Row = ({ label, value }:{ label:string; value?:string }) => value ? (
  <div style={{ display:'flex', gap:'var(--s16)', padding:'var(--s12) 0', borderBottom:'1px solid var(--white-faint)' }}>
    <p style={{ fontSize:12, fontWeight:600, color:'var(--white-muted)', textTransform:'uppercase', letterSpacing:'0.06em', minWidth:140, flexShrink:0 }}>{label}</p>
    <p style={{ fontSize:'var(--text-sm)', color:'var(--white-dim)' }}>{value}</p>
  </div>
) : null

export function Step5Review({ data, onBack, onSubmit, submitting, error }: Props) {
  const track = TRACKS.find(t => t.id === data.track)
  const p     = data.personalInfo
  const b     = data.background

  return (
    <div>
      <h2 style={{ fontSize:'var(--text-xl)', fontWeight:300, marginBottom:'var(--s8)' }}>Review your application</h2>
      <p style={{ fontSize:'var(--text-sm)', color:'var(--white-muted)', marginBottom:'var(--s32)' }}>Check everything carefully before submitting. You cannot edit after submission.</p>

      <div className="card" style={{ marginBottom:'var(--s24)' }}>
        <p style={{ fontSize:12, fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--white-muted)', marginBottom:'var(--s16)' }}>Speciality</p>
        <p style={{ fontSize:'var(--text-md)', fontWeight:400, color:'var(--white)' }}>{track?.label}</p>
      </div>

      <div className="card" style={{ marginBottom:'var(--s24)' }}>
        <p style={{ fontSize:12, fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--white-muted)', marginBottom:'var(--s16)' }}>Personal</p>
        <Row label="Name"        value={p.name} />
        <Row label="Email"       value={p.email} />
        <Row label="Phone"       value={p.phone} />
        <Row label="Location"    value={p.location} />
        <Row label="Nationality" value={p.nationality} />
      </div>

      <div className="card" style={{ marginBottom:'var(--s24)' }}>
        <p style={{ fontSize:12, fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--white-muted)', marginBottom:'var(--s16)' }}>Background</p>
        <Row label="Education"    value={b.education} />
        <Row label="Experience"   value={b.experience} />
        <Row label="Motivation"   value={b.motivation} />
        <Row label="Availability" value={b.availability} />
        {data.cvUrl        && <Row label="CV"        value={data.cvUrl} />}
        {data.portfolioUrl && <Row label="Portfolio" value={data.portfolioUrl} />}
      </div>

      {error && <p role="alert" style={{ fontSize:'var(--text-sm)', color:'var(--danger)', padding:'var(--s12)', background:'rgba(239,68,68,0.08)', borderRadius:'var(--radius-sharp)', border:'1px solid rgba(239,68,68,0.2)', marginBottom:'var(--s20)' }}>{error}</p>}

      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <Button variant="ghost" onClick={onBack} disabled={submitting}>← Back</Button>
        <Button variant="orange" onClick={onSubmit} loading={submitting} style={{ padding:'12px 32px' }}>
          Submit application
        </Button>
      </div>
    </div>
  )
}
