import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'simulation' | 'success' | 'warning' | 'danger' | 'neutral';
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'sm',
  dot = false,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-[11px] px-2.5 py-0.5 font-medium',
    md: 'text-xs px-3 py-1 font-semibold',
  };

  const variantClasses = {
    primary: 'bg-[#0071E3]/10 text-[#0071E3] border border-[#0071E3]/20',
    simulation: 'bg-[#30B0C7]/12 text-[#0E7490] border border-[#30B0C7]/30 font-semibold',
    success: 'bg-[#34C759]/15 text-[#248A3D] border border-[#34C759]/25',
    warning: 'bg-[#FF9500]/15 text-[#B25E00] border border-[#FF9500]/25',
    danger: 'bg-[#FF3B30]/12 text-[#D70015] border border-[#FF3B30]/20',
    neutral: 'bg-black/[0.04] text-[#6E6E73] border border-black/[0.05]',
  };

  const dotColor = {
    primary: 'bg-[#0071E3]',
    simulation: 'bg-[#30B0C7]',
    success: 'bg-[#34C759]',
    warning: 'bg-[#FF9500]',
    danger: 'bg-[#FF3B30]',
    neutral: 'bg-[#86868B]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full select-none tracking-tight font-heading ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColor[variant]}`} />}
      {children}
    </span>
  );
};
