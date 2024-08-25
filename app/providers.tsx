'use client';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { Navbar } from '@/components/Navbar';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
};