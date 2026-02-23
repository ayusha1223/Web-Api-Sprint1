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
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const router = useRouter();
  const { addToCart, toggleFavorite, favorites } = useShop();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const originalProduct = allProducts.find((p) => p.slug === slug);

const product =
  originalProduct?.slug === "grey-sarara"
    ? { ...originalProduct, image: "/images/wedding/wedding1.png" }
    : originalProduct;

  if (!product) {
    return <h2 style={{ padding: 40 }}>Product not found</h2>;
  }

  const relatedProducts = allProducts
    .filter((p) => p.slug !== product.slug)
    .slice(0, 8);

  return (
    <div style={{ background: "#fff", padding: "40px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>

        {/* ================= PRODUCT SECTION ================= */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "55% 45%",
            gap: 60,
          }}
        >
          {/* LEFT IMAGE */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => router.back()}
              style={{
                position: "absolute",
                top: 10,
                left: 10,
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "none",
                background: "#333",
                color: "#fff",
                cursor: "pointer",
                zIndex: 10,
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
              ⭐ {(product.rating ?? 4.2).toFixed(1)} | 527 Ratings
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
                      background: "#fff",
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
                  addToCart(product.image, selectedSize, product.price);
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
                onClick={() => toggleFavorite(product.image)}
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

        {/* ================= YOU MAY ALSO LIKE ================= */}
        <div style={{ marginTop: 100 }}>
  <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 30 }}>
    You May Also Like
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
      gap: 30,
    }}
  >
    {relatedProducts.map((item) => {
      const discount = item.discount ?? 20;
      const originalPrice =
        item.originalPrice ??
        Math.round(item.price / (1 - discount / 100));

      return (
        <div
          key={item.slug}
          style={{
            borderRadius: 16,
            border: "1px solid #eee",
            padding: 16,
            position: "relative",
            background: "#fff",
            transition: "0.3s",
          }}
        >
          {/* ===== HEART ICON ===== */}
          <div
            onClick={() => toggleFavorite(item.image)}
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 2,
            }}
          >
            {favorites.includes(item.image) ? "❤️" : "🤍"}
          </div>

          {/* ===== IMAGE ===== */}
          <div
            onClick={() => router.push(`/product/${item.slug}`)}
            style={{
              cursor: "pointer",
              marginBottom: 12,
            }}
          >
            <Image
              src={item.image}
              alt={item.title}
              width={300}
              height={400}
              style={{
                width: "100%",
                height: 280,
                objectFit: "contain",
              }}
            />
          </div>

          {/* ===== CATEGORY (optional) ===== */}
          <div style={{ fontSize: 12, color: "#888" }}>
            pink
          </div>

          {/* ===== TITLE ===== */}
          <h4 style={{ fontSize: 15, fontWeight: 600 }}>
            {item.title}
          </h4>

          {/* ===== PRICE ===== */}
          <div style={{ marginTop: 6 }}>
            <span
              style={{
                fontWeight: 700,
                fontSize: 16,
                marginRight: 8,
              }}
            >
              ₹{item.price}
            </span>

            <span
              style={{
                textDecoration: "line-through",
                color: "#888",
                fontSize: 13,
                marginRight: 6,
              }}
            >
              ₹{originalPrice}
            </span>

            <span style={{ color: "#ff3f6c", fontSize: 13 }}>
              {discount}% OFF
            </span>
          </div>

          {/* ===== CART ICON BUTTON ===== */}
          <div
            onClick={() =>
              addToCart(item.image, "M", item.price)
            }
            style={{
              position: "absolute",
              bottom: 16,
              right: 16,
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "#333",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            }}
          >
            🛒
          </div>
        </div>
      );
    })}
  </div>
</div>
      </div>
    </div>
  );
}