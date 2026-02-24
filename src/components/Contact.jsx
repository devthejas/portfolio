import React, { useState } from 'react'
import { useFadeIn } from '@/hooks/useFadeIn'

/**
 * Contact – Simple form with styled inputs and animated submit.
 * Wire up the onSubmit handler to your preferred backend or EmailJS.
 */
function Contact() {
  const [ref, visible] = useFadeIn(0.1)
  const [form, setForm]       = useState({ name: '', email: '', message: '' })
  const [status, setStatus]   = useState('idle')  // idle | sending | sent | error

  const anim = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(28px)',
    transition: 'opacity 0.7s ease, transform 0.7s ease',
  }

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    // ─── Replace this block with EmailJS / Formspree / your own API ───
    // Example: await emailjs.send('service_id', 'template_id', form, 'public_key')
    await new Promise((r) => setTimeout(r, 1200)) // simulate network
    setStatus('sent')
    setForm({ name: '', email: '', message: '' })
    // Reset after 4s
    setTimeout(() => setStatus('idle'), 4000)
  }

  const inputStyle = {
    width: '100%',
    padding: '0.9rem 1.1rem',
    borderRadius: 'var(--radius-md)',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'var(--text-primary)',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color var(--t-base), box-shadow var(--t-base)',
    fontFamily: 'inherit',
  }

  const labelStyle = {
    display: 'block', marginBottom: '0.5rem',
    fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-secondary)',
  }

  return (
    <section
      id="contact"
      ref={ref}
      style={{ padding: '6rem 2rem', background: 'var(--bg-primary)' }}
    >
      <div style={{ maxWidth: '620px', margin: '0 auto' }}>
        {/* Heading */}
        <div style={{ ...anim, textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ color: '#a78bfa', fontWeight: 600, marginBottom: '0.5rem',
            letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.9rem' }}>
            Say Hello
          </p>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800,
            background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Get In Touch
          </h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem', fontSize: '1rem' }}>
            Have a project in mind or want to connect? I'd love to hear from you.
          </p>
        </div>

        {/* Form card */}
        <div style={{
          ...anim, transitionDelay: '0.1s',
          padding: '2.5rem', borderRadius: 'var(--radius-xl)',
          background: 'var(--bg-card)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 8px 48px rgba(0,0,0,0.4)',
          backdropFilter: 'blur(20px)',
        }}>
          {status === 'sent' ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</p>
              <p style={{ fontSize: '1.2rem', fontWeight: 600,
                color: '#22d3ee', marginBottom: '0.5rem' }}>
                Message sent!
              </p>
              <p style={{ color: 'var(--text-muted)' }}>
                Thanks for reaching out. I'll get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem',
                marginBottom: '1.25rem' }}>
                {/* Name */}
                <div>
                  <label htmlFor="name" style={labelStyle}>Name</label>
                  <input
                    id="name" name="name" type="text"
                    placeholder="Thejas K S"
                    value={form.name}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(124,58,237,0.6)'
                      e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.12)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255,255,255,0.1)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" style={labelStyle}>Email</label>
                  <input
                    id="email" name="email" type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(124,58,237,0.6)'
                      e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.12)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255,255,255,0.1)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>
              </div>

              {/* Message */}
              <div style={{ marginBottom: '1.75rem' }}>
                <label htmlFor="message" style={labelStyle}>Message</label>
                <textarea
                  id="message" name="message"
                  placeholder="Hi Thejas, I'd like to discuss a project…"
                  value={form.message}
                  onChange={handleChange}
                  required rows={5}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '130px' }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(124,58,237,0.6)'
                    e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.12)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.1)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === 'sending'}
                style={{
                  width: '100%', padding: '0.95rem',
                  borderRadius: 'var(--radius-md)',
                  background: status === 'sending'
                    ? 'rgba(124,58,237,0.5)'
                    : 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                  color: '#fff', fontSize: '1rem', fontWeight: 600,
                  border: 'none', cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 24px rgba(124,58,237,0.35)',
                  transition: 'opacity var(--t-base), transform var(--t-base)',
                  letterSpacing: '0.03em',
                }}
                onMouseEnter={(e) => {
                  if (status !== 'sending') e.target.style.opacity = '0.9'
                }}
                onMouseLeave={(e) => { e.target.style.opacity = '1' }}
              >
                {status === 'sending' ? 'Sending…' : 'Send Message →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default Contact
