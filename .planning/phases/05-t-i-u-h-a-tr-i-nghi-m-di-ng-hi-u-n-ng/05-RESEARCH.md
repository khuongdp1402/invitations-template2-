# Phase 05 Research: TỐI ƯU HÓA TRẢI NGHIỆM DI ĐỘNG & HIỆU NĂNG

## Goal
Áp dụng tối ưu tài nguyên (hình ảnh, responsive canvas) để đáp ứng Webview Zalo/FB.

## Success Criteria Checklist
1. Canvas giảm số lượng hạt dưới ngưỡng 768px tự động.
2. Có thể tương tác click/map xuyên qua lớp Canvas mà không vướng (`pointer-events: none`).
3. Dung lượng page load ảnh được giữ nhỏ gọn.

## Current State Analysis
- **Canvas Particle Count**: In `lib/canvas/ParticleEngine.js`, line 14: `this.particleCount = window.innerWidth < 768 ? 40 : 100;` - this already correctly implements the particle reduction for mobile devices.
- **Pointer Events**: In `components/canvas/AntiGravityCanvas.jsx`, line 26: `className="fixed inset-0 pointer-events-none z-0"` - this already correctly allows interactions to pass through the canvas.
- **Image Sizes**: In `next.config.mjs`, `output: 'export'` and `unoptimized: true` are set. This means Next.js doesn't auto-optimize images for responsive screen sizes. We need to implement a mechanism for responsive image loading or rely strictly on the rule: "Toàn bộ ảnh cưới phải dùng định dạng .webp hoặc .avif và dung lượng dưới 200KB/tấm". Currently, the app uses placeholder images from Unsplash.

## Requirements for Planning
Since Criteria 1 and 2 are already implemented, the plan should focus on:
1. Verifying the ParticleEngine logic works correctly on resize events. Currently, `ParticleEngine.resize` does not re-evaluate `this.particleCount`. It should adjust `particleCount` dynamically if the user resizes from desktop to mobile, though practically on mobile Webview this is static on load. We can enhance the resize handler to recreate particles if the breakpoint crosses 768px.
2. Adding `loading="lazy"` and `fetchPriority="low"` to non-critical images in `Gallery3D.jsx` and `GallerySection.jsx`.
3. Updating placeholder Unsplash URLs to use lower resolution `&w=800` parameters instead of `&w=1920` for mobile thumbnails where applicable, to simulate the 200KB requirement.

## Validation Architecture
- **Manual testing**: Open in Chrome DevTools (Mobile View) and verify canvas particle count.
- **Lighthouse**: Run a performance audit to ensure images don't block render.
