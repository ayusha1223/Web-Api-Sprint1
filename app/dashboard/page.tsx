"use client";

import "./dashboard.css";
import Image from "next/image";
import Link from "next/link";
import { useShop } from "../context/ShopContext";
import { useState } from "react";



const casualWearProducts = [
  {
    id: 1,
    image: "/images/casual-wear/casual1.png",
    name: "Floral Casual Kurti",
    price: 1399,
  },
  {
    id: 2,
    image: "/images/casual-wear/casual2.png",
    name: "Printed Cotton Kurti",
    price: 1499,
  },
  {
    id: 3,
    image: "/images/casual-wear/casual3.png",
    name: "Straight Fit Kurti",
    price: 1399,
  },
  {
    id: 4,
    image: "/images/casual-wear/casual4.png",
    name: "Daily Wear Kurti",
    price: 1299,
  },
  {
    id: 5,
    image: "/images/casual-wear/casual5.png",
    name: "Casual Kurti",
    price: 1599,
  },
   {
    id: 6,
    image: "/images/casual-wear/casual6.png",
    name: "Tee and Pants",
    price: 1699,
  },
   {
    id: 7,
    image: "/images/casual-wear/casual7.png",
    name: "Straight Kurthi",
    price: 1299,
  },
   {
    id: 8,
    image: "/images/casual-wear/casual8.png",
    name: "Red Kurhit",
    price: 1099,
  },
   {
    id: 9,
    image: "/images/casual-wear/casual9.png",
    name: "Straight Kurti",
    price: 1499,
  },
   {
    id: 10,
    image: "/images/casual-wear/casual10.png",
    name: "Yellow Straight Kurthi",
    price: 1299,
  },
   {
    id: 11,
    image: "/images/casual-wear/casual11.png",
    name: "Casual Ethnic Kurti",
    price: 1699,
  },
   {
    id: 12,
    image: "/images/casual-wear/casual12.png",
    name: "Casual Ethnic Kurti",
    price: 1699,
  },
   {
    id: 13,
    image: "/images/casual-wear/casual3.png",
    name: "Casual Ethnic Kurti",
    price: 1699,
  },
   {
    id: 14,
    image: "/images/casual-wear/casual14.png",
    name: "Casual Ethnic Kurti",
    price: 1699,
  },
   {
    id: 15,
    image: "/images/casual-wear/casual15.png",
    name: "Casual Ethnic Kurti",
    price: 1699,
  },
   {
    id: 16,
    image: "/images/casual-wear/casual16.png",
    name: "Casual Ethnic Kurti",
    price: 1699,
  },
   {
    id: 17,
    image: "/images/casual-wear/casual17.png",
    name: "Casual Ethnic Kurti",
    price: 1699,
  },
   {
    id: 18,
    image: "/images/casual-wear/casual18.png",
    name: "Casual Ethnic Kurti",
    price: 1699,
  },
   {
    id: 19,
    image: "/images/casual-wear/casual19.png",
    name: "Casual Ethnic Kurti",
    price: 1699,
  },
   {
    id: 20,
    image: "/images/casual-wear/casual20.png",
    name: "Casual Ethnic Kurti",
    price: 1699,
  },
  
];



export default function Dashboard() {
  const { favorites, toggleFavorite, addToCart } = useShop();

  const [activeCategory, setActiveCategory] = useState<
    "home" | "casual" | "coord" | "party" | "winter" | "wedding" | "onepiece"
  >("home");

  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCartToast, setShowCartToast] = useState(false);
 const [showTryOn, setShowTryOn] = useState(false);
  const [tryOnIndex, setTryOnIndex] = useState(0);

  const tryOnDresses = [
  {
    src: "/images/dresses/dress-8.png",
    top: 123,      // where neckline should start
    width: 260,
    offsetX: 10,
       // controls slimness
  },
  {
    src: "/images/dresses/dress-15.png",
    top: -10,
    width: 350,
  },
  {
    src: "/images/dresses/dress-10.png",
    top: 30,
    width: 265,
    offsetX: -8,
  },
  {
    src: "/images/dresses/dress-11.png",
    top: 122,
    width: 245,
    offsetX: -3,
  },
  {
    src: "/images/dresses/dress-12.png",
    top: 123,      // long dress → push down
    width: 245, 
    offsetX: -5,  // slimmer
  },
  {
    src: "/images/dresses/dress-13.png",
    top: 100,
    width: 200,
  },
  {
    src: "/images/dresses/dress-14.png",
    top: 116,
    width: 290,
    offsetX: -5,
  },
];



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
            <span
              className="icon"
              style={{ cursor: "pointer" }}
              onClick={() => setShowTryOn(true)}
              title="Try On"
            >
              👗
            </span>
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
  className="wishlistIcon"
  onClick={() => toggleFavorite(product.img)}
