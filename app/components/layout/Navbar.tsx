"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // ✅ added
import AuthModal from "../auth/AuthModal";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<
    "login" | "register" | "forgot-password"
  >("login");

  const pathname = usePathname(); // ✅ added
  const isDashboard = pathname.startsWith("/dashboard"); // ✅ added

  useEffect(() => {
    console.log("MODAL OPEN:", open);
  }, [open]);

  return (
    <>
      <nav className="navbar">
        {/* LEFT: LOGO */}
        <div className="nav-logo">
          <Link href="/" className="brand-logo">
            NAAYU<span>Attire</span>
          </Link>
        </div>

        {/* CENTER: NAV LINKS */}
        <ul className="nav-links">
          <li>
            <Link href={isDashboard ? "/dashboard" : "/"}>
              Home
            </Link>
          </li>

          <li>
            <Link
              href={isDashboard ? "/dashboard/about" : "/about"}
            >
              About Us
            </Link>
          </li>

          <li>
            <Link
              href={isDashboard ? "/dashboard/contact" : "/contact"}
            >
              Contact Us
            </Link>
          </li>

          <li>
            <Link
              href={isDashboard ? "/dashboard/sale" : "/sale"}
            >
              Sale
            </Link>
          </li>
        </ul>

        {/* RIGHT: ACTION BUTTONS */}
        <div className="nav-actions">
          <button
            className="login-btn"
            onClick={() => {
              setMode("login");
              setOpen(true);
            }}
            type="button"
          >
            Login
          </button>
        </div>
      </nav>

      <AuthModal
        open={open}
        mode={mode}
        onClose={() => setOpen(false)}
        onSwitchMode={(m) => setMode(m)}
      />
    </>
  );
}
