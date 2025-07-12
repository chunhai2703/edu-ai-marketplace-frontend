
# EduMarket - Sàn Giáo Dục Thương Mại Điện Tử Tích Hợp AI

## 🎯 Giới thiệu

EduMarket là một nền tảng giáo dục trực tuyến hiện đại tích hợp AI, cho phép người dùng tìm kiếm, khám phá và yêu thích các khóa học chất lượng cao. Dự án được xây dựng với React, TypeScript và Tailwind CSS, mang đến trải nghiệm người dùng mượt mà và thông minh.

## ✨ Tính năng chính

### 🔍 Tìm kiếm và Lọc
- Tìm kiếm theo tên khóa học, giảng viên, danh mục
- Lọc theo khoảng giá (< 500K, 500K-1 triệu, > 1 triệu)
- Lọc theo danh mục (Language Learning, Programming, Design, etc.)
- Xóa bộ lọc nhanh chóng

### 🤖 Gợi ý thông minh AI
- Gợi ý khóa học dựa trên hành vi người dùng
- Loading skeleton trong quá trình tải
- Làm mới gợi ý theo yêu cầu

### ❤️ Quản lý Yêu thích
- Thêm/xóa khóa học yêu thích
- Trang danh sách yêu thích riêng biệt
- Thống kê tổng quan danh sách yêu thích
- Lưu trữ persistent với localStorage

### 📱 Modal Chi tiết Sản phẩm
- Hiển thị thông tin đầy đủ về khóa học
- Hình ảnh, mô tả, đánh giá, giảng viên
- Thông tin thời lượng, số học viên, chứng chỉ
- Tính năng thêm vào giỏ hàng và yêu thích

### 🕐 Lịch sử Xem
- Theo dõi khóa học đã xem
- Hiển thị lịch sử 5 khóa học gần nhất
- Truy cập nhanh đến khóa học đã xem

### 💬 AI Chatbot Tư vấn
- Giao diện chat thân thiện
- Gợi ý khóa học dựa trên từ khóa
- Hỗ trợ tiếng Việt
- Hiển thị khóa học liên quan trực tiếp trong chat

## 🛠️ Công nghệ sử dụng

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **State Management**: React Hooks (useState, useEffect)
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Notifications**: Sonner, React Hot Toast

## 🚀 Hướng dẫn chạy dự án

### Yêu cầu hệ thống
- Node.js 18+ 
- npm hoặc yarn

### Cài đặt và chạy

```bash
# Clone repository
git clone <repository-url>
cd edumarket

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build

# Preview production build
npm run preview
```

Ứng dụng sẽ chạy tại `http://localhost:8080`

## 🎨 Thiết kế UX/UI

### Màu sắc chủ đạo
- **Primary**: Blue (#3B82F6) - Chuyên nghiệp, đáng tin cậy
- **Accent**: Orange (#FB923C) - Năng động, thu hút
- **Success**: Green (#10B981) - Thành công, hoàn thành
- **Warning**: Yellow (#F59E0B) - Cảnh báo, chú ý

### Responsive Design
- **Mobile First**: Tối ưu cho thiết bị di động
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexible Grid**: CSS Grid và Flexbox

### Hiệu ứng
- Hover effects mượt mà
- Loading skeletons
- Fade in animations
- Smooth transitions

## 🔧 Tính năng nâng cao

### Xử lý lỗi
- Thông báo lỗi API thân thiện
- Fallback UI cho trường hợp không có dữ liệu
- Retry mechanism cho API calls

### Performance
- Lazy loading cho hình ảnh
- Debounced search
- Optimized re-renders
- Local storage caching

### Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Screen reader support

## 🚀 Deployment

Dự án có thể deploy dễ dàng trên:
- **Vercel** (Recommended)
- **Netlify** 
- **GitHub Pages**
- **Firebase Hosting**

```bash
# Build production
npm run build

# Deploy folder dist/ to hosting service
```

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

## 📞 Liên hệ

- **Developer**: [Võ Nguyễn Trung Hải]
- **Email**: oceanvo437@gmail.com
- **GitHub**: [chunhai2703]

---

**EduMarket** - Nơi tri thức gặp gỡ công nghệ! 🚀📚
