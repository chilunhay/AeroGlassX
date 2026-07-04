"use client";

import React, { useState, useEffect, useRef } from "react";

interface LazyContainerProps {
  children: React.ReactNode;
  placeholderHeight?: string; // Ví dụ: "400px" hoặc "min-h-[500px]"
  className?: string;
  rootMargin?: string;
}

export default function LazyContainer({
  children,
  placeholderHeight = "400px",
  className = "",
  rootMargin = "200px",
}: LazyContainerProps) {
  const [isIntersected, setIsIntersected] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setTimeout(() => setIsIntersected(true), 0);
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
  }, [rootMargin]);

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
