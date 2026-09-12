'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  Sparkles,
  AlertCircle,
  Building2,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GuardrailBanner } from '@/components/layout/GuardrailBanner';
import { ClaimEpisode } from '@/lib/types';
import { formatIDR, getRiskBadgeProps } from '@/lib/utils';

export default function EpisodesPage() {
  const [episodes, setEpisodes] = useState<ClaimEpisode[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [search, setSearch] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('all');
  const [selectedDiagnosis, setSelectedDiagnosis] = useState('all');
  const [selectedRisk, setSelectedRisk] = useState('all');

  useEffect(() => {
    async function fetchEpisodes() {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (search) queryParams.set('search', search);
        if (selectedProvince !== 'all') queryParams.set('province', selectedProvince);
        if (selectedDiagnosis !== 'all') queryParams.set('diagnosis_group', selectedDiagnosis);
        if (selectedRisk !== 'all') queryParams.set('risk_level', selectedRisk);

        const res = await fetch(`/api/v1/claim-episodes?${queryParams.toString()}`);
        const json = await res.json();
        if (json.data) {
          setEpisodes(json.data);
        }
      } catch (err) {
        console.error('Error fetching episodes:', err);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(() => {
      fetchEpisodes();
    }, 200);

    return () => clearTimeout(timer);
  }, [search, selectedProvince, selectedDiagnosis, selectedRisk]);

  const clearFilters = () => {
    setSearch('');
    setSelectedProvince('all');
    setSelectedDiagnosis('all');
    setSelectedRisk('all');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F] font-heading">
            Episode Klaim Pelayanan
          </h1>
          <p className="text-xs sm:text-sm font-normal text-[#86868B] mt-0.5">
            Eksplorasi data episode klaim, analisis risiko, dan simulasi skenario
          </p>
        </div>

        <Link href="/episodes/1024/simulate">
          <Button variant="simulation" size="md" icon={<Sparkles className="w-4 h-4" />}>
            Kasus Demo (#84291)
          </Button>
        </Link>
      </div>

      <GuardrailBanner compact />

      {/* Spacious Search & Filter Bar (No Crowding, Clear Regular vs Bold) */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-black/[0.06] shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-3">
        {/* Row 1: Full-Width Spotlight Search with Guaranteed Safe Padding */}
        <div className="relative flex items-center w-full">
          <div className="absolute left-4 pointer-events-none text-[#86868B] flex items-center">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Cari kode episode, diagnosa, nama rumah sakit, atau peserta..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '2.75rem' }}
            className="w-full pr-4 py-2.5 bg-[#F5F5F7] rounded-full text-xs sm:text-sm text-[#1D1D1F] placeholder:text-[#86868B] placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:bg-white transition-all font-normal border border-transparent focus:border-black/[0.08]"
          />
        </div>

        {/* Row 2: Filter Pills (Regular Font, Relaxed Wrapping) */}
        <div className="flex items-center gap-2 flex-wrap pt-1">
          <span className="text-xs font-normal text-[#86868B] mr-1 hidden sm:inline">
            Filter:
          </span>

          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="px-3.5 py-1.5 bg-[#F5F5F7] hover:bg-[#EBEBED] rounded-full text-xs font-normal text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 cursor-pointer border border-black/[0.05] transition-all"
          >
            <option value="all">Semua Provinsi</option>
            <option value="D.I. Yogyakarta">D.I. Yogyakarta</option>
            <option value="DKI Jakarta">DKI Jakarta</option>
            <option value="Jawa Tengah">Jawa Tengah</option>
            <option value="Jawa Barat">Jawa Barat</option>
          </select>

          <select
            value={selectedDiagnosis}
            onChange={(e) => setSelectedDiagnosis(e.target.value)}
            className="px-3.5 py-1.5 bg-[#F5F5F7] hover:bg-[#EBEBED] rounded-full text-xs font-normal text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 cursor-pointer border border-black/[0.05] transition-all"
          >
            <option value="all">Semua Diagnosa</option>
            <option value="Kardiovaskular">Kardiovaskular</option>
            <option value="Neurologi">Neurologi (Stroke)</option>
            <option value="Endokrin">Endokrin (Diabetes)</option>
            <option value="Nefrologi">Nefrologi (Ginjal)</option>
            <option value="Respirasi">Respirasi (Paru)</option>
            <option value="Bedah Digestif">Bedah Digestif</option>
          </select>

          <select
            value={selectedRisk}
            onChange={(e) => setSelectedRisk(e.target.value)}
            className="px-3.5 py-1.5 bg-[#F5F5F7] hover:bg-[#EBEBED] rounded-full text-xs font-normal text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 cursor-pointer border border-black/[0.05] transition-all"
          >
            <option value="all">Semua Tingkat Risiko</option>
            <option value="critical">Kritis (&gt;= 75)</option>
            <option value="high">Tinggi (50-74)</option>
            <option value="moderate">Sedang (25-49)</option>
            <option value="low">Rendah (&lt; 25)</option>
          </select>

          {(search ||
            selectedProvince !== 'all' ||
            selectedDiagnosis !== 'all' ||
            selectedRisk !== 'all') && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs font-medium text-[#0071E3] hover:underline px-2 py-1 ml-1"
            >
              Atur Ulang
            </button>
          )}
        </div>
      </div>

      {/* Episodes Table (Apple Inset Grouped Table with Bold & Regular Balance) */}
      <div className="bg-white rounded-3xl border border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm text-left">
            <thead>
              <tr className="border-b border-black/[0.06] text-[#86868B] font-heading font-semibold">
                <th className="py-3 px-4">Kasus & Peserta</th>
                <th className="py-3 px-4">Faskes / Provider</th>
                <th className="py-3 px-4">Diagnosa (ICD-10)</th>
                <th className="py-3 px-4 text-center">LOS</th>
                <th className="py-3 px-4 text-right">Biaya Klaim</th>
                <th className="py-3 px-4">Risiko</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04]">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#86868B]">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="w-6 h-6 border-2 border-[#0071E3] border-t-transparent rounded-full animate-spin" />
                      <span className="font-normal">Memuat data klaim...</span>
                    </div>
                  </td>
                </tr>
              ) : episodes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#86868B]">
                    <AlertCircle className="w-8 h-8 text-[#86868B] mx-auto mb-2" />
                    <p className="font-bold text-sm text-[#1D1D1F] font-heading">Tidak ada kasus yang sesuai filter.</p>
                    <p className="text-xs font-normal text-[#86868B] mt-1">
                      Coba sesuaikan kata kunci pencarian atau atur ulang filter.
                    </p>
                  </td>
                </tr>
              ) : (
                episodes.map((ep) => {
                  const riskProps = getRiskBadgeProps(ep.risk_score);
                  const isBenchmarkKiller = ep.episode_code === 'JKN-2026-084291';

                  return (
                    <tr
                      key={ep.id}
                      className={`hover:bg-black/[0.02] transition-colors ${
                        isBenchmarkKiller ? 'bg-[#0071E3]/[0.03]' : ''
                      }`}
                    >
                      {/* Code & Pseudonym */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-[#0071E3] font-heading">
                            {ep.episode_code}
                          </span>
                          {isBenchmarkKiller && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#0071E3]/10 text-[#0071E3] font-bold font-heading">
                              Demo
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] font-normal text-[#86868B] mt-0.5">
                          {ep.patient_pseudonym}
                        </div>
                      </td>

                      {/* Provider */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#1D1D1F] font-heading">
                          {ep.provider_name}
                        </div>
                        <div className="text-[11px] font-normal text-[#86868B] flex items-center gap-1 mt-0.5">
                          <Building2 className="w-3 h-3 text-[#86868B]" />
                          <span>
                            {ep.provider_type.toUpperCase()} • {ep.province_name}
                          </span>
                        </div>
                      </td>

                      {/* Diagnosis */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#1D1D1F] font-heading">
                          {ep.diagnosis_group}
                        </div>
                        <div className="text-[11px] font-normal text-[#86868B] max-w-[200px] truncate">
                          {ep.diagnosis_description}
                        </div>
                      </td>

                      {/* LOS */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="font-bold text-[#1D1D1F] font-heading text-sm sm:text-base">
                          {ep.length_of_stay}
                        </span>
                        <span className="text-[11px] font-normal text-[#86868B] block">hari</span>
                      </td>

                      {/* Cost */}
                      <td className="py-3.5 px-4 text-right font-mono">
                        <div className="font-bold text-[#1D1D1F] font-heading">
                          {formatIDR(ep.claim_cost, true)}
                        </div>
                        <div className="text-[10px] font-normal text-[#86868B]">
                          {formatIDR(ep.claim_cost)}
                        </div>
                      </td>

                      {/* Risk Score */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold font-heading ${
                            ep.risk_score >= 75
                              ? 'bg-[#FF3B30]/12 text-[#D70015]'
                              : ep.risk_score >= 50
                              ? 'bg-[#FF9500]/15 text-[#B25E00]'
                              : 'bg-[#34C759]/15 text-[#248A3D]'
                          }`}
                        >
                          Skor {ep.risk_score}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/episodes/${ep.id}`}>
                            <Button variant="outline" size="sm">
                              Detail
                            </Button>
                          </Link>
                          <Link href={`/episodes/${ep.id}/simulate`}>
                            <Button
                              variant="simulation"
                              size="sm"
                            >
                              Simulasi
                            </Button>
                          </Link>
                        </div>
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
