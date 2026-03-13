'use client'

import { SpiralAnimation } from "@/components/ui/spiral-animation"
import { useState, useEffect } from 'react'

interface LoadingScreenProps {
    onEnter: () => void;
}

export default function LoadingScreen({ onEnter }: LoadingScreenProps) {
    const [startVisible, setStartVisible] = useState(false)
    const [isLeaving, setIsLeaving] = useState(false)
    const canEnter = startVisible && !isLeaving

    // Fade in the start button after a short delay
    useEffect(() => {
        const heroImage = new Image()
        heroImage.src = '/hero-bg.jpg'

        const timer = setTimeout(() => {
            setStartVisible(true)
        }, 2000)

        return () => {
            clearTimeout(timer)
        }
    }, [])

    const handleEnter = () => {
        if (!canEnter) return
        setIsLeaving(true)
        onEnter()
    }

    return (
        <div className={`fixed inset-0 w-full h-full overflow-hidden bg-[#f6f7f1] z-50 transition-transform duration-1000 ease-[0.22,1,0.36,1] ${isLeaving ? '-translate-y-full pointer-events-none' : 'translate-y-0'}`}>
            {/* Spiral Animation */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${isLeaving ? 'opacity-0' : 'opacity-100'}`}>
                <SpiralAnimation />
            </div>

            {/* Simple Elegant Text Button with Pulsing Effect */}
            <div
                className={`
          absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10
          transition-all duration-1000 ease-out flex flex-col items-center gap-6
          ${canEnter ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}
        `}
            >
                <button
                    onClick={handleEnter}
                    disabled={!canEnter}
                    aria-hidden={!canEnter}
                    className="
            text-[#f6f7f1] text-lg md:text-2xl tracking-[0.2em] md:tracking-[0.4em] uppercase font-medium
            transition-all duration-700 hover:text-white disabled:pointer-events-none
            hover:tracking-[0.5em] animate-pulse
          "
                >
                    Enter
                </button>
            </div>
        </div>
    )
}
