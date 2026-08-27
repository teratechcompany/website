import dynamic from 'next/dynamic'
import Link    from 'next/link'
import { ROUTES } from '@/constants/routes'
import { APP }    from '@/constants/config'
import styles from './HeroSection.module.css'

const HeroCanvas  = dynamic(() => import('@/components/canvas/HeroCanvas').then(m=>m.HeroCanvas),  { ssr:false })
const GlobeCanvas = dynamic(() => import('@/components/canvas/GlobeCanvas').then(m=>m.GlobeCanvas), { ssr:false })

export function HeroSection() {
  return (
    <section className={styles.section}>
      <HeroCanvas />
      <div aria-hidden className={styles.overlay} />
      <div className={`container ${styles.content}`}>
        <div className={styles.grid}>
          <div>
            {/* Tag — cool blue-white, not orange */}
            <span className={styles.tag}>
              <span aria-hidden className={styles.tagDot} />
              Internship Programme · Bamenda, Cameroon
            </span>
            {/* Headline — white only */}
            <h1 className={styles.headline}>
              Launch Your<br />Tech Career<br />From Day One.
            </h1>
            <p className={styles.subtitle}>
              {APP.description} {APP.stats.interns} interns placed since 2019 across {APP.stats.partners} regional and global partners.
            </p>
            <div className={styles.ctas}>
              <Link href={ROUTES.APPLY}    className="btn btn-orange btn-lg">Start Application</Link>
              <Link href={ROUTES.SERVICES} className="btn btn-ghost btn-lg">Explore Tracks</Link>
            </div>
            {/* Stats strip — cyan, not orange */}
            <div className={styles.statsStrip}>
              {[
                { val:APP.stats.interns,     label:'Interns Placed' },
                { val:APP.stats.partners,    label:'Partner Companies' },
                { val:APP.stats.hireRate,    label:'Hire Rate' },
                { val:`${APP.stats.tracks}`, label:'Specialities' },
              ].map(s => (
                <div key={s.label}>
                  <p className={styles.statValue}>{s.val}</p>
                  <p className={styles.statLabel}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.globeContainer}>
            <div className={styles.globeWrapper}>
              <div aria-hidden className={styles.globeRing} />
              <GlobeCanvas />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
