"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { weddingData } from '@/config/weddingData';

export default function HeroSection({ name, role, side }) {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  
  const currentSide = side === 'nhagai' ? 'nhagai' : 'nhatrai';
  const data = weddingData[currentSide];
  const order = data.displayOrder || ['groom', 'bride'];
  
  const leftName = order[0] === 'groom' ? weddingData.couple.groom.firstName : weddingData.couple.bride.firstName;
  const rightName = order[1] === 'groom' ? weddingData.couple.groom.firstName : weddingData.couple.bride.firstName;

  useGSAP(() => {
    // Hiệu ứng Parallax: Ảnh nền trượt chậm hơn so với khi cuộn trang
    gsap.to(bgRef.current, {
      yPercent: 30, // Dịch chuyển ảnh 30% chiều cao của nó
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Lớp nền Parallax */}
      <div 
        ref={bgRef} 
        className="absolute inset-0 w-full h-[130%] -top-[15%] z-0"
      >
        <Image 
          src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1920&auto=format&fit=crop"
          alt="Wedding Hero"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        {/* Lớp mờ rất nhẹ chỉ để chữ không bị chìm hoàn toàn vào nền trắng của váy cưới */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Lớp Nội dung */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 text-white w-full h-full pb-20">
        <p className="text-sm md:text-base tracking-[0.3em] uppercase mb-4 opacity-90 drop-shadow-md font-light text-[#d4af37]">
          Tân Lang & Tân Nương
        </p>
        
        <h1 className="text-7xl md:text-9xl font-calligraphy mb-6 drop-shadow-lg text-[#d4af37] leading-tight">
          {leftName} <br className="md:hidden" /> <span className="hidden md:inline"> & </span> {rightName}
        </h1>
        
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#d4af37]/70 to-transparent mb-6" />

        <div className="text-lg md:text-xl font-light tracking-wide bg-black/20 backdrop-blur-sm px-8 py-4 rounded-2xl border border-white/10 shadow-xl">
          <p className="mb-1 text-gray-200">Save the date</p>
          <p className="font-semibold text-2xl text-white">
            {data.ceremony.dateSolar}
          </p>
          <p className="mt-1 text-sm text-gray-300">Nhằm ngày {data.ceremony.dateLunar}</p>
        </div>
      </div>
    </section>
  );
}
