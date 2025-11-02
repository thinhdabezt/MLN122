# 🎵 Hướng dẫn thêm Background Music

## Bước 1: Tải file nhạc

### Nguồn nhạc miễn phí:

**YouTube Audio Library:**
- Vào: https://studio.youtube.com/channel/UC.../music
- Chọn tab "Audio Library"
- Lọc: Genre → Classical/Ambient
- Tải về định dạng MP3

**Free Music Archive:**
- Vào: https://freemusicarchive.org/
- Tìm kiếm: "classical piano" hoặc "ambient"
- Download MP3

**Incompetech:**
- Vào: https://incompetech.com/music/
- Chọn mục "Royalty Free Music"
- Tìm kiếm theo mood: "Calm", "Contemplative"

### Gợi ý bài hát phù hợp:
- "Gymnopédie No.1" - Erik Satie
- "Clair de Lune" - Debussy
- "Piano Concerto No. 21" - Mozart
- Ambient piano soundtracks

## Bước 2: Chuẩn bị file

1. **Tạo thư mục audio:**
   ```bash
   mkdir public/audio
   ```

2. **Đổi tên file thành:**
   - `background-music.mp3`

3. **Copy vào thư mục:**
   - Đặt file vào: `public/audio/background-music.mp3`

4. **(Tùy chọn) Tạo thêm file OGG:**
   - Để tương thích nhiều trình duyệt
   - Sử dụng converter online hoặc:
   ```bash
   ffmpeg -i background-music.mp3 background-music.ogg
   ```

## Bước 3: Import vào App.jsx

Mở file `src/App.jsx` và thêm:

```jsx
import HeroSection from './components/HeroSection'
import OwnershipSection from './components/OwnershipSection'
import BackgroundMusic from './components/BackgroundMusic'  // ← Thêm dòng này
import './App.css'

function App() {
  return (
    <div className="app">
      <HeroSection />
      <OwnershipSection />
      
      {/* Background Music Controller */}
      <BackgroundMusic />  {/* ← Thêm dòng này */}
      
      {/* TODO: Các section khác... */}
    </div>
  )
}

export default App
```

## Bước 4: Kiểm tra

1. **Mở trình duyệt:**
   ```
   http://localhost:5173/
   ```

2. **Tìm nút nhạc:**
   - Góc dưới bên phải màn hình
   - Icon loa màu đỏ

3. **Chức năng:**
   - Click để bật/tắt nhạc
   - Hover để hiện volume slider
   - Kéo slider để điều chỉnh âm lượng

## Tính năng BackgroundMusic Component:

✅ **Autoplay control** - Người dùng quyết định bật/tắt
✅ **Volume slider** - Điều chỉnh âm lượng 0-100%
✅ **Loop** - Nhạc lặp lại liên tục
✅ **Responsive** - Hoạt động tốt trên mobile
✅ **Tooltip** - Hiển thị trạng thái
✅ **Animations** - Ripple effect khi đang phát
✅ **Accessibility** - Keyboard navigation, ARIA labels

## Tùy chỉnh

### Thay đổi vị trí nút:

File: `src/components/BackgroundMusic.css`

```css
.music-controller {
  bottom: 2rem;  /* Khoảng cách từ đáy */
  right: 2rem;   /* Khoảng cách từ phải */
  
  /* Đổi sang góc trái: */
  /* left: 2rem; */
  /* right: auto; */
}
```

### Thay đổi màu sắc:

```css
.music-button {
  background: linear-gradient(135deg, #B53F3F 0%, #8B3030 100%);
  /* Đổi màu vàng: */
  /* background: linear-gradient(135deg, #F3C969 0%, #E0B555 100%); */
}
```

### Thay đổi volume mặc định:

File: `src/components/BackgroundMusic.jsx`

```jsx
const [volume, setVolume] = useState(0.3); // 0.3 = 30%
// Đổi thành 0.5 cho 50%, 0.7 cho 70%, etc.
```

## Gỡ bỏ (nếu không muốn dùng)

1. Xóa import trong `App.jsx`:
   ```jsx
   // Xóa hoặc comment dòng này:
   // import BackgroundMusic from './components/BackgroundMusic'
   // <BackgroundMusic />
   ```

2. File component vẫn giữ lại để sau này có thể dùng

## Troubleshooting

### Lỗi: "Cannot find audio file"
- Kiểm tra đường dẫn: `public/audio/background-music.mp3`
- Restart dev server: `npm run dev`

### Lỗi: "Autoplay blocked"
- Bình thường! Trình duyệt chặn autoplay
- Người dùng phải click nút để bật nhạc

### Nhạc không phát
1. Kiểm tra console (F12)
2. Kiểm tra format file (MP3)
3. Thử file nhạc khác
4. Kiểm tra volume slider (có thể đang ở 0%)

---

**Lưu ý:** Nhớ kiểm tra bản quyền nhạc nếu dự án thương mại!
