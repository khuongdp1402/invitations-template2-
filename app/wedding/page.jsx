"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SplashScreen from '@/components/ui/SplashScreen';
import { weddingData } from '@/config/weddingData';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HandwritingText from '@/components/ui/transitions/HandwritingText';
import ColorBurstImage from '@/components/ui/transitions/ColorBurstImage';

gsap.registerPlugin(ScrollTrigger);

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
    <div className="min-h-screen pb-[20vh] bg-transparent text-gray-900 font-sans relative">
      {/* 1. Hero Section (tạm thời) */}
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center text-[#d4af37] drop-shadow-sm">
          Khương & Hiền
        </h1>
        <p className="text-lg text-gray-500 mb-8 tracking-widest uppercase">Wedding Invitation</p>
        <p className="text-sm text-gray-400 animate-bounce mt-20">Cuộn xuống để trải nghiệm</p>
      </div>

      {/* 2. The Launch Trigger */}
      <LaunchTrigger />

      {/* 3. Vùng chứa thông tin tĩnh (từ Phase 1) */}
      <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-xl border border-gray-100 relative z-10 my-32">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Thông tin Khách mời (Debug)</h2>
        <ul className="list-disc pl-5 mb-8 text-gray-700">
          <li><strong>Role:</strong> {role || 'Bạn'}</li>
          <li><strong>Name:</strong> {name || 'Khách mời'}</li>
          <li><strong>Side:</strong> {side === 'nhagai' ? 'Nhà Gái' : side === 'nhatrai' ? 'Nhà Trai' : 'Chưa xác định'}</li>
        </ul>

        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Thứ tự Sự kiện ưu tiên</h2>
        <div className="space-y-4">
          {sortedEvents.map(event => (
            <div key={event.id} className={`p-4 rounded-md border ${event.side === side ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-200'}`}>
              <h3 className="font-medium text-lg">{event.name}</h3>
              <p className="text-sm text-gray-600">{event.time} - {event.date}</p>
              <p className="text-sm text-gray-600">{event.location}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. The Handwriting Transition */}
      <div className="min-h-[60vh] flex items-center justify-center relative z-10">
        <HandwritingText />
      </div>

      {/* 5. The Color Burst Transition */}
      <div className="min-h-[100vh] relative z-10">
        <ColorBurstImage />
      </div>
    </div>
  );
}

// Component nhỏ đóng vai trò như một sensor (cảm biến)
function LaunchTrigger() {
  const triggerRef = React.useRef(null);
  
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: triggerRef.current,
      start: "top 50%", // Kích hoạt khi khối này cuộn đến giữa màn hình
      onEnter: () => {
        window.dispatchEvent(new CustomEvent('canvas:launch'));
      }
    });
  }, { scope: triggerRef });

  return <div ref={triggerRef} className="h-10 w-full" aria-hidden="true" />;
}

export default function WeddingPage() {
  return (
    <Suspense fallback={<SplashScreen />}>
      <WeddingContent />
    </Suspense>
  );
}
