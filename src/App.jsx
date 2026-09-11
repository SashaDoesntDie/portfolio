import { Suspense, useEffect, useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Loader } from '@react-three/drei'
import {
  ArrowUpRight,
  ChevronRight,
  Circle,
  Mail,
  Menu,
  X
} from "lucide-react";

import {
  FaGithub,
  FaLinkedinIn
} from "react-icons/fa";
import { PortfolioWorld } from './components/PortfolioWorld.jsx'
import { portfolio } from './data.js'

function App() {
  const [started, setStarted] = useState(false)
  const [activeId, setActiveId] = useState(null)
  const [nearId, setNearId] = useState(null)
  const [speed, setSpeed] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  const active = useMemo(
    () => portfolio.landmarks.find((item) => item.id === activeId) ?? null,
    [activeId],
  )
  const nearby = useMemo(
    () => portfolio.landmarks.find((item) => item.id === nearId) ?? null,
    [nearId],
  )

  const openLandmark = (id) => {
    setActiveId(id)
    setMenuOpen(false)
  }

  useEffect(() => {
    const handleGlobalKey = (event) => {
      if (event.code === 'Escape') {
        setActiveId(null)
        setMenuOpen(false)
      }
      if (event.code === 'Enter' && started && nearId && !activeId) {
        openLandmark(nearId)
      }
    }
    window.addEventListener('keydown', handleGlobalKey)
    return () => window.removeEventListener('keydown', handleGlobalKey)
  }, [started, nearId, activeId])

  const dispatchDriveKey = (code, down) => {
    window.dispatchEvent(new KeyboardEvent(down ? 'keydown' : 'keyup', { code, bubbles: true }))
  }

  return (
    <main className="app-shell">
      <section className="scene-layer" aria-label="Interactive 3D portfolio map">
        <Canvas
          shadows
          dpr={[1, 1.5]}
          camera={{ position: [0, 6.4, 11], fov: 47, near: 0.1, far: 180 }}
          gl={{ antialias: true, powerPreference: 'high-performance' }}
        >
          <Suspense fallback={null}>
            <PortfolioWorld
              started={started}
              activeId={activeId}
              onLandmarkOpen={openLandmark}
              onNearbyChange={setNearId}
              onSpeedChange={setSpeed}
            />
          </Suspense>
        </Canvas>
      </section>

      <header className="topbar">
        <button className="brand" onClick={() => setActiveId(null)} aria-label="Return to map">
          <span className="brand-mark">S</span>
          <span className="brand-copy">
            <strong>{portfolio.person.name}</strong>
            <small>SASHA'S PORTFOLIO / 2026</small>
          </span>
        </button>

        <button className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen}>
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
          <span>MAP</span>
        </button>
      </header>

      <nav className={`map-menu ${menuOpen ? 'is-open' : ''}`} aria-label="Portfolio map">
        <div className="map-menu-head">
          <span>DIRECTORY</span>
          <span>06 POINTS</span>
        </div>
        {portfolio.landmarks.map((item) => (
          <button key={item.id} onClick={() => openLandmark(item.id)}>
            <span className="map-index">{item.index}</span>
            <span>{item.title}</span>
            <ChevronRight size={16} />
          </button>
        ))}
      </nav>

      {!started && (
        <section className="intro-panel">
          <p className="eyebrow"><Circle size={7} fill="currentColor" /> PORTFOLIO / DRIVE MODE</p>
          <h1>Don’t scroll.<br />Drive.</h1>
          <p className="intro-copy">
            {portfolio.person.intro} Drive through the map to explore my projects, experience, CV and motivation.
          </p>
          <button className="primary-action" onClick={() => setStarted(true)}>
            START ENGINE <ArrowUpRight size={17} />
          </button>
          <div className="intro-meta">
            <span>WASD / ARROWS</span>
            <span>SHIFT TO BOOST</span>
            <span>CLICK ON LANDMARKS</span>
          </div>
        </section>
      )}

      {started && !active && (
        <div className="hud">
          <div className="hud-card speed-card">
            <span>SPEED</span>
            <strong>{Math.round(Math.abs(speed) * 7.2).toString().padStart(3, '0')}</strong>
            <small>KM/H</small>
          </div>
          <div className="hud-card control-card">
            <span>DRIVE</span>
            <div className="keys"><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd></div>
          </div>
        </div>
      )}

      {started && nearby && !active && (
        <button className="proximity-prompt" onClick={() => openLandmark(nearby.id)}>
          <span className="prompt-dot" style={{ background: nearby.accent }} />
          <span><small>NEARBY</small><strong>{nearby.title}</strong></span>
          <span className="enter-key">ENTER</span>
        </button>
      )}

      {active && (
        <aside className="detail-panel" aria-live="polite">
          <button className="close-detail" onClick={() => setActiveId(null)} aria-label="Close panel"><X size={20} /></button>
          <div className="detail-index">{active.index} / 06</div>
          <div className="detail-accent" style={{ background: active.accent }} />
          <p className="eyebrow">{active.label}</p>
          <h2>{active.title}</h2>
          <p className="detail-subtitle">{active.subtitle}</p>
          <p className="detail-body">{active.body}</p>
          <div className="detail-tags">
            {active.meta.map((tag) => <span key={tag}>{tag}</span>)}
          </div>

          {active.sections?.length > 0 && (
            <div className="detail-sections">
              {active.sections.map((section, sectionIndex) => (
                <section className="detail-section" key={`${active.id}-${sectionIndex}`}>
                  <h3>{section.title}</h3>
                  {section.kicker && <p className="detail-kicker">{section.kicker}</p>}
                  {section.text && <p>{section.text}</p>}
                  {section.bullets?.length > 0 && (
                    <ul>
                      {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          )}

          {active.actions?.length > 0 && (
            <div className="detail-actions">
              {active.actions.map((action) => (
                <a
                  className="detail-link"
                  href={action.href}
                  key={action.href}
                  target={action.href.startsWith('http') ? '_blank' : undefined}
                  rel={action.href.startsWith('http') ? 'noreferrer' : undefined}
                >
                  {action.label} <ArrowUpRight size={14} />
                </a>
              ))}
            </div>
          )}

          <div className="detail-rule" />
          {active.note && <p className="detail-note">{active.note}</p>}
          <button className="secondary-action" onClick={() => setActiveId(null)}>BACK TO DRIVE <ChevronRight size={16} /></button>
        </aside>
      )}

      {started && !active && (
        <div className="mobile-controls" aria-label="Touch driving controls">
          <button
            className="mobile-throttle"
            onPointerDown={() => dispatchDriveKey('ArrowUp', true)}
            onPointerUp={() => dispatchDriveKey('ArrowUp', false)}
            onPointerCancel={() => dispatchDriveKey('ArrowUp', false)}
            onPointerLeave={() => dispatchDriveKey('ArrowUp', false)}
            aria-label="Accelerate"
          >↑</button>
          <button
            onPointerDown={() => dispatchDriveKey('ArrowLeft', true)}
            onPointerUp={() => dispatchDriveKey('ArrowLeft', false)}
            onPointerCancel={() => dispatchDriveKey('ArrowLeft', false)}
            onPointerLeave={() => dispatchDriveKey('ArrowLeft', false)}
            aria-label="Steer left"
          >←</button>
          <button
            onPointerDown={() => dispatchDriveKey('ArrowDown', true)}
            onPointerUp={() => dispatchDriveKey('ArrowDown', false)}
            onPointerCancel={() => dispatchDriveKey('ArrowDown', false)}
            onPointerLeave={() => dispatchDriveKey('ArrowDown', false)}
            aria-label="Reverse"
          >↓</button>
          <button
            onPointerDown={() => dispatchDriveKey('ArrowRight', true)}
            onPointerUp={() => dispatchDriveKey('ArrowRight', false)}
            onPointerCancel={() => dispatchDriveKey('ArrowRight', false)}
            onPointerLeave={() => dispatchDriveKey('ArrowRight', false)}
            aria-label="Steer right"
          >→</button>
        </div>
      )}

      <footer className="social-rail">
        <a href="mailto:smaktala@gmail.com" aria-label="Email">
          <Mail size={17} />
        </a>

        <a
          href="https://www.linkedin.com/in/sasha175/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedinIn size={17} />
        </a>

        <a
          href="https://github.com/SashaDoesntDie"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          <FaGithub size={17} />
        </a>
      </footer>

      {/* <div className="corner-status"><span /> WEBGL / LIVE</div> */}
      <Loader dataInterpolation={(p) => `LOADING WORLD ${p.toFixed(0)}%`} />
    </main>
  )
}

export default App
