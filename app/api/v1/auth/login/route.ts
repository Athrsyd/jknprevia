import { NextResponse } from 'next/server';
import { INITIAL_USERS } from '@/lib/db/fixtures';
import { store } from '@/lib/db/store';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    const user = INITIAL_USERS.find((u) => u.email.toLowerCase() === (email || '').toLowerCase()) || INITIAL_USERS[0];

    store.addAuditLog({
      user_id: user.id,
      user_name: user.name,
      user_role: user.role,
      action: 'LOGIN',
      resource_type: 'AUTH',
      resource_id: `usr-${user.id}`,
      status: 'SUCCESS',
      ip_address: '127.0.0.1',
    });

    return NextResponse.json({
      data: {
        user,
        token: `previa_jwt_token_${user.id}_${Date.now()}`,
      },
    });
  } catch {
    return NextResponse.json(
      { message: 'Gagal melakukan otentikasi pengguna.', code: 'AUTH_FAILED' },
      { status: 400 }
    );
  }
}
