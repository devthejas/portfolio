import React, { useState, useEffect, useCallback } from 'react'

const NAV_LINKS = [
  { label: 'About',    href: '#about'    },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact'  },
]

/**
 * Navbar – Fixed top navigation bar.
 * - Becomes frosted-glass after scrolling 50px.
 * - Hamburger menu for mobile (< 768px).
 * - Smooth-scroll to sections on link click.
 */
function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [activeLink, setActiveLink] = useState('')

  // ── Track scroll depth ────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Close mobile menu on desktop resize ───────
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // ── Lock body scroll when mobile menu is open ─
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    setActiveLink(href)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [])

  // ── Styles ─────────────────────────────────────
  const nav = {
    position: 'fixed', top: 0, left: 0, right: 0,
    height: 'var(--navbar-height)',
    zIndex: 1000,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 2rem',
    transition: 'background 0.35s ease, box-shadow 0.35s ease, backdrop-filter 0.35s ease',
    background:     scrolled ? 'rgba(10,10,15,0.92)' : 'transparent',
    backdropFilter: scrolled ? 'blur(18px)'          : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(18px)'    : 'none',
    boxShadow:  scrolled ? '0 2px 24px rgba(0,0,0,0.35)' : 'none',
    borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
  }

  const logo = {
    fontSize: '1.35rem', fontWeight: 800,
    background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    backgroundClip: 'text', cursor: 'pointer', letterSpacing: '-0.5px',
  }

  const linkStyle = (href) => ({
    fontSize: '0.95rem', fontWeight: 500,
    color: activeLink === href ? '#a78bfa' : 'var(--text-secondary)',
    padding: '0.4rem 0.6rem',
    borderRadius: 'var(--radius-sm)',
    transition: 'color var(--t-base)',
    position: 'relative',
  })

  const hamburgerBtn = {
    display: 'none',
    flexDirection: 'column', gap: '5px',
    padding: '8px', cursor: 'pointer',
    background: 'none', border: 'none',
    // shown via media query – inline style workaround:
    ...(typeof window !== 'undefined' && window.innerWidth <= 768
      ? { display: 'flex' } : {}),
  }

  // CSS media query via a style tag trick isn't possible with inline styles,
  // so we use a class defined in global.css for the responsive hamburger.
  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .nav-links      { display: none !important; }
          .hamburger-btn  { display: flex !important; }
        }
      `}</style>

      <nav style={nav} role="navigation" aria-label="Main navigation">
        {/* ── Logo ─────────────────── */}
        <a href="#" style={logo} onClick={(e) => handleNavClick(e, 'body')}>
          &lt;ᛃ /&gt;
        </a>

        {/* ── Desktop links ─────────── */}
        <ul
          className="nav-links"
          style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                style={linkStyle(href)}
                onClick={(e) => handleNavClick(e, href)}
                onMouseEnter={(e) => { e.target.style.color = '#a78bfa' }}
                onMouseLeave={(e) => {
                  e.target.style.color = activeLink === href
                    ? '#a78bfa' : 'var(--text-secondary)'
                }}
              >
                {label}
              </a>
            </li>
          ))}

          {/* Resume button */}
          <li>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginLeft: '0.5rem', padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-full)',
                border: '1.5px solid #7c3aed',
                color: '#a78bfa', fontSize: '0.9rem', fontWeight: 600,
                transition: 'all var(--t-base)',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#7c3aed'
                e.target.style.color = '#fff'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent'
                e.target.style.color = '#a78bfa'
              }}
            >
              Resume ↗
            </a>
          </li>
        </ul>

        {/* ── Hamburger button ──────── */}
        <button
          className="hamburger-btn"
          style={{
            display: 'none',      // overridden by media query class above
            flexDirection: 'column', gap: '5px',
            padding: '8px', cursor: 'pointer',
          }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {/* Three bar icon → X when open */}
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block', width: '24px', height: '2px',
                background: '#a78bfa', borderRadius: '2px',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform: menuOpen
                  ? i === 0 ? 'translateY(7px) rotate(45deg)'
                  : i === 2 ? 'translateY(-7px) rotate(-45deg)'
                  : 'scaleX(0)'
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* ── Mobile overlay menu ────── */}
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: 'fixed', inset: 0, zIndex: 999,
          background: 'rgba(10,10,15,0.97)',
          backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: '2rem',
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'opacity 0.35s ease, transform 0.35s ease',
          pointerEvents: menuOpen ? 'all' : 'none',
        }}
      >
        {NAV_LINKS.map(({ label, href }, i) => (
          <a
            key={label}
            href={href}
            style={{
              fontSize: '2rem', fontWeight: 700,
              color: 'var(--text-primary)',
              transition: 'color var(--t-base)',
              animationDelay: `${i * 0.07}s`,
            }}
            onClick={(e) => handleNavClick(e, href)}
            onMouseEnter={(e) => { e.target.style.color = '#a78bfa' }}
            onMouseLeave={(e) => { e.target.style.color = 'var(--text-primary)' }}
          >
            {label}
          </a>
        ))}
      </div>
    </>
  )
}

export default Navbar
