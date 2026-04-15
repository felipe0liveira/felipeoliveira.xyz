'use client';

import { useState } from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';

type BaseExtra = { variant?: 'split' | 'shake'; children: React.ReactNode };

type GlitchButtonProps =
  | (Omit<HTMLMotionProps<'button'>, 'children'> & BaseExtra & { as?: 'button' })
  | (Omit<HTMLMotionProps<'a'>, 'children'> & BaseExtra & { as: 'a' });

export default function GlitchButton({ as, className, children, variant = 'split', ...props }: GlitchButtonProps) {
  const [isHovering, setIsHovering] = useState(false);

  const isSplit = variant === 'split';

  const shakeAnimate = isHovering
    ? {
        x: [0, -6, 4, -5, 7, -3, 0] as number[],
        skewX: ['0deg', '-3deg', '2deg', '-2.5deg', '1.5deg', '1deg', '0deg'] as string[],
      }
    : { x: 0, skewX: '0deg' };

  const shakeTransition = isHovering
    ? { duration: 0.4, repeat: Infinity, ease: 'linear' as const }
    : { duration: 0.2, ease: 'easeOut' as const };

  const motionProps = {
    className: `relative overflow-hidden ${isSplit ? 'inline-flex' : 'flex'} ${className ?? ''}`,
    onMouseEnter: () => setIsHovering(true),
    onMouseLeave: () => setIsHovering(false),
    onTouchStart: () => setIsHovering(true),
    onTouchEnd: () => setIsHovering(false),
    ...(!isSplit && {
      animate: shakeAnimate,
      transition: shakeTransition,
    }),
    whileTap: {
      x: [0, -7, 4, -5, 0] as number[],
      skewX: ['0deg', '-3deg', '2deg', '-1.5deg', '0deg'] as string[],
      transition: { duration: 0.18, ease: 'easeInOut' as const },
    },
  };

  const ghostChannels = isSplit ? (
    <>
      {/* Lemon channel */}
      <motion.span
        aria-hidden
        className="absolute inset-0 flex items-center justify-center text-lemon-500 pointer-events-none select-none"
        style={{ mixBlendMode: 'screen' }}
        animate={
          isHovering
            ? { x: [0, -6, 2, -5, 7, -3, 0], y: [0, 4, -6, 3, -5, 6, 0], opacity: [0.8, 1, 0.6, 0.9, 0.7, 1, 0.8] }
            : { x: 0, y: 0, opacity: 0 }
        }
        transition={
          isHovering
            ? { duration: 0.4, repeat: Infinity, ease: 'linear' }
            : { duration: 0.15 }
        }
      >
        {children}
      </motion.span>
      {/* Pink channel */}
      <motion.span
        aria-hidden
        className="absolute inset-0 flex items-center justify-center text-pink-500 pointer-events-none select-none"
        style={{ mixBlendMode: 'screen' }}
        animate={
          isHovering
            ? { x: [0, 7, -3, 5, -6, 2, 0], y: [0, -5, 6, -3, 4, -6, 0], opacity: [0.8, 0.6, 1, 0.7, 0.9, 0.65, 0.8] }
            : { x: 0, y: 0, opacity: 0 }
        }
        transition={
          isHovering
            ? { duration: 0.4, repeat: Infinity, ease: 'linear', delay: 0.08 }
            : { duration: 0.15 }
        }
      >
        {children}
      </motion.span>
    </>
  ) : null;

  const content = isSplit ? (
    <>
      <span className="relative z-10">{children}</span>
      {ghostChannels}
    </>
  ) : (
    children
  );

  if (as === 'a') {
    const { as: _as, variant: _v, ...rest } = props as Omit<HTMLMotionProps<'a'>, 'children'> & { as: 'a'; variant?: string };
    return (
      <motion.a {...rest} {...motionProps}>
        {content}
      </motion.a>
    );
  }

  const { as: _as, variant: _v, ...rest } = props as Omit<HTMLMotionProps<'button'>, 'children'> & { as?: 'button'; variant?: string };
  return (
    <motion.button {...rest} {...motionProps}>
      {content}
    </motion.button>
  );
}
