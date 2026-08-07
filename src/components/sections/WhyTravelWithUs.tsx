'use client';

import { Map as MapIcon, ShieldCheck, BadgeIndianRupee, Headphones } from 'lucide-react';
import { features } from '@/lib/data';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import FadeUp from '@/components/animations/FadeUp';

const iconMap: Record<string, any> = {
  Map: MapIcon,
  ShieldCheck: ShieldCheck,
  BadgeIndianRupee: BadgeIndianRupee,
  Headphones: Headphones,
};

export default function WhyTravelWithUs() {
  return (
    <section className="py-10 md:py-20 max-w-6xl mx-auto px-4 md:px-6 relative overflow-hidden">
      <SectionHeading 
        title="Why Travel With Us" 
        subtitle="Experience the difference with Ready Go Trips" 
        align="center"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 relative z-10">
        {features.map((feature, index) => {
          const IconComponent = iconMap[feature.icon] || MapIcon;
          
          return (
            <FadeUp key={feature.id} delay={index * 0.1}>
              <GlassCard hover className="p-5 md:p-8 group relative overflow-hidden h-full">
                <div className="w-11 h-11 md:w-14 md:h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-4 md:mb-6 group-hover:animate-bounce-gentle transition-all shadow-lg shadow-blue-950/5">
                  <IconComponent className="w-5 h-5 md:w-7 md:h-7 text-secondary" />
                </div>
                
                <h3 className="font-heading text-xl md:text-2xl font-bold mb-2 md:mb-3 text-secondary">
                  {feature.title}
                </h3>
                
                <p className="text-sm md:text-base text-muted leading-relaxed">
                  {feature.description}
                </p>

                <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary/5 rounded-tl-full transition-transform group-hover:scale-110" />
              </GlassCard>
            </FadeUp>
          );
        })}
      </div>
    </section>
  );
}

