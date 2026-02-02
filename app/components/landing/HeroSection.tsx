import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="hero">
      {/* Background Video */}
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Fallback Image */}
      <Image
        src="/images/hero1.jpg"
        alt="Hero"
        fill
        priority
        className="hero-img"
      />

      {/* Overlay */}
      <div className="hero-overlay" />

      {/* Text Content */}
      <div className="hero-content">
        <h1>Elevate Your Kurtha Style</h1>
        <p>Elegant kurthas for every occasion</p>

        <div className="hero-buttons">
          <button className="primary-btn">Shop Now</button>
          <button className="secondary-btn">View Collection</button>
        </div>
      </div>
    </section>
  );
}
