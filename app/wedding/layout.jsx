import React from 'react';

export const metadata = {
  title: 'Thiệp Cưới Khương & Hiền',
  description: 'Website thiệp cưới động dạng storytelling dành cho cặp đôi Phú Khương và Cẩm Hiền.',
};

export default function WeddingLayout({ children }) {
  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden">
      {/* 
        Container chính cho trang thiệp
        Không cần padding/margin vì các section sẽ tự lo
      */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
