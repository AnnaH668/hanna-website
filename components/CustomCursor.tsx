'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [trail, setTrail] = useState(
    Array.from({ length: 5 }, () => ({ x: 0, y: 0 }))
  )
  const trailRef = useRef<Array<{ x: number; y: number }>>(
    Array.from({ length: 6 }, () => ({ x: 0, y: 0 }))
  )
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const isVisibleRef = useRef(false)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      if (!isVisibleRef.current) {
        isVisibleRef.current = true
        setIsVisible(true)
      }
    }

    const handleMouseLeave = () => {
      isVisibleRef.current = false
      setIsVisible(false)
    }
    const handleMouseEnter = () => {
      isVisibleRef.current = true
      setIsVisible(true)
    }
    const getInteractiveTarget = (target: EventTarget | null) =>
      target instanceof Element
        ? target.closest('a, button, [data-cursor-hover]')
        : null

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor

    const animate = () => {
      currentX = lerp(currentX, targetX, 0.15)
      currentY = lerp(currentY, targetY, 0.15)
      for (let i = trailRef.current.length - 1; i > 0; i--) {
        trailRef.current[i] = { ...trailRef.current[i - 1] }
      }
      trailRef.current[0] = { x: currentX, y: currentY }
      setPos({ x: currentX, y: currentY })
      setTrail(trailRef.current.slice(1))
      rafRef.current = requestAnimationFrame(animate)
    }

    const handleHoverStart = () => setIsHovering(true)
    const handleHoverEnd = () => setIsHovering(false)
    const handleMouseOver = (e: MouseEvent) => {
      if (getInteractiveTarget(e.target)) handleHoverStart()
    }
    const handleMouseOut = (e: MouseEvent) => {
      const currentTarget = getInteractiveTarget(e.target)
      const nextTarget = getInteractiveTarget(e.relatedTarget)
      if (currentTarget && currentTarget !== nextTarget) handleHoverEnd()
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] hidden md:block">
      {/* Outer ring */}
      <motion.div
        className="absolute rounded-full border border-accent/40"
        style={{
          left: pos.x,
          top: pos.y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 44 : 28,
          height: isHovering ? 44 : 28,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
      {/* Trail */}
      {trail.map((t, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: t.x,
            top: t.y,
            width: Math.max(2, 6 - i),
            height: Math.max(2, 6 - i),
            opacity: isVisible ? 0.28 - i * 0.04 : 0,
            backgroundColor: '#ADB35B',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
      {/* Inner dot */}
      <motion.div
        className="absolute rounded-full bg-accent"
        style={{
          left: pos.x,
          top: pos.y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 6 : 4,
          height: isHovering ? 6 : 4,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      />
    </div>
  )
}
