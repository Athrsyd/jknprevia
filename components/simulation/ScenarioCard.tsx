import React from 'react';
import { Badge } from '../ui/Badge';
import { Sliders, Calendar, DollarSign, Activity } from 'lucide-react';
import { formatIDR } from '@/lib/utils';

interface ScenarioCardProps {
  mode: 'current' | 'what_if';
  los: number;
  cost: number;
  riskScore: number;
  utilization: number;
  previewLabel?: boolean;
}

export const ScenarioCard: React.FC<ScenarioCardProps> = ({
  mode,
  los,
  cost,
  riskScore,
  utilization,
  previewLabel = false,
}) => {
  const isWhatIf = mode === 'what_if';

  return (
    <div
      className={`rounded-3xl p-6 sm:p-7 transition-all duration-200 ${
        isWhatIf
          ? 'bg-white border-2 border-[#0071E3] shadow-[0_4px_24px_rgba(0,113,227,0.08)] relative overflow-hidden'
          : 'bg-white border border-black/[0.08] shadow-[0_2px_12px_rgba(0,0,0,0.03)]'
      }`}
    >
      {/* Header Tag */}
      <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] mb-5">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-2.5 h-2.5 rounded-full ${
              isWhatIf ? 'bg-[#0071E3]' : 'bg-[#86868B]'
            }`}
          />
          <h3 className="font-semibold text-sm sm:text-base text-[#1D1D1F] tracking-tight font-heading">
            {isWhatIf ? 'Skenario What-If' : 'Kondisi Aktual (Baseline)'}
          </h3>
        </div>

        <div>
          {isWhatIf ? (
            <Badge variant="simulation" size="sm">
              {previewLabel ? 'Pratinjau' : 'Skenario Baru'}
            </Badge>
          ) : (
            <Badge variant="neutral" size="sm">
              Observasi
            </Badge>
          )}
        </div>
      </div>

      {/* Grid of Key Metrics in Apple Inset style */}
      <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
        <div className="bg-[#F5F5F7] p-4 rounded-2xl">
          <div className="flex items-center gap-1.5 text-xs text-[#86868B] font-medium mb-1 font-heading">
            <Calendar className="w-3.5 h-3.5 text-[#0071E3]" />
            <span>Lama Rawat</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[#1D1D1F] tracking-tight font-heading">
            {los} <span className="text-xs font-normal text-[#86868B]">hari</span>
          </div>
        </div>

        <div className="bg-[#F5F5F7] p-4 rounded-2xl">
          <div className="flex items-center gap-1.5 text-xs text-[#86868B] font-medium mb-1 font-heading">
            <DollarSign className="w-3.5 h-3.5 text-[#34C759]" />
            <span>{isWhatIf ? 'Estimasi Biaya' : 'Biaya Klaim'}</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[#1D1D1F] tracking-tight font-heading truncate">
            {formatIDR(cost, true)}
          </div>
        </div>

        <div className="bg-[#F5F5F7] p-4 rounded-2xl">
          <div className="flex items-center gap-1.5 text-xs text-[#86868B] font-medium mb-1 font-heading">
            <Activity className="w-3.5 h-3.5 text-[#FF3B30]" />
            <span>Skor Risiko</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[#1D1D1F] tracking-tight font-heading">
            {riskScore}{' '}
            <span className="text-xs font-normal text-[#86868B]">/ 100</span>
          </div>
        </div>

        <div className="bg-[#F5F5F7] p-4 rounded-2xl">
          <div className="flex items-center gap-1.5 text-xs text-[#86868B] font-medium mb-1 font-heading">
            <Sliders className="w-3.5 h-3.5 text-[#5856D6]" />
            <span>Utilisasi</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[#1D1D1F] tracking-tight font-heading">
            {utilization} <span className="text-xs font-normal text-[#86868B]">layanan</span>
          </div>
        </div>
      </div>
    </div>
  );
};
