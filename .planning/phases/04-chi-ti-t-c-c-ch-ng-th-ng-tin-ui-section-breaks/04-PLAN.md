---
wave: 1
depends_on: [3]
files_modified:
  - package.json
  - components/sections/HeroSection.jsx
  - components/sections/TimelineSection.jsx
  - components/sections/CalendarSection.jsx
  - components/sections/TypographyBreak.jsx
  - components/sections/RsvpSection.jsx
  - app/wedding/page.jsx
autonomous: true
---

# Phase 4: Chi tiết các chương thông tin (UI Sections)

## Mục tiêu
Thiết kế và lập trình 5 khối giao diện cốt lõi (Hero, Timeline, Lịch, Form RSVP, Text Mask) bằng TailwindCSS chuẩn mỹ thuật, kết hợp GSAP Animations để tạo chiều sâu và độ mượt mà. 

## Tasks

```xml
<task>
  <description>Cài đặt canvas-confetti</description>
  <action>
    Chạy lệnh `npm install canvas-confetti` để có hiệu ứng pháo hoa mượt mà cho nút Submit RSVP.
  </action>
</task>

<task>
  <description>Component HeroSection</description>
  <read_first>
    - .planning/phases/04-chi-ti-t-c-c-ch-ng-th-ng-tin-ui-section-breaks/04-RESEARCH.md
  </read_first>
  <action>
    Tạo file `components/sections/HeroSection.jsx`.
    Nhận prop `name` và `role`.
    Sử dụng Next.js `<Image fill />` làm ảnh nền (ảnh placeholder từ Unsplash).
    Thêm GSAP `yPercent` Parallax Animation khi cuộn.
    Nội dung: Lời mời thân mật đích danh khách.
  </action>
</task>

<task>
  <description>Component TimelineSection</description>
  <read_first>
    - .planning/phases/04-chi-ti-t-c-c-ch-ng-th-ng-tin-ui-section-breaks/04-RESEARCH.md
    - config/weddingData.js
  </read_first>
  <action>
    Tạo file `components/sections/TimelineSection.jsx`.
    Nhận mảng `events` đã lọc theo nhà (trai/gái).
    Thiết kế 1 đường thẳng đứng (border-l). Một thẻ div `bg-amber-400` chạy dọc xuống theo scroll.
    Mỗi mốc thời gian sẽ tự động hiện ra khi cuộn tới.
  </action>
</task>

<task>
  <description>Component CalendarSection</description>
  <read_first>
    - .planning/phases/04-chi-ti-t-c-c-ch-ng-th-ng-tin-ui-section-breaks/04-RESEARCH.md
  </read_first>
  <action>
    Tạo file `components/sections/CalendarSection.jsx`.
    Vẽ CSS Grid mô phỏng lịch tháng 06/2026.
    Sử dụng `<svg>` tròn dùng `stroke-dasharray` để GSAP tự động khoanh tròn ngày 6 và 7 khi cuộn tới.
  </action>
</task>

<task>
  <description>Component TypographyBreak</description>
  <read_first>
    - .planning/phases/04-chi-ti-t-c-c-ch-ng-th-ng-tin-ui-section-breaks/04-RESEARCH.md
  </read_first>
  <action>
    Tạo file `components/sections/TypographyBreak.jsx`.
    Tạo khối `text-7xl md:text-9xl` với CSS `background-clip: text` lồng ảnh hoa lá/cưới.
  </action>
</task>

<task>
  <description>Component RsvpSection</description>
  <read_first>
    - .planning/phases/04-chi-ti-t-c-c-ch-ng-th-ng-tin-ui-section-breaks/04-RESEARCH.md
  </read_first>
  <action>
    Tạo file `components/sections/RsvpSection.jsx`.
    Nhận prop `name`.
    Tạo form tĩnh (Họ tên, Sắp xếp tham dự).
    Xử lý hàm onSubmit: `e.preventDefault()`, `console.log(data)`, bật state Success và gọi `confetti()`.
  </action>
</task>

<task>
  <description>Tổng hợp vào page.jsx</description>
  <read_first>
    - app/wedding/page.jsx
  </read_first>
  <action>
    Sửa `app/wedding/page.jsx`.
    Import 5 component mới. 
    Lắp ráp theo thứ tự: Hero -> LaunchTrigger -> Handwriting -> TypographyBreak -> Timeline -> Calendar -> ColorBurstImage -> RSVP.
  </action>
</task>
```

## Verification

**Verification Criteria:**
1. Website có độ thẩm mỹ (Rich Aesthetics) cao: Dùng viền mềm, bo góc, màu pastel sang trọng (amber, white/transparent).
2. Khi lướt qua Hero, Parallax hoạt động.
3. Khi lướt qua Timeline, thanh chạy dọc sáng lên.
4. Khi lướt qua Lịch, có hình vẽ khoanh đỏ mượt mà ngày 6,7.
5. Khi điền Form RSVP và bấm Gửi, Confetti bắn ra nổ tung chùm màn hình.

**must_haves:**
- UISS-01: Hero Section (Parallax).
- UISS-02: Timeline.
- UISS-03: Calendar (khoanh SVG).
- UISS-04: Typography Mask.
- UISS-05: Form RSVP.
- UISS-06: Confetti.
