"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AuthModal from "../auth/AuthModal"; // adjust path
import "./feature.css";

type Mode = "login" | "register" | "forgot-password";

export default function FeatureSection() {
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
      <section className="popular">
        <div className="popular-header">
          <div>
            <span className="popular-sub">POPULAR</span>
            <h2>Our Popular Kurthas</h2>
          </div>

          <button
            className="explore-link"
            onClick={() =>
              requireAuth(() => router.push("/shop"))
            }
          >
            Explore All →
          </button>
        </div>

        <div className="popular-grid">
          {/* CARD 1 */}
          <div className="popular-card">
            <div className="card-image">
              <Image
                src="/images/kurtha1.jpg"
                alt="Kurtha"
                fill
                className="img"
              />
            </div>

            <div className="card-content">
              <h3>Premium Cotton Kurtha</h3>
              <p>Handcrafted • Soft Fabric • Elegant Fit</p>

              <div className="card-bottom">
                <button
                  onClick={() =>
                    requireAuth(() => router.push("/shop"))
                  }
                >
                  Shop Now
                </button>
                <span>Rs 1,500</span>
              </div>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="popular-card">
            <div className="card-image">
              <Image
                src="/images/kurtha2.jpg"
                alt="Kurtha"
                fill
                className="img"
              />
            </div>

            <div className="card-content">
              <h3>Festive Collection Kurtha</h3>
              <p>Luxury Embroidery • Premium Stitch</p>

              <div className="card-bottom">
                <button
                  onClick={() =>
                    requireAuth(() => router.push("/shop"))
                  }
                >
                  Shop Now
                </button>
                <span>Rs 1,800</span>
              </div>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="popular-card">
            <div className="card-image">
              <Image
                src="/images/kurtha3.jpg"
                alt="Kurtha"
                fill
                className="img"
              />
            </div>

            <div className="card-content">
              <h3>Minimal Everyday Kurtha</h3>
              <p>Comfort Wear • Modern Cut</p>

              <div className="card-bottom">
                <button
                  onClick={() =>
                    requireAuth(() => router.push("/shop"))
                  }
                >
                  Shop Now
                </button>
                <span>Rs 3,200</span>
              </div>
            </div>
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
