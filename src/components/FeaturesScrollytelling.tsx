"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eye, Hand, Cpu, Activity, Shield } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FeatureSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  specs: string[];
  glowColor: string;
  svgGraphic: React.ReactNode;
}

export default function FeaturesScrollytelling() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, scrollY: 0 });
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag on desktop and using left mouse click
    if (isMobile || e.button !== 0) return;
    
    // Don't drag if clicking buttons, links, or form elements
    if ((e.target as HTMLElement).closest("button, a, input, select, textarea")) return;
    
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX,
      scrollY: window.scrollY
    };
    
    // Prevent default browser behavior (e.g. text selection)
    e.preventDefault();
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - dragStart.current.x;
      // Dragging left (negative dx) moves viewport down/forward (increase scrollY)
      // Dragging right (positive dx) moves viewport up/backward (decrease scrollY)
      let targetScrollY = dragStart.current.scrollY - dx * 1.5;
      
      // Constrain scroll Y between start and end of this section
      if (scrollTriggerRef.current) {
        const start = scrollTriggerRef.current.start;
        const end = scrollTriggerRef.current.end;
        if (targetScrollY < start) targetScrollY = start;
        if (targetScrollY > end) targetScrollY = end;
      }
      
      window.scrollTo({
        top: targetScrollY,
        behavior: "auto"
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isMobile]);

  const slides: FeatureSlide[] = [
    {
      id: 0,
      title: "Công Nghệ Hiển Thị Siêu Sắc Nét",
      subtitle: "TRẢI NGHIỆM THỊ GIÁC HOÀN HẢO",
      description: "Màn hình kép 8K Micro-OLED chứa 40 triệu điểm ảnh trên kích thước cực kỳ nhỏ gọn, tạo nên độ sắc nét tuyệt đối, màu sắc sống động và màu đen sâu thẳm, tái hiện thế giới số chân thực như cuộc sống thực ngay trước mắt bạn.",
      icon: <Eye className="w-6 h-6 text-electric-cyan" />,
      specs: ["Màn hình kép 8K", "Tần số quét 120Hz", "Độ sáng tối đa 1000 nits", "Dải màu rộng 99% DCI-P3"],
      glowColor: "rgba(6, 182, 212, 0.4)",
      svgGraphic: (
        <svg viewBox="0 0 300 200" fill="none" className="w-full max-w-[240px] sm:max-w-[280px] md:max-w-[340px] h-auto">
          <circle cx="150" cy="100" r="80" stroke="url(#opticGrad)" strokeWidth="1.5" strokeDasharray="5,5" className="animate-spin [animation-duration:15s]" />
          <circle cx="150" cy="100" r="60" stroke="var(--electric-cyan)" strokeWidth="2.5" />
          <circle cx="150" cy="100" r="45" stroke="var(--neon-purple)" strokeWidth="1" />
          <path d="M 90,100 L 210,100" stroke="var(--electric-cyan)" strokeWidth="2" opacity="0.4" />
          <path d="M 150,40 L 150,160" stroke="var(--electric-cyan)" strokeWidth="2" opacity="0.4" />
          <circle cx="150" cy="100" r="25" fill="url(#cyanGlowRad)" />
          <circle cx="150" cy="100" r="10" fill="var(--electric-cyan)" className="animate-pulse" />
          <defs>
            <linearGradient id="opticGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--electric-cyan)" />
              <stop offset="50%" stopColor="var(--neon-purple)" />
              <stop offset="100%" stopColor="var(--electric-cyan)" />
            </linearGradient>
            <radialGradient id="cyanGlowRad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--electric-cyan)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="var(--electric-cyan)" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      )
    },
    {
      id: 1,
      title: "Tương Tác Không Gian Tự Nhiên",
      subtitle: "ĐIỀU KHIỂN KHÔNG CẦN THIẾT BỊ CẦM TAY",
      description: "Vận hành giao diện mượt mà không cần tay cầm vật lý. AeroGlass X kết hợp camera theo dõi chuyển động mắt siêu chính xác và các cảm biến nhận diện cử chỉ tay thông minh để phản hồi tức thì theo ý muốn của bạn.",
      icon: <Hand className="w-6 h-6 text-neon-purple" />,
      specs: ["Theo dõi ánh mắt chính xác", "24 camera cảm biến cử chỉ", "Nhận diện phản hồi sinh học", "Tốc độ phản hồi dưới 10ms"],
      glowColor: "rgba(139, 92, 246, 0.4)",
      svgGraphic: (
        <svg viewBox="0 0 300 200" fill="none" className="w-full max-w-[240px] sm:max-w-[280px] md:max-w-[340px] h-auto">
          <rect x="50" y="50" width="200" height="100" rx="12" stroke="var(--neon-purple)" strokeWidth="2" />
          <path d="M 30,100 C 40,85 45,85 55,100 C 65,115 70,115 80,100" stroke="var(--neon-purple)" strokeWidth="1.5" className="animate-pulse" />
          <path d="M 220,100 C 230,85 235,85 245,100 C 255,115 260,115 270,100" stroke="var(--electric-cyan)" strokeWidth="1.5" className="animate-pulse" />
          <line x1="150" y1="50" x2="100" y2="100" stroke="var(--neon-purple)" strokeWidth="1" opacity="0.5" />
          <line x1="150" y1="50" x2="200" y2="100" stroke="var(--neon-purple)" strokeWidth="1" opacity="0.5" />
          <line x1="150" y1="150" x2="100" y2="100" stroke="var(--neon-purple)" strokeWidth="1" opacity="0.5" />
          <line x1="150" y1="150" x2="200" y2="100" stroke="var(--neon-purple)" strokeWidth="1" opacity="0.5" />
          <circle cx="150" cy="50" r="6" fill="var(--neon-purple)" />
          <circle cx="100" cy="100" r="6" fill="var(--electric-cyan)" />
          <circle cx="200" cy="100" r="6" fill="var(--hot-pink)" />
          <circle cx="150" cy="150" r="6" fill="var(--neon-purple)" />
          <circle cx="150" cy="100" r="16" fill="var(--neon-purple)" fillOpacity="0.15" stroke="var(--neon-purple)" strokeWidth="1" />
          <circle cx="150" cy="100" r="4" fill="#ffffff" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Hiệu Năng Vượt Trội & Pin Siêu Khủng",
      subtitle: "HỆ THỐNG PIN KÉP LÊN ĐẾN 8 GIỜ",
      description: "Sở hữu vi xử lý không gian 3nm thế hệ mới, cho khả năng xử lý đồ họa thời gian thực mượt mà nhưng vẫn mát mẻ và tiết kiệm điện. Thiết kế đai đeo phân bổ trọng lượng thông minh kết hợp pin hỗ trợ thay nóng (hot-swap) giúp trải nghiệm luôn liền mạch.",
      icon: <Cpu className="w-6 h-6 text-hot-pink" />,
      specs: ["Vi xử lý không gian 3nm", "Tản nhiệt chất lỏng êm ái", "Pin kép hỗ trợ thay nóng", "Thời lượng sử dụng trên 8 giờ"],
      glowColor: "rgba(244, 63, 94, 0.4)",
      svgGraphic: (
        <svg viewBox="0 0 300 200" fill="none" className="w-full max-w-[240px] sm:max-w-[280px] md:max-w-[340px] h-auto">
          <path d="M 70,60 H 230 V 140 H 70 Z" stroke="var(--hot-pink)" strokeWidth="2.5" />
          <rect x="135" y="85" width="30" height="30" rx="3" fill="#080710" stroke="url(#batteryGrad)" strokeWidth="2" className="animate-pulse" />
          <path d="M 90,85 Q 110,75 130,85" stroke="var(--hot-pink)" strokeWidth="1.5" strokeDasharray="2,2" />
          <path d="M 210,85 Q 190,75 170,85" stroke="var(--electric-cyan)" strokeWidth="1.5" strokeDasharray="2,2" />
          <circle cx="95" cy="120" r="12" stroke="var(--hot-pink)" strokeWidth="1.5" strokeDasharray="3,1" opacity="0.3" />
          <circle cx="205" cy="120" r="12" stroke="var(--electric-cyan)" strokeWidth="1.5" strokeDasharray="3,1" opacity="0.3" />
          <defs>
            <linearGradient id="batteryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--electric-cyan)" />
              <stop offset="100%" stopColor="var(--neon-purple)" />
            </linearGradient>
          </defs>
        </svg>
      )
    }
  ];

  useEffect(() => {
    if (!triggerRef.current || !containerRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const scrollTween = gsap.to(containerRef.current, {
        xPercent: -100 * (slides.length - 1) / slides.length,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 0.5, // Dùng scrub 0.5 để bám sát chuyển động cuộn hơn, giảm độ lệch pha giữa thanh cuộn và layout
          start: "top top",
          end: () => `+=${triggerRef.current!.offsetWidth * (slides.length - 1)}`,
          invalidateOnRefresh: true,
          anticipatePin: 0, // Bỏ anticipatePin để tránh giật hình trên desktop
          refreshPriority: 2,
          onUpdate: (self) => {
            const progress = self.progress;
            // Dùng Math.round để chuyển đổi slide chính xác tại trung điểm của mỗi vùng cuộn (25% và 75%)
            const index = Math.round(progress * (slides.length - 1));
            setActiveSlide(index);
          },
          onRefresh: (self) => {
            scrollTriggerRef.current = self;
          },
        },
      });

      return () => {
        scrollTween.scrollTrigger?.kill();
        scrollTween.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, [slides.length]);

  return (
    <div 
      id="features" 
      ref={triggerRef} 
      onMouseDown={handleMouseDown}
      className={`relative lg:h-screen bg-background overflow-hidden border-t border-border/20 py-16 lg:py-0 flex flex-col justify-center ${
        !isMobile ? (isDragging ? "cursor-grabbing select-none" : "cursor-grab") : ""
      }`}
    >
      {/* Background decoration elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-neon-purple/5 pointer-events-none rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-electric-cyan/5 pointer-events-none rounded-full blur-[120px]" />

      {/* Sticky container wrapper */}
      <div className="lg:h-full w-full flex flex-col justify-center relative overflow-hidden">
        
        {/* Title Banner */}
        <div className="lg:absolute top-4 lg:top-28 left-4 lg:left-12 max-w-lg z-20 px-4 mb-8 lg:mb-0">
          <p className="text-[10px] md:text-xs font-bold text-electric-cyan tracking-widest uppercase mb-1 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" />
            CÔNG NGHỆ ĐỘT PHÁ
          </p>
          <h2 className="font-space text-2xl md:text-4xl font-extrabold text-foreground leading-tight">
            Thiết Kế Cho Tương Lai
          </h2>
        </div>

        {/* Slides Content Rail */}
        <div
          ref={containerRef}
          className="flex flex-col lg:flex-row h-auto lg:h-full w-full lg:w-[300vw] lg:items-center gap-16 lg:gap-0 will-change-transform"
          style={{ transform: "translate3d(0,0,0)", backfaceVisibility: "hidden" }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="w-full lg:w-screen lg:shrink-0 h-auto lg:h-full flex items-center justify-center px-4 sm:px-6 lg:px-24 pt-4 lg:pt-20"
              style={{ transform: "translate3d(0,0,0)", backfaceVisibility: "hidden" }}
            >
              <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
                
                {/* Text Content Block */}
                <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1 mt-4 lg:mt-0">
                  <span className="text-xs font-bold text-neon-purple tracking-widest uppercase mb-2">
                    {slide.subtitle}
                  </span>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-muted/20 border border-border/30">
                      {slide.icon}
                    </div>
                    <h3 className="font-space text-xl md:text-3xl font-extrabold text-foreground">
                      {slide.title}
                    </h3>
                  </div>
 
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                    {slide.description}
                  </p>
 
                  {/* Bullet specifications grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full border-t border-border/20 pt-6">
                    {slide.specs.map((spec, i) => (
                      <div key={i} className="flex items-center justify-center lg:justify-start gap-2">
                        <Shield className="w-3.5 h-3.5 text-electric-cyan flex-shrink-0" />
                        <span className="text-xs text-muted-foreground">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
 
                {/* Animated Graphic Display Area */}
                <div 
                  className="lg:col-span-6 flex items-center justify-center order-1 lg:order-2"
                  style={{ transform: "translate3d(0,0,0)", backfaceVisibility: "hidden" }}
                >
                  <div 
                    className="relative p-6 sm:p-8 rounded-full flex items-center justify-center bg-card/20 dark:bg-card/45 border border-border/15 dark:border-border/10 shadow-lg"
                    style={{ transform: "translate3d(0,0,0)", backfaceVisibility: "hidden" }}
                  >
                    <div 
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{
                        boxShadow: `0 0 35px ${slide.glowColor}`,
                        opacity: activeSlide === index ? 1 : 0,
                        transform: "translate3d(0,0,0)",
                        backfaceVisibility: "hidden"
                      }}
                    />
                    <div 
                      className="relative z-10 flex items-center justify-center"
                      style={{ transform: "translate3d(0,0,0)", backfaceVisibility: "hidden" }}
                    >
                      {slide.svgGraphic}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
