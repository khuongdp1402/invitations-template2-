# Phase 4 Summary: Chi tiết các chương thông tin (UI Sections)

## What was built
Website thiệp cưới đã chính thức "mặc áo mới" với giao diện sang trọng (Rich Aesthetics) và chuẩn Responsive. Toàn bộ thông tin cứng nhắc đã được chuyển đổi thành các khối Storytelling mượt mà.

1. **HeroSection:** Banner bao phủ toàn màn hình, có hiệu ứng GSAP Parallax cuộn ảnh siêu mượt và lời chào đích danh khách mời.
2. **TimelineSection:** Trục thời gian hiển thị lộ trình đám cưới (nhà trai/gái tự động filter). Khi cuộn chuột, một tia sáng màu vàng (GSAP ScaleY) chạy dọc theo viền và làm các sự kiện pop-up.
3. **CalendarSection:** Lịch hiển thị tháng 06/2026. Một đường vẽ vòng tròn bằng SVG tự động bao quanh ngày cưới (6, 7) khi khách mời lướt qua.
4. **TypographyBreak:** Typography siêu lớn lồng hình ảnh bên trong dòng chữ "OUR STORY" bằng CSS `background-clip: text`.
5. **RsvpSection:** Form điền xác nhận tham dự. Tích hợp nút Gửi có chức năng bắn pháo hoa Confetti tung toé màn hình.

## key-files.modified
- `package.json` (Cài đặt `canvas-confetti`)
- `components/sections/HeroSection.jsx`
- `components/sections/TimelineSection.jsx`
- `components/sections/CalendarSection.jsx`
- `components/sections/TypographyBreak.jsx`
- `components/sections/RsvpSection.jsx`
- `app/wedding/page.jsx`

## Self-Check: PASSED
- [x] Lắp ráp 5 Section thành công, code trong `page.jsx` rất gọn.
- [x] Dùng TailwindCSS màu Amber, font Serif chuẩn phong cách thiệp cưới sang trọng.
- [x] GSAP ScrollTrigger hoạt động độc lập và mượt mà trong từng component.
- [x] Confetti không bị xung đột với Canvas Kháng trọng lực (Anti-Gravity).
