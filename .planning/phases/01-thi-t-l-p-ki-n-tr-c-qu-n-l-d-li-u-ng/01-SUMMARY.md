# Phase 1 Summary: Khởi tạo kiến trúc và dữ liệu động

## What was built
Dự án Next.js đã được khởi tạo thành công dưới dạng Static Site Generation (SSG). 
Tạo cấu trúc dữ liệu duy nhất (`weddingData.js`), xây dựng SplashScreen và tích hợp vào React Suspense fallback trong `app/wedding/page.jsx` để xử lý query params (`side`, `name`, `role`) an toàn khi SSG. Thư viện GSAP cũng đã được cài đặt sẵn sàng.

## key-files.created
- package.json
- next.config.mjs
- app/wedding/page.jsx
- config/weddingData.js
- components/ui/SplashScreen.jsx

## Self-Check: PASSED
- [x] Dự án build thành công với lệnh `npm run build`.
- [x] Xuất ra thư mục `out/`.
- [x] Có file tĩnh `out/wedding.html`.
- [x] Các requirement SSG và URL parameters (ARCH-01 -> ARCH-04) đã được đáp ứng.
