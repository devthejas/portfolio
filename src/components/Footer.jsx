import React from 'react'

const SOCIAL_LINKS = [
  { label: 'GitHub',   href: 'https://github.com/yourusername',       icon: '⌥' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/yourusername',  icon: 'in' },
  { label: 'Twitter',  href: 'https://twitter.com/yourusername',      icon: '𝕏'  },
  { label: 'Email',    href: 'mailto:thejas@example.com',             icon: '✉'  },
]

/**
 * Footer – Social links, copyright, and back-to-top button.
 */
function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer style={{
      padding: '3rem 2rem',
      background: 'var(--bg-secondary)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{
        maxWidth: 'var(--max-width)', margin: '0 auto',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.75rem',
      }}>

        {/* Logo */}
        <span style={{
          fontSize: '1.35rem', fontWeight: 800,
          background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text', letterSpacing: '-0.5px',
        }}>
          &lt;TKS /&gt;
        </span>

        {/* Social links */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap',
          justifyContent: 'center' }}>
          {SOCIAL_LINKS.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500,
                background: 'rgba(255,255,255,0.03)',
                transition: 'all var(--t-base)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.5)'
                e.currentTarget.style.color = '#a78bfa'
                e.currentTarget.style.background = 'rgba(124,58,237,0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                e.currentTarget.style.color = 'var(--text-muted)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
              }}
            >
              <span>{icon}</span> {label}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem',
          textAlign: 'center', lineHeight: 1.6 }}>
          © {new Date().getFullYear()} Thejas K S. Built with React + Three.js.
          <br />
          <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>
            Designed & developed with ♥ in Kottayam, Kerala.
          </span>
        </p>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          style={{
            padding: '0.65rem 1.4rem', borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(124,58,237,0.35)',
            background: 'rgba(124,58,237,0.07)',
            color: '#a78bfa', fontSize: '0.9rem', fontWeight: 600,
            cursor: 'pointer', transition: 'all var(--t-base)',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(124,58,237,0.18)'
            e.target.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(124,58,237,0.07)'
            e.target.style.transform = 'translateY(0)'
          }}
        >
          ↑ Back to Top
        </button>
      </div>
    </footer>
  )
}

export default Footer
