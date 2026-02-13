import "./OfferBanner.css";
import { Home, Building2, Store, Crown, Sparkles } from "lucide-react";

export default function SaleBanner() {
  return (
    <section className="property-types">
      <div className="property-header">
        <span className="property-subtitle">COLLECTION TYPES</span>
        <h2>Explore Kurtha Categories</h2>
      </div>

      <div className="property-grid">
        <div className="property-card">
          <Home size={28} />
          <h3>Casual Wear</h3>
          <p>22 Styles</p>
        </div>

        <div className="property-card">
          <Building2 size={28} />
          <h3>Party Wear</h3>
          <p>32 Styles</p>
        </div>

        <div className="property-card">
          <Store size={28} />
          <h3>Office Wear</h3>
          <p>18 Styles</p>
        </div>

        <div className="property-card">
          <Crown size={28} />
          <h3>Wedding Wear</h3>
          <p>12 Styles</p>
        </div>

        <div className="property-card">
          <Sparkles size={28} />
          <h3>Premium Collection</h3>
          <p>40 Styles</p>
        </div>
      </div>
    </section>
  );
}
