import { NextResponse } from 'next/server';
import { store } from '@/lib/db/store';

export async function GET() {
  const logs = store.getAuditLogs();
  return NextResponse.json({
    data: logs,
  });
}
