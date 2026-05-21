# Phase 2: TRIỂN KHAI CORE ENGINE KHÁNG TRỌNG LỰC - Context

**Gathered:** 2026-05-21
**Status:** Ready for planning

<domain>
## Phase Boundary

Xây dựng hệ thống hạt bụi bay ngược (Canvas) độc lập. Các hạt đung đưa tự nhiên nhờ thuật toán lượng giác và tự động tái chế (recycle) khi bay khuất đỉnh. Hệ thống tích hợp với vận tốc cuộn trang qua GSAP ScrollTrigger để tạo hiệu ứng gió đẩy. (Chưa bao gồm các hiệu ứng tương tác 3D với ảnh cưới - Phase 3/4).

</domain>

<decisions>
## Implementation Decisions

### Vị trí và Quy mô của Lớp Canvas
- **Lớp nền cố định (Fixed Background):** Canvas sẽ được đặt ở vị trí `fixed`, phủ toàn bộ màn hình (toàn trang) với `z-index: 0` (nằm dưới các nội dung khác).
- Phải thiết lập `pointer-events: none` để đảm bảo lớp Canvas không chặn bất kỳ cú click chuột hoặc thao tác vuốt nào của người dùng (ENGI-06).

### Hình dáng của Hạt bụi (Particles)
- **Chấm sáng mờ ảo (Soft Glow):** Các hạt bụi sẽ được vẽ dưới dạng các đốm sáng tròn nhỏ, màu trắng/vàng nhạt với phần viền mờ (gradient radial hoặc `shadowBlur` của Context2D), tạo cảm giác như bụi tiên (fairy dust) hoặc đom đóm lãng mạn.

### Tương tác cuộn (Scroll Velocity)
- Dùng chức năng `ScrollTrigger.normalizeScroll` (hoặc Tracker của ScrollTrigger) để theo dõi tốc độ cuộn của trang.
- Giá trị vận tốc cuộn sẽ được cộng thêm vào hệ số trục Y (bay lên) của hạt bụi trong vòng lặp `requestAnimationFrame`.

### the agent's Discretion
- Logic thiết kế Class/Hàm cho Engine: Tổ chức mã nguồn của Canvas Renderer gọn gàng bằng ES6 Classes (VD: `Particle`, `ParticleEngine`).
- Các chỉ số toán học: Tần số (frequency), biên độ (amplitude) của hàm `Math.sin()` để tạo độ đung đưa ngang hợp lý nhất.
- Cách xử lý resize cửa sổ và tỉ lệ phân giải (`devicePixelRatio`) cho thiết bị Retina.

</decisions>

<canonical_refs>
## Canonical References

### Phase requirements
- `.planning/REQUIREMENTS.md` — ENGI-01 to ENGI-04.
- `.planning/PROJECT.md` — Quy định về hiệu năng 60fps, không sử dụng engine vật lý DOM/Matter.js.

</canonical_refs>

<specifics>
## Specific Ideas

- Có thể dùng thuật toán tối ưu mảng: Thay vì liên tục `new Particle()`, tái sử dụng object: khi `y < -10`, gán lại `y = canvas.height + 10` và reset lại tọa độ `x` (ENGI-03).
- Hệ số màu sắc mờ nhạt (Alpha): Khởi tạo hạt với alpha ngẫu nhiên từ 0.2 đến 0.8 để tạo chiều sâu (depth of field).

</specifics>

<deferred>
## Deferred Ideas

- Tính năng "Chặn tương tác chuột / Responsive ngưỡng 768px giảm số hạt" (thuộc Phase 5 - ENGI-05, nhưng cấu trúc hiện tại phải sẵn sàng hỗ trợ giới hạn số lượng hạt).
- Kích hoạt lượng hạt x3 hoặc hút hạt bụi vào tâm màn hình (Color Burst) (thuộc Phase 3 - TRAN-02, TRAN-03).

</deferred>

---

*Phase: 02-tri-n-khai-core-engine-kh-ng-tr-ng-l-c*
*Context gathered: 2026-05-21*
