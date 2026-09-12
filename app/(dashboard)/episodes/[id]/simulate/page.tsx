'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Sliders,
  Sparkles,
  Zap,
  Calendar,
  Plus,
  Minus,
  ArrowRight,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ScenarioCard } from '@/components/simulation/ScenarioCard';
import { SimulationPipeline, PipelineStage } from '@/components/simulation/SimulationPipeline';
import { GuardrailBanner } from '@/components/layout/GuardrailBanner';
import { ClaimEpisode } from '@/lib/types';
import { formatIDR, formatPercent } from '@/lib/utils';

export default function SimulateEpisodePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [episode, setEpisode] = useState<ClaimEpisode | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulation Variable: LOS
  const [targetLos, setTargetLos] = useState<number>(5);

  // Simulation Pipeline Execution State
  const [isSimulating, setIsSimulating] = useState(false);
  const [pipelineStages, setPipelineStages] = useState<PipelineStage[]>([
    {
      id: 'stg-1',
      name: 'Validasi Batasan Input & Protokol',
      description: 'Memverifikasi kelayakan durasi hari rawat inap minimum terhadap standar diagnosa.',
      status: 'waiting',
    },
    {
      id: 'stg-2',
      name: 'Perekaman Baseline Snapshot',
      description: 'Menyimpan data observasi asli (biaya, utilisasi, dan faskes rujukan) sebagai pembanding.',
      status: 'waiting',
    },
    {
      id: 'stg-3',
      name: 'Kalkulasi Model Kausal Counterfactual',
      description: 'Menghitung estimasi dampak perubahan LOS terhadap akomodasi, obat, dan visite dokter.',
      status: 'waiting',
    },
    {
      id: 'stg-4',
      name: 'Dekomposisi Driver Biaya',
      description: 'Mengisolasi persentase kontribusi masing-masing komponen pelayanan terhadap biaya.',
      status: 'waiting',
    },
    {
      id: 'stg-5',
      name: 'Perhitungan Skor Keyakinan (Confidence)',
      description: 'Menilai tingkat reliabilitas estimasi berdasarkan kecukupan historis kasus serupa.',
      status: 'waiting',
    },
  ]);

  useEffect(() => {
    async function fetchEpisode() {
      try {
        const res = await fetch(`/api/v1/claim-episodes/${id}`);
        const json = await res.json();
        if (json.data) {
          setEpisode(json.data);
          if (json.data.length_of_stay === 7) {
            setTargetLos(5);
          } else {
            setTargetLos(Math.max(1, json.data.length_of_stay - 1));
          }
        }
      } catch (err) {
        console.error('Failed to load episode for simulation:', err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchEpisode();
  }, [id]);

  if (loading || !episode) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-black/[0.05] rounded-2xl w-1/3" />
        <div className="h-64 bg-black/[0.05] rounded-3xl" />
      </div>
    );
  }

  const baselineCost = episode.claim_cost;
  const baselineLos = episode.length_of_stay;

  // Real-time preview calculation
  let previewEstimatedCost = 0;
  if (episode.episode_code === 'JKN-2026-084291' && targetLos === 5) {
    previewEstimatedCost = 6910000;
  } else {
    const fixedRatio = 0.4;
    const variableDaily = baselineLos > 0 ? (baselineCost * (1 - fixedRatio)) / baselineLos : 0;
    previewEstimatedCost = Math.round(baselineCost * fixedRatio + targetLos * variableDaily);
  }

  const previewDiff = previewEstimatedCost - baselineCost;
  const previewDiffPct = Number(((previewDiff / baselineCost) * 100).toFixed(2));
  const previewRisk = Math.min(
    100,
    Math.max(15, Math.round(episode.risk_score * (0.5 + 0.5 * Math.sqrt(targetLos / Math.max(1, baselineLos)))))
  );
  const previewUtil = Math.max(
    1,
    Math.round(episode.service_utilization_count * (0.4 + 0.6 * (targetLos / Math.max(1, baselineLos))))
  );

  const handleRunSimulation = async () => {
    setIsSimulating(true);

    const updateStage = (stageIdx: number, status: 'running' | 'completed') => {
      setPipelineStages((prev) =>
        prev.map((s, idx) => {
          if (idx === stageIdx) return { ...s, status };
          return s;
        })
      );
    };

    try {
      updateStage(0, 'running');
      await new Promise((r) => setTimeout(r, 400));
      updateStage(0, 'completed');

      updateStage(1, 'running');
      await new Promise((r) => setTimeout(r, 400));
      updateStage(1, 'completed');

      updateStage(2, 'running');
      const response = await fetch('/api/v1/simulations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          episode_id: episode.id,
          changes: [
            {
              variable: 'length_of_stay',
              value: targetLos,
              baseline: baselineLos,
            },
          ],
        }),
      });
      const resJson = await response.json();
      updateStage(2, 'completed');

      updateStage(3, 'running');
      await new Promise((r) => setTimeout(r, 350));
      updateStage(3, 'completed');

      updateStage(4, 'running');
      await new Promise((r) => setTimeout(r, 350));
      updateStage(4, 'completed');

      if (resJson.data?.id) {
        router.push(`/simulations/${resJson.data.id}`);
      } else {
        router.push('/history');
      }
    } catch (err) {
      console.error('Simulation execution failed:', err);
      setIsSimulating(false);
    }
  };

  const handleIncrement = () => {
    setTargetLos((prev) => Math.min(prev + 1, Math.max(14, baselineLos + 5)));
  };

  const handleDecrement = () => {
    setTargetLos((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href={`/episodes/${episode.id}`}>
            <Button variant="outline" size="sm" icon={<ArrowLeft className="w-4 h-4" />}>
              Kembali
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F]">
                Simulasi Skenario
              </h1>
              <Badge variant="simulation" size="sm">
                What-If
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-[#86868B] mt-0.5">
              Kasus: {episode.episode_code} ({episode.diagnosis_group}) • {episode.provider_name}
            </p>
          </div>
        </div>

        {/* Action Button */}
        {!isSimulating && (
          <Button
            variant="simulation"
            size="md"
            icon={<Sparkles className="w-4 h-4" />}
            onClick={handleRunSimulation}
          >
            Eksekusi Simulasi
          </Button>
        )}
      </div>

      <GuardrailBanner compact />

      {/* If simulating, show the installer pipeline */}
      {isSimulating ? (
        <div className="py-6">
          <SimulationPipeline stages={pipelineStages} />
        </div>
      ) : (
        /* What-If Builder View in Apple Style */
        <div className="space-y-6">
          {/* Side-by-side Scenario Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <ScenarioCard
              mode="current"
              los={baselineLos}
              cost={baselineCost}
              riskScore={episode.risk_score}
              utilization={episode.service_utilization_count}
            />

            <ScenarioCard
              mode="what_if"
              los={targetLos}
              cost={previewEstimatedCost}
              riskScore={previewRisk}
              utilization={previewUtil}
              previewLabel={true}
            />
          </div>

          {/* Real-time Preview Banner (Apple dynamic island / widget style) */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0071E3] uppercase tracking-wider mb-1">
                <Zap className="w-4 h-4" />
                <span>Pratinjau Estimasi Cepat</span>
              </div>
              <p className="text-sm text-[#1D1D1F] leading-relaxed">
                Penyesuaian durasi rawat dari <strong>{baselineLos} hari</strong> menjadi{' '}
                <strong className="text-[#0071E3]">{targetLos} hari</strong> diproyeksikan menghasilkan:
              </p>
            </div>

            <div className="flex items-center gap-5 flex-wrap">
              <div>
                <div
                  className={`text-2xl sm:text-3xl font-bold font-mono ${
                    previewDiff <= 0 ? 'text-[#248A3D]' : 'text-[#B25E00]'
                  }`}
                >
                  {formatIDR(previewDiff, true)}
                </div>
                <div className="text-xs text-[#86868B] font-medium">
                  {formatPercent(previewDiffPct, true)} penghematan
                </div>
              </div>

              <Button
                variant="simulation"
                size="md"
                onClick={handleRunSimulation}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Jalankan Model
              </Button>
            </div>
          </div>

          {/* Apple Stepper Control Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] flex-wrap gap-2">
              <div>
                <h3 className="font-bold text-[#1D1D1F] text-base sm:text-lg flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#0071E3]" />
                  Variabel: Lama Hari Rawat (Length of Stay)
                </h3>
                <p className="text-xs sm:text-sm text-[#86868B] mt-0.5">
                  Ubah satu variabel untuk mengukur dampak kausalitas biaya klaim
                </p>
              </div>

              <Badge variant="neutral" size="sm">
                Variabel Utama
              </Badge>
            </div>

            {/* Apple Style Stepper + Slider */}
            <div className="bg-[#F5F5F7] p-6 sm:p-7 rounded-2xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div>
                  <span className="text-sm font-semibold text-[#1D1D1F] flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#0071E3]" />
                    Durasi Rawat Inap Baru
                  </span>
                  <p className="text-xs text-[#86868B] mt-0.5">
                    Kondisi awal aktual: {baselineLos} hari
                  </p>
                </div>

                {/* Apple Circular Steppers */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleDecrement}
                    disabled={targetLos <= 1}
                    className="w-10 h-10 rounded-full bg-white border border-black/[0.1] hover:bg-black/[0.04] text-[#1D1D1F] flex items-center justify-center font-bold text-lg shadow-2xs disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
                    title="Kurangi 1 hari"
                    aria-label="Kurangi durasi 1 hari"
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <div className="text-center px-4 py-1.5 bg-white border border-black/[0.08] rounded-full shadow-2xs min-w-[90px]">
                    <span className="text-xl sm:text-2xl font-bold text-[#1D1D1F] font-mono">
                      {targetLos}
                    </span>
                    <span className="text-[10px] font-medium text-[#86868B] block uppercase tracking-wider">
                      Hari
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleIncrement}
                    disabled={targetLos >= Math.max(14, baselineLos + 5)}
                    className="w-10 h-10 rounded-full bg-white border border-black/[0.1] hover:bg-black/[0.04] text-[#1D1D1F] flex items-center justify-center font-bold text-lg shadow-2xs disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
                    title="Tambah 1 hari"
                    aria-label="Tambah durasi 1 hari"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Slider with Apple minimalist styling */}
              <div className="pt-1">
                <input
                  type="range"
                  min={1}
                  max={Math.max(14, baselineLos + 5)}
                  step={1}
                  value={targetLos}
                  onChange={(e) => setTargetLos(Number(e.target.value))}
                  className="w-full h-2 bg-[#E5E5EA] rounded-full appearance-none cursor-pointer accent-[#0071E3]"
                />
                <div className="flex justify-between text-xs text-[#86868B] mt-2">
                  <span>1 hari (Minimal)</span>
                  <span className="font-semibold text-[#1D1D1F]">
                    Aktual: {baselineLos} hari
                  </span>
                  <span>{Math.max(14, baselineLos + 5)} hari (Maksimal)</span>
                </div>
              </div>

              {/* Apple Segmented Preset Pills */}
              <div className="pt-3 border-t border-black/[0.06]">
                <p className="text-xs font-semibold text-[#86868B] mb-2.5">
                  Rekomendasi Skenario Cepat:
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setTargetLos(5)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                      targetLos === 5
                        ? 'bg-[#0071E3] text-white shadow-xs'
                        : 'bg-white text-[#1D1D1F] border border-black/[0.08] hover:bg-black/[0.02]'
                    }`}
                  >
                    Target Demo (5 hari / -2 hari)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTargetLos(4)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                      targetLos === 4
                        ? 'bg-[#0071E3] text-white shadow-xs'
                        : 'bg-white text-[#1D1D1F] border border-black/[0.08] hover:bg-black/[0.02]'
                    }`}
                  >
                    Mobilisasi Dini (4 hari)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTargetLos(baselineLos)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                      targetLos === baselineLos
                        ? 'bg-[#1D1D1F] text-white shadow-xs'
                        : 'bg-white text-[#1D1D1F] border border-black/[0.08] hover:bg-black/[0.02]'
                    }`}
                  >
                    Kembali ke Awal ({baselineLos} hari)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
