'use client';

import { Star } from 'lucide-react';
import { testimonials } from '@/lib/data';
import { cn } from '@/lib/utils';
import SectionHeading from '@/components/ui/SectionHeading';
import FadeUp from '@/components/animations/FadeUp';

export default function Testimonials() {
  const row1 = [...testimonials, ...testimonials];

  return (
    <section id="reviews" className="py-10 md:py-16 overflow-hidden">
      <FadeUp>
        <SectionHeading title="What Travelers Say" subtitle="Real stories from real adventurers" />
      </FadeUp>
      
      <div className="mt-8 md:mt-10 relative flex flex-col gap-6 group">
        <div className="mask-fade-edges w-full overflow-hidden">
          <div className="flex gap-4 md:gap-6 animate-marquee w-max group-hover:[animation-play-state:paused]">
            {row1.map((testimonial, i) => (
              <div key={`row1-${i}`} className="flex-shrink-0 w-[260px] sm:w-[330px] glass-card rounded-2xl p-4 md:p-5 text-secondary">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star 
                      key={index} 
                      className={cn(
                        "w-3.5 h-3.5 md:w-4 md:h-4", 
                        index < testimonial.rating ? "fill-accent text-accent" : "text-white/20"
                      )} 
                    />
                  ))}
                </div>
                <p className="text-xs md:text-sm text-muted italic leading-relaxed mb-4 line-clamp-4">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-accent flex items-center justify-center text-xs font-bold text-white">
                    {testimonial.avatar}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm text-secondary">{testimonial.name}</span>
                    <span className="text-xs text-muted">{testimonial.trip}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

