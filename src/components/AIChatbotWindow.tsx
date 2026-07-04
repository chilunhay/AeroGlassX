"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Send, Bot } from "lucide-react";
import { motion } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
  isFallback?: boolean;
}

interface AIChatbotWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIChatbotWindow({ isOpen, onClose }: AIChatbotWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Xin chào! Tôi là Aero, trợ lý ảo của kính thực tế không gian AeroGlass X. Tôi có thể tư vấn giá bán (từ 37.490.000 đ), trọng lượng siêu nhẹ (75g), màn hình 8K và ưu đãi giảm giá 20% khi đặt trước cho bạn!",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFallbackMode, setIsFallbackMode] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const quickReplies = [
    {
      label: "Thông Số & Thấu Kính",
      text: "Thông số thấu kính và màn hình hiển thị của AeroGlass X là gì?",
    },
    {
      label: "Giá Bán Các Phiên Bản",
      text: "Các mẫu kính Tiêu chuẩn, Pro và DevKit giá bao nhiêu?",
    },
    {
      label: "Tùy Chọn Tròng Kính",
      text: "Kính có hỗ trợ tròng cận ZEISS hay không?",
    },
  ];

  // Local rule-based fallback answering engine in Vietnamese
  const getOfflineResponse = (query: string): string => {
    const text = query.toLowerCase();

    if (
      text.includes("thong so") ||
      text.includes("specs") ||
      text.includes("optic") ||
      text.includes("display") ||
      text.includes("8k") ||
      text.includes("man hinh") ||
      text.includes("hien thi") ||
      text.includes("phan gia") ||
      text.includes("quat")
    ) {
      return "AeroGlass X trang bị màn hình kép Micro-OLED với độ phân giải siêu nét lên tới 8K mỗi mắt, tần số quét 120Hz mượt mà, độ sáng tối đa 1000 nits và góc nhìn rộng 120° giúp bạn trải nghiệm không gian chân thực nhất.";
    }

    if (
      text.includes("gia") ||
      text.includes("bao nhieu") ||
      text.includes("cost") ||
      text.includes("tien") ||
      text.includes("standard") ||
      text.includes("pro") ||
      text.includes("devkit") ||
      text.includes("mua")
    ) {
      return "Chúng tôi cung cấp 3 phiên bản: Phiên bản Standard (37.490.000 đ) cho công việc & giải trí; Phiên bản Pro (54.990.000 đ) tích hợp cảm biến sóng não và pin thay nóng; Phiên bản DevKit (74.990.000 đ) mở khóa hoàn toàn hệ điều hành dành cho lập trình viên. Bạn có thể xem cấu hình chi tiết tại mục Cửa Hàng.";
    }

    if (
      text.includes("can") ||
      text.includes("vien") ||
      text.includes("zeiss") ||
      text.includes("nam cham") ||
      text.includes("mat") ||
      text.includes("trong")
    ) {
      return "Có! Kính hỗ trợ lắp tròng kính cận/viễn ZEISS được gia công riêng, hít bằng nam châm trực tiếp bên trong kính với giá nâng cấp là 3.750.000 đ. Bạn có thể tích chọn mục này khi đặt cấu hình và chúng tôi sẽ thu thập độ cận sau.";
    }

    if (
      text.includes("pin") ||
      text.includes("battery") ||
      text.includes("tieng") ||
      text.includes("gio") ||
      text.includes("dung luong") ||
      text.includes("sac")
    ) {
      return "Kính được trang bị hệ thống pin kép dạng mô-đun gắn ở đai đeo đầu phía sau để cân bằng trọng lượng lực đeo, cho thời gian sử dụng liên tục trên 8 giờ và hỗ trợ tính năng thay thế nóng (hot-swap) không cần tắt nguồn kính.";
    }

    if (
      text.includes("ship") ||
      text.includes("giao") ||
      text.includes("nhan") ||
      text.includes("rollout") ||
      text.includes("huy") ||
      text.includes("coc") ||
      text.includes("hoan")
    ) {
      return "Kính AeroGlass X dự kiến bắt đầu bàn giao tới tay khách hàng vào giữa năm 2026. Số thứ tự giao hàng dựa trên thời gian bạn đăng ký đặt trước. Khoản đặt cọc này có thể hoàn lại 100% bất kỳ lúc nào nếu bạn muốn hủy đơn.";
    }

    if (
      text.includes("helicorp") ||
      text.includes("cong ty") ||
      text.includes("tap doan") ||
      text.includes("ai lam")
    ) {
      return "AeroGlass X được thiết kế, nghiên cứu và sản xuất bởi Helicorp (Healthy Living Corporation) - một thương hiệu hàng đầu về công nghệ sinh học và thiết bị thông minh.";
    }

    return "Tôi là trợ lý ảo hỗ trợ thông tin AeroGlass X. Tôi khuyên bạn nên xem qua mục Thông Số Kỹ Thuật hoặc cấu hình tại mục Cửa Hàng. Hãy hỏi tôi về thấu kính hiển thị, giá bán các phiên bản, khả năng hỗ trợ cận thị, hoặc pin của sản phẩm nhé!";
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages.filter((m) => !m.isFallback), userMessage].map(
            (m) => ({
              role: m.role,
              content: m.content,
            })
          ),
        }),
      });

      if (!response.ok) {
        throw new Error("Chat api request unsuccessful");
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.content },
      ]);
      setIsFallbackMode(false);
    } catch (err) {
      console.warn("API chatbot error, fallback activated:", err);
      const fallbackReply = getOfflineResponse(text);
      setIsFallbackMode(true);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: fallbackReply, isFallback: true },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="absolute bottom-16 right-0 w-[calc(100vw-3rem)] sm:w-[340px] md:w-[380px] h-[500px] rounded-3xl border border-border/40 bg-card flex flex-col shadow-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-border/20 bg-background/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-neon-purple/10 border border-neon-purple/30 flex items-center justify-center text-neon-purple">
            <Bot className="w-4 h-4 animate-float" />
          </div>
          <div>
            <h4 className="font-space font-bold text-xs text-foreground tracking-wide uppercase">
              Trợ Lý Ảo Aero
            </h4>
            <div className="flex items-center gap-1">
              <span
                className={`w-1.5 h-1.5 rounded-full ${isFallbackMode ? "bg-amber-500 animate-pulse" : "bg-emerald-500"}`}
              />
              <span className="text-[9px] font-semibold text-muted-foreground uppercase">
                {isFallbackMode ? "Hỗ Trợ Ngoại Tuyến" : "Chuyên Gia AI Trực Tuyến"}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground cursor-pointer"
          aria-label="Đóng cửa sổ chat"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                msg.role === "user"
                  ? "bg-neon-purple text-white rounded-tr-none"
                  : "bg-muted/30 border border-border/40 text-foreground rounded-tl-none"
              }`}
            >
              {msg.content}
              {msg.isFallback && (
                <span className="block text-[8px] text-amber-600 dark:text-amber-400 mt-1 font-bold tracking-widest uppercase">
                  🔍 Aero (Ngoại Tuyến)
                </span>
              )}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted/30 border border-border/40 text-foreground px-4 py-3 rounded-2xl rounded-tl-none flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full bg-neon-purple animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-neon-purple animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-neon-purple animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
              <span className="text-[8px] font-bold text-foreground/75 uppercase tracking-widest">
                Aero đang gõ...
              </span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Quick replies */}
      <div className="px-4 py-2 border-t border-border/10 bg-background/20 flex gap-2 overflow-x-auto no-scrollbar scroll-smooth">
        {quickReplies.map((reply, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(reply.text)}
            className="px-3 py-1.5 rounded-full border border-border/40 hover:border-neon-purple/55 bg-background text-[9px] font-semibold text-muted-foreground hover:text-foreground whitespace-nowrap cursor-pointer transition-colors"
          >
            {reply.label}
          </button>
        ))}
      </div>

      {/* Input field */}
      <div className="p-3 border-t border-border/20 bg-background/50 flex items-center gap-2">
        <input
          type="text"
          placeholder="Hỏi về màn hình, giá cả, thấu kính cận..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
          className="flex-1 px-4 py-2.5 rounded-xl border border-border/40 bg-background text-xs focus:outline-none focus:ring-1 focus:ring-neon-purple text-foreground"
          aria-label="Nhập tin nhắn câu hỏi"
        />
        <button
          onClick={() => handleSendMessage(inputValue)}
          className="p-2.5 rounded-xl bg-neon-purple hover:bg-neon-purple/90 text-white cursor-pointer transition-colors"
          aria-label="Gửi tin nhắn"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
