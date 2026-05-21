"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function GallerySection() {
  const galleryRef = useRef(null);

  useGSAP(() => {
    gsap.from(".gallery-photo", {
      y: 60,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: galleryRef.current,
        start: "top 75%",
      }
    });
  }, { scope: galleryRef });

  return (
    <section ref={galleryRef} className="py-24 bg-white relative z-10 border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4">
        
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] text-[#d4af37] font-semibold uppercase mb-4">Khoảnh Khắc</p>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800">Our Memories</h2>
        </div>

        {/* Lưới ảnh (Grid lộn xộn có chủ ý) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-8 items-center">
          
          <div className="gallery-photo relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg mt-0 md:mt-12">
            <Image 
              src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop"
              alt="Gallery 1"
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="gallery-photo relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-2xl z-10 border-4 border-white">
            <Image 
              src="https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop"
              alt="Gallery 2"
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="gallery-photo relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg mb-0 md:mb-12">
            <Image 
              src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop"
              alt="Gallery 3"
              fill
              className="object-cover"
              unoptimized
            />
          </div>

        </div>

      </div>
    </section>
  );
}
