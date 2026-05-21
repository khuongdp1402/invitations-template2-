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

import HeroSection from '@/components/sections/HeroSection';
import TimelineSection from '@/components/sections/TimelineSection';
import CalendarSection from '@/components/sections/CalendarSection';
import TypographyBreak from '@/components/sections/TypographyBreak';
import RsvpSection from '@/components/sections/RsvpSection';

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
    <div className="min-h-screen bg-transparent text-gray-900 font-sans relative">
      {/* 1. Hero Section */}
      <HeroSection name={name} role={role} />

      {/* 2. The Launch Trigger (Ẩn) */}
      <LaunchTrigger />

      {/* 3. Lời mời tóm tắt & Chữ ký */}
      <div className="py-20 flex flex-col items-center justify-center relative z-10 bg-white/60 backdrop-blur-sm shadow-xl rounded-t-[3rem] -mt-10 border-t border-white">
        <p className="text-center text-gray-500 font-light px-6 max-w-2xl leading-relaxed mb-8">
          Tình yêu là một hành trình dài. Thật hạnh phúc vì trên chặng đường sắp tới, chúng tôi có bạn cùng chung vui.
        </p>
        <HandwritingText />
      </div>

      {/* 4. Typography Text Mask */}
      <TypographyBreak />

      {/* 5. Love Timeline */}
      <TimelineSection events={sortedEvents} />

      {/* 6. Calendar */}
      <CalendarSection />

      {/* 7. The Color Burst Transition */}
      <div className="relative z-10 bg-white/30 backdrop-blur-md pt-20 pb-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif text-gray-800">Khoảnh khắc đáng nhớ</h2>
        </div>
        <ColorBurstImage />
      </div>

      {/* 8. RSVP Form */}
      <RsvpSection name={name} />
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
