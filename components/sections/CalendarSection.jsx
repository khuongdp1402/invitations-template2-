"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CalendarSection() {
  const containerRef = useRef(null);
  const circleRef = useRef(null);

  // Mảng các ngày trong tháng 6/2026. 
  // Tháng 6/2026 bắt đầu vào thứ Hai, có 30 ngày.
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const blankDays = []; // Tháng 6/2026 bắt đầu thứ Hai, nên không cần ô trống đầu (nếu T2 là ô đầu tiên)

  // Nếu cột bắt đầu từ Chủ Nhật (Sunday) thì T6/2026 bắt đầu bằng thứ Hai -> 1 ô trống.
  const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  const paddingDays = Array.from({ length: 1 }, (_, i) => i);

  useGSAP(() => {
    const circle = circleRef.current;
    if (!circle) return;

    const length = circle.getTotalLength();
    gsap.set(circle, {
      strokeDasharray: length,
      strokeDashoffset: length,
      opacity: 0
    });

    gsap.to(circle, {
      strokeDashoffset: 0,
      opacity: 1,
      duration: 1.5,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%", // Bắt đầu khoanh tròn khi cuộn đến 60%
      }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 px-4 relative z-10">
      <div className="max-w-md mx-auto bg-[#FAF3F0]/60 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-white">
        <div className="text-center mb-8">
          <p className="text-sm tracking-[0.2em] uppercase text-[#4A3728]/60 mb-2">Save the Date</p>
          <h2 className="text-4xl font-serif text-[#C06C59]">Tháng 6 . 2026</h2>
        </div>

        {/* Lưới Lịch */}
        <div className="grid grid-cols-7 gap-2 text-center mb-4">
          {weekDays.map(day => (
            <div key={day} className="text-xs font-bold text-[#4A3728]/60">{day}</div>
          ))}
          
          {paddingDays.map(pad => (
            <div key={`pad-${pad}`} className="p-2" />
          ))}

          {days.map(day => {
            // Ngày cưới là 6 và 7
            const isWeddingDay = day === 6 || day === 7;
            
            return (
              <div 
                key={day} 
                className={`p-2 relative flex items-center justify-center text-sm md:text-base font-medium
                  ${isWeddingDay ? 'text-gray-900' : 'text-[#4A3728]/60'}
                `}
              >
                {day}
                
                {/* SVG Khoanh vùng quanh ngày 6 và 7 */}
                {day === 6 && (
                  <svg 
                    className="absolute z-[-1] overflow-visible w-[220%] h-[150%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    viewBox="0 0 100 50" 
                    fill="none"
                  >
                    {/* Vẽ một hình oval bọc lấy cả 2 ô (Ngày 6 và 7 kề nhau) */}
                    <path 
                      ref={circleRef}
                      d="M 20 25 C 20 5, 80 5, 80 25 C 80 45, 20 45, 20 25 Z" 
                      stroke="#D48C70" 
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-8 space-y-2">
          <p className="font-serif text-lg text-[#4A3728]">Lễ Tân Hôn & Vu Quy</p>
          <p className="text-sm font-light text-[#4A3728]/60 tracking-wide uppercase">06 & 07 Tháng 06 Năm 2026</p>
        </div>
      </div>
    </section>
  );
}
