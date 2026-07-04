"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { toast } from "sonner";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  variant: string;
  prescription: boolean;
  accessoryKit: boolean;
  image?: string;
}

interface CartContextType {
  cart: CartItem[];
  favorites: string[];
  viewed: string[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  favsOpen: boolean;
  setFavsOpen: (open: boolean) => void;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: (options?: { silent?: boolean }) => void;
  toggleFavorite: (productId: string) => void;
  addToViewed: (productId: string) => void;
  cartCount: number;
  cartTotal: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [viewed, setViewed] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [favsOpen, setFavsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load from local storage
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const storedCart = localStorage.getItem("aeroglass_cart");
        if (storedCart) setCart(JSON.parse(storedCart));

        const storedFavs = localStorage.getItem("aeroglass_favs");
        if (storedFavs) setFavorites(JSON.parse(storedFavs));

        const storedViewed = localStorage.getItem("aeroglass_viewed");
        if (storedViewed) setViewed(JSON.parse(storedViewed));
      } catch (e) {
        console.error("Error retrieving stored shop state", e);
      }
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Save to local storage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("aeroglass_cart", JSON.stringify(cart));
    }
  }, [cart, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("aeroglass_favs", JSON.stringify(favorites));
    }
  }, [favorites, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("aeroglass_viewed", JSON.stringify(viewed));
    }
  }, [viewed, mounted]);

  const addToCart = useCallback((newItem: Omit<CartItem, "quantity">) => {
    const exists = cart.some((item) => item.id === newItem.id);

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === newItem.id);
      if (existingIndex > -1) {
        return prev.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...newItem, quantity: 1 }];
      }
    });

    if (exists) {
      toast.success(`Đã tăng số lượng ${newItem.name} trong giỏ hàng.`);
    } else {
      toast.success(`Đã thêm ${newItem.name} vào giỏ hàng.`);
    }
  }, [cart]);

  const removeFromCart = useCallback((id: string) => {
    const item = cart.find((i) => i.id === id);
    if (!item) return;

    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.info(`Đã xóa ${item.name} khỏi giỏ hàng.`);
  }, [cart]);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  }, [removeFromCart]);

  const clearCart = useCallback((options?: { silent?: boolean }) => {
    setCart([]);
    if (!options?.silent) {
      toast.info("Đã làm trống giỏ hàng");
    }
  }, []);

  const toggleFavorite = useCallback((productId: string) => {
    const isFav = favorites.includes(productId);

    setFavorites((prev) => {
      if (isFav) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });

    if (isFav) {
      toast.info("Đã xoá khỏi mục yêu thích");
    } else {
      toast.success("Đã thêm vào mục yêu thích ❤️");
    }
  }, [favorites]);

  const addToViewed = useCallback((productId: string) => {
    setViewed((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, 5); // Keep last 5 viewed items
    });
  }, []);

  const cartCount = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((total, item) => total + item.price * item.quantity, 0), [cart]);

  const contextValue = useMemo(() => ({
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
    clearCart,
    toggleFavorite,
    addToViewed,
    cartCount,
    cartTotal,
  }), [
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
    clearCart,
    toggleFavorite,
    addToViewed,
    cartCount,
    cartTotal
  ]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
