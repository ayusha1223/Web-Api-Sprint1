"use client";

import "./dashboard.css";
import Image from "next/image";
import Link from "next/link";
import { useShop } from "../context/ShopContext";
import { useState } from "react";
import { featuredProducts } from "./data/featured";
import { useRouter } from "next/navigation";
import TopBar from "../components/TopBar";
import AddToCartModal from "../components/AddToCartModal";


export default function Dashboard() {
  const { favorites, toggleFavorite, addToCart } = useShop();
  const router = useRouter();
  const [showTryOn, setShowTryOn] = useState(false);
  const [tryOnIndex, setTryOnIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState(5000);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
const [selectedSize, setSelectedSize] = useState<string | null>(null);


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

  const filteredProducts = featuredProducts
    .filter((p) => {
      if (!searchQuery) return true;
      return p.title.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .filter((p) => {
      const price = Number(p.price);

      if (minPrice !== "" && price < Number(minPrice)) return false;
      if (maxPrice !== "" && price > Number(maxPrice)) return false;
      if (price > priceRange) return false;

      if (selectedColor && p.color?.toLowerCase() !== selectedColor.toLowerCase())
        return false;

      return true;
    });

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        {/* ================= TOP BAR ================= */}
        <div className="dashboardHeader">

  <TopBar
    showTryOn={true}
    onTryOnClick={() => setShowTryOn(true)}
  />

<div className="categoryNav">
  {[
    { name: "Home", link: "/dashboard" },
    { name: "Casual Wear", link: "/dashboard/category/casual" },
    { name: "Co-Ord Set", link: "/dashboard/category/coord" },
    { name: "Party Wear", link: "/dashboard/category/party" },
    { name: "Winter Wear", link: "/dashboard/category/winter" },
    { name: "Wedding Wear", link: "/dashboard/category/wedding" },
    { name: "1 Piece Set", link: "/dashboard/category/onepiece" },
  ].map((cat) => (
    <Link key={cat.name} href={cat.link} className="categoryLink">
      {cat.name}
    </Link>
  ))}
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
              </div>
            </div>
          </aside>

         {/* ================= MAIN ================= */}
<main>
  {/* ===== BANNER ===== */}
  <div className="promo-row">
    <div className="long-banner">
      <Image
        src="/images/dashboard/festive-banner1.jpg"
        alt="Big Festive Sale"
        fill
        priority
      />
      <div className="banner-overlay">
        <h1>BIG FESTIVE SALE</h1>
        <p>Upto 60% OFF on Trending Collections</p>
        <Link href="/dashboard/category/casual">
          <button>Shop Now</button>
        </Link>
      </div>
    </div>
  </div>

  {/* ===== TITLE ===== */}
  <h2 className="pickTitle">Pick yours now</h2>

  {/* ===== PRODUCTS ===== */}
  <section className="productListSection">
    <div className="productGrid">
      {filteredProducts.map((p) => (
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
            <p className="brand">{p.color || "NAAYU"}</p>
            <p className="name">{p.title}</p>

            <div className="priceRow">
              <span className="price">₹{p.price}</span>
              <span className="off">{p.discount}</span>
            </div>

            <button
              className="cartIconBtn"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProduct(p);
                setSelectedSize(null);
              }}
            >
              🛒
            </button>
          </div>
        </div>
      ))}
    </div>

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
        {selectedProduct && (
  <AddToCartModal
    product={selectedProduct}
    onClose={() => setSelectedProduct(null)}
  />
)}
  </section>

{/* ===== PAYMENT METHODS SECTION ===== */}
<div className="paymentSection">
  <div className="paymentLeft">
    <h3>Payment Methods</h3>
    <div className="paymentIcons">
      <Image src="/images/dashboard/cod.png" alt="Cash on Delivery" width={110} height={60} />
      <Image src="/images/dashboard/visa.png" alt="Visa" width={70} height={40} />
      <Image src="/images/dashboard/esewa.png" alt="eSewa" width={70} height={40} />
      <Image src="/images/dashboard/paypal.png" alt="paypal" width={70} height={40} />
    </div>
  </div>
</div>

</main>
          </div>
        </div>
      </div>
    );
  }
  
