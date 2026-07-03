import type { Metadata } from 'next'
import Link              from 'next/link'
import { ROUTES }        from '@/constants/routes'
export const metadata: Metadata = { title:'Team — Tera-Tech Ltd' }

const TEAM = [
  { name:'Core Alpha',     role:'Founder & Managing Director', type:'staff' as const },
  { name:'Nfon Andrew',   role:'CTO & QA Lead',               type:'staff' as const },
  { name:'Afanyu Lionel', role:'Backend Lead',                 type:'staff' as const },
  { name:'Soh Juvitus',   role:'Project Manager',              type:'staff' as const },
  { name:'Titiana',       role:'UI/UX Lead',                   type:'staff' as const },
  { name:'Mufor Belmond', role:'Mobile Lead',                  type:'staff' as const },
]
const initials = (n:string) => n.split(' ').slice(0,2).map(w=>w[0]).join('')

export default function TeamPage() {
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">The People</p>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'var(--s64)', flexWrap:'wrap', gap:'var(--s16)' }}>
          <h1 className="page-title" style={{ marginBottom:0 }}>Meet the team</h1>
          <Link href={ROUTES.VOLUNTEER} className="btn btn-ghost">Volunteer with us</Link>
        </div>
        <p className="eyebrow" style={{ marginBottom:'var(--s24)' }}>Core staff</p>
        <div className="grid-3" style={{ marginBottom:'var(--s64)' }}>
          {TEAM.map(m => (
            <div key={m.name} className="card" style={{ display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', padding:'var(--s32)' }}>
              <div style={{ width:72, height:72, borderRadius:'50%', background:'linear-gradient(135deg,var(--brand-blue),var(--brand-cyan))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, fontWeight:600, color:'var(--white)', marginBottom:'var(--s16)' }}>{initials(m.name)}</div>
              <h3 style={{ fontSize:'var(--text-base)', fontWeight:500, marginBottom:4 }}>{m.name}</h3>
              <p style={{ fontSize:'var(--text-sm)', color:'var(--white-muted)' }}>{m.role}</p>
            </div>
          ))}
        </div>
        <div className="card" style={{ textAlign:'center', padding:'var(--s48)' }}>
          <h2 style={{ fontSize:'var(--text-xl)', fontWeight:300, marginBottom:'var(--s12)' }}>Volunteer with Tera-Tech</h2>
          <p style={{ color:'var(--white-muted)', maxWidth:480, margin:'0 auto var(--s24)' }}>We work with mentors, trainers, and community contributors from across the region. Join us.</p>
          <Link href={ROUTES.VOLUNTEER} className="btn btn-blue">Apply to volunteer</Link>
        </div>
      </div>
    </section>
  )
}
