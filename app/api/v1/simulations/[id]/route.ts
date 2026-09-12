import { NextResponse } from 'next/server';
import { store } from '@/lib/db/store';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const sim = store.getSimulationById(id);

  if (!sim) {
    return NextResponse.json(
      {
        message: `Simulasi dengan ID/kode "${id}" tidak ditemukan.`,
        code: 'SIMULATION_NOT_FOUND',
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    data: sim,
  });
}
