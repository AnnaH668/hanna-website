'use client'

import React from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { fadeUp } from '@/lib/animations'
import { RadialScrollGallery } from '@/components/ui/portfolio-and-image-gallery'
import { ArrowUpRight } from 'lucide-react'

interface Project {
  id: number
  title: string
  cat: string
  img: string
  status: 'live' | 'building'
  link?: string
}

const projects: Project[] = [
  {
    id: 1,
    title: 'H2 AI Lab — Dementia Safety',
    cat: 'AI / Hardware',
    img: '/h2.jpg',
    status: 'live',
    link: 'https://h2ailab.com',
  },
  {
    id: 2,
    title: 'Pixel — Crochet Tool',
    cat: 'Web App',
    img: '/pixel.jpg',
    status: 'live',
    link: 'https://pixel.h2ailab.com',
  },
  {
    id: 3,
    title: 'Unfold — Café & Bookstore Platform',
    cat: 'Platform',
    img: '/coffee.jpg',
    status: 'building',
  },
  {
    id: 4,
    title: 'Hanna He',
    cat: 'Portfolio',
    img: '/hanna.jpg',
    status: 'live',
  },
]

export default function Projects() {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })

  return (
    <section id="projects" className="min-h-screen overflow-hidden w-full relative z-10">
      <div className="h-[26vh] md:h-[30vh] flex flex-col items-center justify-center space-y-4 pt-16 shrink-0 relative z-20 px-6">
        <motion.div
          ref={ref}
          className="space-y-2 text-center"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <span className="text-[10px] font-bold tracking-widest text-[#888888] uppercase font-medium">
            {`//`} Projects
          </span>
          <h2
            className="text-3xl md:text-5xl font-normal tracking-tighter uppercase text-[#111111]"
          >
            Portfolios
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: 0.5 }}
          className="hidden lg:block animate-bounce text-[#888888] text-xs font-medium uppercase mt-8"
        >
          ( Scroll ↓ )
        </motion.div>
      </div>

      <div className="lg:hidden px-6 pb-20">
        <div className="max-w-xl mx-auto space-y-5">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.link || '#'}
              target={project.link ? "_blank" : "_self"}
              rel={project.link ? "noopener noreferrer" : ""}
              className="group relative block w-full h-[420px] overflow-hidden rounded-xl bg-[#E7E3D3] border border-black/10 shadow-xl"
            >
              <div className="absolute inset-0 overflow-hidden bg-black">
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  sizes="100vw"
                  className="h-full w-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/10 opacity-90" />
              </div>

              <div className="absolute inset-0 flex flex-col justify-between p-5">
                <div className="flex justify-between items-start gap-4">
                  <div className="text-[10px] px-2 py-1 bg-white/10 backdrop-blur-md font-medium text-white/90 border border-white/20 rounded">
                    {project.cat}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
                    <ArrowUpRight size={18} strokeWidth={2} />
                  </div>
                </div>

                <div>
                  <h3 className="text-[1.9rem] font-bold leading-tight text-white">{project.title}</h3>
                  <div className="text-xs text-white/65 font-medium mt-3 uppercase tracking-wider">
                    {project.status === 'live' ? '[+] LIVE' : '[-] BUILDING'}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="hidden lg:block">
        <RadialScrollGallery
          className="!min-h-[70vh]"
          baseRadius={450}
          mobileRadius={250}
          visiblePercentage={50}
          scrollDuration={2500}
        >
          {(hoveredIndex) =>
            projects.map((project, index) => {
              const isActive = hoveredIndex === index;
              return (
                <a
                  key={project.id}
                  href={project.link || '#'}
                  target={project.link ? "_blank" : "_self"}
                  rel={project.link ? "noopener noreferrer" : ""}
                  className="group relative w-[260px] h-[360px] sm:w-[320px] sm:h-[440px] overflow-hidden rounded-xl bg-[#E7E3D3] border border-black/10 shadow-xl block"
                >
                  <div className="absolute inset-0 overflow-hidden bg-black">
                    <Image
                      src={project.img}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 260px, 320px"
                      className={`h-full w-full object-cover transition-transform duration-700 ease-out opacity-80 ${isActive ? 'scale-110 blur-0' : 'scale-100 blur-[2px] grayscale-[50%]'
                        }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10 opacity-90" />
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-between p-6">
                    <div className="flex justify-between items-start">
                      <div className="text-[10px] px-2 py-1 bg-white/10 backdrop-blur-md font-medium text-white/90 border border-white/20 rounded">
                        {project.cat}
                      </div>
                      <div className={`w-10 h-10 rounded-full bg-white text-black flex items-center justify-center transition-all duration-500 ${isActive ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-45'}`}>
                        <ArrowUpRight size={18} strokeWidth={2} />
                      </div>
                    </div>

                    <div className={`transition-transform duration-500 ${isActive ? 'translate-y-0' : 'translate-y-4'}`}>
                      <h3 className="text-2xl font-bold leading-tight text-white">{project.title}</h3>
                      <div className="text-xs text-white/60 font-medium mt-3 uppercase tracking-wider">
                        {project.status === 'live' ? '[+] LIVE' : '[-] BUILDING'}
                      </div>
                      <div className={`h-0.5 bg-white mt-4 transition-all duration-500 ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
                    </div>
                  </div>
                </a>
              );
            })
          }
        </RadialScrollGallery>
      </div>
    </section>
  )
}
