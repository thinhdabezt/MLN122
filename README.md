# 🌏 Từ Marx đến Việt Nam: Sở hữu & Phân phối

**Khám phá lý luận – Trải nghiệm sáng tạo – Hiểu bản chất XHCN**

---

## 📌 Giới thiệu

Một web interactif giáo dục kết hợp lý thuyết kinh tế học của Karl Marx với thực tiễn kinh tế Việt Nam hiện đại. Dự án giúp người dùng hiểu rõ về:

- 📚 **Lý thuyết Marx**: Sở hữu, phân phối, giá trị lao động, giá trị thặng dư
- 🇻🇳 **Mô hình Việt Nam**: KTTTĐH XHCN, 3 hình thức sở hữu, chính sách công bằng
- 🎮 **Học qua trò chơi**: 3 mini games tương tác

---

## 🎯 Tính năng chính

### 📖 **Section 1: Lý thuyết Cơ bản**
- **Hero Section**: Giới thiệu chủ đề
- **Ownership Section**: 4 khái niệm cốt lõi
- **Ownership Types**: 3 hình thức sở hữu với ví dụ Việt Nam
- **Market Balance**: Slider interactif để cân bằng kinh tế

### 📊 **Section 2: Case Study**
- Kinh tế Nhà nước: EVN, PVN, Viettel
- Kinh tế tư nhân: Vingroup, FPT, Masan
- HTX nông nghiệp: Đồng Tháp, Lam Sơn

### 🎮 **Section 3: Mini Games**
1. **Labor Value Game**: Tính giá trị lao động (Marx)
2. **Surplus Hunter Game**: Tìm giá trị thặng dư
3. **Ownership Mix Game**: Mô phỏng quản lý kinh tế 10 năm

### 📅 **Section 4: Timeline**
- 5 mốc lịch sử: 1986 → 2007 → 2030
- Chi tiết từng giai đoạn Đổi Mới

### 📚 **Section 5: Tài liệu tham khảo**
- 12 nguồn: Marx, hiến pháp, chính sách VN, dữ liệu GSO

---

## 🛠️ Công nghệ sử dụng

- **React 18+** - UI framework
- **Vite** - Build tool (cực nhanh)
- **GSAP 3.x** - Animations (ScrollTrigger, Parallax)
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

---

## ⚙️ Cài đặt & Chạy

### 1. Clone repo
```bash
git clone <repo-url>
cd MLN122
```

### 2. Cài đặt dependencies
```bash
npm install
```

### 3. Chạy development server
```bash
npm run dev
```
Mở browser: `http://localhost:5173`

### 4. Build production
```bash
npm run build
```

---

## 📁 Cấu trúc dự án

```
MLN122/
├── src/
│   ├── components/
│   │   ├── HeroSection.jsx
│   │   ├── OwnershipSection.jsx
│   │   ├── OwnershipTypesSection.jsx
│   │   ├── MarketBalanceSection.jsx
│   │   ├── CaseStudySection.jsx
│   │   ├── TimelineSection.jsx
│   │   ├── DistributionSection.jsx
│   │   ├── MiniGameSection.jsx
│   │   ├── LaborValueGame.jsx
│   │   ├── SurplusHunterGame.jsx
│   │   ├── OwnershipMixGame.jsx
│   │   ├── ReferencesSection.jsx
│   │   ├── BackgroundMusic.jsx
│   │   ├── Footer.jsx
│   │   └── Navigation.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
│   ├── audio/
│   └── images/
├── package.json
├── vite.config.js
└── tailwind.config.js
```

---

## 🎓 Nội dung chính

### Lý thuyết Marx được trình bày:
- **Giá trị lao động**: Thời gian lao động xã hội cần thiết
- **Giá trị thặng dư**: Lợi nhuận từ lao động vô lương
- **Sở hữu tư liệu sản xuất**: 3 hình thức (Nhà nước, Tư nhân, Tập thể)
- **Phân phối**: Theo lao động, phúc lợi, thuế

### Áp dụng Việt Nam:
- 🏭 Nhà nước: EVN, PVN (chiếm 28.5% GDP)
- 💼 Tư nhân: Vingroup, FPT (chiếm 41.5% GDP)
- 🌾 Tập thể: HTX nông nghiệp (chiếm 5.5% GDP)

---

## 🎮 Cách chơi Mini Games

### Labor Value Game
- Ước tính giá trị lao động (tính bằng giờ)
- Công thức: `Giá trị = workers × hours + machines × 0.5`
- Điểm số: `20 × e^(-error/50)`

### Surplus Hunter Game
- Tính giá trị thặng dư từ lao động
- Công thức: `m = (V - C) / C`

### Ownership Mix Game
- Điều chỉnh 3 loại sở hữu trong 10 năm
- Cân bằng: Năng suất, Công bằng, Ổn định

---

## 📊 Thống kê Việt Nam

- **GDP growth**: 6-7%/năm
- **Tỷ lệ nghèo**: 2.5% (2023)
- **BHYT**: 87% dân số
- **Thu nhập trung bình**: $3,164/người/năm (2023)

---

## 🔗 Tài liệu tham khảo

1. Marx, K. (1867) - *Das Kapital*
2. Engels, F. (1878) - *Anti-Dühring*
3. Đại hội VI Đảng (1986) - Nghị quyết Đổi Mới
4. Hiến pháp VN 1992, 2013
5. GSO (Tổng cục Thống kê) - Niên giám thống kê
6. World Bank - Vietnam Development Report

---

## ✨ Đặc điểm nổi bật

✅ **Interactif**: Slider, games, animations  
✅ **Responsive**: Mobile, tablet, desktop  
✅ **Dark Mode**: Giao diện hiện đại, dễ xem  
✅ **Nhạc nền**: Audio player tích hợp  
✅ **Modal chi tiết**: Click để xem thêm thông tin  
✅ **Animations**: GSAP ScrollTrigger, Parallax effects  

---

## 🎯 Đối tượng sử dụng

- 📚 Sinh viên học kinh tế, chính trị
- 👨‍💼 Chuyên gia tìm hiểu mô hình VN
- 🧠 Ai muốn hiểu Marx & Việt Nam

---

## 📝 Ghi chú

- Tất cả nội dung được kiểm duyệt về chính tả & nội dung lịch sử
- Dữ liệu kinh tế từ GSO & World Bank
- Được xây dựng với mục đích giáo dục

---

## 📧 Liên hệ & Đóng góp

- 🐛 Bug report: Mở issue trên GitHub
- 💡 Đề xuất: Tạo discussion hoặc pull request
- 🤝 Đóng góp: Fork → Edit → Pull request

---

**Made with ❤️ using React + GSAP + Tailwind**

*"Lý thuyết không màu khô, nó như một cây xanh trong tinh thần." - Marx*

---

Last Updated: 5/11/2025 ✅
