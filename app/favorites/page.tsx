"use client";

import { useState } from "react";
import { useShop } from "../context/ShopContext";
import { useRouter } from "next/navigation";
import TopBar from "../components/TopBar";
import { casualProducts } from "../dashboard/data/casual";
import { coordProducts } from "../dashboard/data/coord";
import { partyProducts } from "../dashboard/data/party";
import { winterProducts } from "../dashboard/data/winter";
import { weddingProducts } from "../dashboard/data/wedding";
import { onePieceProducts } from "../dashboard/data/onepiece";
import AddToCartModal from "../components/AddToCartModal";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useShop();
  const router = useRouter();
  const { addToCart } = useShop();
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
    <div 
    data-testid="favorite-toggle"
    className="bg-[#f5f5f6] min-h-screen">
      <TopBar />

      <div className="max-w-[1200px] mx-auto px-6 py-12">

        {/* TITLE */}
        <h1 className="text-3xl font-bold mb-10">
          My Wishlist ❤️
        </h1>

        {favoriteProducts.length === 0 ? (
          <div 
          data-testid="favorites-empty"
          className="bg-white rounded-xl p-16 text-center shadow-sm">
            <p className="text-gray-500 text-lg">
              Your wishlist is empty.
            </p>
          </div>
        ) : (

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">

            {/* HEADER */}
            <div className="hidden md:grid grid-cols-4 gap-4 bg-gray-100 px-8 py-4 text-sm font-semibold text-gray-600">
              <div>Product</div>
              <div>Price</div>
              <div>Discount</div>
              <div className="text-center">Actions</div>
            </div>

            {/* ROWS */}
            {favoriteProducts.map((product) => (
              <div
               data-testid="favorite-item"
                key={product.id}
                className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center px-8 py-6 border-b last:border-none hover:bg-gray-50 transition"
              >
                {/* PRODUCT */}
                <div className="flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-20 h-24 object-contain cursor-pointer"
                    onClick={() =>
                      router.push(`/product/${product.slug}`)
                    }
                  />

                  <div>
                    <p className="font-medium text-gray-800">
                      {product.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      KALINI
                    </p>
                  </div>
                </div>

                {/* PRICE */}
                <div className="text-gray-800 font-semibold">
                  ₹{product.price}
                  {product.oldPrice && (
                    <span className="ml-2 text-sm line-through text-gray-400">
                      ₹{product.oldPrice}
                    </span>
                  )}
                </div>

                {/* DISCOUNT */}
                <div className="text-orange-500 font-medium">
                  {product.discount}
                </div>

                {/* ACTIONS */}
                <div className="flex md:justify-center gap-3">

                 <button
                 data-testid="favorite-move-to-cart"
 onClick={() => {
  
    addToCart(
  product.image,
   "M",
  product.price,
  product.title  // ✅ correct
);
    router.push("/cart");  // 🔥 go to cart page
  }}
  className="bg-[#ff3f6c] text-white px-4 py-2 rounded-md hover:bg-[#ff527b] transition text-sm font-semibold"
>
  Move to Cart
</button>

                  <button
                  data-testid="favorite-remove"
                    onClick={() =>
                      toggleFavorite(product.image)
                    }
                    className="border border-gray-300 px-4 py-2 rounded-md text-sm hover:bg-gray-100 transition"
                  >
                    Remove
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}
      </div>

      {/* MODAL */}
      {selectedProduct && (
        <AddToCartModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}