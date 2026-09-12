'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  LayoutDashboard,
  FileSpreadsheet,
  BarChart3,
  History,
  ShieldCheck,
} from 'lucide-react';

interface SidebarProps {
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/',
      label: 'Ringkasan',
      icon: LayoutDashboard,
      active: pathname === '/',
    },
    {
      href: '/episodes',
      label: 'Episode Klaim',
      icon: FileSpreadsheet,
      active: pathname.startsWith('/episodes'),
      badge: '6',
    },
    {
      href: '/analytics',
      label: 'Analisis Dampak',
      icon: BarChart3,
      active: pathname.startsWith('/analytics'),
    },
    {
      href: '/history',
      label: 'Riwayat Skenario',
      icon: History,
      active: pathname.startsWith('/history'),
    },
    {
      href: '/audit',
      label: 'Jejak Audit',
      icon: ShieldCheck,
      active: pathname.startsWith('/audit'),
    },
  ];

  return (
    <aside className="w-60 bg-[#FBFBFD] text-[#1D1D1F] flex flex-col h-screen fixed left-0 top-0 z-30 border-r border-black/[0.05]">
      {/* Brand Header */}
      <div className="h-14 px-5 flex items-center justify-between border-b border-black/[0.04]">
        <Link href="/" className="flex items-center gap-2.5 group" onClick={onCloseMobile}>
          <div className="w-8 h-8 rounded-lg bg-white shadow-2xs border border-black/[0.05] flex items-center justify-center p-1 group-hover:scale-105 transition-transform shrink-0">
            <Image
              src="/logo.png"
              alt="JKN PREVIA Logo"
              width={28}
              height={28}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold tracking-tight text-sm text-[#1D1D1F] font-heading">
              JKN PREVIA
            </span>
            <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-black/[0.04] text-[#86868B]">
              1.0
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation Links (Clean, Spacious, Minimalist) */}
      <div className="flex-1 py-5 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 ${
                item.active
                  ? 'bg-[#0071E3]/10 text-[#0071E3] font-semibold'
                  : 'text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-black/[0.03]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 ${
                    item.active ? 'text-[#0071E3]' : 'text-[#86868B]'
                  }`}
                />
                <span className="font-heading">{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                    item.active
                      ? 'bg-[#0071E3]/20 text-[#0071E3]'
                      : 'bg-black/[0.04] text-[#86868B]'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Clean Minimalist Footer */}
      <div className="p-3.5 px-5 border-t border-black/[0.04]">
        <div className="flex items-center justify-between text-[11px] text-[#86868B]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#34C759]" />
            <span className="font-medium">Engine Aktif</span>
          </div>
          <span className="font-mono text-[10px]">BPJS JKN</span>
        </div>
      </div>
    </aside>
  );
};
