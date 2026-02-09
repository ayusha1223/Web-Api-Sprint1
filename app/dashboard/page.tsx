"use client";

import "./dashboard.css";
import Image from "next/image";
import Link from "next/link";
import { useShop } from "../context/ShopContext";
import { useState } from "react";
import { featuredProducts } from "./data/featured";
import { useRouter } from "next/navigation";


export default function Dashboard() {
  const { favorites, toggleFavorite, addToCart } = useShop();
  const router = useRouter();


  const [showCartToast, setShowCartToast] = useState(false);
  const [showTryOn, setShowTryOn] = useState(false);
  const [tryOnIndex, setTryOnIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [minPrice, setMinPrice] = useState<number | "">("");
const [maxPrice, setMaxPrice] = useState<number | "">("");
const [searchQuery, setSearchQuery] = useState("");
const [showProfileMenu, setShowProfileMenu] = useState(false);
const [darkMode, setDarkMode] = useState(false);

// Load saved theme
useState(() => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.body.classList.add("dark");
      setDarkMode(true);
    }
  }
});

// Toggle dark mode
const toggleDarkMode = () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  setDarkMode(isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
};

  const tryOnDresses = [
    {
      src: "/images/dresses/dress-8.png",
      price: 1899,
      top: 123,
      width: 260,
      offsetX: 10,
    },
    {
      src: "/images/dresses/dress-15.png",
      price: 2199,
      top: -10,
      width: 350,
    },
    {
      src: "/images/dresses/dress-10.png",
      price: 1899,
      top: 30,
      width: 265,
      offsetX: -8,
    },
    {
      src: "/images/dresses/dress-11.png",
      price: 1899,
      top: 122,
      width: 245,
      offsetX: -3,
    },
    {
      src: "/images/dresses/dress-12.png",
      price: 1899,
      top: 123,
      width: 245,
      offsetX: -5,
    },
    {
      src: "/images/dresses/dress-13.png",
      price: 1899,
      top: 100,
      width: 200,
    },
    {
      src: "/images/dresses/dress-14.png",
      price: 1899,
      top: 116,
      width: 290,
      offsetX: -5,
    },
  ];

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
              onClick={() => setShowTryOn(true)}
              title="Try On"
              style={{ cursor: "pointer" }}
            >
              👗
            </span>
            <Link href="/favorites" className="icon">
              ♡
            </Link>
            <Link href="/cart" className="icon">
              🛒
            </Link>
            <div className="profileWrapper">
  <span
    className="icon"
    onClick={() => setShowProfileMenu(!showProfileMenu)}
    style={{ cursor: "pointer" }}
  >
    👤
  </span>

  {showProfileMenu && (
  <div className="profileDropdown">
    <Link
      href="/user/profile"
      className="menuItem"
      onClick={() => setShowProfileMenu(false)}
    >
      ✏️ <span>Edit Profile</span>
    </Link>

    <button className="menuItem">
      ⚙️ <span>Settings</span>
    </button>

    <button className="menuItem" onClick={toggleDarkMode}>
      🌙 <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
    </button>

    <div className="menuDivider" />

    <button className="menuItem logout">
      🚪 <span>Logout</span>
    </button>
  </div>
)}
</div>

          </div>
        </div>

        <div className="dashboard-layout">
          {/* ================= SIDEBAR ================= */}
          <aside className="sidebar">
            <div className="sidebar-logo">
              <Image
                src="/images/logo.png"
                alt="Naayu Attire"
                width={130}
                height={50}
                priority
              />

            </div>

           <h3>Categories</h3>
<ul>
  <li>
    <Link href="/dashboard">Home</Link>
  </li>

  <li>
    <Link href="/dashboard/category/casual">Casual Wear</Link>
  </li>

  <li>
    <Link href="/dashboard/category/coord">Co-ord Set</Link>
  </li>

  <li>
    <Link href="/dashboard/category/party">Party Wear</Link>
  </li>

  <li>
    <Link href="/dashboard/category/winter">Winter Wear</Link>
  </li>

  <li>
    <Link href="/dashboard/category/wedding">Wedding Wear</Link>
  </li>

  <li>
    <Link href="/dashboard/category/onepiece">1 Piece Set</Link>
  </li>
