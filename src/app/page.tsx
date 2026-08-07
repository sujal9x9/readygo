"use client";

import LoadingScreen from "@/components/layout/LoadingScreen";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import FeaturedDestinations from "@/components/sections/FeaturedDestinations";
import WhyTravelWithUs from "@/components/sections/WhyTravelWithUs";
import PopularTrips from "@/components/sections/PopularTrips";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import Statistics from "@/components/sections/Statistics";
import FAQ from "@/components/sections/FAQ";
import Newsletter from "@/components/sections/Newsletter";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import BackToTop from "@/components/ui/BackToTop";
import CursorGlow from "@/components/ui/CursorGlow";
import { contactInfo } from "@/lib/data";

export default function Home() {

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen />

      {/* Custom Cursor Glow (desktop only) */}
      <CursorGlow />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Section 1: Hero */}
        <Hero />

        {/* Trust Stats Bar */}
        <StatsBar />

        {/* Section 2: Featured Destinations */}
        <FeaturedDestinations />

        {/* Section 3: Why Travel With Us */}
        <WhyTravelWithUs />

        {/* Section 4: Popular Trips Slider */}
        <PopularTrips />

        {/* Section 5: Gallery */}
        <Gallery />

        {/* Section 6: Testimonials Marquee */}
        <Testimonials />

        {/* Section 7: Travel Statistics */}
        <Statistics />

        {/* Section 8: FAQ */}
        <FAQ />

        {/* Section 9: Newsletter CTA */}
        <Newsletter />
      </main>

      {/* Section 10: Footer */}
      <Footer />

      {/* Floating Elements */}
      <FloatingWhatsApp phone={contactInfo.whatsapp} />
      <BackToTop />
    </>
  );
}
