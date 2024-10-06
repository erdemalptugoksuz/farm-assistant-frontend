'use server';

import { NextResponse, NextRequest } from 'next/server';

import { fetchToApi } from '../../fetcher';
import { farmEndpoint } from '../../endpoint';

export async function POST(req: NextRequest) {
  const params = await req.json();

  try {
    const response = await fetchToApi({
      url: farmEndpoint.crudFarm,
      methodType: 'POST',
      body: JSON.stringify(params),
    });

    if (response && response.status === 401) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (response && response.status) {
      return NextResponse.json(response.data, { status: response.status });
    } else {
      return NextResponse.json({ error: 'Error fetching sources' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: `Critical error occurred: ${error}` }, { status: 500 });
  }
}
