# Phase 2 Summary: Triển khai Core Engine Kháng Trọng Lực

## What was built
Hệ thống hạt bụi lơ lửng kháng trọng lực đã được xây dựng bằng thẻ Canvas siêu nhẹ. 
Dữ liệu của 100 hạt bụi được tính toán trong một vòng lặp `requestAnimationFrame` đồng bộ với GSAP (`gsap.ticker.add`) để đạt hiệu năng 60fps. Hạt bụi dao động qua lại theo hàm `Math.sin` (trục X) và bay lên đều đặn (trục Y). GSAP ScrollTrigger được dùng để theo dõi `velocity` của trang, cộng hưởng tạo hiệu ứng gió tự nhiên khi người dùng vuốt. Mảng hạt bụi được thiết kế dạng Memory Pool (Recycle) để giữ bộ nhớ phẳng (không Garbage Collection drops).

## key-files.created
- lib/canvas/Particle.js
- lib/canvas/ParticleEngine.js
- components/canvas/AntiGravityCanvas.jsx
- app/wedding/layout.jsx

## Self-Check: PASSED
- [x] Lớp vẽ hạt Canvas được đặt cố định phía sau giao diện (fixed inset-0 z-0) và cho phép click xuyên thấu (pointer-events-none).
- [x] Tính toán lượng giác tạo đung đưa.
- [x] Cơ chế Recycle hạt tái chế mảng.
- [x] ScrollTrigger bắt được tốc độ cuộn.
- [x] Responsive bù đắp theo `devicePixelRatio` cho Retina Display.
