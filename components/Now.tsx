'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform, MotionValue } from 'framer-motion'
import Image from 'next/image'

const lines = [
  { text: 'I used to wait until I was ready.', delay: 0 },
  { text: "I'm not sure that moment ever comes.", delay: 0.15 },
  {
    text: "Now I build first and learn on the way. Every project has taught me something I couldn't have learned any other way.",
    delay: 0.3,
  },
  {
    text: "The path only becomes clear once you're walking it.",
    delay: 0.45,
  },
]

function NowLine({
  line,
  index,
  y,
}: {
  line: { text: string; delay: number }
  index: number
  y: MotionValue<number>
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })

  return (
    <motion.div
      ref={ref}
      className={`text-balance leading-relaxed tracking-tight border-l border-black/10 pl-6 ${index === 0 || index === 1
        ? 'text-lg md:text-xl text-[#111111] uppercase font-bold'
        : 'text-sm md:text-base text-[#555555]'
        }`}
      style={{ y }}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: line.delay, ease: 'easeOut' }}
    >
      {line.text}
    </motion.div>
  )
}

export default function Now() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, { once: true, margin: '-5% 0px' })
  const imgInView = useInView(imgRef, { once: true, margin: '-10% 0px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -40])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -20])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -10])

  const yValues = [y1, y2, y3, y1]

  return (
    <section
      ref={sectionRef}
      className="pb-32 pt-32 md:pt-40 px-6 overflow-hidden bg-[#f6f7f1]"
    >
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 relative z-10">
        <div className="md:pr-12">
          <motion.p
            ref={headerRef}
            className="text-xs tracking-[0.25em] uppercase text-[#888888] mb-12 font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            {`//`} Now
          </motion.p>

          <div className="space-y-8">
            {lines.map((line, i) => (
              <NowLine key={i} line={line} index={i} y={yValues[i]} />
            ))}
          </div>

          <motion.div
            className="mt-16 text-xs md:text-sm font-bold text-[#111111] tracking-widest uppercase border border-black/20 p-4 inline-block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            [ BE BRAVE. START BEFORE YOU&apos;RE READY. ]
          </motion.div>
        </div>

        {/* Boat photo — offset slightly down and distinct */}
        <motion.div
          ref={imgRef}
          className="relative w-full aspect-[4/5] object-cover md:mt-24 grayscale mix-blend-multiply border border-black/10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={imgInView ? { opacity: 0.8, scale: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          <Image
            src="/now-boat.jpg"
            fill
            alt="A lone boat on misty water"
            style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
          />
        </motion.div>
      </div>
    </section>
  )
}
