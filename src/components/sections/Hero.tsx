'use client';

import Image from 'next/image';
import { Compass, MapPin, Star, Users } from 'lucide-react';
import { contactInfo, destinations } from '@/lib/data';
import { useCmsData } from '@/lib/sheetCms';
import FadeUp from '@/components/animations/FadeUp';
import MagneticButton from '@/components/ui/MagneticButton';
import ScrollIndicator from '@/components/ui/ScrollIndicator';

const heroStats = [
  { label: 'Happy Travelers', value: '500+', icon: Users },
  { label: 'Destinations', value: '50+', icon: MapPin },
  { label: 'Average Rating', value: '4.9/5', icon: Star },
];

export default function Hero() {
  const cms = useCmsData({ destinations });
  const siteInfo = cms.siteInfo;
  const contact = { ...contactInfo, ...cms.contactInfo };

  return (
    <section id="home" className="relative min-h-[560px] overflow-hidden text-white md:min-h-[640px]">
      <div className="absolute inset-0">
        <Image
          src="/images/hero.png"
          alt="Himalayan mountains"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,34,63,0.9)_0%,rgba(10,54,96,0.64)_45%,rgba(6,34,63,0.3)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,34,63,0.28)_0%,rgba(7,42,76,0.08)_58%,#f7fbff_100%)]" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[560px] max-w-7xl items-center gap-8 px-6 pb-14 pt-22 md:min-h-[640px] md:grid-cols-[1.1fr_0.9fr] md:pt-24 lg:px-8">
        <div className="max-w-2xl text-center md:text-left">
          <FadeUp delay={0}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-2xl shadow-black/20 backdrop-blur-xl sm:text-sm">
              <Compass className="h-4 w-4" />
              Curated group trips across India
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl font-medium leading-[0.9] tracking-normal text-white drop-shadow-[0_12px_34px_rgba(0,0,0,0.38)] sm:text-6xl md:text-7xl lg:text-[7.4rem]">
              {siteInfo?.heroHeadingLine1 || 'Travel More.'}<br />
              <span className="relative inline-block pr-2 italic text-accent">
                {siteInfo?.heroHeadingLine2 || 'Explore'}
                <span className="absolute -bottom-2 left-0 h-1 w-full -rotate-2 rounded-full bg-accent" />
              </span>{' '}
              <span className="inline-block">{siteInfo?.heroHeadingLine3 || 'Wilder.'}</span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.4}>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-blue-50/92 sm:text-lg md:mx-0">
              {siteInfo?.heroSubtitle || 'Handpicked routes. Trusted stays. Expert trip captains. We turn every getaway into a story worth retelling.'}
            </p>
          </FadeUp>

          <FadeUp delay={0.6}>
            <div className="mt-7 flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
              <MagneticButton href="#packages" className="rounded-xl px-7 py-3.5">
                {siteInfo?.primaryButtonText || 'Explore Packages'}
              </MagneticButton>
              <a
                href={`https://wa.me/${contact.whatsapp}`}
                className="flex items-center justify-center rounded-xl border border-white/60 bg-white px-7 py-3.5 font-semibold text-secondary shadow-xl shadow-black/15 transition hover:bg-blue-50"
              >
                {siteInfo?.secondaryButtonText || 'View Itineraries'}
              </a>
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={0.35} className="hidden justify-end md:flex">
          <div className="w-full max-w-[240px] space-y-3 rounded-[26px] border border-white/45 bg-white/24 p-3 shadow-2xl shadow-blue-950/30 backdrop-blur-2xl">
            {heroStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-3 rounded-2xl bg-white/18 p-3.5">
                  <Icon className="h-7 w-7 shrink-0 text-white" />
                  <div>
                    <div className="text-2xl font-black text-white">{stat.value}</div>
                    <div className="text-xs font-medium text-blue-50/90">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeUp>
      </div>

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block">
        <ScrollIndicator />
      </div>
    </section>
  );
}
