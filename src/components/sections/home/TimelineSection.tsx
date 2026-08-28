import styles from './TimelineSection.module.css'

const STEPS = [
  { num:'01', title:'Apply Online',        sub:'Complete the short application form.',    time:'~15 minutes' },
  { num:'02', title:'Initial Screening',   sub:'Portfolio and background review.',        time:'3–5 business days' },
  { num:'03', title:'Technical Interview', sub:'A fair, track-specific assessment.',      time:'1 hour' },
  { num:'04', title:'Offer & Onboarding',  sub:'Welcome to the Tera-Tech team.',          time:'Rolling intake' },
]
export function TimelineSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <p className="eyebrow">How it works</p>
        <h2 className="section-title">Four steps to your first<br />production role.</h2>
        <div className={styles.grid}>
          <div aria-hidden className={styles.connector} />
          {STEPS.map((step,i) => (
            <div key={i} className={styles.step}>
              <div className={styles.stepNumber}>
                {step.num}
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepSub}>{step.sub}</p>
              {/* Orange used for the time label — small accent, not heading */}
              <p className={styles.stepTime}>{step.time}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
