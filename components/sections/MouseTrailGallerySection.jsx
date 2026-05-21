"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const IMG_URLS = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=600&auto=format&fit=crop"
];

export default function MouseTrailGallerySection() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let currentIndex = 0;
    let lastPos = { x: 0, y: 0 };
    const DISTANCE_THRESHOLD = 100;
    let zIndexCount = 10;

    const spawnImage = (x, y) => {
      const imgDiv = document.createElement("div");
      imgDiv.className = "absolute w-[45vw] md:w-[15vw] aspect-[3/4] shadow-2xl rounded-sm overflow-hidden border-4 border-white opacity-0 pointer-events-none";
      
      imgDiv.style.left = `${x}px`;
      imgDiv.style.top = `${y}px`;
      imgDiv.style.transform = `translate(-50%, -50%)`;
      imgDiv.style.zIndex = zIndexCount++;

      const img = document.createElement("img");
      img.src = IMG_URLS[currentIndex % IMG_URLS.length];
      img.className = "w-full h-full object-cover";
      imgDiv.appendChild(img);

      container.appendChild(imgDiv);

      currentIndex++;

      gsap.fromTo(imgDiv, 
        { 
          scale: 0, 
          rotation: gsap.utils.random(-20, 20),
          opacity: 1 
        },
        { 
          scale: 1, 
          duration: 0.4, 
          ease: "back.out(1.7)",
          onComplete: () => {
            gsap.to(imgDiv, {
              y: "+=150",
              opacity: 0,
              duration: 1.5,
              delay: 0.5,
              ease: "power2.in",
              onComplete: () => {
                if (container.contains(imgDiv)) {
                  imgDiv.remove();
                }
              }
            });
          }
        }
      );
    };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const dx = x - lastPos.x;
      const dy = y - lastPos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > DISTANCE_THRESHOLD) {
        lastPos = { x, y };
        spawnImage(x, y);
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("touchmove", handleMouseMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("touchmove", handleMouseMove);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[80vh] md:h-screen bg-[#111] z-10 overflow-hidden border-t border-gray-900 cursor-crosshair">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full z-0 pointer-events-none text-center">
        <p className="text-xs tracking-[0.3em] text-[#d4af37] font-semibold uppercase mb-4">Phép Màu</p>
        <h2 className="text-4xl md:text-5xl font-serif text-white drop-shadow-md">Magic Touches</h2>
        <p className="text-sm text-gray-400 mt-4 italic font-serif max-w-sm mx-auto px-4">Hãy lướt chạm màn hình để khám phá những mảnh ghép bí mật</p>
      </div>

    </section>
  );
}
