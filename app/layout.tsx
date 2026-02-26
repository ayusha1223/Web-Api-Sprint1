import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

import { ShopProvider } from "./context/ShopContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/UserContext";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
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
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          ${playfair.variable}
          
          min-h-screen
          bg-white text-black
          dark:bg-black dark:text-white
          
          transition-colors duration-300
          antialiased
        `}
      >
        <ThemeProvider>
          <UserProvider>
          <ShopProvider>
            {children}
          </ShopProvider>
          </UserProvider>
        </ThemeProvider>

        <Toaster position="top-right" />
      </body>
    </html>
  );
}