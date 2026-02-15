"use client";

import { useEffect, useState } from "react";
import {
  CategorySection,
  HeroSection,
  OfferBanner,
  FeatureSection,
  TrendingSection,
  LuxuryShowcase,
} from "./components/landing";

export default function Home() {
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    setShowAd(true);
  }, []);

  return (
    <>
      {/* 🔥 AD POPUP */}
      {showAd && (
        <div className="ad-overlay">
          <div className="ad-modal">
            <button
              className="close-ad"
              onClick={() => setShowAd(false)}
            >
              ✕
            </button>

            <img
              src="/images/ad-banner.jpg"
              alt="Special Offer"
              className="ad-image"
            />

            <div className="ad-content">
              <h2>Flat 20% OFF</h2>
              <p>Use code: NAAYU20</p>
              <button
                className="shop-now-btn"
                onClick={() => setShowAd(false)}
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔥 YOUR NORMAL LANDING SECTIONS */}
      <HeroSection />
      <CategorySection />
      <OfferBanner />
      <FeatureSection />
      <TrendingSection />
      <LuxuryShowcase />
    </>
  );
}
