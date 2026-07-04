import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, phoneNumber, scrollDepthReached } = body;

    // Lưu vào database thực sử dụng Prisma PostgreSQL
    console.log("=== Lưu thông tin vào Database ===");
    const newPreOrder = await db.preOrder.create({
      data: {
        email,
        phoneNumber,
        scrollDepthReached: scrollDepthReached || null,
      },
    });
    console.log("Đã lưu thành công bản ghi ID:", newPreOrder.id);
    console.log("==================================");

    // Send to a real Discord Webhook if configured
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "AeroGlass X Telemetry Bot",
            avatar_url:
              "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=150&auto=format&fit=crop",
            embeds: [
              {
                title: "🎉 Đăng Ký Đặt Trước Mới!",
                color: 9109750, // Neon Purple màu lục thập phân (0x8B5CF6)
                fields: [
                  { name: "📧 Email khách hàng", value: email, inline: true },
                  {
                    name: "📞 Số điện thoại",
                    value: phoneNumber,
                    inline: true,
                  },
                  {
                    name: "📊 Điểm cuộn trang đạt được",
                    value: scrollDepthReached || "0%",
                    inline: true,
                  },
                  {
                    name: "⏰ Thời gian đăng ký",
                    value: new Date().toLocaleString("vi-VN", {
                      timeZone: "Asia/Ho_Chi_Minh",
                    }),
                    inline: false,
                  },
                ],
                footer: { text: "Dự án phát triển bởi Helicorp - AeroGlass X" },
              },
            ],
          }),
        });
        console.log("Đã gửi thông báo Webhook tới Discord thành công.");
      } catch (webhookErr) {
        console.error("Lỗi khi gửi Webhook tới Discord:", webhookErr);
      }
    }

    // Simulated API delay for smooth UX transition
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json({
      success: true,
      message: "Thông tin của bạn đã được lưu vào cơ sở dữ liệu thành công!",
      registeredAt: newPreOrder.createdAt.toISOString(),
      simulatedQueueNumber: Math.floor(Math.random() * 8000) + 2000,
    });
  } catch (error) {
    console.error("Lỗi khi lưu thông tin đăng ký:", error);
    return NextResponse.json(
      { success: false, error: "Đã xảy ra lỗi khi lưu thông tin đăng ký" },
      { status: 500 },
    );
  }
}
