'use client'

import Link from 'next/link'
import { APP } from '@/constants/config'
import { ROUTES } from '@/constants/routes'
import Image from 'next/image'
import styles from './Footer.module.css'

const COLS = {
  Programme: [
    ['Specialties', ROUTES.SERVICES],
    ['Apply Now',   ROUTES.APPLY],
    ['Alumni',      ROUTES.ALUMNI],
    ['Careers',     ROUTES.CAREERS],
    ['Volunteer',   ROUTES.VOLUNTEER],
  ],
  Company: [
    ['About',      ROUTES.ABOUT],
    ['Team',       ROUTES.TEAM],
    ['Portfolio',  ROUTES.PORTFOLIO],
    ['Partners',   ROUTES.PARTNERS],
    ['Press',      ROUTES.PRESS],
  ],
  Content: [
    ['Blog',       ROUTES.BLOG],
    ['Events',     ROUTES.EVENTS],
    ['Newsletter', ROUTES.NEWSLETTER],
    ['FAQ',        ROUTES.FAQ],
    ['Contact',    ROUTES.CONTACT],
  ],
  Legal: [
    ['Privacy Policy',   ROUTES.PRIVACY],
    ['Terms of Service', ROUTES.TERMS],
    ['Cookie Policy',    ROUTES.COOKIES],
    ['Accessibility',    ROUTES.ACCESSIBILITY],
  ],
} as const

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">

        {/* Top grid */}
        <div className={styles.topGrid}>

          {/* Brand column */}
          <div>
            <div className={styles.brandRow}>
              <Image
                src="/assets/logo.png"
                alt="Tera-Tech Ltd"
                height={28}
                width={28}
                className={styles.logoImage}
              />
              <span className={styles.brandName}>
                Tera-Tech
              </span>
            </div>
            <p className={styles.brandDescription}>
              Systems innovation connecting Cameroonian tech talent to regional and global opportunities since {APP.founded}.
            </p>
            <div className={styles.contactColumn}>
              <a href={`mailto:${APP.email}`} className={styles.emailLink}>{APP.email}</a>
              <a href={`tel:${APP.phone.replace(/\s/g,'')}`} className={styles.phoneLink}>{APP.phone}</a>
              <p className={styles.addressText}>{APP.address}</p>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(COLS).map(([title, links]) => (
            <div key={title}>
              <p className={styles.columnTitle}>
                {title}
              </p>
              {(links as readonly (readonly [string, string])[]).map(([label, href]) => (
                <Link key={href} href={href} className={styles.columnLink}>
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Tera-Tech Ltd. All rights reserved.
          </p>
          <div className={styles.socialLinks}>
            <a href={APP.socials.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>LinkedIn</a>
            <a href={APP.socials.twitter}  target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Twitter</a>
            <a href={APP.socials.github}   target="_blank" rel="noopener noreferrer" className={styles.socialLink}>GitHub</a>
            <Link href="#" className={styles.socialLink}>↑ Top</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
