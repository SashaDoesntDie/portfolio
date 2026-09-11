import { useEffect, useMemo, useRef } from 'react'
import { Html, RoundedBox } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { portfolio } from '../data.js'

const WORLD_LIMIT = 42

function useKeyboard() {
  const keys = useRef(new Set())
  useEffect(() => {
    const down = (event) => {
      keys.current.add(event.code)
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(event.code)) event.preventDefault()
    }
    const up = (event) => keys.current.delete(event.code)
    window.addEventListener('keydown', down, { passive: false })
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [])
  return keys
}

function useJoystick() {
  const input = useRef({ active: false, x: 0, y: 0 })

  useEffect(() => {
    const update = (event) => {
      input.current = {
        active: Boolean(event.detail?.active),
        x: THREE.MathUtils.clamp(event.detail?.x ?? 0, -1, 1),
        y: THREE.MathUtils.clamp(event.detail?.y ?? 0, -1, 1),
      }
    }

    window.addEventListener('portfolio:joystick', update)
    return () => window.removeEventListener('portfolio:joystick', update)
  }, [])

  return input
}

function F1Car({ enabled, onNearbyChange, onSpeedChange }) {
  const car = useRef()
  const wheels = useRef([])
  const keys = useKeyboard()
  const joystick = useJoystick()
  const velocity = useRef(0)
  const steer = useRef(0)
  const nearId = useRef(null)
  const lastHudUpdate = useRef(0)
  const { camera } = useThree()

  const temp = useMemo(() => ({
    forward: new THREE.Vector3(),
    cameraPos: new THREE.Vector3(),
    lookAt: new THREE.Vector3(),
  }), [])

  useFrame((state, delta) => {
    if (!car.current) return
    const dt = Math.min(delta, 0.04)
    const pressed = keys.current
    const touch = joystick.current
    const keyboardForward = pressed.has('KeyW') || pressed.has('ArrowUp')
    const keyboardBackward = pressed.has('KeyS') || pressed.has('ArrowDown')
    const left = pressed.has('KeyA') || pressed.has('ArrowLeft')
    const right = pressed.has('KeyD') || pressed.has('ArrowRight')
    const boost = pressed.has('ShiftLeft') || pressed.has('ShiftRight')
    const brake = pressed.has('Space')

    const forwardAmount = keyboardForward ? 1 : (touch.active ? Math.max(0, touch.y) : 0)
    const backwardAmount = keyboardBackward ? 1 : (touch.active ? Math.max(0, -touch.y) : 0)
    const keyboardSteer = (left ? 1 : 0) + (right ? -1 : 0)
    const touchSteer = touch.active ? -touch.x : 0

    if (enabled) {
      const maxForward = boost ? 25 : 18
      if (forwardAmount > 0) velocity.current += 16 * forwardAmount * dt
      if (backwardAmount > 0) velocity.current -= 11 * backwardAmount * dt
      if (forwardAmount === 0 && backwardAmount === 0) velocity.current *= Math.pow(0.15, dt)
      if (brake) velocity.current *= Math.pow(0.005, dt)
      velocity.current = THREE.MathUtils.clamp(velocity.current, -6, maxForward)

      const movingFactor = THREE.MathUtils.clamp(Math.abs(velocity.current) / 8, 0.15, 1)
      const targetSteer = THREE.MathUtils.clamp(keyboardSteer + touchSteer, -1, 1)
      steer.current = THREE.MathUtils.lerp(steer.current, targetSteer, 1 - Math.pow(0.001, dt))
      if (Math.abs(velocity.current) > 0.12) {
        car.current.rotation.y += steer.current * 1.55 * movingFactor * dt * Math.sign(velocity.current)
      }

      temp.forward.set(Math.sin(car.current.rotation.y), 0, Math.cos(car.current.rotation.y))
      car.current.position.addScaledVector(temp.forward, velocity.current * dt)
      car.current.position.x = THREE.MathUtils.clamp(car.current.position.x, -WORLD_LIMIT, WORLD_LIMIT)
      car.current.position.z = THREE.MathUtils.clamp(car.current.position.z, -WORLD_LIMIT, WORLD_LIMIT)
    } else {
      velocity.current *= 0.9
    }

    const wheelSpin = velocity.current * dt * 2.8
    wheels.current.forEach((wheel) => wheel && (wheel.rotation.x -= wheelSpin))

    const heading = car.current.rotation.y
    temp.cameraPos.set(
      car.current.position.x - Math.sin(heading) * 7.8,
      4.6,
      car.current.position.z - Math.cos(heading) * 7.8,
    )
    camera.position.lerp(temp.cameraPos, 1 - Math.pow(0.0008, dt))
    temp.lookAt.set(car.current.position.x, 0.65, car.current.position.z)
    camera.lookAt(temp.lookAt)

    let closest = null
    let closestDistance = 5.5
    for (const item of portfolio.landmarks) {
      const dx = car.current.position.x - item.position[0]
      const dz = car.current.position.z - item.position[2]
      const distance = Math.hypot(dx, dz)
      if (distance < closestDistance) {
        closest = item.id
        closestDistance = distance
      }
    }
    if (closest !== nearId.current) {
      nearId.current = closest
      onNearbyChange(closest)
    }

    if (state.clock.elapsedTime - lastHudUpdate.current > 0.08) {
      lastHudUpdate.current = state.clock.elapsedTime
      onSpeedChange(velocity.current)
    }
  })

  return (
    <group ref={car} position={[0, 0.42, 7]} rotation={[0, Math.PI, 0]}>
      <group position={[0, 0.03, 0]}>
        <mesh castShadow position={[0, 0.19, 0.2]}>
          <boxGeometry args={[1.12, 0.24, 3.7]} />
          <meshStandardMaterial color="#ff5f1f" roughness={0.24} metalness={0.18} />
        </mesh>
        <mesh castShadow position={[0, 0.32, -0.3]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.88, 0.42, 1.35]} />
          <meshStandardMaterial color="#ff5f1f" roughness={0.2} metalness={0.25} />
        </mesh>
        <mesh castShadow position={[0, 0.47, -0.06]}>
          <sphereGeometry args={[0.37, 28, 18, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#151515" roughness={0.08} metalness={0.4} />
        </mesh>
        <mesh castShadow position={[0, 0.22, 2.15]}>
          <boxGeometry args={[1.72, 0.07, 0.32]} />
          <meshStandardMaterial color="#151515" roughness={0.35} metalness={0.4} />
        </mesh>
        <mesh castShadow position={[0, 0.46, -1.78]}>
          <boxGeometry args={[1.9, 0.09, 0.4]} />
          <meshStandardMaterial color="#151515" roughness={0.3} metalness={0.45} />
        </mesh>
        <mesh castShadow position={[0, 0.28, 1.55]}>
          <boxGeometry args={[0.18, 0.17, 1.2]} />
          <meshStandardMaterial color="#ff5f1f" />
        </mesh>
        <mesh castShadow position={[0, 0.17, 0.65]}>
          <boxGeometry args={[2.0, 0.07, 0.36]} />
          <meshStandardMaterial color="#141414" roughness={0.3} />
        </mesh>
        {[[-0.84, 0.12, 1.2], [0.84, 0.12, 1.2], [-0.84, 0.12, -1.18], [0.84, 0.12, -1.18]].map((p, i) => (
          <group key={i} position={p} ref={(el) => { wheels.current[i] = el }}>
            <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.35, 0.35, 0.29, 22]} />
              <meshStandardMaterial color="#0b0b0b" roughness={0.72} />
            </mesh>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.18, 0.18, 0.3, 16]} />
              <meshStandardMaterial color="#d6d6d0" metalness={0.8} roughness={0.22} />
            </mesh>
          </group>
        ))}
        <mesh position={[0, 0.22, -1.9]}>
          <boxGeometry args={[0.35, 0.08, 0.1]} />
          <meshStandardMaterial color="#ff2e2e" emissive="#ff2e2e" emissiveIntensity={2.2} />
        </mesh>
      </group>
    </group>
  )
}

