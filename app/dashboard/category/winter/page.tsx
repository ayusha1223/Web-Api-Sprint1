"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import "../../dashboard.css";
import styles from "../../CategoryGrid.module.css";

import { useShop } from "../../../context/ShopContext";

import TryOnViewer from "../../../components/TryOnViewer";
import { winterProducts } from "../../data/winter";

export default function WinterPage() {
  const { favorites, toggleFavorite, addToCart } = useShop();
  const router = useRouter();

  /* ================= STATES ================= */
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [priceRange, setPriceRange] = useState(5000);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [showTryOn, setShowTryOn] = useState(false);

  /* ================= FILTER ================= */
  const filteredProducts = winterProducts
    .filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((p) => {
      if (p.price > priceRange) return false;
      if (selectedColor && p.color !== selectedColor) return false;
      return true;
    });

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">

        {/* ================= TOP BAR ================= */}
        <div className="topBar">
          <div className="topSearch">
            <div className="searchWrapper">
              <span className="searchIcon">🔍</span>
              <input
                type="text"
                className="searchInput"
                placeholder="Search winter wear..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="filterIcon">⚙️</span>
            </div>
          </div>

          <div className="topRight">
            <span className="icon" onClick={() => setShowTryOn(true)}>👗</span>
            <Link href="/favorites" className="icon">♡</Link>
            <Link href="/cart" className="icon">🛒</Link>
            <Link href="/user/profile" className="icon">👤</Link>
          </div>
        </div>

        <div className="dashboard-layout">

          {/* ================= SIDEBAR ================= */}
          <aside className="sidebar">
            <div className="sidebar-logo">
              <Image
                src="/images/logo.png"
                alt="Naayu Attire"
                width={120}
                height={50}
                priority
              />
            </div>

            <h3>Categories</h3>
            <ul>
              <li><Link href="/dashboard">Home</Link></li>
              <li><Link href="/dashboard/category/casual">Casual Wear</Link></li>
              <li><Link href="/dashboard/category/coord">Co-ord Set</Link></li>
              <li><Link href="/dashboard/category/party">Party Wear</Link></li>
              <li className="active"><Link href="/dashboard/category/winter">Winter Wear</Link></li>
              <li><Link href="/dashboard/category/wedding">Wedding Wear</Link></li>
              <li><Link href="/dashboard/category/onepiece">1 Piece Set</Link></li>
            </ul>

            {/* ===== OLD PRICE INPUTS (KEPT) ===== */}
            <h3 style={{ marginTop: 24 }}>Filter by Price</h3>
            <div className="priceFilter">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) =>
                  setMinPrice(e.target.value === "" ? "" : Number(e.target.value))
                }
              />
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))
                }
              />
            </div>

            {/* ===== PRICE SLIDER ===== */}
            <div className="priceSliderBox">
              <input
                type="range"
                min={500}
                max={5000}
                step={100}
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="priceSlider"
              />
              <div className="priceRangeText">
                ₹500 – ₹{priceRange.toLocaleString()}
              </div>
            </div>

            {/* ===== COLOR FILTER ===== */}
            <h3 style={{ marginTop: 24 }}>Choose by Color</h3>

            <div className="colorFilterVertical">
              {[
                "black",
                "white",
                "red",
                "blue",
                "green",
                "pink",
                "yellow",
                "brown",
                "maroon",
                "orange",
              ].map((color) => (
                <div
                  key={color}
                  className={`colorRow ${selectedColor === color ? "active" : ""}`}
                  onClick={() =>
                    setSelectedColor(selectedColor === color ? null : color)
                  }
                >
                  <span
                    className="colorDot"
                    style={{
                      backgroundColor: color === "white" ? "#fff" : color,
                      border: color === "white" ? "1.5px solid #ccc" : undefined,
                    }}
                  />
                  <span className="colorName">
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </aside>

          {/* ================= MAIN ================= */}
          <main>
            <h2 className="pickTitle">Winter Wear</h2>

            <div className={styles.categoryGrid}>
              {filteredProducts.map((p) => (
                <div key={p.id} className={styles.categoryCard}>

                  <div
  className={styles.categoryImage}
  onClick={() => router.push(`/product/${p.slug}`)}
  style={{ cursor: "pointer" }}
>
  <img src={p.image} alt={p.title} />
</div>


                  <div className={styles.categoryInfo}>
                    <div className={styles.categoryTag}>WINTER</div>
                    <div className={styles.categoryTitle}>{p.title}</div>

                    <div className={styles.categoryActions}>
                      <div>
                        <span className={styles.price}>₹{p.price}</span>
                        <span className={styles.oldPrice}>₹{p.oldPrice}</span>
                        <span className={styles.discount}>{p.discount}</span>
                      </div>

                      <div style={{ display: "flex", gap: 10 }}>
                        <div
                          className={styles.wishlistIcon}
                          onClick={() => toggleFavorite(p.image)}
                        >
                          {favorites.includes(p.image) ? "❤️" : "🤍"}
                        </div>

                        <button
                          className={styles.cartBtn}
                          onClick={() => addToCart(p.image)}
                        >
                          🛒
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </main>
        </div>

        {/* ================= TRY ON ================= */}
        {showTryOn && (
          <div className="tryonOverlay">
            <div className="tryonModal">
              <button
                className="closeTryon"
                onClick={() => setShowTryOn(false)}
              >
                ✕
              </button>
              <TryOnViewer />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
