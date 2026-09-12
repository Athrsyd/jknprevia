import React from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

interface AIInsightProps {
  explanation?: {
    summary: string;
    primary_factors: string[];
    operational_recommendation: string;
    disclaimer: string;
  };
}

export const AIInsight: React.FC<AIInsightProps> = ({ explanation }) => {
  if (!explanation) return null;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.03)] relative overflow-hidden">
      {/* Subtle Apple Intelligence glow accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#0071E3]/10 via-[#30B0C7]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between pb-5 mb-5 border-b border-black/[0.06] flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0071E3] via-[#30B0C7] to-[#5856D6] flex items-center justify-center text-white shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-base sm:text-lg text-[#1D1D1F] tracking-tight">
              Ringkasan Cerdas & Rekomendasi
            </h4>
            <p className="text-xs text-[#86868B]">
              Penjelasan kontekstual otomatis berbasis hasil kalkulasi kausal
            </p>
          </div>
        </div>

        <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-black/[0.05] text-[#6E6E73]">
          Decision Intelligence
        </span>
      </div>

      {/* Content */}
      <div className="space-y-5 text-sm sm:text-base text-[#1D1D1F]">
        {/* Summary Card */}
        <div className="p-5 bg-[#F5F5F7] rounded-2xl">
          <p className="leading-relaxed text-[#1D1D1F] font-normal sm:text-[15px]">
            {explanation.summary}
          </p>
        </div>

        {/* Primary Factors */}
        <div>
          <h5 className="font-semibold text-xs uppercase tracking-wider text-[#86868B] mb-2.5 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#0071E3]" />
            Faktor Pendorong Utama
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {explanation.primary_factors.map((factor, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 bg-white border border-black/[0.06] p-3.5 rounded-2xl text-xs sm:text-sm text-[#1D1D1F] font-medium shadow-2xs"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3] mt-2 flex-shrink-0" />
                <span>{factor}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Recommendation */}
        <div className="p-4 sm:p-5 bg-[#0071E3]/[0.05] border border-[#0071E3]/20 rounded-2xl">
          <h5 className="font-bold text-[#0071E3] text-sm mb-1 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            Saran Kebijakan Manajerial:
          </h5>
          <p className="text-xs sm:text-sm text-[#1D1D1F] leading-relaxed">
            {explanation.operational_recommendation}
          </p>
        </div>

        {/* Guardrail Disclaimer */}
        <div className="pt-2 text-xs text-[#86868B] flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-[#86868B] flex-shrink-0 mt-0.5" />
          <p className="leading-normal">
            {explanation.disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
};
