import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Navbar, Footer } from "./components/layout";
import { ShopProvider } from "./context/ShopContext";
import GlobalToast from "./components/ui/GlobalToast"; // 👈 ADD THIS

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KurthaBuy",
  description: "Elegant kurthas for every occasion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ShopProvider>

          {/* 🔥 GLOBAL TOAST (VERY IMPORTANT) */}
          <GlobalToast />

          {/* GLOBAL NAVBAR */}
          <Navbar />

          {/* PAGE CONTENT */}
          <main>{children}</main>

          {/* GLOBAL FOOTER */}
          <Footer />

        </ShopProvider>
      </body>
    </html>
  );
}
