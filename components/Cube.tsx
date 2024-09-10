import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'

interface CubeProps {
  onClick: () => void
}

export default function Cube({ onClick }: CubeProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const cubeRef = useRef<THREE.Mesh>()

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(200, 200)
    mountRef.current.appendChild(renderer.domElement)

    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
    const cube = new THREE.Mesh(geometry, material)
    cubeRef.current = cube

    scene.add(cube)
    camera.position.z = 2

    const animate = () => {
      requestAnimationFrame(animate)
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      renderer.render(scene, camera)
    }

    animate()

    const handleMouseEnter = () => {
      gsap.to(cube.scale, { duration: 0.3, x: 1.2, y: 1.2, z: 1.2 })
    }

    const handleMouseLeave = () => {
      gsap.to(cube.scale, { duration: 0.3, x: 1, y: 1, z: 1 })
    }

    mountRef.current.addEventListener('mouseenter', handleMouseEnter)
    mountRef.current.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      mountRef.current?.removeChild(renderer.domElement)
      mountRef.current?.removeEventListener('mouseenter', handleMouseEnter)
      mountRef.current?.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return <div ref={mountRef} onClick={onClick} className="cursor-pointer" style={{ width: 200, height: 200 }} />
}