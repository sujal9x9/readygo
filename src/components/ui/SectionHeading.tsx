'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({
  title,
  subtitle,
  className,
  align = 'center',
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'flex flex-col mb-8 md:mb-10',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className
      )}
    >
      <h2 className="font-heading text-3xl md:text-5xl font-bold mb-3 text-secondary">{title}</h2>
      <div className={cn('h-0.5 w-14 bg-accent rounded-full mb-4', align === 'center' ? 'mx-auto' : '')} />
      {subtitle && <p className="text-muted text-sm md:text-lg max-w-2xl">{subtitle}</p>}
    </motion.div>
  );
}
