import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Procedurally generated 3D Bowling Pin using LatheGeometry
 */
function BowlingPin({ position, rotation, scale = 1, materialType = 'metal' }: any) {
  const meshRef = useRef<THREE.Mesh>(null)

  // Generate the 2D profile of a bowling pin
  const points = useMemo(() => {
    const spline = new THREE.SplineCurve([
      new THREE.Vector2(0, 0),          // Bottom center
      new THREE.Vector2(0.12, 0),       // Base width
      new THREE.Vector2(0.14, 0.05),    // Base rounding
      new THREE.Vector2(0.24, 0.45),    // Belly (widest part)
      new THREE.Vector2(0.14, 0.85),    // Lower neck
      new THREE.Vector2(0.09, 1.10),    // Neck (thinnest part)
      new THREE.Vector2(0.125, 1.35),   // Head bulge
      new THREE.Vector2(0.11, 1.45),    // Head curve
      new THREE.Vector2(0, 1.5),        // Top center
    ])
    return spline.getPoints(64)
  }, [])

  // Rotate the entire pin (body + stripes) slowly
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
    }
  })

  // Frosted glass material
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: '#ffffff',
    transmission: 0.9,
    opacity: 1,
    metalness: 0,
    roughness: 0.2,
    ior: 1.5,
    thickness: 2,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  })

  // Dark glossy metallic material
  const metalMaterial = new THREE.MeshPhysicalMaterial({
    color: '#111118',
    metalness: 0.8,
    roughness: 0.1,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  })

  // Premium Red Stripe material
  const redMaterial = new THREE.MeshPhysicalMaterial({
    color: '#E53935', // Deep vibrant red
    metalness: 0.6,
    roughness: 0.2,
    clearcoat: 1,
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5} floatingRange={[-0.1, 0.1]}>
      <group ref={meshRef as any} position={position} rotation={rotation} scale={scale}>
        <mesh material={materialType === 'glass' ? glassMaterial : metalMaterial}>
          <latheGeometry args={[points, 64]} />
        </mesh>

        {/* Lower Red Stripe */}
        <mesh position={[0, 1.13, 0]} rotation={[Math.PI / 2, 0, 0]} material={redMaterial}>
          <torusGeometry args={[0.096, 0.007, 16, 64]} />
        </mesh>

        {/* Upper Red Stripe */}
        <mesh position={[0, 1.23, 0]} rotation={[Math.PI / 2, 0, 0]} material={redMaterial}>
          <torusGeometry args={[0.108, 0.007, 16, 64]} />
        </mesh>
      </group>
    </Float>
  )
}

function Composition() {
  const groupRef = useRef<THREE.Group>(null)

  // Subtle parallax
  useFrame((state) => {
    if (groupRef.current) {
      const targetX = (state.pointer.x * 0.1)
      const targetY = (state.pointer.y * 0.1)
      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05
      groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* Left Pin (Frosted Glass) */}
      <BowlingPin position={[-3.2, -0.6, 0]} rotation={[0.15, 0, 0.15]} scale={1.2} materialType="glass" />

      {/* Right Pin (Dark Metallic) */}
      <BowlingPin position={[3.2, -0.6, 0]} rotation={[0.08, 0, -0.15]} scale={1.2} materialType="metal" />
    </group>
  )
}

export default function Hero3DScene() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.2} />

        {/* Brand Lighting */}
        <spotLight position={[-5, 5, 5]} angle={0.3} penumbra={1} intensity={8} color="#5FC1D1" />
        <pointLight position={[-2, 2, 2]} intensity={2} color="#5FC1D1" />

        <spotLight position={[5, -5, 5]} angle={0.4} penumbra={1} intensity={8} color="#6DBD4E" />
        <pointLight position={[2, -2, 2]} intensity={2} color="#6DBD4E" />

        <pointLight position={[0, 5, -5]} intensity={1} color="#ffffff" />

        <Suspense fallback={null}>
          <Environment preset="city" />
          <Composition />
        </Suspense>
      </Canvas>
    </div>
  )
}


