'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import GlitchButton from '@/components/GlitchButton'
import { useProjects } from '@/hooks/useProjects'

export default function ProjectsSection() {
  const { projects, loading, error } = useProjects()
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  const activeProject =
    selectedProject !== null
      ? projects.find((p) => p.id === selectedProject)
      : null

  useEffect(() => {
    if (projects.length === 0) return
    projects.forEach((p) => {
      const img = new window.Image()
      img.src = p.image
    })
  }, [projects])

  if (loading) {
    return (
      <section
        className='relative min-h-screen bg-black text-white py-20 overflow-hidden'
        id='projects'
      >
        <div className='relative z-10 max-w-7xl mx-auto px-6'>
          <div className='mb-16 animate-pulse'>
            <div className='h-4 bg-gray-800 rounded w-32 mb-6'></div>
            <div className='h-12 bg-gray-800 rounded w-96 mb-4'></div>
            <div className='h-4 bg-gray-800 rounded w-2/3'></div>
          </div>
          <div className='grid lg:grid-cols-2 gap-8 lg:gap-12'>
            <div className='space-y-4'>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className='w-full p-6 border-2 border-gray-800 animate-pulse'
                >
                  <div className='h-8 bg-gray-800 rounded w-48'></div>
                </div>
              ))}
            </div>
            <div className='border-2 border-gray-800 min-h-[600px] animate-pulse'></div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section
        className='relative min-h-screen bg-black text-white py-20 overflow-hidden'
        id='projects'
      >
        <div className='relative z-10 max-w-7xl mx-auto px-6 text-center'>
          <p className='text-red-600 font-mono'>Error loading projects</p>
        </div>
      </section>
    )
  }

  return (
    <section
      className='relative min-h-screen bg-black text-white py-20 overflow-hidden'
      id='projects'
    >
      {/* Grid Background */}
      <div className='absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:40px_40px]'></div>

      {/* Gradient Overlay */}
      <div className='absolute inset-0 bg-gradient-to-br from-lemon-950/20 via-transparent to-pink-950/20'></div>

      {/* Content */}
      <div className='relative z-10 max-w-7xl mx-auto px-6'>
        {/* Section Header */}
        <div className='mb-16'>
          <div className='flex items-center gap-4 mb-6'>
            <span className='text-pink-500 font-mono text-sm'>
              03. PORTFOLIO
            </span>
            <div className='h-px flex-1 bg-gradient-to-r from-pink-500 to-transparent'></div>
          </div>
          <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6'>
            SELECTED <span className='text-lemon-500'>PROJECTS</span>
          </h2>
          <p className='text-gray-400 max-w-3xl leading-relaxed'>
            A showcase of successful projects delivered for clients across
            different industries, demonstrating expertise in creating scalable,
            modern, and user-friendly web applications.
          </p>
        </div>

        {/* Projects Grid */}
        <div className='grid lg:grid-cols-2 gap-8 lg:gap-12'>
          {/* Left Side - Project Names */}
          <div className='space-y-4'>
            <div className='text-xs text-gray-500 font-mono mb-6'>
              CLICK TO SELECT &gt;&gt;
            </div>
            {projects.map((project, index) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project.id)}
                className={`
                  w-full text-left p-6 border-2 transition-all duration-300 group
                  ${
                    selectedProject === project.id
                      ? project.color === 'lemon'
                        ? 'border-lemon-500 bg-lemon-950/20'
                        : 'border-pink-500 bg-pink-950/20'
                      : 'border-gray-700 bg-transparent hover:border-gray-500'
                  }
                `}
                style={{
                  boxShadow:
                    selectedProject === project.id
                      ? project.color === 'lemon'
                        ? '0 0 40px rgba(195, 255, 0, 0.2)'
                        : '0 0 40px rgba(255, 0, 135, 0.2)'
                      : 'none',
                }}
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-4'>
                    <span className='font-mono text-xs text-gray-600'>
                      [{String(index + 1).padStart(2, '0')}]
                    </span>
                    <h3
                      className={`
                        text-2xl md:text-3xl font-bold transition-colors duration-300
                        ${
                          selectedProject === project.id
                            ? project.color === 'lemon'
                              ? 'text-lemon-500'
                              : 'text-pink-500'
                            : 'text-white group-hover:text-gray-300'
                        }
                      `}
                    >
                      {project.name}
                    </h3>
                  </div>
                  <div className='flex items-center gap-2'>
                    {project.status && (
                      <span className='text-xs text-gray-500 font-mono uppercase'>
                        [{project.status}]
                      </span>
                    )}
                    <span
                      className={`
                        text-xl transition-transform duration-300
                        ${selectedProject === project.id ? 'translate-x-2' : ''}
                      `}
                    >
                      &gt;&gt;
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right Side - Project Preview Card */}
          <div className='relative min-h-[600px] lg:sticky lg:top-20 lg:self-start'>
            <div
              className={`
                relative h-full border-2 backdrop-blur-sm transition-all duration-500
                ${
                  activeProject
                    ? activeProject.color === 'lemon'
                      ? 'border-lemon-500 bg-lemon-950/10'
                      : 'border-pink-500 bg-pink-950/10'
                    : 'border-gray-700 bg-gray-900/20'
                }
              `}
              style={{
                boxShadow: activeProject
                  ? activeProject.color === 'lemon'
                    ? '0 0 60px rgba(195, 255, 0, 0.3)'
                    : '0 0 60px rgba(255, 0, 135, 0.3)'
                  : 'none',
              }}
            >
              {activeProject ? (
                <div className='p-8 h-full flex flex-col'>
                  {/* Project Number */}
                  <div className='flex items-center justify-between mb-6'>
                    <span className='font-mono text-xs text-gray-600'>
                      PROJECT_{String(activeProject.id).padStart(2, '0')}
                    </span>
                    {activeProject.status && (
                      <span
                        className={`
                          text-xs font-mono px-3 py-1 border
                          ${
                            activeProject.color === 'lemon'
                              ? 'border-lemon-500/50 text-lemon-500'
                              : 'border-pink-500/50 text-pink-500'
                          }
                        `}
                      >
                        {activeProject.status.toUpperCase()}
                      </span>
                    )}
                  </div>

                  {/* Project Image */}
                  <div className='relative w-full aspect-video mb-6 border-2 border-gray-700 overflow-hidden'>
                    <Image
                      src={activeProject.image}
                      alt={activeProject.name}
                      fill
                      className='object-cover'
                    />
                  </div>

                  {/* Project Title */}
                  <h3
                    className={`
                      text-3xl md:text-4xl font-bold mb-4
                      ${activeProject.color === 'lemon' ? 'text-lemon-500' : 'text-pink-500'}
                    `}
                  >
                    {activeProject.name}
                  </h3>

                  {/* Project Description */}
                  <p className='text-gray-300 leading-relaxed mb-8 flex-1'>
                    {activeProject.description}
                  </p>

                  {/* Visit Button */}
                  <GlitchButton
                    as='a'
                    href={activeProject.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={`
                      inline-block px-8 py-4 border-2 font-bold text-center transition-all duration-300 transform hover:scale-105
                      ${
                        activeProject.color === 'lemon'
                          ? 'border-lemon-500 text-lemon-500 hover:bg-lemon-500 hover:text-black'
                          : 'border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-black'
                      }
                    `}
                  >
                    VISIT PROJECT &gt;&gt;
                  </GlitchButton>

                  {/* Decorative Corner */}
                  <div
                    className={`
                      absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2
                      ${activeProject.color === 'lemon' ? 'border-lemon-500/50' : 'border-pink-500/50'}
                    `}
                  ></div>
                </div>
              ) : (
                <div className='h-full flex items-center justify-center p-8 text-center'>
                  <div className='space-y-4'>
                    <div className='text-6xl text-gray-700 mb-4'>
                      &lt; / &gt;
                    </div>
                    <p className='text-gray-500 font-mono text-sm'>
                      SELECT A PROJECT TO VIEW DETAILS
                    </p>
                    <div className='flex justify-center gap-2'>
                      <div className='w-2 h-2 bg-lemon-500 rounded-full animate-pulse'></div>
                      <div className='w-2 h-2 bg-pink-500 rounded-full animate-pulse delay-100'></div>
                      <div className='w-2 h-2 bg-lemon-500 rounded-full animate-pulse delay-200'></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div className='mt-20 h-px bg-gradient-to-r from-lemon-500 via-pink-500 to-transparent'></div>
      </div>
    </section>
  )
}
