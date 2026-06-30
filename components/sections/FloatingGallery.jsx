"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Vị trí cố định tối ưu hóa khoảng trống
const POSITIONS = [
  { top: "28%", left: "4%",  rotate: -4,  size: "lg" },
  { top: "26%", left: "53%", rotate: 3,   size: "lg" },
  { top: "50%", left: "6%",  rotate: -2,  size: "md" },
  { top: "47%", left: "56%", rotate: 5,   size: "lg" },
  { top: "72%", left: "10%", rotate: -5,  size: "lg" },
  { top: "74%", left: "52%", rotate: 2,   size: "md" },
];

export default function FloatingGallery({ chapter }) {
  const containerRef = useRef(null);
  const triggersRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const memories = containerRef.current?.querySelectorAll(".floating-memory");
    if (!memories) return;

    const triggers = [];
    memories.forEach((memory) => {
      const speed = parseFloat(memory.getAttribute("data-speed") || "1");
      const yValue = (1 - speed) * 100;

      const t = ScrollTrigger.create({
        trigger: memory.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        animation: gsap.to(memory, {
          yPercent: yValue,
          ease: "none",
        }),
      });
      triggers.push(t);
    });

    triggersRef.current = triggers;

    const quoteEl = containerRef.current?.querySelector(".text-reveal-quote");
    if (quoteEl) {
      const words = quoteEl.querySelectorAll(".text-reveal-word");
      if (words.length > 0) {
        const textTrigger = ScrollTrigger.create({
          trigger: quoteEl,
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
          animation: gsap.to(words, {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            ease: "power2.out",
          }),
        });
        triggersRef.current.push(textTrigger);
      }
    }

    return () => {
      triggersRef.current.forEach(t => t.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ minHeight: "max(180vh, 1000px)" }}
    >
      {/* Title */}
      <div className="relative z-20 text-center pt-[12vh] pointer-events-none">
        <h2 className="text-[80px] md:text-[120px] font-[family-name:var(--font-serif-display)] leading-none tracking-tighter text-[var(--color-text-primary)]" style={{ textShadow: '0 2px 30px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.4)' }}>
          {chapter.title}
        </h2>
        {chapter.quote && (
          <p className="text-reveal-quote mt-6 text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-sans text-[var(--color-text-secondary)]" style={{ textShadow: '0 1px 10px rgba(255,255,255,0.8)' }}>
            {chapter.quote.split(" ").map((word, i) => (
              <span key={i} className="text-reveal-word inline-block opacity-0 mr-[0.35em]">
                {word}
              </span>
            ))}
          </p>
        )}
      </div>

      {/* Floating Images */}
      {chapter.images.map((src, index) => {
        const pos = POSITIONS[index % POSITIONS.length];
        const speed = chapter.parallaxSpeed?.[index] || (index % 2 === 0 ? 0.85 : 1.15);

        const widthClass =
          pos.size === "lg" ? "w-[60vw] md:w-[32vw]" :
          pos.size === "md" ? "w-[50vw] md:w-[26vw]" :
                              "w-[40vw] md:w-[20vw]";

        return (
          <div
            key={index}
            className={`floating-memory absolute ${widthClass} will-change-transform`}
            data-speed={speed}
            style={{
              top: pos.top,
              left: pos.left,
              transform: `rotate(${pos.rotate}deg)`,
            }}
          >
            {/* Polaroid frame (using natural aspect ratio img tag) */}
            <div className="w-full bg-white p-[6px] pb-[20px] md:pb-[30px] shadow-2xl rounded-sm border border-gray-100/50">
              <img
                src={src}
                alt={`Kỷ niệm ${index + 1}`}
                className="w-full h-auto block rounded-[2px]"
                loading="lazy"
                onLoad={() => {
                  if (typeof window !== 'undefined') {
                    ScrollTrigger.refresh();
                  }
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
