'use client';

import React from 'react';
import { AppShell } from '@/components/app-shell';
import { AuthProvider } from '@/hooks/use-auth';
import Dashboard from '@/components/dashboard';

export default function Page() {
  return (
    <AuthProvider>
      <AppShell>
        <Dashboard />
      </AppShell>
    </AuthProvider>
  );
}
