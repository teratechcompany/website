import type { Metadata } from 'next'
export const metadata: Metadata = { title:'Portfolio — Tera-Tech Ltd' }

const PROJECTS = [
  { title:'DriveCM',   desc:'Multi-tenant SaaS platform for Cameroonian driving schools.',                   tech:['Laravel','PostgreSQL','Tailwind'],   type:'Client Product' },
  { title:'Shibust UMS', desc:'10-module university management system for a Cameroonian institution.',       tech:['Laravel','Livewire','MongoDB'],       type:'Client Product' },
  { title:'ScolarAI',  desc:'AI-powered adaptive learning platform with video-first asset delivery.',        tech:['Next.js','Node.js','TensorFlow'],     type:'Internal Product' },
  { title:'Malegado',  desc:'Multilingual language-learning platform with TTS and CEFR curriculum engine.', tech:['Next.js','Python','Piper TTS'],       type:'Internal Product' },
  { title:'PACE7',     desc:'Raspberry Pi 5 offline AI edge platform for cybersecurity education.',          tech:['Python','Raspberry Pi','Flutter'],    type:'R&D Project' },
  { title:'TeachTrack', desc:'Payroll and time management system for educational institutions.',              tech:['Laravel','Supabase','PDF generation'],type:'Client Product' },
]

export default function PortfolioPage() {
  return (
    <section className="section"><div className="container">
      <p className="eyebrow">Our work</p>
      <h1 className="page-title" style={{ marginBottom:'var(--s64)' }}>Selected projects</h1>
      <div className="grid-2" style={{ gap:'var(--s24)' }}>
        {PROJECTS.map(p => (
          <div key={p.title} className="card" style={{ padding:'var(--s32)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'var(--s16)', gap:'var(--s12)' }}>
              <h2 style={{ fontSize:'var(--text-lg)', fontWeight:400 }}>{p.title}</h2>
              <span className="badge badge-gray" style={{ flexShrink:0 }}>{p.type}</span>
            </div>
            <p style={{ fontSize:'var(--text-sm)', color:'var(--white-muted)', lineHeight:1.65, marginBottom:'var(--s20)' }}>{p.desc}</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
              {p.tech.map(t => <span key={t} className="badge badge-blue" style={{ fontSize:11 }}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div></section>
  )
}
