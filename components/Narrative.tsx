'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import MagneticElement from './MagneticElement'

// Text that reveals word by word
const words = [
  "I'm", "Hanna", "—", "I", "turn", "ideas", "into", "real", "things.",
  "From", "managing", "national", "innovation", "investments", "to", "leading",
  "H2", "AI", "LAB,", "I", "bridge", "the", "gap", "between", "research",
  "and", "the", "market", "to", "build", "practical,", "impactful", "AI", "solutions."
]

function Word({
  children,
  progress,
  range,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.1, 1])
  const y = useTransform(progress, range, [8, 0])

  return (
    <motion.span
      className="inline-block mr-[0.28em]"
      style={{ opacity, y }}
    >
      {children}
    </motion.span>
  )
}

export default function Narrative() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const ctaOpacity = useTransform(scrollYProgress, [0.75, 0.95], [0, 1])
  const ctaY = useTransform(scrollYProgress, [0.75, 0.95], [20, 0])

  return (
    <div
      id="about"
      ref={containerRef}
      className="relative mt-12 md:mt-16"
      style={{ height: '220vh' }}
    >
      {/* Sticky panel — stays in view while scrolling */}
      <div className="sticky top-0 h-screen flex flex-col justify-center px-8 md:px-20 bg-[#f6f7f1] overflow-hidden">
        <div className="max-w-4xl mx-auto w-full">

          {/* Label */}
          <p className="text-xs tracking-[0.25em] uppercase text-[#AAAAAA] mb-10 md:mb-16 font-medium">
            {`//`} About
          </p>

          {/* Word-by-word reveal */}
          <p
            className="text-3xl md:text-4xl lg:text-[3rem] font-normal text-[#111111] tracking-[0.04em]"
            style={{ fontFamily: 'var(--font-fraunces)', lineHeight: '1.45', letterSpacing: '0.04em' }}
          >
            {words.map((word, i) => {
              const start = i / words.length
              const end = Math.min((i + 1.5) / words.length, 1)
              return (
                <Word key={i} progress={scrollYProgress} range={[start, end]}>
                  {word}
                </Word>
              )
            })}
          </p>

          {/* CTA — appears at the end */}
          <MagneticElement>
          <motion.a
            href="https://www.linkedin.com/in/hanna-he-ba9a95176/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-14 group inline-flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-[#111111] border border-black/20 px-6 py-4 hover:bg-[#111111] hover:text-[#f6f7f1] transition-colors"
            style={{ opacity: ctaOpacity, y: ctaY }}
          >
            View LinkedIn
            <ArrowUpRight
              size={16}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </motion.a>
          </MagneticElement>

        </div>
      </div>
    </div>
  )
}
