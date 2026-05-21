"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TimelineSection({ events }) {
  const containerRef = useRef(null);
  const progressBarRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    // 1. Chạy thanh tiến trình vàng theo cuộn chuột
    gsap.to(progressBarRef.current, {
      scaleY: 1,
      transformOrigin: "top center",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true
      }
    });

    // 2. Hiện thẻ sự kiện khi thanh cuộn đi ngang qua
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(card, 
        { opacity: 0, x: -30 },
        {
          opacity: 1, 
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 70%", // Khi card lên tới 70% màn hình thì hiện ra
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 px-6 max-w-4xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif text-[#d4af37] mb-4">Lịch trình Sự kiện</h2>
        <p className="text-gray-500 font-light tracking-wide uppercase">Cùng chia vui cùng hai gia đình</p>
      </div>

      <div className="relative pl-6 md:pl-12 border-l-2 border-dashed border-amber-200 py-10">
        {/* Thanh Progress Bar vàng chạy đè lên border-l */}
        <div 
          ref={progressBarRef}
          className="absolute top-0 left-[-2px] w-[2px] h-full bg-gradient-to-b from-amber-200 via-[#d4af37] to-amber-200 scale-y-0"
        />

        <div className="space-y-16">
          {events.map((event, index) => (
            <div 
              key={event.id} 
              ref={el => cardsRef.current[index] = el}
              className="relative"
            >
              {/* Nút tròn trên timeline */}
              <div className="absolute -left-[33px] md:-left-[57px] top-4 w-4 h-4 rounded-full bg-white border-4 border-[#d4af37] shadow-lg shadow-amber-200/50" />
              
              <div className="bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-xl border border-white border-l-4 border-l-[#d4af37] hover:-translate-y-1 transition-transform duration-300">
                <span className="inline-block px-3 py-1 bg-amber-50 text-[#d4af37] text-sm font-semibold tracking-wider rounded-full mb-3 uppercase">
                  {event.time} | {event.date}
                </span>
                <h3 className="text-2xl md:text-3xl font-serif text-gray-800 mb-2">{event.name}</h3>
                <p className="text-gray-600 font-light leading-relaxed">{event.location}</p>
                {event.mapUrl && (
                  <a 
                    href={event.mapUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-block mt-4 text-sm font-medium text-[#d4af37] hover:text-amber-700 underline underline-offset-4 decoration-amber-300 transition-colors"
                  >
                    Xem bản đồ đường đi &rarr;
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
