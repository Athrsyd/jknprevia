import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  delta?: {
    value: string;
    isPositiveGood?: boolean;
    direction: 'up' | 'down' | 'neutral';
  };
  icon?: React.ReactNode;
  variant?: 'default' | 'simulation' | 'highlight';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subtitle,
  delta,
  icon,
  variant = 'default',
}) => {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-black/[0.06] p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-200">
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-semibold text-[#86868B] tracking-tight uppercase font-heading">
          {label}
        </span>
        {icon && (
          <div className="w-8 h-8 rounded-full bg-[#F5F5F7] text-[#1D1D1F] flex items-center justify-center shrink-0">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3">
        <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F] font-heading">
          {value}
        </div>

        {(delta || subtitle) && (
          <div className="mt-2 flex items-center gap-2 text-xs flex-wrap">
            {delta && (
              <span
                className={`font-semibold font-heading px-2.5 py-0.5 rounded-full ${
                  delta.direction === 'down'
                    ? 'bg-[#34C759]/12 text-[#248A3D]'
                    : delta.direction === 'up'
                    ? 'bg-[#FF9500]/12 text-[#B25E00]'
                    : 'bg-black/[0.05] text-[#6E6E73]'
                }`}
              >
                {delta.value}
              </span>
            )}
            {subtitle && <span className="text-[#86868B] font-normal">{subtitle}</span>}
          </div>
        )}
      </div>
    </div>
  );
};
