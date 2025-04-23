'use client';

import React from 'react';
import { RecoilRoot } from 'recoil';
import '../../styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body >
        <RecoilRoot>
          <main className="min-h-screen bg-gray-50 py-8 bg-#F9FAFB">
            {children}
          </main>
        </RecoilRoot>
      </body>
    </html>
  );
}
