'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { ROUTES } from '@/constants/routes'
import { APP } from '@/constants/config'
import Image from 'next/image'
import styles from './Navbar.module.css'

const NAV = [
  { label: 'About',     href: ROUTES.ABOUT },
  { label: 'Services',  href: ROUTES.SERVICES },
  { label: 'Portfolio', href: ROUTES.PORTFOLIO },
  { label: 'Team',      href: ROUTES.TEAM },
  { label: 'Blog',      href: ROUTES.BLOG },
  { label: 'Events',    href: ROUTES.EVENTS },
  { label: 'Alumni',    href: ROUTES.ALUMNI },
  { label: 'Careers',   href: ROUTES.CAREERS },
  { label: 'Contact',   href: ROUTES.CONTACT },
]

export function Navbar() {
  const { data: session }   = useSession()
  const [open, setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.headerScrolled : styles.headerDefault}`}>
        <div className={`container ${styles.headerInner}`}>

          {/* Logo */}
          <Link href={ROUTES.HOME} aria-label={APP.name} className={styles.logoLink}>
            <Image
              src="/assets/logo.png"
              alt="Tera-Tech Ltd"
              height={28}
              width={28}
              className={styles.logoImage}
            />
            <span className={styles.logoText}>
              Tera-Tech
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className={`${styles.desktopNav} ${styles.hideMobile}`}>
            {NAV.map(l => (
              <Link key={l.href} href={l.href} className="nav-link">{l.label}</Link>
            ))}
          </nav>

          {/* Auth CTAs */}
          <div className={`${styles.authCtas} ${styles.hideMobile}`}>
            {session ? (
              <>
                <Link href={ROUTES.PORTAL} className="btn btn-ghost btn-sm">Portal</Link>
                <button onClick={() => signOut({ callbackUrl: '/' })} className="btn btn-ghost btn-sm">Sign out</button>
              </>
            ) : (
              <>
                <Link href={ROUTES.LOGIN}  className="btn btn-ghost btn-sm">Sign in</Link>
                <Link href={ROUTES.APPLY}  className="btn btn-orange btn-sm">Apply Now</Link>
              </>
            )}
          </div>

          {/* Burger */}
          <button
            onClick={() => setOpen(o => !o)}
            className={`${styles.showMobile} ${styles.burger}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div className={styles.mobileMenu}>
          {NAV.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className={styles.mobileNavLink}>
              {l.label}
            </Link>
          ))}
          <div className={styles.mobileCtas}>
            {session ? (
              <Link href={ROUTES.PORTAL} className={`btn btn-blue ${styles.mobileCtaBtn}`}>Portal</Link>
            ) : (
              <>
                <Link href={ROUTES.LOGIN}  className={`btn btn-ghost ${styles.mobileCtaBtn}`}>Sign in</Link>
                <Link href={ROUTES.APPLY}  className={`btn btn-orange ${styles.mobileCtaBtn}`}>Apply</Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
