'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-secondary flex flex-col items-center justify-center"
        >
          <Image
            src="/images/logo-transparent.png"
            alt="Ready Go Trips"
            width={210}
            height={112}
            priority
            className="mb-7 h-20 w-auto object-contain drop-shadow-xl"
          />
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.22em] text-blue-50/85">
            Loading adventures
          </p>
          <div className="h-1 w-52 bg-white/18 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.05, ease: "easeInOut" }}
              className="h-full bg-gradient-accent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
