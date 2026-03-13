'use client'

import { useEffect } from 'react'
import { animate } from 'animejs'
import { RevealWaveImage } from '@/components/ui/reveal-wave-image'

export default function Hero() {
  useEffect(() => {
    animate('.hero-label', { opacity: 1, duration: 800, ease: 'outCubic', delay: 600 })
  }, [])

  return (
    <section id="hero" className="relative min-h-screen bg-[#0d0d0d] flex flex-col items-center justify-center overflow-hidden">
      {/* Full-screen RevealWaveImage background */}
      <div className="absolute inset-0 z-0">
        <RevealWaveImage
          src="/hero-bg.jpg"
          waveSpeed={0.2}
          waveFrequency={0.7}
          waveAmplitude={0.5}
          revealRadius={0.5}
          revealSoftness={1}
          pixelSize={2}
          mouseRadius={0.4}
          className="w-full h-full"
        />
      </div>

      {/* Center label */}
      <p
        className="hero-label relative z-10 text-white text-sm tracking-[0.5em] uppercase font-medium whitespace-nowrap pointer-events-none text-center"
        style={{
          opacity: 0,
          textShadow: '0 2px 12px rgba(0,0,0,0.5)',
        }}
      >
        Be brave. Be innovative.
      </p>
    </section>
  )
}
