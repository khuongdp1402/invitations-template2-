# Phase 3 Summary: Kịch bản Chuyển cảnh Nghệ thuật

## What was built
Bộ hiệu ứng chuyển cảnh nghệ thuật (Transitions) đã được triển khai, đảm bảo tính tách biệt bằng cách giao tiếp giữa React DOM và Canvas Engine thông qua `CustomEvent`.

1. **The Launch (Sương mù hạt bụi):** `<LaunchTrigger />` tự động phát tín hiệu `canvas:launch` khi cuộn tới vị trí. `ParticleEngine` nhận tín hiệu, tăng lượng hạt lên 300 ở đáy màn hình tạo sương mù, rồi tự động tiêu hủy dần dần mượt mà sau 2 giây.
2. **SVG Handwriting:** `<HandwritingText />` kết hợp hook `@gsap/react` để vẽ mượt mà nét chữ từ trạng thái tàng hình sang rõ nét thông qua thuộc tính `stroke-dashoffset`.
3. **The Color Burst & Gravity Pull:** `<ColorBurstImage />` biến một ảnh mờ ảo (`grayscale(100%) blur(10px)`) thành một bức tranh rực màu và sắc nét ngay khi cuộn tới. Đồng thời phát tín hiệu `canvas:gravityPull`, báo cho Engine tăng gấp 3 tốc độ và tiêu diệt các hạt bụi, tạo hiệu ứng lực hút chân không.

## key-files.modified
- `package.json` (Thêm `@gsap/react`)
- `lib/canvas/Particle.js`
- `lib/canvas/ParticleEngine.js`
- `components/ui/transitions/HandwritingText.jsx`
- `components/ui/transitions/ColorBurstImage.jsx`
- `app/wedding/page.jsx`

## Self-Check: PASSED
- [x] Đã import `@gsap/react` giúp dọn dẹp animation (clean-up) tự động.
- [x] Canvas Engine không bị re-render bởi React State khi chạy event.
- [x] Các hạt bụi (Particles) có cơ chế huỷ `isDead` thông minh khi bay quá màn hình, không gây rác (memory leak).
- [x] Ảnh Unsplash Placeholder hoạt động đúng kỹ thuật Blur & Grayscale.
