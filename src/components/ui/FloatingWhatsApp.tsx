'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

interface FloatingWhatsAppProps {
  phone: string;
}

export default function FloatingWhatsApp({ phone }: FloatingWhatsAppProps) {
  return (
    <motion.a
      href={`https://wa.me/${phone}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', delay: 1, duration: 0.6 }}
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex items-center justify-center w-11 h-11 md:w-14 md:h-14 bg-[#25D366] rounded-full shadow-lg hover:shadow-[#25D366]/50 transition-shadow"
    >
      <div className="absolute inset-0 rounded-full animate-pulse-ring border-2 border-[#25D366] pointer-events-none" />
      <MessageCircle className="w-5 h-5 md:w-7 md:h-7 text-white" />
    </motion.a>
  );
}
