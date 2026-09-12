import { NextResponse } from 'next/server';
import { store } from '@/lib/db/store';

export async function GET() {
  const summary = store.getDashboardSummary();
  return NextResponse.json({
    data: summary,
  });
}
