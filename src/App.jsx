import React, {
  useState,
  useEffect,
  lazy,
  Suspense,
  useCallback,
} from 'react'
import Navbar        from './components/Navbar'
import Hero          from './components/Hero'
import About         from './components/About'
import Contact       from './components/Contact'
import Footer        from './components/Footer'
import LoadingScreen from './components/LoadingScreen'

// Lazy-load heavy sections (3D + projects data grid)
const Skills   = lazy(() => import('./components/Skills'))
const Projects = lazy(() => import('./components/Projects'))

/**
 * App – Root SPA layout.
 * - Shows LoadingScreen while initial assets + 3D section load.
 * - Wraps heavy sections in React.lazy() + Suspense for code splitting.
 * - Provides smooth scroll and dark themed sections.
 */
function App() {
  const [threeReady, setThreeReady] = useState(false)
  const [softLoaded, setSoftLoaded] = useState(false)

  // Soft timeout so loading screen never gets stuck forever,
  // even if 3D doesn't report ready (defensive).
  useEffect(() => {
    const timer = setTimeout(() => setSoftLoaded(true), 4000)
    return () => clearTimeout(timer)
  }, [])

  // Called from <Skills /> when Three.js reports 100% loaded
  const handleSkillsLoaded = useCallback(() => {
    setThreeReady(true)
  }, [])

  const loadingVisible = !(threeReady || softLoaded)

  return (
    <>
      {/* Global loading overlay */}
      <LoadingScreen visible={loadingVisible} />

      {/* Main single-page layout */}
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
        <Navbar />
        <main>
          <Hero />
          <About />

          {/* Skills – 3D section lazy-loaded and tracked for loading screen */}
          <Suspense fallback={null}>
            <Skills onLoaded={handleSkillsLoaded} />
          </Suspense>

          {/* Projects – also lazy-loaded to reduce initial bundle size */}
          <Suspense fallback={null}>
            <Projects />
          </Suspense>

          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
