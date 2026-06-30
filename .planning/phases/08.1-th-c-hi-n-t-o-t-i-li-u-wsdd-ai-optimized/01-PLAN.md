---
wave: 1
depends_on: []
files_modified:
  - "docs/WSDD/Volume-1-Creative-Story-Bible.mdx"
  - "docs/WSDD/Volume-2-UX-Flow-Storyboard.mdx"
  - "docs/WSDD/Volume-3-Design-System.mdx"
  - "docs/WSDD/Volume-4-Motion-Interaction-Bible.mdx"
  - "docs/WSDD/Volume-6-Anti-Gravity-Implementation-Guide.mdx"
autonomous: true
---

# Plan 1: Viết tài liệu AI-Optimized WSDD (Volumes 1, 2, 3, 4, 6)

<must_haves>
- Hoàn thành đầy đủ 5 volumes còn lại theo đúng định hướng ở 08.1-CONTEXT.md
- Sử dụng format MDX với phong cách viết cho máy đọc
- Đảm bảo có các constraint MUST, NEVER
</must_haves>

<step>
<action>
Viết nội dung cho `docs/WSDD/Volume-1-Creative-Story-Bible.mdx`. Định hình nhân cách AI (Core System Prompt). Khai sinh 3 thực thể vĩnh cửu: The Golden Thread, Color of Time, Floating Memory. Nhấn mạnh Sợi chỉ đỏ là Layer độc lập. Thiết lập The "NEVER-DO" List triệt để.
</action>
<read_first>
- .planning/phases/08.1-th-c-hi-n-t-o-t-i-li-u-wsdd-ai-optimized/08.1-CONTEXT.md
</read_first>
<acceptance_criteria>
- File `docs/WSDD/Volume-1-Creative-Story-Bible.mdx` tồn tại.
- File có chứa The NEVER-DO list rõ ràng.
</acceptance_criteria>
</step>

<step>
<action>
Viết nội dung cho `docs/WSDD/Volume-2-UX-Flow-Storyboard.mdx`. Ánh xạ 9 Chương kịch bản thành các Trigger GSAP ScrollTrigger dựa trên % Scroll. Ví dụ: [Frame 001] -> 0-15% Scroll -> Zoom Image 1.15x. [Frame 002] -> 15-25% Scroll -> Unpin, Sợi chỉ bắt đầu vẽ xuống.
</action>
<read_first>
- .planning/phases/08.1-th-c-hi-n-t-o-t-i-li-u-wsdd-ai-optimized/08.1-CONTEXT.md
</read_first>
<acceptance_criteria>
- File `docs/WSDD/Volume-2-UX-Flow-Storyboard.mdx` tồn tại.
- Mô tả rõ các Trigger (Điểm neo) dựa trên % Scroll cho các Chapter.
</acceptance_criteria>
</step>

<step>
<action>
Viết nội dung cho `docs/WSDD/Volume-3-Design-System.mdx`. Khóa chặt biến số thiết kế, không cho AI tự phối màu. Thiết lập Design Tokens. Ép dùng quy tắc Negative Space bằng `vh` (VD: min(30vh, 250px)) cho khoảng cách các chapter. Định nghĩa font Serif khổng lồ cho Quote và Sans-serif siêu nhỏ nhắn cho caption.
</action>
<read_first>
- .planning/phases/08.1-th-c-hi-n-t-o-t-i-li-u-wsdd-ai-optimized/08.1-CONTEXT.md
</read_first>
<acceptance_criteria>
- File `docs/WSDD/Volume-3-Design-System.mdx` tồn tại.
- Có định nghĩa rõ CSS Variables/Tailwind config và quy định spacing.
</acceptance_criteria>
</step>

<step>
<action>
Viết nội dung cho `docs/WSDD/Volume-4-Motion-Interaction-Bible.mdx`. Chuẩn hóa toàn bộ logic animation để web không bị loạn nhịp. Cung cấp công thức chuẩn cho Floating Memory (Y-axis Parallax Speed = ngẫu nhiên từ 0.5 đến 1.5). Quy định State của Envelope RSVP (State 1: Đóng -> State 2: Mở nắp -> State 3: Trượt thư lên).
</action>
<read_first>
- .planning/phases/08.1-th-c-hi-n-t-o-t-i-li-u-wsdd-ai-optimized/08.1-CONTEXT.md
</read_first>
<acceptance_criteria>
- File `docs/WSDD/Volume-4-Motion-Interaction-Bible.mdx` tồn tại.
- Định nghĩa chi tiết Animation parameters và Envelope states.
</acceptance_criteria>
</step>

<step>
<action>
Viết nội dung cho `docs/WSDD/Volume-6-Anti-Gravity-Implementation-Guide.mdx`. Tạo bản đồ hành động (Roadmap) chia thành các câu prompt cực ngắn để nạp (feed) cho AI khi code. Cung cấp ví dụ thực thi chi tiết từ Phase 1 đến kết thúc.
</action>
<read_first>
- .planning/phases/08.1-th-c-hi-n-t-o-t-i-li-u-wsdd-ai-optimized/08.1-CONTEXT.md
</read_first>
<acceptance_criteria>
- File `docs/WSDD/Volume-6-Anti-Gravity-Implementation-Guide.mdx` tồn tại.
- Có chứa danh sách các prompts có thể copy-paste được.
</acceptance_criteria>
</step>
