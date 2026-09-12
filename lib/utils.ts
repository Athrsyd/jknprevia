/**
 * Format number to Indonesian Rupiah representation
 * e.g. 8420000 -> "Rp 8,42 juta" or full "Rp 8.420.000"
 */
export function formatIDR(amount: number, compact: boolean = false): string {
  if (compact) {
    const abs = Math.abs(amount);
    const sign = amount < 0 ? '-' : '';
    if (abs >= 1_000_000_000) {
      const val = (abs / 1_000_000_000).toFixed(2).replace('.', ',');
      return `${sign}Rp ${val} Miliar`;
    }
    if (abs >= 1_000_000) {
      const val = (abs / 1_000_000).toFixed(2).replace('.', ',');
      return `${sign}Rp ${val} juta`;
    }
    if (abs >= 1_000) {
      const val = (abs / 1_000).toFixed(0).replace('.', ',');
      return `${sign}Rp ${val} ribu`;
    }
    return `${sign}Rp ${abs.toLocaleString('id-ID')}`;
  }

  const sign = amount < 0 ? '-' : '';
  const abs = Math.abs(amount);
  return `${sign}Rp ${abs.toLocaleString('id-ID')}`;
}

/**
 * Format percentage with Indonesian comma separator
 * e.g. -17.98 -> "-17,9%"
 */
export function formatPercent(value: number, includeSign: boolean = false): string {
  const formatted = Math.abs(value).toFixed(1).replace('.', ',');
  const sign = value > 0 && includeSign ? '+' : value < 0 ? '-' : '';
  return `${sign}${formatted}%`;
}

/**
 * Format date in Indonesian locale
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}

export function formatDateTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch {
    return dateString;
  }
}

/**
 * Risk badge styling helper
 */
export function getRiskBadgeProps(riskScore: number): { label: string; color: string; bg: string; text: string } {
  if (riskScore >= 75) {
    return { label: 'Risiko Kritis', color: '#DC2626', bg: 'bg-red-50', text: 'text-red-700' };
  }
  if (riskScore >= 50) {
    return { label: 'Risiko Tinggi', color: '#D97706', bg: 'bg-amber-50', text: 'text-amber-700' };
  }
  if (riskScore >= 25) {
    return { label: 'Risiko Sedang', color: '#2563EB', bg: 'bg-blue-50', text: 'text-blue-700' };
  }
  return { label: 'Risiko Rendah', color: '#16A34A', bg: 'bg-emerald-50', text: 'text-emerald-700' };
}
