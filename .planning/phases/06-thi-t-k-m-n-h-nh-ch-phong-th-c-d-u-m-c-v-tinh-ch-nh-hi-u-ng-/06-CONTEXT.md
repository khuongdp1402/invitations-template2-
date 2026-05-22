# Phase 6: Thiết kế màn hình chờ phong thư có dấu mộc và tinh chỉnh hiệu ứng hoa rơi - Context

**Gathered:** 2026-05-22
**Status:** Ready for planning
**Source:** User input during phase addition

<domain>
## Phase Boundary
Xây dựng một màn hình chào mừng (Welcome Screen) giả lập hiệu ứng phong bì thư chứa thiệp cưới. Tinh chỉnh lại hệ thống hạt vật lý (Canvas Particles) để tối ưu và thay đổi phong cách hiển thị. Đồng thời, gỡ bỏ một số component đã lỗi thời (Our Story).
</domain>

<decisions>
## Implementation Decisions

### 1. Màn hình chào mừng (Envelope Welcome View)
- Khi người dùng mới truy cập trang web, màn hình đầu tiên (view đầu tiên) sẽ hiển thị một phong bì thư.
- Giao diện phong bì có chữ "Hello + Tên khách mời" (tên khách mời lấy từ URL params hoặc data động).
- Phía dưới có dòng chữ: "Khương và Hiền mời bạn mở thiệp cưới".
- Phía trên phong bì có một dấu mộc in nổi bằng sáp (wax seal) với logo là 2 chữ cái đầu "K" và "H".
- Người dùng nhấp (click) vào dấu mộc hoặc phong bì thì phong bì mới có hiệu ứng mở ra, sau đó lộ ra nội dung chính của website hiện tại (trang thiệp cưới).

### 2. Tinh chỉnh hệ thống Canvas Particle (Hoa rơi)
- Chuyển từ hiệu ứng "bay lên" (anti-gravity) thành hiệu ứng "rơi từ trên xuống" (gravity fall).
- Giảm số lượng hạt bay (cánh hoa, bling) xuống mức vừa phải (hiện tại đang hơi nhiều).
- Khi hạt rơi xuống đến cuối màn hình, chúng không bị reset và lặp lại ngay lập tức mà sẽ "đọng lại" (tích tụ) ở khu vực dưới cùng của màn hình.
- Điểm đọng lại cách viền dưới màn hình khoảng 100px.

### 3. Cleanup Code
- Lược bỏ hoàn toàn phần "Our Story" (có thể là `TypographyBreak` hoặc component chứa Our Story) ra khỏi giao diện chính.
</decisions>
