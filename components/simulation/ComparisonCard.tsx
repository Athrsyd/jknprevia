import React from 'react';
import { Badge } from '../ui/Badge';
import { ArrowDownRight, ArrowUpRight, TrendingDown } from 'lucide-react';
import { formatIDR, formatPercent } from '@/lib/utils';
import { SimulationResultContract } from '@/lib/types';

interface ComparisonCardProps {
  result: SimulationResultContract;
}

export const ComparisonCard: React.FC<ComparisonCardProps> = ({ result }) => {
  const isSaving = result.estimated_difference < 0;
  const confidencePct = Math.round(result.confidence * 100);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all">
      {/* Header Tag */}
      <div className="flex items-center justify-between flex-wrap gap-4 pb-5 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0071E3] font-heading">
              Hasil Analisis
            </span>
            <span className="text-xs text-[#86868B]">•</span>
            <span className="text-xs text-[#86868B] font-medium font-heading">Model {result.model_version}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1D1D1F] font-heading">
            Perbandingan Hasil Simulasi
          </h2>
        </div>

        <div className="flex items-center gap-2.5">
          <Badge variant="success" size="md" dot>
            Keyakinan Model: {confidencePct}%
          </Badge>
        </div>
      </div>

      {/* Hero Metrics 3-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-6 border-b border-black/[0.06]">
        {/* CURRENT */}
        <div className="bg-[#F5F5F7] rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-[#86868B] font-semibold uppercase tracking-wider mb-2 font-heading">
              <span>Kondisi Awal</span>
              <span className="text-xs text-[#1D1D1F] font-medium bg-white px-2 py-0.5 rounded-full shadow-2xs font-heading">
                LOS {result.baseline_los} hari
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1F] mb-1 font-heading">
              {formatIDR(result.baseline_cost, true)}
            </div>
            <div className="text-xs text-[#86868B] font-mono">
              {formatIDR(result.baseline_cost)}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-black/[0.06] text-xs text-[#6E6E73] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#86868B]" />
            <span>Skor Risiko: <strong className="font-heading">{result.baseline_risk_score} / 100</strong></span>
          </div>
        </div>

        {/* WHAT-IF ESTIMATED */}
        <div className="bg-[#0071E3]/[0.04] border-2 border-[#0071E3] rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,113,227,0.08)] flex flex-col justify-between relative">
          <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-[#0071E3] text-white text-[11px] font-bold tracking-wide font-heading">
            Target Skenario
          </div>
          <div>
            <div className="flex items-center justify-between text-xs text-[#0071E3] font-semibold uppercase tracking-wider mb-2 font-heading">
              <span>Hasil Simulasi</span>
              <span className="text-xs text-[#0071E3] font-bold bg-[#0071E3]/10 px-2 py-0.5 rounded-full font-heading">
                LOS {result.estimated_los} hari
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0071E3] mb-1 font-heading">
              {formatIDR(result.estimated_cost, true)}
            </div>
            <div className="text-xs text-[#0071E3]/70 font-mono">
              {formatIDR(result.estimated_cost)}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-[#0071E3]/20 text-xs text-[#0071E3] flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-[#0071E3] animate-pulse" />
            <span>Proyeksi Risiko: <strong className="font-heading">{result.estimated_risk_score} / 100</strong></span>
          </div>
        </div>

        {/* ESTIMATED DIFFERENCE */}
        <div className="bg-[#F5F5F7] rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-[#86868B] font-semibold uppercase tracking-wider mb-2 font-heading">
              <span>Estimasi Efisiensi</span>
              <span className="text-xs font-semibold text-[#248A3D] uppercase font-heading">
                {isSaving ? 'Penghematan' : 'Kenaikan'}
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-1 flex-wrap">
              <div
                className={`text-3xl sm:text-4xl font-bold tracking-tight font-heading ${
                  isSaving ? 'text-[#248A3D]' : 'text-[#B25E00]'
                }`}
              >
                {formatIDR(result.estimated_difference, true)}
              </div>
              <div
                className={`text-lg font-bold flex items-center font-heading ${
                  isSaving ? 'text-[#248A3D]' : 'text-[#B25E00]'
                }`}
              >
                {isSaving ? <ArrowDownRight className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                {formatPercent(result.estimated_difference_pct)}
              </div>
            </div>
            <div className="text-xs text-[#86868B] font-mono">
              {formatIDR(result.estimated_difference)}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-black/[0.06] text-xs text-[#248A3D] flex items-center gap-1.5 font-medium">
            <TrendingDown className="w-4 h-4" />
            <span>Potensi penghematan biaya klaim</span>
          </div>
        </div>
      </div>

      {/* Footer Highlights */}
      <div className="pt-4 flex items-center justify-between flex-wrap gap-4 text-xs text-[#86868B]">
        <div className="flex items-center gap-4 flex-wrap">
          <span>
            Utilisasi: <strong className="text-[#1D1D1F] font-heading">{result.baseline_utilization} → {result.estimated_utilization} layanan</strong>
          </span>
          <span>•</span>
          <span>
            Hari Rawat: <strong className="text-[#1D1D1F] font-heading">{result.baseline_los} hari → {result.estimated_los} hari</strong>
          </span>
        </div>
        <div className="text-[11px] text-[#86868B]">
          Perhitungan deterministik berbasis pola kausalitas klaim BPJS
        </div>
      </div>
    </div>
  );
};
