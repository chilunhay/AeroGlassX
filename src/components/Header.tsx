"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import ThemeToggle from "./ThemeToggle";
import { ShoppingCart, Heart, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const { cartCount, favorites, setCartOpen, cartOpen, setFavsOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Tính năng", href: "#features" },
    { name: "Cấu tạo", href: "#exploded-view" },
    { name: "Thông số", href: "#specs" },
    { name: "Đặt trước", href: "#pre-order" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 py-3 md:px-8 md:py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-3 rounded-2xl border border-border/20 glassmorphism shadow-lg transition-all duration-300">
        
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-neon-purple to-electric-cyan flex items-center justify-center text-white font-black text-sm group-hover:rotate-12 transition-transform shadow-md shadow-neon-purple/20">
            AG
          </div>
          <span className="font-space font-bold text-lg md:text-xl tracking-tight text-foreground">
            AeroGlass<span className="text-electric-cyan text-base font-black ml-0.5">X</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group py-1"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-neon-purple to-electric-cyan transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 md:gap-3">
          
          {/* Favorites Button */}
          <button
            onClick={() => setFavsOpen(true)}
            className="relative w-10 h-10 rounded-xl flex items-center justify-center border border-border/40 glassmorphism hover:bg-muted/10 transition-colors group cursor-pointer"
            aria-label="Favorites"
          >
            <Heart className={`w-5 h-5 transition-transform group-hover:scale-110 ${favorites.length > 0 ? "fill-hot-pink text-hot-pink animate-pulse" : "text-muted-foreground"}`} />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-hot-pink text-white font-bold text-[10px] rounded-full flex items-center justify-center shadow-lg border border-background">
                {favorites.length}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative w-10 h-10 rounded-xl flex items-center justify-center border border-border/40 glassmorphism hover:bg-muted/10 transition-colors group cursor-pointer"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5 text-muted-foreground group-hover:scale-110 transition-transform" />
            <AnimatePresence mode="popLayout">
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 600, damping: 15 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-neon-purple to-electric-cyan text-white font-bold text-[10px] rounded-full flex items-center justify-center shadow-lg border border-background"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center border border-border/40 glassmorphism hover:bg-muted/10 transition-colors cursor-pointer text-foreground"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-[72px] left-4 right-4 p-5 rounded-2xl border border-border/30 glassmorphism shadow-2xl flex flex-col gap-4 mt-2"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-xl hover:bg-muted/15"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
