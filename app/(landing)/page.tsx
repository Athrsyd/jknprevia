'use client';

import React from 'react';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { AboutSection } from '@/components/landing/AboutSection';
import { ServicesSection } from '@/components/landing/ServicesSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { FooterSection } from '@/components/landing/FooterSection';

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* 0. Sticky Navigation Navbar */}
      <LandingNavbar />

      {/* 1. Hero Section with Interactive Counterfactual Simulator */}
      <HeroSection />

      {/* 2. About Us Section (Latar Belakang & 3 Pilar Kausal) */}
      <AboutSection />

      {/* 3. Our Services Section (4 Solusi Layanan Terintegrasi) */}
      <ServicesSection />

      {/* 4. Testimonials Section (Validasi Pakar & FAQ) */}
      <TestimonialsSection />

      {/* 5. Footer Section */}
      <FooterSection />
    </main>
  );
}
