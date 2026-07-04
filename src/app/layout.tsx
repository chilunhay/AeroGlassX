import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "sonner";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AeroGlass X | Kính Thực Tế Không Gian Thế Hệ Mới",
  description: "Khám phá tương lai của công nghệ không gian. Trải nghiệm màn hình 8K Micro-OLED siêu nét, điều khiển bằng cử chỉ tay và ánh mắt cực nhạy trên thiết bị kính thông minh cao cấp nhất.",
  metadataBase: new URL("https://aeroglass-x.vercel.app"),
  openGraph: {
    title: "AeroGlass X | Kính Thực Tế Không Gian Thế Hệ Mới",
    description: "Khám phá tương lai của công nghệ không gian. Trải nghiệm màn hình 8K Micro-OLED siêu nét, điều khiển bằng cử chỉ tay và ánh mắt cực nhạy.",
    url: "https://aeroglass-x.vercel.app",
    siteName: "AeroGlass X",
    images: [
      {
        url: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "AeroGlass X Holographic Visualization",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AeroGlass X | Kính Thực Tế Không Gian Thế Hệ Mới",
    description: "Khám phá tương lai của công nghệ không gian với màn hình 8K Micro-OLED siêu sắc nét.",
    images: ["https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=1200&auto=format&fit=crop"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${plusJakartaSans.variable} ${outfit.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <CartProvider>
            {children}
            <Toaster position="bottom-right" richColors theme="dark" />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
