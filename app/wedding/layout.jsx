import React from 'react';
import AntiGravityCanvas from '@/components/canvas/AntiGravityCanvas';

export const metadata = {
  title: 'Thiệp Cưới Khương & Hiền',
  description: 'Website thiệp cưới động dạng storytelling dành cho cặp đôi Phú Khương và Cẩm Hiền.',
};

export default function WeddingLayout({ children }) {
  return (
    <div className="relative min-h-screen bg-[#FAF3F0]">
      {/* 
        AntiGravityCanvas (z-0) 
        Nó sẽ làm nền cho tất cả các trang con bên trong /wedding
      */}
      <AntiGravityCanvas />

      {/* 
        Container cho các trang con (z-10). 
        Đảm bảo thẻ này đè lên trên Canvas để hiển thị chữ/hình.
        Tuy Canvas có pointer-events-none, nhưng việc set z-index vẫn tốt để tránh lỗi DOM stacking.
      */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
