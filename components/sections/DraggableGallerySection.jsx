"use client";

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Draggable } from 'gsap/Draggable';

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

const IMG_URLS = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600&auto=format&fit=crop"
];

export default function DraggableGallerySection() {
  const containerRef = useRef(null);
  const [maxZ, setMaxZ] = useState(10);

  useGSAP(() => {
    // Randomize initial positions
    gsap.utils.toArray('.polaroid-card').forEach((card) => {
      gsap.set(card, {
        rotation: gsap.utils.random(-25, 25),
        x: gsap.utils.random(-80, 80),
        y: gsap.utils.random(-80, 80),
      });
    });

    Draggable.create('.polaroid-card', {
      type: "x,y",
      bounds: containerRef.current,
      inertia: true,
      onPress: function () {
        setMaxZ(prev => {
          const nextZ = prev + 1;
          gsap.set(this.target, { zIndex: nextZ });
          return nextZ;
        });
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#e8e4db] z-10 overflow-hidden border-t border-white/50 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing">
      
      <div className="absolute top-16 md:top-24 left-0 w-full z-0 pointer-events-none text-center">
        <p className="text-xs tracking-[0.3em] text-[#d4af37] font-semibold uppercase mb-4">Lưu Giữ</p>
        <h2 className="text-4xl md:text-5xl font-serif text-gray-800 drop-shadow-sm">Scrapbook</h2>
        <p className="text-sm text-gray-500 mt-4 italic font-serif">Kéo thả các bức ảnh để xem</p>
      </div>

      <div className="relative w-full h-full max-w-4xl flex items-center justify-center pointer-events-auto">
        {IMG_URLS.map((url, i) => (
          <div 
            key={i} 
            className="polaroid-card absolute w-[60vw] md:w-[25vw] aspect-[3/4] bg-white p-3 pb-12 shadow-xl rounded-sm will-change-transform"
            style={{ zIndex: i + 1 }}
          >
            <div className="relative w-full h-full bg-gray-200 overflow-hidden border border-gray-100">
              <Image 
                src={url} 
                alt={`Scrapbook ${i}`} 
                fill 
                className="object-cover pointer-events-none" 
                sizes="(max-width: 768px) 60vw, 25vw"
                unoptimized
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
