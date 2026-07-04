"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Send, Activity, Phone, Mail } from "lucide-react";

// Form Validation Schema using Zod
const schema = z.object({
  email: z.string().email({ message: "Vui lòng nhập địa chỉ email hợp lệ." }),
  phoneNumber: z
    .string()
    .min(10, { message: "Số điện thoại phải chứa ít nhất 10 chữ số." })
    .max(11, { message: "Số điện thoại không được vượt quá 11 chữ số." })
    .regex(/^0\d+$/, { message: "Số điện thoại phải bắt đầu bằng số 0 và chỉ bao gồm chữ số." }),
});

type FormData = z.infer<typeof schema>;

export default function PreOrderForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([]);
  const [scrollDepth, setScrollDepth] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      phoneNumber: "",
    },
  });

  const addTelemetryLog = (action: string) => {
    const time = new Date().toLocaleTimeString();
    const log = `[${time}] ${action}`;
    setTelemetryLogs((prev) => [log, ...prev].slice(0, 5)); // Keep last 5 logs
  };

  // Track behavior: Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      const roundedProgress = Math.round(progress);
      setScrollDepth(roundedProgress);

      // Trigger telemetry updates at major scroll points
      if (roundedProgress === 25 || roundedProgress === 50 || roundedProgress === 75 || roundedProgress === 90) {
        addTelemetryLog(`Đã đọc ${roundedProgress}% thông tin chi tiết sản phẩm`);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen for custom telemetry events from other components (e.g. E-Commerce Section)
  useEffect(() => {
    const handleTelemetry = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      if (customEvent.detail) {
        addTelemetryLog(customEvent.detail);
      }
    };

    window.addEventListener("telemetry", handleTelemetry);
    return () => window.removeEventListener("telemetry", handleTelemetry);
  }, []);

  // Submit handler calls local API route
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    addTelemetryLog("Gửi yêu cầu đăng ký sở hữu sớm");

    const promise = async () => {
      const response = await fetch("/api/pre-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, scrollDepthReached: `${scrollDepth}%` }),
      });

      if (!response.ok) {
        throw new Error("Lỗi kết nối máy chủ");
      }
      
      const resData = await response.json();
      addTelemetryLog(`Đăng ký gửi thành công`);
      return resData;
    };

    toast.promise(promise(), {
      loading: "Đang lưu vị trí đăng ký của bạn...",
      success: () => {
        setIsSubmitting(false);
        reset();
        return `Đăng ký thành công! Bạn đã được thêm vào danh sách ưu tiên nhận AeroGlass X sớm nhất.`;
      },
      error: () => {
        setIsSubmitting(false);
        return "Gửi đăng ký thất bại. Vui lòng kiểm tra lại kết nối mạng.";
      },
    });
  };

  // Track clicks for telemetry
  const handleInputFocus = (fieldName: string) => {
    addTelemetryLog(`Bắt đầu điền thông tin ${fieldName}`);
  };

  return (
    <section id="pre-order" className="py-20 bg-background relative border-t border-border/20 overflow-hidden">
      
      {/* Background decorations */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-hot-pink/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Side: Telemetry Tracking Dashboard */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-neon-purple tracking-widest uppercase mb-2 block">
              ĐĂNG KÝ SỞ HỮU SỚM
            </span>
            <h2 className="font-space text-3xl md:text-5xl font-extrabold text-foreground mb-4">
              Tham Gia Tiên Phong
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mb-6">
              Đặt mua sớm AeroGlass X ngay hôm nay. Khách hàng tiên phong sẽ nhận bao da tùy chỉnh cao cấp, ưu tiên cập nhật phần mềm và xếp lịch giao hàng sớm nhất.
            </p>
          </div>

          {/* Telemetry log screen */}
          <div className="p-5 rounded-2xl border border-border/40 glassmorphism shadow-inner">
            <div className="flex items-center justify-between mb-4 border-b border-border/20 pb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-electric-cyan animate-pulse" />
                <h3 className="font-space text-xs font-bold text-foreground uppercase tracking-widest">
                  Hành Trình Tương Tác Của Bạn
                </h3>
              </div>
              <span className="text-[10px] text-muted-foreground bg-muted/30 px-2 py-0.5 rounded-full font-bold">
                Khám phá trang: {scrollDepth}%
              </span>
            </div>

            <div className="flex flex-col gap-2 min-h-[120px] justify-start text-[10px] font-mono text-muted-foreground leading-relaxed">
              {telemetryLogs.length === 0 ? (
                <p className="italic text-muted/40">Đang chờ tương tác từ bạn (điền thông tin, chọn cấu hình, cuộn trang)...</p>
              ) : (
                telemetryLogs.map((log, i) => (
                  <div key={i} className="flex gap-2 items-start border-l border-electric-cyan/30 pl-2">
                    <span className="text-electric-cyan font-bold flex-shrink-0">&gt;</span>
                    <span className="break-all">{log}</span>
                  </div>
                ))
              )}
            </div>
            
            <p className="text-[9px] text-muted-foreground/60 mt-4 border-t border-border/10 pt-2 italic">
              * Nhật kỳ hành trình ghi nhận tương tác giúp bạn trực quan các tùy chọn cấu hình đã chọn.
            </p>
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 md:p-8 rounded-3xl border border-border/40 bg-card/25 hover:border-border/60 transition-colors shadow-xl flex flex-col gap-5 relative overflow-hidden"
          >
            <div className="flex flex-col gap-1">
              <h3 className="font-space text-lg font-bold text-foreground">
                Thông Tin Liên Hệ Đặt Hàng
              </h3>
              <p className="text-xs text-muted-foreground">
                Chúng tôi sẽ liên hệ với bạn trong vòng 24h qua email hoặc điện thoại để hoàn tất thủ tục giữ chỗ sản xuất.
              </p>
            </div>

            {/* Form Fields */}
            <div className="flex flex-col gap-4 mt-2">
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-neon-purple" />
                  Địa Chỉ Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Ví dụ: name@domain.com"
                  onFocus={() => handleInputFocus("Email")}
                  {...register("email")}
                  className={`px-4 py-3 rounded-xl border bg-background/50 text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-neon-purple transition-all ${
                    errors.email ? "border-red-500/60" : "border-border/50"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-[10px] font-medium mt-0.5">{errors.email.message}</p>
                )}
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="phoneNumber" className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-electric-cyan" />
                  Số Điện Thoại
                </label>
                <input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Ví dụ: 0912345678"
                  onFocus={() => handleInputFocus("Số Điện Thoại")}
                  {...register("phoneNumber")}
                  className={`px-4 py-3 rounded-xl border bg-background/50 text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-neon-purple transition-all ${
                    errors.phoneNumber ? "border-red-500/60" : "border-border/50"
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-[10px] font-medium mt-0.5">{errors.phoneNumber.message}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 py-3.5 rounded-xl bg-gradient-to-r from-neon-purple to-electric-cyan text-white font-bold text-sm cursor-pointer shadow-lg shadow-neon-purple/20 hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? "Đang gửi đăng ký an toàn..." : "Xác Nhận Giữ Chỗ Đặt Hàng"}
              <Send className="w-4 h-4" />
            </button>
            
          </form>
        </div>

      </div>
    </section>
  );
}
