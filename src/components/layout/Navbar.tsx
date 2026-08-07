'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { navLinks, contactInfo } from '@/lib/data';
import { cn } from '@/lib/utils';
import MagneticButton from '@/components/ui/MagneticButton';
import FadeUp from '@/components/animations/FadeUp';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        setScrolled(scrollY > 50);

        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
          setScrollProgress((scrollY / docHeight) * 100);
        }

        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-3 md:top-4 left-0 w-full z-50 px-3 transition-all duration-500",
          scrolled ? "translate-y-0" : "translate-y-0"
        )}
      >
        <div
          className={cn(
            "max-w-6xl mx-auto h-14 md:h-16 px-3 md:px-4 flex items-center justify-between rounded-full border transition-all duration-500",
            scrolled
              ? "bg-secondary/92 border-white/15 text-white shadow-2xl shadow-blue-950/20 backdrop-blur-xl"
              : "bg-secondary/38 border-white/20 text-white backdrop-blur-md"
          )}
        >
          <Link href="/" className="group flex items-center px-1 py-1 transition-transform duration-300 hover:-translate-y-0.5">
            <Image
              src="/images/logo-transparent.png"
              alt="Ready Go Trips"
              width={151}
              height={80}
              priority
              className={cn(
                "h-10 w-auto object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.35)] md:h-11",
                ""
              )}
            />
          </Link>

          <div className={cn("hidden md:flex items-center gap-2 rounded-full p-1", scrolled ? "bg-white/[0.08]" : "bg-white/[0.08]")}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-xs font-semibold transition-all duration-300",
                  "text-white/86 hover:bg-white/12 hover:text-white"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <MagneticButton href="/contact" className="px-5 py-2.5 text-sm shadow-none">
              Book Now
            </MagneticButton>
          </div>

          <button
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-full glass text-white"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <div className="absolute bottom-[-7px] left-1/2 h-[2px] max-w-6xl -translate-x-1/2 overflow-hidden rounded-full bg-white/10 transition-all duration-300" style={{ width: 'calc(100% - 1.5rem)' }}>
          <div className="h-full bg-gradient-accent transition-all duration-300" style={{ width: `${scrollProgress}%` }} />
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-secondary/96 backdrop-blur-xl z-[60] flex flex-col p-6 text-white"
          >
            <div className="flex justify-end">
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-8 h-8 text-white" />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center gap-8">
              {navLinks.map((link, i) => (
                <FadeUp key={link.name} delay={i * 0.1}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-heading text-3xl font-bold hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </FadeUp>
              ))}
            </div>
            <div className="mt-auto text-center pb-8">
              <a href={`tel:${contactInfo.phone}`} className="flex items-center justify-center gap-2 text-accent text-lg">
                <Phone className="w-5 h-5" />
                {contactInfo.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
