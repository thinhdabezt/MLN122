# 📝 Hướng dẫn Thay thế Placeholder

## 🖼️ Hình ảnh cần thay thế

### 1. Ảnh Thành phố Việt Nam
**Vị trí:** `src/components/HeroSection.jsx` (dòng ~70)

**Gợi ý ảnh:**
- Landmark 81, Sài Gòn
- Tòa nhà Bitexco Financial Tower
- Cầu Vàng, Đà Nẵng
- Skyline Hà Nội/TP.HCM

**Nguồn tải miễn phí:**
- Unsplash: https://unsplash.com/s/photos/vietnam-city
- Pexels: https://www.pexels.com/search/vietnam%20city/
- Pixabay: https://pixabay.com/images/search/vietnam/

**Cách thay thế:**
```jsx
// Tìm dòng này trong HeroSection.jsx:
<div className="vietnam-city-bg absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">

// Thay đổi thành:
<div 
  className="vietnam-city-bg absolute inset-0 bg-cover bg-center"
  style={{ backgroundImage: "url('/images/vietnam-city-skyline.jpg')" }}
>
```

**Tải ảnh và đặt vào:** `public/images/vietnam-city-skyline.jpg`

---

### 2. Ảnh Karl Marx
**Vị trí:** `src/components/HeroSection.jsx` (dòng ~85)

**Gợi ý ảnh:**
- Chân dung Karl Marx (PNG với nền trong suốt)
- Ảnh đen trắng để tạo hiệu ứng vintage

**Nguồn:**
- Wikimedia Commons: https://commons.wikimedia.org/wiki/Karl_Marx
- PNG miễn phí: https://www.pngwing.com/en/search?q=karl+marx

**Cách thay thế:**
```jsx
// Tìm dòng này:
<div 
  className={`marx-overlay...`}
  style={{
    backgroundImage: "url('data:image/svg+xml...')",
    // Thay thế bằng: backgroundImage: "url('/images/karl-marx-portrait.png')"
  }}
></div>

// Thay đổi thành:
<div 
  className={`marx-overlay absolute inset-0 bg-center bg-no-repeat bg-contain opacity-0 transition-opacity duration-[2000ms] ${
    isLoaded ? 'opacity-10' : ''
  }`}
  style={{
    backgroundImage: "url('/images/karl-marx-portrait.png')"
  }}
></div>
```

**Tải ảnh và đặt vào:** `public/images/karl-marx-portrait.png`

---

### 3. Icons cho Ownership Types Section (Tùy chọn)

**Vị trí:** `src/components/OwnershipTypesSection.jsx`

Hiện tại đang dùng icons từ Lucide React (User, Factory, Users). Nếu muốn thay bằng ảnh/icon tùy chỉnh:

**Gợi ý:**
- Icon nông dân cho "Sở hữu Cá nhân"
- Icon nhà máy/công xưởng cho "Sở hữu Tư nhân"
- Icon cờ đỏ sao vàng/quốc huy cho "Sở hữu Công cộng"

**Nguồn:**
- Flaticon: https://www.flaticon.com/
- Icons8: https://icons8.com/
- The Noun Project: https://thenounproject.com/

**Cách thay thế:**
```jsx
// Thay vì:
icon: <User className="w-12 h-12" />

// Sử dụng ảnh:
icon: <img src="/images/icons/farmer-icon.png" alt="Farmer" className="w-12 h-12" />
```

**Đặt icons vào:** `public/images/icons/`

---

### 4. Background cho Market Balance Section (Tùy chọn)

**Vị trí:** `src/components/MarketBalanceSection.jsx`

**Gợi ý ảnh nền:**
- Biểu đồ cân bằng thị trường (supply-demand graph)
- Hình cân đối (balance scale) với hiệu ứng mờ
- Abstract pattern về kinh tế học

**Nguồn:**
- Unsplash: https://unsplash.com/s/photos/balance-scale
- Pexels: https://www.pexels.com/search/economics/
- Freepik: https://www.freepik.com/search?format=search&query=market%20balance

