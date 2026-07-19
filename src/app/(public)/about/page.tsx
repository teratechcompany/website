import type { Metadata } from 'next'
import Link              from 'next/link'
import { ROUTES }        from '@/constants/routes'
import { APP }           from '@/constants/config'

export const metadata: Metadata = {
  title: 'About — Tera-Tech Ltd',
  description: 'Tera-Tech Ltd is a systems innovation company connecting Cameroonian tech talent to regional and global opportunities.',
}

const VALUES = [
  { title:'Production-first learning', desc:'We put interns on real projects from week one. No toy apps, no tutorial loops. Real clients, real users, real stakes.' },
  { title:'Radical mentorship', desc:'Every intern is assigned to an experienced engineer who gives genuine time, code reviews, and career guidance.' },
  { title:'Talent before credentials', desc:'We evaluate on ability, curiosity, and drive. Where you went to school matters far less than what you can build.' },
  { title:'African ambition, global standard', desc:'We train engineers to the same standard as any leading software firm, anywhere in the world.' },
]

const MILESTONES = [
  { year:2018, event:'Tera-Tech Ltd founded in Bamenda, Cameroon' },
  { year:2019, event:'First intern cohort — 6 engineers across 3 tracks' },
  { year:2021, event:'Surpassed 40 partner companies across Cameroon' },
  { year:2022, event:'Expanded to Cloud, Data, and Cybersecurity tracks' },
  { year:2023, event:'120+ cumulative internship placements reached' },
  { year:2025, event:'8 active speciality tracks · 95% placement rate' },
]

export default function AboutPage() {
  return (
    <>
      <section style={{ padding:'var(--s96) 0 var(--s64)', borderBottom:'1px solid var(--white-faint)' }}>
        <div className="container" style={{ maxWidth:900 }}>
          <p className="eyebrow">Systems innovation</p>
          <h1 className="page-title" style={{ marginBottom:'var(--s24)' }}>Building the next generation<br />of African tech engineers.</h1>
          <p style={{ fontSize:'var(--text-lg)', color:'var(--white-muted)', lineHeight:1.7, maxWidth:660 }}>
            Tera-Tech Ltd was founded in {APP.founded} in Bamenda, Cameroon with a single conviction: the most effective way to develop tech talent is to put it to work on real systems, under real pressure, from day one.
          </p>
        </div>
      </section>

      <section style={{ padding:'var(--s80) 0', borderBottom:'1px solid var(--white-faint)' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'var(--s64)', alignItems:'center' }}>
            <div>
              <p className="eyebrow">Mission</p>
              <h2 className="section-title">We exist to close<br />the gap.</h2>
              <p style={{ fontSize:'var(--text-md)', color:'var(--white-muted)', lineHeight:1.7 }}>
                Across Cameroon and the wider African tech ecosystem, there is a persistent gap between what universities teach and what industry demands. Tera-Tech exists to close that gap — through structured internships, embedded mentorship, and hands-on experience that changes career trajectories.
              </p>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'var(--s16)' }}>
              {[APP.stats.interns, APP.stats.partners, APP.stats.hireRate, `${APP.stats.tracks} tracks`].map((v,i) => (
                <div key={i} className="card" style={{ textAlign:'center', padding:'var(--s32) var(--s20)' }}>
                  <p style={{ fontSize:36, fontWeight:200, letterSpacing:'-0.04em', color:'var(--brand-blue)', lineHeight:1, marginBottom:'var(--s8)' }}>{v}</p>
                  <p style={{ fontSize:12, color:'var(--white-muted)' }}>{['Interns placed','Partner companies','Hire rate','Specialities'][i]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding:'var(--s80) 0', borderBottom:'1px solid var(--white-faint)' }}>
        <div className="container">
          <p className="eyebrow">Values</p>
          <h2 className="section-title" style={{ marginBottom:'var(--s48)' }}>What we believe</h2>
          <div className="grid-2" style={{ gap:'var(--s24)' }}>
            {VALUES.map(v => (
              <div key={v.title} className="card" style={{ borderLeft:'3px solid var(--brand-blue)', borderRadius:0, borderTopRightRadius:'var(--radius-soft)', borderBottomRightRadius:'var(--radius-soft)' }}>
                <h3 style={{ fontSize:'var(--text-md)', fontWeight:500, marginBottom:'var(--s10)' }}>{v.title}</h3>
                <p style={{ fontSize:'var(--text-sm)', color:'var(--white-muted)', lineHeight:1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding:'var(--s80) 0', borderBottom:'1px solid var(--white-faint)' }}>
        <div className="container" style={{ maxWidth:700 }}>
          <p className="eyebrow">History</p>
          <h2 className="section-title" style={{ marginBottom:'var(--s48)' }}>How we got here</h2>
          {MILESTONES.map((m,i) => (
            <div key={i} style={{ display:'flex', gap:'var(--s24)', paddingBottom:'var(--s32)' }}>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', width:48, flexShrink:0 }}>
                <div style={{ width:10, height:10, borderRadius:'50%', background:'var(--brand-blue)', marginTop:6 }} />
                {i < MILESTONES.length-1 && <div style={{ width:1, flex:1, background:'var(--white-faint)', marginTop:'var(--s8)' }} />}
              </div>
              <div>
                <p style={{ fontSize:11, fontWeight:700, color:'var(--brand-blue)', letterSpacing:'0.08em', marginBottom:'var(--s6)' }}>{m.year}</p>
                <p style={{ fontSize:'var(--text-sm)', color:'var(--white-dim)' }}>{m.event}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding:'var(--s80) 0' }}>
        <div className="container" style={{ textAlign:'center', maxWidth:560 }}>
          <h2 className="section-title">Be part of the next chapter.</h2>
          <p style={{ color:'var(--white-muted)', marginBottom:'var(--s32)' }}>Apply to the programme, join as a volunteer, or partner with us to hire the best junior engineers in the region.</p>
          <div style={{ display:'flex', gap:'var(--s12)', justifyContent:'center', flexWrap:'wrap' }}>
            <Link href={ROUTES.APPLY}   className="btn btn-orange btn-lg">Apply for an internship</Link>
            <Link href={ROUTES.CONTACT} className="btn btn-ghost btn-lg">Get in touch</Link>
          </div>
        </div>
      </section>
    </>
  )
}
