'use client';

import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/auth');

  return isAuthPage ? null : <div className="bg-slate-600 p-4">Header</div>;
};

export default Header;
