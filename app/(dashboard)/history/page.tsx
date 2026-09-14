'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { GuardrailBanner } from '@/components/layout/GuardrailBanner';
import { SimulationRecord } from '@/lib/types';
import { formatIDR, formatDateTime } from '@/lib/utils';

export default function HistoryPage() {
  const [simulations, setSimulations] = useState<SimulationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadHistory() {
      try {
        const res = await fetch('/api/v1/simulations');
        const json = await res.json();
        if (json.data) {
          setSimulations(json.data);
        }
      } catch (err) {
        console.error('Failed to load history:', err);
      } finally {
        setLoading(false);
      }
    }
    loadHistory();
  }, []);

  const filtered = simulations.filter(
    (s) =>
      s.simulation_code.toLowerCase().includes(search.toLowerCase()) ||
      s.episode_code.toLowerCase().includes(search.toLowerCase()) ||
      s.baseline_snapshot.diagnosis.toLowerCase().includes(search.toLowerCase()) ||
      s.created_by_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F] font-heading">
              Riwayat Simulasi & Skenario
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#0071E3]/10 text-[#0071E3] font-heading">
              {simulations.length} Skenario
            </span>
          </div>
          <p className="text-xs sm:text-sm font-normal text-[#86868B] mt-0.5">
            Arsip simulasi counterfactual yang telah dijalankan untuk auditabilitas dan evaluasi keputusan.
          </p>
        </div>

        <Link href="/episodes/1024/simulate">
          <Button variant="simulation" size="md" icon={<Sparkles className="w-4 h-4" />}>
            Simulasi Baru
          </Button>
        </Link>
      </div>

      <GuardrailBanner compact />

      {/* Apple Spotlight Search Bar (Guaranteed Safe Padding, No Overlap) */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-black/[0.06] shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <div className="relative flex items-center w-full">
          <div className="absolute left-4 pointer-events-none text-[#86868B] flex items-center">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Cari kode simulasi, nomor klaim, diagnosa, atau nama analis..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '2.75rem' }}
            className="w-full pr-4 py-2.5 bg-[#F5F5F7] rounded-full text-xs sm:text-sm text-[#1D1D1F] placeholder:text-[#86868B] placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:bg-white font-normal border border-transparent focus:border-black/[0.08] transition-all"
          />
        </div>
      </div>

      {/* History Inset Grouped Table */}
      <div className="bg-white rounded-3xl border border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-xs sm:text-sm text-left whitespace-nowrap">
            <thead>
              <tr className="border-b border-black/[0.06] text-[#86868B] font-heading font-semibold">
                <th className="py-3 px-4">Kode Simulasi</th>
                <th className="py-3 px-4">Episode & Diagnosa</th>
                <th className="py-3 px-4">Intervensi Skenario</th>
                <th className="py-3 px-4 text-right">Biaya Awal</th>
                <th className="py-3 px-4 text-right">Hasil Estimasi</th>
                <th className="py-3 px-4 text-right">Selisih</th>
                <th className="py-3 px-4">Keyakinan</th>
                <th className="py-3 px-4">Waktu & Analis</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04]">
              {loading ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-[#86868B]">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="w-6 h-6 border-2 border-[#0071E3] border-t-transparent rounded-full animate-spin" />
                      <span className="font-normal">Memuat riwayat simulasi...</span>
                    </div>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-[#86868B] font-normal">
                    Tidak ada riwayat simulasi yang ditemukan.
                  </td>
                </tr>
              ) : (
                filtered.map((sim) => {
                  const diff = sim.result?.estimated_difference || 0;
                  const isNeg = diff < 0;

                  return (
                    <tr key={sim.id} className="hover:bg-black/[0.02] transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#0071E3] font-heading">
                        {sim.simulation_code}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#1D1D1F] font-heading">
                          {sim.episode_code}
                        </div>
                        <div className="text-[11px] font-normal text-[#86868B] truncate max-w-[180px]">
                          {sim.baseline_snapshot.diagnosis}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        {sim.scenario_changes.map((c, i) => (
                          <Badge key={i} variant="simulation" size="sm">
                            LOS {c.baseline_value} → {c.new_value} {c.unit}
                          </Badge>
                        ))}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-normal text-[#6E6E73]">
                        {formatIDR(sim.baseline_snapshot.cost, true)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-[#1D1D1F] font-heading">
                        {sim.result ? formatIDR(sim.result.estimated_cost, true) : '-'}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold font-heading">
                        <span className={isNeg ? 'text-[#248A3D]' : 'text-[#B25E00]'}>
                          {formatIDR(diff, true)}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold font-heading bg-[#34C759]/15 text-[#248A3D]">
                          {sim.result ? Math.round(sim.result.confidence * 100) : 84}%
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[11px] font-normal text-[#86868B]">
                        <div>{formatDateTime(sim.created_at)}</div>
                        <div className="text-[10px] text-[#6E6E73]">{sim.created_by_name}</div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link href={`/simulations/${sim.id}`}>
                          <Button variant="outline" size="sm">
                            Buka
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
