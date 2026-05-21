# Phase 3 Research: Kịch bản Chuyển cảnh Nghệ thuật

## Tóm tắt
Nghiên cứu các phương pháp thực hiện 3 hiệu ứng chuyển cảnh cốt lõi: SVG Handwriting, The Launch (Sương mù hạt bụi), và Color Burst bằng GSAP + React mà không cần dùng các Plugin trả phí của GreenSock (như DrawSVG). Đồng thời nghiên cứu kiến trúc CustomEvent để giao tiếp với `ParticleEngine`.

## Giải pháp kỹ thuật

### 1. SVG Handwriting (Không dùng DrawSVG Plugin)
Để vẽ nét chữ mượt mà, ta sử dụng CSS thuộc tính `stroke-dasharray` và `stroke-dashoffset`:
- Sử dụng hook `@gsap/react` (`useGSAP`) để quản lý lifecycle animation an toàn trong React.
- Lấy độ dài của nét chữ SVG: `const length = path.getTotalLength()`.
- Setup ban đầu: `gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })`.
- Animation: `gsap.to(path, { strokeDashoffset: 0, duration: 2, ease: "power2.inOut", scrollTrigger: { ... } })`.
- Yêu cầu: Bổ sung cài đặt package `@gsap/react` vào dự án.

### 2. Kích hoạt The Launch (Sương mù) qua CustomEvent
Sự kiện "The Launch" (ví dụ khi người dùng cuộn tới Hero Section kết thúc) sẽ báo hiệu cho lớp Canvas ở dưới nền tăng vọt lượng hạt bụi.
- **Tại React Component (Kích hoạt):** 
  ```javascript
  ScrollTrigger.create({
    trigger: launchRef.current,
    onEnter: () => window.dispatchEvent(new CustomEvent('canvas:launch'))
  });
  ```
- **Tại ParticleEngine (Lắng nghe):**
  Trong `bindEvents()`: `window.addEventListener('canvas:launch', this.handleLaunch)`.
  Logic `handleLaunch`: 
  1. Tăng `this.targetParticleCount = 300`.
  2. Bơm thêm hạt mới vào dưới đáy màn hình (`y = canvas.height + Math.random() * 200`).
  3. Sau 2 giây (dùng `setTimeout` hoặc `gsap.delayedCall`), trả `this.targetParticleCount = 100`.
  4. Trong hàm `update` của hạt, khi hạt bay khỏi đỉnh màn hình (`y < -10`), nếu mảng `particles.length > this.targetParticleCount`, ta loại bỏ hạt đó (hủy hàm recycle) để số lượng từ từ giảm dần về 100. Cách này giúp sương mù tan dần một cách tự nhiên.

### 3. Hiệu ứng Color Burst (ColorBurstImage Component)
- Thay vì chỉ hiện ảnh bình thường, Component này bọc thẻ `<img>` (hoặc `next/image`).
- Khởi tạo CSS ban đầu: `filter: grayscale(100%) blur(10px); opacity: 0.8;`
- Dùng ScrollTrigger: 
  ```javascript
  gsap.to(imageRef.current, {
    filter: 'grayscale(0%) blur(0px)',
    opacity: 1,
    duration: 2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: imageRef.current,
      start: "top 70%",
    }
  });
  ```
- **Gravity Pull:** GSAP ScrollTrigger cũng có thể dispatch event `canvas:gravityPull` để hạt bụi bị biến mất đột ngột.

## Kết luận cho Kế hoạch (Plan)
1. Cài đặt `@gsap/react`.
2. Sửa file `ParticleEngine.js` và `Particle.js` để hỗ trợ cơ chế thay đổi số lượng hạt (Launch) và tiêu hủy hạt (Gravity Pull) dựa trên EventListener.
3. Viết Component `<HandwritingText />` nhận `paths` SVG.
4. Viết Component `<ColorBurstImage />`.
5. Tạo một trang demo nhỏ ở `/wedding/transitions` (hoặc nhúng vào `page.jsx`) để test các Component này hoạt động tốt với cuộn chuột.
