'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  Menu,
  X,
  LayoutDashboard,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const LandingNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Tentang Kami', href: '#about' },
    { label: 'Layanan & Fitur', href: '#services' },
    { label: 'Simulasi Interaktif', href: '#simulator' },
    { label: 'Testimoni', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-xl border-b border-black/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.03)] py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-white shadow-xs border border-black/[0.06] flex items-center justify-center p-1.5 group-hover:scale-105 group-hover:shadow-md transition-all shrink-0">
              <Image
                src="/logo.png"
                alt="JKN PREVIA Logo"
                width={32}
                height={32}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold tracking-tight text-base text-[#1D1D1F] font-heading">
                  JKN PREVIA
                </span>
                <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-full bg-[#0071E3]/10 text-[#0071E3] border border-[#0071E3]/20">
                  1.0
                </span>
              </div>
              <span className="text-[10px] font-medium text-[#86868B] tracking-tight -mt-0.5">
                Decision Intelligence Platform
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-black/[0.03] backdrop-blur-md px-3 py-1.5 rounded-full border border-black/[0.04]">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-medium text-[#6E6E73] hover:text-[#0071E3] hover:bg-white/80 px-3 py-1.5 rounded-full transition-all duration-150"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right CTA Actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-xs text-[#6E6E73] hover:text-[#1D1D1F]">
                Masuk
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                variant="primary"
                size="sm"
                className="text-xs font-semibold shadow-sm hover:shadow-md transition-all"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Buka Dashboard
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link href="/dashboard">
              <Button variant="primary" size="sm" className="text-xs px-2.5 py-1.5">
                Dashboard
              </Button>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#1D1D1F] hover:bg-black/[0.05] transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-2xl border-b border-black/[0.08] px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-[#86868B]" />
              </a>
            ))}
          </div>

          <div className="pt-4 mt-3 border-t border-black/[0.06] flex flex-col gap-2">
            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant="primary"
                size="md"
                className="w-full justify-center text-sm font-semibold"
                icon={<LayoutDashboard className="w-4 h-4" />}
              >
                Masuk ke Dashboard
              </Button>
            </Link>
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant="outline"
                size="md"
                className="w-full justify-center text-sm font-medium"
              >
                Login Portal Institusi
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