function LandmarkLabel({ item }) {
  return (
    <Html center position={[0, 3.4, 0]} distanceFactor={10} style={{ pointerEvents: 'none' }}>
      <div className="world-label">
        <span>{item.index}</span>
        <strong>{item.label}</strong>
      </div>
    </Html>
  )
}

function OrbitalLandmark({ item }) {
  const ring = useRef()
  useFrame((_, delta) => ring.current && (ring.current.rotation.y += delta * 0.35))
  return (
    <group>
      <mesh castShadow position={[0, 1.25, 0]}>
        <sphereGeometry args={[1.1, 32, 24]} />
        <meshStandardMaterial color="#f7f7f3" roughness={0.12} metalness={0.25} />
      </mesh>
      <mesh ref={ring} position={[0, 1.25, 0]} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[1.65, 0.045, 12, 80]} />
        <meshStandardMaterial color={item.accent} emissive={item.accent} emissiveIntensity={1.2} />
      </mesh>
    </group>
  )
}

function PavilionLandmark({ item }) {
  return (
    <group>
      {[[-1.45, 1.35, -1.45], [1.45, 1.35, -1.45], [-1.45, 1.35, 1.45], [1.45, 1.35, 1.45]].map((p, i) => (
        <mesh key={i} castShadow position={p}>
          <boxGeometry args={[0.16, 2.7, 0.16]} />
          <meshStandardMaterial color="#ecece8" metalness={0.25} roughness={0.28} />
        </mesh>
      ))}
      <mesh castShadow position={[0, 2.75, 0]}>
        <boxGeometry args={[3.25, 0.12, 3.25]} />
        <meshStandardMaterial color="#f8f8f5" roughness={0.24} />
      </mesh>
      <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.6, 1.55, 48]} />
        <meshStandardMaterial color={item.accent} emissive={item.accent} emissiveIntensity={0.8} />
      </mesh>
    </group>
  )
}

