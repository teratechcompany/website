'use client'
import { useState } from 'react'
import styles from './OnboardingChecklist.module.css'

const STEPS = [
  { id: 'offer',    category: 'Before you start', label: 'Accept your offer letter', desc: 'Go to the Offer tab and accept your internship offer.' },
  { id: 'code',     category: 'Before you start', label: 'Read the Intern Code of Conduct', desc: 'Familiarise yourself with our professional standards and expectations.', link: '/legal/intern-code' },
  { id: 'tools',    category: 'Before you start', label: 'Set up your development environment', desc: 'Install Git, VS Code, and Node.js. Clone the team starter repo once shared.' },
  { id: 'slack',    category: 'Communication',    label: 'Join the team communication channels', desc: 'Your coordinator will share invite links for Slack/WhatsApp after offer acceptance.' },
  { id: 'whatsapp', category: 'Communication',    label: 'Join the Tera-Tech intern community', desc: 'Connect with current interns and alumni via WhatsApp.', link: 'https://wa.me/237678937645' },
  { id: 'intro',    category: 'Week one',          label: 'Attend your welcome session', desc: 'Your onboarding coordinator will schedule this within your first two days.' },
  { id: 'mentor',   category: 'Week one',          label: 'Meet your assigned mentor', desc: 'Your mentor will be introduced at your welcome session. Schedule a 1:1 within the first week.' },
  { id: 'project',  category: 'Week one',          label: 'Join your first project sprint', desc: 'You will be assigned to a live project team at your welcome session.' },
]

const CATEGORIES = [...new Set(STEPS.map(s => s.category))]

export function OnboardingChecklist() {
  const stored = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('onboarding') ?? '{}') : {}
  const [done, setDone] = useState<Record<string, boolean>>(stored)

  const toggle = (id: string) => {
    const next = { ...done, [id]: !done[id] }
    setDone(next)
    if (typeof window !== 'undefined') localStorage.setItem('onboarding', JSON.stringify(next))
  }

  const total    = STEPS.length
  const complete = Object.values(done).filter(Boolean).length

  return (
    <div>
      {/* Progress */}
      <div className={styles.progressContainer}>
        <div className={styles.progressHeader}>
          <p className={styles.progressText}>{complete} of {total} complete</p>
          {complete === total && <span className="badge badge-green">All done ✓</span>}
        </div>
        <div className={styles.progressBarBg}>
          <div className={styles.progressBarFill} style={{ width: `${(complete / total) * 100}%` }} />
        </div>
      </div>

      {/* Steps grouped by category */}
      {CATEGORIES.map(cat => (
        <div key={cat} className={styles.categoryContainer}>
          <p className={styles.categoryTitle}>{cat}</p>
          <div className={styles.stepsList}>
            {STEPS.filter(s => s.category === cat).map(step => (
              <div key={step.id}
                onClick={() => toggle(step.id)}
                className={`${styles.stepCard} ${done[step.id] ? styles.stepCardDone : ''}`}>
                {/* Checkbox */}
                <div className={`${styles.checkbox} ${done[step.id] ? styles.checkboxDone : ''}`}>
                  {done[step.id] && <span className={styles.checkIcon}>✓</span>}
                </div>
                <div className={styles.stepContent}>
                  <p className={`${styles.stepLabel} ${done[step.id] ? styles.stepLabelDone : ''}`}>{step.label}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                  {step.link && <a href={step.link} target={step.link.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" onClick={e => e.stopPropagation()} className={styles.stepLink}>Open →</a>}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
