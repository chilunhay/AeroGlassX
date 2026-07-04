# AeroGlass X - Next-Gen Smart Glass Landing Page

Đây là sản phẩm bài thi ứng tuyển **Vòng 2 - Thiết kế Landing Page** dành cho vị trí **TTS Phát triển Website** tại **Helicorp**. Trang web giới thiệu sản phẩm kính thông minh giả lập tương lai **AeroGlass X** được xây dựng bằng những công nghệ hiện đại nhất năm 2026, tối ưu hiệu năng vượt trội và tích hợp trọn vẹn toàn bộ các tính năng điểm cộng (bonus points).

- **Link GitHub**: [https://github.com/chilunhay/AeroGlassX](https://github.com/chilunhay/AeroGlassX)
- **Link Live Demo (Vercel)**: [https://aero-glass-x.vercel.app/](https://aero-glass-x.vercel.app/)

---

## 🚀 Tính Năng & Điểm Cộng Đã Hoàn Thành (100% Điểm Cộng)

### 1. Giao Diện & Thẩm Mỹ (UI/UX)

- **Hero Section**: Thiết kế kính 3D và HUD hologram dạng SVG động đổi màu tương tác theo theme.
- **Exploded View (Bung rã 3D kính)**: Tích hợp **GSAP ScrollTrigger** cho phép người dùng cuộn chuột để bung rã cấu trúc kính thành 3 lớp riêng biệt (Khung Titanium, Màn hình OLED kép 8K, Chip xử lý Neural X1) trên desktop. Đã tối ưu hóa khoảng giãn cách cố định đẹp mắt trên thiết bị di động (mobile/tablet).
- **Đa chế độ hiển thị (Dark/Light Mode)**: Chuyển đổi theme mượt mà bằng `next-themes`. Chế độ sáng (Light Mode) được thiết kế tỉ mỉ, chuyển đổi các màu neon nhạt sang sắc độ tương phản cao (`violet-700`, `cyan-700`, `rose-700`) giúp chữ nét và cực kỳ dễ đọc trên nền trắng.
- **Responsive hoàn thiện**: Mọi chi tiết (kích cỡ nhãn SVG, vị trí đường chỉ dẫn HUD, kích thước stats banner) đều được căn chỉnh tỉ mỉ để không bị tràn viền, lệch dòng hay mất chữ trên các điện thoại nhỏ nhất (như iPhone SE).

### 2. Tối Ưu Hiệu Năng & SEO Technical

- **Performance (PageSpeed Insights)**: Điểm số di động cam kết **>= 90/100** nhờ sử dụng 100% hình vẽ vector SVG sắc nét thay vì các tệp hình ảnh bitmap nặng nề.
- **SEO & Open Graph**: Tích hợp metadata đầy đủ bao gồm tiêu đề, mô tả, từ khóa, Open Graph (ảnh chia sẻ mạng xã hội, tiêu đề trang) và Twitter Card trực quan trong cấu trúc tệp của Next.js.

### 3. Tích Hợp Webhook & Telemetry Logs (Hành trình người dùng)

- **Form Đăng Ký Đặt Trước (Pre-order)**: Xác thực dữ liệu chặt chẽ bằng `react-hook-form` phối hợp `zod` schema (email hợp lệ, số điện thoại đúng chuẩn đầu số `0` gồm 10-11 chữ số).
- **Nhật ký hành trình tương tác (Telemetry)**: Tự động thu thập dữ liệu hành vi người dùng theo thời gian thực (độ sâu cuộn màn hình 25%, 50%, 75%, 90% trang; click cấu hình màu sắc Đen/Bạc, phiên bản bộ nhớ, bật/tắt phụ kiện tròng cận ZEISS hay đai Spatial Pro).
- **Webhook thực tế**: Khi người dùng gửi form, API route của Next.js sẽ lưu dữ liệu và lập tức bắn một thông báo chi tiết cấu hình đơn hàng kèm logs hành trình trực tiếp về **Discord Webhook** dưới dạng Markdown chuyên nghiệp.

### 4. Backend & Cơ Sở Dữ Liệu Thực Tế

- Sử dụng **Prisma ORM** liên kết với cơ sở dữ liệu **PostgreSQL** của **Supabase** để lưu trữ thông tin đăng ký của khách hàng một cách an toàn và tối ưu.

### 5. Tính Năng Thương Mại Điện Tử Mini (E-Commerce)

- **Giỏ hàng (Cart Drawer)** và **Mục yêu thích (Favorites Drawer)** trượt mở mượt mà bằng **Framer Motion**.
- Hỗ trợ lưu trữ danh sách **Mẫu kính đã xem gần đây (Recently Viewed Models)**.
- Nút tương tác rỗng thông minh: Tự động đóng ngăn kéo và cuộn trang mượt mà (`scroll-behavior: smooth`) đưa khách hàng đến khu vực mua sắm cấu hình sản phẩm.

### 6. Trợ Lý Chatbot AI Trực Tuyến

- Tích hợp khung Chatbot ở góc dưới màn hình.
- Kết nối trực tiếp với **Google Gemini API** (Gemini Pro) trực tuyến qua API Route để trả lời câu hỏi và tư vấn khách hàng thông minh.
- **Chế độ Ngoại Tuyến (Offline Fallback)**: Tự động chuyển đổi sang bộ máy phản hồi từ khóa tiếng Việt thông minh khi mất kết nối mạng hoặc không có API Key, đảm bảo trải nghiệm người dùng liền mạch.

---

## 🛠️ Công Nghệ Sử Dụng

- **Framework**: Next.js 16.2.10 (App Router, React 19)
- **Styling**: Tailwind CSS v4.0.0
- **Animation**: GSAP (GreenSock) & Framer Motion
- **Database & ORM**: Prisma 7.8.0 & Supabase PostgreSQL
- **AI API**: Google Generative AI (Gemini Pro)
- **Thông báo**: Sonner (toasts notification)
- **Validation**: Zod & React Hook Form

---

## 💻 Hướng Dẫn Cài Đặt và Chạy Cục Bộ

### 1. Tải dự án và cài đặt dependencies

```bash
git clone https://github.com/chilunhay/AeroGlassX.git
cd AeroGlassX
npm install
```

### 2. Cấu hình biến môi trường

Tạo tệp `.env.local` ở thư mục gốc (hoặc đổi tên từ `.env.example`) và nhập đầy đủ thông tin:

```env
DATABASE_URL="postgresql://postgres.[PROJECT-ID]:[PASSWORD]@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[PROJECT-ID]:[PASSWORD]@aws-1-ap-south-1.pooler.supabase.com:5432/postgres"
DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/your-webhook-id"
GEMINI_API_KEY="your-gemini-api-key"
```

### 3. Đồng bộ Database Schema (Prisma)

Chạy lệnh sau để khởi tạo bảng dữ liệu trên Supabase:

```bash
npx prisma db push
```

### 4. Chạy chế độ Development

```bash
npm run dev
```

Truy cập vào [http://localhost:3000](http://localhost:3000) trên trình duyệt để kiểm tra kết quả.

### 5. Build và chạy bản Production

```bash
npm run build
npm run start
```
