"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Cpu, Eye, Layers, ChevronDown } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ExplodedView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // SVG Refs
  const frameRef = useRef<SVGGElement>(null);
  const screenRef = useRef<SVGGElement>(null);
  const chipRef = useRef<SVGGElement>(null);

  // Text Refs
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        // Master Timeline for ScrollTrigger
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true, // Pin the section
            scrub: 0.5, // Reduced scrub delay for tighter response and no lagging
            start: "top top",
            end: "+=800", // Tighter scroll distance
            invalidateOnRefresh: true,
            anticipatePin: 1,
            refreshPriority: 1,
          },
        });

        // Initial State
        gsap.set([frameRef.current, screenRef.current, chipRef.current], {
          y: 0,
          transformOrigin: "center center",
          force3D: true,
        });
        gsap.set([text2Ref.current, text3Ref.current], {
          autoAlpha: 0,
          y: 40,
          scale: 0.95,
          pointerEvents: "none",
          force3D: true,
        });
        gsap.set(text1Ref.current, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          pointerEvents: "auto",
          force3D: true,
        });

        // Timeline Animation Steps
        tl.to(frameRef.current, { y: -90, duration: 1, force3D: true }, "step1")
          .to(text1Ref.current, { autoAlpha: 0, y: -40, scale: 0.95, pointerEvents: "none", duration: 0.5, force3D: true }, "step1")
          .to(text2Ref.current, { autoAlpha: 1, y: 0, scale: 1, pointerEvents: "auto", duration: 0.5, force3D: true }, "step1+=0.3");

        tl.to(chipRef.current, { y: 90, duration: 1, force3D: true }, "step2")
          .to(text2Ref.current, { autoAlpha: 0, y: -40, scale: 0.95, pointerEvents: "none", duration: 0.5, force3D: true }, "step2")
          .to(text3Ref.current, { autoAlpha: 1, y: 0, scale: 1, pointerEvents: "auto", duration: 0.5, force3D: true }, "step2+=0.3");

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      return () => {
        mm.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      id="exploded-view"
      ref={containerRef}
      className="relative lg:h-screen bg-background overflow-hidden border-t border-border/20 flex flex-col justify-center py-16 lg:py-0"
    >
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-neon-purple/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-electric-cyan/5 blur-[120px] pointer-events-none" />

      {/* Main trigger container */}
      <div ref={triggerRef} className="w-full lg:h-full flex items-center justify-center px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center lg:h-full">
          
          {/* Left Column: Interactive Exploded SVG Visual */}
          <div className="lg:col-span-7 flex flex-col justify-center items-center relative h-[280px] sm:h-[350px] lg:h-[550px] order-1 lg:order-1">
            
            {/* Ambient Background HUD rings */}
            <div className="absolute w-[280px] h-[280px] md:w-[380px] md:h-[380px] rounded-full border border-dashed border-muted-foreground/10 animate-spin [animation-duration:60s] pointer-events-none" />
            <div className="absolute w-[200px] h-[200px] md:w-[280px] md:h-[280px] rounded-full border border-dotted border-neon-purple/10 animate-spin [animation-duration:30s] [animation-direction:reverse] pointer-events-none" />
            
            {/* The Exploded Stack Container */}
            <div className="relative w-full max-w-[340px] lg:max-w-[540px] h-full flex items-center justify-center select-none">
              
              <svg
                viewBox="-100 0 600 350"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto overflow-visible"
              >
                {/* 1. TOP LAYER: TITANIUM FRAME */}
                <g ref={frameRef} className="transition-shadow duration-300 will-change-transform lg:transform-none -translate-y-12 md:-translate-y-16">
                  {/* Decorative pointer line */}
                  <path d="M 50,110 L 20,80 H -10" stroke="var(--neon-purple)" strokeWidth="1.2" strokeDasharray="3,3" opacity="0.6" />
                  
                  {/* Main Headband / Outer Frame */}
                  <path
                    d="M 60,165 C 60,135 100,115 200,115 C 300,115 340,135 340,165 C 340,165 330,185 200,185 C 70,185 60,165 60,165 Z"
                    stroke="url(#framePurpleCyanGrad)"
                    strokeWidth="3.5"
                    fill="rgba(120, 119, 198, 0.1)"
                    className="drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                  />
                  {/* Nose Bridge bridge overlay */}
                  <path d="M 185,178 Q 200,172 215,178" stroke="var(--neon-purple)" strokeWidth="2.5" />
                  {/* Temple arms accent */}
                  <path d="M 62,160 Q 30,140 10,165" stroke="var(--neon-purple)" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 338,160 Q 370,140 390,165" stroke="var(--neon-purple)" strokeWidth="2" strokeLinecap="round" />
                  
                  {/* Label tag inside SVG */}
                  <text x="-40" y="75" fill="var(--neon-purple)" fontSize="13" fontFamily="monospace" fontWeight="bold" letterSpacing="1">LỚP 01 // KHUNG TITANIUM</text>
                </g>

                {/* 2. MIDDLE LAYER: DUAL MICRO-OLED SCREENS */}
                <g ref={screenRef} className="will-change-transform lg:transform-none translate-y-0">
                  {/* Decorative pointer line */}
                  <path d="M 310,175 L 330,150 H 345" stroke="var(--electric-cyan)" strokeWidth="1.2" strokeDasharray="3,3" opacity="0.6" />

                  {/* Left Lens Display */}
                  <rect
                    x="90"
                    y="145"
                    width="100"
                    height="60"
                    rx="30"
                    fill="rgba(6, 182, 212, 0.05)"
                    stroke="url(#screenCyanGrad)"
                    strokeWidth="3.5"
                    className="drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                  />
                  {/* Screen grid overlay details */}
                  <circle cx="140" cy="175" r="22" stroke="var(--electric-cyan)" strokeWidth="1.5" strokeDasharray="2,2" opacity="0.4" />
                  <circle cx="140" cy="175" r="14" fill="url(#lensCyanGlow)" />
                  <circle cx="140" cy="175" r="6" fill="var(--electric-cyan)" />

                  {/* Right Lens Display */}
                  <rect
                    x="210"
                    y="145"
                    width="100"
                    height="60"
                    rx="30"
                    fill="rgba(6, 182, 212, 0.05)"
                    stroke="url(#screenCyanGrad)"
                    strokeWidth="3.5"
                    className="drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                  />
                  <circle cx="260" cy="175" r="22" stroke="var(--electric-cyan)" strokeWidth="1.5" strokeDasharray="2,2" opacity="0.4" />
                  <circle cx="260" cy="175" r="14" fill="url(#lensCyanGlow)" />
                  <circle cx="260" cy="175" r="6" fill="var(--electric-cyan)" />

                  {/* Connecting cable line */}
                  <path d="M 190,175 H 210" stroke="var(--electric-cyan)" strokeWidth="2" strokeDasharray="3,1" />
                  
                  {/* Label tag inside SVG */}
                  <text x="350" y="148" fill="var(--electric-cyan)" fontSize="13" fontFamily="monospace" fontWeight="bold" letterSpacing="1">LỚP 02 // MÀN HÌNH KÉP 8K</text>
                </g>

                {/* 3. BOTTOM LAYER: NEURAL X1 CHIP & BOARD */}
                <g ref={chipRef} className="will-change-transform lg:transform-none translate-y-12 md:translate-y-16">
                  {/* Decorative pointer line */}
                  <path d="M 160,250 L 130,280 H 100" stroke="var(--hot-pink)" strokeWidth="1.2" strokeDasharray="3,3" opacity="0.6" />

                  {/* Main PCB Board Base Shape */}
                  <path
                    d="M 80,170 C 80,155 100,140 200,140 C 300,140 320,155 320,170 C 320,170 310,210 200,210 C 90,210 80,170 80,170 Z"
                    stroke="var(--hot-pink)"
                    strokeWidth="2"
                    fill="rgba(244, 63, 94, 0.02)"
                    strokeDasharray="4,2"
                  />

                  {/* Neural AI Chip in the center */}
                  <rect
                    x="175"
                    y="160"
                    width="50"
                    height="30"
                    rx="4"
                    fill="#080710"
                    stroke="url(#chipPinkGrad)"
                    strokeWidth="2.5"
                    className="drop-shadow-[0_0_15px_rgba(244, 63, 94, 0.5)]"
                  />
                  <rect x="183" y="167" width="10" height="10" fill="none" stroke="var(--hot-pink)" strokeWidth="1" />
                  <circle cx="188" cy="172" r="2" fill="var(--hot-pink)" />
                  
                  <rect x="207" y="167" width="10" height="10" fill="none" stroke="var(--hot-pink)" strokeWidth="1" />
                  <circle cx="212" cy="172" r="2" fill="var(--hot-pink)" />

                  <rect x="195" y="177" width="10" height="10" fill="none" stroke="var(--neon-purple)" strokeWidth="1" />
                  <circle cx="200" cy="182" r="2" fill="var(--neon-purple)" />

                  <text x="40" y="295" fill="var(--hot-pink)" fontSize="13" fontFamily="monospace" fontWeight="bold" letterSpacing="1">LỚP 03 // VI XỬ LÝ NEURAL X1</text>
                </g>

                {/* DEFINITIONS FOR GRADIENTS */}
                <defs>
                  <linearGradient id="framePurpleCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--neon-purple)" />
                    <stop offset="100%" stopColor="var(--electric-cyan)" />
                  </linearGradient>
                  <linearGradient id="screenCyanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--electric-cyan)" />
                    <stop offset="100%" stopColor="var(--neon-purple)" />
                  </linearGradient>
                  <linearGradient id="chipPinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--hot-pink)" />
                    <stop offset="100%" stopColor="var(--neon-purple)" />
                  </linearGradient>
                  <radialGradient id="lensCyanGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="var(--electric-cyan)" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="var(--electric-cyan)" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="chipGlowRad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="var(--hot-pink)" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="var(--hot-pink)" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
            
            {/* Scroll Indicator below the glasses (only desktop) */}
            <div className="absolute bottom-0 lg:bottom-4 flex-col items-center gap-1 opacity-45 animate-bounce hidden lg:flex">
              <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Cuộn để khám phá cấu tạo</span>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>

          {/* Right Column: Animated Exploded Descriptions */}
          <div className="lg:col-span-5 w-full lg:h-[450px] h-auto flex flex-col lg:justify-center gap-6 order-2 lg:order-2 px-0 lg:px-4 relative">
            
            {/* 1. LỚP 1 DESCRIPTION */}
            <div
              ref={text1Ref}
              className="lg:absolute lg:left-0 lg:right-0 relative p-5 md:p-6 rounded-3xl border border-border/40 glassmorphism shadow-2xl flex flex-col gap-3.5 will-change-transform"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-purple/30 bg-neon-purple/5 text-neon-purple text-[10px] font-bold uppercase tracking-wider self-start">
                <Layers className="w-3.5 h-3.5" />
                LỚP 01 // KHUNG TI-TAN SIÊU NHẸ
              </div>
              <h3 className="font-space text-xl md:text-2xl font-extrabold text-foreground">
                Khung Gọng Titanium Siêu Nhẹ 75g
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                Gia công CNC tinh xảo từ hợp kim Titanium dùng trong ngành hàng không vũ trụ. Mang lại độ bền bỉ vượt trội nhưng trọng lượng tổng thể chỉ 75g, kết hợp phân bộ trọng lượng tối ưu giúp bạn thoải mái đeo kính suốt cả ngày dài.
              </p>
            </div>

            {/* 2. LỚP 2 DESCRIPTION */}
            <div
              ref={text2Ref}
              className="lg:absolute lg:left-0 lg:right-0 relative p-5 md:p-6 rounded-3xl border border-border/40 glassmorphism shadow-2xl flex flex-col gap-3.5 will-change-transform"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-electric-cyan/30 bg-electric-cyan/5 text-electric-cyan text-[10px] font-bold uppercase tracking-wider self-start">
                <Eye className="w-3.5 h-3.5" />
                LỚP 02 // HIỂN THỊ KHÔNG GIAN
              </div>
              <h3 className="font-space text-xl md:text-2xl font-extrabold text-foreground">
                Màn Hình Kép 8K Micro-OLED
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                Hệ thống hiển thị Micro-OLED kép 8K mang lại mật độ điểm ảnh cực cao (40 triệu điểm ảnh). Sự kết hợp đột phá với thấu kính quang học ZEISS giúp tái hiện hình ảnh sắc nét đến từng chi tiết nhỏ nhất, loại bỏ hoàn toàn hiện tượng rỗ ảnh (hiệu ứng lưới pixel).
              </p>
            </div>

            {/* 3. LỚP 3 DESCRIPTION */}
            <div
              ref={text3Ref}
              className="lg:absolute lg:left-0 lg:right-0 relative p-5 md:p-6 rounded-3xl border border-border/40 glassmorphism shadow-2xl flex flex-col gap-3.5 will-change-transform"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-hot-pink/30 bg-hot-pink/5 text-hot-pink text-[10px] font-bold uppercase tracking-wider self-start">
                <Cpu className="w-3.5 h-3.5" />
                LỚP 03 // BỘ VI XỬ LÝ TRUNG TÂM
              </div>
              <h3 className="font-space text-xl md:text-2xl font-extrabold text-foreground">
                Bộ Vi Xử Lý AI Neural X1
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                Được coi là bộ não điều hành của AeroGlass X. Chip xử lý 3nm độc quyền xử lý đồng thời dữ liệu từ 24 camera cảm biến cử chỉ, tái tạo không gian 3D thời gian thực với độ trễ phản hồi cực thấp dưới 10ms.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
