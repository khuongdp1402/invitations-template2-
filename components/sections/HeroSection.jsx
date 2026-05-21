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
  const pathRef = useRef(null);
  
  const currentSide = side === 'nhagai' ? 'nhagai' : 'nhatrai';
  const data = weddingData[currentSide];
  const order = data.displayOrder || ['groom', 'bride'];
  
  const leftName = order[0] === 'groom' ? weddingData.couple.groom.firstName : weddingData.couple.bride.firstName;
  const rightName = order[1] === 'groom' ? weddingData.couple.groom.firstName : weddingData.couple.bride.firstName;

  useGSAP(() => {
    // Parallax effect on the background image
    gsap.to(bgRef.current, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Handwriting effect
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut",
        delay: 0.5
      });
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden flex flex-col md:flex-row bg-[#FAF8F5]">
      {/* Lớp nền Parallax / Ảnh chính (80% on desktop) */}
      <div className="relative w-full md:w-4/5 h-[70vh] md:h-full overflow-hidden">
        <div ref={bgRef} className="absolute inset-0 w-full h-[120%] -top-[10%] z-0">
          <Image 
            src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1920&auto=format&fit=crop"
            alt="Wedding Hero"
            fill
            className="object-cover object-[left_center]"
            priority
            unoptimized
          />
          {/* Lớp mờ rất nhẹ */}
          <div className="absolute inset-0 bg-black/10" />
        </div>
        
        {/* Nội dung Tên */}
        <div className="absolute inset-0 z-10 flex flex-col items-center md:items-start justify-center text-center md:text-left px-8 text-white w-full h-full md:pl-20">
          <p className="text-sm md:text-base tracking-[0.3em] uppercase mb-4 opacity-90 drop-shadow-md font-light text-[#d4af37]">
            Tân Lang & Tân Nương
          </p>
          
          <h1 className="text-7xl md:text-9xl font-calligraphy mb-2 drop-shadow-lg text-[#d4af37] leading-tight">
            {leftName} <br className="md:hidden" /> <span className="hidden md:inline"> & </span> {rightName}
          </h1>

          {/* SVG Handwriting Cursive stroke */}
          <svg className="w-64 md:w-96 h-16 mt-2" viewBox="0 0 400 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path ref={pathRef} d="M10,80 Q100,-20 200,60 T380,50" stroke="#d4af37" strokeWidth="4" strokeLinecap="round" className="drop-shadow-md" />
          </svg>
        </div>
      </div>

      {/* Cột 20% bên phải chứa Save The Date (chồng lên trên ở mobile, cạnh nhau ở desktop) */}
      <div className="relative md:w-1/5 w-full h-[30vh] md:h-full z-20 flex items-center justify-center md:border-l border-[#d4af37]/20 bg-white/60 backdrop-blur-xl md:backdrop-blur-md">
        <div className="text-center px-6 py-8">
          <p className="mb-2 text-gray-500 uppercase tracking-widest text-xs font-semibold">Save the date</p>
          <div className="w-12 h-[1px] bg-[#d4af37] mx-auto mb-4" />
          <p className="font-serif text-3xl md:text-4xl text-gray-800 mb-2">
            {data.ceremony.dateSolar}
          </p>
          <p className="text-xs text-gray-500">Nhằm ngày {data.ceremony.dateLunar}</p>
        </div>
      </div>
    </section>
  );
}
