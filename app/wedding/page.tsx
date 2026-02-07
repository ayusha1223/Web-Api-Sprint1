"use client";

import { useRouter } from "next/navigation";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import { useShop } from "../context/ShopContext";

export default function WeddingPage() {
  const { favorites, toggleFavorite, addToCart } = useShop();
  const router = useRouter();

  return (
    <>
      <h2 className="pickTitle">Wedding Wear</h2>

      <div className="productGrid">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            image={p.image}
            title={p.title}
            category="WEDDING"
            price={p.price}
            oldPrice={p.oldPrice}
            rating={p.rating}
            discount={p.discount}
            isFav={favorites.includes(p.image)}
            onToggleFav={() => toggleFavorite(p.image)}
            onAddToCart={() => addToCart(p.image)}
            onOpenDetails={() => router.push(`/product/${p.slug}`)}
          />
        ))}
      </div>
    </>
  );
}
