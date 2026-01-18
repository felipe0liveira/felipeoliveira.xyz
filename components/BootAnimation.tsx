'use client';

import { useState, useEffect } from 'react';

export default function BootAnimation() {
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBooting(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isBooting) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden">
      {/* Solid Black Background - Never blinks */}
      <div className="absolute inset-0 bg-black"></div>

      {/* Blinking Layer */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{
          animation: 'hardBlink 2s steps(1, end)',
        }}
      >
        {/* Scanline Effect */}
        <div 
          className="absolute w-full h-1 bg-gradient-to-b from-transparent via-lemon-500/30 to-transparent"
          style={{
            animation: 'scanline 2s linear infinite',
          }}
        ></div>

        {/* Grid Background with Glitch */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:40px_40px]"
          style={{
            animation: 'glitch 0.3s infinite',
          }}
        ></div>

        {/* Boot Text */}
        <div className="relative z-10 font-mono text-center space-y-4">
          <div 
            className="text-lemon-500 text-4xl md:text-6xl font-bold mb-8"
            style={{
              animation: 'glitchSkew 0.5s infinite',
            }}
          >
            SYSTEM_BOOT
          </div>

          <div className="space-y-2 text-sm md:text-base text-gray-500">
            <div className="animate-pulse">
              <span className="text-lemon-500">&gt;</span> Initializing neural networks...
            </div>
            <div className="animate-pulse delay-100">
              <span className="text-pink-500">&gt;</span> Loading AI modules...
            </div>
            <div className="animate-pulse delay-200">
              <span className="text-lemon-500">&gt;</span> Connecting to GitHub...
            </div>
            <div className="text-green-500 mt-4">
              <span className="animate-pulse">READY ●</span>
            </div>
          </div>
        </div>

        {/* Glitch Overlay */}
        <div 
          className="absolute inset-0 bg-pink-500/5"
          style={{
            animation: 'glitch 0.2s infinite',
            mixBlendMode: 'screen',
          }}
        ></div>
      </div>
    </div>
  );
}
