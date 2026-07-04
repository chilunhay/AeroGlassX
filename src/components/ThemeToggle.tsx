"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for mounting on client
  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 0);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10 rounded-xl bg-muted/20" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden border border-border/40 glassmorphism hover:bg-muted/10 transition-colors cursor-pointer group"
      aria-label="Thay đổi giao diện"
    >
      <motion.div
        initial={false}
        animate={{ y: isDark ? 0 : 30, opacity: isDark ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="absolute"
      >
        <Moon className="w-5 h-5 text-neon-purple group-hover:scale-110 transition-transform" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ y: isDark ? -30 : 0, opacity: isDark ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="absolute"
      >
        <Sun className="w-5 h-5 text-yellow-500 group-hover:rotate-45 transition-transform" />
      </motion.div>
    </button>
  );
}
