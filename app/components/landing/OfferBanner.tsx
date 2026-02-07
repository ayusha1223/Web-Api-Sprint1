import Image from "next/image";
import "./OfferBanner.css";

export default function SaleBanner() {
  return (
    <section className="launch-banner">
      <div className="launch-container">
        {/* LEFT CONTENT */}
        <div className="launch-text">
          <span className="launch-tag">JUST LAUNCHED</span>
          <h2>SUMMER 2025</h2>

          <p>
            Discover elegant silhouettes designed for warm days and timeless
            style. Crafted with care, inspired by modern femininity.
          </p>

          <button className="launch-btn">SHOP NOW</button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="launch-image">
  <div className="image-row">
    <div className="image-card">
      <Image
        src="/images/model.png"
        alt="Model"
        fill
        className="launch-img"
      />
    </div>
  </div>
</div>

      </div>
    </section>
  );
}
