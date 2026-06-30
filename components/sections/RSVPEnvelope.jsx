"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import confetti from "canvas-confetti";
import { useGuest } from "../StoryEngine";
import { weddingData } from "../../config/weddingData";

export default function RSVPEnvelope({ chapter }) {
  const [envelopeState, setEnvelopeState] = useState("closed");
  const containerRef = useRef(null);
  const envelopeWrapperRef = useRef(null);
  const triggerRef = useRef(null);
  const { side, guestName } = useGuest();

  // RSVP Form state
  const [name, setName] = useState(guestName || "");
  const [status, setStatus] = useState("attending"); // "attending" | "declined"
  const [wish, setWish] = useState("");
  const [wishes, setWishes] = useState([]);

  // Default wishes to seed
  const defaultWishes = [
    { name: "Bạn Thân", wish: "Chúc hai bạn trăm năm hạnh phúc, đầu bạc răng long nhé! Chúc mừng đám cưới thế kỷ của Khương & Hiền! 🎉", status: "attending" },
    { name: "Anh Đồng Nghiệp", wish: "Chúc mừng hạnh phúc Khương & Hiền! Mãi luôn thấu hiểu và cùng nhau chia sẻ mọi khoảnh khắc trong cuộc sống nhé.", status: "attending" },
    { name: "Chị Họ", wish: "Chúc đôi uyên ương mãi mãi hạnh phúc ngọt ngào bên nhau! Chúc mừng hạnh phúc gia đình mới!", status: "attending" }
  ];

  // Lấy data theo side
  const sideData = side === "nhagai" ? weddingData.nhagai : weddingData.nhatrai;
  const ceremony = sideData.ceremony;
  const party = sideData.party;

  useEffect(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem("wedding_wishes");
    if (saved) {
      setWishes(JSON.parse(saved));
    } else {
      setWishes(defaultWishes);
    }
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Pin the envelope wrapper and auto-open it on enter
    triggerRef.current = ScrollTrigger.create({
      trigger: envelopeWrapperRef.current,
      start: "top top",
      end: "+=120%",
      pin: true,
      pinSpacing: true,
      onEnter: () => {
        setEnvelopeState((prev) => {
          if (prev === "closed") {
            setTimeout(() => setEnvelopeState("card_extracted"), 1200);
            return "opened";
          }
          return prev;
        });
      }
    });

    return () => {
      if (triggerRef.current) triggerRef.current.kill();
    };
  }, []);

  const handleOpenEnvelope = () => {
    if (envelopeState === "closed") {
      setEnvelopeState("opened");
      setTimeout(() => setEnvelopeState("card_extracted"), 1200);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newWish = {
      name: name.trim(),
      wish: wish.trim() || "Chúc hai bạn trăm năm hạnh phúc! ♥",
      status: status
    };

    const updated = [newWish, ...wishes.filter(w => w.name !== newWish.name)];
    setWishes(updated);
    localStorage.setItem("wedding_wishes", JSON.stringify(updated));

    setEnvelopeState("submitted");
    confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 }, colors: ["#D4AF37", "#FFFFFF", "#800020"] });
    setTimeout(() => confetti({ particleCount: 100, spread: 70, origin: { y: 0.6, x: 0.3 }, colors: ["#D4AF37", "#FFFFFF"] }), 500);
    setTimeout(() => confetti({ particleCount: 100, spread: 70, origin: { y: 0.6, x: 0.7 }, colors: ["#D4AF37", "#800020"] }), 1000);

    // Auto-scroll to ending section after 2.5 seconds
    setTimeout(() => {
      const ending = document.getElementById("chapter-7-ending");
      if (ending) {
        ending.scrollIntoView({ behavior: "smooth" });
      }
    }, 2500);
  };

  const luxuryEase = [0.76, 0, 0.24, 1];

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col items-center justify-start bg-white py-16 px-4"
      style={{ minHeight: "150vh" }}
    >
      {/* 1. Envelope Wrapper (Pinnable) */}
      <div 
        ref={envelopeWrapperRef}
        className="w-full h-[90vh] flex flex-col items-center justify-center relative cursor-pointer"
        onClick={envelopeState === "closed" ? handleOpenEnvelope : undefined}
      >
        {/* Title — only visible when closed */}
        {envelopeState === "closed" && (
          <div className="text-center z-10 mb-8 pointer-events-none">
            <h2 className="text-[50px] md:text-[80px] font-[family-name:var(--font-serif-display)] leading-none tracking-tighter text-[var(--color-text-primary)]" style={{ textShadow: '0 2px 15px rgba(0,0,0,0.15)' }}>
              {chapter.title}
            </h2>
            <p className="mt-3 font-[family-name:var(--font-calligraphy)] text-[var(--color-gold)] text-2xl md:text-3xl">
              {guestName}
            </p>
            <p className="mt-4 text-[10px] tracking-[0.3em] uppercase font-sans text-[var(--color-text-secondary)] animate-pulse">
              Thiệp mời tự động mở...
            </p>
          </div>
        )}

        {/* Envelope container */}
        <motion.div
          className="relative w-[320px] md:w-[420px] h-[260px] md:h-[350px] mt-8"
          style={{ perspective: 1000 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: luxuryEase }}
        >
          <div className="absolute inset-0 bg-[#E8DCC4] rounded-lg shadow-lg" />

          {/* Thiệp mời bên trong — hiển thị ceremony + party info + Form */}
          <motion.div
            className="absolute bg-[#FFFDF9] shadow-[0_20px_50px_rgba(0,0,0,0.35)] rounded-lg flex flex-col p-6 md:p-10 border-[3px] border-double border-[#D4AF37]/60 text-center overflow-y-auto"
            style={{ 
              backgroundImage: 'radial-gradient(circle at center, #FFFDF9 0%, #FAF5EC 100%)',
              left: "50%",
              top: "50%"
            }}
            initial={{ x: "-50%", y: "-50%", zIndex: 10 }}
            animate={{
              x: "-50%",
              y: (envelopeState === "card_extracted" || envelopeState === "submitted") ? "-75%" : "-50%",
              width: (envelopeState === "card_extracted" || envelopeState === "submitted") ? "min(92vw, 800px)" : "300px",
              height: (envelopeState === "card_extracted" || envelopeState === "submitted") ? "min(85vh, 600px)" : "230px",
              zIndex: (envelopeState === "card_extracted" || envelopeState === "submitted") ? 50 : 10,
            }}
            transition={{ duration: 1.2, ease: luxuryEase }}
          >
            {/* Card Content when extracted */}
            {(envelopeState === "card_extracted" || envelopeState === "submitted") ? (
              <div className="flex flex-col h-full justify-between gap-5 text-center">
                <div>
                  <h3 className="font-[family-name:var(--font-calligraphy)] text-4xl md:text-5xl text-[var(--color-gold)] mb-1 drop-shadow-sm">
                    Lời Mời Trân Trọng
                  </h3>
                  <div className="w-16 h-[1px] bg-[var(--color-gold)] mx-auto mb-4 opacity-60" />
                  <p className="text-xs md:text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-[550px] mx-auto mb-2 font-serif italic">
                    Trân trọng kính mời <strong className="text-[var(--color-burgundy)] text-sm md:text-base not-italic font-[family-name:var(--font-serif-display)]">{guestName}</strong> đến chung vui cùng gia đình chúng tôi tại lễ thành hôn của <strong className="text-neutral-800 not-italic">Đỗ Phú Khương & Hoàng Thị Cẩm Hiền</strong>.
                  </p>
                </div>

                {/* Ceremony & Party Info - Bilateral layout without boxes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 text-center relative py-4 my-2 border-y border-[#D4AF37]/20">
                  {/* Vertical divider line */}
                  <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-[1px] bg-[#D4AF37]/30 -translate-x-1/2" />
                  
                  {/* Column 1: Ceremony */}
                  <div className="flex flex-col items-center px-2">
                    <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-[var(--color-gold)] font-bold mb-1.5">
                      {ceremony.type}
                    </span>
                    <h4 className="font-[family-name:var(--font-serif-display)] text-lg md:text-2xl text-[var(--color-text-primary)] font-bold">
                      {ceremony.dateSolar}
                    </h4>
                    <p className="text-[10px] text-neutral-500 italic mb-2">
                      (Nhằm ngày {ceremony.dateLunar})
                    </p>
                    <div className="text-xs text-neutral-600 space-y-1">
                      <p>⏰ Giờ cử hành: <span className="font-semibold text-neutral-800">{ceremony.time}</span></p>
                      <p className="leading-relaxed mt-1 max-w-[240px]">📍 {ceremony.address}</p>
                    </div>
                  </div>

                  {/* Column 2: Party */}
                  <div className="flex flex-col items-center px-2">
                    <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-[var(--color-gold)] font-bold mb-1.5">
                      TIỆC CƯỚI MỪNG HẠNH PHÚC
                    </span>
                    <h4 className="font-[family-name:var(--font-serif-display)] text-lg md:text-2xl text-[var(--color-text-primary)] font-bold">
                      {party.time}
                    </h4>
                    <p className="text-[10px] text-neutral-500 italic mb-2">
                      (Đón khách & Đãi tiệc)
                    </p>
                    <div className="text-xs text-neutral-600 space-y-1">
                      <p>🎉 Sự hiện diện là niềm vinh hạnh</p>
                      <p className="leading-relaxed mt-1 max-w-[240px]">📍 {party.address}</p>
                    </div>
                  </div>
                </div>

                {/* Form inputs - Borderless paper style */}
                {envelopeState === "card_extracted" ? (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2 text-center" onClick={(e) => e.stopPropagation()}>
                    {/* Select attendance status buttons */}
                    <div className="flex gap-4 justify-center my-1">
                      <button
                        type="button"
                        onClick={() => setStatus("attending")}
                        className={`px-6 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                          status === "attending"
                            ? "bg-[var(--color-burgundy)] text-white shadow-md border border-[var(--color-burgundy)]"
                            : "bg-transparent text-neutral-500 border border-neutral-300 hover:border-[#D4AF37]/50"
                        }`}
                      >
                        Sẽ tham dự ♥
                      </button>
                      <button
                        type="button"
                        onClick={() => setStatus("declined")}
                        className={`px-6 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                          status === "declined"
                            ? "bg-[var(--color-gold)] text-white shadow-md border border-[var(--color-gold)]"
                            : "bg-transparent text-neutral-500 border border-neutral-300 hover:border-[#D4AF37]/50"
                        }`}
                      >
                        Tiếc là không thể ❃
                      </button>
                    </div>

                    {/* Inputs with only bottom line */}
                    <div className="flex flex-col md:flex-row gap-5 my-2">
                      <div className="flex-1 flex flex-col">
                        <input
                          type="text"
                          placeholder="Tên của bạn *"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full bg-transparent border-b border-[#D4AF37]/40 focus:border-[var(--color-gold)] text-center text-sm py-2 focus:outline-none transition-colors font-serif"
                        />
                      </div>
                      <div className="flex-[2] flex flex-col">
                        <input
                          type="text"
                          placeholder="Gửi lời chúc tốt đẹp nhất..."
                          value={wish}
                          onChange={(e) => setWish(e.target.value)}
                          className="w-full bg-transparent border-b border-[#D4AF37]/40 focus:border-[var(--color-gold)] text-center text-sm py-2 focus:outline-none transition-colors font-serif"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-10 py-3.5 bg-gradient-to-r from-[#E2B75A] to-[#D4AF37] hover:brightness-105 active:scale-[0.98] text-white text-[10px] font-bold uppercase tracking-[0.25em] transition-all rounded-full shadow-lg mx-auto mt-2"
                    >
                      Gửi Lời Chúc & Xác Nhận
                    </button>
                  </form>
                ) : (
                  <div className="mt-4 text-center py-6 bg-amber-50/50 rounded-lg border border-[#D4AF37]/20 max-w-[450px] mx-auto">
                    <p className="text-[var(--color-gold)] font-[family-name:var(--font-calligraphy)] text-4xl mb-1">
                      Cảm ơn {name}! ♥
                    </p>
                    <p className="text-[var(--color-text-secondary)] text-sm font-serif italic mt-2">
                      {status === "attending" ? "Sự hiện diện của bạn là niềm vinh hạnh lớn của chúng tôi!" : "Cảm ơn bạn đã gửi những lời chúc tốt đẹp nhất!"}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              /* Small Card Preview inside envelope */
              <div className="flex flex-col items-center justify-center h-full text-center pointer-events-none">
                <p className="font-[family-name:var(--font-calligraphy)] text-[var(--color-gold)] text-lg mb-2">
                  Kính gửi {guestName}
                </p>
                <p className="text-[9px] tracking-[0.3em] uppercase font-sans text-[var(--color-text-secondary)]">
                  {ceremony.type}
                </p>
              </div>
            )}
          </motion.div>

          {/* Mặt trước phong bì */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <div className="absolute inset-0 bg-[#F5EEDF] clip-envelope-front shadow-inner" />
          </div>

          {/* Nắp phong bì */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1/2 bg-[#F0E6D2] origin-top z-30 shadow-sm pointer-events-none"
            style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
            initial={{ rotateX: 0 }}
            animate={{ rotateX: envelopeState !== "closed" ? 180 : 0 }}
            transition={{ duration: 1, ease: luxuryEase }}
          >
            {envelopeState === "closed" && (
              <div className="absolute bottom-[-16px] left-1/2 -translate-x-1/2 w-10 h-10 bg-[var(--color-burgundy)] rounded-full shadow-lg flex items-center justify-center">
                <span className="text-[var(--color-gold)] text-[11px] font-[family-name:var(--font-calligraphy)]">K&H</span>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* 2. Wishes List (scrollable area below) */}
      <div className="w-full max-w-xl mt-12 bg-[#FFFDF9] p-6 md:p-8 rounded-lg shadow-xl border border-[#D4AF37]/20 relative z-20" style={{ backgroundImage: 'radial-gradient(circle at center, #FFFDF9 0%, #FAF5EC 100%)' }}>
        <h4 className="text-center font-[family-name:var(--font-serif-display)] text-xl md:text-2xl text-[var(--color-text-primary)] mb-1">
          Lời Chúc Từ Mọi Người
        </h4>
        <div className="w-10 h-[1px] bg-[var(--color-gold)] mx-auto mb-6 opacity-60" />
        <div className="flex flex-col gap-4 max-h-[320px] overflow-y-auto pr-2 scrollbar-thin">
          {wishes.map((w, idx) => (
            <div key={idx} className="bg-white/80 p-3.5 rounded border border-gray-100 flex flex-col gap-1.5 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-[var(--color-text-primary)]">
                  {w.name}
                </span>
                <span className="text-[8px] font-sans tracking-widest uppercase bg-amber-50 text-[var(--color-gold)] px-2 py-0.5 rounded border border-[#D4AF37]/20 font-semibold">
                  {w.status === "attending" ? "Sẽ tham dự" : "Gửi lời chúc"}
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] italic leading-relaxed">
                "{w.wish}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
