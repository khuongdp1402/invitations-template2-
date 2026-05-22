"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HandwritingText() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);

  useGSAP(() => {
    const path = pathRef.current;
    if (!path) return;

    // Lấy chiều dài thực tế của nét vẽ SVG
    const length = path.getTotalLength();

    // Ẩn nét vẽ ban đầu bằng cách đẩy dash offset ra khỏi dash array
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length
    });

    // Kéo nét vẽ về 0 khi cuộn tới
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 3,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        // scrub: 1, // Tuỳ chọn: scrub để vẽ theo scroll, hoặc bỏ scrub để tự động vẽ 1 lần
      }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="flex justify-center items-center py-20">
      <svg 
        width="400" 
        height="150" 
        viewBox="0 0 400 150" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-lg"
      >
        {/* Một nét SVG mẫu giả lập chữ Love lả lướt */}
        <path 
          ref={pathRef}
          d="M 50 100 C 50 20, 150 20, 150 100 C 150 150, 250 150, 250 80 C 250 10, 350 10, 350 100" 
          stroke="#D48C70" 
          strokeWidth="4" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
