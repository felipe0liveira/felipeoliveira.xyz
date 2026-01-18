'use client';

import { useState } from 'react';

interface Skill {
  id: number;
  title: string;
  description: string;
  color: 'lemon' | 'pink';
}

const skills: Skill[] = [
  {
    id: 1,
    title: 'AI Engineering',
    description: 'As an AI Engineer, I focus on building intelligent systems and scalable autonomous agents. I have advanced experience using the Google AI SDK for LLM integration and implementing Agent-to-Agent (A2A) communication within the GCP ecosystem, enabling complex workflow orchestration. Additionally, I utilize the Model Context Protocol (MCP Server) for standardized API consumption, ensuring AI models access external data securely and with high context relevance. My work ranges from prompt engineering to architecting solutions that leverage tool use and function calling to expand the cognitive capabilities of applications.',
    color: 'lemon',
  },
  {
    id: 2,
    title: 'Frontend Development',
    description: 'As a Frontend Developer, I have extensive experience in creating intuitive, responsive, and high-performance user interfaces. I\'ve worked with modern technologies such as React, Angular, Next.js, and Vue.js, applying methodologies like Atomic Design to build reusable and consistent component libraries. I also have significant experience in implementing design systems, using tools like Storybook to encapsulate and share components across different teams. My focus is always on continuous improvement of user experience (UX) and optimizing application performance, ensuring that the final products are visually appealing and functional across all devices.',
    color: 'pink',
  },
  {
    id: 3,
    title: 'Backend Development',
    description: 'As a Backend Developer, I have a solid understanding of building scalable and efficient architectures. Using technologies such as Node.js, Python, and Clojure, I\'ve developed robust and secure applications, often integrated with authentication systems like Auth0. I also have experience working with both relational and non-relational databases, including MySQL, MongoDB, and Datomic, as well as handling messaging systems using Kafka. My work on the backend includes creating REST and GraphQL APIs, always focusing on the performance and security of the applications.',
    color: 'lemon',
  },
  {
    id: 4,
    title: 'Fullstack Development',
    description: 'As a Fullstack Developer, I combine my frontend and backend skills to develop complete solutions, from the user interface to the server-side business logic. I am highly proficient in stacks like MEAN (MongoDB, Express, Angular, Node.js) and MERN (MongoDB, Express, React, Node.js), and I\'ve led complex projects from conception to final delivery. My ability to navigate between different layers of the application allows me to understand and optimize the entire data flow, ensuring that all system components work harmoniously.',
    color: 'pink',
  },
  {
    id: 5,
    title: 'Testing and Integration',
    description: 'I am committed to ensuring software quality through rigorous testing. I use tools like Jest, Mocha, and Chai to write unit tests, ensuring that each component and function works as expected in isolation. Additionally, I implement integration tests to validate the interaction between different parts of the application, using Cypress and Selenium to simulate real-use scenarios. My dedication to quality includes creating continuous integration (CI/CD) pipelines that automate test execution with each build, ensuring that the code is always stable and bug-free before being released to production.',
    color: 'lemon',
  },
  {
    id: 6,
    title: 'Cloud Operations & CI/CD',
    description: 'As an Engineer, I design and implement automated pipelines that ensure seamless software delivery across multi-cloud environments. I have extensive experience orchestrating GitHub Actions to automate testing and deployment workflows, alongside configuring Google Cloud Build with specialized Triggers for efficient CI/CD within the GCP ecosystem. My expertise includes managing scalable workloads on AWS and containerizing applications with Docker, focusing on building resilient infrastructure that supports high-frequency releases with maximum stability and security.',
    color: 'pink',
  },
];

