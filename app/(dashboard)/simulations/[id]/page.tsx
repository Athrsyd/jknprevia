'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  RotateCcw,
  BookmarkCheck,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ComparisonCard } from '@/components/simulation/ComparisonCard';
import { FactorContribution } from '@/components/simulation/FactorContribution';
import { CostWaterfall } from '@/components/simulation/CostWaterfall';
import { ConfidenceMeter } from '@/components/simulation/ConfidenceMeter';
import { AIInsight } from '@/components/simulation/AIInsight';
import { GuardrailBanner } from '@/components/layout/GuardrailBanner';
import { SimulationRecord } from '@/lib/types';
import { formatDateTime } from '@/lib/utils';

export default function SimulationResultPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [sim, setSim] = useState<SimulationRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function fetchSimulation() {
      try {
        const res = await fetch(`/api/v1/simulations/${id}`);
        const json = await res.json();
        if (json.data) {
          setSim(json.data);
        }
      } catch (err) {
        console.error('Failed to load simulation result:', err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchSimulation();
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-black/[0.05] rounded-xl w-1/3" />
        <div className="h-64 bg-black/[0.05] rounded-3xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="h-48 bg-black/[0.05] rounded-3xl" />
          <div className="h-48 bg-black/[0.05] rounded-3xl" />
        </div>
      </div>
    );
  }

  if (!sim || !sim.result) {
    return (
      <div className="bg-white rounded-3xl p-10 border border-black/[0.06] text-center max-w-md mx-auto">
        <AlertCircle className="w-10 h-10 text-[#FF9500] mx-auto mb-3" />
        <h3 className="text-lg font-bold text-[#1D1D1F]">Hasil Simulasi Tidak Ditemukan</h3>
        <p className="text-xs text-[#86868B] mt-1 mb-5">
          ID simulasi &quot;{id}&quot; tidak valid atau proses belum selesai.
        </p>
        <Button variant="outline" size="md" onClick={() => router.push('/episodes')}>
          Kembali ke Daftar Episode
        </Button>
      </div>
    );
  }

  const handleSaveSimulation = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="space-y-7">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href={`/episodes/${sim.episode_id}`}>
            <Button variant="outline" size="sm" icon={<ArrowLeft className="w-4 h-4" />}>
              Kasus
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F]">
                Hasil: {sim.simulation_code}
              </h1>
              <Badge variant="simulation" size="sm">
                Selesai
              </Badge>
            </div>
            <p className="text-xs text-[#86868B] mt-0.5">
              Episode {sim.episode_code} • {formatDateTime(sim.created_at)} oleh {sim.created_by_name}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <Link href={`/episodes/${sim.episode_id}/simulate`}>
            <Button
              variant="outline"
              size="md"
              icon={<RotateCcw className="w-4 h-4" />}
            >
              Ubah Parameter
            </Button>
          </Link>

          <Button
            variant={saved ? 'secondary' : 'primary'}
            size="md"
            icon={<BookmarkCheck className={`w-4 h-4 ${saved ? 'text-[#34C759]' : ''}`} />}
            onClick={handleSaveSimulation}
          >
            {saved ? 'Tersimpan' : 'Simpan Hasil'}
          </Button>
        </div>
      </div>

      {/* Signature Comparison Card */}
      <ComparisonCard result={sim.result} />

      {/* AI Operational Narrative Layer */}
      <AIInsight explanation={sim.result.ai_explanation} />

      {/* Middle Grid: Cost Drivers & Confidence Meter */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <FactorContribution drivers={sim.result.drivers} />

        <div className="space-y-5">
          <ConfidenceMeter
            confidence={sim.result.confidence}
            level={sim.result.confidence_level}
            modelVersion={sim.result.model_version}
          />

          {/* Scenario Variables Snapshot in Apple Inset Card style */}
          <div className="bg-white rounded-3xl p-6 border border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
            <h4 className="font-bold text-[#1D1D1F] text-sm sm:text-base mb-3">
              Variabel yang Diubah
            </h4>
            <div className="space-y-2 text-xs sm:text-sm">
              {sim.scenario_changes.map((change, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 bg-[#F5F5F7] rounded-2xl"
                >
                  <div className="flex items-center gap-2 font-medium text-[#1D1D1F] capitalize">
                    <span className="w-2 h-2 rounded-full bg-[#0071E3]" />
                    <span>{change.variable.replace(/_/g, ' ')}</span>
                  </div>
                  <div className="font-mono">
                    <span className="text-[#86868B]">Awal: {change.baseline_value} {change.unit}</span>
                    <span className="mx-2 text-[#86868B]">→</span>
                    <span className="font-bold text-[#0071E3] bg-[#0071E3]/10 px-2 py-0.5 rounded-full">
                      {change.new_value} {change.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cost Waterfall Breakdown */}
      <CostWaterfall waterfall={sim.result.cost_waterfall} />

      {/* Product Guardrail Notice */}
      <GuardrailBanner />
    </div>
  );
}
