"use client";

import React from 'react';

export default function FamilySection() {
  return (
    <section className="py-24 px-4 relative z-10 bg-[#fdfcf0]">
      <div className="max-w-4xl mx-auto">
        
        {/* Lưới 2 họ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 mb-20 text-center">
          
          {/* Nhà Trai */}
          <div className="space-y-6 relative">
            <div className="flex flex-col items-center">
              <h3 className="text-xs tracking-[0.3em] text-[#d4af37] font-semibold uppercase mb-6">Nhà Trai</h3>
              <p className="text-gray-700 font-serif text-lg mb-1">Ông Đặng Công Tí</p>
              <p className="text-gray-700 font-serif text-lg">Bà Đỗ Thị Bạch Tuyết</p>
            </div>
            
            <div className="mt-8">
              <h2 className="text-5xl md:text-6xl font-calligraphy text-[#7a1f24] mb-2">Thanh Tùng</h2>
              <p className="text-xs tracking-[0.2em] text-gray-500 uppercase">Trưởng Nam</p>
            </div>

            {/* Dấu phân cách nhỏ (chỉ hiện trên Mobile) */}
            <div className="w-12 h-px bg-amber-200 mx-auto mt-12 md:hidden" />
          </div>

          {/* Đường kẻ dọc phân cách (chỉ hiện trên Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-amber-200 to-transparent -translate-x-1/2" />

          {/* Nhà Gái */}
          <div className="space-y-6">
            <div className="flex flex-col items-center">
              <h3 className="text-xs tracking-[0.3em] text-[#d4af37] font-semibold uppercase mb-6">Nhà Gái</h3>
              <p className="text-gray-700 font-serif text-lg mb-1">Ông Nguyễn Văn Quý</p>
              <p className="text-gray-700 font-serif text-lg">Bà Lê Thị Gái</p>
            </div>
            
            <div className="mt-8">
              <h2 className="text-5xl md:text-6xl font-calligraphy text-[#7a1f24] mb-2">Hương Giang</h2>
              <p className="text-xs tracking-[0.2em] text-gray-500 uppercase">Ái Nữ</p>
            </div>
          </div>

        </div>

        {/* Thông tin Lễ Tân Hôn */}
        <div className="text-center mt-16 max-w-2xl mx-auto border-t border-b border-amber-200 py-10">
          <h3 className="text-3xl font-calligraphy text-[#7a1f24] mb-8">Lễ Tân Hôn</h3>
          
          <div className="flex justify-center gap-12 md:gap-24 mb-6">
            <div className="flex flex-col items-center">
              <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">Giờ làm lễ</p>
              <p className="text-3xl font-serif text-[#7a1f24]">11:00</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">Giờ nhập tiệc</p>
              <p className="text-3xl font-serif text-[#7a1f24]">12:30</p>
            </div>
          </div>

          <p className="text-xl md:text-2xl font-serif text-gray-800 mb-2">Thứ Sáu, 13/02/2026</p>
          <p className="text-sm text-gray-500 font-light italic mb-8">Nhằm ngày 26 tháng Chạp năm Ất Tỵ</p>

          <p className="text-xs tracking-[0.3em] text-[#d4af37] font-semibold uppercase mb-4">Địa điểm</p>
          <p className="text-xl font-serif text-gray-800 mb-2">Tư Gia Nhà Trai</p>
          <p className="text-sm text-gray-600 font-light">Khu phố Lại Khánh Nam, phường Bồng Sơn, tỉnh Gia Lai</p>
        </div>

      </div>
    </section>
  );
}
