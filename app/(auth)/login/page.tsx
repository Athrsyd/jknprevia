'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ShieldCheck, ArrowRight, Lock, Mail, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { INITIAL_USERS } from '@/lib/db/fixtures';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('analyst@bpjs-kesehatan.go.id');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = (userEmail: string) => {
    setEmail(userEmail);
    setPassword('password');
    setTimeout(() => {
      handleLogin();
    }, 150);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative selection:bg-[#0071E3]/20">
      {/* Subtle Apple Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-gradient-to-b from-[#0071E3]/8 via-transparent to-transparent pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center px-4 relative z-10">
        {/* Apple Squircle App Icon with Official Logo */}
        <div className="w-16 h-16 rounded-2xl bg-white p-2 shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-black/[0.06] mb-4 hover:scale-105 transition-transform mx-auto flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="JKN PREVIA Logo"
            width={52}
            height={52}
            className="w-full h-full object-contain"
            priority
          />
        </div>

        <div className="flex items-center justify-center gap-2 mb-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F] font-heading">
            JKN PREVIA
          </h1>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-black/[0.05] text-[#6E6E73]">
            1.0
          </span>
        </div>

        <p className="text-xs sm:text-sm font-semibold text-[#0071E3] uppercase tracking-wider">
          Decision Intelligence Platform
        </p>
        <p className="mt-1 text-xs text-[#86868B] max-w-sm mx-auto">
          Simulasi Counterfactual Prediksi dan Pencegahan Risiko Pelayanan Kesehatan JKN
        </p>
      </div>

      <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-md px-4 relative z-10">
        {/* Apple Inset Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.06] shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5 tracking-tight">
                Alamat Email Kedinasan
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#86868B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F5F5F7] rounded-xl text-xs sm:text-sm text-[#1D1D1F] placeholder:text-[#86868B] focus:outline-none focus:ring-2 focus:ring-[#0071E3] focus:bg-white font-medium border border-transparent focus:border-black/[0.08] transition-all"
                  placeholder="analyst@bpjs-kesehatan.go.id"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5 tracking-tight">
                Kata Sandi
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#86868B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F5F5F7] rounded-xl text-xs sm:text-sm text-[#1D1D1F] placeholder:text-[#86868B] focus:outline-none focus:ring-2 focus:ring-[#0071E3] focus:bg-white font-medium border border-transparent focus:border-black/[0.08] transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full mt-2 font-semibold text-sm"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Masuk ke Portal PREVIA
            </Button>
          </form>

          {/* 1-Click Apple Grouped Profile Selector */}
          <div className="mt-7 pt-5 border-t border-black/[0.06]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#86868B]">
                Pilih Profil Demo Cepat:
              </span>
              <span className="text-[10px] font-semibold text-[#0071E3] bg-[#0071E3]/10 px-2 py-0.5 rounded-full">
                1-Klik
              </span>
            </div>

            {/* Apple Inset Grouped List */}
            <div className="bg-[#F5F5F7] rounded-2xl overflow-hidden divide-y divide-black/[0.04]">
              {INITIAL_USERS.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => handleQuickDemoLogin(u.email)}
                  className="w-full flex items-center justify-between p-3 hover:bg-black/[0.03] text-left transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-white border border-black/[0.08] text-[#1D1D1F] flex items-center justify-center font-semibold text-xs shadow-2xs">
                      {u.name
                        .split(' ')
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-[#1D1D1F] text-xs group-hover:text-[#0071E3] transition-colors">
                        {u.name}
                      </div>
                      <div className="text-[11px] text-[#86868B]">{u.organization}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white text-[#6E6E73] border border-black/[0.06]">
                      {u.role.replace('_', ' ')}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#86868B] group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Institutional footer */}
        <div className="mt-6 text-center text-[#86868B] text-xs flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#34C759]" />
          <span>Sistem Resmi Tata Kelola Simulasi Klaim BPJS Kesehatan</span>
        </div>
      </div>
    </div>
  );
}
