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

## 🖼️ Hướng dẫn thay thế hình ảnh

### 1. Ảnh Thành phố Việt Nam
Trong file `src/components/HeroSection.jsx`, tìm comment:
```jsx
/* 
  PLACEHOLDER: Thay thế bằng ảnh thành phố Việt Nam hiện đại
  Gợi ý: Ảnh Landmark 81, Bitexco, hoặc skyline Hà Nội/Sài Gòn
  URL mẫu: '/images/vietnam-city-skyline.jpg'
*/
```

**Cách thay thế:**
1. Tải ảnh thành phố VN (Landmark 81, Bitexco, etc.)
2. Đặt vào `public/images/vietnam-city-skyline.jpg`
3. Thêm style vào div `.vietnam-city-bg`:
```jsx
<div 
  className="vietnam-city-bg absolute inset-0"
  style={{ backgroundImage: "url('/images/vietnam-city-skyline.jpg')" }}
>
```

### 2. Ảnh Karl Marx
Tìm comment:
```jsx
/* 
  PLACEHOLDER: Ảnh Karl Marx mờ, xuất hiện dần
  Gợi ý: Ảnh chân dung Karl Marx với opacity thấp
  URL mẫu: '/images/karl-marx-portrait.png'
*/
```

**Cách thay thế:**
1. Tải ảnh Karl Marx (PNG với nền trong suốt tốt nhất)
2. Đặt vào `public/images/karl-marx-portrait.png`
3. Thay đổi style trong div `.marx-overlay`:
```jsx
style={{
  backgroundImage: "url('/images/karl-marx-portrait.png')"
}}
```

## 🎵 Thêm âm thanh nền (Tùy chọn)

Tạo component `BackgroundMusic.jsx`:

```jsx
import { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/audio/background-music.mp3" type="audio/mpeg" />
      </audio>
      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 p-4 bg-red-earth rounded-full shadow-lg hover:scale-110 transition-transform"
      >
        {isPlaying ? <Volume2 className="w-6 h-6 text-white" /> : <VolumeX className="w-6 h-6 text-white" />}
      </button>
    </>
  );
};

export default BackgroundMusic;
```

Sau đó import vào `App.jsx`:
```jsx
import BackgroundMusic from './components/BackgroundMusic'

// Trong return:
<BackgroundMusic />
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