</ul>


          <h3 style={{ marginTop: "24px" }}>Filter by Price</h3>
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
</aside>

          {/* ================= MAIN ================= */}
          <main>
            {/* ===== PROMO ROW ===== */}
            <div className="promo-row">
              <div className="banner banner-extended">
                <div className="banner-text">
                  <h1>BIG SALE!</h1>
                  <p>Trending fashion collections</p>
                  <Link href="/dashboard/category/casual">
                    <button>Shop Now</button>
                  </Link>
                </div>
                <div className="banner-image">
                  <Image src="/images/banner.png" alt="Sale" fill priority />
                </div>
              </div>

              <div className="deal-card">
                <div className="deal-text">
                  <h4>Great Value Deals</h4>
                  <p>50–75% OFF</p>
                  <span className="deal-badge">75%</span>
                </div>
                <div className="deal-image">
                  <Image src="/images/deal.png" alt="Deal" fill />
                </div>
              </div>

              <div className="promo-box promo-discount">
                <h4>
                  Get up to <span>20%</span>
                </h4>
                <p>OFF Dresses</p>
              </div>

              <div className="promo-box promo-new">
                <h4>New Arrivals</h4>
                <Link href="/party">
                  <button>Shop now</button>
                </Link>
              </div>
            </div>

            {/* ===== SPLIT HERO ===== */}
            <section className="splitHero">
              <div className="splitHeroLeft">
                <img src="/images/hero-left.jpg" alt="hero left" />
              </div>
              <div className="splitHeroRight">
                <img src="/images/hero-right.jpg" alt="hero right" />
              </div>
              <div className="heroText">
                <h1>
                  MOVE.
                  <br />
                  REST.
                  <br />
                  RECOVER.
                </h1>
                <p>Discover the drop</p>
                <Link href="/wedding">
                  <button>Shop Now</button>
                </Link>
              </div>
            </section>

            {/* ===== FEATURED ===== */}
            <h2 className="pickTitle">Pick yours now</h2>

<section className="productListSection">
  <div className="productGrid">
    {featuredProducts
      .filter((p) => {
        if (!searchQuery) return true;
        return p.title.toLowerCase().includes(searchQuery.toLowerCase());
      })
      .filter((p) => {
        if (minPrice !== "" && p.price < minPrice) return false;
        if (maxPrice !== "" && p.price > maxPrice) return false;
        return true;
      })
      .map((p) => (
        <div className="productCard" key={p.id}>
          <span
            className="wishlistIcon"
            onClick={() => toggleFavorite(p.image)}
          >
            {favorites.includes(p.image) ? "❤️" : "♡"}
          </span>

          <div
  className="productImg"
  onClick={() => router.push(`/product/${p.slug}`)}
  style={{ cursor: "pointer" }}
>
  <img src={p.image} alt={p.title} />
</div>


          <div className="productInfo">
            <p className="brand">{p.category}</p>
            <p className="name">{p.title}</p>

            <div className="priceRow">
              <span className="price">₹{p.price}</span>
              <span className="off">{p.discount}</span>
            </div>

            <button
              className="cartIconBtn"
              onClick={() => addToCart(p.image)}
            >
              🛒
            </button>
          </div>
        </div>
      ))}
  </div>
</section>


          </main>
        </div>

        {/* ================= CART TOAST ================= */}
        {showCartToast && (
          <div className="cartToastOverlay">
            <div className="cartToast">✅ Added to cart</div>
          </div>
        )}

        {/* ================= TRY ON MODAL ================= */}
        {showTryOn && (
          <div className="tryonOverlay">
            <div className="tryonModal">
              <button className="closeTryon" onClick={() => setShowTryOn(false)}>
                ✕
              </button>

              <h2>Select Kurtha</h2>

              <div
                style={{
                  position: "relative",
                  width: 300,
                  height: 520,
                  margin: "auto",
                }}
              >
                {/* BODY */}
                <Image
                  src="/images/body1.png"
                  alt="Body"
                  fill
                  style={{ objectFit: "contain", zIndex: 1 }}
                />

                {/* DRESS */}
                <div
                  className={`tryonDress ${isFading ? "fade" : ""}`}
                  style={{
                    position: "absolute",
                    top: `${tryOnDresses[tryOnIndex].top}px`,
                    left: "50%",
                    transform: `translateX(calc(-50% + ${
                      tryOnDresses[tryOnIndex].offsetX || 0
                    }px))`,
                    width: `${tryOnDresses[tryOnIndex].width}px`,
                    zIndex: 2,
                  }}
                >
                  <Image
                    key={tryOnIndex}
                    src={tryOnDresses[tryOnIndex].src}
                    alt="Dress"
                    width={tryOnDresses[tryOnIndex].width}
                    height={500}
                    style={{ objectFit: "contain", height: "auto" }}
                  />
                </div>

                {/* LEFT */}
                <button
                  className="tryonArrow left"
                  onClick={() => {
                    setIsFading(true);
                    setTimeout(() => {
                      setTryOnIndex(
                        (prev) => (prev - 1 + tryOnDresses.length) % tryOnDresses.length
                      );
                      setIsFading(false);
                    }, 200);
                  }}
                >
                  ◀
                </button>

                {/* RIGHT */}
                <button
                  className="tryonArrow right"
                  onClick={() => {
                    setIsFading(true);
                    setTimeout(() => {
                      setTryOnIndex((prev) => (prev + 1) % tryOnDresses.length);
                      setIsFading(false);
                    }, 200);
                  }}
                >
                  ▶
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}