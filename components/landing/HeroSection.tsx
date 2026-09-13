'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingDown,
  Activity,
  CheckCircle2,
  Sliders,
  Play,
  Layers,
  Database,
  Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatIDR } from '@/lib/utils';

export const HeroSection: React.FC = () => {
  // Interactive mini simulator state in hero
  const [los, setLos] = useState(5);
  const baselineCost = 8420000;
  const baselineLos = 7;

  // Real-time calculation based on counterfactual model logic
  const daysSaved = baselineLos - los;
  const simulatedCost = Math.round(baselineCost - daysSaved * 755000);
  const diffCost = simulatedCost - baselineCost;
  const pctSavings = Math.round((diffCost / baselineCost) * 1000) / 10;
  const confidence = Math.min(94, Math.max(78, 84 + (7 - los) * 2));

  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
      {/* Apple-style ambient gradient glow backgrounds */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#0071E3]/12 via-[#30B0C7]/8 to-transparent blur-3xl -z-10 pointer-events-none rounded-full" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-[#34C759]/10 blur-2xl -z-10 pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-black/[0.08] shadow-2xs hover:border-[#0071E3]/30 transition-all cursor-default">
            <span className="flex h-2 w-2 rounded-full bg-[#0071E3] animate-pulse" />
            <span className="text-xs font-semibold text-[#1D1D1F] font-heading">
              Platform Decision Intelligence JKN Pertama di Indonesia
            </span>
            <span className="text-[#86868B] text-xs">|</span>
            <span className="text-xs font-medium text-[#0071E3]">Causal AI Engine v1.0</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1D1D1F] font-heading leading-[1.15]">
            Simulate. Predict. Prevent.{' '}
            <span className="block bg-gradient-to-r from-[#0071E3] via-[#30B0C7] to-[#34C759] bg-clip-text text-transparent mt-1 sm:mt-2">
              Tata Kelola Klaim Berbasis Kausal.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-[#6E6E73] font-normal leading-relaxed max-w-2xl mx-auto">
            Tinggalkan analisis retrospektif yang hanya mencatat masa lalu. <strong>JKN PREVIA</strong> memampukan analis dan perumus kebijakan mensimulasikan intervensi pelayanan (<em>What-If Analysis</em>), mengungkap pemicu biaya tersembunyi, dan menjaga mutu tanpa risiko.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto text-sm sm:text-base font-semibold shadow-md hover:shadow-xl transition-all group"
                icon={<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              >
                Eksplorasi Dashboard Analitik
              </Button>
            </Link>

            <Link href="/episodes/1024/simulate" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-sm sm:text-base font-semibold bg-white/80 hover:bg-white border-black/[0.08] shadow-xs"
                icon={<Sparkles className="w-4 h-4 text-[#0071E3]" />}
              >
                Coba Demo Simulasi (#84291)
              </Button>
            </Link>
          </div>

          {/* Guardrail micro statement */}
          <div className="pt-1 flex items-center justify-center gap-1.5 text-[11px] text-[#86868B]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#34C759]" />
            <span>100% Data Sintetis Anonim • Patuh Standar Tata Kelola AI Manajerial (Non-Klinis)</span>
          </div>
        </div>

        {/* Interactive Live Counterfactual Preview Card (WOW Element) */}
        <div id="simulator" className="mt-12 sm:mt-16 max-w-4xl mx-auto">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-5 sm:p-8 border border-black/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.06)] relative overflow-hidden">
            {/* Header of Interactive Card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-black/[0.06] gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0071E3]/15 to-[#30B0C7]/15 flex items-center justify-center text-[#0071E3]">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm sm:text-base text-[#1D1D1F] font-heading">
                      Simulasi Interaktif Langsung
                    </span>
                    <Badge variant="simulation" size="sm">
                      Kasus Kardiovaskular #84291
                    </Badge>
                  </div>
                  <p className="text-xs text-[#86868B] mt-0.5">
                    Geser slider durasi rawat (LOS) untuk melihat kalkulasi counterfactual real-time
                  </p>
                </div>
              </div>

              <Link href="/episodes/1024/simulate">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0071E3] hover:underline">
                  Buka Engine Lengkap <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </div>

            {/* Main Interactive Controls & Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6">
              {/* Left Column: Interactive Slider Control */}
              <div className="md:col-span-5 space-y-5 bg-[#F5F5F7] p-5 rounded-2xl border border-black/[0.04]">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-[#1D1D1F]">
                      Durasi Rawat Inap (LOS)
                    </span>
                    <span className="text-xs font-bold font-mono text-[#0071E3] bg-[#0071E3]/10 px-2 py-0.5 rounded-full">
                      {los} Hari
                    </span>
                  </div>

                  <input
                    type="range"
                    min="3"
                    max="7"
                    step="1"
                    value={los}
                    onChange={(e) => setLos(Number(e.target.value))}
                    className="w-full h-2 bg-[#E5E5EA] rounded-lg appearance-none cursor-pointer accent-[#0071E3]"
                  />

                  <div className="flex justify-between text-[10px] text-[#86868B] mt-1 font-mono">
                    <span>3 Hari (Min)</span>
                    <span className="font-semibold text-[#1D1D1F]">Baseline: 7 Hari</span>
                  </div>
                </div>

                {/* Patient Case Snapshot */}
                <div className="text-xs space-y-2 pt-2 border-t border-black/[0.06]">
                  <div className="flex justify-between text-[#6E6E73]">
                    <span>Diagnosis Utama:</span>
                    <span className="font-semibold text-[#1D1D1F]">I25.1 (PJK Stabil)</span>
                  </div>
                  <div className="flex justify-between text-[#6E6E73]">
                    <span>Fasilitas Rawat:</span>
                    <span className="font-medium text-[#1D1D1F]">RSUP Dr. Sardjito (Kelas A)</span>
                  </div>
                  <div className="flex justify-between text-[#6E6E73]">
                    <span>Skor Risiko Klinis:</span>
                    <span className="font-bold text-[#FF9500]">82 / 100 (Tinggi)</span>
                  </div>
                </div>

                {/* 5-Stage Pipeline Indicator */}
                <div className="pt-2">
                  <span className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider block mb-1.5">
                    Pipeline Causal Modeling:
                  </span>
                  <div className="grid grid-cols-5 gap-1">
                    {['Ingest', 'Balance', 'Graph', 'Simulate', 'Explain'].map((step, idx) => (
                      <div
                        key={idx}
                        className="text-center py-1 rounded bg-white text-[9px] font-semibold text-[#0071E3] border border-[#0071E3]/20 shadow-2xs"
                      >
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Dynamic Counterfactual Result Projection */}
              <div className="md:col-span-7 flex flex-col justify-between space-y-4">
                <div className="grid grid-cols-2 gap-3.5">
                  {/* Baseline Card */}
                  <div className="bg-[#FBFBFD] p-4 rounded-2xl border border-black/[0.05]">
                    <span className="text-[11px] font-semibold text-[#86868B] uppercase tracking-wider block">
                      Kondisi Aktual (Baseline)
                    </span>
                    <div className="text-lg sm:text-xl font-bold font-mono text-[#1D1D1F] font-heading mt-1">
                      {formatIDR(baselineCost)}
                    </div>
                    <span className="text-[11px] text-[#86868B]">LOS Realisasi 7 Hari</span>
                  </div>

                  {/* Simulated Card */}
                  <div className="bg-gradient-to-br from-[#0071E3]/5 to-[#30B0C7]/5 p-4 rounded-2xl border border-[#0071E3]/20">
                    <span className="text-[11px] font-semibold text-[#0071E3] uppercase tracking-wider block">
                      Proyeksi Skenario (What-If)
                    </span>
                    <div className="text-lg sm:text-xl font-bold font-mono text-[#0071E3] font-heading mt-1">
                      {formatIDR(simulatedCost)}
                    </div>
                    <span className="text-[11px] text-[#0071E3] font-medium">LOS Dioptimalkan {los} Hari</span>
                  </div>
                </div>

                {/* Result Highlight Banner */}
                <div className="bg-gradient-to-r from-[#34C759]/10 via-[#34C759]/5 to-transparent p-4 rounded-2xl border border-[#34C759]/20 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#34C759] text-white flex items-center justify-center shrink-0">
                      <TrendingDown className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#1D1D1F]">
                        Estimasi Selisih Penghematan
                      </div>
                      <div className="text-base sm:text-lg font-bold font-mono text-[#248A3D] font-heading">
                        {formatIDR(diffCost)} ({pctSavings}%)
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-[#86868B] block">Model Confidence</span>
                    <span className="text-xs font-bold text-[#0071E3] font-mono bg-white px-2 py-0.5 rounded-full border border-[#0071E3]/20">
                      {confidence}% Keyakinan
                    </span>
                  </div>
                </div>

                {/* Cost Drivers Breakdown Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-[11px] text-[#6E6E73]">
                    <span>Kontribusi Penghematan Faktor Pelayanan:</span>
                    <span className="font-semibold text-[#1D1D1F]">LOS 42% • Farmasi 31% • Visite 18% • Lab 9%</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#E5E5EA] rounded-full overflow-hidden flex">
                    <div className="h-full bg-[#0071E3]" style={{ width: '42%' }} title="Lama Rawat (LOS)" />
                    <div className="h-full bg-[#34C759]" style={{ width: '31%' }} title="Farmasi" />
                    <div className="h-full bg-[#FF9500]" style={{ width: '18%' }} title="Visite Dokter" />
                    <div className="h-full bg-[#5856D6]" style={{ width: '9%' }} title="Laboratorium" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust & Impact Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-12 pt-8 border-t border-black/[0.06]">
          <div className="text-center p-3 sm:p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-black/[0.04]">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0071E3] font-mono font-heading">
              Rp 14,8 M
            </div>
            <div className="text-xs font-medium text-[#1D1D1F] mt-1">Peluang Efisiensi Terdeteksi</div>
            <div className="text-[11px] text-[#86868B]">Pada klaim rawat inap agregat</div>
          </div>

          <div className="text-center p-3 sm:p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-black/[0.04]">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#34C759] font-mono font-heading">
              84%+
            </div>
            <div className="text-xs font-medium text-[#1D1D1F] mt-1">Model Confidence Index</div>
            <div className="text-[11px] text-[#86868B]">Tingkat keyakinan causal modeling</div>
          </div>

          <div className="text-center p-3 sm:p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-black/[0.04]">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#5856D6] font-mono font-heading">
              5 Tahapan
            </div>
            <div className="text-xs font-medium text-[#1D1D1F] mt-1">Causal Inference Pipeline</div>
            <div className="text-[11px] text-[#86868B]">Mengisolasi bias korelasi</div>
          </div>

          <div className="text-center p-3 sm:p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-black/[0.04]">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#1D1D1F] font-mono font-heading">
              100%
            </div>
            <div className="text-xs font-medium text-[#1D1D1F] mt-1">Data Sintetis Anonim</div>
            <div className="text-[11px] text-[#86868B]">Aman tanpa risiko privasi NIK</div>
          </div>
        </div>
      </div>
    </section>
  );
};
