"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SplashScreen from '@/components/ui/SplashScreen';
import StoryEngine from '@/components/StoryEngine';

function WeddingContent() {
  const searchParams = useSearchParams();
  const side = searchParams.get('side') || 'nhatrai';
  const name = searchParams.get('name') || 'Quý Khách';
  const role = searchParams.get('role') || '';

  return (
    <div className="min-h-screen text-gray-900 font-sans relative transition-colors duration-1000">
      <StoryEngine side={side} guestName={name} guestRole={role} />
    </div>
  );
}

export default function WeddingPage() {
  return (
    <Suspense fallback={<SplashScreen />}>
      <WeddingContent />
    </Suspense>
  );
}
