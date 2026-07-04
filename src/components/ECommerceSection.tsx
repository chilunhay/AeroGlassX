"use client";

import React, { useState, useEffect } from "react";
import { useCart, CartItem } from "@/context/CartContext";
import { Heart, Plus, Minus, Trash, X, ShoppingBag, Check, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface ProductTemplate {
  id: string;
  name: string;
  basePrice: number;
  description: string;
  features: string[];
  badge?: string;
  glowClass: string;
}

// Custom currency formatter to prevent SSR hydration mismatch
const formatPrice = (amount: number) => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export default function ECommerceSection() {
  const {
    cart,
    favorites,
    viewed,
    cartOpen,
    setCartOpen,
    favsOpen,
    setFavsOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleFavorite,
    addToViewed,
    cartTotal,
    clearCart,
  } = useCart();

  const handleAddFavoriteToCart = (prod: ProductTemplate) => {
    const cartItemId = `${prod.id}-space-black`;
    addToCart({
      id: cartItemId,
      name: `${prod.name} (Đen Không Gian)`,
      price: prod.basePrice,
      variant: `${prod.name} - Đen Không Gian`,
      prescription: false,
      accessoryKit: false,
    });
    setFavsOpen(false);
    setCartOpen(true);
  };

  const handleCloseAndScrollToStore = (closeFn: () => void) => {
    closeFn();
    setTimeout(() => {
      const storeEl = document.getElementById("store");
      if (storeEl) {
        storeEl.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  const products: ProductTemplate[] = [
    {
      id: "ag-standard",
      name: "AeroGlass X Standard",
      basePrice: 37490000,
      description: "Đáp ứng hoàn hảo nhu cầu làm việc trong không gian ảo, giải trí phim ảnh độ nét cao và trải nghiệm thực tế tăng cường mỗi ngày.",
      features: ["Màn hình kép 4K Micro-OLED", "Nhận diện cử chỉ & chuyển động mắt", "Pin sử dụng 4 giờ liên tục"],
      glowClass: "group-hover:border-neon-purple/50 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]",
    },
    {
      id: "ag-pro",
      name: "AeroGlass X Pro",
      basePrice: 54990000,
      description: "Lựa chọn tối ưu cho chuyên gia và nhà sáng tạo nội dung cần chất lượng hiển thị cao nhất, tích hợp cảm nhận sóng não.",
      features: ["Màn hình kép 8K Micro-OLED", "Cảm biến sóng não tích hợp ở đai đeo", "Pin kép hỗ trợ thay nóng (hot-swap)"],
      badge: "Bán Chạy Nhất",
      glowClass: "border-electric-cyan/40 shadow-[0_0_25px_rgba(6,182,212,0.1)] group-hover:border-electric-cyan/70 group-hover:shadow-[0_0_35px_rgba(6,182,212,0.2)]",
    },
    {
      id: "ag-developer",
      name: "AeroGlass X DevKit",
      basePrice: 74990000,
      description: "Mở khóa toàn bộ hệ điều hành, cung cấp API truy cập dữ liệu cảm biến thô phục vụ phát triển ứng dụng chuyên sâu.",
      features: ["Bộ SDK đầy đủ & API cảm biến thô", "Màn hình kép 8K tần số quét 120Hz", "Tản nhiệt lỏng kim loại siêu mát"],
      badge: "Mở Khóa API",
      glowClass: "group-hover:border-hot-pink/50 group-hover:shadow-[0_0_20px_rgba(244,63,94,0.15)]",
    },
  ];

  // Options state
  const [selectedColor, setSelectedColor] = useState<"space-black" | "silver">("space-black");
  const [prescription, setPrescription] = useState(false);
  const [accessoryKit, setAccessoryKit] = useState(false);
  const [activeModelId, setActiveModelId] = useState<string>("ag-pro");
  const [isAdding, setIsAdding] = useState(false);

  // Helper to dispatch custom telemetry events
  const triggerTelemetry = (action: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("telemetry", { detail: action }));
    }
  };

  // Track viewed models
  useEffect(() => {
    addToViewed(activeModelId);
    const model = products.find((p) => p.id === activeModelId);
    if (model) {
      triggerTelemetry(`Xem cấu hình phiên bản: ${model.name}`);
    }
  }, [activeModelId]);

  const activeModel = products.find((p) => p.id === activeModelId) || products[1];

  const calculatePrice = (basePrice: number) => {
    let price = basePrice;
    if (prescription) price += 3750000;
    if (accessoryKit) price += 4990000;
    return price;
  };

  const handleColorChange = (color: "space-black" | "silver") => {
    setSelectedColor(color);
    const colorLabel = color === "space-black" ? "Đen Không Gian" : "Bạc Ánh Kim";
    triggerTelemetry(`Chọn màu sắc ngoại quan: ${colorLabel}`);
  };

  const handlePrescriptionToggle = () => {
    const nextVal = !prescription;
    setPrescription(nextVal);
    triggerTelemetry(
      nextVal ? "Bật tùy chọn tròng cận quang học ZEISS (+3.750.000 đ)" : "Tắt tùy chọn tròng cận quang học ZEISS"
    );
  };

  const handleAccessoryToggle = () => {
    const nextVal = !accessoryKit;
    setAccessoryKit(nextVal);
    triggerTelemetry(
      nextVal ? "Thêm nâng cấp đai đeo âm thanh Spatial Pro (+4.990.000 đ)" : "Bỏ nâng cấp đai đeo âm thanh Spatial Pro"
    );
  };

  const handleToggleFavorite = () => {
    const isCurrentlyFav = favorites.includes(activeModel.id);
    toggleFavorite(activeModel.id);
    triggerTelemetry(
      isCurrentlyFav 
        ? `Xóa khỏi mục yêu thích: ${activeModel.name}` 
        : `Đã lưu vào mục yêu thích: ${activeModel.name}`
    );
  };

  const handleAddToCart = () => {
    if (isAdding) return;
    setIsAdding(true);

    const finalPrice = calculatePrice(activeModel.basePrice);
    
    // Construct unique ID based on selections including color
    const configSuffix = `-${selectedColor}${prescription ? "-pres" : ""}${accessoryKit ? "-acc" : ""}`;
    const cartItemId = `${activeModel.id}${configSuffix}`;
    
    // Build cart item description including color
    const colorLabel = selectedColor === "space-black" ? "Đen Không Gian" : "Bạc Ánh Kim";
    let configLabel = `${activeModel.name} (${colorLabel})`;
    if (prescription || accessoryKit) {
      const opts = [];
      if (prescription) opts.push("Kính Cận Zeiss");
      if (accessoryKit) opts.push("Đai Đeo Spatial Pro");
      configLabel += ` [${opts.join(" + ")}]`;
    }

    addToCart({
      id: cartItemId,
      name: configLabel,
      price: finalPrice,
      variant: `${activeModel.name} - ${colorLabel}`,
      prescription,
      accessoryKit,
    });

    triggerTelemetry(`Thêm vào giỏ hàng: ${configLabel}`);

    setTimeout(() => {
      setIsAdding(false);
    }, 600);
  };

  const handleCheckout = () => {
    triggerTelemetry("Nhấp chuột chọn Tiến hành đặt hàng (Checkout)");
    toast.success("🚀 Đặt hàng thành công! Hệ thống đã ghi nhận cấu hình kính AeroGlass X tùy chỉnh của bạn. Chúng tôi đã gửi email thông tin chi tiết đơn đặt mua kèm hướng dẫn hoàn thành thủ tục thanh toán. Xin chân thành cảm ơn!", {
      duration: 6000,
    });
    clearCart({ silent: true });
    setCartOpen(false);
  };

  return (
    <section id="store" className="py-20 bg-background border-t border-border/20 relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-neon-purple/5 blur-[90px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-[350px] h-[350px] bg-electric-cyan/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-hot-pink tracking-widest uppercase mb-2 block">
            THIẾT LẬP CẤU HÌNH RIÊNG
          </span>
          <h2 className="font-space text-3xl md:text-5xl font-extrabold text-foreground mb-4">
            Cá Nhân Hóa Trải Nghiệm
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Lựa chọn phiên bản bộ nhớ phù hợp, tích hợp tròng kính cận ZEISS chuyên biệt và nâng cấp đai đeo âm thanh cao cấp.
          </p>
        </div>

        {/* E-Commerce Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Model Selection Cards */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <h3 className="font-space text-lg font-bold text-foreground mb-1 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-neon-purple" />
              1. Lựa Chọn Phiên Bản Kính
            </h3>
            
            <div className="flex flex-col gap-4">
              {products.map((prod) => {
                const isActive = prod.id === activeModelId;
                return (
                  <div
                    key={prod.id}
                    onClick={() => setActiveModelId(prod.id)}
                    className={`relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer group flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${
                      isActive
                        ? "border-neon-purple bg-neon-purple/5 glow-purple"
                        : "border-border/40 hover:border-border bg-card/25"
                    }`}
                  >
                    {prod.badge && (
                      <span className="absolute -top-2.5 left-4 px-2 py-0.5 rounded-md bg-gradient-to-r from-neon-purple to-electric-cyan text-white text-[10px] font-black uppercase tracking-wider">
                        {prod.badge}
                      </span>
                    )}

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <h4 className="font-space font-bold text-base md:text-lg text-foreground">
                          {prod.name}
                        </h4>
                        {isActive && <Check className="w-4 h-4 text-electric-cyan" />}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed max-w-md">
                        {prod.description}
                      </p>
                    </div>

                    <div className="text-left sm:text-right flex-shrink-0 w-full sm:w-auto border-t sm:border-0 pt-3 sm:pt-0">
                      <p className="text-xl font-space font-black text-foreground">
                        {formatPrice(prod.basePrice)} đ
                      </p>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                        Giá dự kiến
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Color Selection */}
            <div className="mt-8">
              <h3 className="font-space text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-neon-purple to-electric-cyan flex-shrink-0" />
                2. Lựa Chọn Màu Sắc Ngoại Quan
              </h3>
              
              <div className="flex gap-4">
                {/* Space Black */}
                <button
                  type="button"
                  onClick={() => handleColorChange("space-black")}
                  className={`flex-1 p-4 rounded-xl border text-left cursor-pointer transition-all flex items-center gap-3 ${
                    selectedColor === "space-black"
                      ? "border-neon-purple bg-neon-purple/5 text-foreground animate-none"
                      : "border-border/40 hover:border-border text-muted-foreground"
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-[#080710] border border-white/20 flex-shrink-0 flex items-center justify-center">
                    {selectedColor === "space-black" && <div className="w-2.5 h-2.5 rounded-full bg-neon-purple" />}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-foreground">Đen Không Gian</p>
                    <p className="text-[10px] text-muted-foreground">Space Black Matte</p>
                  </div>
                </button>

                {/* Silver Metallic */}
                <button
                  type="button"
                  onClick={() => handleColorChange("silver")}
                  className={`flex-1 p-4 rounded-xl border text-left cursor-pointer transition-all flex items-center gap-3 ${
                    selectedColor === "silver"
                      ? "border-electric-cyan bg-electric-cyan/5 text-foreground animate-none"
                      : "border-border/40 hover:border-border text-muted-foreground"
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-[#f1f5f9] border border-black/20 flex-shrink-0 flex items-center justify-center">
                    {selectedColor === "silver" && <div className="w-2.5 h-2.5 rounded-full bg-electric-cyan" />}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-foreground">Bạc Ánh Kim</p>
                    <p className="text-[10px] text-muted-foreground">Silver Metallic Gloss</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Custom Upgrades */}
            <div className="mt-8">
              <h3 className="font-space text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-electric-cyan" />
                3. Nâng Cấp Thấu Kính & Phụ Kiện
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Upgrade 1 */}
                <button
                  onClick={handlePrescriptionToggle}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    prescription
                      ? "border-electric-cyan bg-electric-cyan/5 text-foreground"
                      : "border-border/40 hover:border-border text-muted-foreground"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-sm text-foreground">Tròng cận quang học ZEISS</span>
                    <span className="text-xs font-black text-electric-cyan">+{formatPrice(3750000)} đ</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Được gia công tinh xảo bởi ZEISS, hít nam châm trực tiếp vào thấu kính bên trong kính.
                  </p>
                </button>

                {/* Upgrade 2 */}
                <button
                  onClick={handleAccessoryToggle}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    accessoryKit
                      ? "border-electric-cyan bg-electric-cyan/5 text-foreground"
                      : "border-border/40 hover:border-border text-muted-foreground"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-sm text-foreground">Đai đeo âm thanh Spatial Pro</span>
                    <span className="text-xs font-black text-electric-cyan">+{formatPrice(4990000)} đ</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Chất liệu cao cấp, tích hợp loa âm thanh vòm không gian và cụm lắp pin đối trọng phía sau.
                  </p>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Configuration Summary Card */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-2xl border border-border/40 glassmorphism relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-neon-purple/5 blur-xl rounded-full" />
              
              <h3 className="font-space text-lg font-bold text-foreground mb-4 border-b border-border/20 pb-3">
                Tóm Tắt Cấu Hình
              </h3>

              {/* Specs and Details */}
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{activeModel.name}</span>
                  <span className="text-sm font-bold text-foreground">{formatPrice(activeModel.basePrice)} đ</span>
                </div>

                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">↳ Màu ngoại quan: {selectedColor === "space-black" ? "Đen Không Gian" : "Bạc Ánh Kim"}</span>
                  <span className="font-bold text-foreground">Miễn phí</span>
                </div>

                {prescription && (
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">↳ Tùy chọn tròng cận ZEISS</span>
                    <span className="font-bold text-foreground">+{formatPrice(3750000)} đ</span>
                  </div>
                )}

                {accessoryKit && (
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">↳ Nâng cấp đai đeo Spatial Pro</span>
                    <span className="font-bold text-foreground">+{formatPrice(4990000)} đ</span>
                  </div>
                )}

                <div className="border-t border-dashed border-border/20 pt-4 flex justify-between items-baseline">
                  <span className="font-space font-bold text-sm text-foreground">Tổng giá dự kiến</span>
                  <span className="font-space font-black text-xl text-gradient-purple-cyan">
                    {formatPrice(calculatePrice(activeModel.basePrice))} đ
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-neon-purple to-electric-cyan hover:opacity-95 text-white font-bold text-sm cursor-pointer shadow-lg shadow-neon-purple/10 flex items-center justify-center gap-2 disabled:opacity-80 transition-all duration-200"
                >
                  {isAdding ? (
                    <>
                      <Check className="w-4 h-4 animate-pulse" />
                      Đã Thêm!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      Đặt Hàng Ngay
                    </>
                  )}
                </button>
                <button
                  onClick={handleToggleFavorite}
                  className={`w-full py-3 rounded-xl border border-border/50 font-semibold text-sm cursor-pointer flex items-center justify-center gap-2 transition-colors hover:bg-muted/15 ${
                    favorites.includes(activeModel.id) ? "text-hot-pink border-hot-pink/30 bg-hot-pink/5" : "text-foreground"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(activeModel.id) ? "fill-hot-pink" : ""}`} />
                  {favorites.includes(activeModel.id) ? "Đã Lưu Vào Mục Yêu Thích" : "Lưu Vào Mục Yêu Thích"}
                </button>
              </div>

              {/* Highlight list */}
              <ul className="mt-6 pt-4 border-t border-border/20 flex flex-col gap-2.5">
                {activeModel.features.map((feat, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-electric-cyan flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            {/* Viewed Models list */}
            {viewed.length > 1 && (
              <div className="mt-8 p-4 rounded-xl border border-border/20 bg-card/10">
                <h4 className="font-space text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
                  Cấu Hình Đã Xem Gần Đây
                </h4>
                <div className="flex flex-col gap-2">
                  {viewed.map((viewedId) => {
                    const item = products.find((p) => p.id === viewedId);
                    if (!item || item.id === activeModelId) return null;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveModelId(item.id)}
                        className="text-left text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center justify-between"
                      >
                        <span>{item.name}</span>
                        <span className="font-bold">{formatPrice(item.basePrice)} đ</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          
        </div>
      </div>

      {/* Favorites Slider Drawer */}
      <AnimatePresence>
        {favsOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFavsOpen(false)}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-screen w-full max-w-md bg-card border-l border-border z-50 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="p-5 border-b border-border/30 flex items-center justify-between bg-background">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-hot-pink fill-hot-pink" />
                  <h3 className="font-space font-bold text-lg text-foreground">Sản Phẩm Yêu Thích</h3>
                </div>
                <button
                  onClick={() => setFavsOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted/20 text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
                {favorites.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center gap-3">
                    <Heart className="w-12 h-12 text-muted/30 animate-pulse" />
                    <p className="text-sm font-semibold text-muted-foreground">Danh sách yêu thích trống</p>
                    <button
                      onClick={() => handleCloseAndScrollToStore(() => setFavsOpen(false))}
                      className="px-4 py-2 text-xs font-bold rounded-lg bg-hot-pink text-white cursor-pointer"
                    >
                      Khám Phá Cửa Hàng
                    </button>
                  </div>
                ) : (
                  products
                    .filter((prod) => favorites.includes(prod.id))
                    .map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-xl border border-border/20 bg-background/50 flex flex-col gap-3 relative"
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <h4 className="text-xs font-bold text-foreground leading-tight">
                              {item.name}
                            </h4>
                            <p className="text-[10px] text-muted-foreground mt-1 max-w-[280px]">
                              {item.description}
                            </p>
                          </div>
                          <button
                            onClick={() => toggleFavorite(item.id)}
                            className="w-6 h-6 rounded hover:bg-red-500/10 text-hot-pink flex items-center justify-center cursor-pointer"
                            aria-label="Xóa khỏi yêu thích"
                          >
                            <Trash className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between border-t border-border/10 pt-3">
                          <span className="font-space text-sm font-extrabold text-foreground">
                            {formatPrice(item.basePrice)} đ
                          </span>
                          <button
                            onClick={() => handleAddFavoriteToCart(item)}
                            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-neon-purple to-electric-cyan text-white text-xs font-bold hover:opacity-95 transition-opacity flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                            Thêm vào giỏ
                          </button>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Slider Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-screen w-full max-w-md bg-card border-l border-border z-50 flex flex-col shadow-2xl"
            >
              {/* Cart Header */}
              <div className="p-5 border-b border-border/30 flex items-center justify-between bg-background">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-neon-purple" />
                  <h3 className="font-space font-bold text-lg text-foreground">Giỏ Hàng Của Bạn</h3>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted/20 text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center gap-3">
                    <ShoppingBag className="w-12 h-12 text-muted/30" />
                    <p className="text-sm font-semibold text-muted-foreground">Giỏ hàng của bạn đang trống</p>
                    <button
                      onClick={() => handleCloseAndScrollToStore(() => setCartOpen(false))}
                      className="px-4 py-2 text-xs font-bold rounded-lg bg-neon-purple text-white cursor-pointer"
                    >
                      Quay Lại Cửa Hàng
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl border border-border/20 bg-background/50 flex flex-col gap-3 relative"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h4 className="text-xs font-bold text-foreground leading-tight max-w-[200px]">
                            {item.name}
                          </h4>
                          <span className="text-[10px] text-muted-foreground font-semibold">
                            {item.variant}
                          </span>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-6 h-6 rounded hover:bg-red-500/10 text-muted-foreground hover:text-red-500 flex items-center justify-center cursor-pointer"
                          aria-label="Xóa sản phẩm"
                        >
                          <Trash className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Selected Upgrades / Accessories */}
                      {(item.prescription || item.accessoryKit) && (
                        <div className="flex flex-col gap-1.5 bg-muted/20 p-2.5 rounded-lg border border-border/10 text-[11px] mt-1">
                          <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-bold">
                            Tùy chọn nâng cấp:
                          </span>
                          {item.prescription && (
                            <div className="flex items-center justify-between text-foreground/90">
                              <span className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan" />
                                Tròng cận quang học ZEISS
                              </span>
                              <span className="font-space text-[10px] font-bold text-electric-cyan">+3.750.000 đ</span>
                            </div>
                          )}
                          {item.accessoryKit && (
                            <div className="flex items-center justify-between text-foreground/90">
                              <span className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-neon-purple" />
                                Đai đeo âm thanh Spatial Pro
                              </span>
                              <span className="font-space text-[10px] font-bold text-neon-purple">+4.990.000 đ</span>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between border-t border-border/10 pt-3">
                        <div className="flex items-center border border-border/30 rounded-lg overflow-hidden h-7">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-full flex items-center justify-center hover:bg-muted/15 cursor-pointer text-muted-foreground"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-full flex items-center justify-center hover:bg-muted/15 cursor-pointer text-muted-foreground"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-space text-sm font-extrabold text-foreground">
                          {formatPrice(item.price * item.quantity)} đ
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-border/30 bg-background flex flex-col gap-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-semibold text-muted-foreground">Tạm tính</span>
                    <span className="font-space font-black text-xl text-foreground">
                      {formatPrice(cartTotal)} đ
                    </span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-neon-purple to-electric-cyan text-white font-bold text-sm cursor-pointer hover:opacity-95 shadow-lg shadow-neon-purple/10 flex items-center justify-center gap-2"
                  >
                    Tiến Hành Đặt Hàng
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
