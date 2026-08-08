'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { contactInfo, navLinks } from '@/lib/data';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true" fill="currentColor">
      <path d="M16.04 3.2A12.67 12.67 0 0 0 5.18 22.39L3.6 28.8l6.56-1.52A12.66 12.66 0 1 0 16.04 3.2Zm0 2.32a10.34 10.34 0 1 1-5.25 19.25l-.42-.25-3.34.77.8-3.23-.28-.45A10.34 10.34 0 0 1 16.04 5.52Zm-4.1 4.95c-.23 0-.6.08-.92.43-.32.35-1.2 1.17-1.2 2.85s1.23 3.3 1.4 3.53c.17.23 2.38 3.8 5.86 5.17 2.9 1.14 3.49.91 4.12.86.63-.06 2.03-.83 2.32-1.63.29-.8.29-1.49.2-1.63-.09-.14-.32-.23-.66-.4-.34-.17-2.03-1-2.35-1.12-.32-.12-.55-.17-.78.17-.23.35-.9 1.12-1.1 1.35-.2.23-.4.26-.74.09-.34-.17-1.44-.53-2.75-1.7-1.02-.91-1.7-2.03-1.9-2.37-.2-.35-.02-.53.15-.7.15-.15.34-.4.52-.6.17-.2.23-.35.34-.58.12-.23.06-.43-.03-.6-.09-.17-.78-1.89-1.07-2.58-.28-.67-.57-.58-.78-.59h-.68Z" />
    </svg>
  );
}

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
            <div className="flex items-center gap-2">
              <a
                href={contactInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-secondary"
                aria-label="Open Instagram"
              >
                <Instagram className="h-4.5 w-4.5" />
              </a>
              <a
                href={`https://wa.me/${contactInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:-translate-y-0.5 hover:bg-[#25D366] hover:text-white"
                aria-label="Open WhatsApp"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
            </div>
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
