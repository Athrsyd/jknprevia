'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FileSpreadsheet,
  TrendingDown,
  AlertTriangle,
  DollarSign,
  ArrowRight,
  Activity,
  Sparkles,
} from 'lucide-react';
import { MetricCard } from '@/components/simulation/MetricCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { GuardrailBanner } from '@/components/layout/GuardrailBanner';
import { DashboardSummary } from '@/lib/types';
import { formatIDR } from '@/lib/utils';

export default function DashboardPage() {
  const [data, setData] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSummary() {
      try {
        const res = await fetch('/api/v1/dashboard/summary');
        const json = await res.json();
        if (json.data) {
          setData(json.data);
        }
      } catch (err) {
        console.error('Failed to load dashboard summary:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSummary();
  }, []);

  if (loading || !data) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 bg-black/[0.05] rounded-2xl w-1/3" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-black/[0.05] rounded-3xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-7">
      {/* Top Section: Apple style header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F] font-heading">
            Ringkasan Eksekutif
          </h1>
          <p className="text-xs sm:text-sm font-normal text-[#86868B] mt-0.5">
            Analisis pelayanan klaim dan proyeksi efisiensi skenario alternatif JKN
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Link href="/episodes/1024/simulate">
            <Button
              variant="simulation"
              size="md"
              icon={<Sparkles className="w-4 h-4" />}
            >
              Simulasi Cepat (#84291)
            </Button>
          </Link>
          <Link href="/episodes">
            <Button variant="outline" size="md">
              Eksplorasi Kasus
            </Button>
          </Link>
        </div>
      </div>

      {/* Guardrail Disclaimer */}
      <GuardrailBanner compact />

      {/* Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Episode Klaim"
          value={data.total_claim_episodes}
          subtitle="Terverifikasi BPJS"
          icon={<FileSpreadsheet className="w-4 h-4 text-[#0071E3]" />}
        />

        <MetricCard
          label="Peluang Efisiensi"
          value={formatIDR(data.estimated_cost_opportunity, true)}
          subtitle="Model counterfactual"
          delta={{
            value: '-17,9% Efisiensi',
            direction: 'down',
          }}
          icon={<TrendingDown className="w-4 h-4 text-[#34C759]" />}
        />

        <MetricCard
          label="Kasus Risiko Tinggi"
          value={data.high_risk_episodes_count}
          subtitle="Prioritas penataan LOS"
          delta={{
            value: 'Tinjauan Dokter',
            direction: 'up',
          }}
          icon={<AlertTriangle className="w-4 h-4 text-[#FF9500]" />}
        />

        <MetricCard
          label="Rata-rata Biaya"
          value={formatIDR(data.average_episode_cost, true)}
          subtitle="Per episode rawat"
          icon={<DollarSign className="w-4 h-4 text-[#5856D6]" />}
        />
      </div>

      {/* Analytics Visualization Grid in Apple Style */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Cost Trend & Counterfactual Opportunity */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-7 border border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] mb-5">
              <div>
                <h3 className="font-bold text-[#1D1D1F] text-base font-heading">
                  Tren Biaya & Peluang Penghematan
                </h3>
                <p className="text-xs font-normal text-[#86868B] mt-0.5">
                  Realisasi historis klaim dibandingkan estimasi skenario alternatif
                </p>
              </div>
              <Badge variant="neutral" size="sm">
                6 Bulan
              </Badge>
            </div>

            {/* Apple style rounded-full progress tracks */}
            <div className="space-y-3.5 pt-1">
              {data.cost_trend.map((item, idx) => {
                const baselineM = item.baseline_cost / 1_000_000;
                const opportunityM = item.simulated_opportunity / 1_000_000;
                const maxVal = 50;

                return (
                  <div key={idx} className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#1D1D1F] w-20 text-xs sm:text-sm font-heading">
                        {item.month}
                      </span>
                      <div className="flex items-center gap-4 text-xs font-normal">
                        <span className="text-[#6E6E73]">
                          Realisasi: <strong className="font-semibold text-[#1D1D1F] font-heading">Rp {baselineM.toFixed(1)} jt</strong>
                        </span>
                        <span className="text-[#248A3D] font-semibold font-heading">
                          Peluang: -Rp {opportunityM.toFixed(1)} jt
                        </span>
                      </div>
                    </div>

                    <div className="w-full bg-[#E5E5EA] rounded-full h-3 flex overflow-hidden">
                      <div
                        className="bg-[#0071E3] h-full rounded-l-full"
                        style={{ width: `${(baselineM / maxVal) * 75}%` }}
                      />
                      <div
                        className="bg-[#34C759] h-full rounded-r-full opacity-90"
                        style={{ width: `${(opportunityM / maxVal) * 75}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-end gap-5 text-xs font-normal text-[#6E6E73] pt-5 border-t border-black/[0.06] mt-5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0071E3]" />
              <span>Biaya Aktual</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#34C759]" />
              <span>Estimasi Penghematan</span>
            </div>
          </div>
        </div>

        {/* Risk Distribution Breakdown */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] mb-5">
              <div>
                <h3 className="font-bold text-[#1D1D1F] text-base font-heading">
                  Distribusi Risiko Kasus
                </h3>
                <p className="text-xs font-normal text-[#86868B] mt-0.5">
                  Klasifikasi keparahan klinis
                </p>
              </div>
              <Activity className="w-4 h-4 text-[#86868B]" />
            </div>

            <div className="space-y-4 pt-1">
              {data.risk_distribution.map((risk, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-normal">
                    <span className="text-[#1D1D1F] flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: risk.color }}
                      />
                      {risk.label}
                    </span>
                    <span className="font-bold text-[#1D1D1F] font-heading">
                      {risk.count} ({risk.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-[#E5E5EA] rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${risk.percentage}%`,
                        backgroundColor: risk.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 bg-[#F5F5F7] rounded-2xl text-xs font-normal text-[#6E6E73] mt-5 leading-relaxed">
            <p className="font-bold text-[#1D1D1F] mb-0.5 font-heading">Wawasan Analitis:</p>
            <p>
              Episode dengan risiko kritis paling berkontribusi terhadap variansi lama hari rawat berlebih.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Simulations Table (Apple Inset Grouped Table with Bold & Regular Balance) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] mb-4">
          <div>
            <h3 className="font-bold text-[#1D1D1F] text-base font-heading">
              Riwayat Simulasi Terbaru
            </h3>
            <p className="text-xs font-normal text-[#86868B] mt-0.5">
              Skenario yang telah diuji coba oleh analis
            </p>
          </div>
          <Link href="/history">
            <Button variant="ghost" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
              Semua Riwayat
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm text-left">
            <thead>
              <tr className="border-b border-black/[0.06] text-[#86868B] font-heading font-semibold">
                <th className="py-3 px-3">Kode Simulasi</th>
                <th className="py-3 px-3">Episode Klaim</th>
                <th className="py-3 px-3">Intervensi</th>
                <th className="py-3 px-3 text-right">Biaya Awal</th>
                <th className="py-3 px-3 text-right">Estimasi Baru</th>
                <th className="py-3 px-3 text-right">Selisih</th>
                <th className="py-3 px-3">Keyakinan</th>
                <th className="py-3 px-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04]">
              {data.recent_simulations.map((sim) => {
                const diff = sim.result?.estimated_difference || 0;
                const isNeg = diff < 0;

                return (
                  <tr key={sim.id} className="hover:bg-black/[0.02] transition-colors">
                    <td className="py-3.5 px-3 font-mono font-bold text-[#0071E3] font-heading">
                      {sim.simulation_code}
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-[#1D1D1F] font-heading">
                        {sim.episode_code}
                      </div>
                      <div className="text-[11px] font-normal text-[#86868B] truncate max-w-[180px]">
                        {sim.baseline_snapshot.diagnosis}
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      {sim.scenario_changes.map((c, i) => (
                        <Badge key={i} variant="simulation" size="sm">
                          LOS {c.baseline_value} → {c.new_value} hari
                        </Badge>
                      ))}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-normal text-[#6E6E73]">
                      {formatIDR(sim.baseline_snapshot.cost, true)}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-[#1D1D1F] font-heading">
                      {sim.result ? formatIDR(sim.result.estimated_cost, true) : '-'}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold font-heading">
                      <span className={isNeg ? 'text-[#248A3D]' : 'text-[#B25E00]'}>
                        {formatIDR(diff, true)}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <Badge variant="success" size="sm">
                        {sim.result ? Math.round(sim.result.confidence * 100) : 84}%
                      </Badge>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <Link href={`/simulations/${sim.id}`}>
                        <Button variant="outline" size="sm">
                          Buka
                        </Button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
