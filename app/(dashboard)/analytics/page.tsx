'use client';

import React, { useEffect, useState } from 'react';
import {
  BarChart3,
  TrendingDown,
  Building2,
  MapPin,
  Stethoscope,
  FileSpreadsheet,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { MetricCard } from '@/components/simulation/MetricCard';
import { GuardrailBanner } from '@/components/layout/GuardrailBanner';
import { formatIDR } from '@/lib/utils';

interface AnalyticsData {
  total_episodes_analyzed: number;
  total_simulations_conducted: number;
  estimated_aggregate_opportunity: number;
  average_estimated_difference: number;
  by_province: {
    province: string;
    episodes: number;
    total_cost: number;
    simulated_savings: number;
  }[];
  by_provider_type: {
    type: string;
    count: number;
    avg_los: number;
    avg_cost: number;
    saving_potential: string;
  }[];
  by_diagnosis_group: {
    group: string;
    episodes: number;
    baseline_cost: number;
    simulated_cost: number;
    saving_pct: number;
  }[];
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const res = await fetch('/api/v1/analytics');
        const json = await res.json();
        if (json.data) {
          setData(json.data);
        }
      } catch (err) {
        console.error('Failed to load analytics data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadAnalytics();
  }, []);

  if (loading || !data) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-black/[0.05] rounded-2xl w-1/4" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-black/[0.05] rounded-3xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-7">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F]">
            Analisis Dampak Agregat
          </h1>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#0071E3]/10 text-[#0071E3]">
            Tingkat Wilayah & Faskes
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#86868B] mt-1">
          Analisis agregat potensi efisiensi klaim dan dampak kumulatif simulasi di seluruh fasilitas kesehatan JKN.
        </p>
      </div>

      <GuardrailBanner />

      {/* Aggregate Metric Cards (Apple Health / Activity Card style) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard
          label="Total Potensi Efisiensi Agregat"
          value={formatIDR(data.estimated_aggregate_opportunity, true)}
          subtitle="Model-estimated kumulatif"
          delta={{
            value: '-16,8% Rerata Penghematan',
            direction: 'down',
          }}
          icon={<TrendingDown className="w-4 h-4 text-[#34C759]" />}
          variant="simulation"
        />

        <MetricCard
          label="Rerata Efisiensi per Kasus"
          value={formatIDR(Math.abs(data.average_estimated_difference), true)}
          subtitle="Dampak rata-rata intervensi LOS"
          icon={<BarChart3 className="w-4 h-4 text-[#0071E3]" />}
        />

        <MetricCard
          label="Cakupan Episode Dianalisis"
          value={`${data.total_episodes_analyzed} Episode`}
          subtitle={`Meliputi ${data.total_simulations_conducted} skenario intervensi`}
          icon={<FileSpreadsheet className="w-4 h-4 text-[#5856D6]" />}
        />
      </div>

      {/* Breakdown by Province: Apple Inset Grouped Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#0071E3]/10 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-[#0071E3]" />
            </div>
            <div>
              <h3 className="font-bold text-[#1D1D1F] text-base">
                Simulasi Berdasarkan Wilayah / Provinsi
              </h3>
              <p className="text-xs text-[#86868B]">
                Distribusi peluang penghematan per wilayah operasional BPJS
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-xs sm:text-sm text-left whitespace-nowrap">
            <thead>
              <tr className="border-b border-black/[0.06] text-[#86868B] font-semibold">
                <th className="py-3 px-4">Provinsi</th>
                <th className="py-3 px-4 text-center">Jumlah Kasus</th>
                <th className="py-3 px-4 text-right">Total Biaya Realisasi</th>
                <th className="py-3 px-4 text-right">Potensi Efisiensi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04] font-medium">
              {data.by_province.map((p, i) => (
                <tr key={i} className="hover:bg-black/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-[#1D1D1F]">{p.province}</td>
                  <td className="py-3.5 px-4 text-center font-mono text-[#6E6E73]">
                    {p.episodes}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-[#1D1D1F]">
                    {formatIDR(p.total_cost)}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-[#248A3D]">
                    -{formatIDR(p.simulated_savings)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grid: Provider Types & Diagnosis Groups */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Provider Type Breakdown */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-2 pb-4 border-b border-black/[0.06] mb-5">
            <div className="w-8 h-8 rounded-full bg-[#0071E3]/10 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-[#0071E3]" />
            </div>
            <div>
              <h3 className="font-bold text-[#1D1D1F] text-base">
                Analisis per Tingkat Fasilitas Kesehatan
              </h3>
              <p className="text-xs text-[#86868B]">
                Segmentasi efisiensi berdasarkan tipe RS
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {data.by_provider_type.map((t, idx) => (
              <div
                key={idx}
                className="p-4 bg-[#F5F5F7] rounded-2xl border border-black/[0.04] transition-all hover:bg-[#EBEBED]"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-[#1D1D1F] text-xs sm:text-sm">
                    {t.type}
                  </span>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#34C759]/15 text-[#248A3D]">
                    Peluang: {t.saving_potential}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#86868B] pt-1">
                  <span>
                    Rerata Durasi: <strong className="text-[#1D1D1F]">{t.avg_los} hari</strong>
                  </span>
                  <span>
                    Rerata Biaya: <strong className="text-[#1D1D1F]">{formatIDR(t.avg_cost, true)}</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Diagnosis Group Breakdown */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-2 pb-4 border-b border-black/[0.06] mb-5">
            <div className="w-8 h-8 rounded-full bg-[#FF2D55]/10 flex items-center justify-center">
              <Stethoscope className="w-4 h-4 text-[#FF2D55]" />
            </div>
            <div>
              <h3 className="font-bold text-[#1D1D1F] text-base">
                Efisiensi per Kelompok Diagnosa
              </h3>
              <p className="text-xs text-[#86868B]">
                Peluang penghematan pada kelompok penyakit utama
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {data.by_diagnosis_group.map((d, idx) => (
              <div
                key={idx}
                className="p-4 bg-[#F5F5F7] rounded-2xl border border-black/[0.04] transition-all hover:bg-[#EBEBED]"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-[#1D1D1F] text-xs sm:text-sm">
                    {d.group}
                  </span>
                  <span className="font-bold text-[#248A3D] font-mono text-xs">
                    -{d.saving_pct}% Efisiensi
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#86868B] pt-1">
                  <span>Baseline: {formatIDR(d.baseline_cost, true)}</span>
                  <span>
                    Proyeksi: <strong className="text-[#0071E3]">{formatIDR(d.simulated_cost, true)}</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