function MonolithLandmark({ item }) {
  return (
    <group>
      <RoundedBox castShadow args={[2.15, 4.7, 0.55]} radius={0.14} smoothness={4} position={[0, 2.35, 0]}>
        <meshStandardMaterial color="#ecece9" metalness={0.2} roughness={0.25} />
      </RoundedBox>
      <mesh position={[0, 2.35, 0.3]}>
        <planeGeometry args={[1.55, 3.85]} />
        <meshStandardMaterial color="#111111" emissive={item.accent} emissiveIntensity={0.12} />
      </mesh>
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.45, 48]} />
        <meshStandardMaterial color={item.accent} transparent opacity={0.18} />
      </mesh>
    </group>
  )
}

function TowerLandmark({ item }) {
  return (
    <group>
      {[0, 0.72, 1.44, 2.16, 2.88].map((y, i) => (
        <RoundedBox key={i} castShadow args={[2.65 - i * 0.22, 0.48, 2.05 - i * 0.12]} radius={0.1} smoothness={3} position={[0, 0.28 + y, 0]}>
          <meshStandardMaterial color={i === 4 ? item.accent : '#f3f3ef'} metalness={0.15} roughness={0.2} />
        </RoundedBox>
      ))}
    </group>
  )
}

function GateLandmark({ item }) {
  return (
    <group>
      <mesh castShadow position={[-1.35, 1.7, 0]}><boxGeometry args={[0.3, 3.4, 0.5]} /><meshStandardMaterial color="#ededeb" /></mesh>
      <mesh castShadow position={[1.35, 1.7, 0]}><boxGeometry args={[0.3, 3.4, 0.5]} /><meshStandardMaterial color="#ededeb" /></mesh>
      <mesh castShadow position={[0, 3.25, 0]}><boxGeometry args={[3, 0.3, 0.5]} /><meshStandardMaterial color="#ededeb" /></mesh>
      <mesh position={[0, 1.7, 0.05]}><planeGeometry args={[2.15, 2.45]} /><meshStandardMaterial color={item.accent} transparent opacity={0.22} emissive={item.accent} emissiveIntensity={0.55} /></mesh>
    </group>
  )
}

function BeaconLandmark({ item }) {
  const beam = useRef()
  useFrame(({ clock }) => {
    if (beam.current) beam.current.material.opacity = 0.12 + Math.sin(clock.elapsedTime * 2) * 0.05
  })
  return (
    <group>
      <mesh castShadow position={[0, 0.65, 0]}><cylinderGeometry args={[1.05, 1.35, 1.3, 32]} /><meshStandardMaterial color="#efefeb" roughness={0.2} /></mesh>
      <mesh castShadow position={[0, 1.65, 0]}><cylinderGeometry args={[0.18, 0.3, 2, 24]} /><meshStandardMaterial color="#deded9" metalness={0.45} /></mesh>
      <mesh position={[0, 3.35, 0]}><sphereGeometry args={[0.38, 24, 16]} /><meshStandardMaterial color={item.accent} emissive={item.accent} emissiveIntensity={2} /></mesh>
      <mesh ref={beam} position={[0, 8, 0]}><cylinderGeometry args={[0.05, 0.65, 9, 24, 1, true]} /><meshBasicMaterial color={item.accent} transparent opacity={0.14} side={THREE.DoubleSide} depthWrite={false} /></mesh>
    </group>
  )
}

