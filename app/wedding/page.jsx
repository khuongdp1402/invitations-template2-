"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SplashScreen from '@/components/ui/SplashScreen';
import { weddingData } from '@/config/weddingData';

function WeddingContent() {
  const searchParams = useSearchParams();
  const side = searchParams.get('side');
  const name = searchParams.get('name');
  const role = searchParams.get('role');

  // Logic sắp xếp ưu tiên hiển thị theo nhà
  const sortedEvents = [...weddingData.events].sort((a, b) => {
    if (a.side === side) return -1;
    if (b.side === side) return 1;
    return 0;
  });

  return (
    <div className="min-h-screen p-8 bg-gray-50 text-gray-900 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#d4af37]">
        Thiệp Cưới Khương & Hiền
      </h1>
      
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Thông tin Khách mời</h2>
        <ul className="list-disc pl-5 mb-8 text-gray-700">
          <li><strong>Role:</strong> {role || 'Bạn'}</li>
          <li><strong>Name:</strong> {name || 'Khách mời'}</li>
          <li><strong>Side:</strong> {side === 'nhagai' ? 'Nhà Gái' : side === 'nhatrai' ? 'Nhà Trai' : 'Chưa xác định'}</li>
        </ul>

        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Thứ tự Sự kiện (Tự động ưu tiên)</h2>
        <div className="space-y-4">
          {sortedEvents.map(event => (
            <div key={event.id} className={`p-4 rounded-md border ${event.side === side ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-200'}`}>
              <h3 className="font-medium text-lg">{event.name}</h3>
              <p className="text-sm text-gray-600">{event.time} - {event.date}</p>
              <p className="text-sm text-gray-600">{event.location}</p>
              <p className="text-xs font-mono mt-2 text-gray-400">Target: {event.side}</p>
            </div>
          ))}
        </div>
      </div>
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
