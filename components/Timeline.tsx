'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { ArrowLeftRight } from 'lucide-react'

function EntryCounter({ progress }: { progress: MotionValue<number> }) {
  const [index, setIndex] = useState(1)
  const indexMotion = useTransform(progress, [0.08, 0.92], [1, 4])

  useEffect(() => {
    return indexMotion.on('change', (v) => {
      setIndex(Math.min(4, Math.max(1, Math.round(v))))
    })
  }, [indexMotion])

  return (
    <span className="font-mono tabular-nums">
      {String(index).padStart(2, '0')}
      <span className="text-black/25 ml-1">/ 04</span>
    </span>
  )
}

const entries = [
  {
    period: '2019 — 2022',
    title: 'TusStar Incubator, Shanghai',
    description: 'I scouted startups, sourced deals, organised events, and connected founders with the investors and partners they needed. My first lesson in what it really takes to bring an idea to life.',
  },
  {
    period: '2024 — 2025',
    title: 'BBSRC, UK Research and Innovation',
    description: 'I managed national programmes that helped researchers turn their science into real-world impact — bridging the gap between the lab and the market.',
  },
  {
    period: '2025',
    title: 'ESRC, UK Research and Innovation',
    description: 'I led investment management across behavioural research programmes, and won an In-Year Award for excellent programme management.',
  },
  {
    period: 'Present',
    title: 'H2 AI LAB',
    description: 'Founder and CEO of the applied AI company, navigating the use of AI.',
  },
]

export default function Timeline() {
  const targetRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  })

  // We want to translate horizontally.
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-75%"])

  return (
    <>
      <section id="work" className="bg-[#f6f7f1] px-6 py-20 border-y border-black/10 lg:hidden">
        <div className="max-w-xl mx-auto">
          <p className="text-xs tracking-[0.25em] uppercase text-[#888888] mb-4 font-medium">
            {`//`} Work
          </p>
          <h2 className="text-4xl font-bold uppercase text-[#111111] tracking-tighter">
            Timeline
          </h2>
          <div className="mt-10 space-y-8">
            {entries.map((entry, i) => (
              <div key={i} className="border-l border-black/20 pl-5">
                <p className="text-xs tracking-[0.15em] text-[#888888] uppercase mb-3 font-medium">
                  {entry.period}
                </p>
                <h3 className="text-2xl font-bold text-[#111111] mb-4 leading-tight">
                  {entry.title}
                </h3>
                <p className="text-base text-[#555555] leading-7">
                  {entry.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="work-desktop" ref={targetRef} className="relative h-[350vh] bg-[#f6f7f1] z-10 hidden lg:block">
        {/* Pinned container */}
        <div className="sticky top-0 h-screen flex items-center overflow-hidden border-y border-black/10 relative">
          {/* Scroll progress bar */}
          <motion.div
            className="absolute top-0 left-0 h-[2px] bg-[#ADB35B] z-20 origin-left w-full"
            style={{ scaleX: scrollYProgress }}
          />
          {/* Entry counter */}
          <div className="absolute top-6 right-8 text-xs tracking-[0.2em] uppercase text-[#888888] font-medium z-20">
            <EntryCounter progress={scrollYProgress} />
          </div>

          {/* Background Year Watermark */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
            style={{ x: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]) }}
          >
            <div className="text-[25vw] font-bold text-black/[0.03] tracking-tighter whitespace-nowrap">
              WORK HISTORY
            </div>
          </motion.div>

          {/* Horizontal scroll content */}
          <motion.div style={{ x }} className="flex gap-24 px-[5vw] items-center text-left relative z-10">

            <div className="min-w-[40vw] shrink-0 pl-12 lg:pl-32">
              <p className="text-xs tracking-[0.25em] uppercase text-[#888888] mb-4 font-medium">
                {`//`} Work
              </p>
              <h2
                className="text-4xl md:text-7xl font-bold uppercase text-[#111111] leading-tight flex items-center gap-4 tracking-tighter"
              >
                Timeline
              </h2>
              <p className="text-xs text-[#888888] font-medium mt-8 flex items-center gap-2 uppercase tracking-widest">
                <ArrowLeftRight size={14} /> Scroll to explore
              </p>
            </div>

            {entries.map((entry, i) => (
              <div key={i} className="min-w-[75vw] md:min-w-[45vw] shrink-0 border-l border-black/20 pl-16 h-full py-12">
                <p className="text-xs tracking-[0.15em] text-[#888888] uppercase mb-5 font-medium">
                  {entry.period}
                </p>
                <h3 className="text-3xl md:text-5xl font-bold text-[#111111] mb-6 tracking-tight leading-none">
                  {entry.title}
                </h3>
                <p className="text-base md:text-xl text-[#555555] leading-relaxed max-w-xl">
                  {entry.description}
                </p>
              </div>
            ))}

            <div className="min-w-[15vw] shrink-0"></div>

          </motion.div>

        </div>
      </section>
    </>
  )
}
