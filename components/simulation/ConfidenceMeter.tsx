import React from 'react';
import { ShieldCheck, HelpCircle, ShieldAlert } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface ConfidenceMeterProps {
  confidence: number;
  level: 'high' | 'moderate' | 'low';
  modelVersion: string;
}

export const ConfidenceMeter: React.FC<ConfidenceMeterProps> = ({
  confidence,
  level,
  modelVersion,
}) => {
  const percent = Math.round(confidence * 100);

  const levelConfig = {
    high: {
      label: 'Tinggi (Reliabel)',
      variant: 'success' as const,
      color: 'bg-[#34C759]',
      textColor: 'text-[#248A3D]',
      icon: ShieldCheck,
      desc: 'Model didukung variansi data historis episode sejenis yang sangat konsisten.',
    },
    moderate: {
      label: 'Moderat',
      variant: 'warning' as const,
      color: 'bg-[#FF9500]',
      textColor: 'text-[#B25E00]',
      icon: HelpCircle,
      desc: 'Terdapat variasi pola pelayanan antar faskes terkait penyulit pasien.',
    },
    low: {
      label: 'Rendah',
      variant: 'danger' as const,
      color: 'bg-[#FF3B30]',
      textColor: 'text-[#D70015]',
      icon: ShieldAlert,
      desc: 'Deviasi skenario cukup jauh dari pola umum, perlakukan sebagai indikasi awal.',
    },
  }[level];

  const Icon = levelConfig.icon;

  return (
    <div className="bg-white rounded-3xl p-6 border border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#34C759]/15 flex items-center justify-center text-[#248A3D]">
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-semibold text-sm sm:text-base text-[#1D1D1F]">
              Tingkat Keyakinan Model
            </h4>
            <p className="text-xs text-[#86868B]">Confidence & Uncertainty</p>
          </div>
        </div>

        <Badge variant={levelConfig.variant} size="md">
          {levelConfig.label} • {percent}%
        </Badge>
      </div>

      {/* Apple style smooth rounded progress bar */}
      <div className="w-full bg-[#E5E5EA] rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${levelConfig.color}`}
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-[#6E6E73] flex-wrap gap-2 pt-1">
        <span>{levelConfig.desc}</span>
        <span className="font-mono text-[11px] text-[#86868B] bg-[#F5F5F7] px-2 py-0.5 rounded-full">
          {modelVersion}
        </span>
      </div>
    </div>
  );
};
