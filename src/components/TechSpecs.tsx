"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Cpu, EyeOff, Sparkles, Scale, Headphones, Radio, Gauge } from "lucide-react";

interface SpecItem {
  label: string;
  value: string;
  details: string;
  icon: React.ReactNode;
  color: "cyan" | "purple" | "pink";
}

interface SpecCategory {
  id: string;
  label: string;
  items: SpecItem[];
}

export default function TechSpecs() {
  const [activeTab, setActiveTab] = useState("optics");

  const categories: SpecCategory[] = [
    {
      id: "optics",
      label: "Hiển Thị & Thấu Kính",
      items: [
        {
          label: "Tấm Nền Hiển Thị",
          value: "Dual Micro-OLED",
          details: "Tổng cộng 40 triệu điểm ảnh, tỷ lệ tương phản cực cao và màu đen sâu tuyệt đối.",
          icon: <Eye className="w-5 h-5 text-electric-cyan" />,
          color: "cyan",
        },
        {
          label: "Độ Phân Giải",
          value: "8K mỗi mắt",
          details: "Độ phân giải thực tế 7680 x 4320, mật độ điểm ảnh đạt 3.600 PPI.",
          icon: <Sparkles className="w-5 h-5 text-neon-purple" />,
          color: "purple",
        },
        {
          label: "Tần Số Quét",
          value: "120Hz",
          details: "Tự động điều chỉnh linh hoạt từ 90Hz đến 120Hz để tối ưu hóa pin.",
          icon: <Gauge className="w-5 h-5 text-hot-pink" />,
          color: "pink",
        },
        {
          label: "Góc Nhìn (FOV)",
          value: "120° Chéo",
          details: "Góc nhìn toàn cảnh rộng lớn, khớp với tầm nhìn tự nhiên của mắt người.",
          icon: <EyeOff className="w-5 h-5 text-electric-cyan" />,
          color: "cyan",
        },
      ],
    },
    {
      id: "compute",
      label: "Bộ Vi Xử Lý & Bộ Nhớ",
      items: [
        {
          label: "Chip Xử Lý",
          value: "Aero-Silicon S2",
          details: "Bộ vi xử lý lõi kép xây dựng trên tiến trình 3nm với chip thần kinh chuyên dụng.",
          icon: <Cpu className="w-5 h-5 text-neon-purple" />,
          color: "purple",
        },
        {
          label: "Bộ Nhớ Unified",
          value: "16GB hoặc 24GB LPDDR5X",
          details: "RAM băng thông cao 8.5 Gbps xử lý mượt các ứng dụng không gian nặng.",
          icon: <Gauge className="w-5 h-5 text-hot-pink" />,
          color: "pink",
        },
        {
          label: "Dung Lượng Lưu Trữ",
          value: "512GB / 1TB / 2TB",
          details: "Tốc độ đọc/ghi NVMe siêu nhanh để ghi lại nội dung không gian 3D.",
          icon: <Radio className="w-5 h-5 text-electric-cyan" />,
          color: "cyan",
        },
        {
          label: "Hệ Thống Tản Nhiệt",
          value: "Tản Nhiệt Lỏng Vòng Kín",
          details: "Hệ thống làm mát tích cực không gây tiếng ồn của quạt gió.",
          icon: <Sparkles className="w-5 h-5 text-neon-purple" />,
          color: "purple",
        },
      ],
    },
    {
      id: "sensory",
      label: "Cảm Biến & Theo Dõi",
      items: [
        {
          label: "Hệ Thống Camera",
          value: "12x Camera Quang Học",
          details: "Các mắt camera bên ngoài tốc độ cao theo dõi cử chỉ ngón tay và cơ thể.",
          icon: <Eye className="w-5 h-5 text-hot-pink" />,
          color: "pink",
        },
        {
          label: "Bản Đồ Lidar",
          value: "Cảm Biến LiDAR Kép",
          details: "Tạo lưới không gian 3D thời gian thực liên tục trong phạm vi 10 mét.",
          icon: <Radio className="w-5 h-5 text-electric-cyan" />,
          color: "cyan",
        },
        {
          label: "Cảm biến sóng não",
          value: "4x Điện Cực Sinh Học",
          details: "Cảm nhận sóng điện não vùng trán để nhận biết ý định trước khi hành động.",
          icon: <Sparkles className="w-5 h-5 text-neon-purple" />,
          color: "purple",
        },
        {
          label: "Âm Thanh Không Gian",
          value: "Âm thanh vòm định hướng",
          details: "Loa định hướng tích hợp bộ lọc âm thanh theo chuyển động đầu.",
          icon: <Headphones className="w-5 h-5 text-electric-cyan" />,
          color: "cyan",
        },
      ],
    },
    {
      id: "build",
      label: "Thiết Kế & Tiện Nghi",
      items: [
        {
          label: "Khung Vỏ Thiết Bị",
          value: "Hợp kim Magie & Sợi Carbon",
          details: "Hỗn hợp composite siêu bền dùng trong ngành hàng không vũ trụ.",
          icon: <Cpu className="w-5 h-5 text-electric-cyan" />,
          color: "cyan",
        },
        {
          label: "Tổng Trọng Lượng",
          value: "75 grams",
          details: "Siêu nhẹ như một chiếc kính thông thường, đeo thoải mái cả ngày dài không lo mỏi cổ.",
          icon: <Scale className="w-5 h-5 text-neon-purple" />,
          color: "purple",
        },
        {
          label: "Đai Đeo Đầu",
          value: "Đai đeo lưới co giãn (Dial Loop)",
          details: "Dây đeo co giãn thoát mồ hôi tốt, ôm khít theo chu vi đầu bằng núm xoay.",
          icon: <Sparkles className="w-5 h-5 text-hot-pink" />,
          color: "pink",
        },
        {
          label: "Khoảng Cách Đồng Tử (IPD)",
          value: "Tự động điều chỉnh 58-72mm",
          details: "Tự động đo và căn chỉnh khoảng cách giữa hai thấu kính khớp với mắt.",
          icon: <Gauge className="w-5 h-5 text-electric-cyan" />,
          color: "cyan",
        },
      ],
    },
  ];

  return (
    <section id="specs" className="py-20 bg-background relative overflow-hidden">
      {/* Background glow styling */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-purple/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Title and Intro */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-electric-cyan tracking-widest uppercase mb-2 block">
            CẤU TRÚC PHẦN CỨNG ĐỘT PHÁ
          </span>
          <h2 className="font-space text-3xl md:text-5xl font-extrabold text-foreground mb-4">
            Thông Số Kỹ Thuật
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Khám phá kiến trúc bên trong AeroGlass X. Mỗi milimét được thiết kế tỉ mỉ để tích hợp những công nghệ phần cứng không gian vượt trội.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10 w-full px-4">
          <div className="grid grid-cols-2 md:flex gap-2 md:gap-0 bg-transparent md:bg-muted/20 border-0 md:border md:border-border/40 dark:md:border-border/10 p-0 md:p-1 rounded-2xl w-full max-w-xl md:max-w-max">
            {categories.map((cat) => {
              const isSelected = cat.id === activeTab;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`relative px-3 py-2.5 md:px-5 md:py-2.5 rounded-xl font-space font-bold text-xs md:text-sm transition-all cursor-pointer whitespace-normal md:whitespace-nowrap flex items-center justify-center text-center w-full md:w-auto min-h-[44px] md:min-h-0 border md:border-0 ${
                    isSelected 
                      ? "text-white border-transparent bg-gradient-to-r from-neon-purple to-electric-cyan shadow-md shadow-neon-purple/20" 
                      : "text-muted-foreground hover:text-foreground border-border/40 dark:border-border/10 bg-card/45 dark:bg-card/20 md:bg-transparent md:dark:bg-transparent backdrop-blur-sm md:backdrop-blur-none"
                  }`}
                >
                  {/* On desktop, use the absolute slide animation background */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeSpecTab"
                      className="absolute inset-0 bg-gradient-to-r from-neon-purple to-electric-cyan rounded-xl z-0 shadow-md shadow-neon-purple/20 hidden md:block"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 leading-tight">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Specs Grid Content */}
        <div className="min-h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {categories
                .find((cat) => cat.id === activeTab)
                ?.items.map((item, idx) => {
                  const colorStyles = {
                    cyan: {
                      iconBg: "bg-cyan-500/15 dark:bg-cyan-500/20 border-cyan-500/30 text-electric-cyan",
                      hoverBorder: "hover:border-cyan-500/40 dark:hover:border-cyan-500/50",
                      hoverShadow: "hover:shadow-[0_0_30px_rgba(6,182,212,0.12)]",
                      cornerGlow: "from-cyan-500/15",
                    },
                    purple: {
                      iconBg: "bg-purple-500/15 dark:bg-purple-500/20 border-purple-500/30 text-neon-purple",
                      hoverBorder: "hover:border-purple-500/40 dark:hover:border-purple-500/50",
                      hoverShadow: "hover:shadow-[0_0_30px_rgba(139,92,246,0.12)]",
                      cornerGlow: "from-purple-500/15",
                    },
                    pink: {
                      iconBg: "bg-pink-500/15 dark:bg-pink-500/20 border-pink-500/30 text-hot-pink",
                      hoverBorder: "hover:border-pink-500/40 dark:hover:border-pink-500/50",
                      hoverShadow: "hover:shadow-[0_0_30px_rgba(244,63,94,0.12)]",
                      cornerGlow: "from-pink-500/15",
                    },
                  }[item.color];

                  return (
                    <div
                      key={idx}
                      className={`p-6 rounded-2xl border border-slate-200/50 dark:border-white/[0.08] bg-slate-50/50 dark:bg-white/[0.02] backdrop-blur-md transition-all duration-300 group relative ${colorStyles.hoverBorder} ${colorStyles.hoverShadow}`}
                    >
                      {/* Glowing Ambient Background (Radial Glow on Hover) */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                        style={{
                          background: `radial-gradient(circle at center, ${item.color === 'cyan' ? 'rgba(6,182,212,0.06)' : item.color === 'purple' ? 'rgba(139,92,246,0.06)' : 'rgba(244,63,94,0.06)'} 0%, transparent 70%)`
                        }}
                      />

                      {/* Glowing Accent Corner */}
                      <div className={`absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl ${colorStyles.cornerGlow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-tr-2xl pointer-events-none`} />

                      {/* Icon container */}
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${colorStyles.iconBg}`}>
                        {item.icon}
                      </div>

                      {/* Label & Value */}
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1.5">
                        {item.label}
                      </p>
                      <h3 className="font-space font-bold text-lg md:text-xl text-foreground mb-2 leading-tight">
                        {item.value}
                      </h3>
                      <p className="text-xs text-muted-foreground/80 leading-relaxed">
                        {item.details}
                      </p>
                    </div>
                  );
                })}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
