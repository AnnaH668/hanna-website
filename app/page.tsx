'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Narrative from '@/components/Narrative'
import Projects from '@/components/Projects'
import Timeline from '@/components/Timeline'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import LoadingScreen from '@/components/LoadingScreen'

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false)

  return (
    <main>
      {!hasEntered && (
        <LoadingScreen onEnter={() => setHasEntered(true)} />
      )}
      {hasEntered && (
        <>
          <Navbar />
          <Hero />
          <Narrative />
          <Projects />
          <Timeline />
          <Contact />
          <Footer />
        </>
      )}
    </main>
  )
}
