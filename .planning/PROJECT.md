# WEBSITE THIỆP CƯỚI STORYTELLING ĐỘNG

## What This Is

Đây là một website thiệp cưới động dạng storytelling dành cho cặp đôi Đỗ Phú Khương & Hoàng Thị Cẩm Hiền. Website được tối ưu hóa cho xuất tĩnh (SSG) với Next.js, mang đến trải nghiệm 60fps mượt mà, kết hợp hiệu ứng Kháng trọng lực (Anti-Gravity) và cá nhân hóa nội dung linh hoạt theo đường dẫn khách mời.

## Core Value

Truyền tải trọn vẹn câu chuyện tình yêu lãng mạn qua trải nghiệm hình ảnh, hiệu ứng vật lý bồng bềnh và sự trân trọng cá nhân hóa, đồng thời đảm bảo hiệu năng tuyệt đối (không giật lag) trên mọi thiết bị di động.

## Requirements

### Validated

(None yet - greenfield project)

### Active

- [ ] Thiết lập kiến trúc dự án Next.js (App Router) với cơ chế Static Export (SSG).
- [ ] Xây dựng cơ chế Dynamic Mapping phân tách nội dung dựa vào URL Query Parameters (`side`, `name`, `role`).
- [ ] Triển khai Core Engine Kháng trọng lực bằng Canvas (không dùng DOM) với logic vật lý trục Y, trục X và cơ chế Recycle.
- [ ] Tích hợp GSAP ScrollTrigger để đồng bộ tốc độ cuộn chuột với vận tốc hạt bay.
- [ ] Xây dựng kịch bản chuyển cảnh nghệ thuật (Vẽ nét chữ viết tay, The Launch, The Gravity Pull, The Color Burst).
- [ ] Triển khai Hero Section với Parallax và Lời chào cá nhân hóa.
- [ ] Triển khai Love Timeline với hiệu ứng sợi dây tơ hồng SVG.
- [ ] Triển khai Save the Date Calendar với đường vẽ khoanh vùng ngày cưới động.
- [ ] Triển khai Typography Breaks xen kẽ với kỹ thuật Text Masking.
- [ ] Triển khai form RSVP điền sẵn (Pre-fill) và hiệu ứng Canvas-confetti ăn mừng.
- [ ] Thiết lập Responsive Breakpoint Listener để giới hạn tài nguyên hạt trên Mobile (<768px).
- [ ] Tối ưu hóa tài nguyên hình ảnh (.webp/.avif, fixed dimensions/aspect-ratio) và chặn tương tác lỗi (`pointer-events: none` trên canvas).

### Out of Scope

- Không sử dụng thẻ HTML (DOM) để tạo hiệu ứng hạt chuyển động — Tránh lỗi thắt nút cổ chai Layout Thrashing trên Mobile.

## Context

- Cặp đôi: Đỗ Phú Khương & Hoàng Thị Cẩm Hiền
- Địa điểm tổ chức: Đắk Lắk (Quảng Phú & Ea M'Droh)
- Thời gian: Tháng 06/2026
- Hiện trạng: Bắt đầu từ đầu (Greenfield) trong repository mới.

## Constraints

- **Tech stack**: Next.js (App Router), Canvas, GSAP — Đảm bảo hiệu suất tĩnh và hiệu ứng động mượt mà.
- **Performance**: Phải đạt hiệu năng 60fps, tốc độ tải trang dưới 1 giây.
- **Mobile Hardware**: Thiết bị dưới 768px bị giảm số lượng hạt (35-40) và tắt tương tác chuột để tránh quá tải CPU.
- **Image Size**: Toàn bộ ảnh cưới phải dùng định dạng `.webp` hoặc `.avif` và dung lượng dưới 200KB/tấm.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Sử dụng WebGL/Canvas cho hạt bụi | Tránh Layout Thrashing trên Mobile, giữ FPS 60 | — Pending |
| Tái chế đối tượng (Culling & Recycle) hạt | Giữ dung lượng RAM cố định, không tăng tiến theo thời gian | — Pending |
| SSG với Next.js App Router | Đảm bảo tốc độ tải trang < 1s và chịu tải cao từ mạng xã hội | — Pending |

---
*Last updated: 2026-05-21 after initialization*

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state
