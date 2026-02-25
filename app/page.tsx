"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  CategorySection,
  HeroSection,
  OfferBanner,
  FeatureSection,
  TrendingSection,
  LuxuryShowcase,
  PerfectMatchSection,
} from "./components/landing";

import { Footer } from "./components/layout";
import { Navbar } from "./components/layout";

export default function Home() {
  const [showAd, setShowAd] = useState(false);
  const router = useRouter(); // ✅ CORRECT PLACE (inside component)

  useEffect(() => {
    setShowAd(true);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* Add spacing because Navbar is fixed */}
      <div className="pt-20"></div>

      {/* AD POPUP */}
      {showAd && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] px-4">
          <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl max-w-md w-full">

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setShowAd(false)}
              className="absolute top-3 right-3 bg-white text-black w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition"
            >
              ✕
            </button>

            {/* IMAGE */}
            <img
              src="/images/ad-banner.jpg"
              alt="Special Offer"
              className="w-full h-70 object-cover"
            />

            {/* CONTENT */}
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold mb-2">
                Flat <span className="text-pink-600">20% OFF</span>
              </h2>

              <p className="text-gray-600 mb-4">
                Use code: <strong>NAAYU20</strong>
              </p>

             <button
  onClick={() => {
    setShowAd(false);
    router.push("/?auth=login");
  }}
  className="bg-black hover:bg-pink-600 text-white px-6 py-2 rounded-full transition"
>
  Shop Now
</button>
            </div>

          </div>
        </div>
      )}

      {/* LANDING SECTIONS */}
      <HeroSection />
      <CategorySection />
      <OfferBanner />
      <FeatureSection />
      <TrendingSection />
      <LuxuryShowcase />
      <PerfectMatchSection />

      {/* FOOTER */}
      <Footer />
    </>
  );
}