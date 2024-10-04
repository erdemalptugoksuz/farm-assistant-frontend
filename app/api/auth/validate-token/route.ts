import { NextRequest, NextResponse } from 'next/server';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

import { JWT_SECRET } from '@/utils/appConstants';

export async function POST(req: NextRequest) {
  try {
    const token = await req.json();
    const decoded = jwt.verify(token.token, JWT_SECRET as string);

    return NextResponse.json({ valid: true, decoded }, { status: 200 });
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return NextResponse.json({ valid: false, error: 'Token expired' }, { status: 401 });
    }
    return NextResponse.json({ valid: false, error: 'Server Error' }, { status: 500 });
  }
}
