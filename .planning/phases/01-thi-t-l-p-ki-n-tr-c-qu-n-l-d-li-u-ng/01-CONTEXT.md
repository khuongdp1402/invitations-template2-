# Phase 1: THIẾT LẬP KIẾN TRÚC & QUẢN LÝ DỮ LIỆU ĐỘNG - Context

**Gathered:** 2026-05-21
**Status:** Ready for planning

<domain>
## Phase Boundary

Xây dựng khung dự án Next.js (SSG) và cấu trúc dữ liệu theo URL (nhà trai/nhà gái). Đảm bảo dự án chạy ổn định và đọc được các parameter cần thiết mà không phá vỡ khả năng xuất tĩnh (SSG).

</domain>

<decisions>
## Implementation Decisions

### Xử lý URL Query Params vs Next.js SSG
- Đọc query params hoàn toàn ở Client-side bằng cách sử dụng hook `useSearchParams` bên trong các Client Component.
- Bọc component sử dụng `useSearchParams` bằng `<Suspense>` để đảm bảo Next.js không chuyển toàn bộ trang sang Dynamic Rendering.
- Trang chính vẫn được giữ ở trạng thái Static (SSG) 100%.

### Cấu trúc lưu trữ dữ liệu trong `weddingData.js`
- Dùng một Data Object duy nhất (Single Source of Truth) để lưu trữ mọi thông tin.
- Các sự kiện được nhóm vào mảng `events`.
- Phía UI (Giao diện) sẽ tự động có logic sắp xếp lại mảng này (đẩy sự kiện nhà gái lên trước nếu `side=nhagai`, hoặc ngược lại) thay vì chia cắt file dữ liệu.

### Thư viện Animation và Trải nghiệm Tải trang (UX/Loading)
- **Thư viện chính:** Sử dụng **GSAP (GreenSock) & ScrollTrigger** làm thư viện xử lý chuyển động chính vì khả năng tối ưu hiệu năng xuất sắc trên Mobile và làm storytelling đỉnh cao.
- **Loading Screen (Splash Screen):** Lợi dụng cơ chế `<Suspense fallback={...}>` của bước trên, `fallback` sẽ chính là một Màn hình Loading thanh lịch (Splash Screen) có thanh phần trăm tải. Tránh hiện tượng web bị giật lag hoặc layout xô lệch khi ảnh/animation chưa tải xong. Giao diện ví dụ: hai người đi bộ lại gần nhau hoặc thiết kế thanh lịch tương đương.
- **Tối ưu Mobile:** Tuân thủ triệt để hiệu năng cho các trình duyệt web-view (Zalo/Facebook), các hiệu ứng cuộn sẽ được quản lý nghiêm ngặt qua GSAP ScrollTrigger để không làm đơ máy.

### the agent's Discretion
- Cấu trúc các file cấu hình Next.js ban đầu (ESLint, Prettier, Tailwind/CSS config).
- Cách viết logic sorting trong component để tái sử dụng hiệu quả.

</decisions>

<canonical_refs>
## Canonical References

### Phase requirements
- `.planning/PROJECT.md` — Project context and SSG requirement.
- `.planning/REQUIREMENTS.md` — ARCH-01 to ARCH-04.

</canonical_refs>

<specifics>
## Specific Ideas

- Định dạng URL: `domain.com/wedding?side=[nhatrai/nhagai]&name=[Ten_Khach]&role=[Xung_Ho]`
- Nếu `side=nhagai`: Ưu tiên Lễ Vu Quy (07/06/2026) tại Ea M'Droh, tên Cẩm Hiền đứng trước Phú Khương.
- Nếu `side=nhatrai`: Ưu tiên Lễ Tân Hôn (09/06/2026) tại Quảng Phú, tên Phú Khương đứng trước Cẩm Hiền.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 01-thi-t-l-p-ki-n-tr-c-qu-n-l-d-li-u-ng*
*Context gathered: 2026-05-21*
