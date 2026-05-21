"use client";

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function TimelineSection({ events }) {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const pathRef = useRef(null);
  const iconRef = useRef(null);
  
  const [svgHeight, setSvgHeight] = useState(1000);

  useEffect(() => {
    if (containerRef.current) {
      setSvgHeight(containerRef.current.offsetHeight);
    }
  }, [events]);

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
    <section ref={containerRef} className="py-32 px-6 max-w-4xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif text-[#d4af37] mb-4">Lịch trình Sự kiện</h2>
        <p className="text-gray-500 font-light tracking-wide uppercase">Cùng chia vui cùng hai gia đình</p>
      </div>

      <div className="relative pl-6 md:pl-12 py-10">
        
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
          
          {/* The moving icon */}
          <div ref={iconRef} className="absolute top-0 left-0 text-[#d4af37] drop-shadow-md w-8 h-8 flex items-center justify-center bg-white rounded-full border-2 border-[#d4af37]">
            <Heart size={16} fill="#d4af37" />
          </div>
        </div>

        <div className="space-y-16 relative z-10">
          {events.map((event, index) => (
            <div 
              key={event.id} 
              ref={el => cardsRef.current[index] = el}
              className="relative"
            >
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
