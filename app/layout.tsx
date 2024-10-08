import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '../components/globals.css';
import TokenChecker from '@/components/Core/TokenChecker';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Core/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Farm Assistant',
  description: 'Farm Assistant is a tool to help farmers manage their farms.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <Header />
        <TokenChecker />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
