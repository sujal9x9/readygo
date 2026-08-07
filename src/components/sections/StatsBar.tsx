'use client';

import { Users, MapPin, Compass, Star } from 'lucide-react';
import FadeUp from '@/components/animations/FadeUp';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

const statsData = [
  { value: 500, suffix: '+', label: 'Happy Travelers', icon: Users },
  { value: 50, suffix: '+', label: 'Destinations', icon: MapPin },
  { value: 13, suffix: '', label: 'Curated Trips', icon: Compass },
  { value: 4.9, suffix: '/5', label: 'Average Rating', icon: Star },
];

export default function StatsBar() {
  return (
    <div className="py-5 md:py-8 max-w-6xl mx-auto px-4 md:px-6 -mt-6 md:-mt-8 relative z-20">
      <FadeUp>
        <div className="bg-white rounded-2xl border border-secondary/10 p-4 md:p-6 shadow-xl md:shadow-2xl shadow-blue-950/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {statsData.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <stat.icon className="text-accent w-5 h-5 md:w-8 md:h-8 mb-2 md:mb-3" />
                <AnimatedCounter target={stat.value} suffix={stat.suffix} className="text-2xl md:text-4xl text-secondary" />
                <div className="text-xs md:text-sm text-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>
    </div>
  );
}

