"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAudio } from "../StoryEngine";
import { weddingData } from "../../config/weddingData";
import { EASE_LUXURY, DURATION_EPIC, DURATION_AUDIO_FADE } from "../../config/motionConstants";

import { useGuest } from "../StoryEngine";
import React from "react";

const TransparentWaxSeal = React.forwardRef(({ src, className, onClick }, ref) => {
  const internalRef = useRef(null);

  React.useImperativeHandle(ref, () => internalRef.current);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = internalRef.current;
      if (!canvas) return;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      
      // Remove masking that might have cut off an off-center seal
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;
      
      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const i = (y * canvas.width + x) * 4;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          // Remove solid black background and dark noise
          if (r < 25 && g < 25 && b < 25) {
            data[i + 3] = 0; // Fully transparent
          } else if (r < 45 && g < 45 && b < 45) {
            // Smooth edge transition
            data[i + 3] = ((r - 25) / 20) * 255;
          }

          // Calculate bounding box strictly on the RED wax seal or bright gold to completely ignore faint shadows/watermarks
          if (data[i + 3] > 0 && r > 60) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }
      
      // Check if we found any visible pixels
      if (maxX >= minX && maxY >= minY) {
        // Add a small 5px padding
        minX = Math.max(0, minX - 5);
        minY = Math.max(0, minY - 5);
        maxX = Math.min(canvas.width - 1, maxX + 5);
        maxY = Math.min(canvas.height - 1, maxY + 5);
        
        const cropWidth = maxX - minX + 1;
        const cropHeight = maxY - minY + 1;
        
        // Put the modified data back first
        ctx.putImageData(imageData, 0, 0);
        
        // Extract the cropped region
        const croppedData = ctx.getImageData(minX, minY, cropWidth, cropHeight);
        
        // Resize canvas to exactly fit the seal
        canvas.width = cropWidth;
        canvas.height = cropHeight;
        
        // Draw the tightly cropped seal
        ctx.putImageData(croppedData, 0, 0);
      } else {
        ctx.putImageData(imageData, 0, 0);
      }
    };
  }, [src]);

  return <canvas ref={internalRef} className={className} onClick={onClick} />;
});

