"use client";

import React, { Suspense, useRef } from 'react';
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
  const containerRef = useRef(null);

  useGSAP(() => {
    // Dynamic Color-Blocking
    const sections = gsap.utils.toArray('.color-section');
    sections.forEach((section) => {
      const color = section.getAttribute('data-color');
      if (color) {
        ScrollTrigger.create({
          trigger: section,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => gsap.to(containerRef.current, { backgroundColor: color, duration: 1, ease: "power2.out" }),
          onEnterBack: () => gsap.to(containerRef.current, { backgroundColor: color, duration: 1, ease: "power2.out" }),
        });
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen text-gray-900 font-sans relative transition-colors duration-1000" style={{ backgroundColor: "#800020" }}>
      <FloatingMusicPlayer />

      {/* 0. Envelope Welcome Screen */}
      <EnvelopeWelcome guestName={name} side={side} />

      {/* 1. Hero Section */}
      <div className="color-section" data-color="#800020">
        <HeroSection name={name} role={role} side={side} />
      </div>

      {/* 2. The Launch Trigger (Ẩn) */}
      <LaunchTrigger />

      {/* 3. Lịch & Ảnh Sương Mù (2 cột) */}
      <div className="color-section relative z-10 max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-center gap-10" data-color="#FFF5E1">
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
      <div className="color-section" data-color="#F5F5F5">
        <GallerySection />
      </div>

      {/* 5. Family Section (Nhà Trai - Nhà Gái) */}
      <div className="color-section" data-color="#FFF5E1">
        <FamilySection side={side} />
      </div>

      {/* 6. Trân Trọng Kính Mời */}
      <div className="color-section" data-color="#FDF5E6">
        <InvitationWords name={name} role={role} />
      </div>

      {/* 7. Gallery 2: Scrapbook (Candid Memories) */}
      <div className="color-section" data-color="#8B7355">
        <DraggableGallerySection />
      </div>

      {/* 8. Love Timeline */}
      <div className="color-section" data-color="#F5F5F5">
        <TimelineSection side={side} />
      </div>

      {/* 9. Gallery 3: Phép Màu */}
      <div className="color-section" data-color="#FFF5E1">
        <MouseTrailGallerySection />
      </div>

      {/* 10. RSVP Form */}
      <div className="color-section" data-color="#FFFFFF">
        <RsvpSection name={name} />
      </div>

      {/* 11. Map */}
      <div className="color-section" data-color="#FDF5E6">
        <MapSection />
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
