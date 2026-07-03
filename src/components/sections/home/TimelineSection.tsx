const STEPS = [
  { num:'01', title:'Apply Online',        sub:'Complete the short application form.',    time:'~15 minutes' },
  { num:'02', title:'Initial Screening',   sub:'Portfolio and background review.',        time:'3–5 business days' },
  { num:'03', title:'Technical Interview', sub:'A fair, track-specific assessment.',      time:'1 hour' },
  { num:'04', title:'Offer & Onboarding',  sub:'Welcome to the Tera-Tech team.',          time:'Rolling intake' },
]
export function TimelineSection() {
  return (
    <section style={{ padding:'var(--s96) 0', background:'rgba(0,114,206,0.03)', borderTop:'1px solid rgba(0,114,206,0.08)', borderBottom:'1px solid rgba(0,114,206,0.08)' }}>
      <div className="container">
        <p className="eyebrow">How it works</p>
        <h2 className="section-title">Four steps to your first<br />production role.</h2>
        <div style={{ position:'relative', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'var(--s24)', marginTop:'var(--s48)' }}>
          <div aria-hidden style={{ position:'absolute', top:27, left:'12.5%', right:'12.5%', height:2, background:'rgba(0,114,206,0.15)', zIndex:0 }} />
          {STEPS.map((step,i) => (
            <div key={i} style={{ textAlign:'center', position:'relative', zIndex:1 }}>
              <div style={{ width:56, height:56, borderRadius:'var(--radius-sharp)', background:'var(--brand-blue-faint)', border:'2px solid var(--brand-blue-border)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto var(--s20)', fontSize:'var(--text-sm)', fontWeight:700, color:'var(--brand-blue)', transition:'all var(--dur-base) var(--ease)' }}>
                {step.num}
              </div>
              <h3 style={{ fontSize:'var(--text-base)', fontWeight:500, color:'var(--text-heading)', marginBottom:'var(--s6)' }}>{step.title}</h3>
              <p style={{ fontSize:'var(--text-sm)', color:'var(--white-muted)', marginBottom:'var(--s6)', lineHeight:1.5 }}>{step.sub}</p>
              {/* Orange used for the time label — small accent, not heading */}
              <p style={{ fontSize:11, color:'var(--brand-orange)', fontWeight:500 }}>{step.time}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
