---
wave: 1
depends_on: [2]
files_modified:
  - package.json
  - lib/canvas/Particle.js
  - lib/canvas/ParticleEngine.js
  - components/ui/transitions/HandwritingText.jsx
  - components/ui/transitions/ColorBurstImage.jsx
  - app/wedding/page.jsx
autonomous: true
---

# Phase 3: Kịch bản Chuyển cảnh Nghệ thuật (Transitions)

## Mục tiêu
Trang bị các hiệu ứng nghệ thuật lãng mạn cho thiệp cưới, bao gồm vẽ nét chữ ký SVG (Handwriting), sương mù hạt bụi (The Launch), và ảnh rực màu dần (Color Burst), kết hợp giao tiếp với Canvas qua CustomEvent.

## Tasks

```xml
<task>
  <description>Cài đặt @gsap/react</description>
  <read_first>
    - .planning/phases/03-k-ch-b-n-chuy-n-c-nh-ngh-thu-t/03-RESEARCH.md
  </read_first>
  <action>
    Chạy lệnh `npm install @gsap/react` để cung cấp hook quản lý GSAP an toàn bên trong component React.
  </action>
  <acceptance_criteria>
    - `package.json` chứa `@gsap/react`.
  </acceptance_criteria>
</task>

<task>
  <description>Sửa Core Engine Canvas hỗ trợ Event "The Launch" và "Gravity Pull"</description>
  <read_first>
    - lib/canvas/Particle.js
    - lib/canvas/ParticleEngine.js
  </read_first>
  <action>
    - Sửa `Particle.js`: Thêm thuộc tính `this.isDead = false`. Trong `update()`, nếu hạt bay ra khỏi màn hình (y < -10) và `this.isDead === true`, trả về `false` để báo cho engine biết nên loại bỏ hạt này (không recycle). Nếu không dead, recycle bình thường và trả về `true`.
    - Sửa `ParticleEngine.js`:
      1. Trong vòng lặp `render()`, kiểm tra giá trị trả về của `p.update()`. Nếu là `false`, dùng mảng `filter` hoặc vòng lặp ngược để xóa `p` khỏi `this.particles`.
      2. Viết hàm `handleLaunch()`: Tạo thêm 200 hạt mới ở đáy màn hình, `push` vào mảng. Set timeout 2-3 giây sau đó sẽ gọi `stopLaunch()`.
      3. Viết hàm `stopLaunch()`: Duyệt qua các hạt bị dư (từ index 100 trở đi) và set `p.isDead = true`. Chúng sẽ tự biến mất khi bay khỏi đỉnh màn hình, tạo sương mù tan tự nhiên (TRAN-02).
      4. Viết hàm `handleGravity()`: Tăng vọt tốc độ của tất cả hạt (hoặc set `isDead = true` hết).
      5. Gắn `window.addEventListener('canvas:launch', this.handleLaunch.bind(this))` và `canvas:gravityPull` vào `bindEvents()`.
  </action>
  <acceptance_criteria>
    - Canvas Engine đáp ứng chính xác sự kiện `CustomEvent('canvas:launch')` bằng cách tăng vọt số hạt lên.
  </acceptance_criteria>
</task>

<task>
  <description>Component HandwritingText SVG</description>
  <read_first>
    - .planning/phases/03-k-ch-b-n-chuy-n-c-nh-ngh-thu-t/03-RESEARCH.md
  </read_first>
  <action>
    Tạo file `components/ui/transitions/HandwritingText.jsx`.
    Dùng `@gsap/react` `useGSAP` để vẽ một chữ SVG nghệ thuật (có thể lấy path của một chữ viết tay mẫu "Love" hoặc "K & H").
    Kỹ thuật: Gán `stroke-dasharray` bằng chiều dài nét vẽ, và `gsap.to(path, { strokeDashoffset: 0 })` kèm `ScrollTrigger`.
  </action>
  <acceptance_criteria>
    - Tồn tại file `HandwritingText.jsx`.
    - Component hiển thị chữ ký SVG động.
  </acceptance_criteria>
</task>

<task>
  <description>Component ColorBurstImage</description>
  <read_first>
    - .planning/phases/03-k-ch-b-n-chuy-n-c-nh-ngh-thu-t/03-RESEARCH.md
  </read_first>
  <action>
    Tạo file `components/ui/transitions/ColorBurstImage.jsx`.
    Bao gồm một thẻ `<img>` (dùng url unspash tĩnh `https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop`).
    CSS ban đầu: `filter: grayscale(100%) blur(10px)`.
    Dùng `useGSAP` để animate `filter` về mượt, kích hoạt qua `ScrollTrigger`.
    Và dispatch event `window.dispatchEvent(new CustomEvent('canvas:gravityPull'))` khi trigger (TRAN-03, TRAN-04).
  </action>
  <acceptance_criteria>
    - Tồn tại file `ColorBurstImage.jsx`.
    - Ảnh sẽ tự động rực sáng khi cuộn đến vùng hiển thị.
  </acceptance_criteria>
</task>

<task>
  <description>Tích hợp vào trang Wedding để kiểm thử</description>
  <read_first>
    - app/wedding/page.jsx
  </read_first>
  <action>
    Sửa `app/wedding/page.jsx`:
    Thêm một khoảng trống lớn (khoảng `h-[80vh]`) để người dùng scroll, sau đó nhúng `<HandwritingText />`.
    Thêm khoảng trống tiếp theo, nhúng `<ColorBurstImage />`.
    Phía trên `<HandwritingText />`, đặt một thẻ trigger ẩn để gọi `window.dispatchEvent(new CustomEvent('canvas:launch'))` bằng ScrollTrigger.
  </action>
  <acceptance_criteria>
    - File `app/wedding/page.jsx` chứa các kịch bản chuyển cảnh nghệ thuật mới.
  </acceptance_criteria>
</task>
```

## Verification

**Verification Criteria:**
1. Mở `/wedding` và cuộn chuột chầm chậm.
2. The Launch: Bất thình lình từ dưới đáy, một lượng hạt siêu dày đặc bắn lên tạo màn sương mù mờ ảo. Sau 2 giây, số lượng hạt mỏng lại dần khi chúng bay ra khỏi rìa trên (Perfect Fade-out).
3. The Handwriting: Chữ ký Love/K&H hiện ra bằng nét mực.
4. The Color Burst: Khi bức ảnh cưới xuất hiện, nó đang đen trắng/mờ ảo. Ngay lập tức GSAP chạy làm ảnh sắc nét rực màu, đồng thời Canvas hạt bụi biến mất hoặc bị kéo vút đi.

**must_haves:**
- TRAN-01: Vẽ nét chữ viết tay (SVG Handwriting) bằng `stroke-dasharray`.
- TRAN-02: Kích hoạt mảng lượng lớn hạt bụi (Sương mù).
- TRAN-03: Kích hoạt giảm số lượng hạt đột ngột.
- TRAN-04: Ảnh GSAP Filter Blur & Grayscale.
