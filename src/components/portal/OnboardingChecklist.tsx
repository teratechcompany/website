'use client'
import { useState } from 'react'

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
      <div style={{ marginBottom: 'var(--s32)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--s8)' }}>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--white-muted)' }}>{complete} of {total} complete</p>
          {complete === total && <span className="badge badge-green">All done ✓</span>}
        </div>
        <div style={{ height: 4, background: 'var(--white-faint)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ height: '100%', background: 'var(--brand-blue)', borderRadius: 2, width: `${(complete / total) * 100}%`, transition: 'width 0.4s var(--ease)' }} />
        </div>
      </div>

      {/* Steps grouped by category */}
      {CATEGORIES.map(cat => (
        <div key={cat} style={{ marginBottom: 'var(--s32)' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-eyebrow)', marginBottom: 'var(--s16)' }}>{cat}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s10)' }}>
            {STEPS.filter(s => s.category === cat).map(step => (
              <div key={step.id}
                onClick={() => toggle(step.id)}
                style={{ display: 'flex', gap: 'var(--s16)', padding: 'var(--s16) var(--s20)', background: done[step.id] ? 'rgba(34,197,94,0.05)' : 'var(--black-surface)', border: `1px solid ${done[step.id] ? 'rgba(34,197,94,0.2)' : 'var(--white-faint)'}`, borderRadius: 'var(--radius-soft)', cursor: 'pointer', transition: 'all 0.2s', alignItems: 'flex-start' }}>
                {/* Checkbox */}
                <div style={{ width: 20, height: 20, borderRadius: 'var(--radius-sharp)', border: `2px solid ${done[step.id] ? 'var(--success)' : 'var(--white-subtle)'}`, background: done[step.id] ? 'var(--success)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2, transition: 'all 0.2s' }}>
                  {done[step.id] && <span style={{ color: 'var(--white)', fontSize: 11, fontWeight: 700 }}>✓</span>}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: done[step.id] ? 'var(--white-muted)' : 'var(--white)', marginBottom: 4, textDecoration: done[step.id] ? 'line-through' : 'none' }}>{step.label}</p>
                  <p style={{ fontSize: 12, color: 'var(--white-subtle)', lineHeight: 1.5 }}>{step.desc}</p>
                  {step.link && <a href={step.link} target={step.link.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ fontSize: 12, color: 'var(--brand-blue)', marginTop: 4, display: 'inline-block' }}>Open →</a>}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
