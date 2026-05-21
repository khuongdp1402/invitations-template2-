# Requirements: WEBSITE THIỆP CƯỚI STORYTELLING ĐỘNG

**Defined:** 2026-05-21
**Core Value:** Truyền tải trọn vẹn câu chuyện tình yêu lãng mạn qua trải nghiệm hình ảnh, hiệu ứng vật lý bồng bềnh và sự trân trọng cá nhân hóa, đồng thời đảm bảo hiệu năng tuyệt đối (không giật lag) trên mọi thiết bị di động.

## v1 Requirements

### Architecture & Data (Kiến trúc & Dữ liệu)

- [ ] **ARCH-01**: Khởi tạo dự án Next.js (App Router) tối ưu hóa Static Export (SSG).
- [ ] **ARCH-02**: Xây dựng cấu trúc thư mục `/app/wedding/page.jsx`, `/config/weddingData.js`, `/components/canvas`, `/components/sections`.
- [ ] **ARCH-03**: Xây dựng logic Dynamic Mapping đọc URL Query (`side`, `name`, `role`).
- [ ] **ARCH-04**: Ẩn/hiện ưu tiên nội dung theo logic nhà trai (`side=nhatrai`) và nhà gái (`side=nhagai`).

### Core Engine Kháng trọng lực (Anti-Gravity Canvas)

- [ ] **ENGI-01**: Khởi tạo Canvas (không DOM) để vẽ hạt bụi bay ngược (trục Y).
- [ ] **ENGI-02**: Áp dụng thuật toán lượng giác (trục X) tạo độ đung đưa tự nhiên cho hạt bụi.
- [ ] **ENGI-03**: Xử lý logic Recycle tái chế hạt bụi khi chạm đỉnh (y < -10px).
- [ ] **ENGI-04**: Tích hợp GSAP ScrollTrigger đồng bộ vận tốc cuộn trang với vận tốc bay của hạt.
- [ ] **ENGI-05**: Responsive breakpoint: <768px giảm lượng hạt còn 35-40, tắt tương tác chuột. Trên 768px hiện 100-120 hạt + tương tác chuột.
- [ ] **ENGI-06**: Chặn tương tác lỗi: Thêm `pointer-events: none` vào lớp thẻ `<canvas>`.

### Chuyển cảnh Nghệ thuật (Transitions)

- [ ] **TRAN-01**: Vẽ nét chữ viết tay (SVG Handwriting) cho tên khách mời bằng `stroke-dasharray`.
- [ ] **TRAN-02**: The Launch: Cuộn qua timeline tự động tăng x3 lượng hạt bụi, tạo sương mờ.
- [ ] **TRAN-03**: The Gravity Pull: Hạt bụi bị hút về tâm các bức ảnh cưới và biến mất.
- [ ] **TRAN-04**: The Color Burst: Ảnh cưới chuyển từ Grayscale 100%/Blur 10px sang Grayscale 0%/Blur 0px bằng GSAP Stagger khi hạt bụi chạm.

### Giao diện thông tin (UI Sections)

- [ ] **UISS-01**: Hero Section: Banner ảnh cưới Parallax, hiển thị câu chào đích danh.
- [ ] **UISS-02**: Love Timeline: Trục thời gian có dây tơ hồng SVG tự động chạy theo scroll, scale hình kỷ niệm.
- [ ] **UISS-03**: Save the Date Calendar: Lưới lịch tháng 06/2026, khoanh vòng tròn/trái tim SVG động quanh ngày cưới khi scroll.
- [ ] **UISS-04**: Typography Breaks: 2-3 text breaks lớn áp dụng Text Masking lồng ảnh/video chạy ngầm.
- [ ] **UISS-05**: RSVP: Form điền sẵn tên khách.
- [ ] **UISS-06**: RSVP Success: Bắn pháo hoa confetti bằng Canvas sau khi gửi.
- [ ] **UISS-07**: Hình ảnh: Toàn bộ ảnh `.webp` hoặc `.avif` <200KB, set cứng kích thước/aspect-ratio.

## v2 Requirements

(Deferred)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Hạt bụi bằng thẻ HTML (DOM) | Gây Layout Thrashing trên Mobile |
| Động cơ vật lý nặng nề (Matter.js) | Cần 60fps nhẹ nhàng, chỉ cần tự code toán học cơ bản cho Canvas |
| Cấu trúc SSR/Server rendering | Website thiệp cưới cần tải cực nhanh, chịu tải cao đột biến, yêu cầu SSG hoàn toàn |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| ARCH-01 | Phase 1 | Pending |
| ARCH-02 | Phase 1 | Pending |
| ARCH-03 | Phase 1 | Pending |
| ARCH-04 | Phase 1 | Pending |
| ENGI-01 | Phase 2 | Pending |
| ENGI-02 | Phase 2 | Pending |
| ENGI-03 | Phase 2 | Pending |
| ENGI-04 | Phase 2 | Pending |
| ENGI-05 | Phase 5 | Pending |
| ENGI-06 | Phase 5 | Pending |
| TRAN-01 | Phase 3 | Pending |
| TRAN-02 | Phase 3 | Pending |
| TRAN-03 | Phase 3 | Pending |
| TRAN-04 | Phase 3 | Pending |
| UISS-01 | Phase 4 | Pending |
| UISS-02 | Phase 4 | Pending |
| UISS-03 | Phase 4 | Pending |
| UISS-04 | Phase 4 | Pending |
| UISS-05 | Phase 4 | Pending |
| UISS-06 | Phase 4 | Pending |
| UISS-07 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 21 total
- Mapped to phases: 21
- Unmapped: 0 ✓

---
*Requirements defined: 2026-05-21*
*Last updated: 2026-05-21 after initial definition*
