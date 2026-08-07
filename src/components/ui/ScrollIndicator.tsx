'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
        <div className="w-1.5 h-1.5 bg-accent rounded-full animate-scroll-indicator" />
      </div>
      <span className="text-xs text-blue-50/85">Scroll to explore</span>
    </div>
  );
}
