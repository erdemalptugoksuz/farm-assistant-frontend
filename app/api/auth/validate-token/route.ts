import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

import { NEXT_PUBLIC_COOKIE_TOKEN_NAME, JWT_SECRET } from '@/utils/appConstants';

export async function GET() {
  const cookiesStore = cookies();

  if (!NEXT_PUBLIC_COOKIE_TOKEN_NAME) {
    return NextResponse.json({ valid: false, error: 'Cookie token name is not defined' }, { status: 400 });
  }

  const tempToken = cookiesStore.get(NEXT_PUBLIC_COOKIE_TOKEN_NAME);

  if (!tempToken || !tempToken.value) {
    return NextResponse.json({ valid: false, error: 'Token not found' }, { status: 404 });
  }

  try {
    const decoded = jwt.verify(tempToken.value, JWT_SECRET as string);

    return NextResponse.json({ valid: true, decoded }, { status: 200 });
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return NextResponse.json({ valid: false, error: 'Token expired' }, { status: 401 });
    }
    return NextResponse.json({ valid: false, error: 'Server Error' }, { status: 500 });
  }
}
