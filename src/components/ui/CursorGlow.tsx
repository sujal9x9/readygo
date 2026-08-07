'use client';

import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px) and (pointer: fine)');
    let frame = 0;
    let x = -1000;
    let y = -1000;

    const moveGlow = () => {
      frame = 0;
      glowRef.current?.style.setProperty('transform', `translate3d(${x - 140}px, ${y - 140}px, 0)`);
    };

    const updateMousePosition = (event: MouseEvent) => {
      if (!mediaQuery.matches) return;
      x = event.clientX;
      y = event.clientY;

      if (!frame) {
        frame = window.requestAnimationFrame(moveGlow);
      }
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed left-0 top-0 z-[45] hidden h-[280px] w-[280px] rounded-full lg:block"
      style={{
        background: 'radial-gradient(circle, rgba(15, 78, 138, 0.08) 0%, rgba(227, 49, 45, 0.035) 38%, transparent 70%)',
        transform: 'translate3d(-1000px, -1000px, 0)',
        willChange: 'transform',
      }}
    />
  );
}
