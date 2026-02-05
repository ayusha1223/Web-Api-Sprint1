"use client";

import "./dashboard.css";
import Image from "next/image";
import Link from "next/link";
import { useShop } from "../context/ShopContext";
import { useState } from "react";



export default function Dashboard() {
  const { favorites, toggleFavorite, addToCart } = useShop();

  const [activeCategory, setActiveCategory] = useState<
    "home" | "casual" | "coord" | "party" | "winter" | "wedding" | "onepiece"
  >("home");

  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">

        {/* ===== TOP BAR ===== */}
        <div className="topBar">
          <div className="topSearch">
            <div className="searchWrapper">
              <span className="searchIcon">🔍</span>
              <input
  type="text"
  placeholder="Search for dresses, co-ord sets, party wear..."
  className="searchInput"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>

              <span className="filterIcon">⚙️</span>
            </div>
          </div>

          <div className="topRight">
            <Link href="/favorites" className="icon">♡</Link>
            <Link href="/cart" className="icon">🛒</Link>
            <Link href="/user/profile" className="icon">👤</Link>
          </div>
        </div>

        <div className="dashboard-layout">

          {/* ===== SIDEBAR ===== */}
          <aside className="sidebar">
            <div
              className="sidebar-logo"
              onClick={() => setActiveCategory("home")}
              style={{ cursor: "pointer" }}
            >
              <Image
                src="/images/logo.png"
                alt="Naayu Attire Logo"
                width={130}
                height={50}
                priority
              />
            </div>

            <h3>Categories</h3>
            <ul>
              <li className={activeCategory === "home" ? "active" : ""} onClick={() => setActiveCategory("home")}>Home</li>
              <li className={activeCategory === "casual" ? "active" : ""} onClick={() => setActiveCategory("casual")}>Casual Wear</li>
              <li className={activeCategory === "coord" ? "active" : ""} onClick={() => setActiveCategory("coord")}>Co-ord Set</li>
              <li className={activeCategory === "party" ? "active" : ""} onClick={() => setActiveCategory("party")}>Party Wear</li>
              <li className={activeCategory === "winter" ? "active" : ""} onClick={() => setActiveCategory("winter")}>Winter Wear</li>
              <li className={activeCategory === "wedding" ? "active" : ""} onClick={() => setActiveCategory("wedding")}>Wedding Wear</li>
              <li className={activeCategory === "onepiece" ? "active" : ""} onClick={() => setActiveCategory("onepiece")}>1 Piece Set</li>
            </ul>

            <h3 style={{ marginTop: "24px" }}>Filter by Price</h3>
            <div className="priceFilter">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value === "" ? "" : Number(e.target.value))}
              />
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
              />
            </div>
          </aside>

          {/* ===== MAIN CONTENT ===== */}
          <main>

            {/* ================= HOME ================= */}
            {activeCategory === "home" && (
              <>
                {/* PROMO ROW */}
                <div className="promo-row">
                  <div className="banner banner-extended">
                    <div className="banner-text">
                      <h1>BIG SALE!</h1>
                      <p>Trending fashion collections</p>
                      <button>Shop Now</button>
                    </div>
                    <div className="banner-image">
                      <Image src="/images/banner.png" alt="Sale model" fill className="banner-img" priority />
                    </div>
                  </div>

                  <div className="deal-card">
                    <div className="deal-text">
                      <h4>Great Value Deals</h4>
                      <p>Find items on sale<br />With 50–75%</p>
                      <span className="deal-badge">75% off</span>
                    </div>
                    <div className="deal-image">
                      <Image src="/images/deal.png" alt="Deal product" fill className="deal-img" />
                    </div>
                  </div>

                  <div className="promo-box promo-discount">
                    <h4>Get up to <span>20%</span></h4>
                    <p>OFF Dresses</p>
                  </div>

                  <div className="promo-box promo-new">
                    <h4>New Arrivals</h4>
                    <button>Shop now</button>
                  </div>
                </div>

                {/* SPLIT HERO */}
                <section className="splitHero">
                  <div className="splitHeroLeft"><img src="/images/hero-left.jpg" /></div>
                  <div className="splitHeroRight"><img src="/images/hero-right.jpg" /></div>
                  <div className="heroText">
                    <h1>MOVE.<br />REST.<br />RECOVER.</h1>
                    <p>Discover the drop</p>
                    <button>Shop Now</button>
                  </div>
                </section>

                {/* PICK YOURS NOW */}
                <h2 className="pickTitle">Pick yours now</h2>
                <section className="productListSection">
                  <div className="productGrid">
                    {Array.from({ length: 24 })
  .map((_, i) => {
  const img = `/images/kurtha${(i % 6) + 1}.jpg`;
  const price = 1000 + i * 50;

  return {
    id: i,
    img,
    price,
    name: `Popular kurti ${i + 1}`,
    brand: "FEATURED",
  };
})


  // ✅ SEARCH FILTER
  .filter((product) => {
    if (!searchQuery) return true;
    return product.name.toLowerCase().includes(searchQuery.toLowerCase());
  })

  // ✅ PRICE FILTER
  .filter((product) => {
    if (minPrice !== "" && product.price < minPrice) return false;
    if (maxPrice !== "" && product.price > maxPrice) return false;
    return true;
  })

  // ✅ FINAL RENDER
  .map((product) => {
    const isFav = favorites.includes(product.img);

    return (
      <div className="productCard" key={product.id}>
        <span
          className="wishlist"
          onClick={() => toggleFavorite(product.img)}
        >
          {isFav ? "❤️" : "♡"}
        </span>

        <div className="productImg">
          <img src={product.img} />
        </div>

        <div className="productInfo">
          <p className="brand">{product.brand}</p>
          <p className="name">{product.name}</p>

          <div className="priceRow">
            <span className="price">₹{product.price}</span>
            <span className="off">50% off</span>
          </div>

          <button
            className="addToCartBtn"
            onClick={() => addToCart(product.img)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  })}


                  </div>
                </section>
              </>
            )}

            {activeCategory === "casual" && renderCategory("CASUAL", "Printed Casual Kurti")}
            {activeCategory === "coord" && renderCategory("CO-ORD", "Co-ord Set")}
            {activeCategory === "party" && renderCategory("PARTY", "Party Kurti")}
            {activeCategory === "winter" && renderCategory("WINTER", "Winter Kurti")}
            {activeCategory === "wedding" && renderCategory("WEDDING", "Wedding Kurti")}
            {activeCategory === "onepiece" && renderCategory("ONE PIECE", "One Piece Kurti")}

          </main>
        </div>
      </div>
    </div>
  );

  function renderCategory(brand: string, name: string) {
    return (
      <>
        <h2 className="pickTitle">{brand}</h2>
        <section className="productListSection">
          <div className="productGrid">
            {Array.from({ length: 24 }).map((_, i) => {
              const img = `/images/kurtha${(i % 6) + 1}.jpg`;
              const isFav = favorites.includes(img);

              return (
                <div className="productCard" key={i}>
                  <span className="wishlist" onClick={() => toggleFavorite(img)}>
                    {isFav ? "❤️" : "♡"}
                  </span>

                  <div className="productImg"><img src={img} /></div>

                  <div className="productInfo">
                    <p className="brand">{brand}</p>
                    <p className="name">{name} {i + 1}</p>

                    <div className="priceRow">
                      <span className="price">₹1,499</span>
                      <span className="off">50% off</span>
                    </div>

                    <button className="addToCartBtn" onClick={() => addToCart(img)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </>
    );
  }
}
