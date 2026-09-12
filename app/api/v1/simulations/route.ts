import { NextResponse } from 'next/server';
import { store } from '@/lib/db/store';
import { ScenarioChange } from '@/lib/types';

export async function GET() {
  const list = store.getSimulations();
  return NextResponse.json({
    data: list,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { episode_id, changes } = body;

    if (!episode_id) {
      return NextResponse.json(
        {
          message: 'Parameter episode_id wajib disertakan.',
          code: 'SIMULATION_INVALID',
          errors: { episode_id: ['ID episode klaim tidak boleh kosong.'] },
        },
        { status: 422 }
      );
    }

    const episode = store.getEpisodeById(episode_id);
    if (!episode) {
      return NextResponse.json(
        {
          message: `Episode dengan ID ${episode_id} tidak ditemukan.`,
          code: 'EPISODE_NOT_FOUND',
        },
        { status: 404 }
      );
    }

    // Parse and normalize changes
    const scenarioChanges: ScenarioChange[] = (changes || []).map(
      (c: { variable: string; value: number | string; baseline?: number | string }) => ({
        variable: c.variable as ScenarioChange['variable'],
        baseline_value: c.baseline !== undefined ? c.baseline : episode.length_of_stay,
        new_value: c.value,
        unit: c.variable === 'length_of_stay' ? 'hari' : '',
      })
    );

    // Validate LOS bounds if present
    const losChange = scenarioChanges.find((c) => c.variable === 'length_of_stay');
    if (losChange) {
      const val = Number(losChange.new_value);
      if (isNaN(val) || val < 1 || val > 45) {
        return NextResponse.json(
          {
            message: 'Nilai variabel di luar batas yang diizinkan.',
            code: 'SIMULATION_INVALID',
            errors: {
              length_of_stay: ['Lama rawat inap harus bernilai antara 1 dan 45 hari.'],
            },
          },
          { status: 422 }
        );
      }
    }

    const record = await store.runSimulation(episode.id, scenarioChanges);

    return NextResponse.json(
      {
        data: record,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Gagal memproses simulasi counterfactual.';
    return NextResponse.json(
      {
        message: errMessage,
        code: 'SIMULATION_ENGINE_ERROR',
      },
      { status: 500 }
    );
  }
}
