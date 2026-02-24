import React, {
  Suspense, useRef, useState, useEffect, useCallback, useMemo,
} from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Billboard, useProgress } from '@react-three/drei'
import * as THREE from 'three'
import { useFadeIn } from '@/hooks/useFadeIn'

// ─── Skill data ───────────────────────────────────────────────────────────────
const SKILLS = [
  'React',     'Node.js',    'Python',   'Java',       'JavaScript',
  'TypeScript','SQL',        'PostgreSQL','MySQL',     'MongoDB',
  'Docker',    'Git',        'REST APIs','Flask',      'Express.js',
  'HTML5',     'CSS3',       'Tailwind', 'AWS',        'Linux',
  'Pandas',    'NumPy',      'Jupyter',  'Vite',       'Three.js',
]

/**
 * Fibonacci sphere algorithm – distributes N points evenly on a unit sphere.
 * More uniform than simple latitude/longitude grids.
 */
function getFibonacciPositions(count, radius = 2.85) {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5)) // ≈ 137.5°
  return Array.from({ length: count }, (_, i) => {
    const y     = 1 - (i / (count - 1)) * 2          // -1 → +1
    const r     = Math.sqrt(1 - y * y)
    const theta = goldenAngle * i
    return [radius * r * Math.cos(theta), radius * y, radius * r * Math.sin(theta)]
  })
}

// ─── Single skill tag ─────────────────────────────────────────────────────────
/**
 * SkillTag – a Billboard Text node positioned on the sphere surface.
 * Billboard keeps text always facing the camera while OrbitControls rotate.
 * useFrame lerps the scale for a smooth hover spring.
 */
function SkillTag({ position, label }) {
  const textRef  = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame(() => {
    if (!textRef.current) return
    const target = hovered ? 1.4 : 1.0
    // Smooth lerp – factor 0.12 gives a nice spring feel
    textRef.current.scale.setScalar(
      THREE.MathUtils.lerp(textRef.current.scale.x, target, 0.12)
    )
  })

  const onOver = useCallback((e) => {
    e.stopPropagation()
    setHovered(true)
    document.body.style.cursor = 'pointer'
  }, [])

  const onOut = useCallback(() => {
    setHovered(false)
    document.body.style.cursor = 'auto'
  }, [])

  return (
    <Billboard position={position}>
      <Text
        ref={textRef}
        fontSize={0.23}
        color={hovered ? '#22d3ee' : '#c4b5fd'}
        anchorX="center"
        anchorY="middle"
        renderOrder={hovered ? 1 : 0}
        onPointerOver={onOver}
        onPointerOut={onOut}
      >
        {label}
      </Text>
    </Billboard>
  )
}

// ─── Progress tracker (must live inside Canvas) ────────────────────────────────
function ProgressTracker({ onReady }) {
  const { progress, active } = useProgress()
  useEffect(() => {
    if (!active && progress === 100) onReady?.()
  }, [active, progress, onReady])
  return null
}

// ─── The full 3D scene ─────────────────────────────────────────────────────────
function SkillScene({ onReady }) {
  // Memoised so positions never recompute on re-renders
  const positions = useMemo(() => getFibonacciPositions(SKILLS.length), [])

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.55} />
      <pointLight position={[ 6,  5,  5]} intensity={0.9} color="#7c3aed" />
      <pointLight position={[-6, -5, -5]} intensity={0.45} color="#06b6d4" />

      {/* Skill tags */}
      {SKILLS.map((skill, i) => (
        <SkillTag key={skill} position={positions[i]} label={skill} />
      ))}

      {/* Camera controls – autoRotate + mouse/touch drag */}
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.65}
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.06}
        rotateSpeed={0.55}
        // Touch: one finger = rotate
        touches={{ ONE: THREE.TOUCH.ROTATE }}
      />

      {/* Track Three.js asset loading */}
      <ProgressTracker onReady={onReady} />
    </>
  )
}

// ─── Skills section wrapper ────────────────────────────────────────────────────
/**
 * Skills – Section containing the 3D rotating sphere.
 * @param {function} onLoaded – called once Three.js reports 100% loaded.
 */
function Skills({ onLoaded }) {
  const [ref, visible] = useFadeIn(0.05)

  // Clean up cursor when component unmounts
  useEffect(() => () => { document.body.style.cursor = 'auto' }, [])

  const anim = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(28px)',
    transition: 'opacity 0.7s ease, transform 0.7s ease',
  }

  return (
    <section
      id="skills"
      ref={ref}
      style={{
        padding: '6rem 2rem',
        background: 'var(--bg-primary)',
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}
    >
      {/* Heading */}
      <div style={{ ...anim, textAlign: 'center', marginBottom: '0.75rem' }}>
        <p style={{ color: '#a78bfa', fontWeight: 600, marginBottom: '0.5rem',
          letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.9rem' }}>
          What I Work With
        </p>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800,
          background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          Tech Stack
        </h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.6rem', fontSize: '0.95rem' }}>
          Drag · Touch · Hover to interact
        </p>
      </div>

      {/* Canvas container */}
      <div
        style={{
          ...anim, transitionDelay: '0.15s',
          width: '100%',
          maxWidth: '680px',
          height: 'clamp(380px, 58vh, 580px)',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          border: '1px solid rgba(124,58,237,0.14)',
          background: 'rgba(124,58,237,0.025)',
          boxShadow: '0 8px 64px rgba(124,58,237,0.12), 0 2px 12px rgba(0,0,0,0.4)',
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 7.5], fov: 55 }}
          // Limit pixel ratio to 2 for performance on high-DPI screens
          dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          // Only render when changes occur (interaction or autoRotate)
          frameloop="always"
        >
          <Suspense fallback={null}>
            <SkillScene onReady={onLoaded} />
          </Suspense>
        </Canvas>
      </div>

      {/* Static skill chips (accessible fallback below the 3D canvas) */}
      <div style={{
        ...anim, transitionDelay: '0.25s',
        display: 'flex', flexWrap: 'wrap', gap: '0.6rem',
        maxWidth: '680px', justifyContent: 'center',
        marginTop: '2rem',
      }}>
        {SKILLS.map((skill) => (
          <span key={skill} style={{
            padding: '0.3rem 0.85rem', borderRadius: 'var(--radius-full)',
            background: 'rgba(124,58,237,0.1)',
            border: '1px solid rgba(124,58,237,0.2)',
            color: '#c4b5fd', fontSize: '0.82rem', fontWeight: 500,
          }}>
            {skill}
          </span>
        ))}
      </div>
    </section>
  )
}

export default Skills
