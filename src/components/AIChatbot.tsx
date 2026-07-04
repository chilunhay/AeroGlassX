"use client";

import React, { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import the heavy chatbot window and logic
const AIChatbotWindow = dynamic(() => import("./AIChatbotWindow"), {
  ssr: false,
  loading: () => (
    <div className="absolute bottom-16 right-0 w-[calc(100vw-3rem)] sm:w-[340px] md:w-[380px] h-[500px] rounded-3xl border border-border/40 bg-card flex items-center justify-center shadow-2xl">
      <div className="w-6 h-6 border-2 border-neon-purple border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div id="chat" className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      <div className="relative">
        {/* Radar pulse effect when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-neon-purple/40 animate-ping pointer-events-none" />
        )}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-14 h-14 rounded-full flex items-center justify-center cursor-pointer shadow-xl relative border border-white/10 z-10 ${
            isOpen
              ? "bg-hot-pink"
              : "bg-gradient-to-tr from-neon-purple to-electric-cyan glow-purple animate-pulse-glow"
          }`}
          aria-label="Toggle AI Assistant"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <>
              <MessageSquare className="w-6 h-6 text-white" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-hot-pink border-2 border-background rounded-full" />
            </>
          )}
        </motion.button>
      </div>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <AIChatbotWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
