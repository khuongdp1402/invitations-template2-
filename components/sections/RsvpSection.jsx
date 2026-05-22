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
    <section className="py-24 px-4 relative z-10">
      <div className="max-w-xl mx-auto bg-black/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-serif text-[#E5D3B3] mb-2">Phúc Đáp</h2>
          <p className="text-gray-400 font-light">Sự hiện diện của bạn là niềm vinh hạnh cho gia đình chúng tôi</p>
        </div>

        {isSubmitted ? (
          <div className="text-center py-12 space-y-4 animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200 text-green-500">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-serif text-gray-100">Cảm ơn {name || 'bạn'}!</h3>
            <p className="text-gray-300">Chúng tôi đã nhận được phản hồi. Hẹn gặp bạn tại lễ cưới nhé!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Tên khách mời</label>
              <input 
                type="text" 
                value={name || ''} 
                disabled 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-700 rounded-md text-gray-400 cursor-not-allowed"
              />
              <p className="text-xs text-gray-400 mt-1">* Tên được điền tự động từ thiệp mời</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Bạn sẽ tham dự chứ?</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="attendance" 
                    value="yes"
                    checked={formData.attendance === 'yes'}
                    onChange={(e) => setFormData({...formData, attendance: e.target.value})}
                    className="text-amber-500 focus:ring-amber-400"
                  />
                  <span className="text-gray-200">Chắc chắn rồi!</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="attendance" 
                    value="no"
                    checked={formData.attendance === 'no'}
                    onChange={(e) => setFormData({...formData, attendance: e.target.value})}
                    className="text-amber-500 focus:ring-amber-400"
                  />
                  <span className="text-gray-200">Rất tiếc không thể đến</span>
                </label>
              </div>
            </div>

            {formData.attendance === 'yes' && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-sm font-medium text-gray-200 mb-1">Số người tham dự</label>
                <select 
                  value={formData.guests}
                  onChange={(e) => setFormData({...formData, guests: e.target.value})}
                  className="w-full px-4 py-2 bg-[#0A1128] border border-gray-700 rounded-md focus:border-amber-400 focus:ring-amber-400 outline-none transition-colors"
                >
                  <option value="1">1 người (Chỉ mình tôi)</option>
                  <option value="2">2 người (Đi cùng người thương)</option>
                  <option value="3">Hơn 2 người (Đi cùng gia đình)</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Lời chúc gửi tới Cô dâu & Chú rể</label>
              <textarea 
                rows="3" 
                placeholder="Gửi gắm chút tình cảm vào đây nhé..."
                value={formData.wishes}
                onChange={(e) => setFormData({...formData, wishes: e.target.value})}
                className="w-full px-4 py-2 bg-[#0A1128] border border-gray-700 rounded-md focus:border-amber-400 focus:ring-amber-400 outline-none transition-colors resize-none"
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full py-3 bg-[#D4AF37] hover:bg-amber-500 text-white font-semibold rounded-md shadow-lg shadow-amber-200 transition-all active:scale-95 uppercase tracking-wider"
            >
              Gửi Phản Hồi
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
