"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./TrendingSection.module.css";
import { useEffect, useState } from "react";

const trendingProducts = [
  {
    title: "Premium Kurtha",
    image: "/images/kurtha10.jpg",
    slug: "premium-kurtha-10",
  },
  {
    title: "Premium Kurtha",
    image: "/images/kurtha2.jpg",
    slug: "premium-kurtha-2",
  },
  {
    title: "Premium Kurtha",
    image: "/images/kurtha12.jpg",
    slug: "premium-kurtha-12",
  },
  {
    title: "Premium Kurtha",
    image: "/images/kurtha8.jpg",
    slug: "premium-kurtha-8",
  },
  {
    title: "Premium Kurtha",
    image: "/images/kurtha7.jpg",
    slug: "premium-kurtha-7",
  },
  {
    title: "Premium Kurtha",
    image: "/images/kurtha5.jpg",
    slug: "premium-kurtha-5",
  },
  {
    title: "Premium Kurtha",
    image: "/images/kurtha6.jpg",
    slug: "premium-kurtha-6",
  },
  {
    title: "Premium Kurtha",
    image: "/images/kurtha9.jpg",
    slug: "premium-kurtha-9",
  },
];

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
    <>
      {/* ================= TRENDING SECTION ================= */}
      <section className="trending">
        <h2 className="trending-title">Trending This Season</h2>

        <div className="trending-slider">
          {trendingProducts.map((item) => (
            <Link
              href={`/product/${item.slug}`}
              key={item.slug}
              className="trending-card"
            >
              <div className="trending-image">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="trending-img"
                />

                <div className="trending-overlay">
                  <h3>{item.title}</h3>
                  <span className="explore-btn">View Product</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= PROMO BANNER ================= */}
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
