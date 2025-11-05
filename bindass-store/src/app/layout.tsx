import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { RootClient } from "@/components/layout/root-client";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bindass Store",
  description:
    "Shop the latest drops across fashion, tech, beauty, home, and more. Curated collections for the modern shopper.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} bg-white text-[var(--foreground)]`}>
        <Providers>
          <RootClient>{children}</RootClient>
        </Providers>
      </body>
    </html>
  );
}
