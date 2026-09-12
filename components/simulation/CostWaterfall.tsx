import React from 'react';
import { formatIDR } from '@/lib/utils';
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';

interface CostWaterfallProps {
  waterfall: {
    category: string;
    baseline: number;
    estimated: number;
    difference: number;
  }[];
}

export const CostWaterfall: React.FC<CostWaterfallProps> = ({ waterfall }) => {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="pb-4 mb-5 border-b border-black/[0.06]">
        <h4 className="font-bold text-base sm:text-lg text-[#1D1D1F]">
          Rincian Biaya per Kategori Pelayanan
        </h4>
        <p className="text-xs sm:text-sm text-[#86868B] mt-0.5">
          Perbandingan langsung antara biaya aktual awal dengan estimasi hasil skenario
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs sm:text-sm text-left">
          <thead>
            <tr className="border-b border-black/[0.06] text-[#86868B] font-semibold">
              <th className="py-3 px-4">Kategori Pelayanan</th>
              <th className="py-3 px-4 text-right">Biaya Awal</th>
              <th className="py-3 px-4 text-right">Estimasi Simulasi</th>
              <th className="py-3 px-4 text-right">Selisih</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/[0.04]">
            {waterfall.map((row, idx) => {
              const isDiffZero = row.difference === 0;
              const isDiffNeg = row.difference < 0;

              return (
                <tr key={idx} className="hover:bg-black/[0.02] transition-colors">
                  <td className="py-3.5 px-4 text-[#1D1D1F] font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0071E3] flex-shrink-0" />
                    <span>{row.category}</span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-[#6E6E73]">
                    {formatIDR(row.baseline)}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-[#1D1D1F] font-bold">
                    {formatIDR(row.estimated)}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono">
                    <span
                      className={`inline-flex items-center gap-1 font-bold ${
                        isDiffZero
                          ? 'text-[#86868B]'
                          : isDiffNeg
                          ? 'text-[#248A3D]'
                          : 'text-[#B25E00]'
                      }`}
                    >
                      {isDiffZero ? (
                        <Minus className="w-3.5 h-3.5" />
                      ) : isDiffNeg ? (
                        <ArrowDownRight className="w-4 h-4" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4" />
                      )}
                      {formatIDR(row.difference)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
