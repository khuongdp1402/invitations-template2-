"use client";

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Heart } from 'lucide-react';
import { weddingData } from '@/config/weddingData';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function TimelineSection({ side }) {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const pathRef = useRef(null);
  const iconRef = useRef(null);
  
  const [svgHeight, setSvgHeight] = useState(800);

  const currentSide = side === 'nhagai' ? 'nhagai' : 'nhatrai';
  const data = weddingData[currentSide];
  
  const dateStr = data.ceremony.dateSolar;
  const locationStr = data.ceremony.address;

  // Cố định 4 mốc thời gian
  const fixedEvents = [
    { id: 1, time: '09:00', name: 'Làm lễ', date: dateStr, location: locationStr },
    { id: 2, time: '10:00', name: 'Đón khách', date: dateStr, location: locationStr },
    { id: 3, time: '11:00', name: 'Nhập tiệc - Âm nhạc', date: dateStr, location: locationStr },
    { id: 4, time: '12:00', name: 'Chụp ảnh lưu niệm', date: dateStr, location: locationStr },
  ];

  useEffect(() => {
    if (containerRef.current) {
      setSvgHeight(containerRef.current.offsetHeight);
    }
  }, []);

  useGSAP(() => {
    // Animate the icon along the SVG path
    gsap.to(iconRef.current, {
      motionPath: {
        path: pathRef.current,
        align: pathRef.current,
        alignOrigin: [0.5, 0.5],
      },
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true
      }
    });

    // Reveal cards when scrolled into view
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
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, { scope: containerRef, dependencies: [svgHeight] });

  return (
    <section ref={containerRef} className="py-10 px-4 md:px-6 max-w-3xl mx-auto relative z-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-serif text-[#7a1f24] mb-3">Lịch trình Sự kiện</h2>
        <p className="text-[#4A3728]/60 text-sm font-light tracking-wide uppercase">Cùng chia vui cùng gia đình</p>
      </div>

      <div className="relative pl-6 md:pl-10 py-6">
        
        {/* SVG Path for Timeline */}
        <div className="absolute top-0 left-[-15px] md:left-[-3px] w-[50px] h-full pointer-events-none z-0">
          <svg width="50" height={svgHeight} className="overflow-visible">
            {/* The squiggly or straight line */}
            <path
              ref={pathRef}
              d={`M 25 0 Q 40 ${svgHeight * 0.25} 25 ${svgHeight * 0.5} T 25 ${svgHeight}`}
              fill="none"
              stroke="#D4AF37"
              strokeWidth="2"
              strokeDasharray="6 6"
            />
          </svg>
          
          <div ref={iconRef} className="absolute top-0 left-0 text-[#7a1f24] drop-shadow-md w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-transparent rounded-full border-2 border-[#D4AF37]">
            <Heart size={14} fill="#D4AF37" />
          </div>
        </div>

        <div className="space-y-8 relative z-10">
          {fixedEvents.map((event, index) => (
            <div 
              key={event.id} 
              ref={el => cardsRef.current[index] = el}
              className="relative"
            >
              <div className="bg-white/80 backdrop-blur-md p-4 md:p-6 rounded-2xl shadow-lg border border-white border-l-4 border-l-[#D4AF37] hover:-translate-y-1 transition-transform duration-300">
                <span className="inline-block px-3 py-1 bg-[#FFF8DC] text-[#7a1f24] text-xs font-semibold tracking-wider rounded-full mb-2 uppercase">
                  {event.time} | {event.date}
                </span>
                <h3 className="text-xl md:text-2xl font-serif text-[#4A3728] mb-1">{event.name}</h3>
                <p className="text-[#4A3728]/80 text-sm font-light leading-relaxed">{event.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
