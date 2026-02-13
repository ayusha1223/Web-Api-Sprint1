"use client";

import { useState } from "react";
import { useShop } from "../context/ShopContext";
import { useRouter } from "next/navigation";
import TopBar from "../components/TopBar";
import AddToCartModal from "../components/AddToCartModal";

import { casualProducts } from "../dashboard/data/casual";
import { coordProducts } from "../dashboard/data/coord";
import { partyProducts } from "../dashboard/data/party";
import { winterProducts } from "../dashboard/data/winter";
import { weddingProducts } from "../dashboard/data/wedding";
import { onePieceProducts } from "../dashboard/data/onepiece";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useShop();
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const allProducts = [
    ...casualProducts,
    ...coordProducts,
    ...partyProducts,
    ...winterProducts,
    ...weddingProducts,
    ...onePieceProducts,
  ];

  const favoriteProducts = allProducts.filter((product) =>
    favorites.includes(product.image)
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">

        <TopBar showTryOn={true} />

        <div style={{ padding: "40px" }}>
          <h2 style={{ marginBottom: 30 }}>My Favorites ❤️</h2>

          {favoriteProducts.length === 0 ? (
            <p>No favorites yet ❤️</p>
          ) : (
            <div
              style={{
                background: "#fff",
                borderRadius: 10,
                padding: 20,
                boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
              }}
            >
              {/* TABLE HEADER */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr 1fr",
                  padding: "10px 0",
                  borderBottom: "1px solid #eee",
                  fontWeight: 600,
                }}
              >
                <div>Product</div>
                <div>Price</div>
                <div>Discount</div>
                <div>Actions</div>
              </div>

              {/* TABLE ROWS */}
              {favoriteProducts.map((product) => (
                <div
                  key={product.id}   // 🔥 FIXED duplicate key issue
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr 1fr",
                    alignItems: "center",
                    padding: "20px 0",
                    borderBottom: "1px solid #f1f1f1",
                  }}
                >
                  {/* PRODUCT COLUMN */}
                  <div style={{ display: "flex", gap: 15, alignItems: "center" }}>
                    <img
                      src={product.image}
                      alt={product.title}
                      style={{ width: 70, cursor: "pointer" }}
                      onClick={() =>
                        router.push(`/product/${product.slug}`)
                      }
                    />
                    <span>{product.title}</span>
                  </div>

                  {/* PRICE COLUMN */}
                  <div>
                    ₹{product.price}
                    {product.oldPrice && (
                      <span
                        style={{
                          marginLeft: 8,
                          textDecoration: "line-through",
                          color: "#888",
                        }}
                      >
                        ₹{product.oldPrice}
                      </span>
                    )}
                  </div>

                  {/* DISCOUNT COLUMN */}
                  <div style={{ color: "red" }}>
                    {product.discount}
                  </div>

                  {/* ACTION COLUMN */}
                  <div style={{ display: "flex", gap: 10 }}>
                    <button
                      style={{
                        padding: "6px 12px",
                        background: "#000",
                        color: "#fff",
                        border: "none",
                        borderRadius: 5,
                        cursor: "pointer",
                      }}
                      onClick={() => setSelectedProduct(product)}
                    >
                      Move to Cart 🛒
                    </button>

                    <button
                      style={{
                        padding: "6px 12px",
                        background: "#f5f5f5",
                        border: "1px solid #ddd",
                        borderRadius: 5,
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        toggleFavorite(product.image)
                      }
                    >
                      Remove ❌
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 🔥 MODAL */}
        {selectedProduct && (
          <AddToCartModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}

      </div>
    </div>
  );
}