**Cách thêm:**
```jsx
// Trong MarketBalanceSection.jsx, thêm background image:
<section className="market-balance-section py-20 px-4 md:px-8 relative">
  <div 
    className="absolute inset-0 bg-cover bg-center opacity-5"
    style={{ backgroundImage: "url('/images/market-balance-bg.jpg')" }}
  ></div>
  {/* ... nội dung hiện tại ... */}
</section>
```

**Tải ảnh và đặt vào:** `public/images/market-balance-bg.jpg`

---

### 5. Logo doanh nghiệp Việt Nam (Tùy chọn nâng cao)

Để tăng tính trực quan cho các ví dụ trong OwnershipTypesSection, có thể thêm logo các doanh nghiệp:

**Gợi ý logo:**
- Vingroup, Masan, Hòa Phát (Tư nhân)
- EVN, Petrovietnam, Vietcombank (Nhà nước)
- Samsung, Intel, LG (FDI)

**Lưu ý:** Chỉ sử dụng cho mục đích giáo dục, tôn trọng bản quyền

---

### 6. Timeline Images (Section 5) - 5 ảnh lịch sử

**Vị trí:** `src/components/TimelineSection.jsx` - Modal cho 5 mốc timeline

#### 6.1. Đổi Mới 1986
**Path:** `public/images/timeline/doi-moi-1986.jpg`

**Gợi ý ảnh:**
- Đại hội VI Đảng (1986)
- Hình ảnh cửa hàng đầu tiên sau Đổi Mới
- Nông dân được tự do sản xuất
- Chợ tự do, kinh doanh tư nhân

**Nguồn:**
- Báo Nhân Dân, VnExpress (mục Lịch sử)
- Wikimedia Commons Vietnam history
- Getty Images (có bản quyền, chỉ tham khảo)

#### 6.2. Hiến pháp 1992
**Path:** `public/images/timeline/hien-phap-1992.jpg`

**Gợi ý ảnh:**
- Quốc hội thông qua Hiến pháp 1992
- Văn bản Hiến pháp
- Cờ Đảng và Quốc kỳ

**Nguồn:**
- Chinhphu.vn (ảnh lịch sử Quốc hội)
- Thư viện ảnh Quốc gia

#### 6.3. Hội nhập WTO (2007)
**Path:** `public/images/timeline/wto-2007.jpg`

**Gợi ý ảnh:**
- Lễ ký kết gia nhập WTO
- Cảng Sài Gòn, container xuất khẩu
- Khu công nghiệp, FDI
- Thủ tướng Nguyễn Tấn Dũng tại WTO

**Nguồn:**
- Bộ Công Thương, Bộ Ngoại giao
- Reuters, AFP (có bản quyền)
- VnExpress archive 2007

#### 6.4. Hiến pháp 2013
**Path:** `public/images/timeline/hien-phap-2013.jpg`

**Gợi ý ảnh:**
- Quốc hội biểu quyết Hiến pháp 2013
- Nhà Quốc hội Hà Nội
- Biểu tượng công bằng, dân chủ

**Nguồn:**
- Quochoi.vn (ảnh chính thức)
- VNA (Thông tấn xã Việt Nam)

#### 6.5. Tầm nhìn 2030-2045
**Path:** `public/images/timeline/vision-2030.jpg`

**Gợi ý ảnh:**
- Thành phố thông minh, skyline hiện đại
- Công nghệ cao, AI, robot
- Tàu điện ngầm, giao thông xanh
- Landmark 81, Vinhomes, khu đô thị mới
- Hình ảnh futuristic của Việt Nam

**Nguồn:**
- Unsplash: https://unsplash.com/s/photos/smart-city-vietnam
- Pexels: https://www.pexels.com/search/future%20city/
- Freepik: https://www.freepik.com/search?query=vietnam%20modern

