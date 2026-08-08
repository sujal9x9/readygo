'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import { destinations, featuredDestinations } from '@/lib/data';
import { useCmsData } from '@/lib/sheetCms';
import { formatPrice, cn } from '@/lib/utils';
import SectionHeading from '@/components/ui/SectionHeading';
import TiltCard from '@/components/ui/TiltCard';

const categories = ['All', 'Mountains', 'Beaches', 'Pilgrimage', 'Adventure'];

export default function FeaturedDestinations() {
  const [activeFilter, setActiveFilter] = useState('All');
  const cms = useCmsData({ destinations });
  const destinationData = cms.packages.length ? cms.packages : destinations;
  const featuredData = cms.featuredDestinations.length ? cms.featuredDestinations : featuredDestinations;

  const filteredDestinations = activeFilter === 'All' 
    ? featuredData 
    : destinationData.filter(d => d.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <section id="destinations" className="py-10 md:py-20 max-w-7xl mx-auto px-4 md:px-6">
      <SectionHeading 
        title="Featured Destinations" 
        subtitle="Explore our handpicked destinations across India" 
        align="center"
      />

      <div className="flex gap-2 justify-center mb-8 md:mb-12 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={cn(
              "px-4 py-2 md:px-6 rounded-full text-xs md:text-sm font-medium transition-all",
              activeFilter === cat
                ? "bg-gradient-accent text-white shadow-lg shadow-red-500/15"
                : "bg-white border border-secondary/10 text-muted shadow-sm hover:border-secondary/25 hover:text-secondary"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        <AnimatePresence mode="popLayout">
          {filteredDestinations.map(dest => (
            <motion.div
              key={dest.id}
              layoutId={`dest-${dest.id}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <TiltCard className="h-full">
                <div className="relative group rounded-2xl overflow-hidden bg-card min-h-[330px] md:h-[420px] border border-secondary/10 shadow-lg md:shadow-xl shadow-blue-950/8 hover:border-secondary/20 transition-colors">
                  <div className="relative h-44 md:h-60 overflow-hidden">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent" />
                    
                    <div className="absolute top-3 left-3 glass rounded-full px-2.5 py-1 text-[11px] md:text-xs font-medium text-white shadow-lg backdrop-blur-md">
                      {dest.duration}
                    </div>
                    
                    <div className="absolute top-3 right-3 glass rounded-full px-2.5 py-1 text-[11px] md:text-xs flex items-center gap-1 text-white shadow-lg backdrop-blur-md">
                      <Star className="w-3 h-3 fill-accent text-accent" />
                      {dest.rating}
                    </div>
                  </div>

                  <div className="p-4 md:p-6">
                    <h3 className="font-heading text-xl md:text-2xl font-bold mb-2 text-secondary">{dest.name}</h3>
                    <p className="text-xs md:text-sm text-muted line-clamp-2 mb-4">{dest.description}</p>
                    
                    <div className="flex justify-between items-center mt-auto pt-2">
                      <div>
                        <div className="text-xl md:text-2xl font-bold text-accent">{formatPrice(dest.price)}</div>
                        {dest.originalPrice && (
                          <div className="text-sm text-muted line-through">{formatPrice(dest.originalPrice)}</div>
                        )}
                      </div>
                      <button className="text-xs md:text-sm text-accent hover:underline flex items-center gap-1 font-medium">
                        View Details <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

