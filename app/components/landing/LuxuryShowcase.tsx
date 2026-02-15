import Image from "next/image";
import "./luxury.css";

export default function LuxuryShowcase() {
  return (
    <section className="luxury">

      {/* ===== TOP 3 IMAGES ===== */}
      <div className="luxury-top">
        <div className="luxury-side">
          <Image
            src="/images/landing/landing5.png"
            alt="Left"
            fill
            className="luxury-img"
          />
        </div>

        <div className="luxury-center">
          <Image
            src="/images/landing/landing6.png"
            alt="Center"
            fill
            className="luxury-img"
          />
        </div>

        <div className="luxury-side">
          <Image
            src="/images/landing/landing7.png"
            alt="Right"
            fill
            className="luxury-img"
          />
        </div>
      </div>

      <div className="divider" />

      {/* ===== FEATURED COLLECTIONS ===== */}
      <div className="luxury-header">
        <h3>FEATURED COLLECTIONS</h3>
        <span>New Arrivals</span>
      </div>

      <div className="luxury-grid">
        {[
          { img: "/images/landing/landing1.png", title: "Handwoven Silk " },
          { img: "/images/landing/landing2.png", title: "Maroon Designer Drape" },
          { img: "/images/landing/landing3.png", title: "Red Heritage Classic" },
          { img: "/images/landing/landing4.png", title: "Golden Festive Edit" },
        ].map((item, i) => (
          <div key={i} className="luxury-card">
            <Image
              src={item.img}
              alt={item.title}
              fill
              className="luxury-img"
            />
            <div className="luxury-overlay">
              <span>{item.title}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
