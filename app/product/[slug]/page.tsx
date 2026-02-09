"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { useShop } from "../../context/ShopContext";

// ===== IMPORT ALL CATEGORY DATA =====
import { casualProducts } from "../../dashboard/data/casual";
import { coordProducts } from "../../dashboard/data/coord";
import { partyProducts } from "../../dashboard/data/party";
import { winterProducts } from "../../dashboard/data/winter";
import { weddingProducts } from "../../dashboard/data/wedding";
import { onePieceProducts } from "../../dashboard/data/onepiece";
import { featuredProducts } from "../../dashboard/data/featured";   

// ===== MERGE ALL PRODUCTS =====
const allProducts = [
  ...casualProducts,
  ...coordProducts,
  ...partyProducts,
  ...winterProducts,
  ...weddingProducts,
  ...onePieceProducts,
  featuredProducts,
];

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const { addToCart, toggleFavorite, favorites } = useShop();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // ✅ FIND PRODUCT FROM ALL CATEGORIES
  const product = allProducts.find((p) => p.slug === slug);

  if (!product) {
    return <h2 style={{ padding: 40 }}>Product not found</h2>;
  }

  return (
    <div style={{ background: "#fff", padding: "40px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "55% 45%",
            gap: 60,
          }}
        >
          {/* ================= LEFT : IMAGE ================= */}
          <div style={{ position: "relative", paddingTop: 20 }}>
            {/* BACK BUTTON */}
            <button
              onClick={() => window.history.back()}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: "none",
                background: "#333",
                color: "#fff",
                cursor: "pointer",
                zIndex: 2,
              }}
            >
              ←
            </button>

            <Image
              src={product.image}
              alt={product.title}
              width={700}
              height={900}
              style={{
                width: "100%",
                maxHeight: "78vh",
                objectFit: "contain",
              }}
            />
          </div>

          {/* ================= RIGHT : DETAILS ================= */}
          <div style={{ position: "sticky", top: 120 }}>
            {/* BRAND */}
            <h1 style={{ fontSize: 22, fontWeight: 700 }}>
              NAAYU ATTIRE
            </h1>

            {/* TITLE */}
            <h2 style={{ fontSize: 18, color: "#555", marginTop: 6 }}>
              {product.title}
            </h2>

            {/* RATING */}
            <div
              style={{
                marginTop: 12,
                fontSize: 14,
                color: "#388e3c",
              }}
            >
              ⭐ {product.rating ?? 4.2} | 527 Ratings
            </div>

            {/* PRICE */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginTop: 18,
              }}
            >
              <span style={{ fontSize: 28, fontWeight: 700 }}>
                ₹{product.price}
              </span>

              <span
                style={{
                  textDecoration: "line-through",
                  color: "#999",
                }}
              >
                ₹{product.oldPrice}
              </span>

              <span
                style={{
                  color: "#ff905a",
                  fontWeight: 600,
                }}
              >
                {product.discount}
              </span>
            </div>

            <div
              style={{
                fontSize: 13,
                color: "#03a685",
                marginTop: 4,
              }}
            >
              inclusive of all taxes
            </div>

            {/* ================= SIZE ================= */}
            <div style={{ marginTop: 30 }}>
              <strong>Select Size</strong>

              <div
                style={{
                  display: "flex",
                  gap: 12,
                  marginTop: 12,
                }}
              >
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      border:
                        selectedSize === size
                          ? "2px solid #ff3f6c"
                          : "1px solid #ccc",
                      background: "#fff",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* ================= ACTIONS ================= */}
            <div
              style={{
                display: "flex",
                gap: 16,
                marginTop: 32,
              }}
            >
              <button
                onClick={() => {
                  if (!selectedSize) {
                    alert("Please select a size");
                    return;
                  }
                  addToCart(product.image);
                }}
                style={{
                  flex: 1,
                  height: 52,
                  background: "#ff3f6c",
                  color: "#fff",
                  border: "none",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                ADD TO BAG
              </button>

              <button
                onClick={() => toggleFavorite(product.image)}
                style={{
                  width: 160,
                  height: 52,
                  border: "1px solid #ccc",
                  background: "#fff",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {favorites.includes(product.image) ? "❤️" : "🤍"} WISHLIST
              </button>
            </div>

            {/* ================= DELIVERY ================= */}
            <div style={{ marginTop: 30 }}>
              <strong>Delivery Options</strong>

              <div
                style={{
                  marginTop: 10,
                  display: "flex",
                  gap: 10,
                }}
              >
                <input
                  type="text"
                  placeholder="Enter Pincode"
                  style={{
                    padding: 10,
                    border: "1px solid #ccc",
                    width: 160,
                  }}
                />
                <button
                  style={{
                    background: "transparent",
                    color: "#ff3f6c",
                    border: "none",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  CHECK
                </button>
              </div>

              <p style={{ fontSize: 13, marginTop: 8, color: "#666" }}>
                100% Original Products
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
