"use client";

import { useEffect, useRef, useState, createContext, useContext } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { weddingData } from "../config/weddingData";
import { EASE_SMOOTH, DURATION_SLOW } from "../config/motionConstants";
import HeroSection from "./sections/HeroSection";
import FallingParticles from "./ui/FallingParticles";
import MusicToggle from "./ui/MusicToggle";
import FloatingGallery from "./sections/FloatingGallery";
import RSVPEnvelope from "./sections/RSVPEnvelope";
import CinematicEnding from "./sections/CinematicEnding";
import FullscreenQuoteSection from "./sections/FullscreenQuoteSection";
import FamilyTreeSection from "./sections/FamilyTreeSection";
import TimelineVerticalSection from "./sections/TimelineVerticalSection";
import FilmstripGallery from "./sections/FilmstripGallery";

// Contexts
export const AudioContext = createContext(null);
export const useAudio = () => useContext(AudioContext);

export const GuestContext = createContext({ side: "nhatrai", guestName: "Quý Khách", guestRole: "" });
export const useGuest = () => useContext(GuestContext);

export default function StoryEngine({ side = "nhatrai", guestName = "Quý Khách", guestRole = "" }) {
  const bgRef = useRef(null);
  const containerRef = useRef(null);
  const audioRef = useRef(null);
  const colorTriggersRef = useRef([]);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const chapters = gsap.utils.toArray(".story-chapter");
    const triggers = [];

    chapters.forEach((chapter) => {
      const themeColor = chapter.getAttribute("data-theme") || "#000000";

      const t = ScrollTrigger.create({
        trigger: chapter,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          gsap.to(bgRef.current, { backgroundColor: themeColor, duration: DURATION_SLOW, ease: EASE_SMOOTH });
        },
        onEnterBack: () => {
          gsap.to(bgRef.current, { backgroundColor: themeColor, duration: DURATION_SLOW, ease: EASE_SMOOTH });
        },
      });
      triggers.push(t);
    });

    colorTriggersRef.current = triggers;

    return () => {
      colorTriggersRef.current.forEach(t => t.kill());
    };
  }, [hasStarted]);

  const renderChapter = (chapter) => {
    switch (true) {
      case chapter.layoutType === "hero" && chapter.id === "chapter-0-hero":
        return null;
      case chapter.layoutType === "hero" && chapter.id === "chapter-7-ending":
        return <CinematicEnding chapter={chapter} />;
      case chapter.layoutType === "rsvp":
        return <RSVPEnvelope chapter={chapter} />;
      case chapter.layoutType === "fullscreen-quote":
        return <FullscreenQuoteSection chapter={chapter} />;
      case chapter.layoutType === "grid":
        return <FamilyTreeSection chapter={chapter} />;
      case chapter.layoutType === "timeline":
        return <TimelineVerticalSection chapter={chapter} />;
      case chapter.layoutType === "filmstrip":
        return <FilmstripGallery chapter={chapter} />;
      case chapter.layoutType.includes("asymmetric"):
        return <FloatingGallery chapter={chapter} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <h2 className="text-[80px] md:text-[120px] font-[family-name:var(--font-serif-display)] text-center leading-none tracking-tighter text-[var(--color-text-primary)]">
              {chapter.title}
            </h2>
          </div>
        );
    }
  };

  const heroChapter = weddingData.storyChapters.find(c => c.id === "chapter-0-hero");
  const otherChapters = weddingData.storyChapters.filter(c => c.id !== "chapter-0-hero");

  return (
    <AudioContext.Provider value={audioRef}>
      <GuestContext.Provider value={{ side, guestName, guestRole }}>
        <div 
          ref={containerRef} 
          className={`relative w-full ${!hasStarted ? "h-screen overflow-hidden" : ""}`}
        >
          <audio ref={audioRef} src={weddingData.audio.bgmUrl} loop preload="auto" />

          <div
            ref={bgRef}
            className="fixed inset-0 z-0"
            style={{ backgroundColor: "#000000" }}
          />

          <FallingParticles />
          <MusicToggle />

          {heroChapter && (
            <section
              id={heroChapter.id}
              data-theme={heroChapter.theme}
              className="story-chapter w-full relative z-10"
              style={{ backgroundColor: heroChapter.theme || "#000000" }}
            >
              <HeroSection chapter={heroChapter} hasStarted={hasStarted} setHasStarted={setHasStarted} />
            </section>
          )}

          <div className="relative z-10 w-full flex flex-col">
            {otherChapters.map((chapter) => (
              <section
                key={chapter.id}
                id={chapter.id}
                data-theme={chapter.theme}
                className="story-chapter w-full"
                style={{ 
                  backgroundColor: chapter.theme || "#ffffff"
                }}
              >
                {renderChapter(chapter)}
              </section>
            ))}
          </div>
        </div>
      </GuestContext.Provider>
    </AudioContext.Provider>
  );
}
