"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { weddingData } from '@/config/weddingData';

export default function HeroSection({ name, role, side }) {
  const currentSide = side === 'nhagai' ? 'nhagai' : 'nhatrai';
  const data = weddingData[currentSide];
  const order = data.displayOrder || ['groom', 'bride'];
  
  const leftName = order[0] === 'groom' ? weddingData.couple.groom.firstName : weddingData.couple.bride.firstName;
  const rightName = order[1] === 'groom' ? weddingData.couple.groom.firstName : weddingData.couple.bride.firstName;

  // Mouse Parallax setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for mouse movement
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  // Transforms for layers
  // Back layer moves slightly opposite to mouse
  const backX = useTransform(smoothX, [-1, 1], [15, -15]);
  const backY = useTransform(smoothY, [-1, 1], [15, -15]);
  
  // Text layer moves opposite
  const textX = useTransform(smoothX, [-1, 1], [-10, 10]);
  const textY = useTransform(smoothY, [-1, 1], [-10, 10]);

  // Front layer moves with mouse
  const frontX = useTransform(smoothX, [-1, 1], [-25, 25]);
  const frontY = useTransform(smoothY, [-1, 1], [-25, 25]);

  const handleMouseMove = (e) => {
    // Normalize coordinates from -1 to 1
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width * 2 - 1;
    const y = (clientY - top) / height * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Toggle layout
  const [altLayout, setAltLayout] = useState(false);

  return (
    <section 
      className="relative w-full h-screen overflow-hidden transition-colors duration-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ backgroundColor: altLayout ? '#986851' : 'transparent' }} // If alt layout, shift to terracotta/clay, else inherit from wrapper
    >
      {/* Background Image Layer */}
      <motion.div 
        className="absolute inset-0 w-full h-full z-0 scale-110"
        style={{ x: backX, y: backY }}
      >
        <Image 
          src={altLayout ? "/z7849785668787_545076eb7332d020812634ff21635017.jpg" : "/z7849785668787_545076eb7332d020812634ff21635017.jpg"} // Fallback to same image for now
          alt="Wedding Background"
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </motion.div>

      {/* Text Layer (Middle) */}
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-4"
        style={{ x: textX, y: textY }}
      >
        <p className="text-sm md:text-base tracking-[0.3em] uppercase mb-6 text-[#FDF5E6] opacity-90 font-light">
          Tân Lang & Tân Nương
        </p>
        
        <h1 className="text-7xl md:text-9xl font-calligraphy text-[#D4AF37] leading-[1.1] flex flex-col items-center text-center drop-shadow-lg">
          <span>{leftName}</span>
          <span className="text-5xl md:text-7xl font-light text-[#FDF5E6] my-2 opacity-80">&</span>
          <span>{rightName}</span>
        </h1>

        <div className="text-center mt-12 text-[#FDF5E6]">
          <p className="uppercase tracking-[0.3em] text-xs font-semibold opacity-80 mb-2">Save the date</p>
          <p className="font-serif text-3xl md:text-4xl text-[#D4AF37] mb-2 drop-shadow-md">{data.ceremony.dateSolar}</p>
          <p className="text-xs opacity-80">Nhằm ngày {data.ceremony.dateLunar}</p>
        </div>
      </motion.div>

      {/* Front Overlay / Decorative Layer */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-20"
        style={{ x: frontX, y: frontY }}
      >
        {/* Soft vignette framing */}
        <div className="absolute inset-0 border-[20px] border-[#FFF8DC]/5 m-4 rounded-xl" />
      </motion.div>

      {/* Next Layout Toggle */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30">
        <button 
          onClick={() => setAltLayout(!altLayout)}
          className="px-6 py-2 rounded-full border border-[#D4AF37]/50 text-[#FDF5E6] text-xs uppercase tracking-widest hover:bg-[#D4AF37]/20 transition-colors backdrop-blur-md"
        >
          {altLayout ? 'Original View' : 'Next Layout'}
        </button>
      </div>

    </section>
  );
}
