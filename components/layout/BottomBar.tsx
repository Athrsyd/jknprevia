'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileSpreadsheet,
  Sparkles,
  BarChart3,
  History,
} from 'lucide-react';

export const BottomBar: React.FC = () => {
  const pathname = usePathname();

  const navTabs = [
    {
      href: '/dashboard',
      label: 'Ringkasan',
      icon: LayoutDashboard,
      active: pathname === '/dashboard' || pathname === '/',
    },
    {
      href: '/episodes',
      label: 'Klaim',
      icon: FileSpreadsheet,
      active: pathname === '/episodes' || (pathname.startsWith('/episodes/') && !pathname.includes('/simulate')),
    },
    {
      href: '/episodes/1024/simulate',
      label: 'Simulasi',
      icon: Sparkles,
      active: pathname.includes('/simulate') || pathname.startsWith('/simulations'),
      isCenter: true,
    },
    {
      href: '/analytics',
      label: 'Analisis',
      icon: BarChart3,
      active: pathname.startsWith('/analytics'),
    },
    {
      href: '/history',
      label: 'Riwayat',
      icon: History,
      active: pathname.startsWith('/history') || pathname.startsWith('/audit'),
    },
  ];

  return (
    <nav
      aria-label="Navigasi Bawah"
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/90 backdrop-blur-2xl border-t border-black/[0.06] shadow-[0_-4px_24px_rgba(0,0,0,0.04)] px-2 pt-1.5 pb-[max(env(safe-area-inset-bottom),0.5rem)] transition-all"
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navTabs.map((tab) => {
          const Icon = tab.icon;

          if (tab.isCenter) {
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="flex flex-col items-center justify-center -mt-3.5 group active:scale-95 transition-transform"
              >
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center p-2 shadow-md transition-all ${
                    tab.active
                      ? 'bg-white shadow-[#0071E3]/25 ring-3 ring-[#0071E3]'
                      : 'bg-white shadow-black/10 ring-3 ring-black/[0.06]'
                  }`}
                >
                  <Image
                    src="/logo.png"
                    alt="Simulasi PREVIA"
                    width={24}
                    height={24}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span
                  className={`text-[10px] font-heading font-semibold mt-1 tracking-tight transition-colors ${
                    tab.active ? 'text-[#0071E3]' : 'text-[#1D1D1F]'
                  }`}
                >
                  {tab.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center py-1 px-2 min-w-[52px] rounded-xl active:scale-95 transition-all ${
                tab.active ? 'text-[#0071E3]' : 'text-[#86868B] hover:text-[#1D1D1F]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-4 h-4 transition-transform ${tab.active ? 'scale-110' : ''}`} />
                {tab.active && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#0071E3]" />
                )}
              </div>
              <span
                className={`text-[10px] font-heading tracking-tight mt-1 transition-all ${
                  tab.active ? 'font-bold' : 'font-medium'
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
