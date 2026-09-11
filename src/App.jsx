import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
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


const JOYSTICK_RADIUS = 58
const JOYSTICK_DEADZONE = 0.12

function emitJoystick(detail) {
  window.dispatchEvent(new CustomEvent('portfolio:joystick', { detail }))
}

function getJoystickVector(originX, originY, clientX, clientY) {
  let dx = clientX - originX
  let dy = clientY - originY
  const distance = Math.hypot(dx, dy)

  if (distance > JOYSTICK_RADIUS) {
    const scale = JOYSTICK_RADIUS / distance
    dx *= scale
    dy *= scale
  }

  let x = dx / JOYSTICK_RADIUS
  let y = -dy / JOYSTICK_RADIUS

  if (Math.abs(x) < JOYSTICK_DEADZONE) x = 0
  if (Math.abs(y) < JOYSTICK_DEADZONE) y = 0

  return { dx, dy, x, y }
}

function useTouchDrive(enabled) {
  const pointer = useRef(null)
  const holdTimer = useRef(null)
  const [joystick, setJoystick] = useState(null)

  const reset = useCallback(() => {
    if (holdTimer.current) {
      window.clearTimeout(holdTimer.current)
      holdTimer.current = null
    }

    const wasActive = pointer.current?.active
    pointer.current = null
    setJoystick(null)

    if (wasActive) emitJoystick({ active: false, x: 0, y: 0 })
  }, [])

  const onScenePointerDown = useCallback((event) => {
    if (!enabled || event.pointerType !== 'touch' || pointer.current) return

    const pointerId = event.pointerId
    const originX = event.clientX
    const originY = event.clientY

    pointer.current = {
      id: pointerId,
      originX,
      originY,
      latestX: originX,
      latestY: originY,
      active: false,
    }

    // Delay very slightly so a Three.js landmark can claim the same touch first.
    holdTimer.current = window.setTimeout(() => {
      const current = pointer.current
      if (!current || current.id !== pointerId) return
      current.active = true
      const vector = getJoystickVector(current.originX, current.originY, current.latestX, current.latestY)
      setJoystick({ originX: current.originX, originY: current.originY, dx: vector.dx, dy: vector.dy })
      emitJoystick({ active: true, x: vector.x, y: vector.y })
    }, 55)
  }, [enabled])

  useEffect(() => {
    const handleMove = (event) => {
      const current = pointer.current
      if (!current || event.pointerId !== current.id) return

      current.latestX = event.clientX
      current.latestY = event.clientY
      if (!current.active) return

      event.preventDefault()
      const vector = getJoystickVector(current.originX, current.originY, event.clientX, event.clientY)
      setJoystick({ originX: current.originX, originY: current.originY, dx: vector.dx, dy: vector.dy })
      emitJoystick({ active: true, x: vector.x, y: vector.y })
    }

    const handleEnd = (event) => {
      if (pointer.current && event.pointerId === pointer.current.id) reset()
    }

    const handleLandmarkTouch = (event) => {
      const current = pointer.current
      if (!current) return
      const landmarkPointerId = event.detail?.pointerId
      if (landmarkPointerId == null || landmarkPointerId === current.id) reset()
    }

    window.addEventListener('pointermove', handleMove, { passive: false })
    window.addEventListener('pointerup', handleEnd)
    window.addEventListener('pointercancel', handleEnd)
    window.addEventListener('portfolio:landmark-pointerdown', handleLandmarkTouch)

    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerup', handleEnd)
      window.removeEventListener('pointercancel', handleEnd)
      window.removeEventListener('portfolio:landmark-pointerdown', handleLandmarkTouch)
    }
  }, [reset])

  useEffect(() => {
    if (!enabled) reset()
  }, [enabled, reset])

  useEffect(() => reset, [reset])

  return { joystick, onScenePointerDown }
}

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

  const { joystick, onScenePointerDown } = useTouchDrive(started && !active && !menuOpen)

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

  return (
    <main className="app-shell">
      <section className="scene-layer" aria-label="Interactive 3D portfolio map" onPointerDown={onScenePointerDown}>
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

      {started && !active && joystick && (
        <div
          className="touch-joystick"
          aria-hidden="true"
          style={{ left: joystick.originX, top: joystick.originY }}
        >
          <div className="touch-joystick-ring">
            <span className="touch-joystick-axis touch-joystick-axis-x" />
            <span className="touch-joystick-axis touch-joystick-axis-y" />
            <div
              className="touch-joystick-knob"
              style={{ transform: `translate(-50%, -50%) translate(${joystick.dx}px, ${joystick.dy}px)` }}
            />
          </div>
        </div>
      )}

      {started && !active && !menuOpen && !joystick && (
        <div className="touch-drive-hint">TOUCH + HOLD ANYWHERE TO DRIVE</div>
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
