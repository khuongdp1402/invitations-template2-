"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { weddingData } from '@/config/weddingData';

export default function EnvelopeWelcome({ guestName, side }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Lấy ngày cưới theo side
  const weddingDate = side === 'nhagai' 
    ? weddingData.nhagai.ceremony.dateSolar 
    : weddingData.nhatrai.ceremony.dateSolar;

  // Lock scroll when envelope is visible
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  const handleOpen = () => {
    setIsOpen(true);
    // After animation completes, unmount the component
    setTimeout(() => {
      setIsVisible(false);
    }, 1500); // 1.5s total animation time
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }} // Fade out after envelope opens
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#FFF8DC] px-4 md:px-10"
          style={{ backgroundImage: 'radial-gradient(circle at center, #FFF8DC 0%, #FDF5E6 100%)' }}
        >
          {/* Envelope Container: Fixed aspect ratio */}
          <div className="relative w-full max-w-4xl aspect-[4/3] md:aspect-[16/9] max-h-[80vh] flex flex-col items-center justify-center mt-8">
            
            {/* Envelope Back/Inside (Visible when flap opens) */}
            <div className="absolute top-0 w-full h-full bg-[#3a0f12] shadow-inner rounded-lg z-0 border border-[#5a1519]"></div>

            {/* Top Flap of Envelope */}
            <motion.div
              initial={{ rotateX: 0 }}
              animate={{ rotateX: isOpen ? 180 : 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ transformOrigin: "top", backfaceVisibility: "hidden" }} // Ẩn khi bị lật ngược
              className="absolute top-0 w-full h-[55%] bg-[#7a1f24] drop-shadow-lg z-20 flex flex-col justify-center items-center pb-8 rounded-b-[50%] origin-top border-b border-[#D4AF37]/50"
            >
              {/* Nội dung trên nắp phong bì */}
              <div className="text-center space-y-2 mt-4 md:mt-8">
                <p className="text-sm md:text-base font-light text-[#FDF5E6] tracking-[0.2em] uppercase">
                  Save the Date
                </p>
                <p className="text-5xl md:text-6xl font-calligraphy text-[#D4AF37] mt-2 mb-2 drop-shadow-sm">
                  Khương & Hiền
                </p>
                <p className="text-lg md:text-xl font-medium text-[#D4AF37] tracking-widest drop-shadow-sm">
                  {weddingDate.replace(/\//g, '.')}
                </p>
              </div>

              {/* Wax Seal - Vàng Đồng & Chữ đè lên nhau */}
              <motion.div 
                onClick={handleOpen}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute -bottom-10 md:-bottom-12 w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#E2B75A] via-[#D4AF37] to-[#AA7C11] cursor-pointer shadow-xl border-[3px] border-[#D4AF37] flex items-center justify-center z-30"
                style={{
                  boxShadow: "0 10px 15px -3px rgba(170, 124, 17, 0.4), inset 0 0 12px rgba(255,255,255,0.4)"
                }}
              >
                {/* Chữ K & H thay bằng Logo */}
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image 
                    src="/logo.jpg" 
                    alt="Logo Khương & Hiền" 
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Bottom/Main Envelope Body */}
            <div className="absolute bottom-0 w-full h-[85%] bg-[#5a1519] rounded-t-3xl rounded-b-lg shadow-2xl z-10 flex flex-col items-center justify-end pb-8 md:pb-12 border-t-2 border-[#D4AF37]/50 overflow-hidden">
              <div className="text-center flex flex-col items-center">
                {/* Lời Xin chào nét mảnh */}
                <div className="h-16 md:h-24 w-[150%] md:w-full relative flex items-center justify-center">
                  <svg width="100%" height="100%" viewBox="0 0 600 120" className="overflow-visible">
                    <motion.text
                      initial={{ strokeDasharray: 800, strokeDashoffset: 800, fill: "rgba(212, 175, 55, 0)" }}
                      animate={{ strokeDashoffset: 0, fill: "rgba(212, 175, 55, 1)" }}
                      transition={{ 
                        strokeDashoffset: { duration: 3, ease: "easeInOut" },
                        fill: { duration: 1, ease: "easeIn", delay: 2 }
                      }}
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="font-calligraphy text-5xl md:text-6xl stroke-[#D4AF37]"
                      style={{ strokeWidth: 0.2 }} // Nét cực thanh
                    >
                      Xin chào {guestName ? guestName : "bạn"}
                    </motion.text>
                  </svg>
                </div>
                
                {/* Lời mời mở thiệp nhỏ gọn */}
                <p className="text-sm md:text-base text-[#FDF5E6]/80 font-serif italic mt-1 tracking-wide">
                  Mời bạn mở thiệp cưới
                </p>
              </div>
            </div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
