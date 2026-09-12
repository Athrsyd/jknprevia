import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'simulation' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  className = '',
  disabled,
  ...props
}) => {
  // Apple HIG Pill-shaped tactile buttons with Montserrat font-heading
  const baseClasses =
    'inline-flex items-center justify-center font-heading font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed select-none tracking-tight';

  const sizeClasses = {
    sm: 'text-xs px-3.5 py-1.5 min-h-[32px] gap-1.5 font-medium',
    md: 'text-xs sm:text-sm px-4.5 py-2 min-h-[38px] gap-2 font-semibold',
    lg: 'text-sm sm:text-base px-6 py-2.5 min-h-[44px] gap-2.5 font-semibold',
  };

  const variantClasses = {
    primary:
      'bg-[#0071E3] text-white hover:bg-[#0077ED] focus:ring-[#0071E3] shadow-[0_1px_2px_rgba(0,0,0,0.08)]',
    secondary:
      'bg-[#E5E5EA] text-[#1D1D1F] hover:bg-[#D1D1D6] focus:ring-black/20 font-semibold',
    simulation:
      'bg-gradient-to-r from-[#0071E3] to-[#30B0C7] text-white hover:opacity-95 focus:ring-[#0071E3] shadow-[0_2px_8px_rgba(0,113,227,0.25)] font-semibold',
    outline:
      'border border-black/[0.1] bg-white text-[#1D1D1F] hover:bg-[#F5F5F7] focus:ring-[#0071E3] shadow-[0_1px_2px_rgba(0,0,0,0.03)]',
    ghost:
      'bg-transparent text-[#0071E3] hover:bg-black/[0.04] focus:ring-[#0071E3]',
    danger:
      'bg-[#FF3B30] text-white hover:bg-[#D70015] focus:ring-[#FF3B30] shadow-[0_1px_2px_rgba(0,0,0,0.08)]',
  };

  return (
    <button
      disabled={disabled || loading}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      ) : (
        icon && <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
    </button>
  );
};
