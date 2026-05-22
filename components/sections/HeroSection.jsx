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
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden flex flex-col md:flex-row bg-transparent">
      {/* Lớp nền Parallax / Ảnh chính (80% on desktop) */}
      <div className="relative w-full md:w-4/5 h-[60vh] md:h-full overflow-hidden">
        <div ref={bgRef} className="absolute inset-0 w-full h-[120%] -top-[10%] z-0">
          <Image 
            src="/z7849785668787_545076eb7332d020812634ff21635017.jpg"
            alt="Wedding Hero"
            fill
            className="object-cover object-[left_center]"
            priority
            unoptimized
          />
          {/* Lớp mờ rất nhẹ */}
          <div className="absolute inset-0 bg-black/5" />
        </div>
      </div>

      {/* Cột 20% bên phải chứa Tên & Save The Date (chồng lên trên ở mobile, cạnh nhau ở desktop) */}
      <div className="relative md:w-1/5 w-full py-12 md:py-0 md:h-full z-20 flex flex-col items-center justify-center md:border-l border-[#D48C70]/20 bg-[#FAF3F0]/60 backdrop-blur-xl md:backdrop-blur-md">
        
        {/* Tên Cô Dâu Chú Rể */}
        <div className="text-center px-4 mb-8">
          <p className="text-xs md:text-[10px] lg:text-xs tracking-[0.2em] uppercase mb-4 opacity-90 font-semibold text-[#C06C59]">
            Tân Lang & Tân Nương
          </p>
          
          <h1 className="text-6xl md:text-5xl lg:text-6xl font-calligraphy text-[#C06C59] leading-[1.2] flex flex-col items-center">
            <span>{leftName}</span>
            <span className="text-4xl md:text-3xl lg:text-4xl my-2 font-light">&</span>
            <span>{rightName}</span>
          </h1>

          <svg className="w-40 md:w-32 lg:w-48 h-10 mt-2 mx-auto" viewBox="0 0 400 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path ref={pathRef} d="M10,80 Q100,-20 200,60 T380,50" stroke="#D48C70" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>

        {/* Save The Date */}
        <div className="text-center px-6 mt-4">
          <p className="mb-2 text-[#4A3728]/60 uppercase tracking-[0.2em] text-[10px] md:text-[9px] lg:text-[10px] font-semibold">Save the date</p>
          <div className="w-12 h-[1px] bg-[#D48C70] mx-auto mb-4" />
          <p className="font-serif text-3xl md:text-2xl lg:text-3xl text-[#4A3728] mb-2">
            {data.ceremony.dateSolar}
          </p>
          <p className="text-[11px] md:text-[10px] lg:text-[11px] text-[#4A3728]/60">Nhằm ngày {data.ceremony.dateLunar}</p>
        </div>
      </div>
    </section>
  );
}
