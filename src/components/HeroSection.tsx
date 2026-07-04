"use client";
 
import React from "react";
import { Sparkles, ArrowRight, Eye, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";
 
export default function HeroSection() {

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden cyber-grid"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-neon-purple/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-electric-cyan/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] md:w-[250px] h-[150px] md:h-[250px] rounded-full bg-hot-pink/5 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side: Copywriting */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neon-purple/30 bg-neon-purple/5 text-neon-purple text-xs font-semibold tracking-wide uppercase mb-6 shadow-sm shadow-neon-purple/10">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Kính thực tế hỗn hợp cao cấp 2026
          </div>
 
          {/* Title */}
          <h1 className="font-space text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-none mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-400 drop-shadow-[0_0_35px_rgba(139,92,246,0.4)] animate-pulse-glow">
              Định Hình Lại Thực Tại
            </span>
          </h1>
 
          {/* Description */}
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed font-sans">
            Bước vào kỷ nguyên nơi thế giới số hòa quyện hoàn mỹ với không gian thực tế. AeroGlass X sở hữu màn hình kép 8K Micro-OLED siêu nét, chip xử lý không gian đỉnh cao và công nghệ điều khiển cử chỉ tay & ánh mắt với độ trễ phản hồi cực thấp.
          </p>
 
          {/* CTA Actions */}
          <div className="flex flex-wrap gap-4 mb-10 w-full sm:w-auto">
            <a
              href="#pre-order"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-neon-purple to-electric-cyan text-white font-bold text-sm active:scale-95 flex items-center gap-2 shadow-lg shadow-neon-purple/30 border border-white/10 group cursor-pointer w-full sm:w-auto justify-center transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.65)] hover:scale-[1.03]"
            >
              Trải Nghiệm Không Gian
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#features"
              className="px-6 py-3.5 rounded-xl border border-border/60 glassmorphism hover:bg-muted/15 font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto text-foreground"
            >
              Xem Tính Năng
            </a>
          </div>
 
          {/* Micro stats banner */}
          <div className="grid grid-cols-3 gap-6 sm:gap-8 border-t border-border/30 pt-8 w-full max-w-lg">
            <div>
              <p className="font-space text-2xl sm:text-3xl font-bold text-foreground">8K</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wider">Độ Phân Giải Mỗi Mắt</p>
            </div>
            <div>
              <p className="font-space text-2xl sm:text-3xl font-bold text-foreground">120Hz</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wider">Tần Số Quét Màn Hình</p>
            </div>
            <div>
              <p className="font-space text-2xl sm:text-3xl font-bold text-foreground">&lt;10ms</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wider">Tốc Độ Phản Hồi</p>
            </div>
          </div>
        </div>

        {/* Right Side: Virtual Glasses / Hologram Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.3 }}
          className="lg:col-span-5 flex justify-center items-center relative"
        >
          {/* Circular Hologram Background */}
          <div className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border border-dashed border-electric-cyan/20 animate-spin [animation-duration:40s] pointer-events-none" />
          <div className="absolute w-[220px] h-[220px] md:w-[320px] md:h-[320px] rounded-full border border-dotted border-neon-purple/30 animate-spin [animation-duration:20s] [animation-direction:reverse] pointer-events-none" />

          {/* Interactive Floating Glasses Object */}
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotateZ: [0, 1, 0, -1, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 6, 
              ease: "easeInOut" 
            }}
            whileHover={{ 
              scale: 1.05,
              rotateX: 10,
              rotateY: -10,
              transition: { duration: 0.3 }
            }}
            style={{ transformStyle: "preserve-3d", perspective: 1000 }}
            className="relative w-full max-w-[380px] h-[280px] flex items-center justify-center cursor-pointer group will-change-transform"
          >
            {/* Ambient Back Glow for the glasses */}
            <div className="absolute w-2/3 h-1/3 bg-gradient-to-r from-neon-purple/30 to-electric-cyan/30 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500" />

            {/* Premium Glasses Graphic SVG */}
            <svg
              viewBox="0 0 400 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto drop-shadow-[0_10px_35px_rgba(139,92,246,0.3)] select-none pointer-events-none transition-transform duration-500 group-hover:scale-105"
            >
              {/* Outer Headband */}
              <path
                d="M 50,90 C 50,60 90,40 200,40 C 310,40 350,60 350,90 C 350,90 340,110 200,110 C 60,110 50,90 50,90 Z"
                stroke="url(#purpleCyanGrad)"
                strokeWidth="2"
                strokeDasharray="4,4"
              />
              
              {/* Main Visor Shield */}
              <rect
                x="80"
                y="65"
                width="240"
                height="70"
                rx="35"
                fill="rgba(8, 7, 16, 0.85)"
                stroke="url(#cyberGrad)"
                strokeWidth="4"
              />

              {/* Visor Screen Reflexion */}
              <path
                d="M 110,75 Q 200,68 290,75 Q 270,95 200,85 Q 130,95 110,75 Z"
                fill="url(#reflexionGrad)"
                opacity="0.15"
              />

              {/* Left Lens Indicator */}
              <circle cx="140" cy="100" r="22" stroke="var(--neon-purple)" strokeWidth="2" strokeDasharray="3,3" />
              <circle cx="140" cy="100" r="14" fill="url(#cyanGlow)" />
              <circle cx="140" cy="100" r="6" fill="var(--electric-cyan)" />

              {/* Right Lens Indicator */}
              <circle cx="260" cy="100" r="22" stroke="var(--neon-purple)" strokeWidth="2" strokeDasharray="3,3" />
              <circle cx="260" cy="100" r="14" fill="url(#cyanGlow)" />
              <circle cx="260" cy="100" r="6" fill="var(--electric-cyan)" />

              {/* Holographic HUD UI overlay details */}
              <path d="M 90,100 L 70,100 L 60,120" stroke="var(--electric-cyan)" strokeWidth="1.5" />
              <path d="M 310,100 L 330,100 L 340,120" stroke="var(--hot-pink)" strokeWidth="1.5" />

              <text x="35" y="135" fill="var(--electric-cyan)" fontSize="8" fontFamily="monospace" letterSpacing="1">SYS_OK: 98%</text>
              <text x="315" y="135" fill="var(--hot-pink)" fontSize="8" fontFamily="monospace" letterSpacing="1">LINK_EST: 10ms</text>

              {/* Definitions */}
              <defs>
                <linearGradient id="purpleCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--neon-purple)" />
                  <stop offset="100%" stopColor="var(--electric-cyan)" />
                </linearGradient>
                <linearGradient id="cyberGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--neon-purple)" />
                  <stop offset="25%" stopColor="var(--hot-pink)" />
                  <stop offset="75%" stopColor="var(--electric-cyan)" />
                  <stop offset="100%" stopColor="var(--neon-purple)" />
                </linearGradient>
                <linearGradient id="reflexionGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
                <radialGradient id="cyanGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="var(--electric-cyan)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="var(--electric-cyan)" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>

            {/* Decorative Floating Dots */}
            <div className="absolute top-10 right-4 w-2 h-2 rounded-full bg-electric-cyan animate-ping" />
            <div className="absolute bottom-10 left-4 w-2 h-2 rounded-full bg-hot-pink animate-ping [animation-delay:1.5s]" />
          </motion.div>

          {/* Floating UI Spec cards */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
            className="absolute -top-6 -left-2 sm:-left-6 md:-left-12 p-3.5 rounded-xl border border-border/40 glassmorphism hidden sm:flex items-center gap-3 shadow-md will-change-transform"
          >
            <div className="p-2 rounded-lg bg-neon-purple/10 text-neon-purple">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Hiển thị</p>
              <p className="text-xs font-bold text-foreground">8K Micro-OLED</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-6 -right-2 sm:-right-6 md:-right-12 p-3.5 rounded-xl border border-border/40 glassmorphism hidden sm:flex items-center gap-3 shadow-md will-change-transform"
          >
            <div className="p-2 rounded-lg bg-electric-cyan/10 text-electric-cyan">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Điều khiển</p>
              <p className="text-xs font-bold text-foreground">Giao diện cử chỉ</p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
