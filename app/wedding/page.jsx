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
import FamilySection from '@/components/sections/FamilySection';
import InvitationWords from '@/components/sections/InvitationWords';
import GallerySection from '@/components/sections/GallerySection';
import DraggableGallerySection from '@/components/sections/DraggableGallerySection';
import MouseTrailGallerySection from '@/components/sections/MouseTrailGallerySection';
import MapSection from '@/components/sections/MapSection';
import FloatingMusicPlayer from '@/components/ui/FloatingMusicPlayer';

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
      <FloatingMusicPlayer />

      {/* 1. Hero Section */}
      <HeroSection name={name} role={role} side={side} />

      {/* 2. The Launch Trigger (Ẩn) */}
      <LaunchTrigger />

      {/* 3. Lời mời tóm tắt & Chữ ký */}
      <div className="py-20 flex flex-col items-center justify-center relative z-10 bg-white/60 backdrop-blur-sm shadow-xl rounded-t-[3rem] -mt-10 border-t border-white">
        <HandwritingText />
      </div>

      {/* 4. Family Section (Nhà Trai - Nhà Gái) */}
      <FamilySection side={side} />

      {/* 5. Trân Trọng Kính Mời */}
      <InvitationWords />

      {/* 6. Typography Text Mask */}
      <TypographyBreak />

      {/* 7. Love Timeline */}
      <TimelineSection events={sortedEvents} />

      {/* 8. Calendar */}
      <CalendarSection />

      {/* 9. Gallery 1: Horizontal Scroll */}
      <GallerySection />

      {/* 9.1 Gallery 2: Draggable Polaroid */}
      <DraggableGallerySection />

      {/* 9.2 Gallery 3: Mouse Trail Reveal */}
      <MouseTrailGallerySection />

      {/* 10. The Color Burst Transition */}
      <div className="relative z-10 bg-[#F9F6F0] pt-20 pb-10 border-t border-gray-100">
        <ColorBurstImage />
      </div>

      {/* 11. Map */}
      <MapSection />

      {/* 12. RSVP Form */}
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
