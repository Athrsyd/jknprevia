import { NextResponse } from 'next/server';
import { store } from '@/lib/db/store';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || undefined;
  const province = searchParams.get('province') || undefined;
  const provider_type = searchParams.get('provider_type') || undefined;
  const diagnosis_group = searchParams.get('diagnosis_group') || undefined;
  const episode_type = searchParams.get('episode_type') || undefined;
  const risk_level = searchParams.get('risk_level') || undefined;
  const min_cost = searchParams.get('min_cost') ? Number(searchParams.get('min_cost')) : undefined;
  const max_cost = searchParams.get('max_cost') ? Number(searchParams.get('max_cost')) : undefined;
  const page = Number(searchParams.get('page')) || 1;
  const per_page = Number(searchParams.get('per_page')) || 10;

  const filtered = store.getEpisodes({
    search,
    province,
    provider_type,
    diagnosis_group,
    episode_type,
    risk_level,
    min_cost,
    max_cost,
  });

  const total = filtered.length;
  const startIdx = (page - 1) * per_page;
  const paginated = filtered.slice(startIdx, startIdx + per_page);

  return NextResponse.json({
    data: paginated,
    meta: {
      total,
      page,
      per_page,
      last_page: Math.ceil(total / per_page),
    },
  });
}
