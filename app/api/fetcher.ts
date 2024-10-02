'use server';

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { NEXT_PUBLIC_COOKIE_TOKEN_NAME } from '@/utils/appConstants';

interface FetcherParams {
  url: string;
  body?: any;
  methodType: 'GET' | 'POST' | 'PUT' | 'DELETE';
  bodyType?: 'json' | 'formData';
  isLogin?: boolean;
}

interface FetchResponse {
  data?: any;
  error?: string;
  status?: number;
}

const fetcherWithTokenAndBody = async ({ url, body, methodType, bodyType = 'json', isLogin = false }: FetcherParams): Promise<FetchResponse> => {
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get(NEXT_PUBLIC_COOKIE_TOKEN_NAME || '');
  const headers: Record<string, string> = {};

  if (!tokenCookie && !isLogin) {
    return NextResponse.json({ error: 'Unauthorized!' }, { status: 401 });
  }

  if (!isLogin) {
    headers.Authorization = `Bearer ${tokenCookie?.value}`;
  }

  if (bodyType === 'json') {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const response = await fetch(url, {
      method: methodType,
      headers,
      body,
    });

    const status = response.status;

    if (status === 401) {
      return NextResponse.json({ error: 'Unauthorized!' }, { status: 401 });
    }

    const data = await response.json();
    return { data, status };
  } catch (error) {
    return NextResponse.json({ error: 'Network error or invalid response' }, { status: 500 });
  }
};

export const fetchToApi = async (params: FetcherParams): Promise<FetchResponse> => {
  return fetcherWithTokenAndBody(params);
};
