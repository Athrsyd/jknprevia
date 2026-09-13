'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { INITIAL_USERS } from '@/lib/db/fixtures';
import { UserRole } from '@/lib/types';

export const Header: React.FC = () => {
  const [currentUser, setCurrentUser] = useState(INITIAL_USERS[0]);
  const pathname = usePathname();

  const handleRoleChange = (role: UserRole) => {
    const selected = INITIAL_USERS.find((u) => u.role === role) || INITIAL_USERS[0];
    setCurrentUser(selected);
  };

  const getPageTitle = () => {
    if (pathname.includes('/simulate') || pathname.startsWith('/simulations')) {
      return 'Simulasi Counterfactual';
    }
    if (pathname.startsWith('/episodes')) {
      return 'Episode Klaim & Risiko';
    }
    if (pathname.startsWith('/analytics')) {
      return 'Analisis Dampak & Agregat';
    }
    if (pathname.startsWith('/history')) {
      return 'Riwayat Skenario';
    }
    if (pathname.startsWith('/audit')) {
      return 'Jejak Audit & Kepatuhan';
    }
    return 'Ringkasan Eksekutif';
  };

  return (
    <header className="h-14 bg-white/80 backdrop-blur-xl border-b border-black/[0.05] sticky top-0 z-20 w-full transition-all">
      <div className="h-full max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Context Area */}
        <div className="flex items-center gap-2.5">
          {/* Mobile Only: Brand Logo & Title (since desktop sidebar already has brand header) */}
          <div className="flex lg:hidden items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
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
              <span className="font-bold text-sm tracking-tight text-[#1D1D1F] font-heading">
                JKN PREVIA
              </span>
            </Link>
            <span className="text-[#C7C7CC] text-xs font-light">/</span>
            <span className="text-xs text-[#86868B] font-medium tracking-tight truncate max-w-[140px]">
              {getPageTitle()}
            </span>
          </div>

          {/* Desktop Only: Clean Breadcrumbs & Context Indicator (No duplicate logo) */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-medium text-[#86868B]">
            <Link href="/dashboard" className="text-[#86868B] hover:text-[#1D1D1F] transition-colors">
              Dashboard
            </Link>
            <span className="text-[#C7C7CC] font-light">/</span>
            <span className="text-[#1D1D1F] font-semibold">{getPageTitle()}</span>
            <span className="ml-2.5 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#0071E3]/10 text-[#0071E3] border border-[#0071E3]/15 tracking-tight">
              Decision Intelligence
            </span>
          </div>
        </div>

        {/* Right Controls: Minimalist Role Selector & User Pill */}
        <div className="flex items-center gap-3">
          {/* Minimalist Role Selector */}
          <div className="relative">
            <select
              value={currentUser.role}
              onChange={(e) => handleRoleChange(e.target.value as UserRole)}
              className="appearance-none pl-3 pr-7 py-1.5 bg-[#F5F5F7] hover:bg-[#EBEBED] text-xs font-medium text-[#1D1D1F] rounded-full border border-black/[0.05] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 transition-all font-sans"
              aria-label="Pilih Peran Pengguna"
            >
              <option value="analyst">Analis Klaim</option>
              <option value="policy_officer">Kebijakan (Policy)</option>
              <option value="admin">Admin TI</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#86868B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Minimal User Avatar Pill */}
          <div className="flex items-center gap-2 pl-2 border-l border-black/[0.06]">
            <div className="w-7 h-7 rounded-full bg-[#1D1D1F] text-white flex items-center justify-center font-semibold text-[11px] font-heading shadow-2xs">
              {currentUser.name
                .split(' ')
                .map((n) => n[0])
                .slice(0, 2)
                .join('')}
            </div>
            <span className="hidden md:inline text-xs font-medium text-[#1D1D1F] max-w-[130px] truncate">
              {currentUser.name.split(' ')[0]}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
