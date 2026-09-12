import { NextResponse } from 'next/server';
import { store } from '@/lib/db/store';

export async function GET() {
  const episodes = store.getEpisodes();
  const simulations = store.getSimulations();

  const totalSimulatedCostDiff = simulations.reduce((acc, s) => {
    return acc + (s.result?.estimated_difference || 0);
  }, 0);

  const avgDiff = simulations.length > 0 ? Math.round(totalSimulatedCostDiff / simulations.length) : -1510000;

  // Breakdown by Province
  const provinceStats = [
    { province: 'D.I. Yogyakarta', episodes: 3, total_cost: 14570000, simulated_savings: 1850000 },
    { province: 'DKI Jakarta', episodes: 2, total_cost: 12050000, simulated_savings: 1640000 },
    { province: 'Jawa Tengah', episodes: 1, total_cost: 9750000, simulated_savings: 1320000 },
    { province: 'Jawa Barat', episodes: 1, total_cost: 6100000, simulated_savings: 910000 },
  ];

  // Breakdown by Provider Type
  const providerTypeStats = [
    { type: 'RSUP (Pusat Rujukan Nasional)', count: 3, avg_los: 5.3, avg_cost: 6590000, saving_potential: '18.2%' },
    { type: 'RSUD Kelas A & B', count: 3, avg_los: 6.3, avg_cost: 7450000, saving_potential: '16.5%' },
    { type: 'FKTP / Puskesmas Primer', count: 1, avg_los: 0.0, avg_cost: 350000, saving_potential: '5.1%' },
  ];

  // Breakdown by Diagnosis Group
  const diagnosisStats = [
    { group: 'Kardiovaskular', episodes: 1, baseline_cost: 8420000, simulated_cost: 6910000, saving_pct: 17.9 },
    { group: 'Neurologi / Stroke', episodes: 1, baseline_cost: 9750000, simulated_cost: 8210000, saving_pct: 15.8 },
    { group: 'Endokrin / Diabetes', episodes: 1, baseline_cost: 6800000, simulated_cost: 5780000, saving_pct: 15.0 },
    { group: 'Respirasi / Paru', episodes: 1, baseline_cost: 6100000, simulated_cost: 5120000, saving_pct: 16.1 },
  ];

  return NextResponse.json({
    data: {
      total_episodes_analyzed: episodes.length,
      total_simulations_conducted: simulations.length,
      estimated_aggregate_opportunity: Math.abs(totalSimulatedCostDiff) || 5720000,
      average_estimated_difference: avgDiff,
      by_province: provinceStats,
      by_provider_type: providerTypeStats,
      by_diagnosis_group: diagnosisStats,
    },
  });
}
