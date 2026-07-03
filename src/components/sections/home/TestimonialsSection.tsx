const TESTI = [
  { quote:'Tera-Tech gave me live production access on week one. By month three I had shipped a payment integration used by 4,000 people.', name:'Élisabeth Ngum', track:'Frontend · Cohort 2021', placement:'Software Engineer, Fintech startup, Douala' },
  { quote:'The structured mentorship here is unlike anything I found elsewhere in the region. My salary doubled within a year of graduating the programme.', name:'Jean-Paul Mbarga', track:'Backend · Cohort 2022', placement:'Backend Dev, SaaS company, remote' },
  { quote:'I came in knowing Figma basics. I left with a complete design system and a contract with a European client.', name:'Amina Fouda', track:'UI/UX · Cohort 2023', placement:'Product Designer, EdTech, Yaoundé' },
  { quote:'The DevOps track prepared me for real infrastructure from day one — Docker, CI/CD, and production deployments.', name:'Boris Tchamba', track:'Cloud & DevOps · Cohort 2023', placement:'DevOps Engineer, Logistics company, remote' },
]
const initials = (n:string) => n.split(' ').slice(0,2).map(w=>w[0]).join('')

export function TestimonialsSection() {
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Alumni voices</p>
        <h2 className="section-title">Real engineers.<br />Real placements.</h2>
        <div className="grid-2" style={{ marginTop:'var(--s40)' }}>
          {TESTI.map((t,i) => (
            <div key={i} className="card" style={{ display:'flex', flexDirection:'column' }}>
              {/* Blue quotation mark (geometric) not orange */}
              <p style={{ fontSize:32, color:'var(--brand-blue)', lineHeight:1, marginBottom:'var(--s12)', fontFamily:'Georgia,serif' }}>"</p>
              <p style={{ fontSize:'var(--text-sm)', color:'var(--white-dim)', lineHeight:1.75, fontStyle:'italic', flexGrow:1, marginBottom:'var(--s24)' }}>{t.quote}</p>
              <div style={{ display:'flex', alignItems:'center', gap:'var(--s12)' }}>
                <div style={{ width:40, height:40, borderRadius:'50%', background:'linear-gradient(135deg,var(--brand-blue),var(--brand-cyan))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'var(--text-sm)', fontWeight:600, color:'var(--white)', flexShrink:0 }}>{initials(t.name)}</div>
                <div>
                  <p style={{ fontSize:'var(--text-sm)', fontWeight:600, color:'var(--white)' }}>{t.name}</p>
                  <p style={{ fontSize:11, color:'var(--white-muted)' }}>{t.track}</p>
                </div>
              </div>
              <span className="badge badge-green" style={{ marginTop:'var(--s16)', display:'inline-flex', alignSelf:'flex-start' }}>→ {t.placement}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
