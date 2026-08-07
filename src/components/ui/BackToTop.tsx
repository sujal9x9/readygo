'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-secondary/15 flex items-center justify-center hover:bg-blue-50 transition-colors glow-secondary"
        >
          <ArrowUp className="w-4 h-4 md:w-5 md:h-5 text-secondary" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
