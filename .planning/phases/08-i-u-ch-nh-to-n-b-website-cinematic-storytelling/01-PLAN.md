---
wave: 1
depends_on: []
files_modified:
  - "config/weddingData.ts"
  - "app/layout.tsx"
  - "app/page.tsx"
  - "components/StoryEngine.tsx"
  - "components/sections/HeroSection.tsx"
  - "components/ui/GoldenThread.tsx"
  - "components/sections/FloatingGallery.tsx"
  - "components/sections/RSVPEnvelope.tsx"
  - "components/sections/CinematicEnding.tsx"
autonomous: true
---

# Plan 1: Cinematic Storytelling Implementation (Phase 8)

<must_haves>
- Thực thi đúng chuẩn theo các quy định trong 6 Volumes của WSDD.
- Setup thư viện `Lenis` cho Smooth Scroll.
- Mọi component đều đọc Data từ `weddingData.ts`.
- Mọi hiệu ứng cuộn phải dùng GSAP ScrollTrigger.
</must_haves>

<step>
<action>
**Prompt 1: Nền móng & Cấu trúc Dữ liệu**
- Đọc Volume 3 và Volume 5.
- Cài đặt/Kiểm tra thư viện `Lenis` (Smooth Scroll), Tailwind CSS.
- Tạo file `config/weddingData.ts` chuẩn TypeScript.
- Dựng layout rỗng (chưa gắn GSAP).
</action>
<read_first>
- docs/WSDD/Volume-3-Design-System.mdx
- docs/WSDD/Volume-5-Technical-Data-Architecture.mdx
</read_first>
<acceptance_criteria>
- File `weddingData.ts` được tạo.
- Lenis được wrap ở mức RootLayout.
</acceptance_criteria>
</step>

<step>
<action>
**Prompt 2: Color of Time (Engine Chuyển màu)**
- Đọc Volume 1 và Volume 2.
- Tạo Component `<StoryEngine />` (hoặc đặt trong root). 
- Chứa 1 thẻ div `fixed -z-10` bắt background color.
- Thiết lập GSAP ScrollTrigger để background tự chuyển đổi màu sắc theo tiến trình cuộn.
</action>
<read_first>
- docs/WSDD/Volume-1-Creative-Story-Bible.mdx
- docs/WSDD/Volume-2-UX-Flow-Storyboard.mdx
</read_first>
<acceptance_criteria>
- Cuộn chuột thì background color thay đổi mượt mà.
</acceptance_criteria>
</step>

<step>
<action>
**Prompt 3: Chapter 0 (The Wax Seal & Hero)**
- Đọc Volume 1 và Volume 4.
- Thiết kế Hero Section. Áp dụng GSAP để Pin màn hình.
- Màn hình đen: "Chạm để bắt đầu".
- Chuỗi sự kiện: Click -> Phát nhạc -> Text mờ đi -> Ảnh Hero hiện & Zoom siêu chậm trong 10s -> Unpin.
</action>
<read_first>
- docs/WSDD/Volume-1-Creative-Story-Bible.mdx
- docs/WSDD/Volume-4-Motion-Interaction-Bible.mdx
</read_first>
<acceptance_criteria>
- Nhạc nền chỉ bắt đầu khi người dùng click.
- Hero Image zoom chậm 1.15 trong 10s rồi mới cho phép cuộn tiếp.
</acceptance_criteria>
</step>

<step>
<action>
**Prompt 4: The Golden Thread (Sợi chỉ định mệnh)**
- Đọc Volume 1 và Volume 2.
- Tạo `<GoldenThread />` đứng độc lập.
- Vẽ SVG path dọc toàn màn hình với GSAP ScrollTrigger + stroke-dashoffset scrub: 1.
</action>
<read_first>
- docs/WSDD/Volume-1-Creative-Story-Bible.mdx
- docs/WSDD/Volume-2-UX-Flow-Storyboard.mdx
</read_first>
<acceptance_criteria>
- Sợi chỉ đỏ chạy song song với vị trí cuộn trang.
</acceptance_criteria>
</step>

<step>
<action>
**Prompt 5: Floating Memories (Parallax Engine)**
- Đọc Volume 4 và Volume 5.
- Tạo Component `<FloatingGallery />`. Bố trí ảnh ngẫu nhiên bằng `position: absolute`.
- Đọc attribute `data-speed` và GSAP ScrollTrigger để tính trục Y parallax. Không dùng Three.js.
</action>
<read_first>
- docs/WSDD/Volume-4-Motion-Interaction-Bible.mdx
- docs/WSDD/Volume-5-Technical-Data-Architecture.mdx
</read_first>
<acceptance_criteria>
- Ảnh trôi nổi ở các tốc độ khác nhau. Không giật lag.
</acceptance_criteria>
</step>

<step>
<action>
**Prompt 6: RSVP Envelope & Cinematic Ending**
- Đọc Volume 4 và Volume 2.
- Dựng form RSVP với 3 state: Đóng -> Mở -> Rút thiệp.
- Dựng Ending Section: cuộn đến cuối -> fade to black -> nhạc fade out -> Typewriter text -> pháo giấy.
</action>
<read_first>
- docs/WSDD/Volume-2-UX-Flow-Storyboard.mdx
- docs/WSDD/Volume-4-Motion-Interaction-Bible.mdx
</read_first>
<acceptance_criteria>
- Phong thư mở mượt mà đúng state.
- Hiệu ứng pháo giấy và kết thúc hiển thị chính xác.
</acceptance_criteria>
</step>