>
  {favorites.includes(product.img) ? "❤️" : "♡"}
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
  className="cartIconBtn"
  onClick={() => {
    addToCart(product.img);
    setShowCartToast(true);

    setTimeout(() => {
      setShowCartToast(false);
    }, 2000);
  }}
>
  🛒
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
         {showCartToast && (
        <div className="cartToastOverlay">
          <div className="cartToast">
            ✅ Added to cart successfully
          </div>
        </div>
      )}
              {showTryOn && (
  <div className="tryonOverlay">
    <div className="tryonModal">
      <button
        className="closeTryon"
        onClick={() => setShowTryOn(false)}
      >
        ✕
      </button>

      <h2>Select Kurtha</h2>

      <div
        style={{
          position: "relative",
          width: 300,
          height: 520,
          margin: "auto",
          cursor: "pointer",
        }}
      >
        {/* BODY IMAGE */}
        <Image
          src="/images/body1.png"
          alt="Body"
          fill
          style={{
            objectFit: "contain",
            zIndex: 1,
          }}
        />

        {/* DRESS IMAGE (PER-IMAGE ADJUSTMENT) */}
  {/* DRESS IMAGE (WIDTH + TOP ANCHOR FIX) */}
 <div
  style={{
    position: "absolute",
    top: `${tryOnDresses[tryOnIndex].top}px`,
    left: "50%",
    transform: `translateX(calc(-50% + ${tryOnDresses[tryOnIndex].offsetX || 0}px))`,
    width: `${tryOnDresses[tryOnIndex].width}px`,
    zIndex: 2,
  }}
>

    <Image
      src={tryOnDresses[tryOnIndex].src}
      alt="Dress"
      width={tryOnDresses[tryOnIndex].width}
      height={500}
      style={{
        objectFit: "contain",
        height: "auto",
      }}
    />
  </div>

  {/* LEFT ARROW */}
  <button
    className="tryonArrow left"
    onClick={() =>
      setTryOnIndex(
        (prev) =>
          (prev - 1 + tryOnDresses.length) %
          tryOnDresses.length
      )
    }
  >
    ◀
  </button>

  {/* RIGHT ARROW */}
  <button
    className="tryonArrow right"
    onClick={() =>
      setTryOnIndex(
        (prev) => (prev + 1) % tryOnDresses.length
      )
    }
  >
    ▶
  </button>
</div>

      <p style={{ marginTop: 10 }}>
        Dress {tryOnIndex + 1} / {tryOnDresses.length}
      </p>
    </div>
  </div>
)}
      </div>
    </div>
  );

  function renderCategory(brand: string, title: string) {
  // for now, only CASUAL has products
  if (brand !== "CASUAL") {
    return (
      <h2 className="pickTitle" style={{ marginTop: "40px" }}>
        {title} (Coming Soon)
      </h2>
    );
  }

  return (
    <>
      <h2 className="pickTitle">{title}</h2>

      <section className="productListSection">
        <div className="productGrid">
          {casualWearProducts.map((product) => {
            const isFav = favorites.includes(product.image);

            return (
              <div className="productImg" key={product.id}>
                <span
                  className="wishlistIcon"
                  onClick={() => toggleFavorite(product.image)}
                >
                  {isFav ? "❤️" : "♡"}
                </span>

                <div className="productImg">
                  <img src={product.image} alt={product.name} />
                </div>

                <div className="productInfo">
                  <p className="brand">{brand}</p>
                  <p className="name">{product.name}</p>

                  <div className="priceRow">
                    <span className="price">₹{product.price}</span>
                    <span className="off">50% off</span>
                  </div>

                  <button
                    className="addToCartBtn"
                    onClick={() => addToCart(product.image)}
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
  );
}
}
