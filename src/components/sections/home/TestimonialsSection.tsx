import styles from './TestimonialsSection.module.css'

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
        <div className={`grid-2 ${styles.grid}`}>
          {TESTI.map((t,i) => (
            <div key={i} className={`card ${styles.card}`}>
              {/* Blue quotation mark (geometric) not orange */}
              <p className={styles.quote}>"</p>
              <p className={styles.quoteText}>{t.quote}</p>
              <div className={styles.authorRow}>
                <div className={styles.avatar}>{initials(t.name)}</div>
                <div>
                  <p className={styles.authorName}>{t.name}</p>
                  <p className={styles.authorTrack}>{t.track}</p>
                </div>
              </div>
              <span className={`badge badge-green ${styles.placementBadge}`}>→ {t.placement}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