export default function SkillsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? skills.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === skills.length - 1 ? 0 : prev + 1));
  };

  const getVisibleSkills = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % skills.length;
      visible.push(skills[index]);
    }
    return visible;
  };

  const visibleSkills = getVisibleSkills();

  return (
    <section className="relative min-h-screen bg-black text-white py-20 overflow-hidden" id="skills">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-950/20 via-transparent to-lemon-950/20"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-lemon-500 font-mono text-sm">02. EXPERTISE</span>
            <div className="h-px flex-1 bg-gradient-to-r from-lemon-500 to-transparent"></div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            TECHNICAL <span className="text-pink-500">SKILLS</span>
          </h2>
          <p className="text-gray-400 max-w-3xl leading-relaxed">
            Throughout my journey as a developer, I've had the opportunity to work across different areas, 
            from frontend to backend, including fullstack integrations and software quality practices. 
            This diversity has allowed me to build a broad perspective, connecting the creation of modern 
            and intuitive interfaces with robust server architectures, while also applying testing 
            methodologies and continuous integration.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-16 md:h-16 border-2 border-lemon-500 bg-black/80 backdrop-blur-sm hover:bg-lemon-500 hover:text-black transition-all duration-300 flex items-center justify-center group -translate-x-4 md:-translate-x-8"
            aria-label="Previous skill"
          >
            <span className="text-2xl font-bold group-hover:scale-110 transition-transform">&lt;</span>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-16 md:h-16 border-2 border-pink-500 bg-black/80 backdrop-blur-sm hover:bg-pink-500 hover:text-black transition-all duration-300 flex items-center justify-center group translate-x-4 md:translate-x-8"
            aria-label="Next skill"
          >
            <span className="text-2xl font-bold group-hover:scale-110 transition-transform">&gt;</span>
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden px-2 md:px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {visibleSkills.map((skill, idx) => (
                <div
                  key={`${skill.id}-${currentIndex}-${idx}`}
                  className={`
                    relative p-6 md:p-8 border-2 backdrop-blur-sm transition-all duration-500 min-h-[400px] flex flex-col
                    ${skill.color === 'lemon' 
                      ? 'border-lemon-500/50 bg-lemon-950/10 hover:border-lemon-500 hover:bg-lemon-950/20' 
                      : 'border-pink-500/50 bg-pink-950/10 hover:border-pink-500 hover:bg-pink-950/20'
                    }
                    hover:shadow-2xl
                    ${idx === 1 ? 'hidden lg:block' : ''}
                    ${idx === 2 ? 'hidden lg:block' : ''}
                  `}
                  style={{
                    boxShadow: skill.color === 'lemon'
                      ? '0 0 30px rgba(195, 255, 0, 0.1)'
                      : '0 0 30px rgba(255, 0, 135, 0.1)',
                  }}
                >
                  {/* Card Number */}
                  <div className="absolute top-4 right-4 font-mono text-xs text-gray-600">
                    [{String(skill.id).padStart(2, '0')}]
                  </div>

                  {/* Title */}
                  <h3
                    className={`
                      text-xl md:text-2xl lg:text-3xl font-bold mb-4 transition-colors duration-300
                      ${skill.color === 'lemon' ? 'text-lemon-500' : 'text-pink-500'}
                    `}
                  >
                    {skill.title}
                  </h3>

                  {/* Description */}
                  <div className="flex-1">
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                      {skill.description}
                    </p>
                  </div>

                  {/* Decorative Corner */}
                  <div
                    className={`
                      absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 transition-colors duration-300
                      ${skill.color === 'lemon' ? 'border-lemon-500/50' : 'border-pink-500/50'}
                    `}
                  ></div>

                  {/* Tech Badge */}
                  <div className="mt-4 flex items-center gap-2">
                    <div
                      className={`
                        h-2 w-2 rounded-full animate-pulse
                        ${skill.color === 'lemon' ? 'bg-lemon-500' : 'bg-pink-500'}
                      `}
                    ></div>
                    <span className="text-xs text-gray-500 font-mono">SKILL_{String(skill.id).padStart(2, '0')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {skills.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`
                  h-1 transition-all duration-300
                  ${idx === currentIndex 
                    ? 'w-12 bg-lemon-500' 
                    : 'w-6 bg-gray-600 hover:bg-gray-500'
                  }
                `}
                aria-label={`Go to skill ${idx + 1}`}
              ></button>
            ))}
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div className="mt-20 h-px bg-gradient-to-r from-pink-500 via-lemon-500 to-transparent"></div>
      </div>
    </section>
  );
}
