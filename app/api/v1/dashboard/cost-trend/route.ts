import { NextResponse } from 'next/server';
import { store } from '@/lib/db/store';

export async function GET() {
  const summary = store.getDashboardSummary();
  return NextResponse.json({
    data: {
      cost_trend: summary.cost_trend,
      risk_distribution: summary.risk_distribution,
    },
  });
}
