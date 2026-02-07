"use client";

import { useShop } from "../context/ShopContext";

export default function FavoritesPage() {
  const { favorites, toggleFavorite, addToCart } = useShop();

  if (favorites.length === 0) {
    return <p style={{ padding: 40 }}>No favorites yet ❤️</p>;
  }

  return (
    <div className="productGrid">
      {favorites.map((img) => (
        <div className="productCard" key={img}>
          
          <span
            className="wishlistIcon"
            onClick={() => toggleFavorite(img)}
          >
            ❤️
          </span>

          <div className="productImg">
            {/* 🔥 THIS IS THE FIX */}
            <img src={img} alt="Favorite product" />
          </div>

          <button
            className="cartIconBtn"
            onClick={() => addToCart(img)}
          >
            🛒
          </button>

        </div>
      ))}
    </div>
  );
}
