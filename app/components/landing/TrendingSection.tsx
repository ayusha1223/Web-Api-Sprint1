"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./TrendingSection.module.css";
import { useEffect, useState } from "react";

export default function TrendingSection() {
  /* ================= COUNTDOWN LOGIC ================= */
 const targetDate = new Date("2026-03-01T23:59:59").getTime();


  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
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
    <>      {/* ================= PROMO BANNER ================= */}
      <section className={styles.promoBanner}>
        <div className={styles.promoInner}>
          {/* LEFT IMAGE */}
          <div className={styles.promoImage}>
            <Image
              src="/images/promo-model.jpg"
              alt="Weekly Offer"
              fill
              className={styles.promoImg}
            />
          </div>

          {/* RIGHT CONTENT */}
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

            <Link href="/shop">
              <button className={styles.promoBtn}>
                Get it now
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}