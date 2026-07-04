"use client";

import React, { useState, useEffect, useRef, useContext } from "react";
import { CartContext } from "@/context/CartContext";

interface LazyContainerProps {
  children: React.ReactNode;
  placeholderHeight?: string; // Ví dụ: "400px" hoặc "min-h-[500px]"
  className?: string;
  rootMargin?: string;
  watchCartContext?: boolean; // Buộc kết xuất nếu giỏ hàng hoặc mục yêu thích đang mở
}

export default function LazyContainer({
  children,
  placeholderHeight = "400px",
  className = "",
  rootMargin = "200px",
  watchCartContext = false,
}: LazyContainerProps) {
  const [isIntersected, setIsIntersected] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sử dụng useContext trực tiếp để tránh lỗi crash nếu không có CartProvider
  const cartContext = useContext(CartContext);
  const shouldForceMount = !!(
    watchCartContext &&
    cartContext &&
    (cartContext.cartOpen || cartContext.favsOpen)
  );

  // Nếu cần hiển thị bắt buộc và chưa hiển thị, cập nhật state trực tiếp khi render
  // Điều này tránh cảnh báo setState trong useEffect gây cascading renders.
  if (shouldForceMount && !isIntersected) {
    setIsIntersected(true);
  }

  useEffect(() => {
    // Nếu đã hiển thị thì không cần đăng ký observer nữa
    if (isIntersected) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setTimeout(() => {
        setIsIntersected(true);
      }, 0);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersected(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [rootMargin, isIntersected]);

  return (
    <div ref={containerRef} className={className}>
      {isIntersected ? (
        children
      ) : (
        <div
          style={{ minHeight: placeholderHeight }}
          className="w-full flex items-center justify-center opacity-0 transition-opacity duration-300"
        />
      )}
    </div>
  );
}
