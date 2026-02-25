"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./TrendingSection.module.css";
import AuthModal from "../auth/AuthModal"; // adjust path if needed

type Mode = "login" | "register" | "forgot-password";

export default function TrendingSection() {
  const router = useRouter();

  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<Mode>("login");

  const targetDate = new Date("2026-03-01T23:59:59").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // 🔐 Require Auth Helper
  const requireAuth = (callback?: () => void) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAuthMode("login");
      setAuthOpen(true);
    } else {
      callback?.();
    }
  };

  // ⏳ Countdown
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor(
          (distance % (1000 * 60 * 60)) / (1000 * 60)
        ),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <section className="relative w-full h-[40vh] overflow-hidden">

 {/* VIDEO BACKGROUND */}
<video
  autoPlay
  muted
  loop
  playsInline
  className="absolute inset-0 w-full h-full object-cover object-[center_75%] brightness-75 blur-[2px] scale-105 z-0"
>
  <source src="/videos/sale1.mp4" type="video/mp4" />
</video>

{/* LUXURY GRADIENT OVERLAY */}
<div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-[1]" />

  <div className="relative z-[2] h-full flex flex-col justify-center items-center text-white text-center px-4">

  {/* TOP TEXT */}
  <p className="text-lg md:text-xl font-medium tracking-wide mb-6 drop-shadow-lg">
    This week only • Ends 9/25
  </p>

  {/* COUNTDOWN */}
  <div className="flex gap-10 mb-8 backdrop-blur-sm bg-white/10 px-8 py-6 rounded-2xl border border-white/20">

    <div className="flex flex-col items-center">
      <h3 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
        {timeLeft.days}
      </h3>
      <span className="text-xs uppercase tracking-widest opacity-80 mt-1">
        Days
      </span>
    </div>

    <div className="flex flex-col items-center">
      <h3 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
        {timeLeft.hours}
      </h3>
      <span className="text-xs uppercase tracking-widest opacity-80 mt-1">
        Hours
      </span>
    </div>

    <div className="flex flex-col items-center">
      <h3 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
        {timeLeft.minutes}
      </h3>
      <span className="text-xs uppercase tracking-widest opacity-80 mt-1">
        Minutes
      </span>
    </div>

    <div className="flex flex-col items-center">
      <h3 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
        {timeLeft.seconds}
      </h3>
      <span className="text-xs uppercase tracking-widest opacity-80 mt-1">
        Seconds
      </span>
    </div>

  </div>

  {/* BUTTON */}
  <button
    className="px-10 py-4 bg-white text-black rounded-full font-semibold shadow-lg hover:bg-[#f0f0f0] transition transform hover:-translate-y-1"
    onClick={() => router.push("/?auth=login")}
  >
    Get it now
  </button>
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
