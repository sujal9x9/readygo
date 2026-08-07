'use client';

import Image from 'next/image';
import { stats } from '@/lib/data';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import FadeUp from '@/components/animations/FadeUp';

export default function Statistics() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/hero.png" 
          alt="Background" 
          fill 
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-secondary/85" />
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-3 text-white">Our Journey In Numbers</h2>
          <div className="h-0.5 w-14 bg-accent rounded-full mb-4" />
          <p className="text-blue-50/85 text-lg max-w-2xl">Growing stronger with every trip</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
          {stats.map((stat, index) => (
            <FadeUp key={stat.id} delay={index * 0.15} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-accent">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
          <p className="text-blue-50/85 mt-2 text-sm">{stat.label}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

