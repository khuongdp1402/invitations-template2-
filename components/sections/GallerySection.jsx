"use client";

import React from 'react';
import Gallery3D from '../canvas/Gallery3D';

export default function GallerySection() {
  return (
    <section className="relative w-full h-[150vh] bg-white z-10 border-t border-gray-100 overflow-hidden">
      <div className="absolute top-0 left-0 w-full pt-24 pointer-events-none z-20">
        <div className="text-center">
          <p className="text-xs tracking-[0.3em] text-[#d4af37] font-semibold uppercase mb-4">Khoảnh Khắc</p>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 drop-shadow-md">Our Memories</h2>
        </div>
      </div>
      <div className="absolute inset-0 w-full h-full z-10 pointer-events-auto">
        <Gallery3D />
      </div>
    </section>
  );
}
