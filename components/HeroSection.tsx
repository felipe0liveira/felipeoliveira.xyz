'use client'

import GlitchImage from '@/components/GlitchImage'
import GlitchButton from '@/components/GlitchButton'

export default function HeroSection() {
  const handleViewProjects = () => {
    // Scroll to projects section
    const projectsSection = document.getElementById('projects')
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleDownloadCV = () => {
    // Download CV
    window.open('https://www.linkedin.com/in/felipe0liveira', '_blank')
  }

  return (
    <section className='relative min-h-screen bg-black text-white overflow-hidden'>
      {/* Grid Background */}
      <div className='absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:40px_40px]'></div>

      {/* Gradient Overlay */}
      <div className='absolute inset-0 bg-linear-to-br from-black via-transparent to-pink-950/20'></div>

      {/* Content */}
      <div className='relative z-10 max-w-7xl mx-auto px-6 py-8'>
        {/* Header Bar */}
        <div className='flex justify-between items-center text-xs md:text-sm font-mono mb-16 border-b border-lemon-500/30 pb-4'>
          <div className='flex items-center gap-4'>
            <span className='text-lemon-500'>felipeoliveira.xyz</span>
            <span className='hidden md:inline text-gray-500'>START</span>
          </div>
          <div className='flex items-center gap-4'>
            <span className='text-gray-500'>
              STATUS: ONLINE_V{process.env.NEXT_PUBLIC_APP_VERSION} [ACTIVE]
            </span>
            <span className='text-lemon-500 text-xl hidden md:inline'>+</span>
          </div>
        </div>

        {/* Main Content */}
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          {/* Left Side - Text Content */}
          <div className='space-y-12'>
            {/* Main Title */}
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight'>
              BUILDING THE FUTURE WITH{' '}
              <span className='text-lemon-500'>INTELLIGENT SYSTEMS</span>
            </h1>

            {/* Three Columns Description */}
            <div className='grid md:grid-cols-3 gap-8 text-sm'>
              <div>
                <p className='text-gray-400 leading-relaxed'>
                  SPECIALIZING IN AUTONOMOUS AI AND FULLSTACK APPLICATIONS.
                </p>
              </div>
              <div>
                <p className='text-gray-400 leading-relaxed'>
                  THE AUTONOMOUS AGENTS FULLSTACK APPLICATIONS.
                </p>
              </div>
              <div>
                <p className='text-gray-400 leading-relaxed'>
                  TRANSFORMING COMPLEX AND PROBLEM INTO PRODUCTION-READY
                  SOLUTIONS.
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className='flex flex-wrap gap-4'>
              <GlitchButton
                onClick={handleViewProjects}
                className='px-8 py-4 bg-lemon-500 text-black font-bold hover:bg-lemon-400 transition-all duration-300 transform hover:scale-105'
              >
                VIEW PROJECTS &gt;&gt;
              </GlitchButton>
              <GlitchButton
                onClick={handleDownloadCV}
                className='px-8 py-4 border-2 border-white text-white font-bold hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105'
              >
                DOWNLOAD CV
              </GlitchButton>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className='relative lg:ml-auto'>
            <div className='relative w-full max-w-md mx-auto lg:mx-0'>
              {/* Glowing Background Effect */}
              <div className='absolute inset-0 bg-pink-500/20 blur-3xl rounded-full'></div>

              {/* Image Container */}
              <div className='relative border-2 border-lemon-500/50 p-1 bg-black/50 backdrop-blur-sm'>
                <GlitchImage
                  src='/images/me.png'
                  alt='Felipe Oliveira - AI Engineer and Fullstack Developer'
                  width={500}
                  height={600}
                  className='w-full h-auto object-cover grayscale'
                  priority
                />
              </div>

              {/* Accent Lines */}
              <div className='absolute -top-4 -right-4 w-20 h-20 border-t-2 border-r-2 border-pink-500'></div>
              <div className='absolute -bottom-4 -left-4 w-20 h-20 border-b-2 border-l-2 border-lemon-500'></div>
            </div>
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div className='mt-20 h-px bg-gradient-to-r from-lemon-500 via-pink-500 to-transparent'></div>
      </div>
    </section>
  )
}
