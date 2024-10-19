"use client";
import { SessionProvider } from 'next-auth/react'
import React from 'react'

import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default Providers