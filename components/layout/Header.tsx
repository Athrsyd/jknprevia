'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { INITIAL_USERS } from '@/lib/db/fixtures';
import { UserRole } from '@/lib/types';

export const Header: React.FC = () => {
  const [currentUser, setCurrentUser] = useState(INITIAL_USERS[0]);

  const handleRoleChange = (role: UserRole) => {
    const selected = INITIAL_USERS.find((u) => u.role === role) || INITIAL_USERS[0];
    setCurrentUser(selected);
  };

  return (
    <header className="h-14 bg-white/70 backdrop-blur-xl border-b border-black/[0.05] sticky top-0 z-20 px-4 sm:px-6 flex items-center justify-between transition-all">
      {/* Brand Identity / Context (Clean & Minimalist with Official Logo) */}
      <div className="flex items-center gap-2.5">
        <Link href="/" className="flex items-center gap-2.5 group">
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

        <span className="hidden sm:inline text-[#C7C7CC] text-xs font-light">/</span>

        <span className="hidden sm:inline text-xs text-[#86868B] font-medium tracking-tight">
          Simulasi Counterfactual
        </span>
      </div>

      {/* Right Controls: Minimalist Role Selector & User Pill */}
      <div className="flex items-center gap-3">
        {/* Minimalist Role Selector (Clean native pill dropdown) */}
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
    </header>
  );
};
