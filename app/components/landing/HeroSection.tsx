"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthModal from "../auth/AuthModal"; // adjust path if needed
import Image from "next/image";

type Mode = "login" | "register" | "forgot-password";

export default function HeroSection() {
  const router = useRouter();

  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<Mode>("login");

  const requireAuth = (callback?: () => void) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAuthMode("login");
      setAuthOpen(true);
    } else {
      callback?.();
    }
  };

  return (
    <>
      <section className="hero">
        {/* Background Video */}
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        {/* Overlay */}
        <div className="hero-overlay" />

        {/* Text Content */}
        <div className="hero-content">
          <h1>Elevate Your Kurtha Style</h1>
          <p>Elegant kurthas for every occasion</p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() =>
                requireAuth(() => router.push("/shop"))
              }
            >
              Shop Now
            </button>

            <button
              className="secondary-btn"
              onClick={() =>
                requireAuth(() => router.push("/shop"))
              }
            >
              View Collection
            </button>
          </div>
        </div>
      </section>

      {/* AUTH MODAL */}
      <AuthModal
        open={authOpen}
        mode={authMode}
        onClose={() => setAuthOpen(false)}
        onSwitchMode={(m) => setAuthMode(m)}
      />
    </>
  );
}
