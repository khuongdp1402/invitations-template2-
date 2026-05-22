"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SplashScreen from '@/components/ui/SplashScreen';
import { weddingData } from '@/config/weddingData';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ColorBurstImage from '@/components/ui/transitions/ColorBurstImage';
import EnvelopeWelcome from '@/components/ui/transitions/EnvelopeWelcome';

import HeroSection from '@/components/sections/HeroSection';
import TimelineSection from '@/components/sections/TimelineSection';
import CalendarSection from '@/components/sections/CalendarSection';
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

  // Bỏ logic sortedEvents cũ vì giờ sẽ dùng fix cứng trong TimelineSection

  return (
    <div className="min-h-screen bg-transparent text-gray-900 font-sans relative">
      <FloatingMusicPlayer />

      {/* 0. Envelope Welcome Screen */}
      <EnvelopeWelcome guestName={name} side={side} />

      {/* 1. Hero Section */}
      <HeroSection name={name} role={role} side={side} />

      {/* 2. The Launch Trigger (Ẩn) */}
      <LaunchTrigger />



      {/* 3. Lịch & Ảnh Sương Mù (2 cột) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-center gap-10">
        <div className="w-full md:w-1/2 flex justify-end">
          <CalendarSection side={side} />
        </div>
        <div className="w-full md:w-1/2 flex justify-start">
          <div className="w-full max-w-md">
            <ColorBurstImage />
          </div>
        </div>
      </div>

      {/* 4. Gallery 1: Khoảnh Khắc */}
      <GallerySection />

      {/* 5. Family Section (Nhà Trai - Nhà Gái) */}
      <FamilySection side={side} />

      {/* 6. Trân Trọng Kính Mời */}
      <InvitationWords name={name} role={role} />

      {/* 7. Gallery 2: Scrapbook */}
      <DraggableGallerySection />

      {/* 8. Love Timeline */}
      <TimelineSection side={side} />

      {/* 9. Gallery 3: Phép Màu */}
      <MouseTrailGallerySection />

      {/* 10. RSVP Form */}
      <RsvpSection name={name} />

      {/* 11. Map */}
      <MapSection />
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
