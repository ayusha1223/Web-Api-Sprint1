"use client";

import { id } from "zod/locales";
import { useShop } from "../context/ShopContext";

export default function FavoritesPage() {
  const { favorites, toggleFavorite, addToCart } = useShop();

  return (
    <div style={{ padding: 40 }}>
      <h1>❤️ Favorites</h1>

      {favorites.length === 0 && <p>No favorites yet.</p>}

      <div className="productGrid">
        {favorites.map((img) => (
          <div className="productCard" key={img}>
            <span onClick={() => toggleFavorite(img)}>❤️</span>

            <div className="productImg">
              <img src={`/images/${img}`} alt="" />
            </div>

            <button onClick={() => addToCart(img)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
