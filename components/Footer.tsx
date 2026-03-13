'use client'

export default function Footer() {
  return (
    <footer className="relative py-8 px-6 border-t border-black bg-[#f6f7f1]">
      {/* Spline cat embed — centered on the top border line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translate(-50%, -100%)',
          width: '180px',
          height: '132px',
          zIndex: 10,
          overflow: 'hidden',
          pointerEvents: 'auto',
        }}
      >
        <iframe
          src="https://my.spline.design/curiouscat-ox3kZTjEPZRqi04NmHdQMVjk-VFk/"
          style={{
            width: '180px',
            height: '150px',
            border: 'none',
            background: '#f6f7f1',
            transform: 'translateY(0)',
          }}
          allow="autoplay"
          loading="lazy"
        />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 font-medium text-xs uppercase tracking-widest text-[#111111]">
        <div className="flex items-center gap-6">
          <p>
            [ © {new Date().getFullYear()} ]
          </p>
          <p className="hidden md:block">
            HANNA HE
          </p>
        </div>

        <a href="#hero" className="hover:text-[#888888] transition-colors border-b border-black hover:border-transparent pb-0.5">
          [ TOP ↑ ]
        </a>
      </div>
    </footer>
  )
}
