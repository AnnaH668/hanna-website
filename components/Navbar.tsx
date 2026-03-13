'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import MagneticElement from './MagneticElement'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [navVisible, setNavVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  // Show nav once past the hero section
  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById('hero')
      const heroHeight = heroEl ? heroEl.offsetHeight : window.innerHeight
      setNavVisible(window.scrollY > heroHeight * 0.8)
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track active section for link highlight only
  useEffect(() => {
    const sectionIds = ['about', 'projects', 'work', 'contact']
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { threshold: 0.3 }
      )
      observer.observe(el)
      return observer
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 px-8 md:px-12 py-5 flex items-center justify-between transition-all duration-300 ${navVisible && scrolled ? 'bg-[#f6f7f1]/90 backdrop-blur-md border-b border-black/10' : 'bg-transparent border-b border-transparent'
        }`}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`font-medium text-xs tracking-widest uppercase transition-opacity duration-500 ${navVisible ? 'opacity-100' : 'opacity-0'}`}>
        [ Hanna.He ]
      </div>

      <nav
        className={`hidden md:flex items-center gap-10 transition-opacity duration-500 ${navVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
      >
        {navLinks.map(({ label, href }) => {
          const id = href.replace('#', '')
          const isActive = activeSection === id
          return (
            <MagneticElement key={label} strength={0.3}>
              <a
                href={href}
                className="relative text-xs tracking-[0.15em] uppercase font-medium transition-colors duration-300 group"
                style={{ color: isActive ? '#111111' : '#888888' }}
              >
                {isActive ? `[ ${label} ]` : label}
                <span className="absolute -bottom-1 left-0 h-px bg-black w-0 group-hover:w-full transition-all duration-300" />
              </a>
            </MagneticElement>
          )
        })}
      </nav>
    </motion.header>
  )
}
