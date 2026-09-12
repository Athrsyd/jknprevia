'use client';

import React, { useState } from 'react';
import { Info, X } from 'lucide-react';

interface GuardrailBannerProps {
  compact?: boolean;
}

export const GuardrailBanner: React.FC<GuardrailBannerProps> = ({ compact = false }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="flex items-center justify-between gap-3 px-3.5 py-1.5 bg-[#0071E3]/[0.04] border border-[#0071E3]/12 rounded-full text-xs text-[#6E6E73] transition-all">
      <div className="flex items-center gap-2 truncate">
        <Info className="w-3.5 h-3.5 text-[#0071E3] shrink-0" />
        <span className="truncate">
          <strong className="font-semibold text-[#1D1D1F]">Model Probabilistik:</strong>{' '}
          Hasil estimasi kausal untuk evaluasi efisiensi operasional JKN, bukan rekomendasi klinis DPJP.
        </span>
      </div>

      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="text-[#86868B] hover:text-[#1D1D1F] p-0.5 rounded-full shrink-0 transition-colors"
        title="Tutup pemberitahuan"
        aria-label="Tutup pemberitahuan"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
};
