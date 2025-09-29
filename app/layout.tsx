import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chocolate Drop",
  description:
    "ChocolateDrop is a ecommerce plataform to sell chocolates online and the presentational website for the brand.",
  keywords: [
    "Chocolates",
    "Brigadeiros",
    "Postres"
  ],
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
        url: "/og-image.jpg",
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
      url: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      url: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/favicon-32x32.png",
      sizes: "32x32",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/favicon-16x16.png",
      sizes: "16x16",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/android-chrome-192x192.png",
      sizes: "192x192",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/android-chrome-512x512.png",
      sizes: "512x512",
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
