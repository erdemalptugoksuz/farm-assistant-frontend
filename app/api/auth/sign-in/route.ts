'use server';

import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';

import { fetchToApi } from '../../fetcher';
import { authEndpoint } from '../../endpoint';
import { NEXT_PUBLIC_COOKIE_TOKEN_NAME } from '@/utils/appConstants';

export async function POST(req: NextRequest) {
  const params = await req.json();
  const cookieStore = cookies();

  try {
    const response = await fetchToApi({
      url: authEndpoint.signIn,
      methodType: 'POST',
      body: JSON.stringify(params),
      isLogin: true,
    });

    if (response && response.status === 401) {
      return NextResponse.json({ error: 'Email or password wrong!' }, { status: 401 });
    }

    if (response && response.status) {
      const token = response.data.data.access_token;

      if (NEXT_PUBLIC_COOKIE_TOKEN_NAME && token) {
        cookieStore.set(NEXT_PUBLIC_COOKIE_TOKEN_NAME, token);
      } else {
        return NextResponse.json({ error: 'Invalid cookie name or token' }, { status: 400 });
      }

      return NextResponse.json(response.data, { status: response.status });
    } else {
      return NextResponse.json({ error: 'Error fetching sources' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Critical error occurred' }, { status: 500 });
  }
}
