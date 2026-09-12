'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { BottomBar } from '@/components/layout/BottomBar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F5F5F7] flex">
      {/* Desktop Sidebar (Only on large screens, completely hidden on mobile/tablet) */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        {/* Generous bottom padding (pb-24 sm:pb-28 lg:pb-8) to accommodate the mobile bottom bar */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-28 lg:pb-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (Docked at bottom, strictly visible on mobile, hidden on lg screens) */}
      <BottomBar />
    </div>
  );
}