export default function HeroSection({ chapter, hasStarted, setHasStarted }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const heroImageRef = useRef(null);
  const signatureRef = useRef(null);
  const envelopeRef = useRef(null);
  const polaroidRef = useRef(null);
  const topTextRef = useRef(null);
  const waxSealRef = useRef(null);
  const helperTextRef = useRef(null);
  const bgSilkRef = useRef(null);
  const audioRef = useAudio();
  
  const { side, guestName } = useGuest();

  const [isAnimating, setIsAnimating] = useState(false);

  const handleWaxSealClick = useCallback(() => {
    if (hasStarted || isAnimating || !audioRef?.current) return;
    setIsAnimating(true);

    const isDesktop = window.innerWidth >= 768;

    const tl = gsap.timeline({
      onComplete: () => {
        setHasStarted(true);
        setIsAnimating(false);
      }
    });

    // 1. Click seal -> Seal fades, Card tilts left gently
    tl.to(helperTextRef.current, { opacity: 0, duration: 0.3 })
      .to(waxSealRef.current, { scale: 1.5, opacity: 0, duration: 0.8, ease: EASE_LUXURY }, "<")
      .to(envelopeRef.current, {
        rotation: -6,
        xPercent: -58,
        duration: 1.2,
        ease: "power2.out"
      }, "-=0.6");

    // 2. Polaroid slides out to the right (slower)
    const slideX = isDesktop ? 75 : 45;
    const slideY = isDesktop ? -15 : -10;
    const slideRot = isDesktop ? 12 : 8;

    tl.to(polaroidRef.current, {
      xPercent: slideX,
      yPercent: slideY,
      rotation: slideRot,
      duration: 2.5, // Slower reveal
      ease: "power3.out"
    }, "-=0.4");

    // 3. Pause for a moment to let the guest appreciate the Polaroid
    tl.to({}, { duration: 1.8 });

    // 4. Start opening card ("mở thiệp ra"), fade out the silk background, and turn on the music
    tl.call(() => {
      const audio = audioRef.current;
      if (audio) {
        audio.volume = 0;
        audio.play().catch(() => {});
        gsap.to(audio, { volume: 1, duration: 2.0 }); // Smooth fade in over 2s
      }
    })
    .to(bgSilkRef.current, {
      opacity: 0,
      duration: 1.4,
      ease: "power2.inOut"
    })
    .to([envelopeRef.current, polaroidRef.current], { 
      rotationY: 90, 
      scale: 1.3, 
      opacity: 0, 
      duration: 1.4, 
      ease: "power2.inOut",
      stagger: 0.15
    }, "<") // Start rotating card at the exact same time as silk background fades out!
    
    // Fade in the background Hero Image immediately as the card opens!
    .to(heroImageRef.current, {
      opacity: 0.9,
      scale: 1.1,
      duration: 3.5,
      ease: "power2.out",
    }, "-=1.2") // Starts 1.2s before the card is fully gone (almost at the start of card opening!)
    
    // Zoom/pan the Hero Image slowly (epic duration) to keep it alive
    .to(heroImageRef.current, {
      scale: 1.15,
      duration: 8,
      ease: "none"
    }, "<") // Runs concurrently with the slow zoom

    // Quote text fades in shortly after the card is gone
    .to(textRef.current, { 
      opacity: 1, 
      y: 0, 
      duration: 1.5, 
      ease: "power2.out" 
    }, "-=2.2") // Starts overlaying while the image is zooming in

    // Quote text holds for 2s, then fades out
    .to(textRef.current, { 
      opacity: 0, 
      duration: 1.2 
    }, "+=2.0")

    // Handwriting signatures appear
    .to(signatureRef.current, { 
      opacity: 1, 
      y: 0, 
      duration: 1.8, 
      ease: EASE_LUXURY 
    }, "-=1.0");
  }, [hasStarted, isAnimating, audioRef]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center"
      style={{ backgroundColor: "#3a0909" }}
    >
      {/* ---------------- ENVELOPE / CARD COVER (Layer 0-4) ---------------- */}
      {!hasStarted && (
        <div className="absolute inset-0 z-50 flex items-center justify-center perspective-[1000px]">
          {/* Layer 0: Background Silk */}
          <img ref={bgSilkRef} src="/bia/background.png" alt="" className="absolute top-0 left-0 w-full h-[120%] object-cover object-top z-0" />

          {/* Envelope Wrapper - Centered perfectly in the viewport */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Polaroid (Our Story) */}
            <div 
              ref={polaroidRef}
              className="absolute z-0 w-[65vw] md:w-[30vh] max-w-sm bg-[#F5F5DC] p-3 md:p-5 pb-10 md:pb-14 shadow-2xl rounded-sm"
              style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
              <img src={chapter.images[0]} alt="Our Story" className="w-full aspect-[3/4] object-cover rounded-sm" />
              <p className="absolute bottom-3 left-1/2 -translate-x-1/2 font-[family-name:var(--font-calligraphy)] text-2xl md:text-3xl text-[#5D4037]">
                Our Story
              </p>
            </div>

            {/* Layer 1: Card Base */}
            <div 
              ref={envelopeRef} 
              className="absolute z-10 w-[95vw] md:w-[55vh] max-w-lg aspect-square shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(0,0,0,0.4)]"
              style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
              <img src="/bia/bia-thiep.jpg" alt="Envelope Card" className="absolute inset-0 w-full h-full object-cover" />
              
              {/* Gold string */}
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-[#8B6914] via-[#D4AF37] to-[#8B6914] z-20 shadow-sm" style={{ transform: 'translateY(-50%)' }}></div>
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/40 z-20" style={{ transform: 'translateY(-50%)' }}></div>

              {/* Top Text (We're Getting Married) */}
              <div className="absolute top-6 md:top-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-[#5D4037] z-20 w-full">
                <span className="text-sm md:text-base mb-1">❦</span>
                <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-calligraphy)] leading-none mt-1">We're</h2>
                <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-calligraphy)] leading-none mb-2">Getting Married</h2>
                <span className="text-[10px] md:text-xs">♥</span>
              </div>

              {/* Middle-Bottom Text (Names & Date) */}
              <div className="absolute top-[62%] md:top-[60%] left-1/2 -translate-x-1/2 flex flex-col items-center text-[#5D4037] z-20 w-full text-center">
                <p className="font-serif text-[13px] md:text-base font-bold tracking-[0.2em] mb-1 md:mb-2 uppercase whitespace-nowrap">PHÚ KHƯƠNG & CẨM HIỀN</p>
                <p className="font-serif text-[11px] md:text-xs tracking-[0.3em] font-medium">09 . 06 . 2026</p>
              </div>

              {/* Dynamic Text (Trân trọng kính mời...) - Centered at bottom */}
              <div className="absolute bottom-5 md:bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center text-[#5D4037] z-20 w-full text-center">
                <p className="font-[family-name:var(--font-serif-display)] text-xs md:text-sm tracking-[0.25em] uppercase opacity-85 mb-1 font-bold">Trân trọng kính mời</p>
                <h2 className="font-[family-name:var(--font-calligraphy)] text-lg md:text-2xl text-[#7A0C11] font-normal leading-none">
                  {guestName}
                </h2>
                <div className="text-[#5D4037]/40 tracking-[0.1em] text-[8px] md:text-xs select-none mt-1.5 leading-none">
                  ......................................................................
                </div>
              </div>

              {/* Layer 3: Wax Seal */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group flex items-center justify-center" onClick={handleWaxSealClick}>
                <TransparentWaxSeal 
                  ref={waxSealRef}
                  src="/bia/dau-an-transparent.png" 
                  className="w-16 md:w-24 h-16 md:h-24 object-contain animate-pulse-seal transition-transform hover:scale-105 drop-shadow-2xl" 
                />
              </div>
            </div>
          </div>

          {/* Helper Text (Hidden but preserved for GSAP ref safety) */}
          <div ref={helperTextRef} className="hidden" />
        </div>
      )}

      {/* ---------------- INSIDE THE CARD (Hero Image Sequence) ---------------- */}
      {/* Hero Image Group */}
      <div
        ref={heroImageRef}
        className="absolute inset-0 z-0 opacity-0 will-change-transform"
        style={{ transform: "scale(1)" }}
      >
        {/* Single Image (Save The Date) */}
        <img
          src={chapter.images[0]}
          alt="Save The Date"
          className="absolute inset-0 w-full h-full object-contain object-center z-10"
        />

        {/* Vertical Typography - Left (Quote) */}
        <div className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-white tracking-[0.8em] text-[12px] md:text-[14px] font-sans uppercase whitespace-nowrap z-30">
          The Beginning of Forever
        </div>

        {/* Vertical Typography - Right (Stacked Date) */}
        <div className="absolute right-[4vw] md:right-[8vw] top-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-3 text-white font-serif text-[30px] md:text-[50px] z-30">
          <span>09</span>
          <div className="w-[1px] h-[30px] md:h-[50px] bg-white"></div>
          <span>06</span>
          <div className="w-[1px] h-[30px] md:h-[50px] bg-white"></div>
          <span className="writing-vertical-lr text-center" style={{ writingMode: 'vertical-lr', textOrientation: 'upright', letterSpacing: '-0.1em' }}>2026</span>
        </div>
      </div>

      {/* Cinematic Quote Text (Hidden but ref preserved for GSAP timeline safety) */}
      <div ref={textRef} className="hidden" />

      {/* Handwriting Signatures */}
      <div
        ref={signatureRef}
        className="absolute inset-0 z-10 pointer-events-none opacity-0 translate-y-8"
      >
        <div className="absolute left-[4vw] md:left-[10vw] top-[6vh] md:top-[4vh]">
          <h1 className="text-[50px] md:text-[90px] text-white/90 font-[family-name:var(--font-calligraphy)] whitespace-nowrap" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
            {weddingData.couple.groom.firstName}
          </h1>
        </div>
        <div className="absolute right-[4vw] md:right-[10vw] top-[6vh] md:top-[4vh]">
          <h1 className="text-[50px] md:text-[90px] text-white/90 font-[family-name:var(--font-calligraphy)] whitespace-nowrap" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
            {weddingData.couple.bride.firstName}
          </h1>
        </div>
      </div>
    </div>
  );
}
