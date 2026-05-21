---
wave: 1
depends_on: []
files_modified:
  - lib/canvas/Particle.js
  - lib/canvas/ParticleEngine.js
  - components/canvas/AntiGravityCanvas.jsx
  - app/wedding/layout.jsx
autonomous: true
---

# Phase 2: Triển khai Core Engine Kháng Trọng Lực

## Mục tiêu
Xây dựng một hệ thống Canvas độc lập, hiệu năng 60fps để hiển thị các hạt bụi bay ngược (Anti-Gravity). Tích hợp với thao tác cuộn chuột thông qua GSAP ScrollTrigger và tối ưu hóa bộ nhớ với cơ chế Recycle.

## Tasks

```xml
<task>
  <description>Tạo cấu trúc Class cho Hạt Bụi (Particle)</description>
  <read_first>
    - .planning/phases/02-tri-n-khai-core-engine-kh-ng-tr-ng-l-c/02-RESEARCH.md
  </read_first>
  <action>
    Tạo file `lib/canvas/Particle.js`.
    Định nghĩa một ES6 Class `Particle` với:
    - Thuộc tính tọa độ `x`, `y`, bán kính `radius`, màu sắc mờ (alpha), vận tốc cơ bản `baseSpeed`, và các tham số lượng giác `angle`, `angleSpeed` cho độ lắc lư (swing).
    - Hàm `update(scrollVelocity, canvasWidth, canvasHeight)`: 
      + `this.y -= (this.baseSpeed + scrollVelocity)`.
      + `this.x += Math.sin(this.angle) * 0.5`. Cập nhật `this.angle`.
      + Nếu `this.y < -10` (bay khỏi đỉnh), thì gán lại `this.y = canvasHeight + 10` và random lại `this.x` (Recycle pattern - ENGI-03).
    - Hàm `draw(ctx)`:
      + Vẽ hình tròn mờ (Soft Glow) dùng `ctx.shadowBlur`, `ctx.shadowColor = 'rgba(255, 255, 255, 0.8)'` và `ctx.fillStyle` màu trắng/vàng nhạt với độ alpha ngẫu nhiên.
  </action>
  <acceptance_criteria>
    - Tồn tại file `lib/canvas/Particle.js`.
    - Class có phương thức `update` và `draw`.
  </acceptance_criteria>
</task>

<task>
  <description>Tạo cấu trúc Class cho Engine điều phối (ParticleEngine)</description>
  <read_first>
    - lib/canvas/Particle.js
  </read_first>
  <action>
    Tạo file `lib/canvas/ParticleEngine.js`.
    Định nghĩa ES6 Class `ParticleEngine` nhận tham số là một thẻ `<canvas>`:
    - Khởi tạo mảng tĩnh chứa 100 đối tượng `Particle`.
    - Hàm `resize()`: Xử lý kích thước cửa sổ và bù đắp độ nét Retina `devicePixelRatio`. Scale `ctx` tương ứng. Gắn vào sự kiện `window.addEventListener('resize')`.
    - Khởi tạo GSAP `ScrollTrigger` để theo dõi vận tốc cuộn của `document.body` và gán vào một biến `scrollVelocity`. Cần giới hạn (clamp) độ lớn của velocity để hạt không bay quá nhanh nếu vuốt quá mạnh (ENGI-04).
    - Hàm `render()`: Xóa canvas bằng `ctx.clearRect`, sau đó vòng lặp gọi `update(scrollVelocity)` và `draw()` cho toàn bộ 100 particles.
    - Đăng ký vòng lặp bằng `gsap.ticker.add(this.render.bind(this))`.
    - Hàm `destroy()`: Hủy event listener resize, kill ScrollTrigger và gỡ hàm khỏi `gsap.ticker` để dọn dẹp bộ nhớ (ENGI-01).
  </action>
  <acceptance_criteria>
    - Tồn tại file `lib/canvas/ParticleEngine.js`.
    - Import GSAP và ScrollTrigger thành công.
    - Có logic xử lý `devicePixelRatio` và `gsap.ticker.add`.
  </acceptance_criteria>
</task>

<task>
  <description>Tạo React Component AntiGravityCanvas</description>
  <read_first>
    - lib/canvas/ParticleEngine.js
  </read_first>
  <action>
    Tạo file `components/canvas/AntiGravityCanvas.jsx`.
    - Đây là một Client Component (`"use client"`).
    - Trả về thẻ `<canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />` (ENGI-06).
    - Trong `useEffect`, khởi tạo `engine = new ParticleEngine(canvasRef.current)`.
    - Return hàm cleanup để gọi `engine.destroy()` khi component unmount.
  </action>
  <acceptance_criteria>
    - Tồn tại file `components/canvas/AntiGravityCanvas.jsx`.
    - Có `pointer-events-none` và `fixed inset-0` trong className.
  </acceptance_criteria>
</task>

<task>
  <description>Tích hợp Canvas vào Layout của thiệp cưới</description>
  <read_first>
    - components/canvas/AntiGravityCanvas.jsx
  </read_first>
  <action>
    Tạo file `app/wedding/layout.jsx` (nếu chưa có).
    - Layout này sẽ wrap tất cả các nội dung thuộc nhánh `/wedding`.
    - Trả về nội dung `children` (chứa trang page.jsx đã làm ở Phase 1) kèm theo `<AntiGravityCanvas />` đặt bên ngoài (hoặc bên trong container gốc).
    - Đảm bảo thẻ chứa gốc của nội dung (chữ, nút) phải có `position: relative` và `z-index` cao hơn 0 để nổi lên trên Canvas.
  </action>
  <acceptance_criteria>
    - Tồn tại file `app/wedding/layout.jsx`.
    - Tích hợp thành công `AntiGravityCanvas` vào Layout.
  </acceptance_criteria>
</task>
```

## Verification

**Verification Criteria:**
1. Chạy `npm run dev`.
2. Mở trình duyệt và cuộn trang: Các hạt sáng màu trắng mờ sẽ bay ngược lên mượt mà ở 60fps.
3. Khi cuộn chuột nhanh, hạt sẽ bị đẩy bay nhanh hơn (gió cuộn).
4. Không chặn thao tác chọn text hoặc click chuột lên trang web (nhờ `pointer-events: none`).
5. Dù resize trình duyệt hay dùng màn hình Retina, hạt vẫn hiển thị cực kỳ sắc nét, không vỡ hạt.

**must_haves:**
- ENGI-01: Khởi tạo Canvas (không DOM) để vẽ hạt bụi bay ngược (trục Y).
- ENGI-02: Áp dụng thuật toán lượng giác (trục X) tạo độ đung đưa tự nhiên cho hạt bụi.
- ENGI-03: Xử lý logic Recycle tái chế hạt bụi khi chạm đỉnh (y < -10px).
- ENGI-04: Tích hợp GSAP ScrollTrigger đồng bộ vận tốc cuộn trang với vận tốc bay của hạt.
- ENGI-06: Chặn tương tác lỗi: Thêm `pointer-events: none` vào lớp thẻ `<canvas>`.
