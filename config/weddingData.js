export const weddingData = {
  // Array of events for TimelineSection.jsx
  events: [
    {
      id: 'vuquy',
      name: 'Lễ Vu Quy',
      date: '07/06/2026',
      time: '09:00 AM',
      location: "Thôn 1b, xã Ea M'Droh, tỉnh Đắk Lắk",
      side: 'nhagai'
    },
    {
      id: 'tanhon',
      name: 'Lễ Tân Hôn',
      date: '09/06/2026',
      time: '09:00 AM',
      location: '195, thôn 4a, xã Quảng Phú, tỉnh Đắk Lắk',
      side: 'nhatrai'
    }
  ],

  // Link ảnh cho phần Gallery. Bạn có thể chép link Google Drive (link chia sẻ) vào đây.
  // Hệ thống sẽ tự động convert link Drive thành link ảnh trực tiếp để hiển thị.
  gallery: [
    "/z7849785668787_545076eb7332d020812634ff21635017.jpg",
    "/z7849785668787_545076eb7332d020812634ff21635017.jpg",
    "/z7849785668787_545076eb7332d020812634ff21635017.jpg",
    "/z7849785668787_545076eb7332d020812634ff21635017.jpg",
    "/z7849785668787_545076eb7332d020812634ff21635017.jpg",
    "/z7849785668787_545076eb7332d020812634ff21635017.jpg"
  ],

  // Thông tin dùng chung cho cả 2 bên (Tránh lặp code)
  couple: {
    groom: {
      name: "Đỗ Phú Khương",
      firstName: "Phú Khương",
      title: "Quý Nam"
    },
    bride: {
      name: "Hoàng Thị Cẩm Hiền",
      firstName: "Cẩm Hiền",
      title: "Thứ Nữ"
    }
  },

  // Cấu hình Dynamic Content thay đổi theo Mode URL (?side=...)
  nhatrai: {
    meta: {
      title: "Thiệp Cưới Tân Hôn - Phú Khương & Cẩm Hiền",
      themeColor: "#f4ebe1"
    },
    parents: {
      father: "Đỗ Phú Nhẫn",
      mother: "Nguyễn Thị Liễu",
      address: "195, thôn 4a, xã Quảng Phú, tỉnh Đắk Lắk"
    },
    // Hiển thị ưu tiên thứ tự Tên Chú Rể trước cho Mode Nhà Trai
    displayOrder: ["groom", "bride"],

    // Thông tin buổi lễ chính
    ceremony: {
      type: "Lễ Tân Hôn",
      dateLunar: "24/04 năm Bính Ngọ",
      dateSolar: "09/06/2026",
      time: "09:00",
      address: "195, thôn 4a, xã Quảng Phú, tỉnh Đắk Lắk"
    },

    // Thông tin tiệc cưới để khách nhà trai đến dự
    party: {
      title: "Tiệc Cưới Nhà Trai",
      time: "11:00 ngày 09/06/2026",
      address: "TƯ GIA NHÀ TRAI - 195, thôn 4a, xã Quảng Phú, tỉnh Đắk Lắk",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!..."
    }
  },

  nhagai: {
    meta: {
      title: "Thiệp Cưới Vu Quy - Cẩm Hiền & Phú Khương",
      themeColor: "#f9f1f0"
    },
    parents: {
      father: "Hoàng Đình Du",
      mother: "Nguyễn Thị Thuý Nga",
      address: "Thôn 1b, xã Ea M'Droh, tỉnh Đắk Lắk"
    },
    // Hiển thị ưu tiên thứ tự Tên Cô Dâu trước cho Mode Nhà Gái
    displayOrder: ["bride", "groom"],

    // Thông tin buổi lễ chính
    ceremony: {
      type: "Lễ Vu Quy",
      dateLunar: "22/04 năm Bính Ngọ",
      dateSolar: "07/06/2026",
      time: "09:00",
      address: "Thôn 1b, xã Ea M'Droh, tỉnh Đắk Lắk"
    },

    // Thông tin tiệc cưới để khách nhà gái đến dự
    party: {
      title: "Tiệc Cưới Nhà Gái",
      time: "11:00 ngày 07/06/2026",
      address: "TƯ GIA NHÀ GÁI - Thôn 1b, xã Ea M'Droh, tỉnh Đắk Lắk",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!..."
    }
  }
};
