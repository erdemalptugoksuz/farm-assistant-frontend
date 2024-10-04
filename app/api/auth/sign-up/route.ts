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
      url: authEndpoint.signUp,
      methodType: 'POST',
      body: JSON.stringify(params),
      isLogin: true,
    });

    if (response && response.status === 401) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (response && response.data.status) {
      const token = response.data.data.access_token;

      if (NEXT_PUBLIC_COOKIE_TOKEN_NAME && token) {
        cookieStore.set(NEXT_PUBLIC_COOKIE_TOKEN_NAME, token);
      } else {
        return NextResponse.json({ error: 'Invalid cookie name or token' }, { status: 400 });
      }

      return NextResponse.json(response.data, { status: response.status });
    } else {
      return NextResponse.json({ error: response.data.message }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: `Error: ${error}` }, { status: 500 });
  }
}
