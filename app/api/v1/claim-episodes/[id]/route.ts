import { NextResponse } from 'next/server';
import { store } from '@/lib/db/store';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const episode = store.getEpisodeById(id);

  if (!episode) {
    return NextResponse.json(
      {
        message: `Episode klaim dengan ID/kode "${id}" tidak ditemukan.`,
        code: 'EPISODE_NOT_FOUND',
      },
      { status: 404 }
    );
  }

  // Audit log view
  store.addAuditLog({
    user_id: 1,
    user_name: 'Dr. Raditya Pratama, M.H.Kes',
    user_role: 'analyst',
    action: 'VIEW_EPISODE',
    resource_type: 'CLAIM_EPISODE',
    resource_id: episode.episode_code,
    status: 'SUCCESS',
    ip_address: '127.0.0.1',
  });

  return NextResponse.json({
    data: {
      ...episode,
      available_scenario_variables: [
        {
          variable: 'length_of_stay',
          label: 'Length of Stay (Lama Hari Rawat)',
          unit: 'hari',
          baseline_value: episode.length_of_stay,
          min_value: Math.max(1, episode.length_of_stay - 4),
          max_value: episode.length_of_stay + 7,
          step: 1,
          description: 'Simulasikan dampak optimasi durasi rawat inap terhadap estimasi biaya total.',
        },
        {
          variable: 'provider_scenario',
          label: 'Skenario Rujukan Faskes',
          unit: 'faskes',
          baseline_value: episode.provider_type,
          options: ['rsup', 'rsud_a', 'rsud_b', 'rsud_c'],
          description: 'Simulasikan efisiensi biaya apabila episode dialihkan ke faskes sekunder.',
        },
      ],
    },
  });
}
