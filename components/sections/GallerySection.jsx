"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingData } from '@/config/weddingData';
import { getDirectImageUrl } from '@/lib/utils/image';

gsap.registerPlugin(ScrollTrigger);

const IMG_URLS = weddingData.gallery || [];

export default function GallerySection() {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  useGSAP(() => {
    const totalWidth = scrollRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;
    
    gsap.to(scrollRef.current, {
      x: () => -(totalWidth - viewportWidth),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${totalWidth}`, // Cuộn dài bằng tổng độ rộng dải ảnh
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-transparent z-10 overflow-hidden border-t border-[#4A3728]/10">
      
      {/* Title */}
      <div className="absolute top-16 md:top-24 left-0 w-full z-20 pointer-events-none text-center">
        <p className="text-xs tracking-[0.3em] text-[#C06C59] font-semibold uppercase mb-4">Khoảnh Khắc</p>
        <h2 className="text-4xl md:text-5xl font-serif text-[#4A3728] drop-shadow-sm">Our Journey</h2>
      </div>

      {/* The Scroll Container */}
      <div className="flex items-center h-full pt-20 px-10 md:px-20 w-[max-content]" ref={scrollRef}>
        {IMG_URLS.map((url, i) => (
          <div key={i} className="relative w-[75vw] md:w-[35vw] h-[55vh] md:h-[65vh] flex-shrink-0 mr-8 md:mr-20 rounded-sm overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-8 border-white group">
            <Image 
              src={getDirectImageUrl(url)} 
              alt={`Memory ${i}`} 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105" 
              sizes="(max-width: 768px) 75vw, 35vw"
              unoptimized
            />
          </div>
        ))}
        {/* Empty padding at the end */}
        <div className="w-[10vw] flex-shrink-0" />
      </div>
    </section>
  );
}
