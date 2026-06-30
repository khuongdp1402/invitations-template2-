/**
 * VOLUME 5: TheWeddingData - Single Source of Truth
 * Merged from weddingData.js (full data) + WSDD storyChapters
 */

export const weddingData = {
  couple: {
    groom: {
      name: "Đỗ Phú Khương",
      firstName: "Phú Khương",
      title: "Quý Nam",
    },
    bride: {
      name: "Hoàng Thị Cẩm Hiền",
      firstName: "Cẩm Hiền",
      title: "Thứ Nữ",
    },
    weddingDate: "2026-06-09T00:00:00.000Z",
  },

  audio: {
    bgmUrl: "/Give Me Everything - (Cover by Archer Marsh) [Bridgerton Season 3 (Netflix Series)].mp3",
    autoplay: false,
  },

  rsvpConfig: {
    deadline: "2026-06-01T00:00:00.000Z",
    googleFormUrl: "https://forms.gle/example",
  },

  // Dynamic Content theo Mode URL (?side=nhatrai / ?side=nhagai)
  nhatrai: {
    meta: {
      title: "Thiệp Cưới Tân Hôn - Phú Khương & Cẩm Hiền",
    },
    parents: {
      father: "Đỗ Phú Nhẫn",
      mother: "Nguyễn Thị Liễu",
      address: "195, thôn 4a, xã Quảng Phú, tỉnh Đắk Lắk",
    },
    displayOrder: ["groom", "bride"],
    ceremony: {
      type: "Lễ Tân Hôn",
      dateLunar: "24/04 năm Bính Ngọ",
      dateSolar: "09/06/2026",
      time: "09:00",
      address: "195, thôn 4a, xã Quảng Phú, tỉnh Đắk Lắk",
    },
    party: {
      title: "Tiệc Cưới Nhà Trai",
      time: "11:00 ngày 09/06/2026",
      address: "TƯ GIA NHÀ TRAI - 195, thôn 4a, xã Quảng Phú, tỉnh Đắk Lắk",
    },
  },

  nhagai: {
    meta: {
      title: "Thiệp Cưới Vu Quy - Cẩm Hiền & Phú Khương",
    },
    parents: {
      father: "Hoàng Đình Du",
      mother: "Nguyễn Thị Thuý Nga",
      address: "Thôn 1b, xã Ea M'Droh, tỉnh Đắk Lắk",
    },
    displayOrder: ["bride", "groom"],
    ceremony: {
      type: "Lễ Vu Quy",
      dateLunar: "22/04 năm Bính Ngọ",
      dateSolar: "07/06/2026",
      time: "09:00",
      address: "Thôn 1b, xã Ea M'Droh, tỉnh Đắk Lắk",
    },
    party: {
      title: "Tiệc Cưới Nhà Gái",
      time: "11:00 ngày 07/06/2026",
      address: "TƯ GIA NHÀ GÁI - Thôn 1b, xã Ea M'Droh, tỉnh Đắk Lắk",
    },
  },

  // Ảnh banner ngang (SAVE THE DATE)
  bannerImage: "/images/z7974179782876_16f0b4c620fd7ffb9b16f13b4d69e029.jpg",

  // Collapse images — ảnh ghép sẵn, hiển thị độc lập full-width
  collapseImages: [
    "/images/collapse_images/z7974179666520_e6e2ccf46662d623ffa969ec32d4431b.jpg",
    "/images/collapse_images/z7974179682525_17fc2a2f8b2a859ba087eecbe34768ee.jpg",
    "/images/collapse_images/z7974179703332_9093b3f1e4a18c99665f815021c7af60.jpg",
    "/images/collapse_images/z7974179717841_dc76e4fae500560249e21340aa45cb3a.jpg",
    "/images/collapse_images/z7974179826859_eacb1dc461b5b4adc780f7999330858c.jpg",
    "/images/collapse_images/z7974179833482_2aa4d6c6709079610314d21abe13f231.jpg",
    "/images/collapse_images/z7974179863480_a538e90f55916894247e45618066abcf.jpg",
  ],

  // Gallery ảnh đơn dọc
  gallery: [
    "/images/z7974179647046_c0ea8bbbabb1002beb2d7fbaef09ddde.jpg",
    "/images/z7974179649764_4be2c032860731744781ff25a84415e5.jpg",
    "/images/z7974179663138_96009eccd733980cb3d5f8efaa6711f1.jpg",
    "/images/z7974179671203_0fe40cf1e0ad9b6d6f2ed64c9246ed34.jpg",
    "/images/codau/z7974179677199_aae30dafd89c8b5af79516e11e3569b1.jpg",
    "/images/codau/z7974179685104_53ba5217490af1ce5752cdcc90556e1f.jpg",
    "/images/z7974179695774_d47b800141b4ad811794602b2925c565.jpg",
    "/images/codau/z7974179703025_e749d94cbdda06a7d4d4e56c9b599db7.jpg",
    "/images/codau/z7974179712797_3b336e8f15e7c34fb0c5e56bb4912a34.jpg",
    "/images/z7974179722562_5e595f09b9a541bec01d5ffceee0aefe.jpg",
    "/images/z7974179733015_9d85117db4b5913a6dcf0f395bf51648.jpg",
    "/images/z7974179737111_d58e8bb81254cb1dd071572b736cf5b5.jpg",
  ],

  storyChapters: [
    {
      id: "chapter-0-hero",
      title: "The Beginning",
      theme: "#000000",
      layoutType: "hero",
      images: ["/images/z7974179782876_16f0b4c620fd7ffb9b16f13b4d69e029.jpg"],
      quote: "Every love story begins with a single moment.",
    },
    {
      id: "chapter-1-meet",
      title: "The First Glance",
      theme: "#FFF8F0",
      layoutType: "asymmetric-left",
      images: [
        "/images/z7974179649764_4be2c032860731744781ff25a84415e5.jpg",
        "/images/z7974179647046_c0ea8bbbabb1002beb2d7fbaef09ddde.jpg",
        "/images/codau/z7974179677199_aae30dafd89c8b5af79516e11e3569b1.jpg",
        "/images/codau/z7974179685104_53ba5217490af1ce5752cdcc90556e1f.jpg",
        "/images/z7974179722562_5e595f09b9a541bec01d5ffceee0aefe.jpg",
        "/images/z7974179761525_0b2ce344228ededd538a3a05c5880994.jpg",
      ],
      parallaxSpeed: [0.8, 1.2, 0.9, 1.1, 0.85, 1.15],
      quote: "Ánh mắt chạm nhau, và thế giới như dừng lại.",
    },
    {
      id: "chapter-2-journey",
      title: "Our Journey",
      theme: "#FFF8F0",
      layoutType: "filmstrip",
      images: [],
      quote: "Mỗi khoảnh khắc bên nhau là một trang truyện đẹp.",
    },
    {
      id: "chapter-4-family",
      title: "Two Families, One Love",
      theme: "#F5F5DC",
      layoutType: "grid",
      images: [
        "/images/chure/z7974179759081_76fdea264281169d13a97a3261f1145c.jpg",
        "/images/codau/z7974179703025_e749d94cbdda06a7d4d4e56c9b599db7.jpg",
      ],
      parallaxSpeed: [1.1, 0.9],
    },
    {
      id: "chapter-6-rsvp",
      title: "Trân Trọng Kính Mời",
      theme: "#FFFFFF",
      layoutType: "rsvp",
      images: [],
    },
    {
      id: "chapter-7-ending",
      title: "Forever",
      theme: "#800020",
      layoutType: "hero",
      images: ["/images/z7974179746274_0b7ea351b9b2e0b5eccddf3170fdd916.jpg"],
      quote: "Cảm ơn bạn đã là một phần của câu chuyện này.",
    },
  ],
};
