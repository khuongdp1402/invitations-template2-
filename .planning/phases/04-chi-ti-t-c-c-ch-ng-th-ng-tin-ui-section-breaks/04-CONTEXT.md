# Phase 4: CHI TIẾT CÁC CHƯƠNG THÔNG TIN (UI SECTION BREAKS) - Context

**Gathered:** 2026-05-21
**Status:** Ready for planning

<domain>
## Phase Boundary

Xây dựng các Component giao diện nội dung (UI Sections) cho website thiệp cưới:
- Hero Section (Banner chào mừng đích danh khách mời).
- Love Timeline (Câu chuyện tình yêu với trục thời gian).
- Save the Date Calendar (Lịch tháng 06/2026).
- Typography Breaks (Chữ nghệ thuật lồng ghép).
- RSVP Section (Form xác nhận tham dự & Confetti bắn pháo hoa).

Phase này sẽ tập trung vào dựng UI Layout chuẩn Pixel-Perfect/Responsive bằng TailwindCSS trước, sau đó tích hợp GSAP Animation (Parallax, Masking, SVG Drawing) vào.

</domain>

<decisions>
## Implementation Decisions

### Cấu trúc Component
- Tách biệt hoàn toàn: Tạo thư mục `components/sections/` chứa `HeroSection.jsx`, `TimelineSection.jsx`, `CalendarSection.jsx`, `RsvpSection.jsx`, v.v.
- Lắp ráp tại `app/wedding/page.jsx`: Import các section này và sắp xếp theo đúng luồng kịch bản đã lên.

### Quy trình Code (Workflow)
- **Bước 1 (UI-First):** Mockup tĩnh toàn bộ bằng TailwindCSS, tập trung vào Responsive (Mobile/Desktop) và Typographic Hierarchy để đảm bảo giao diện lộng lẫy ngay cả khi chưa có GSAP. Đảm bảo UI đạt chuẩn "Rich Aesthetics" như system prompt yêu cầu (Glassmorphism, Gradient tinh tế, Typography cao cấp).
- **Bước 2 (GSAP-Layer):** Gắn các hook `useGSAP` vào từng Component tĩnh để kích hoạt các ScrollTrigger, Parallax.

### Form RSVP (Data Handling)
- Tạm thời Mock/Fake API bằng cách in ra console thay vì gửi POST Request thực tế.
- Sau khi bấm "Gửi", ngay lập tức hiển thị giao diện thành công (Success State) kèm hiệu ứng bắn Confetti Canvas (UISS-06).

</decisions>

<canonical_refs>
## Canonical References

### Phase requirements
- `.planning/REQUIREMENTS.md` — UISS-01 to UISS-06.
- UISS-01: Hero Section.
- UISS-02: Love Timeline (Dây tơ hồng SVG).
- UISS-03: Save the Date Calendar (Trái tim SVG).
- UISS-04: Typography Breaks.
- UISS-05: RSVP Form.
- UISS-06: RSVP Success Canvas Confetti.

</canonical_refs>

<specifics>
## Specific Ideas

- **Dây tơ hồng SVG (Timeline):** Tạo một file ảnh SVG dạng sóng lượn từ trên xuống, đè nó dưới nền timeline, dùng GSAP DrawSVG hoặc `stroke-dashoffset` để vẽ dần khi người dùng cuộn.
- **Confetti:** Dùng thư viện nhẹ `canvas-confetti` thay vì tự code hạt bụi để tối ưu thời gian và đảm bảo hiệu ứng pháo hoa chuẩn nhất. Sẽ cần cài đặt thư viện này (`npm i canvas-confetti`).
- **Typography Break (Text Mask):** Áp dụng CSS `background-clip: text` kết hợp với `color: transparent` và cho hình ảnh đằng sau dịch chuyển bằng GSAP Parallax để tạo sự sang trọng.

</specifics>

<deferred>
## Deferred Ideas

- API gửi data đi backend (Chuyển sang Giai đoạn Vận hành thực tế nếu cần).
- Tối ưu kích cỡ ảnh thật (Sẽ làm ở Phase 5 Performance Tuning).

</deferred>

---

*Phase: 04-chi-ti-t-c-c-ch-ng-th-ng-tin-ui-section-breaks*
*Context gathered: 2026-05-21*
