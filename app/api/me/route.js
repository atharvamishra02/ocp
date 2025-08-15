import { getMe } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const user = await getMe(request);
  
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  
  return NextResponse.json(user);
}