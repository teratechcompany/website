'use client'

import Link from 'next/link'
import Image from 'next/image'
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
    <footer className="site-footer">
      <div className="container">
        {/* Main Footer Grid */}
        <div className="site-footer-grid">
          {/* Brand & Address Column */}
          <div>
            <div className="site-footer-brand-title">
              <Image
                src="/assets/logo.png"
                alt="Tera-Tech Ltd"
                height={28}
                width={28}
                className="site-brand-logo"
              />
              <span>Tera-Tech</span>
            </div>
            <p className="site-footer-brand-desc">
              Systems innovation connecting Cameroonian tech talent to regional and global opportunities since {APP.founded}.
            </p>
            <div className="site-footer-contact">
              <a href={`mailto:${APP.email}`} className="site-footer-contact-email">
                {APP.email}
              </a>
              <a href={`tel:${APP.phone.replace(/\s/g, '')}`} className="site-footer-contact-phone">
                {APP.phone}
              </a>
              <p className="site-footer-contact-address">{APP.address}</p>
            </div>
          </div>

          {/* Navigation Links Columns */}
          {Object.entries(COLS).map(([title, links]) => (
            <div key={title}>
              <p className="site-footer-col-title">{title}</p>
              {(links as readonly (readonly [string, string])[]).map(([label, href]) => (
                <Link key={href} href={href} className="site-footer-link">
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Footer Bottom Bar */}
        <div className="site-footer-bottom">
          <p className="site-footer-copyright">
            © {new Date().getFullYear()} Tera-Tech Ltd. All rights reserved.
          </p>
          <div className="site-footer-socials">
            <a
              href={APP.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer-social-link"
            >
              LinkedIn
            </a>
            <a
              href={APP.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer-social-link"
            >
              Twitter
            </a>
            <a
              href={APP.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer-social-link"
            >
              GitHub
            </a>
            <Link href="#" className="site-footer-social-link">
              ↑ Top
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
