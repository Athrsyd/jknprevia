import { NextResponse } from 'next/server';
import { INITIAL_USERS } from '@/lib/db/fixtures';

export async function GET() {
  const defaultUser = INITIAL_USERS[0];
  return NextResponse.json({
    data: {
      user: defaultUser,
    },
  });
}
