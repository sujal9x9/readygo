'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { destinations } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import SectionHeading from '@/components/ui/SectionHeading';
import FadeUp from '@/components/animations/FadeUp';

export default function PopularTrips() {
  const [showAll, setShowAll] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [slideOffset, setSlideOffset] = useState(0);
  const visibleDestinations = showAll ? destinations : destinations.slice(0, 2);
  const marqueeDestinations = [...visibleDestinations, ...visibleDestinations, ...visibleDestinations];
  const maxOffset = Math.max(0, visibleDestinations.length - 1);

  const moveSlide = (direction: 'left' | 'right') => {
    setIsPaused(true);
    setSlideOffset((current) => {
      if (direction === 'left') return Math.max(0, current - 1);
      return Math.min(maxOffset, current + 1);
    });
  };

  return (
    <section id="packages" className="py-8 md:py-14 overflow-hidden">
      <SectionHeading title="Popular Packages" subtitle="Browse all our curated trip packages" />
      
      <div className="relative mt-6 md:mt-8">
        <div className="absolute right-4 top-[-52px] z-10 flex gap-2 md:right-8">
          <button
            type="button"
            onClick={() => moveSlide('left')}
            aria-label="Previous package"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-secondary/15 bg-white text-secondary shadow-lg shadow-blue-950/10 transition hover:-translate-y-0.5 hover:bg-blue-50 disabled:opacity-40"
            disabled={slideOffset === 0}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => moveSlide('right')}
            aria-label="Next package"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-secondary/15 bg-white text-secondary shadow-lg shadow-blue-950/10 transition hover:-translate-y-0.5 hover:bg-blue-50 disabled:opacity-40"
            disabled={slideOffset === maxOffset}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <div className="overflow-hidden pb-2 group">
          <div
            className={`flex w-max gap-4 [--package-slide-step:251px] sm:[--package-slide-step:272px] md:gap-6 md:[--package-slide-step:344px] ${isPaused ? 'transition-transform duration-500 ease-out' : 'animate-marquee group-hover:[animation-play-state:paused]'}`}
            style={isPaused ? { transform: `translateX(calc(-${slideOffset} * var(--package-slide-step)))` } : undefined}
          >
          {marqueeDestinations.map((destination, index) => (
            <FadeUp
              key={`${destination.id}-${index}`}
              delay={(index % destinations.length) * 0.03}
              className="flex-shrink-0 w-[235px] sm:w-64 md:w-80 relative group/card rounded-2xl overflow-hidden h-[310px] sm:h-[340px] md:h-[430px] bg-card cursor-pointer shadow-md md:shadow-xl shadow-blue-950/10 border border-secondary/10 text-white"
            >
              <div className="absolute inset-0" onClick={() => setIsPaused(true)}>
                <Image 
                  src={destination.image} 
                  alt={destination.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover trip-image-motion transition-transform duration-700 group-hover/card:scale-110"
                  style={{ animationDelay: `${(index % 4) * 0.45}s` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/10" />
                
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6">
                  <div className="inline-flex items-center gap-1 rounded-full border border-white/30 bg-white/18 px-2.5 md:px-3 py-1 text-[11px] md:text-xs text-white backdrop-blur-md mb-2 md:mb-3">
                    <Clock className="w-3 h-3" />
                    <span>{destination.duration}</span>
                  </div>
                  
                  <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold mb-1 text-white drop-shadow-lg line-clamp-2">{destination.name}</h3>
                  
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg sm:text-xl md:text-2xl font-bold text-accent drop-shadow-lg">{formatPrice(destination.price)}</span>
                    {destination.originalPrice && (
                      <span className="text-xs md:text-sm text-white/65 line-through">{formatPrice(destination.originalPrice)}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1 mt-2 text-xs md:text-sm text-white/90">
                    <Star className="w-3.5 h-3.5 md:w-4 md:h-4 fill-accent text-accent" />
                    <span>{destination.rating} ({destination.reviews} reviews)</span>
                  </div>
                  
                  <a href="/contact" className="mt-2.5 md:mt-4 block w-full py-2 md:py-3 bg-gradient-accent rounded-xl text-center text-xs md:text-sm font-semibold text-white hover:opacity-90 transition sm:opacity-0 sm:group-hover/card:opacity-100 sm:translate-y-2 sm:group-hover/card:translate-y-0 transition-all duration-300">
                    Book Now
                  </a>
                </div>
              </div>
            </FadeUp>
          ))}
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => {
              setShowAll((current) => !current);
              setIsPaused(false);
              setSlideOffset(0);
            }}
            className="rounded-full border border-secondary/15 bg-white px-5 py-2.5 text-xs md:text-sm font-bold text-secondary shadow-lg shadow-blue-950/8 transition hover:-translate-y-0.5 hover:bg-blue-50"
          >
            {showAll ? 'Show Less' : 'View All Packages'}
          </button>
        </div>
      </div>
    </section>
  );
}

