"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import AuthModal from "../auth/AuthModal";
import { Menu, X } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function Navbar() {
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState<"login" | "register" | "forgot-password">("login");
  const [mobileOpen, setMobileOpen] = useState(false);
  const searchParams = useSearchParams();

  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  useEffect(() => {
  if (searchParams.get("auth") === "login") {
    setMode("login");
    setOpenModal(true);
  }
}, [searchParams]);

  const navLinks = [
    { name: "Home", href: isDashboard ? "/dashboard" : "/" },
    { name: "About", href: isDashboard ? "/dashboard/about" : "/about" },
    { name: "Contact", href: isDashboard ? "/dashboard/contact" : "/contact" },
    { name: "Sale", href: isDashboard ? "/dashboard/sale" : "/sale" },
  ];

  
  return (
    <>
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="text-2xl font-bold tracking-wide">
            <span className="text-pink-600">NAAYU</span>{" "}
            <span className="text-black">ATTIRE</span>
          </Link>

          {/* DESKTOP LINKS */}
          <ul className="hidden md:flex gap-10 font-medium text-gray-700">
            {navLinks.map((link) => (
              <li key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className={`transition ${
                    pathname === link.href
                      ? "text-black"
                      : "hover:text-pink-600"
                  }`}
                >
                  {link.name}
                </Link>

                {/* Underline animation */}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-pink-600 transition-all group-hover:w-full"></span>
              </li>
            ))}
          </ul>

          {/* RIGHT SIDE */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => {
                setMode("login");
                setOpenModal(true);
              }}
              className="px-5 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-pink-600 transition"
            >
              Sign In
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="flex flex-col items-center py-6 gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium hover:text-pink-600 transition"
                >
                  {link.name}
                </Link>
              ))}

              <button
                onClick={() => {
                  setMode("login");
                  setOpenModal(true);
                  setMobileOpen(false);
                }}
                className="px-6 py-2 rounded-full bg-black text-white hover:bg-pink-600 transition"
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </nav>

      <AuthModal
        open={openModal}
        mode={mode}
        onClose={() => setOpenModal(false)}
        onSwitchMode={(m) => setMode(m)}
      />
    </>
  );
}