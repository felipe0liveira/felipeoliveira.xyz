'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useAnimate,
} from 'motion/react'

interface GlitchImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
}

export default function GlitchImage({
  src,
  alt,
  width,
  height,
  className,
  priority,
}: GlitchImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scope, animate] = useAnimate()
  const [isHovering, setIsHovering] = useState(false)
  const burstCancelRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cursorX = useMotionValue(0.5)
  const cursorY = useMotionValue(0.5)

  const springX = useSpring(cursorX, { stiffness: 150, damping: 20 })
  const springY = useSpring(cursorY, { stiffness: 150, damping: 20 })

  const lemonX = useTransform(springX, [0, 1], [12, -12])
  const lemonY = useTransform(springY, [0, 1], [6, -6])
  const pinkX = useTransform(springX, [0, 1], [-12, 12])
  const pinkY = useTransform(springY, [0, 1], [-6, 6])

  function getRelativePosition(clientX: number, clientY: number) {
    const el = containerRef.current
    if (!el) return { x: 0.5, y: 0.5 }
    const rect = el.getBoundingClientRect()
    return {
      x: Math.min(1, Math.max(0, (clientX - rect.left) / rect.width)),
      y: Math.min(1, Math.max(0, (clientY - rect.top) / rect.height)),
    }
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const { x, y } = getRelativePosition(e.clientX, e.clientY)
    cursorX.set(x)
    cursorY.set(y)
  }

  function handleMouseEnter() {
    setIsHovering(true)
  }

  function handleMouseLeave() {
    setIsHovering(false)
    cursorX.set(0.5)
    cursorY.set(0.5)
  }

  function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    e.preventDefault()
    const touch = e.touches[0]
    const { x, y } = getRelativePosition(touch.clientX, touch.clientY)
    cursorX.set(x)
    cursorY.set(y)
  }

  function handleTouchStart() {
    setIsHovering(true)
  }

  function handleTouchEnd() {
    setIsHovering(false)
    cursorX.set(0.5)
    cursorY.set(0.5)
  }

  // Glitch burst effect while hovering
  useEffect(() => {
    if (!isHovering) {
      if (burstCancelRef.current) clearTimeout(burstCancelRef.current)
      return
    }

    let cancelled = false

    async function burst() {
      if (cancelled || !scope.current) return
      await animate(
        scope.current,
        { x: [-3, 2, -5, 1, 0], skewX: ['-1deg', '2deg', '-1.5deg', '0deg'] },
        { duration: 0.2, ease: 'easeInOut' },
      )
      if (cancelled) return
      burstCancelRef.current = setTimeout(burst, 400 + Math.random() * 500)
    }

    burstCancelRef.current = setTimeout(burst, 300 + Math.random() * 400)

    return () => {
      cancelled = true
      if (burstCancelRef.current) clearTimeout(burstCancelRef.current)
    }
  }, [isHovering, animate, scope])

  return (
    <div
      ref={containerRef}
      className='relative overflow-hidden cursor-crosshair select-none'
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Base image */}
      <div ref={scope}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
          priority={priority}
          draggable={false}
        />
      </div>

      {/* Lemon channel */}
      <motion.div
        className='absolute inset-0 pointer-events-none'
        style={{ x: lemonX, y: lemonY, mixBlendMode: 'screen' }}
      >
        <Image
          src={src}
          alt=''
          aria-hidden
          width={width}
          height={height}
          className={className}
          style={{
            filter: 'grayscale(1) sepia(1) saturate(5) hue-rotate(20deg)',
            opacity: 0.6,
          }}
          draggable={false}
        />
      </motion.div>

      {/* Pink channel */}
      <motion.div
        className='absolute inset-0 pointer-events-none'
        style={{ x: pinkX, y: pinkY, mixBlendMode: 'screen' }}
      >
        <Image
          src={src}
          alt=''
          aria-hidden
          width={width}
          height={height}
          className={className}
          style={{
            filter: 'grayscale(1) sepia(1) saturate(5) hue-rotate(290deg)',
            opacity: 0.6,
          }}
          draggable={false}
        />
      </motion.div>
    </div>
  )
}
