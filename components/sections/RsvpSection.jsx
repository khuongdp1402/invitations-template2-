"use client";

import React, { useState } from 'react';
import confetti from 'canvas-confetti';

export default function RsvpSection({ name }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    attendance: 'yes',
    guests: '1',
    wishes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Fake API log
    console.log("RSVP Submitted:", { name, ...formData });
    
    setIsSubmitted(true);
    
    // Bắn Confetti
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  return (
    <section className="py-12 px-4 relative z-10">
      <div className="max-w-xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-serif text-[#7a1f24] mb-2">Phúc Đáp (RSVP) 💌</h2>
          <p className="text-[#4A3728]/60 font-light">Sự hiện diện của bạn là món quà to bự nhất dành cho tụi mình đấy! 🥰</p>
        </div>

        {isSubmitted ? (
          <div className="text-center py-12 space-y-4 animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200 text-green-500">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-serif text-[#4A3728]">Triệu like cho {name || 'bạn'}! 👍</h3>
            <p className="text-[#4A3728]/80">Tụi mình đã nhận được phản hồi. Hẹn quẩy hết mình tại đám cưới nhé! 🎉🍻</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#4A3728] mb-1">Tên khách mời thân thương 💕</label>
              <input 
                type="text" 
                value={name || ''} 
                disabled 
                className="w-full px-4 py-2 bg-[#FFF8DC] border border-[#4A3728]/10 rounded-md text-[#4A3728]/60 cursor-not-allowed"
              />
              <p className="text-xs text-[#4A3728]/60 mt-1">* Tên được điền tự động (chống fake vé mời đó nha 😎)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#4A3728] mb-2">Bạn sẽ đến chung vui chứ? 👀</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="attendance" 
                    value="yes"
                    checked={formData.attendance === 'yes'}
                    onChange={(e) => setFormData({...formData, attendance: e.target.value})}
                    className="text-[#D4AF37] focus:ring-[#E2B75A]"
                  />
                  <span className="text-[#4A3728]">Chắc chắn rồi! Quẩy tới bến! 🚀</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="attendance" 
                    value="no"
                    checked={formData.attendance === 'no'}
                    onChange={(e) => setFormData({...formData, attendance: e.target.value})}
                    className="text-[#D4AF37] focus:ring-[#E2B75A]"
                  />
                  <span className="text-[#4A3728]">Bận mất tiêu, xin lỗi nha 🥺</span>
                </label>
              </div>
            </div>

            {formData.attendance === 'yes' && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-sm font-medium text-[#4A3728] mb-1">Đi mấy người để tụi mình dọn cỗ nè? 🍽️</label>
                <select 
                  value={formData.guests}
                  onChange={(e) => setFormData({...formData, guests: e.target.value})}
                  className="w-full px-4 py-2 bg-transparent border border-[#4A3728]/10 rounded-md focus:border-[#E2B75A] focus:ring-[#E2B75A] outline-none transition-colors"
                >
                  <option value="1">1 người (Đi lẻ nhưng quẩy khỏe) 😎</option>
                  <option value="2">2 người (Có đôi có cặp) 👫</option>
                  <option value="3">Hơn 2 người (Kéo cả hội) 🥳</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-[#4A3728] mb-1">Để lại vài lời ướt át cho tụi mình nha ✍️</label>
              <textarea 
                rows="3" 
                placeholder="Ví dụ: Chúc hai bạn trăm năm hạnh phúc, sớm sinh quý tử..."
                value={formData.wishes}
                onChange={(e) => setFormData({...formData, wishes: e.target.value})}
                className="w-full px-4 py-2 bg-transparent border border-[#4A3728]/10 rounded-md focus:border-[#E2B75A] focus:ring-[#E2B75A] outline-none transition-colors resize-none"
              ></textarea>
            </div>

              <button 
                type="submit"
                className="w-full py-3 bg-[#7a1f24] hover:bg-[#5a1519] text-white font-bold rounded-md shadow-lg shadow-[#7a1f24]/30 transition-all active:scale-95 uppercase tracking-wider"
              >
                Chốt Đơn! 🚀
              </button>
          </form>
        )}
      </div>
    </section>
  );
}