**Cách thay thế trong TimelineSection.jsx:**
```jsx
// Hiện tại: Gradient placeholder với icon
<div className="modal-image" style={{...}}>
  <div className="image-placeholder-icon">...</div>
</div>

// Thay thế bằng ảnh thật:
<div 
  className="modal-image"
  style={{
    backgroundImage: `url('${milestones[activeIndex].image}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}
></div>
```

**Tải và đặt vào:** `public/images/timeline/`

---

## 🎵 Âm thanh nền (Tùy chọn)

### Gợi ý nhạc nền:
- Piano trầm, triết học
- Classical music (Beethoven, Mozart)
- Ambient music nhẹ nhàng

### Nguồn âm thanh miễn phí:
- YouTube Audio Library
- Free Music Archive: https://freemusicarchive.org/
- Incompetech: https://incompetech.com/music/

### Cách thêm:
1. Tải file MP3
2. Đặt vào `public/audio/background-music.mp3`
3. Tạo component `BackgroundMusic.jsx` (xem README.md)
4. Import vào `App.jsx`

---

## 🌐 Logo

### Logo hiện tại:
- Đang dùng icon Globe từ Lucide React
- Màu vàng nhẹ (#F3C969)

### Thay thế logo tùy chỉnh:
**Vị trí:** `src/components/HeroSection.jsx` (dòng ~125)

```jsx
// Thay vì:
<Globe className="w-16 h-16 md:w-20 md:h-20 text-soft-gold..." />

// Sử dụng ảnh:
<img 
  src="/images/logo.png" 
  alt="Logo" 
  className="w-16 h-16 md:w-20 md:h-20 drop-shadow-lg hover:scale-110 transition-transform"
/>
```

---

## 🎨 Tùy chỉnh màu sắc

**File:** `tailwind.config.js`

```javascript
colors: {
  'red-earth': '#B53F3F',    // Đỏ đất - có thể đổi
  'smoke-gray': '#ECECEC',   // Xám khói
  'soft-gold': '#F3C969',    // Vàng nhẹ
},
```

---

## ✅ Checklist hoàn thiện

- [ ] Tải và thay ảnh thành phố Việt Nam
- [ ] Tải và thay ảnh Karl Marx
- [ ] (Tùy chọn) Thêm logo tùy chỉnh
- [ ] (Tùy chọn) Thêm nhạc nền
- [ ] Kiểm tra responsive trên mobile/tablet
- [ ] Tối ưu hóa kích thước ảnh (nén, WebP)
- [ ] Thêm alt text cho accessibility

---

## Section 7: Case Study - 3 Ảnh Minh Họa Cho Case Cards

### 7.1 Ảnh Card 1: Doanh Nghiệp Nhà Nước 🏭
**Path:** `public/images/case-study/state-enterprise.jpg`

**Mô tả yêu cầu:**
- Hình ảnh nhà máy điện, cột điện cao thế, hoặc logo tập đoàn EVN/PVN
- Phong cách: Industrial, hiện đại, chuyên nghiệp
- Tone màu: Xanh dương (công nghiệp), xám kim loại, ánh sáng vàng (năng lượng)
- Kích thước khuyến nghị: 800x600px hoặc lớn hơn
- Tỷ lệ: 4:3 hoặc 16:9

**Gợi ý nội dung ảnh:**
- Nhà máy điện (EVN power plant)
- Cột điện cao thế với bầu trời xanh
- Trụ sở tập đoàn Dầu Khí (PVN building)
- Giàn khoan dầu khí trên biển
- Nhà máy sản xuất với ống khói và thiết bị công nghiệp

**Nguồn ảnh đề xuất:**
- Unsplash: Tìm "power plant", "electrical tower", "industrial factory"
- Pexels: Tìm "electricity", "energy industry", "manufacturing plant"
- Pixabay: Tìm "industrial", "factory", "power station"
- Freepik: Tìm "energy illustration", "factory vector"
- Chính thức: Website EVN.com.vn, PVN.vn (nếu có ảnh công khai)

---

### 7.2 Ảnh Card 2: Kinh Tế Tư Nhân 💼
**Path:** `public/images/case-study/private-enterprise.jpg`

**Mô tả yêu cầu:**
- Hình ảnh văn phòng hiện đại, skyline thành phố, hoặc không gian làm việc startup
- Phong cách: Modern, dynamic, innovative
- Tone màu: Xanh lá (tăng trưởng), cam (năng động), trắng (sáng tạo)
- Kích thước khuyến nghị: 800x600px hoặc lớn hơn
- Tỷ lệ: 4:3 hoặc 16:9

**Gợi ý nội dung ảnh:**
- Skyline thành phố Hà Nội/TP.HCM (Landmark 81, Lotte Center)
- Văn phòng hiện đại với laptop, meeting room
- Không gian làm việc startup (creative office)
- Tòa nhà Vincom, FPT Complex
- Doanh nhân làm việc với công nghệ

**Nguồn ảnh đề xuất:**
- Unsplash: Tìm "modern office", "city skyline vietnam", "startup workspace"
- Pexels: Tìm "business meeting", "corporate office", "entrepreneur"
- Pixabay: Tìm "businessman", "office building", "technology"
- Freepik: Tìm "office illustration", "business vector"
- Chính thức: Vingroup.net, FPT.com.vn (ảnh công khai)

---

### 7.3 Ảnh Card 3: Kinh Tế Tập Thể & Phán Phối 🌾
**Path:** `public/images/case-study/cooperative.jpg`

**Mô tả yêu cầu:**
- Hình ảnh nông dân làm việc trên cánh đồng, hợp tác xã, hoặc cộng đồng nông thôn
- Phong cách: Warm, community-focused, natural
- Tone màu: Xanh lá (nông nghiệp), vàng (lúa mì), nâu đất
- Kích thước khuyến nghị: 800x600px hoặc lớn hơn
- Tỷ lệ: 4:3 hoặc 16:9

**Gợi ý nội dung ảnh:**
- Cánh đồng lúa mùa gặt (golden rice fields)
- Nông dân đội nón lá làm việc
- Hợp tác xã nông nghiệp (farmers working together)
- Chợ nông sản địa phương
- Làng quê Việt Nam với cộng đồng

**Nguồn ảnh đề xuất:**
- Unsplash: Tìm "rice field vietnam", "farmer working", "rural community"
- Pexels: Tìm "agriculture", "farming", "harvest"
- Pixabay: Tìm "rice paddy", "vietnamese farmer", "countryside"
- Freepik: Tìm "agriculture illustration", "farmer vector"
- Chính thức: Trang web Bộ Nông nghiệp & PTNT (ảnh công khai)

---

### Cách Thay Thế Placeholder Case Study

Hiện tại, ảnh được hiển thị bằng **gradient + emoji placeholder**:

```css
.case-image-container {
  background: linear-gradient(to bottom right, 
    rgba(181, 63, 63, 0.2), 
    rgba(243, 201, 105, 0.1), 
    rgba(181, 63, 63, 0.2)
  );
}
```

**Sau khi có ảnh thật, cập nhật trong `CaseStudySection.jsx`:**

```jsx
<div className="case-image-container h-56 relative overflow-hidden">
  <img 
    src={caseItem.image} 
    alt={caseItem.title}
    className="w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-black/20"></div>
</div>
```

**Hoặc sử dụng background-image trong CSS:**

```css
.case-image-container {
  background-image: url('/images/case-study/state-enterprise.jpg');
  background-size: cover;
  background-position: center;
}
```

---

## 💡 Mẹo tối ưu hóa

### Tối ưu hình ảnh:
```bash
# Sử dụng ImageOptim, TinyPNG, hoặc command line:
# Chuyển sang WebP (nhẹ hơn):
cwebp input.jpg -o output.webp -q 80

# Hoặc dùng online:
# https://tinypng.com/
# https://squoosh.app/
```

### Lazy loading:
Thêm vào thẻ img:
```jsx
<img loading="lazy" ... />
```

---

**Cập nhật:** Ngày 02/11/2025
