import dynamic from 'next/dynamic'
import Link    from 'next/link'
import { ROUTES } from '@/constants/routes'
import { APP }    from '@/constants/config'

const HeroCanvas  = dynamic(() => import('@/components/canvas/HeroCanvas').then(m=>m.HeroCanvas),  { ssr:false })
const GlobeCanvas = dynamic(() => import('@/components/canvas/GlobeCanvas').then(m=>m.GlobeCanvas), { ssr:false })

export function HeroSection() {
  return (
    <section style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', overflow:'hidden' }}>
      <HeroCanvas />
      <div aria-hidden style={{ position:'absolute', inset:0, zIndex:1, background:'linear-gradient(135deg,rgba(10,10,10,0.70) 0%,rgba(10,10,10,0.25) 50%,rgba(10,10,10,0.55) 100%)', pointerEvents:'none' }} />
      <div className="container" style={{ position:'relative', zIndex:2, paddingTop:'calc(var(--nav-height) + var(--s48))', paddingBottom:'var(--s64)' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'var(--s64)', alignItems:'center' }}>
          <div>
            {/* Tag — cool blue-white, not orange */}
            <span style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:11, fontWeight:600, letterSpacing:'0.10em', textTransform:'uppercase', color:'var(--text-eyebrow)', background:'rgba(160,200,240,0.08)', border:'1px solid rgba(160,200,240,0.15)', borderRadius:'var(--radius-round)', padding:'5px 14px', marginBottom:'var(--s24)' }}>
              <span aria-hidden style={{ width:5, height:5, borderRadius:'50%', background:'var(--brand-blue)', flexShrink:0 }} />
              Internship Programme · Bamenda, Cameroon
            </span>
            {/* Headline — white only */}
            <h1 style={{ fontSize:'var(--text-hero)', fontWeight:300, lineHeight:1.02, letterSpacing:'-0.04em', color:'var(--text-heading)', marginBottom:'var(--s20)' }}>
              Launch Your<br />Tech Career<br />From Day One.
            </h1>
            <p style={{ fontSize:'var(--text-md)', color:'var(--white-muted)', lineHeight:1.65, maxWidth:460, marginBottom:'var(--s32)' }}>
              {APP.description} {APP.stats.interns} interns placed since 2019 across {APP.stats.partners} regional and global partners.
            </p>
            <div style={{ display:'flex', gap:'var(--s12)', flexWrap:'wrap' }}>
              <Link href={ROUTES.APPLY}    className="btn btn-orange btn-lg">Start Application</Link>
              <Link href={ROUTES.SERVICES} className="btn btn-ghost btn-lg">Explore Tracks</Link>
            </div>
            {/* Stats strip — cyan, not orange */}
            <div style={{ display:'flex', gap:'var(--s32)', marginTop:'var(--s40)', flexWrap:'wrap' }}>
              {[
                { val:APP.stats.interns,     label:'Interns Placed' },
                { val:APP.stats.partners,    label:'Partner Companies' },
                { val:APP.stats.hireRate,    label:'Hire Rate' },
                { val:`${APP.stats.tracks}`, label:'Specialities' },
              ].map(s => (
                <div key={s.label}>
                  <p style={{ fontSize:'var(--text-2xl)', fontWeight:300, letterSpacing:'-0.03em', color:'var(--brand-cyan)', lineHeight:1 }}>{s.val}</p>
                  <p style={{ fontSize:11, color:'var(--white-muted)', marginTop:4, letterSpacing:'0.04em' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display:'flex', justifyContent:'center', alignItems:'center' }}>
            <div style={{ width:'100%', maxWidth:440, aspectRatio:'1', position:'relative' }}>
              <div aria-hidden style={{ position:'absolute', inset:-16, border:'1px solid rgba(0,114,206,0.10)', borderRadius:'50%' }} />
              <GlobeCanvas />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
