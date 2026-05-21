---
wave: 1
depends_on: []
files_modified:
  - next.config.mjs
  - app/wedding/page.jsx
  - config/weddingData.js
autonomous: true
---

# Phase 1: Khởi tạo kiến trúc và dữ liệu động

## Mục tiêu
Khởi tạo dự án Next.js (SSG) với App Router và thiết lập cơ chế đọc Query Params ở client-side để hiển thị nội dung tùy biến mà vẫn giữ được khả năng xuất tĩnh.

## Tasks

```xml
<task>
  <description>Khởi tạo dự án Next.js trắng với cấu hình chuẩn.</description>
  <read_first>
    - .planning/REQUIREMENTS.md
  </read_first>
  <action>
    Chạy lệnh khởi tạo dự án Next.js trực tiếp vào thư mục hiện tại:
    `npx create-next-app@latest . --js --eslint --tailwind --app --no-src-dir --import-alias "@/*" --use-npm --yes`
    Lưu ý: Không ghi đè các thư mục `.planning`, `.git` hiện có. Nếu lệnh `create-next-app` từ chối khởi tạo trong thư mục không rỗng, hãy khởi tạo vào một thư mục tạm, sau đó di chuyển tất cả file sang thư mục hiện tại và xóa thư mục tạm.
  </action>
  <acceptance_criteria>
    - Tồn tại file `package.json` và thư mục `app`.
    - Chạy `npm install` thành công.
  </acceptance_criteria>
</task>

<task>
  <description>Cấu hình Next.js để hỗ trợ xuất tĩnh (SSG).</description>
  <read_first>
    - next.config.mjs
  </read_first>
  <action>
    Sửa file `next.config.mjs` thêm thuộc tính:
    ```javascript
    /** @type {import('next').NextConfig} */
    const nextConfig = {
      output: 'export',
      images: {
        unoptimized: true,
      }
    };
    export default nextConfig;
    ```
  </action>
  <acceptance_criteria>
    - Lệnh `grep "output: 'export'" next.config.mjs` có kết quả.
  </acceptance_criteria>
</task>

<task>
  <description>Tạo file cấu trúc dữ liệu chung (`config/weddingData.js`).</description>
  <read_first>
    - .planning/phases/01-thi-t-l-p-ki-n-tr-c-qu-n-l-d-li-u-ng/01-CONTEXT.md
  </read_first>
  <action>
    Tạo thư mục `config` và file `config/weddingData.js` với nội dung xuất ra (export) một object duy nhất chứa danh sách các sự kiện của cả nhà trai và nhà gái, kèm các trường cần thiết (ví dụ: `side` để phân biệt).
  </action>
  <acceptance_criteria>
    - File `config/weddingData.js` tồn tại.
  </acceptance_criteria>
</task>

<task>
  <description>Xây dựng logic điều hướng hiển thị trong `app/wedding/page.jsx`.</description>
  <read_first>
    - .planning/phases/01-thi-t-l-p-ki-n-tr-c-qu-n-l-d-li-u-ng/01-CONTEXT.md
  </read_first>
  <action>
    1. Tạo thư mục `app/wedding/` và file `page.jsx`.
    2. Trong `page.jsx`, bọc nội dung component chính (ví dụ `WeddingContent`) bằng thẻ `<Suspense fallback={<div>Loading...</div>}>`.
    3. `WeddingContent` phải là Client Component (`"use client"`), sử dụng hook `useSearchParams` từ `next/navigation` để lấy các giá trị `side`, `name`, `role`.
    4. Hiển thị thử các giá trị này ra màn hình (ví dụ: in ra HTML tĩnh tên, họ và side) để kiểm chứng.
  </action>
  <acceptance_criteria>
    - Tồn tại file `app/wedding/page.jsx`.
    - Lệnh `grep "useSearchParams" app/wedding/page.jsx` có kết quả.
    - Lệnh `grep "Suspense" app/wedding/page.jsx` có kết quả.
  </acceptance_criteria>
</task>
```

## Verification

**Verification Criteria:**
1. Chạy lệnh `npm run build`. 
2. Đảm bảo quá trình build thành công và sinh ra thư mục `out/`.
3. Kiểm tra file tĩnh được tạo ra: `out/wedding.html` phải tồn tại.

**must_haves:**
- ARCH-01: Dự án Next.js với SSG.
- ARCH-02: Cấu trúc thư mục `/app/wedding/page.jsx`, `/config/weddingData.js`.
- ARCH-03 & ARCH-04: Đọc URL Query (`side`, `name`, `role`).
