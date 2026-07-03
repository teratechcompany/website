'use client'
import { useState } from 'react'
import type { Metadata } from 'next'

const FAQS = [
  { q:'Is the internship paid?',               a:'The Tera-Tech programme is an unpaid training internship. We focus on building real skills and connecting you to partner companies who may hire you.' },
  { q:'How long is the programme?',            a:'The standard programme runs for 3 months. Extensions are available by mutual agreement based on performance and track.' },
  { q:'Who can apply?',                        a:'Anyone with a passion for technology. We accept students, fresh graduates, and career switchers. No prior professional experience is required.' },
  { q:'Do I need to be in Bamenda?',           a:'Some tracks can be done remotely, but we strongly encourage being physically present for the best experience. Speak to us about your situation.' },
  { q:'What does "production-level" mean?',    a:'We assign you to real projects used by real clients. You will commit code, deploy systems, and work in professional team structures from week one.' },
  { q:'What happens after the programme?',     a:'We actively connect graduates to our 40+ partner companies. Our 95% hire rate reflects the quality of placements we facilitate.' },
  { q:'Can I apply to multiple tracks?',       a:'You apply to one primary track per cycle. If you have overlapping skills, mention this in your motivation and we will discuss it at interview.' },
  { q:'How competitive is the intake?',        a:'Highly competitive. We accept a small cohort each cycle to maintain the quality of mentorship. A strong motivation and clear goals improve your chances significantly.' },
  { q:'What equipment do I need?',             a:'A laptop capable of running standard development tools. If you do not have one, speak to us — we sometimes have equipment available for dedicated interns.' },
  { q:'When is the next intake?',              a:'We run rolling intakes. Submit your application at any time and we will review it for the next available cohort in your track.' },
]

export default function FAQPage() {
  const [open, setOpen] = useState<number|null>(null)
  return (
    <section className="section">
      <div className="container" style={{ maxWidth:780 }}>
        <p className="eyebrow">Frequently asked questions</p>
        <h1 className="page-title" style={{ marginBottom:'var(--s48)' }}>Things people ask us</h1>
        <div style={{ display:'flex', flexDirection:'column', gap:'var(--s8)' }}>
          {FAQS.map((faq, i) => (
            <div key={i} className="card" style={{ cursor:'pointer', padding:'var(--s20) var(--s24)' }} onClick={()=>setOpen(open===i ? null : i)}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:'var(--s16)' }}>
                <p style={{ fontSize:'var(--text-sm)', fontWeight:500, color:'var(--white)' }}>{faq.q}</p>
                <span style={{ color:'var(--brand-blue)', flexShrink:0, fontSize:18, transform: open===i ? 'rotate(45deg)' : 'none', transition:'transform 0.25s' }}>+</span>
              </div>
              {open === i && <p style={{ fontSize:'var(--text-sm)', color:'var(--white-muted)', marginTop:'var(--s12)', lineHeight:1.65 }}>{faq.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
