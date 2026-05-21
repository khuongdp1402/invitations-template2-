# Project Roadmap: WEBSITE THIỆP CƯỚI STORYTELLING ĐỘNG

## Current Milestone: MVP (Thiệp cưới động 60fps)

Trọng tâm: Xây dựng trải nghiệm thiệp cưới động hoàn chỉnh với hiệu ứng hạt kháng trọng lực, hiệu năng 60fps trên di động, SSG trên Next.js.

### Phase 1: THIẾT LẬP KIẾN TRÚC & QUẢN LÝ DỮ LIỆU ĐỘNG
**Goal:** Xây dựng khung dự án Next.js (SSG) và cấu trúc dữ liệu theo URL (nhà trai/nhà gái).

**Requirements Covered:** ARCH-01, ARCH-02, ARCH-03, ARCH-04
**UI hint:** no

**Success Criteria:**
- 1. Chạy được dự án Next.js trắng trên local.
- 2. Đọc được query parameter `side`, `name`, `role` từ URL.
- 3. Render thay đổi thứ tự/nội dung thành công khi thay đổi `side` từ URL.
- 4. Export static (SSG) thành công mà không lỗi.

### Phase 2: TRIỂN KHAI CORE ENGINE KHÁNG TRỌNG LỰC
**Goal:** Xây dựng hệ thống hạt Canvas độc lập, có thể cấu hình vật lý linh hoạt và tối ưu memory.

**Depends on:** 1
**Requirements Covered:** ENGI-01, ENGI-02, ENGI-03, ENGI-04
**UI hint:** yes

**Success Criteria:**
- 1. Hạt bụi bay ngược liên tục trên canvas 60fps mà không tăng memory.
- 2. Hạt bụi có độ lắc lư ngang nhẹ nhàng.
- 3. Khi cuộn trang, hạt bụi bị đẩy bay nhanh hơn tương ứng tốc độ vuốt.

### Phase 3: KỊCH BẢN CHUYỂN CẢNH NGHỆ THUẬT
**Goal:** Hoàn thiện kịch bản 3 bước (viết tay, sương mù, lộ ảnh).

**Depends on:** 2
**Requirements Covered:** TRAN-01, TRAN-02, TRAN-03, TRAN-04
**UI hint:** yes

**Success Criteria:**
- 1. SVG Text hiển thị chạy nét viết tay mượt.
- 2. Kích hoạt được mật độ hạt x3 tại điểm timeline.
- 3. Hạt bị hút về trung tâm ảnh khi ảnh hiện ra (Color Burst).

### Phase 4: CHI TIẾT CÁC CHƯƠNG THÔNG TIN (UI SECTION BREAKS)
**Goal:** Dựng các Component giao diện nội dung tĩnh và động (Timeline, Calendar, Hero, Typography, RSVP).

**Depends on:** 1
**Requirements Covered:** UISS-01, UISS-02, UISS-03, UISS-04, UISS-05, UISS-06
**UI hint:** yes

**Success Criteria:**
- 1. Giao diện đúng thiết kế, load các ảnh cơ bản.
- 2. Sợi dây timeline chạy dọc theo thanh cuộn.
- 3. Vòng tròn lịch khoanh đúng ngày cưới nhà trai/nhà gái.
- 4. Confetti xuất hiện khi submit form thành công.

### Phase 5: TỐI ƯU HÓA TRẢI NGHIỆM DI ĐỘNG & HIỆU NĂNG
**Goal:** Áp dụng tối ưu tài nguyên (hình ảnh, responsive canvas) để đáp ứng Webview Zalo/FB.

**Depends on:** 2, 4
**Requirements Covered:** ENGI-05, ENGI-06, UISS-07
**UI hint:** no

**Success Criteria:**
- 1. Canvas giảm số lượng hạt dưới ngưỡng 768px tự động.
- 2. Có thể tương tác click/map xuyên qua lớp Canvas mà không vướng (`pointer-events: none`).
- 3. Dung lượng page load ảnh được giữ nhỏ gọn.

---
## Future Milestones
- (None yet)
