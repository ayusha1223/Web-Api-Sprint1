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
      <section className={styles.promoBanner}>
        {/* VIDEO BACKGROUND */}
        <video
          className={styles.promoVideo}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/sale1.mp4" type="video/mp4" />
        </video>

        {/* DARK OVERLAY */}
        <div className={styles.overlay} />

        {/* CONTENT */}
        <div className={styles.promoContent}>
          <p className={styles.promoSmall}>
            This week only! Ends 9/25.
          </p>

          <div className={styles.promoTimer}>
            <div>
              <h3>{timeLeft.days}</h3>
              <span>Days</span>
            </div>
            <div>
              <h3>{timeLeft.hours}</h3>
              <span>Hours</span>
            </div>
            <div>
              <h3>{timeLeft.minutes}</h3>
              <span>Minutes</span>
            </div>
            <div>
              <h3>{timeLeft.seconds}</h3>
              <span>Seconds</span>
            </div>
          </div>

          <button
            className={styles.promoBtn}
            onClick={() =>
              requireAuth(() => router.push("/shop"))
            }
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
