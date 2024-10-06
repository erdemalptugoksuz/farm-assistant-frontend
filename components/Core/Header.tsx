'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Cookies from 'js-cookie';

import { NEXT_PUBLIC_COOKIE_TOKEN_NAME } from '@/utils/appConstants';

const Header = () => {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/auth');
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    const accessToken = Cookies.get(NEXT_PUBLIC_COOKIE_TOKEN_NAME);
    setIsValidToken(!!accessToken);
  }, []);

  return (
    <>
      {!isAuthPage && (
        <div className="bg-slate-950 flex justify-between items-center p-3">
          <div className="flex items-center">
            <Image src="/assets/images/logo.png" alt="Logo" width={50} height={50} />
            <h1 className="text-slate-50 font-medium">Farm Assistant</h1>
          </div>
          <div className="flex items-center gap-8">
            {isValidToken ? (
              <Link className="text-slate-50" href="/farm">
                My Farm
              </Link>
            ) : (
              <>
                <Link className="text-slate-50" href="/auth/sign-in">
                  Sign In
                </Link>
                <button className="text-slate-50 bg-slate-600 rounded-3xl px-8 py-2" onClick={() => (window.location.href = '/auth/sign-up')}>
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
