"use client";


import { useRouter } from "next/navigation";
import ProductCard from "../components/ProductCard";
import { useShop } from "../context/ShopContext";
import { casualProducts } from "../data/casual";

export default function CasualPage() {
  const { favorites, toggleFavorite, addToCart } = useShop();
  const router = useRouter();

  return (
    <>
      <h2 className="pickTitle">Casual Wear</h2>

      <div className="productGrid">
        {casualProducts.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            isFav={favorites.includes(product.image)}
            onToggleFav={() => toggleFavorite(product.image)}
            onAddToCart={() => addToCart(product.image)}
            onOpenDetails={() =>
              router.push(`/product/${product.slug}`)
            }
          />
        ))}
      </div>
    </>
  );
}
