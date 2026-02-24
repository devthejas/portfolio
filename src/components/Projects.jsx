import React from 'react'
import { useFadeIn } from '@/hooks/useFadeIn'
import ProjectCard from './ProjectCard'
import { projects } from '@/data/projects'

/**
 * Projects – Responsive card grid: 3 col desktop, 2 tablet, 1 mobile.
 */
function Projects() {
  const [ref, visible] = useFadeIn(0.05)

  const anim = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(28px)',
    transition: 'opacity 0.7s ease, transform 0.7s ease',
  }

  return (
    <section
      id="projects"
      ref={ref}
      style={{ padding: '6rem 2rem', background: 'var(--bg-secondary)' }}
    >
      <style>{`
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
          margin-top: 3rem;
        }
        @media (max-width: 1024px) { .projects-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px)  { .projects-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
        {/* Heading */}
        <div style={{ ...anim, textAlign: 'center', marginBottom: '0' }}>
          <p style={{ color: '#a78bfa', fontWeight: 600, marginBottom: '0.5rem',
            letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.9rem' }}>
            What I've Built
          </p>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800,
            background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Projects
          </h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem',
            maxWidth: '500px', margin: '0.75rem auto 0', fontSize: '1rem' }}>
            A selection of projects spanning backend APIs, data analysis, and full-stack apps.
          </p>
        </div>

        {/* Grid */}
        <div className="projects-grid" style={anim}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
