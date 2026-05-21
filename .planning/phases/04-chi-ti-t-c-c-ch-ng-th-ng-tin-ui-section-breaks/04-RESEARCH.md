# Phase 4 Research: Chi tiết các chương thông tin (UI Sections)

## Tóm tắt
Nghiên cứu kiến trúc CSS (Tailwind) và Animation (GSAP) cho 5 component giao diện chính nhằm đảm bảo chúng hoạt động mượt mà, responsive tốt và dễ dàng nhúng vào trang chính `page.jsx`.

## 1. Hero Section (UISS-01)
- **Cấu trúc:** Một khối `h-screen` chứa ảnh nền bao phủ toàn màn hình (sử dụng Next.js `<Image fill />`). Lớp phủ mờ (Overlay) ở trên với text "Khương & Hiền".
- **GSAP Parallax:** Để tạo độ sâu, ảnh nền sẽ cuộn chậm hơn so với trang. 
  ```javascript
  gsap.to(bgRef.current, {
    yPercent: 30, // Dịch chuyển ảnh xuống 30% khi cuộn
    ease: "none",
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });
  ```
- Lời chào đích danh (Query parameters: `name`, `role`) sẽ được hiển thị ngay bên dưới dòng chữ chính.

## 2. Love Timeline (UISS-02)
- Thay vì dùng dây SVG phức tạp, giải pháp thanh lịch & an toàn là dùng thanh tiến trình cuộn (Scroll Progress Bar) dọc theo timeline.
- **Tailwind:** Khối dọc `border-l-2 border-amber-200/30 relative`. Bên trong có một thẻ `div` màu `bg-amber-400` có `height: 0%` ban đầu.
- **GSAP:** Dùng ScrollTrigger `scrub: true` để animate `height` của thanh này từ `0%` đến `100%` tương ứng với quá trình người dùng cuộn qua Timeline. Khi thanh đi qua các thẻ thông tin (Ngày quen nhau, Ngày cầu hôn, Ngày cưới), các thẻ này sẽ tự động Fade-in lên.

## 3. Save the Date Calendar (UISS-03)
- Lưới lịch Tháng 06/2026.
- **Tailwind:** Dùng `grid grid-cols-7 gap-2`.
- **Điểm nhấn:** Ô ngày cưới (06/06 và 07/06) sẽ có một vòng tròn SVG xung quanh.
- **GSAP:** Sử dụng lại kỹ thuật `stroke-dasharray` để tự động "khoanh tròn" ngày cưới khi người dùng lướt tới khu vực lịch.

## 4. Typography Breaks (UISS-04)
- Là những khoảng nghỉ nghệ thuật giữa các phần (vd: "SAVE THE DATE" hoặc "OUR LOVE").
- Dùng CSS Text Mask: 
  ```css
  .text-mask {
    background-image: url('/path/to/image.jpg');
    -webkit-background-clip: text;
    color: transparent;
    background-attachment: fixed; /* Hoặc dùng GSAP để parallax background-position */
  }
  ```
- Kết hợp Font chữ Serif trang trọng, size cực lớn (`text-6xl md:text-9xl`).

## 5. RSVP Section & Confetti (UISS-05, 06)
- Thư viện: `canvas-confetti` (siêu nhẹ, không xung đột với AntiGravity Canvas vì chạy ở lớp khác, thường là absolute on top).
- **Quy trình:** Component form có state `isSubmitted`. Khi Submit:
  1. `console.log(formData)`.
  2. `setIsSubmitted(true)`.
  3. Bắn `confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } })`.
- Giao diện form chuẩn Tailwind form elements, input có viền mỏng (`border-gray-200 focus:border-amber-400 focus:ring-amber-400`).

## Kết luận Kế hoạch
1. Cài đặt `canvas-confetti`.
2. Khởi tạo folder `components/sections/`.
3. Lần lượt viết 5 files: `HeroSection.jsx`, `TimelineSection.jsx`, `CalendarSection.jsx`, `TypographyBreak.jsx`, `RsvpSection.jsx`.
4. Ráp toàn bộ vào `app/wedding/page.jsx`, thay thế đoạn code Test/Debug cũ.
