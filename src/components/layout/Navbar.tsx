'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { ROUTES } from '@/constants/routes'
import { APP } from '@/constants/config'
import Image from 'next/image'

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
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 'var(--nav-height)',
        background: scrolled ? 'rgba(10,10,10,0.92)' : 'rgba(10,10,10,0.5)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid var(--white-faint)' : '1px solid transparent',
        transition: 'background 0.3s var(--ease), border-color 0.3s var(--ease)',
      }}>
        <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <Link href={ROUTES.HOME} aria-label={APP.name} style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Blue rectangle (geometric/angular — brand shape) */}
            {/* <span style={{
              display: 'inline-block', width: 28, height: 28,
              background: 'var(--brand-blue)',
              borderRadius: 'var(--radius-sharp)',
              marginRight: 8, flexShrink: 0,
            }} aria-hidden /> */}
            <Image
              src="/assets/logo.png"
              alt="Tera-Tech Ltd"
              height={28}
              width={28}
              style={{ marginRight: 5, objectFit: 'contain' }}
            />
            <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: '-0.5px', color: 'var(--white)' }}>
              Tera-Tech
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" style={{ display: 'flex', gap: 'var(--s24)', alignItems: 'center' }}
            className="hide-mobile">
            {NAV.map(l => (
              <Link key={l.href} href={l.href} className="nav-link">{l.label}</Link>
            ))}
          </nav>

          {/* Auth CTAs */}
          <div style={{ display: 'flex', gap: 'var(--s8)', alignItems: 'center' }} className="hide-mobile">
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
            className="show-mobile"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            style={{ padding: 'var(--s8)', color: 'var(--white)', fontSize: 20 }}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position: 'fixed', top: 'var(--nav-height)', left: 0, right: 0, zIndex: 99,
          background: 'rgba(10,10,10,0.98)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          padding: 'var(--s24)',
          borderBottom: '1px solid var(--white-faint)',
        }}>
          {NAV.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              style={{ display: 'block', padding: 'var(--s12) 0', fontSize: 'var(--text-md)', color: 'var(--white-dim)', borderBottom: '1px solid var(--white-faint)' }}>
              {l.label}
            </Link>
          ))}
          <div style={{ display: 'flex', gap: 'var(--s12)', marginTop: 'var(--s20)' }}>
            {session ? (
              <Link href={ROUTES.PORTAL} className="btn btn-blue" style={{ flex: 1, justifyContent: 'center' }}>Portal</Link>
            ) : (
              <>
                <Link href={ROUTES.LOGIN}  className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>Sign in</Link>
                <Link href={ROUTES.APPLY}  className="btn btn-orange" style={{ flex: 1, justifyContent: 'center' }}>Apply</Link>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        .hide-mobile { display: flex }
        .show-mobile { display: none }
        @media (max-width: 900px) {
          .hide-mobile { display: none }
          .show-mobile { display: block }
        }
      `}</style>
    </>
  )
}
