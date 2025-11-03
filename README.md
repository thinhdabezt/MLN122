# 🌏 Từ Marx đến Việt Nam: Sở hữu & Phân phối

Dự án React/Vite + Tailwind CSS với Hero Section triết học - kinh tế - hiện đại, khám phá lý luận Marx về quan hệ sản xuất và thực tiễn Việt Nam.

## 🎨 Tính năng chính

### Navigation System
- 🧭 **3-Tab Navigation**: Trang Chủ, Case Study, Mini Game
- 🎨 **Sticky Header**: Navigation bar cố định với backdrop blur
- 🔄 **Smooth Transitions**: Chuyển tab mượt mà với animation

### Hero Section
- ✨ **Hiệu ứng Parallax**: Nền trượt nhẹ khi cuộn
- 🎭 **Fade-in Animation**: Nội dung xuất hiện mượt mà với GSAP
- ⚙️ **Animated Gears**: Bánh răng kinh tế xoay chậm
- 🎯 **CTA Buttons**: Nút bấm với hiệu ứng hover-scale và shine
- 📜 **Scroll Hint**: Gợi ý cuộn xuống với animation

### Ownership Section
- 📊 **Concept Cards**: 4 thẻ khái niệm với animation on scroll
- 🎨 **Gradient Effects**: Hiệu ứng gradient và glow
- 💬 **Quote Box**: Trích dẫn tư tưởng Hồ Chí Minh

### Timeline Section
- 📅 **5 Milestones**: Đổi Mới 1986 → Tầm nhìn 2030
- 🎯 **Year Markers**: 5 nút chấm tròn để điều hướng timeline
- 🔄 **Horizontal Scroll**: Cuộn ngang với GSAP ScrollTrigger
- 📖 **Modal Details**: Click vào milestone để xem chi tiết

### Case Study Section (Tab 2)
- 📚 **3 Case Cards**: DN Nhà nước, Kinh tế Tư nhân, HTX & Phân phối
- 🎨 **Hover Effects**: Thẻ nâng lên, quote Marx hiện ra
- 🪟 **Modal System**: Popup chi tiết với triết lý, nội dung, số liệu
- 📊 **Flexbox Layout**: Thẻ đồng đều chiều cao, buttons căn đều

### Mini Game Section (Tab 3) 🆕
- 🎮 **4 Educational Games**: Học lý thuyết Marx qua trải nghiệm
  1. ⚖️ **Ownership Mix** - Phân loại hình thức sở hữu (Kéo-thả 12 DN vào 4 nhóm)
  2. 💰 **Surplus Hunter** - Tối ưu giá trị thặng dư (Quản lý nhà máy ảo)
  3. 🧵 **Labor Value Challenge** - Ước lượng giờ công sản xuất (Quiz 8 sản phẩm)
  4. 🌏 **Guided Market** - Điều hành kinh tế XHCN (Simulator với 5 công cụ chính sách)
- 🪟 **Interactive Modals**: Mỗi game có popup chi tiết gameplay, chấm điểm, AI feedback
- 💬 **Marx Quote Overlays**: Hover vào thẻ game → hiện quote triết học
- 📊 **Tooltips with Stats**: Dữ liệu thống kê kinh tế VN thực tế
- 🎨 **Gradient Animations**: Background động với hiệu ứng gradientFlow

### UI Style
- 🎨 **Màu sắc**: Đỏ đất (#B53F3F), Xám khói (#ECECEC), Vàng nhẹ (#F3C969)
- 🔤 **Fonts**: Inter (hiện đại) + Lora (triết học)
- ⚡ **Icons**: Lucide React
- 🎬 **Animation**: GSAP với ScrollTrigger

## 📦 Cài đặt

```bash
# Clone hoặc cd vào thư mục
cd d:\react\MLN122

# Cài đặt dependencies (đã cài sẵn)
npm install

# Chạy dev server
npm run dev
```

## 🎮 Cấu trúc dự án

```plaintext
MLN122/
├── public/
│   └── images/              # Đặt hình ảnh vào đây
│       ├── vietnam-city-skyline.jpg
│       ├── karl-marx-portrait.png
│       ├── case-study/      # Ảnh cho Case Study Section
│       │   ├── state-enterprise.jpg
│       │   ├── private-enterprise.jpg
│       │   └── cooperative.jpg
│       ├── minigame/        # Ảnh infographics cho Mini Games
│       │   ├── ownership-mix-game.jpg
│       │   ├── surplus-value-game.jpg
│       │   ├── labor-value-game.jpg
│       │   └── guided-market-game.jpg
│       └── timeline/        # Ảnh cho Timeline Section
│           ├── doi-moi-1986.jpg
│           ├── hien-phap-1992.jpg
│           ├── wto-2007.jpg
│           ├── hien-phap-2013.jpg
│           └── vision-2030.jpg
├── src/
│   ├── components/
│   │   ├── Navigation.jsx            # Navigation 3 tabs
│   │   ├── HeroSection.jsx           # Hero section chính
│   │   ├── HeroSection.css           # Styles cho Hero
│   │   ├── OwnershipSection.jsx      # Section về sở hữu
│   │   ├── OwnershipSection.css      # Styles cho Ownership
│   │   ├── OwnershipTypesSection.jsx # 3 loại hình sở hữu
│   │   ├── DistributionSection.jsx   # Phân phối theo lao động
│   │   ├── MarketBalanceSection.jsx  # Thị trường định hướng XHCN
│   │   ├── TimelineSection.jsx       # Timeline 5 mốc lịch sử
│   │   ├── TimelineSection.css       # Styles cho Timeline
│   │   ├── CaseStudySection.jsx      # Tab 2: 3 Case Studies
│   │   ├── CaseStudySection.css      # Styles cho Case Study
│   │   ├── MiniGameSection.jsx       # Tab 3: 4 Mini Games
│   │   └── MiniGameSection.css       # Styles cho Mini Game
│   ├── App.jsx                       # Component gốc với tab routing
│   ├── App.css                       # Global styles
│   ├── main.jsx                      # Entry point
│   └── index.css                     # Tailwind + fonts
├── PLACEHOLDER_GUIDE.md              # Hướng dẫn thay ảnh placeholder
├── tailwind.config.js                # Cấu hình Tailwind
└── package.json                      # Dependencies
```

## 🎯 Nhiệm vụ tiếp theo

- [x] ~~Thêm Navigation với 3 tabs~~
- [x] ~~Timeline Section (Marx → Hồ Chí Minh → Việt Nam hiện đại)~~
- [x] ~~Case Study Section với 3 cases~~
- [x] ~~Minigame Section (4 game tương tác về sở hữu/phân phối)~~
- [ ] Interactive Charts (biểu đồ kinh tế VN với D3.js hoặc Recharts)
- [ ] Quiz/Assessment Section
- [ ] Footer với liên hệ và tài liệu tham khảo
- [ ] Thay thế placeholder images (xem PLACEHOLDER_GUIDE.md)

## 🛠️ Technologies

- **React 19.1.1** - UI Framework
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first CSS
- **GSAP** - Animation library
- **Lucide React** - Icon library

## 📝 License

MIT

---

**Tạo bởi:** MLN122 Project Team  
**Mục đích:** Giáo dục về lý luận Marx và thực tiễn Việt Nam

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