function Landmark({ item, active, onOpen }) {
  const group = useRef()
  useFrame(({ clock }) => {
    if (group.current) {
      const target = active ? 1.035 : 1
      group.current.scale.lerp(new THREE.Vector3(target, target, target), 0.08)
      group.current.position.y = Math.sin(clock.elapsedTime * 1.2 + Number(item.index)) * 0.035
    }
  })

  let shape
  if (item.kind === 'orbital') shape = <OrbitalLandmark item={item} />
  if (item.kind === 'pavilion') shape = <PavilionLandmark item={item} />
  if (item.kind === 'monolith') shape = <MonolithLandmark item={item} />
  if (item.kind === 'tower') shape = <TowerLandmark item={item} />
  if (item.kind === 'gate') shape = <GateLandmark item={item} />
  if (item.kind === 'beacon') shape = <BeaconLandmark item={item} />

  return (
    <group
      ref={group}
      position={item.position}
      onPointerDown={(event) => {
        event.stopPropagation()
        const pointerId = event.pointerId ?? event.sourceEvent?.pointerId ?? event.nativeEvent?.pointerId
        window.dispatchEvent(new CustomEvent('portfolio:landmark-pointerdown', { detail: { pointerId } }))
      }}
      onClick={(event) => { event.stopPropagation(); onOpen(item.id) }}
      onPointerOver={() => { document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { document.body.style.cursor = 'default' }}
    >
      {shape}
      <LandmarkLabel item={item} />
    </group>
  )
}

function Ground() {
  const rings = useMemo(() => Array.from({ length: 10 }, (_, i) => (i + 1) * 4), [])
  return (
    <group>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#f4f4f0" roughness={0.84} metalness={0.04} />
      </mesh>
      <gridHelper args={[90, 45, '#d7d7d1', '#e3e3de']} position={[0, 0.004, 0]} />
      {rings.map((radius) => (
        <mesh key={radius} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.011, 0]}>
          <ringGeometry args={[radius - 0.025, radius + 0.025, 128]} />
          <meshBasicMaterial color="#d9d9d3" transparent opacity={0.52} />
        </mesh>
      ))}
      {[[0, -8], [0, 8], [-8, 0], [8, 0]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.016, z]} rotation={[-Math.PI / 2, 0, i > 1 ? Math.PI / 2 : 0]}>
          <planeGeometry args={[0.12, 58]} />
          <meshBasicMaterial color="#d0d0ca" transparent opacity={0.65} />
        </mesh>
      ))}
    </group>
  )
}

function BoundaryMarkers() {
  const points = []
  for (let i = -40; i <= 40; i += 5) {
    points.push([i, 0.13, -43], [i, 0.13, 43], [-43, 0.13, i], [43, 0.13, i])
  }
  return points.map((p, i) => (
    <mesh key={i} position={p}>
      <boxGeometry args={[0.08, 0.26, 0.08]} />
      <meshBasicMaterial color="#bcbcb6" />
    </mesh>
  ))
}

export function PortfolioWorld({ started, activeId, onLandmarkOpen, onNearbyChange, onSpeedChange }) {
  return (
    <>
      <color attach="background" args={['#f4f4f0']} />
      <fog attach="fog" args={['#f4f4f0', 28, 78]} />
      <hemisphereLight intensity={1.9} color="#ffffff" groundColor="#d9d9d3" />
      <directionalLight
        castShadow
        position={[10, 18, 9]}
        intensity={2.2}
        color="#ffffff"
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={60}
        shadow-camera-left={-35}
        shadow-camera-right={35}
        shadow-camera-top={35}
        shadow-camera-bottom={-35}
      />
      <Ground />
      <BoundaryMarkers />
      {portfolio.landmarks.map((item) => (
        <Landmark key={item.id} item={item} active={item.id === activeId} onOpen={onLandmarkOpen} />
      ))}
      <F1Car enabled={started && !activeId} onNearbyChange={onNearbyChange} onSpeedChange={onSpeedChange} />
    </>
  )
}
