import React from 'react';
import { DriverAttribution } from '@/lib/types';
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';
import { formatIDR } from '@/lib/utils';

interface FactorContributionProps {
  drivers: DriverAttribution[];
}

export const FactorContribution: React.FC<FactorContributionProps> = ({ drivers }) => {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="pb-4 mb-5 border-b border-black/[0.06]">
        <h4 className="font-bold text-base sm:text-lg text-[#1D1D1F]">
          Faktor Kontribusi Penghematan
        </h4>
        <p className="text-xs sm:text-sm text-[#86868B] mt-0.5">
          Komponen pelayanan yang paling memengaruhi perbedaan biaya
        </p>
      </div>

      <div className="space-y-5">
        {drivers.map((driver, index) => {
          const isDecrease = driver.direction === 'decrease';
          const isIncrease = driver.direction === 'increase';

          return (
            <div key={index} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-2 font-semibold text-[#1D1D1F]">
                  {isDecrease ? (
                    <ArrowDownRight className="w-4 h-4 text-[#248A3D]" />
                  ) : isIncrease ? (
                    <ArrowUpRight className="w-4 h-4 text-[#B25E00]" />
                  ) : (
                    <Minus className="w-4 h-4 text-[#86868B]" />
                  )}
                  <span>{driver.name}</span>
                </div>
                <div className="flex items-center gap-3 font-mono">
                  <span className="text-[#86868B] text-xs">
                    {formatIDR(driver.impact_amount)}
                  </span>
                  <span className="font-bold text-[#1D1D1F] text-xs sm:text-sm w-12 text-right">
                    {driver.contribution_pct}%
                  </span>
                </div>
              </div>

              {/* Apple style smooth bar */}
              <div className="w-full bg-[#E5E5EA] rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    isDecrease ? 'bg-[#0071E3]' : isIncrease ? 'bg-[#FF9500]' : 'bg-[#86868B]'
                  }`}
                  style={{ width: `${driver.contribution_pct}%` }}
                />
              </div>

              <p className="text-xs text-[#6E6E73] pl-6 leading-relaxed">
                {driver.explanation}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
