import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { CartProvider } from "@/lib/contexts/cart-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chocolate Drop",
  description:
    "ChocolateDrop is a ecommerce plataform to sell chocolates online and the presentational website for the brand.",
  keywords: ["Chocolates", "Brigadeiros", "Postres"],
  openGraph: {
    type: "website",
    siteName: "Chocolate Drop",
    locale: "es_MEX",
    url: "https://shadcn-landing-page.vercel.app",
    title: "Chocolate Drop",
    description:
      "ChocolateDrop is a ecommerce plataform to sell chocolates online and the presentational website for the brand.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Chocolate Drop",
      },
    ],
  },
  authors: [
    {
      name: "Vicente Cantú",
      // url: "https://shadcnui-blocks.com",
    },
  ],
  creator: "Vicente Cantú",
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
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CartProvider>{children}</CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
