'use client';

import Image from 'next/image';
import { Mail, MapPin, Phone } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp';
import BackToTop from '@/components/ui/BackToTop';
import CursorGlow from '@/components/ui/CursorGlow';
import BookingForm from '@/components/sections/BookingForm';
import { contactInfo, destinations, teamMembers } from '@/lib/data';
import { useCmsData } from '@/lib/sheetCms';

export default function ContactPage() {
  const cms = useCmsData({ destinations, teamMembers });
  const teamData = cms.teamMembers.length ? cms.teamMembers : teamMembers;
  const contact = { ...contactInfo, ...cms.contactInfo };

  return (
    <>
      <CursorGlow />
      <Navbar />

      <main className="page-land pt-24 md:pt-28">
        <section className="relative overflow-hidden bg-secondary text-white">
          <div className="absolute inset-0 opacity-20">
            <Image src="/images/ladakh.png" alt="" fill className="object-cover" priority />
          </div>
          <div className="absolute inset-0 bg-secondary/86" />
          <div className="relative mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-20 lg:px-8">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-blue-100">Contact Us</p>
              <h1 className="font-heading text-4xl font-bold leading-tight md:text-7xl">Plan Your Next Trip.</h1>
              <p className="mt-5 text-base md:text-lg leading-relaxed text-blue-50/88">
                Fill the booking form and the Ready Go Trips team will reach out with availability,
                pricing, and itinerary details.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 md:gap-8 px-4 md:px-6 py-10 md:grid-cols-[0.85fr_1.15fr] md:py-16 lg:px-8">
          <aside className="space-y-5">
            <div className="rounded-[24px] md:rounded-[28px] border border-secondary/10 bg-white p-5 md:p-6 shadow-xl shadow-blue-950/8">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-secondary">Get In Touch</h2>
              <p className="mt-3 text-muted">
                Share the basics and the team will help you choose the right route, dates, stays, and budget.
              </p>

              <div className="mt-6 space-y-4">
                <a href={`tel:${contact.phone}`} className="flex items-center gap-3 rounded-2xl bg-blue-50 p-4 text-secondary">
                  <Phone className="h-5 w-5 text-accent" />
                  <span className="font-semibold">{contact.phone}</span>
                </a>
                <a href={`mailto:${contact.email}`} className="flex items-center gap-3 rounded-2xl bg-blue-50 p-4 text-secondary">
                  <Mail className="h-5 w-5 text-accent" />
                  <span className="font-semibold">{contact.email}</span>
                </a>
                <div className="flex items-center gap-3 rounded-2xl bg-blue-50 p-4 text-secondary">
                  <MapPin className="h-5 w-5 text-accent" />
                  <span className="font-semibold">{contact.address}</span>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] md:rounded-[28px] border border-secondary/10 bg-white p-5 md:p-6 shadow-xl shadow-blue-950/8">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-secondary">Team</h2>
              <div className="mt-5 space-y-4">
                {teamData.map((member) => (
                  <div key={member.id} className="flex items-center gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-blue-50">
                      <Image src={member.image} alt={member.name} fill className="object-cover object-center" sizes="64px" quality={95} />
                    </div>
                    <div>
                      <h3 className="font-bold text-secondary">{member.name}</h3>
                      <p className="text-sm text-muted">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <div>
            <BookingForm />
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp phone={contact.whatsapp} />
      <BackToTop />
    </>
  );
}
