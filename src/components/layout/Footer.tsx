'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { contactInfo, navLinks } from '@/lib/data';

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-secondary text-white">
      <div className="absolute inset-0 opacity-[0.18]">
        <Image src="/images/hero.png" alt="" fill className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-secondary/88" />
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6 py-7 md:py-9">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.9fr_1.25fr] md:gap-8">
          <div className="flex flex-col items-start">
            <div className="mb-4">
              <Image
                src="/images/logo-transparent.png"
                alt="Ready Go Trips"
                width={169}
                height={90}
                className="h-11 md:h-14 w-auto object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
              />
            </div>
            <p className="mb-3 max-w-xs text-xs md:text-sm text-blue-50/85">{contactInfo.tagline}</p>
            <a
              href={contactInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-50/80 transition-colors hover:text-white"
              aria-label="Open Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>

          <div>
            <h3 className="mb-3 font-heading text-base font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.slice(0, 5).map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-blue-50/80 transition-colors hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-heading text-base font-semibold">Top Destinations</h3>
            <ul className="space-y-2">
              {['Manali', 'Kedarnath', 'Ladakh'].map((destination) => (
                <li key={destination}>
                  <Link href="#packages" className="text-sm text-blue-50/80 transition-colors hover:text-white">
                    {destination}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-heading text-base font-semibold">Get In Touch</h3>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5 text-sm text-blue-50/80">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                <span>{contactInfo.address}</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-blue-50/80">
                <Phone className="h-4 w-4 shrink-0 text-white" />
                <a href={`tel:${contactInfo.phone}`} className="transition-colors hover:text-white">
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-blue-50/80">
                <Mail className="h-4 w-4 shrink-0 text-white" />
                <a href={`mailto:${contactInfo.email}`} className="transition-colors hover:text-white">
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${contactInfo.whatsapp}`}
                  className="mt-1 inline-flex rounded-full bg-accent px-4 py-2 text-xs md:text-sm font-semibold text-white transition-all hover:bg-white hover:text-secondary"
                >
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-white/15 pt-4 md:flex-row">
          <p className="text-xs text-blue-50/80">&copy; 2026 {contactInfo.brand}. All rights reserved.</p>
          <p className="text-xs text-blue-50/80">Made for adventure</p>
        </div>
      </div>
    </footer>
  );
}
