'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface StaggerChildrenProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export default function StaggerChildren({ children, staggerDelay = 0.1, className }: StaggerChildrenProps) {
  const containerVariant = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const childVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
  };

  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={className}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={childVariant}>{child}</motion.div>
      ))}
    </motion.div>
  );
}
