# Phase 2 Research: Anti-Gravity Canvas Engine

## Tóm tắt vấn đề:
Cần xây dựng một hệ thống hạt (particle system) bằng thẻ `<canvas>` độc lập, có thể render mượt mà ở 60fps trên cả thiết bị di động (Webview). Hệ thống này phải kết nối trơn tru với thao tác cuộn chuột (scroll) của người dùng thông qua GSAP ScrollTrigger mà không bị rớt khung hình (frame drop) hay hao tốn bộ nhớ (Memory Leak/Garbage Collection pauses).

## Giải pháp kỹ thuật (Best Practices):

### 1. Kiến trúc React & Canvas
Việc nhúng Canvas vào React (Next.js) cần cẩn thận để tránh component bị re-render liên tục.
- Sử dụng `useRef` để tham chiếu đến thẻ `<canvas>`.
- Trích xuất toàn bộ logic vẽ (Engine) ra một ES6 Class độc lập (ví dụ `ParticleEngine.js`), không viết logic render bên trong thân của React Component.
- Bên trong `useEffect()`, khởi tạo `new ParticleEngine(canvasRef.current)` và trả về hàm `cleanup` để dọn dẹp bộ nhớ (hủy requestAnimationFrame hoặc gsap.ticker) khi component bị unmount.

### 2. Tối ưu hóa Memory (Recycle Pattern) - ENGI-03
Thay vì liên tục tạo hạt mới (`new Particle()`) và xóa hạt cũ, ta áp dụng kỹ thuật **Object Pool / Recycling**:
- Khởi tạo tĩnh một mảng `particles = []` chứa đúng 100 hạt ngay từ đầu.
- Trong vòng lặp update, nếu hạt bay vượt quá màn hình (ví dụ `y < -10`), ta không xóa nó khỏi mảng. Ta chỉ đơn giản gán lại tọa độ `y = canvasHeight + 10` (bay từ dưới lên lại), và random lại tọa độ `x`, kích thước, và tốc độ để người dùng tưởng đó là hạt mới. Điều này giúp bộ nhớ luôn phẳng (flat memory profile), tránh kích hoạt Garbage Collector gây giật lag.

### 3. Tích hợp GSAP ScrollTrigger & requestAnimationFrame - ENGI-04
- Thay vì dùng `window.requestAnimationFrame` gốc, ta nên dùng **`gsap.ticker.add(render)`**. Điều này giúp vòng lặp render của Canvas đồng bộ hoàn hảo với các animation khác của GSAP trên trang.
- Để lấy vận tốc cuộn trang (scroll velocity), sử dụng ScrollTrigger:
  ```javascript
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  
  let scrollVelocity = 0;
  ScrollTrigger.create({
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      // getVelocity() trả về tốc độ cuộn. Chia tỉ lệ cho phù hợp
      scrollVelocity = self.getVelocity() / 100; 
    }
  });
  ```
- Trong hàm update của hạt bụi: `this.y -= (this.baseSpeed + scrollVelocity)`. GSAP có thể trả về vận tốc âm hoặc dương tùy hướng cuộn, ta có thể dùng `Math.abs()` hoặc giới hạn (clamp) để hiệu ứng gió tự nhiên nhất.

### 4. Xử lý màn hình nét (Retina/High DPI)
Thiết bị di động hiện nay đều là màn hình Retina (DPI cao). Nếu không xử lý, canvas sẽ bị mờ.
```javascript
const dpr = window.devicePixelRatio || 1;
canvas.width = window.innerWidth * dpr;
canvas.height = window.innerHeight * dpr;
canvas.style.width = window.innerWidth + 'px';
canvas.style.height = window.innerHeight + 'px';
ctx.scale(dpr, dpr);
```
Mỗi khi resize trình duyệt, cần chạy lại đoạn logic trên để scale lại context.

## Kết luận cho Kế hoạch (Plan):
- Tạo class `Particle` (toán học đung đưa trục X `Math.sin`, bay lên trục Y).
- Tạo class `ParticleEngine` (quản lý mảng hạt, `gsap.ticker`, resize, dpr).
- Tạo React Component `<AntiGravityCanvas />` nhúng vào layout gốc (đặt ở dưới cùng `z-index: 0`, `pointer-events-none`).
