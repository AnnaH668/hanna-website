'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const W = 460
const H = 580

export default function BookReveal() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const coverRotateY = useTransform(scrollYProgress, [0.08, 0.68], [0, -172])
  const hintOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative bg-[#f6f7f1] border-t border-black/10"
      style={{ height: '280vh' }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">

        {/* Label */}
        <p className="text-xs tracking-[0.25em] uppercase text-[#AAAAAA] mb-8 font-medium">
          {`//`} About
        </p>

        {/* Book */}
        <div style={{ perspective: '1800px', perspectiveOrigin: '50% 50%' }}>
          <div
            style={{
              position: 'relative',
              width: W,
              height: H,
              transformStyle: 'preserve-3d',
              transform: 'rotateX(4deg)',
            }}
          >
            {/* Spine strip */}
            <div
              style={{
                position: 'absolute',
                left: -22,
                top: 0,
                width: 22,
                height: H,
                background: 'linear-gradient(to right, #8a9145, #ADB35B)',
                borderRadius: '3px 0 0 3px',
              }}
            />

            {/* Back cover */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: '#0d0d0d',
                borderRadius: '0 3px 3px 0',
                zIndex: 0,
              }}
            />

            {/* Open book pages */}
            <div
              style={{
                position: 'absolute',
                inset: 2,
                display: 'flex',
                backgroundColor: '#F5F0E8',
                borderRadius: '0 2px 2px 0',
                overflow: 'hidden',
                zIndex: 1,
              }}
            >
              {/* Left page */}
              <div
                style={{
                  flex: 1,
                  borderRight: '1px solid rgba(0,0,0,0.07)',
                  padding: '52px 24px 52px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: 'linear-gradient(to right, #ECE7DD, #F5F0E8)',
                }}
              >
                <div>
                  <div style={{ width: 34, height: 2, backgroundColor: '#ADB35B', marginBottom: 26 }} />
                  <p
                    style={{
                      fontFamily: 'var(--font-playfair)',
                      fontSize: 22,
                      fontStyle: 'italic',
                      color: '#222',
                      lineHeight: 1.65,
                    }}
                  >
                    &quot;Be brave.<br />Be innovative.&quot;
                  </p>
                </div>
                <p style={{ fontSize: 10, color: '#AAAAAA', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'var(--font-dm-sans)' }}>
                  — Motto
                </p>
              </div>

              {/* Right page */}
              <div
                style={{
                  flex: 1,
                  padding: '52px 32px 52px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <p style={{ fontSize: 10, color: '#ADB35B', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 20, fontFamily: 'var(--font-dm-sans)' }}>
                    About
                  </p>
                  <p style={{ fontSize: 16, color: '#333', lineHeight: 1.85, fontFamily: 'var(--font-dm-sans)' }}>
                    I turn ideas into real things. From managing national innovation investments to leading H2 AI LAB, I bridge the gap between research and the market.
                  </p>
                  <div style={{ width: 34, height: 2, backgroundColor: '#ADB35B', marginTop: 24 }} />
                </div>
                <p style={{ fontSize: 10, color: '#AAAAAA', letterSpacing: '0.1em', fontFamily: 'var(--font-dm-sans)' }}>
                  Hanna He
                </p>
              </div>
            </div>

            {/* Front cover */}
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                transformOrigin: 'left center',
                rotateY: coverRotateY,
                transformStyle: 'preserve-3d',
                zIndex: 2,
              }}
            >
              {/* Outer face */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: '#111111',
                  borderRadius: '0 3px 3px 0',
                  backfaceVisibility: 'hidden',
                  padding: '52px 44px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ width: 46, height: 2, backgroundColor: '#ADB35B' }} />
                <div>
                  <p style={{ fontSize: 11, letterSpacing: '0.3em', color: '#ADB35B', textTransform: 'uppercase', marginBottom: 14, fontFamily: 'var(--font-dm-sans)' }}>
                    The Story of
                  </p>
                  <h2
                    style={{
                      fontFamily: 'var(--font-playfair)',
                      fontSize: 58,
                      fontWeight: 400,
                      color: '#f6f7f1',
                      lineHeight: 1.1,
                    }}
                  >
                    Hanna<br />He
                  </h2>
                  <p style={{ fontSize: 11, letterSpacing: '0.2em', color: '#ADB35B', textTransform: 'uppercase', marginTop: 14, fontFamily: 'var(--font-dm-sans)' }}>
                    Founder · H2 AI LAB
                  </p>
                </div>
                <div style={{ width: 40, height: 2, backgroundColor: '#333' }} />
              </div>

              {/* Inner face (back of cover) */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: '#ECE7DD',
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      width: 68,
                      height: 68,
                      border: '1px solid #ADB35B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 14px',
                    }}
                  >
                    <span style={{ fontSize: 18, color: '#ADB35B', letterSpacing: '0.1em', fontFamily: 'var(--font-dm-sans)' }}>H2</span>
                  </div>
                  <p style={{ fontSize: 11, color: '#AAAAAA', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-dm-sans)' }}>AI LAB</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.p
          className="mt-10 text-xs text-[#AAAAAA] tracking-widest uppercase font-medium"
          style={{ opacity: hintOpacity }}
        >
          ↓ scroll to open
        </motion.p>

      </div>
    </section>
  )
}
