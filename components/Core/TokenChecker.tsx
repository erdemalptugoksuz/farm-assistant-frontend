'use client';

import { useEffect } from 'react';
import Cookies from 'js-cookie';

import { NEXT_PUBLIC_COOKIE_TOKEN_NAME } from '@/utils/appConstants';

const TokenChecker = () => {
  useEffect(() => {
    const checkToken = async () => {
      try {
        console.log('Checking token...');
        if (!NEXT_PUBLIC_COOKIE_TOKEN_NAME) {
          console.log('No token name found...');
          return;
        }
        const accessToken = Cookies.get(NEXT_PUBLIC_COOKIE_TOKEN_NAME);
        if (!accessToken) {
          console.log('No token found...');
          return;
        }
        console.log('Checking token...');

        const response = await fetch('/api/auth/validate-token', {
          method: 'POST',
          body: JSON.stringify({ token: accessToken }),
        });

        if (response.status === 401) {
          console.log('Token expired, refreshing...');
          const refreshResponse = await fetch('/api/auth/refresh-token');
          if (refreshResponse.status !== 200) {
            window.location.href = '/api/auth/sign-out';
            console.log('Token refresh failed, signing out...');
          }
        } else if (response.status === 500) {
          window.location.href = '/api/auth/sign-out';
          console.log('Token validation failed, signing out');
        }
      } catch (error) {
        console.error('Error while checking token:', error);
      }
    };

    const interval = setInterval(checkToken, 1800000);
    // const interval = setInterval(checkToken, 120000); // 3 seconds for testing purposes
    return () => clearInterval(interval);
  }, []);

  return null;
};

export default TokenChecker;
