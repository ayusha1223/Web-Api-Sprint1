"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import AuthModal from "@/app/components/auth/authmodal";

export default function Navbar() {
  const [open, setOpen] = useState(false);
const [mode, setMode] = useState<"login" | "register" | "forgot-password">("login");

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
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About Us</Link></li>
          <li><Link href="/contact">Contact Us</Link></li>
          <li className="sale-link"><Link href="/sale">Sale</Link></li>
        </ul>

        {/* RIGHT: ACTION BUTTONS */}
        <div className="nav-actions">
          {/* Instead of going to /login, open modal */}
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

          <Link href="/cart" className="cart-btn">Cart</Link>
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
