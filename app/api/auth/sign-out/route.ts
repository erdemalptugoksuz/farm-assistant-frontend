'use server';

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { frontendUrl, NEXT_PUBLIC_COOKIE_TOKEN_NAME } from '@/utils/appConstants';

export async function GET() {
  const cookieStore = cookies();

  if (NEXT_PUBLIC_COOKIE_TOKEN_NAME) {
    cookieStore.delete(NEXT_PUBLIC_COOKIE_TOKEN_NAME);
  }

  if (frontendUrl) {
    return NextResponse.redirect(frontendUrl, { status: 302 });
  } else {
    console.error('frontendUrl is undefined');
    return NextResponse.json({ error: 'frontendUrl is undefined' }, { status: 500 });
  }
}
