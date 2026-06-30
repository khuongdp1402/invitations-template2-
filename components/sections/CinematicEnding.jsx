"use client";

import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAudio } from "../StoryEngine";
import { EASE_LUXURY, DURATION_AUDIO_FADE } from "../../config/motionConstants";

export default function CinematicEnding({ chapter }) {
  const containerRef = useRef(null);
  const typewriterRef = useRef(null);
  const imageRef = useRef(null);
  const triggerRef = useRef(null);
  const audioRef = useAudio();

  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let typewriterTimeout;

    triggerRef.current = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 60%",
      once: true,
      onEnter: () => {
        // Fade in background image to 0.5 immediately for early visual feedback
        gsap.to(imageRef.current, { opacity: 0.5, duration: 2, ease: EASE_LUXURY });

        // 2. Audio fade out — Vol.2: "Nhạc nhỏ dần"
        if (audioRef?.current) {
          gsap.to(audioRef.current, { volume: 0, duration: DURATION_AUDIO_FADE });
        }

        // 3. Typewriter text
        const text = chapter.quote || "Cảm ơn bạn đã là một phần của câu chuyện này.";
        let i = 0;
        const typewrite = () => {
          if (i <= text.length) {
            setDisplayedText(text.slice(0, i));
            i++;
            typewriterTimeout = setTimeout(typewrite, 60);
          } else {
            // 4. After typewriter: Image brightens up + confetti
            setTimeout(() => {
              gsap.to(imageRef.current, { opacity: 0.85, scale: 1.03, duration: 1.5, ease: EASE_LUXURY });

              // 5. Confetti
              confetti({ particleCount: 200, spread: 90, origin: { y: 0.5 }, colors: ["#D4AF37", "#FFFFFF", "#800020"] });
              setTimeout(() => confetti({ particleCount: 120, spread: 70, origin: { y: 0.4, x: 0.3 }, colors: ["#D4AF37", "#FFFFFF"] }), 500);
              setTimeout(() => confetti({ particleCount: 120, spread: 70, origin: { y: 0.4, x: 0.7 }, colors: ["#800020", "#D4AF37"] }), 1000);
            }, 500);
          }
        };
        // Start typewriter after 500ms
        setTimeout(typewrite, 500);
      },
    });

    return () => {
      if (triggerRef.current) triggerRef.current.kill();
      clearTimeout(typewriterTimeout);
    };
  }, [chapter.quote, audioRef]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-end pb-[10vh] md:pb-[14vh] bg-black"
    >
      {/* Background image — aligned to the top (bg-top) and uncropped */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-[2] opacity-0 bg-cover bg-top will-change-transform"
        style={{ backgroundImage: `url(${chapter.images[0]})` }}
      >
        {/* Gradient dark overlay: only 30-40% from bottom up */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 via-35% to-transparent" />
      </div>

      {/* Content — sits at the bottom z-10 */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-8 text-center pointer-events-none">
        <h2 className="text-[60px] md:text-[100px] font-[family-name:var(--font-calligraphy)] text-[#F0D78C] leading-none" style={{ textShadow: '0 0 20px rgba(212,175,55,0.8), 0 0 60px rgba(212,175,55,0.5), 0 0 120px rgba(212,175,55,0.3)' }}>
          {chapter.title}
        </h2>

        {/* Typewriter text */}
        <p
          ref={typewriterRef}
          className="text-xs md:text-sm font-serif italic text-white/90 tracking-wide leading-relaxed min-h-[2em] max-w-[500px]"
        >
          {displayedText}
          <span className="animate-pulse font-bold text-[#F0D78C]">|</span>
        </p>
      </div>
    </div>
  );
}
