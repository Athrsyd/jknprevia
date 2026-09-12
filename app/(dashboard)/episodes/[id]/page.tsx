'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Sparkles,
  Calendar,
  Building2,
  AlertCircle,
  Layers,
  History,
  Activity,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { MetricCard } from '@/components/simulation/MetricCard';
import { EpisodeTimeline } from '@/components/simulation/EpisodeTimeline';
import { GuardrailBanner } from '@/components/layout/GuardrailBanner';
import { ClaimEpisode } from '@/lib/types';
import { formatIDR, formatDate } from '@/lib/utils';

export default function EpisodeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [episode, setEpisode] = useState<ClaimEpisode | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await fetch(`/api/v1/claim-episodes/${id}`);
        const json = await res.json();
        if (json.data) {
          setEpisode(json.data);
        }
      } catch (err) {
        console.error('Failed to load episode detail:', err);
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-black/[0.05] rounded-xl w-1/4" />
        <div className="h-48 bg-black/[0.05] rounded-3xl" />
        <div className="h-64 bg-black/[0.05] rounded-3xl" />
      </div>
    );
  }

  if (!episode) {
    return (
      <div className="bg-white rounded-3xl p-10 border border-black/[0.06] text-center max-w-md mx-auto">
        <AlertCircle className="w-10 h-10 text-[#FF9500] mx-auto mb-3" />
        <h3 className="text-lg font-bold text-[#1D1D1F]">Kasus Tidak Ditemukan</h3>
        <p className="text-xs text-[#86868B] mt-1 mb-5">
          ID episode &quot;{id}&quot; tidak terdaftar pada sistem.
        </p>
        <Button variant="outline" size="md" onClick={() => router.push('/episodes')}>
          Kembali ke Daftar Episode
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-7">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/episodes">
            <Button variant="outline" size="sm" icon={<ArrowLeft className="w-4 h-4" />}>
              Kembali
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F]">
                Kasus {episode.episode_code}
              </h1>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  episode.risk_score >= 75
                    ? 'bg-[#FF3B30]/12 text-[#D70015]'
                    : episode.risk_score >= 50
                    ? 'bg-[#FF9500]/15 text-[#B25E00]'
                    : 'bg-[#34C759]/15 text-[#248A3D]'
                }`}
              >
                Risiko {episode.risk_score}/100
              </span>
            </div>
            <p className="text-xs text-[#86868B] mt-0.5">
              {episode.patient_pseudonym} • Terverifikasi pada data klaim BPJS
            </p>
          </div>
        </div>

        {/* CTA */}
        <Link href={`/episodes/${episode.id}/simulate`}>
          <Button
            variant="simulation"
            size="md"
            icon={<Sparkles className="w-4 h-4" />}
          >
            Mulai Simulasi What-If
          </Button>
        </Link>
      </div>

      <GuardrailBanner compact />

      {/* Episode Summary Card in Apple Inset Style */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <span className="text-xs font-semibold text-[#86868B] uppercase tracking-wider">
              Diagnosa Utama
            </span>
            <div className="text-lg font-bold text-[#1D1D1F] mt-1">
              {episode.diagnosis_group}
            </div>
            <div className="text-xs text-[#6E6E73] mt-0.5">
              Kode ICD-10: <strong>{episode.diagnosis_code}</strong> — {episode.diagnosis_description}
            </div>
            <div className="mt-3.5 text-xs text-[#6E6E73] bg-[#F5F5F7] p-3 rounded-2xl leading-relaxed">
              <strong className="text-[#1D1D1F]">Catatan:</strong> {episode.notes || 'Tidak ada catatan komplikasi.'}
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold text-[#86868B] uppercase tracking-wider">
              Penyelenggara Pelayanan
            </span>
            <div className="text-lg font-bold text-[#1D1D1F] mt-1">
              {episode.provider_name}
            </div>
            <div className="text-xs text-[#6E6E73] flex items-center gap-1.5 mt-0.5">
              <Building2 className="w-3.5 h-3.5 text-[#86868B]" />
              <span>
                {episode.provider_type.toUpperCase()} • {episode.province_name}
              </span>
            </div>
            <div className="mt-3.5 flex items-center gap-2 text-xs text-[#6E6E73] bg-[#F5F5F7] p-3 rounded-2xl">
              <Calendar className="w-3.5 h-3.5 text-[#0071E3]" />
              <span>
                Periode: <strong>{formatDate(episode.episode_started_at)} s.d. {formatDate(episode.episode_ended_at)}</strong>
              </span>
            </div>
          </div>

          <div className="bg-[#F5F5F7] p-5 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-[#86868B] uppercase tracking-wider">
                Total Biaya Klaim
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-[#1D1D1F] font-mono mt-1">
                {formatIDR(episode.claim_cost)}
              </div>
              <div className="text-xs text-[#86868B] mt-0.5">
                Representasi: {formatIDR(episode.claim_cost, true)}
              </div>
            </div>

            <div className="pt-3 border-t border-black/[0.06] text-xs flex items-center justify-between text-[#6E6E73]">
              <span>Readmisi:</span>
              <strong className="text-[#B25E00]">{episode.readmission_risk}% Probabilitas</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Metric Columns */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MetricCard
          label="Lama Rawat (LOS)"
          value={`${episode.length_of_stay} hari`}
          subtitle="Durasi rawat inap"
          icon={<Calendar className="w-4 h-4 text-[#0071E3]" />}
        />
        <MetricCard
          label="Jumlah Layanan"
          value={`${episode.service_utilization_count}`}
          subtitle="Tindakan & akomodasi"
          icon={<Layers className="w-4 h-4 text-[#5856D6]" />}
        />
        <MetricCard
          label="Skor Risiko"
          value={`${episode.risk_score} / 100`}
          subtitle="Keparahan klinis"
          icon={<Activity className="w-4 h-4 text-[#FF3B30]" />}
        />
        <MetricCard
          label="Riwayat Terkait"
          value={`${episode.related_episodes_count}`}
          subtitle="Episode terdahulu"
          icon={<History className="w-4 h-4 text-[#86868B]" />}
        />
      </div>

      {/* Service Timeline */}
      <EpisodeTimeline services={episode.services} />
    </div>
  );
}
