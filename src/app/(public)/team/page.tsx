import type { Metadata }     from 'next'
import Link                  from 'next/link'
import { TEAM }              from '@/constants/team'
import { ROUTES }            from '@/constants/routes'
import { TeamCard }          from '@/components/sections/content/TeamCard'

export const metadata: Metadata = {
  title:       'Team — Tera-Tech Ltd',
  description: 'Meet the people building Tera-Tech and the next generation of African tech talent.',
}

export default function TeamPage() {
  const staff     = TEAM.filter(m => m.type === 'staff').sort((a,b) => a.order - b.order)
  const volunteers= TEAM.filter(m => m.type === 'volunteer').sort((a,b) => a.order - b.order)

  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">The people</p>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'var(--s64)', flexWrap:'wrap', gap:'var(--s16)' }}>
          <h1 className="page-title" style={{ marginBottom:0 }}>
            Meet the team<br />behind Tera-Tech.
          </h1>
          <Link href={ROUTES.VOLUNTEER} className="btn btn-ghost">Volunteer with us</Link>
        </div>

        {/* Staff */}
        <p className="eyebrow" style={{ marginBottom:'var(--s32)' }}>Core staff</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'var(--s20)', marginBottom:'var(--s80)' }}>
          {staff.map(m => <TeamCard key={m.id} member={m} />)}
        </div>

        {/* Volunteer CTA */}
        {volunteers.length === 0 && (
          <div className="card" style={{ textAlign:'center', padding:'var(--s48)', borderColor:'rgba(0,114,206,0.2)' }}>
            <h2 style={{ fontSize:'var(--text-xl)', fontWeight:300, marginBottom:'var(--s12)' }}>
              Join the community
            </h2>
            <p style={{ color:'var(--white-muted)', maxWidth:480, margin:'0 auto var(--s24)' }}>
              We work with mentors, trainers, designers, and community contributors across the region. If you have skills to share, we want to hear from you.
            </p>
            <Link href={ROUTES.VOLUNTEER} className="btn btn-blue">Apply to volunteer</Link>
          </div>
        )}

        {volunteers.length > 0 && (
          <>
            <p className="eyebrow" style={{ marginBottom:'var(--s32)' }}>Volunteers & contributors</p>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'var(--s20)' }}>
              {volunteers.map(m => <TeamCard key={m.id} member={m} />)}
            </div>
          </>
        )}
      </div>

      <style>{`
        @media(max-width:1200px){ .team-grid{grid-template-columns:repeat(3,1fr)!important} }
        @media(max-width:900px) { .team-grid{grid-template-columns:repeat(2,1fr)!important} }
        @media(max-width:500px) { .team-grid{grid-template-columns:1fr!important} }
      `}</style>
    </section>
  )
}
