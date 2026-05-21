# Phase 3: KỊCH BẢN CHUYỂN CẢNH NGHỆ THUẬT - Context

**Gathered:** 2026-05-21
**Status:** Ready for planning

<domain>
## Phase Boundary

Xây dựng các hiệu ứng chuyển cảnh nghệ thuật (Transitions) đặc trưng của dự án:
1. **SVG Handwriting:** Hiệu ứng vẽ nét chữ ký.
2. **The Launch (Fog/Sương mù):** Kích hoạt x3 lượng hạt bụi khi cuộn đến mốc cụ thể.
3. **The Color Burst & Gravity Pull:** Hạt bụi bay vào tâm các khung ảnh, kích hoạt ảnh chuyển từ Grayscale 100% sang màu rực rỡ.

Chưa bao gồm các layout chi tiết toàn bộ nội dung (Phase 4), chỉ tập trung vào cơ chế Component hiệu ứng.

</domain>

<decisions>
## Implementation Decisions

### Giao tiếp giữa React và Canvas (The Launch & Gravity Pull)
- **Sử dụng CustomEvent của trình duyệt:** Thay vì dùng React Context (gây re-render) hoặc truyền Ref phức tạp, các Component UI (khi bị ScrollTrigger kích hoạt) sẽ bắn ra các sự kiện `window.dispatchEvent(new CustomEvent('canvas:launch'))` hoặc `canvas:gravityPull`.
- Bên trong `ParticleEngine`, ta sẽ lắng nghe các event này (`window.addEventListener`) để thay đổi state nội bộ của Canvas một cách độc lập và tối ưu nhất.

### Hình ảnh Placeholder cho hiệu ứng Color Burst
- Sử dụng ảnh Unsplash độ phân giải cao có chủ đề Romantic/Wedding làm Placeholder (ví dụ: source.unsplash.com hoặc images.unsplash.com).
- Thiết lập CSS filters hoặc GSAP filters để điều khiển thuộc tính grayscale/blur của các ảnh này, phối hợp với thời điểm "hạt bụi chạm vào".

### the agent's Discretion
- Kiến trúc Component React: Cần tách riêng các component như `<HandwritingText text="Khương & Hiền" />` và `<ColorBurstImage src="..." />` để dễ tái sử dụng ở Phase 4.
- GSAP Plugins: Đảm bảo sử dụng `DrawSVGPlugin` (nếu có bản quyền) hoặc dùng CSS thuần `stroke-dasharray` kết hợp GSAP để vẽ chữ nếu không có plugin trả phí. (Sẽ dùng CSS `stroke-dashoffset` + GSAP thông thường để tránh bản quyền).

</decisions>

<canonical_refs>
## Canonical References

### Phase requirements
- `.planning/REQUIREMENTS.md` — TRAN-01 to TRAN-04.

</canonical_refs>

<specifics>
## Specific Ideas

- **The Launch:** Khi trigger sự kiện `canvas:launch`, `ParticleEngine` tạm thời đẩy biến `particleCount` từ 100 lên 300, random hạt mới ở dưới đáy màn hình, và sau khoảng 2 giây, hạ dần số lượng (hoặc ngưng tái chế hạt phụ) để về lại 100 nhằm bảo đảm hiệu năng.
- **The Color Burst:** Thẻ ảnh sẽ có class `filter grayscale blur-md`. GSAP ScrollTrigger sẽ animate các giá trị này về `0` khi thẻ vào vùng viewport.

</specifics>

<deferred>
## Deferred Ideas

- Chỉnh sửa ảnh thật, cắt crop tối ưu 200KB (Chuyển qua Phase 5).

</deferred>

---

*Phase: 03-k-ch-b-n-chuy-n-c-nh-ngh-thu-t*
*Context gathered: 2026-05-21*
