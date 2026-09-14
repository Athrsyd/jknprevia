'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, ArrowUpRight, Activity } from 'lucide-react';

export const FooterSection: React.FC = () => {
  return (
    <footer className="bg-[#1D1D1F] text-white pt-16 pb-12 border-t border-black/[0.1]">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/[0.08]">
          {/* Brand Identity & Mission (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0">
                <Image
                  src="/logo.png"
                  alt="JKN PREVIA Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-bold text-lg tracking-tight font-heading text-white">
                  JKN PREVIA
                </span>
                <span className="text-[10px] font-semibold ml-2 px-1.5 py-0.2 rounded bg-white/10 text-white/80">
                  1.0
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#A1A1A6] leading-relaxed max-w-sm">
              Platform decision intelligence counterfactual untuk memprediksi, mensimulasikan, dan mencegah inefisiensi biaya pelayanan kesehatan dalam program Jaminan Kesehatan Nasional (BPJS Kesehatan).
            </p>

            <div className="pt-2 flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-[#A1A1A6]">
                <span className="w-2 h-2 rounded-full bg-[#34C759] animate-pulse" />
                <span>Causal Engine Aktif • BPJS Synthetic Sandbox</span>
              </div>
            </div>
          </div>

          {/* Column 1: Fitur & Aplikasi */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/90 font-heading">
              Aplikasi & Dashboard
            </h4>
            <ul className="space-y-2 text-xs text-[#A1A1A6]">
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors flex items-center gap-1">
                  Ringkasan Eksekutif <ArrowUpRight className="w-3 h-3 text-white/40" />
                </Link>
              </li>
              <li>
                <Link href="/episodes" className="hover:text-white transition-colors flex items-center gap-1">
                  Explorer Episode Klaim <ArrowUpRight className="w-3 h-3 text-white/40" />
                </Link>
              </li>
              <li>
                <Link href="/episodes/1024/simulate" className="hover:text-white transition-colors flex items-center gap-1 text-[#0071E3] font-medium">
                  Simulator What-If (#84291) <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="hover:text-white transition-colors flex items-center gap-1">
                  Analisis Dampak Agregat <ArrowUpRight className="w-3 h-3 text-white/40" />
                </Link>
              </li>
              <li>
                <Link href="/history" className="hover:text-white transition-colors flex items-center gap-1">
                  Riwayat Skenario Simpanan <ArrowUpRight className="w-3 h-3 text-white/40" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Metodologi & Kepatuhan */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/90 font-heading">
              Tata Kelola & Kepatuhan
            </h4>
            <ul className="space-y-2 text-xs text-[#A1A1A6]">
              <li>
                <span className="text-white/80">AI Ethical Guardrails</span>
              </li>
              <li>
                <span className="text-white/80">Causal DAG & Do-Calculus</span>
              </li>
              <li>
                <span className="text-white/80">Propensity Score Matching</span>
              </li>
              <li>
                <span className="text-white/80">Anonimisasi Rekam Klaim (UU PDP)</span>
              </li>
              <li>
                <Link href="/audit" className="hover:text-white transition-colors flex items-center gap-1">
                  Jejak Audit Keputusan <ArrowUpRight className="w-3 h-3 text-white/40" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Akses Portal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/90 font-heading">
              Akses Masuk
            </h4>
            <ul className="space-y-2 text-xs text-[#A1A1A6]">
              <li>
                <Link href="/login" className="hover:text-white transition-colors flex items-center gap-1 text-white font-semibold">
                  Login Analis Klaim <ArrowUpRight className="w-3 h-3 text-[#0071E3]" />
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Login Pejabat Kebijakan
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Login Admin TI Faskes
                </Link>
              </li>
              <li className="pt-2">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-[#A1A1A6]">
                  <span className="text-white font-semibold block mb-0.5">Demo Akun 1-Klik:</span>
                  Tersedia di halaman login untuk juri & penguji.
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclaimer & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#86868B]">
          <div className="flex items-center gap-2 text-left">
            <ShieldCheck className="w-4 h-4 text-[#34C759] shrink-0" />
            <span>
              <strong>Disclaimer Resmi:</strong> Seluruh data klaim bersifat probabilistik sintetis untuk evaluasi manajerial efisiensi JKN, bukan diagnosis klinis DPJP.
            </span>
          </div>

          <div className="text-center sm:text-right shrink-0">
            © 2026 JKN PREVIA. Hak Cipta Dilindungi Undang-Undang.
          </div>
        </div>
      </div>
    </footer>
  );
};
