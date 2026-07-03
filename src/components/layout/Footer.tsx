'use client'

import Link from 'next/link'
import { APP } from '@/constants/config'
import { ROUTES } from '@/constants/routes'

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
    <footer style={{ background: '#060D15', borderTop: '1px solid var(--white-faint)', paddingTop: 'var(--s64)', paddingBottom: 'var(--s32)' }}>
      <div className="container">

        {/* Top grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 'var(--s40)', paddingBottom: 'var(--s48)', borderBottom: '1px solid var(--white-faint)' }}>

          {/* Brand column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 'var(--s16)' }}>
              <span style={{ width: 24, height: 24, background: 'var(--brand-blue)', borderRadius: 'var(--radius-sharp)', display: 'inline-block', flexShrink: 0 }} aria-hidden />
              <span style={{ fontWeight: 700, fontSize: 14, letterSpacing: '-0.3px' }}>
                TERA<span style={{ color: 'var(--brand-blue)' }}>-</span>TECH<span style={{ color: 'var(--brand-orange)' }}>.</span>
              </span>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--white-muted)', lineHeight: 1.7, maxWidth: 260, marginBottom: 'var(--s20)' }}>
              Systems innovation connecting Cameroonian tech talent to regional and global opportunities since {APP.founded}.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s8)' }}>
              <a href={`mailto:${APP.email}`} style={{ fontSize: 12, color: 'var(--brand-blue)' }}>{APP.email}</a>
              <a href={`tel:${APP.phone.replace(/\s/g,'')}`} style={{ fontSize: 12, color: 'var(--white-muted)' }}>{APP.phone}</a>
              <p style={{ fontSize: 12, color: 'var(--white-subtle)' }}>{APP.address}</p>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(COLS).map(([title, links]) => (
            <div key={title}>
              <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--white-subtle)', marginBottom: 'var(--s16)' }}>
                {title}
              </p>
              {(links as readonly (readonly [string, string])[]).map(([label, href]) => (
                <Link key={href} href={href} style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--white-muted)', marginBottom: 'var(--s10)', transition: 'color var(--duration-fast)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--white)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--white-muted)')}>
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 'var(--s24)', flexWrap: 'wrap', gap: 'var(--s12)' }}>
          <p style={{ fontSize: 12, color: 'var(--white-subtle)' }}>
            © {new Date().getFullYear()} Tera-Tech Ltd. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 'var(--s16)', alignItems: 'center' }}>
            <a href={APP.socials.linkedin} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'var(--white-subtle)' }}>LinkedIn</a>
            <a href={APP.socials.twitter}  target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'var(--white-subtle)' }}>Twitter</a>
            <a href={APP.socials.github}   target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'var(--white-subtle)' }}>GitHub</a>
            <Link href="#" style={{ fontSize: 12, color: 'var(--white-subtle)' }}>↑ Top</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
