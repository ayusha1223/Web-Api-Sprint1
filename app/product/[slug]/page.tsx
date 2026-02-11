"use client";

import { useParams, useRouter } from "next/navigation";
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

const allProducts = [
  ...casualProducts,
  ...coordProducts,
  ...partyProducts,
  ...winterProducts,
  ...weddingProducts,
  ...onePieceProducts,
  ...featuredProducts,
];

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { addToCart, toggleFavorite, favorites } = useShop();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const product = allProducts.find((p) => p.slug === slug);

  if (!product) {
    return <h2 style={{ padding: 40 }}>Product not found</h2>;
  }

  const mixedProducts = allProducts
    .filter((p) => p.slug !== product.slug)
    .slice(0, 6);

  return (
    <div style={{ background: "#fff", padding: "40px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>

        {/* ===== PRODUCT SECTION ===== */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "55% 45%",
            gap: 60,
          }}
        >

          {/* LEFT IMAGE */}
          <div style={{ position: "relative", paddingTop: 20 }}>
            <button
              onClick={() => router.back()}
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
              }}
            >
              ←
            </button>

            <Image
              src={product.image}
              alt={product.title}
              width={700}
              height={900}
              priority
              style={{
                width: "100%",
                maxHeight: "78vh",
                objectFit: "contain",
              }}
            />
          </div>

          {/* RIGHT DETAILS */}
          <div>

            <h1 style={{ fontSize: 22, fontWeight: 700 }}>
              NAAYU ATTIRE
            </h1>

            <h2 style={{ fontSize: 18, color: "#555", marginTop: 6 }}>
              {product.title}
            </h2>

            <div style={{ marginTop: 12 }}>
              ⭐ {product.rating ?? 4.2} | 527 Ratings
            </div>

            <div style={{ marginTop: 18 }}>
              <span style={{ fontSize: 28, fontWeight: 700 }}>
                ₹{product.price}
              </span>
            </div>

            {/* SIZE */}
            <div style={{ marginTop: 30 }}>
              <strong>Select Size</strong>
              <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
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
                      cursor: "pointer",
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* ACTIONS */}
            <div style={{ display: "flex", gap: 16, marginTop: 32 }}>
              <button
                onClick={() => {
                  if (!selectedSize) {
                    alert("Please select size");
                    return;
                  }
                  addToCart(product.image, selectedSize);
                  router.push("/cart");
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
                onClick={() => {
                  toggleFavorite(product.image);
                  router.push("/favorites");
                }}
                style={{
                  width: 160,
                  height: 52,
                  border: "1px solid #ccc",
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                {favorites.includes(product.image) ? "❤️" : "🤍"} WISHLIST
              </button>
            </div>
          </div>
          
        </div>      
      </div>
    </div>
  );
}
