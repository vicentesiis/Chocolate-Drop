import type { Metadata } from "next";

import { ConditionalNavbar } from "@/components/shared";

import "./globals.css";

import { ScrollToTop } from "@/components/shared/scroll-to-top";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/lib/contexts/cart-context";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "next-themes";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  authors: [
    {
      name: "Vicente Cantú",
      // url: "https://shadcnui-blocks.com",
    },
  ],
  creator: "Vicente Cantú",
  description: "ChocolateDrop!.",
  icons: [
    {
      rel: "icon",
      url: "/logo.png",
    },
    {
      rel: "apple-touch-icon",
      url: "/logo.png",
    },
  ],
  keywords: ["Chocolates", "Brigadeiros", "Postres"],
  manifest: "/site.webmanifest",
  robots: {
    follow: true,
    index: true,
  },
  title: "Chocolate Drop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${poppins.className}
          antialiased
        `}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CartProvider>
            <ScrollToTop />
            <ConditionalNavbar />
            {children}
            <Toaster />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
