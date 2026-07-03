import { APP } from '@/constants/config'
const METRICS = [
  { value:APP.stats.interns,     label:'Interns placed',              color:'var(--brand-blue)' },
  { value:APP.stats.partners,    label:'Partner companies',            color:'var(--brand-cyan)' },
  { value:APP.stats.hireRate,    label:'Hire rate within 6 months',    color:'var(--brand-blue)' },
  { value:`${APP.stats.tracks}`, label:'Active speciality tracks',     color:'var(--brand-cyan)' },
]
export function MetricsSection() {
  return (
    <section style={{ padding:'var(--s64) 0', background:'rgba(255,255,255,0.02)', borderTop:'1px solid var(--white-faint)', borderBottom:'1px solid var(--white-faint)' }}>
      <div className="container">
        <div className="grid-4">
          {METRICS.map((m,i) => (
            <div key={i} className="card" style={{ textAlign:'center', padding:'var(--s32) var(--s24)' }}>
              <p style={{ fontSize:'clamp(36px,4vw,52px)', fontWeight:200, letterSpacing:'-0.04em', color:m.color, lineHeight:1, marginBottom:'var(--s8)' }}>{m.value}</p>
              <p style={{ fontSize:'var(--text-sm)', color:'var(--white-muted)', lineHeight:1.4 }}>{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
