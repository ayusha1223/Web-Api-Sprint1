import Image from "next/image";
import "./feature.css";

export default function FeatureSection() {
  return (
    <section className="popular">
      <div className="popular-header">
        <div>
          <span className="popular-sub">POPULAR</span>
          <h2>Our Popular Kurthas</h2>
        </div>

        <a href="/shop" className="explore-link">
          Explore All →
        </a>
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
              <button>Shop Now</button>
              <span>Rs 4,500</span>
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
              <button>Shop Now</button>
              <span>Rs 6,800</span>
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
              <button>Shop Now</button>
              <span>Rs 3,200</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
