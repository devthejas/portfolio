import React, { useState } from 'react'

/**
 * ProjectCard – glassmorphism card with hover lift and glow.
 * @param {{ title, description, image, tech, github, live }} project
 */
function ProjectCard({ project }) {
  const { title, description, image, tech, github, live } = project
  const [hovered, setHovered] = useState(false)

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        background: 'var(--bg-card)',
        border: `1px solid ${hovered
          ? 'rgba(124,58,237,0.4)' : 'rgba(255,255,255,0.07)'}`,
        boxShadow: hovered
          ? '0 16px 48px rgba(124,58,237,0.2), 0 4px 12px rgba(0,0,0,0.4)'
          : '0 4px 24px rgba(0,0,0,0.3)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        display: 'flex', flexDirection: 'column',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* ── Project image ─────────── */}
      <div style={{ overflow: 'hidden', aspectRatio: '16/9', position: 'relative' }}>
        <img
          src={image}
          alt={`${title} screenshot`}
          loading="lazy"
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.45s ease',
          }}
        />
        {/* Top gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 50%, rgba(10,10,15,0.6))',
        }} />
      </div>

      {/* ── Card body ────────────── */}
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.65rem',
          color: 'var(--text-primary)' }}>
          {title}
        </h3>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)',
          lineHeight: 1.75, flex: 1, marginBottom: '1.25rem' }}>
          {description}
        </p>

        {/* Tech stack chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem',
          marginBottom: '1.4rem' }}>
          {tech.map((t) => (
            <span key={t} style={{
              padding: '0.2rem 0.7rem', borderRadius: 'var(--radius-full)',
              fontSize: '0.78rem', fontWeight: 500,
              background: 'rgba(6,182,212,0.1)',
              border: '1px solid rgba(6,182,212,0.22)',
              color: '#67e8f9',
            }}>
              {t}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1, textAlign: 'center',
                padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(124,58,237,0.35)',
                color: '#a78bfa', fontSize: '0.88rem', fontWeight: 600,
                transition: 'all var(--t-base)',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(124,58,237,0.15)'
                e.target.style.borderColor = '#7c3aed'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent'
                e.target.style.borderColor = 'rgba(124,58,237,0.35)'
              }}
            >
              ⌥ GitHub
            </a>
          )}
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1, textAlign: 'center',
                padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                color: '#fff', fontSize: '0.88rem', fontWeight: 600,
                transition: 'opacity var(--t-base)',
              }}
              onMouseEnter={(e) => { e.target.style.opacity = '0.85' }}
              onMouseLeave={(e) => { e.target.style.opacity = '1' }}
            >
              ↗ Live Demo
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
