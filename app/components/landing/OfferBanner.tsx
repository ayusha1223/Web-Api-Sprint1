import Image from "next/image";
import "./OfferBanner.css";

export default function SaleBanner() {
  return (
    <section className="category-section">
      <h2 className="category-title">Shop by Category</h2>

      <div className="category-grid">
        <div className="category-card">
          <Image src="/images/wedding/wedding1.png" alt="Casual" fill />
          <span>Casual Wear</span>
        </div>

        <div className="category-card">
          <Image src="/images/wedding/wedding8.png" alt="Party" fill />
          <span>Party Wear</span>
        </div>

        <div className="category-card">
          <Image src="/images/wedding/wedding4.png" alt="Office" fill />
          <span>Office Wear</span>
        </div>

        <div className="category-card">
          <Image src="/images/wedding/wedding5.png" alt="Wedding" fill />
          <span>Wedding Wear</span>
        </div>
      </div>
    </section>
  );
}
