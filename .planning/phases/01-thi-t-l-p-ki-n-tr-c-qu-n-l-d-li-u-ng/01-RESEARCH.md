# Phase 1 Research

## Tóm tắt vấn đề:
Next.js (App Router) với tuỳ chọn `output: 'export'` (SSG) có quy định nghiêm ngặt về việc sử dụng các API động như `useSearchParams()`. Nếu sử dụng trực tiếp mà không xử lý đúng, quá trình `next build` sẽ báo lỗi hoặc ép trang web chuyển sang chế độ Dynamic Rendering.

## Giải pháp kỹ thuật (Best Practices):
1. **Dùng Client Component và `<Suspense>`:** 
   Bất kỳ Client Component nào sử dụng `useSearchParams()` bắt buộc phải được bọc trong `<Suspense fallback={...}>`.
   Lúc này, ở bước build (SSG), Next.js sẽ render ra phần `fallback` thành HTML tĩnh. Sau khi trình duyệt tải trang xong, Component bên trong mới được hydrate và đọc thông tin từ URL.

2. **File `next.config.mjs`:**
   Cần thiết lập `output: 'export'` để đảm bảo toàn bộ dự án build ra thư mục tĩnh (`out/`). Các API/Route Handler không được hỗ trợ trong chế độ này.

3. **Cấu trúc Dữ liệu `weddingData.js`:**
   Để hỗ trợ tính năng "ưu tiên hiển thị theo nhà", ta nên cấu trúc dữ liệu theo một nguồn duy nhất (Single Source of Truth), sau đó viết một helper function trong Client Component để lấy dữ liệu.
   Ví dụ:
   ```javascript
   export const weddingData = {
     events: [
       { id: 'vuquy', name: 'Lễ Vu Quy', date: '07/06/2026', location: 'Ea M\'Droh', side: 'nhagai' },
       { id: 'tanhon', name: 'Lễ Tân Hôn', date: '09/06/2026', location: 'Quảng Phú', side: 'nhatrai' }
     ]
   };
   ```
   Logic xử lý: `events.sort((a, b) => a.side === currentSide ? -1 : 1)` (nếu muốn sự kiện của side hiện tại đứng đầu).

## Đánh giá rủi ro:
- **Tốc độ tải nội dung chính:** Nội dung được bọc trong Suspense sẽ hiển thị fallback ban đầu, gây hiệu ứng nhấp nháy hoặc loading spinner một thoáng trước khi hydrate xong. Để giảm thiểu, nên làm UI fallback giống hệt bộ khung trang web thật (Skeleton loading), hoặc thiết kế màn hình `The Launch` (ví dụ hình cái thiệp nhắm kín trước khi mở) làm phần fallback.

## Kết luận cho Kế hoạch (Plan):
- Config Next.js xuất tĩnh.
- Component gốc bọc `<Suspense>` chứa toàn bộ nội dung thiệp.
- Tạo một file dữ liệu chuẩn hóa dễ sort.
