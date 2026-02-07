"use client";


import { useRouter } from "next/navigation";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import { useShop } from "../context/ShopContext";

export default function PartyPage() {
  const { favorites, toggleFavorite, addToCart } = useShop();
  const router = useRouter();

  return (
    <>
      <h2 className="pickTitle">Party Wear</h2>

      <div className="productGrid">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            image={p.image}
            title={p.title}
            category="PARTY"
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
