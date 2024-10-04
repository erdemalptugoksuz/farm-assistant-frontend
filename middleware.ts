import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { NEXT_PUBLIC_COOKIE_TOKEN_NAME, frontendUrl } from '@/utils/appConstants';

async function validateToken(token: string) {
  try {
    const response = await fetch(`${frontendUrl}/api/auth/validate-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      throw new Error('Token validation failed');
    }

    const data = await response.json();
    return data.valid;
  } catch (error) {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const cookieStore = cookies();
  if (!NEXT_PUBLIC_COOKIE_TOKEN_NAME) {
    return NextResponse.next();
  }
  const token = cookieStore.get(NEXT_PUBLIC_COOKIE_TOKEN_NAME)?.value || '';
  const urlWithoutParams = req.nextUrl.pathname;

  if (urlWithoutParams === '/auth/sign-in' || urlWithoutParams === '/auth/sign-up') {
    const isValidToken = token ? await validateToken(token) : false;
    if (isValidToken) {
      return NextResponse.redirect(`${frontendUrl}`);
    }
  }
}
