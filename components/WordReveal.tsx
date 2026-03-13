'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { wordVariant, staggerContainerSlow } from '@/lib/animations'

interface WordRevealProps {
  text: string
  className?: string
  delay?: number
}

export default function WordReveal({ text, className = '', delay = 0 }: WordRevealProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  const words = text.split(' ')

  return (
    <motion.span
      ref={ref}
      className={`inline ${className}`}
      variants={staggerContainerSlow}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      style={{ transitionDelay: `${delay}s` }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariant}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}
