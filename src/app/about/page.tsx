import Image from 'next/image';
import { Award, Compass, ShieldCheck, Users } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp';
import BackToTop from '@/components/ui/BackToTop';
import CursorGlow from '@/components/ui/CursorGlow';
import { contactInfo, teamMembers } from '@/lib/data';

const values = [
  {
    title: 'Curated Routes',
    description: 'Every itinerary is planned around comfort, safety, views, and group energy.',
    icon: Compass,
  },
  {
    title: 'Trusted Support',
    description: 'From enquiry to return, travelers get clear communication and reliable help.',
    icon: ShieldCheck,
  },
  {
    title: 'Young Travel Community',
    description: 'We design trips for people who want stories, friendships, and smooth adventures.',
    icon: Users,
  },
  {
    title: 'Experience First',
    description: 'The focus stays on memorable stays, practical planning, and real destination value.',
    icon: Award,
  },
];

export default function AboutPage() {
  return (
    <>
      <CursorGlow />
      <Navbar />

      <main className="page-land pt-24 md:pt-28">
        <section className="relative overflow-hidden bg-secondary text-white">
          <div className="absolute inset-0 opacity-25">
            <Image src="/images/hero.png" alt="" fill className="object-cover" priority />
          </div>
          <div className="absolute inset-0 bg-secondary/82" />
          <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-[1.05fr_0.95fr] md:px-6 md:py-20 lg:px-8">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-blue-100">About Ready Go Trips</p>
              <h1 className="font-heading text-4xl font-bold leading-tight md:text-7xl">
                Built For Better Group Travel.
              </h1>
              <p className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-blue-50/88">
                Ready Go Trips creates handpicked travel experiences across India with thoughtful planning,
                comfortable stays, trusted coordination, and a team that understands what young travelers expect.
              </p>
            </div>
            <div className="rounded-[32px] border border-white/25 bg-white/12 p-5 shadow-2xl shadow-blue-950/30 backdrop-blur-xl">
              <Image
                src="/images/gallery-1.png"
                alt="Ready Go Trips travelers"
                width={720}
                height={520}
                className="h-[230px] md:h-[340px] w-full rounded-[24px] object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 md:px-6 py-10 md:py-16 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="rounded-3xl border border-secondary/10 bg-white p-5 md:p-6 shadow-xl shadow-blue-950/6">
                  <div className="mb-4 md:mb-5 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                    <Icon className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <h2 className="font-heading text-xl md:text-2xl font-bold text-secondary">{value.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{value.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 md:px-6 pb-12 md:pb-20 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">Our Team</p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-secondary md:text-5xl">Meet The People Behind The Trips</h2>
          </div>

          <div className="mx-auto grid max-w-5xl gap-4 md:gap-6 lg:grid-cols-2">
            {teamMembers.map((member) => (
              <article key={member.id} className="grid grid-cols-[104px_1fr] overflow-hidden rounded-[20px] border border-secondary/10 bg-white shadow-lg shadow-blue-950/8 sm:grid-cols-[150px_1fr] md:rounded-[24px] md:shadow-2xl">
                <div className="relative h-full min-h-[172px] bg-blue-50 sm:min-h-[210px]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 104px, 150px"
                    quality={95}
                  />
                </div>
                <div className="p-4 sm:p-5 md:p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-accent sm:text-xs md:text-sm md:tracking-[0.16em]">{member.role}</p>
                  <h3 className="mt-1.5 font-heading text-xl font-bold leading-tight text-secondary sm:text-2xl md:text-3xl">{member.name}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm md:mt-4 md:text-base">{member.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp phone={contactInfo.whatsapp} />
      <BackToTop />
    </>
  );
}
