'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className, hover = false }: GlassCardProps) {
  if (hover) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={cn('glass-card rounded-2xl hover:border-accent/45 hover:glow-accent transition-all duration-500', className)}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={cn('glass-card rounded-2xl', className)}>
      {children}
    </div>
  );
}
