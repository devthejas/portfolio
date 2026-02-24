import React, { useEffect, useState } from 'react'

/**
 * Hero – Full-viewport landing section.
 * Staggered text animation on mount.
 */
function Hero() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Slight delay so LoadingScreen has started fading
    const t = setTimeout(() => setVisible(true), 200)
    return () => clearTimeout(t)
  }, [])

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const animBase = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(30px)',
    transition: 'opacity 0.7s ease, transform 0.7s ease',
  }

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Ambient glow blobs ─────── */}
      <div aria-hidden style={{
        position: 'absolute', top: '15%', left: '10%',
        width: 'clamp(200px, 30vw, 400px)',
        height: 'clamp(200px, 30vw, 400px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)',
        filter: 'blur(60px)', animation: 'float 6s ease-in-out infinite',
      }} />
      <div aria-hidden style={{
        position: 'absolute', bottom: '20%', right: '10%',
        width: 'clamp(150px, 25vw, 350px)',
        height: 'clamp(150px, 25vw, 350px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6,182,212,0.14) 0%, transparent 70%)',
        filter: 'blur(60px)', animation: 'float 8s ease-in-out infinite reverse',
      }} />

      {/* ── Content ─────────────────── */}
      <div style={{ textAlign: 'center', maxWidth: '800px', position: 'relative' }}>

        {/* Greeting badge */}
        <div style={{ ...animBase, transitionDelay: '0.05s', marginBottom: '1.2rem' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.4rem 1rem', borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(124,58,237,0.35)',
            background: 'rgba(124,58,237,0.08)',
            fontSize: '0.9rem', color: '#a78bfa', fontWeight: 500,
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%',
              background: '#22d3ee', animation: 'pulse 1.5s infinite' }} />
            Available for opportunities
          </span>
        </div>

        {/* Name */}
        <h1 style={{
          ...animBase, transitionDelay: '0.15s',
          fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
          fontWeight: 900, lineHeight: 1.1,
          marginBottom: '0.6rem', letterSpacing: '-2px',
        }}>
          <span style={{ color: 'var(--text-primary)' }}>Thejas </span>
          <span style={{
            background: 'linear-gradient(135deg, #7c3aed 30%, #06b6d4 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            K S
          </span>
        </h1>

        {/* Role */}
        <h2 style={{
          ...animBase, transitionDelay: '0.25s',
          fontSize: 'clamp(1.2rem, 3vw, 1.75rem)',
          fontWeight: 400, color: 'var(--text-secondary)',
          marginBottom: '1.5rem',
        }}>
          Full Stack Developer &nbsp;·&nbsp; MCA Graduate &nbsp;·&nbsp; Backend Enthusiast
        </h2>

        {/* Intro paragraph */}
        <p style={{
          ...animBase, transitionDelay: '0.35s',
          fontSize: 'clamp(1rem, 2vw, 1.15rem)',
          color: 'var(--text-secondary)', lineHeight: 1.8,
          maxWidth: '620px', margin: '0 auto 2.5rem',
        }}>
          I build scalable backend systems, RESTful APIs, and full-stack web applications.
          Passionate about clean code, database design, and turning complex problems
          into elegant solutions.
        </p>

        {/* CTA buttons */}
        <div style={{
          ...animBase, transitionDelay: '0.45s',
          display: 'flex', gap: '1rem',
          justifyContent: 'center', flexWrap: 'wrap',
        }}>
          <button
            onClick={scrollToProjects}
            style={{
              padding: '0.85rem 2rem', borderRadius: 'var(--radius-full)',
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              color: '#fff', fontSize: '1rem', fontWeight: 600,
              boxShadow: '0 4px 24px rgba(124,58,237,0.4)',
              transition: 'transform var(--t-base), box-shadow var(--t-base)',
              border: 'none', cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 8px 32px rgba(124,58,237,0.55)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 4px 24px rgba(124,58,237,0.4)'
            }}
          >
            View Projects →
          </button>

          {/* <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            style={{
              padding: '0.85rem 2rem', borderRadius: 'var(--radius-full)',
              border: '1.5px solid rgba(124,58,237,0.45)',
              color: '#a78bfa', fontSize: '1rem', fontWeight: 600,
              background: 'rgba(124,58,237,0.06)',
              transition: 'all var(--t-base)', cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(124,58,237,0.15)'
              e.target.style.borderColor = 'rgba(124,58,237,0.7)'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(124,58,237,0.06)'
              e.target.style.borderColor = 'rgba(124,58,237,0.45)'
            }}
          >
            Get in Touch
          </a> */}
        </div>
      </div>

      {/* ── Scroll indicator ─────────── */}
      <div style={{
        position: 'absolute', bottom: '2.5rem',
        left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
        animation: 'float 2s ease-in-out infinite',
        opacity: 0.5,
      }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)',
          letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <div style={{
          width: '1.5px', height: '36px',
          background: 'linear-gradient(to bottom, var(--accent-purple), transparent)',
        }} />
      </div>
    </section>
  )
}

export default Hero
