'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { destinations, galleryImages } from '@/lib/data';
import { useCmsData } from '@/lib/sheetCms';
import { cn } from '@/lib/utils';
import SectionHeading from '@/components/ui/SectionHeading';
import FadeUp from '@/components/animations/FadeUp';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const cms = useCmsData({ destinations, galleryImages });
  const galleryData = cms.galleryImages.length ? cms.galleryImages : galleryImages;
  const visibleImages = galleryData.slice(0, 6);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === 'Escape') setSelectedImage(null);
      if (e.key === 'ArrowLeft') {
        setSelectedImage((prev) => (prev === null ? null : (prev - 1 + visibleImages.length) % visibleImages.length));
      }
      if (e.key === 'ArrowRight') {
        setSelectedImage((prev) => (prev === null ? null : (prev + 1) % visibleImages.length));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, visibleImages.length]);

  return (
    <section id="gallery" className="py-10 md:py-16 max-w-7xl mx-auto px-4 md:px-6">
      <SectionHeading title="Travel Gallery" subtitle="Moments captured from our incredible journeys" />
      
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {visibleImages.map((image, index) => (
          <FadeUp key={image.id} delay={index * 0.05} className="break-inside-avoid group">
            <div 
              className={cn(
                "relative rounded-2xl overflow-hidden cursor-pointer mb-4",
                "h-36 sm:h-44 md:h-56"
              )}
              onClick={() => setSelectedImage(index)}
            >
              <Image 
                src={image.src} 
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Eye className="w-8 h-8 text-white" />
              </div>
            </div>
          </FadeUp>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center">
            <div className="absolute inset-0" onClick={() => setSelectedImage(null)} />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative z-10"
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-16 right-0 md:-right-16 w-12 h-12 glass rounded-full flex items-center justify-center text-white hover:bg-white/10 transition z-50"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="relative w-[90vw] h-[80vh] max-w-5xl">
                <Image 
                  src={visibleImages[selectedImage].src} 
                  alt={visibleImages[selectedImage].alt}
                  fill
                  className="object-contain"
                />
              </div>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage((prev) => (prev === null ? null : (prev - 1 + visibleImages.length) % visibleImages.length));
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 glass rounded-full flex items-center justify-center text-white hover:bg-white/10 transition z-50"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage((prev) => (prev === null ? null : (prev + 1) % visibleImages.length));
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 glass rounded-full flex items-center justify-center text-white hover:bg-white/10 transition z-50"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-sm text-muted">
                {selectedImage + 1} / {visibleImages.length}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

