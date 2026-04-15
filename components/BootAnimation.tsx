'use client';

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useAnimate } from 'motion/react';

const BOOT_LINES = [
  { prefix: '>', color: 'text-lemon-500', text: ' Initializing neural networks...' },
  { prefix: '>', color: 'text-pink-500',  text: ' Loading AI modules...' },
  { prefix: '>', color: 'text-lemon-500', text: ' Connecting to GitHub...' },
  { prefix: '●', color: 'text-green-400', text: ' ACCESS GRANTED' },
];

function GlitchTitle() {
  const [scope, animate] = useAnimate();
  const rafRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function burst() {
      if (cancelled) return;
      await animate(scope.current, { x: [-4, 3, -6, 2, 0], skewX: ['-2deg', '3deg', '-1deg', '0deg'] }, { duration: 0.25, ease: 'easeInOut' });
      if (cancelled) return;
      const next = 300 + Math.random() * 600;
      rafRef.current = setTimeout(burst, next);
    }

    rafRef.current = setTimeout(burst, 400);

    return () => {
      cancelled = true;
      if (rafRef.current) clearTimeout(rafRef.current);
    };
  }, [animate, scope]);

  return (
    <div ref={scope} className="relative text-4xl md:text-6xl font-bold mb-8 font-mono select-none" aria-label="SYSTEM_BOOT">
      {/* White base */}
      <span className="relative z-10 text-white">SYSTEM_BOOT</span>
      {/* Lemon channel — shift left */}
      <motion.span
        className="absolute inset-0 text-lemon-500 mix-blend-screen"
        animate={{ x: [0, -3, 1, -2, 0], opacity: [1, 0.7, 1, 0.8, 1] }}
        transition={{ duration: 0.4, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      >
        SYSTEM_BOOT
      </motion.span>
      {/* Pink channel — shift right */}
      <motion.span
        className="absolute inset-0 text-pink-500 mix-blend-screen"
        animate={{ x: [0, 3, -1, 2, 0], opacity: [1, 0.6, 1, 0.7, 1] }}
        transition={{ duration: 0.35, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 0.1 }}
      >
        SYSTEM_BOOT
      </motion.span>
    </div>
  );
}

export default function BootAnimation() {
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    const COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes
    const key = 'lastBootAnimation';
    const last = sessionStorage.getItem(key);
    const shouldSkip = last !== null && Date.now() - Number(last) < COOLDOWN_MS;

    if (shouldSkip) {
      setIsBooting(false);
      return;
    }

    sessionStorage.setItem(key, String(Date.now()));
    const timer = setTimeout(() => setIsBooting(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isBooting && (
        <motion.div
          key="boot"
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1, scaleY: 1 }}
          exit={{ scaleY: 0.02, opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.4, 0, 1, 1] }}
          style={{ transformOrigin: 'center' }}
        >
          {/* Grid background */}
          <motion.div
            className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:40px_40px]"
            animate={{ x: [0, -2, 2, -1, 0], opacity: [0.6, 1, 0.7, 1, 0.6] }}
            transition={{ duration: 0.3, repeat: Infinity, ease: 'linear' }}
          />

          {/* Scanline */}
          <motion.div
            className="absolute w-full h-[3px] bg-gradient-to-b from-transparent via-lemon-500/40 to-transparent pointer-events-none z-20"
            animate={{ y: ['-5%', '105%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
          />

          {/* Noise overlay */}
          <motion.div
            className="absolute inset-0 bg-white/5 pointer-events-none z-10"
            animate={{ opacity: [0.04, 0.10, 0.02, 0.08, 0.01, 0.06] }}
            transition={{ duration: 0.12, repeat: Infinity, ease: 'linear' }}
          />

          {/* Pink tint overlay */}
          <motion.div
            className="absolute inset-0 bg-pink-500/5 pointer-events-none z-10"
            animate={{ opacity: [0.05, 0.12, 0.03, 0.08, 0.05] }}
            transition={{ duration: 0.18, repeat: Infinity, ease: 'linear' }}
            style={{ mixBlendMode: 'screen' }}
          />

          {/* Main content */}
          <div className="relative z-30 font-mono text-center">
            <GlitchTitle />

            <div className="space-y-2 text-sm md:text-base text-left">
              {BOOT_LINES.map((line, i) => (
                <motion.div
                  key={i}
                  className="flex gap-1"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.35, duration: 0.2, ease: 'easeOut' }}
                >
                  <span className={line.color}>{line.prefix}</span>
                  <motion.span
                    className={i === BOOT_LINES.length - 1 ? 'text-green-400 font-bold' : 'text-gray-400'}
                    animate={i === BOOT_LINES.length - 1 ? { opacity: [1, 0.4, 1] } : {}}
                    transition={i === BOOT_LINES.length - 1 ? { duration: 0.8, repeat: Infinity, delay: 1.5 } : {}}
                  >
                    {line.text}
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
