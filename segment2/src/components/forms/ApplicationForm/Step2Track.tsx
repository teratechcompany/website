'use client'
import { TRACKS }    from '@/constants/tracks'
import { Button }    from '@/components/ui/Button'
import type { FormData } from './index'

interface Props { data:FormData; onChange:(p:Partial<FormData>)=>void; onNext:()=>void; onBack:()=>void }

export function Step2Track({ data, onChange, onNext, onBack }: Props) {
  return (
    <div>
      <h2 style={{ fontSize:'var(--text-xl)', fontWeight:300, marginBottom:'var(--s8)' }}>Choose your speciality</h2>
      <p style={{ fontSize:'var(--text-sm)', color:'var(--white-muted)', marginBottom:'var(--s32)' }}>Select the track that best matches your skills and goals.</p>

      <div className="grid-2" style={{ gap:'var(--s12)', marginBottom:'var(--s32)' }}>
        {TRACKS.map(t => {
          const selected = data.track === t.id
          return (
            <button key={t.id} onClick={()=>onChange({ track:t.id })}
              style={{
                background: selected ? 'var(--brand-blue-faint)' : 'var(--black-surface)',
                border: `1px solid ${selected ? 'var(--brand-blue)' : 'var(--white-faint)'}`,
                borderRadius:'var(--radius-soft)', padding:'var(--s16)',
                textAlign:'left', cursor:'pointer',
                transition:'all var(--dur-base) var(--ease)',
                boxShadow: selected ? 'var(--shadow-blue)' : 'none',
              }}>
              <p style={{ fontSize:'var(--text-sm)', fontWeight:600, color: selected ? 'var(--brand-blue-light)' : 'var(--white)', marginBottom:'var(--s4)' }}>{t.label}</p>
              <p style={{ fontSize:12, color:'var(--white-muted)' }}>{t.tools.slice(0,3).join(' · ')}</p>
            </button>
          )
        })}
      </div>

      <div style={{ display:'flex', justifyContent:'space-between' }}>
        <Button variant="ghost" onClick={onBack}>← Back</Button>
        <Button variant="blue"  disabled={!data.track} onClick={onNext}>Continue →</Button>
      </div>
    </div>
  )
}
