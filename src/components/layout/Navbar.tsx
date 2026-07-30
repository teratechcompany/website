"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { ROUTES } from "@/constants/routes";
import { APP } from "@/constants/config";
import Image from "next/image";
const NAV = [
  { label: "About", href: ROUTES.ABOUT },
  { label: "Services", href: ROUTES.SERVICES },
  { label: "Portfolio", href: ROUTES.PORTFOLIO },
  { label: "Team", href: ROUTES.TEAM },
  { label: "Blog", href: ROUTES.BLOG },
  { label: "Events", href: ROUTES.EVENTS },
  { label: "Alumni", href: ROUTES.ALUMNI },
  { label: "Careers", href: ROUTES.CAREERS },
  { label: "Contact", href: ROUTES.CONTACT },
];
export function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <div className="container site-header-inner">
          {/* Logo */}
          <Link href={ROUTES.HOME} aria-label={APP.name} className="site-brand">
            <Image
              src="/assets/logo.png"
              alt="Tera-Tech Ltd"
              height={28}
              width={28}
              className="site-brand-logo"
            />
            <span className="site-brand-text">Tera-Tech</span>
          </Link>
          {/* Desktop Navigation */}
          <nav aria-label="Main navigation" className="site-nav hide-mobile">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="nav-link">
                {item.label}
              </Link>
            ))}
          </nav>
          {/* Auth Actions */}
          <div className="site-actions hide-mobile">
            {session ? (
              <>
                <Link href={ROUTES.PORTAL} className="btn btn-ghost btn-sm">
                  Portal
                </Link>
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="btn btn-ghost btn-sm"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link href={ROUTES.LOGIN} className="btn btn-ghost btn-sm">
                  Sign in
                </Link>
                <Link href={ROUTES.APPLY} className="btn btn-orange btn-sm">
                  Apply Now
                </Link>
              </>
            )}
          </div>
          {/* Mobile Drawer Toggle */}
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="site-menu-toggle show-mobile"
            aria-label={
              open ? "Close main navigation menu" : "Open main navigation menu"
            }
            aria-expanded={open}
            aria-controls="mobile-nav-drawer"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </header>
      {/* Mobile Drawer Navigation */}
      {open && (
        <div id="mobile-nav-drawer" className="site-mobile-menu show-mobile">
          <nav aria-label="Mobile navigation">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="site-mobile-link"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="site-mobile-actions">
            {session ? (
              <Link
                href={ROUTES.PORTAL}
                onClick={() => setOpen(false)}
                className="btn btn-blue site-mobile-btn"
              >
                Portal
              </Link>
            ) : (
              <>
                <Link
                  href={ROUTES.LOGIN}
                  onClick={() => setOpen(false)}
                  className="btn btn-ghost site-mobile-btn"
                >
                  Sign in
                </Link>
                <Link
                  href={ROUTES.APPLY}
                  onClick={() => setOpen(false)}
                  className="btn btn-orange site-mobile-btn"
                >
                  Apply
                </Link>
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
  );
}
