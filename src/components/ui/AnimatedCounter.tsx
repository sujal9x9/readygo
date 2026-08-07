'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({ target, suffix = '', duration = 2, className }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const decimals = target % 1 !== 0 ? (target.toString().split('.')[1]?.length || 1) : 0;

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressPercentage = Math.min(progress / (duration * 1000), 1);
      const easeOutQuart = 1 - Math.pow(1 - progressPercentage, 4);

      const current = easeOutQuart * target;
      setCount(decimals > 0 ? parseFloat(current.toFixed(decimals)) : Math.floor(current));

      if (progressPercentage < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target, duration, decimals]);

  return (
    <span ref={ref} className={cn('font-heading text-5xl font-bold text-gradient', className)}>
      {decimals > 0 ? count.toFixed(decimals) : count}
      {suffix}
    </span>
  );
}

