import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { CartProvider } from "@/lib/contexts/cart-context";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
      <body
        className={`
          ${poppins.className}
          antialiased
        `}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CartProvider>
            {children}
            <Toaster />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
