export default function SaleBanner() {
  return (
    <section className="sale-banner">
      {/* Video Background */}
      <video
        className="sale-video"
        src="/videos/sale-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dark overlay */}
      <div className="sale-overlay"></div>

      {/* Content */}
      <div className="sale-content">
        <h2>Flat 30% OFF</h2>
        <p>On selected kurthas this season</p>
        <button className="sale-btn">Shop Offers</button>
      </div>
    </section>
  );
}
