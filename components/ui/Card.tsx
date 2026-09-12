import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'simulation' | 'highlight' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
}) => {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4 sm:p-5',
    md: 'p-6 sm:p-7',
    lg: 'p-7 sm:p-9',
  };

  const variantClasses = {
    default:
      'bg-white border border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.03)] rounded-2xl sm:rounded-3xl',
    bordered:
      'bg-white border border-black/[0.1] rounded-2xl sm:rounded-3xl shadow-xs',
    simulation:
      'bg-white border-2 border-[#0071E3]/30 shadow-[0_4px_20px_rgba(0,113,227,0.08)] rounded-2xl sm:rounded-3xl relative overflow-hidden',
    highlight:
      'bg-[#F5F5F7] border border-black/[0.04] rounded-2xl sm:rounded-3xl',
  };

  return (
    <div className={`${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
};
