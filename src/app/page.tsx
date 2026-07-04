import React from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TechSpecs from "@/components/TechSpecs";
import { ExternalLink } from "lucide-react";

// Load heavy and interactive components dynamically to optimize initial bundle size & loading performance
const FeaturesScrollytelling = dynamic(() => import("@/components/FeaturesScrollytelling"));
const ExplodedView = dynamic(() => import("@/components/ExplodedView"));
const ECommerceSection = dynamic(() => import("@/components/ECommerceSection"));
const PreOrderForm = dynamic(() => import("@/components/PreOrderForm"));
const AIChatbot = dynamic(() => import("@/components/AIChatbot"));

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "AeroGlass X",
  image:
    "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=1200&auto=format&fit=crop",
  description:
    "Kính thực tế không gian thế hệ mới với màn hình kép 8K Micro-OLED, điều khiển bằng cử chỉ tay và ánh mắt cực nhạy.",
  brand: {
    "@type": "Brand",
    name: "Helicorp",
  },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "VND",
    lowPrice: "37490000",
    highPrice: "74990000",
    offerCount: "3",
  },
};

export default function Home() {
  return (
    <>
      {/* JSON-LD Structured Data for Technical SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Floating Navigation Header */}
      <Header />

      {/* Main Sections */}
      <main className="min-h-screen relative">
        {/* Section 1: Hero landing */}
        <HeroSection />

        {/* Section 2: GSAP Scrollytelling features */}
        <FeaturesScrollytelling />

        {/* Section 2.5: Exploded view of components (GSAP Scrollytelling) */}
        <ExplodedView />

        {/* Section 3: Technical Specs table */}
        <TechSpecs />

        {/* Section 4: Mini E-commerce Store config */}
        <ECommerceSection />

        {/* Section 5: Form booking & validation */}
        <PreOrderForm />
      </main>

      {/* Chatbot floating widget */}
      <AIChatbot />

      {/* Premium Footer */}
      <footer className="bg-card/45 border-t border-border/20 py-12 px-6 md:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="flex flex-col gap-1">
            <span className="font-space font-extrabold text-base tracking-tight text-foreground">
              AeroGlass
              <span className="text-electric-cyan text-xs font-black ml-0.5">
                X
              </span>
            </span>
            <p className="text-[11px] text-muted-foreground">
              © 2026 Tập đoàn Helicorp (Healthy Living Corporation). Dự án phát
              triển Website IT. Bảo lưu mọi quyền.
            </p>
          </div>

          {/* Links & info */}
          <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-muted-foreground">
            <a href="#hero" className="hover:text-foreground transition-colors">
              Lên đầu trang
            </a>
            <a
              href="#features"
              className="hover:text-foreground transition-colors"
            >
              Tính năng
            </a>
            <a
              href="https://helicorp.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors flex items-center gap-1.5 justify-center"
            >
              Helicorp
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
