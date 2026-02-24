import React, { useEffect, useState } from 'react'

/**
 * LoadingScreen – Full-page overlay shown while Three.js assets initialise.
 * Fades out when `visible` becomes false.
 */
function LoadingScreen({ visible }) {
  const [mounted, setMounted] = useState(true)

  // Keep DOM mounted during fade-out, then remove
  useEffect(() => {
    if (!visible) {
      const timer = setTimeout(() => setMounted(false), 600)
      return () => clearTimeout(timer)
    }
  }, [visible])

  if (!mounted) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
        background: '#0a0a0f',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.6s ease',
        pointerEvents: visible ? 'all' : 'none',
      }}
    >
      {/* Animated ring spinner */}
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          border: '3px solid rgba(124, 58, 237, 0.2)',
          borderTopColor: '#7c3aed',
          borderRightColor: '#06b6d4',
          animation: 'spin 0.9s linear infinite',
        }}
      />

      {/* Pulsing brand text */}
      <p
        style={{
          fontSize: '1rem',
          fontWeight: 500,
          background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'pulse 1.5s ease-in-out infinite',
          letterSpacing: '0.08em',
        }}
      >
        Initialising 3D…
      </p>
    </div>
  )
}

export default LoadingScreen
