# 🌏 Từ Marx đến Việt Nam: Sở hữu & Phân phối

Dự án React/Vite + Tailwind CSS với Hero Section triết học - kinh tế - hiện đại, khám phá lý luận Marx về quan hệ sản xuất và thực tiễn Việt Nam.

## 🎨 Tính năng chính

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

```
MLN122/
├── public/
│   └── images/              # Đặt hình ảnh vào đây
│       ├── vietnam-city-skyline.jpg
│       └── karl-marx-portrait.png
├── src/
│   ├── components/
│   │   ├── HeroSection.jsx       # Hero section chính
│   │   ├── HeroSection.css       # Styles cho Hero
│   │   ├── OwnershipSection.jsx  # Section về sở hữu
│   │   └── OwnershipSection.css  # Styles cho Ownership
│   ├── App.jsx                   # Component gốc
│   ├── App.css                   # Global styles
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Tailwind + fonts
├── tailwind.config.js            # Cấu hình Tailwind
└── package.json                  # Dependencies
```

## 🎯 Nhiệm vụ tiếp theo

- [ ] Thêm Minigame Section (game tương tác về sở hữu/phân phối)
- [ ] Timeline Section (Marx → Hồ Chí Minh → Việt Nam hiện đại)
- [ ] Interactive Charts (biểu đồ kinh tế VN với D3.js hoặc Recharts)
- [ ] Quiz/Assessment Section
- [ ] Footer với liên hệ và tài liệu tham khảo

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
