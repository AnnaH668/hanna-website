'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const HEADING = "LET'S CONNECT"
const HEADING_WORDS = HEADING.split(' ')

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [copied, setCopied] = useState(false)
  const email = 'Contact@h2ailab.com'

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
    }
  }, [])

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email).then(() => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
      setCopied(true)
      copyTimerRef.current = setTimeout(() => setCopied(false), 2000)
    }).catch(() => {
      setCopied(false)
    })
  }

  return (
    <section id="contact" className="py-24 md:py-36 px-6 border-t border-black/10 bg-[#f6f7f1]">
      <div className="max-w-6xl mx-auto" ref={ref}>

        {/* Label */}
        <p className="text-xs tracking-[0.25em] uppercase text-[#AAAAAA] mb-8 font-medium">{`//`} Contact</p>

        {/* Large animated heading */}
        <div className="flex flex-wrap gap-x-[0.25em] gap-y-2 mb-16 md:mb-24">
          {HEADING_WORDS.map((word, wordIndex) => {
            const charOffset = HEADING_WORDS
              .slice(0, wordIndex)
              .reduce((count, currentWord) => count + currentWord.length, 0) + wordIndex

            return (
              <span key={word} className="inline-flex whitespace-nowrap">
                {word.split('').map((char, charIndex) => (
                  <motion.span
                    key={`${word}-${charIndex}`}
                    className="text-[13vw] md:text-[10vw] font-bold leading-none tracking-tighter text-[#111111] cursor-default select-none"
                    style={{ display: 'inline-block' }}
                    initial={{ opacity: 0, y: 80 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
                    transition={{ duration: 0.7, delay: (charOffset + charIndex) * 0.04, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -16, color: '#ADB35B', transition: { duration: 0.2 } }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            )
          })}
        </div>

        {/* Contact links */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-black/10 pt-12"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-[#AAAAAA] font-medium mb-4">Email</p>
            <div className="relative inline-block">
              <button
                onClick={handleCopyEmail}
                className="group text-lg md:text-xl font-medium text-black hover:text-[#555555] transition-colors duration-200 flex items-center gap-3"
              >
                <span className="relative">
                  {email}
                  <span className="absolute -bottom-1 left-0 h-px bg-black w-0 group-hover:w-full transition-all duration-300" />
                </span>
                <span className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-200">↗</span>
              </button>
              <AnimatePresence>
                {copied && (
                  <motion.span
                    className="absolute -top-8 left-0 text-xs text-[#888888] font-medium px-2 py-1 bg-black/5 rounded-sm"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    [ COPIED TO CLIPBOARD ]
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-[#AAAAAA] font-medium mb-4">Social</p>
            <a
              href="https://www.linkedin.com/in/hanna-he-ba9a95176/"
              target="_blank"
              rel="noopener noreferrer"
              className="group text-lg md:text-xl font-medium text-black hover:text-[#555555] transition-colors duration-200 flex items-center gap-3 w-fit"
            >
              <span className="relative">
                LinkedIn Profile
                <span className="absolute -bottom-1 left-0 h-px bg-black w-0 group-hover:w-full transition-all duration-300" />
              </span>
              <span className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-200">↗</span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
