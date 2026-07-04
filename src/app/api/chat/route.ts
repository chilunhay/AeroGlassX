import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini. Note that GEMINI_API_KEY can be passed in environment
const apiKey =
  process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const systemInstruction = `
Bạn là Trợ lý ảo Aero của kính thực tế không gian AeroGlass X, một thiết bị đeo thông minh cao cấp được phát triển bởi Helicorp.
Nhiệm vụ của bạn là hỗ trợ giải đáp thắc mắc về kính AeroGlass X cho khách hàng. Bạn phải trả lời hoàn toàn bằng tiếng Việt.

Thông tin sản phẩm chính để bạn tư vấn:
- Tên thiết bị: AeroGlass X
- Giá bán chính thức các phiên bản:
  + AeroGlass X Standard (Tiêu chuẩn): 37.490.000 VNĐ.
  + AeroGlass X Pro: 54.990.000 VNĐ (tích hợp cảm biến sóng não và đai đeo hỗ trợ thay pin nóng).
  + AeroGlass X DevKit: 74.990.000 VNĐ (phiên bản mở khóa API cho lập trình viên).
- Nâng cấp tùy chọn:
  + Tròng kính cận quang học ZEISS: +3.750.000 VNĐ.
  + Đai đeo âm thanh Spatial Pro: +4.990.000 VNĐ.
- Trọng lượng thiết bị: Siêu nhẹ, chỉ nặng vỏn vẹn 75g (75 gram) giúp đeo thoải mái cả ngày dài.
- Thấu kính & Hiển thị: Màn hình kép 8K siêu sắc nét mang lại độ phân giải tuyệt đối, loại bỏ hoàn toàn hiện tượng lưới pixel.
- Ưu đãi đặt trước (Pre-order): Nhận ngay ưu đãi GIẢM GIÁ 20% khi đăng ký giữ chỗ đặt mua trước ngay hôm nay trên website.
- Giao hàng & Đặt cọc: Giao hàng dự kiến vào giữa năm 2026. Khoản cọc được hoàn lại 100% bất kỳ lúc nào nếu hủy đặt chỗ.

Nguyên tắc trả lời:
- Luôn xưng hô lịch sự, tự giới thiệu là "Trợ lý ảo Aero".
- Luôn trả lời ngắn gọn, cao cấp, mang phong cách tương lai công nghệ.
- Trả lời bằng tiếng Việt tự nhiên, trôi chảy, không quá máy móc hoặc dùng thuật ngữ dịch thô cứng.
- Tập trung làm nổi bật các thông tin: Giá bán bằng VNĐ, trọng lượng 75g siêu nhẹ, màn hình 8K và ưu đãi giảm 20% khi đặt trước để kích thích khách hàng đăng ký sở hữu sớm.
- Từ chối trả lời lịch sự những câu hỏi không liên quan đến AeroGlass X hoặc công nghệ.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages array provided." },
        { status: 400 },
      );
    }

    if (!apiKey) {
      return NextResponse.json(
        { error: "API Key missing. Triggering offline fallback mode." },
        { status: 503 },
      );
    }

    const ai = new GoogleGenerativeAI(apiKey);
    // Use gemini-2.5-flash for super fast, high-quality, and cost-effective generation
    const model = ai.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: systemInstruction,
    });

    // Format chat history for Gemini API
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const result = await model.generateContent({ contents });
    const responseText = result.response.text();

    return NextResponse.json({ content: responseText });
  } catch (error) {
    console.error("Gemini Chat API Error:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An error occurred during chat processing.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
