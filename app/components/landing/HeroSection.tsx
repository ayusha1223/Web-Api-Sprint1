"use client";

import { useState } from "react";
import AuthModal from "../auth/AuthModal";

type Mode = "login" | "register" | "forgot-password";

export default function HeroSection() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<Mode>("login");

  const openLogin = () => {
    setAuthMode("login");
    setAuthOpen(true);
  };

  return (
    <>
      <section className="relative h-[75vh] w-full overflow-hidden">

        {/* 🎥 Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* 🌫 Strong Blur + Gradient Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>

        {/* ✨ Soft Radial Glow Behind Text */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70 z-10"></div>

        {/* 📝 Hero Content */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6 text-white">

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg mb-6">
            Elevate Your <span className="text-[#D4AF37]">Kurtha Style</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-10 leading-relaxed">
            Discover elegant kurthas crafted for confidence,
            comfort, and timeless sophistication.
          </p>

          <div className="flex gap-6 flex-wrap justify-center">

            {/* 🔥 Shop Now */}
            <button
              onClick={openLogin}
              className="bg-[#D4AF37] text-black px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:bg-[#e6c865] transition transform hover:-translate-y-1"
            >
              Shop Now
            </button>

            {/* 🔥 View Collection */}
            <button
              onClick={openLogin}
              className="border-2 border-[#D4AF37] text-[#D4AF37] px-8 py-4 text-lg font-semibold rounded-full hover:bg-[#D4AF37] hover:text-black transition"
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