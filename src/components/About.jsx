import React from 'react'
import { useFadeIn } from '@/hooks/useFadeIn'

/**
 * About – Two-column layout on desktop, stacked on mobile.
 * Replace the placeholder image src with your actual photo.
 */
function About() {
  const [ref, visible] = useFadeIn(0.1)

  const anim = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(28px)',
    transition: 'opacity 0.7s ease, transform 0.7s ease',
  }

  return (
    <section id="about" ref={ref}>
      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 4rem;
          align-items: center;
        }
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .about-img-wrap { max-width: 280px; margin: 0 auto; }
        }
        .about-section { background: var(--bg-secondary); }
        .stat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-top: 2rem;
        }
        @media (max-width: 480px) { .stat-grid { grid-template-columns: 1fr 1fr; } }
      `}</style>

      <div className="about-section" style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>

          {/* Section heading */}
          <div style={{ ...anim, textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ color: '#a78bfa', fontWeight: 600, marginBottom: '0.5rem',
              letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.9rem' }}>
              Who I Am
            </p>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800,
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              About Me
            </h2>
          </div>

          <div className="about-grid" style={anim}>
            {/* ── Image ─────────────────── */}
            <div className="about-img-wrap">
              <div style={{
                position: 'relative',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                aspectRatio: '1 / 1',
                border: '2px solid rgba(124,58,237,0.3)',
                boxShadow: '0 0 60px rgba(124,58,237,0.2), 0 20px 60px rgba(0,0,0,0.4)',
              }}>
                {/* Replace src with your actual photo in /src/assets/images/ */}
                <img
                  src="https://placehold.co/480x480/111118/7c3aed?text=T.K.S"
                  // src="ᚦᛖᛃᚨᛊBackgroundBlackDesktop.png"
                  alt="Thejas K S – profile photo"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {/* Gradient overlay at bottom */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
                  background: 'linear-gradient(to top, rgba(10,10,15,0.6), transparent)',
                }} />
              </div>

              {/* Stats grid below image */}
              <div className="stat-grid">
                {[
                  { value: '2+', label: 'Years Coding' },
                  { value: '10+', label: 'Projects' },
                  { value: 'MCA', label: 'Graduate' },
                ].map(({ value, label }) => (
                  <div key={label} style={{
                    padding: '1rem', textAlign: 'center',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--border-subtle)',
                    backdropFilter: 'blur(10px)',
                  }}>
                    <p style={{ fontSize: '1.6rem', fontWeight: 800,
                      background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text' }}>
                      {value}
                    </p>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)',
                      marginTop: '0.2rem', textTransform: 'uppercase',
                      letterSpacing: '0.08em' }}>
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Text ──────────────────── */}
            <div>
              <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700,
                marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
                Building the web from the back end up.
              </h3>

              {[
                `I'm Thejas K S, an MCA graduate from Kottayam, Kerala, with a strong foundation
                 in backend development, database design, and full-stack engineering. I enjoy
                 architecting systems that are clean, efficient, and built to scale.`,
                `My toolkit spans Python, Java, JavaScript, SQL, and modern frameworks like
                 React, Flask, and Node.js. I'm particularly passionate about database
                 optimisation, RESTful API design, and containerised deployments with Docker.`,
                `When I'm not building projects, I explore data analysis with Pandas, dive into
                 advanced Java concepts, or experiment with creative visualisations like this
                 3D portfolio. I'm actively seeking opportunities where I can contribute and grow.`,
              ].map((text, i) => (
                <p key={i} style={{
                  color: 'var(--text-secondary)', lineHeight: 1.85,
                  marginBottom: '1rem', fontSize: '1rem',
                }}>
                  {text}
                </p>
              ))}

              {/* Tech chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem',
                marginTop: '1.5rem' }}>
                {['Python', 'Java', 'React', 'Node.js', 'PostgreSQL', 'Docker'].map((t) => (
                  <span key={t} style={{
                    padding: '0.35rem 0.9rem', borderRadius: 'var(--radius-full)',
                    background: 'rgba(124,58,237,0.12)',
                    border: '1px solid rgba(124,58,237,0.25)',
                    color: '#c4b5fd', fontSize: '0.85rem', fontWeight: 500,
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
