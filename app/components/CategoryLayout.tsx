"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TopBar from "./TopBar";
import { useShop } from "../context/ShopContext";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  slug: string;
  discount?: string;
  color?: string;
}

interface Props {
  title: string;
  products: Product[];
}

export default function CategoryLayout({ title, products }: Props) {
  const { favorites, toggleFavorite, addToCart } = useShop();
  const router = useRouter();

  const [priceRange, setPriceRange] = useState(5000);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const filteredProducts = products.filter((p) => {
    if (p.price > priceRange) return false;
    if (selectedColor && p.color?.toLowerCase() !== selectedColor) return false;
    return true;
  });

  return (
    <div className="bg-[#f5f5f6] min-h-screen">

      <TopBar />

      <div className="max-w-[1400px] mx-auto px-8 py-8">
        <div className="grid grid-cols-[260px_1fr] gap-12">

          {/* SIDEBAR */}
          <aside className="pr-8 border-r border-gray-200">
            <div className="pb-8 border-b">
              <h3 className="text-sm font-bold tracking-wide mb-6">PRICE</h3>

              <input
                type="range"
                min={100}
                max={10000}
                step={100}
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-pink-500"
              />

              <p className="mt-4 text-sm font-semibold">
                ₹100 - ₹{priceRange.toLocaleString()}+
              </p>
            </div>

            <div className="pt-8">
              <h3 className="text-sm font-bold tracking-wide mb-6">COLOR</h3>

              <div className="space-y-4">
                {["pink", "green", "blue", "purple", "black", "red", "yellow"].map((color) => (
                  <label key={color} className="flex items-center gap-3 cursor-pointer text-sm">
                    <input
                      type="checkbox"
                      checked={selectedColor === color}
                      onChange={() =>
                        setSelectedColor(selectedColor === color ? null : color)
                      }
                      className="w-4 h-4 accent-pink-500"
                    />
                    <span
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: color }}
                    />
                    <span className="capitalize">{color}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* PRODUCTS */}
          <main>
            <h2 className="text-xl font-semibold mb-8">{title}</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">

              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-xl overflow-hidden 
                             shadow-sm hover:shadow-lg 
                             transition duration-300 relative"
                >
                  <div
                    onClick={() => router.push(`/product/${p.slug}`)}
                    className="relative cursor-pointer"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(p.image);
                      }}
                      className="absolute top-3 right-3 z-10 w-8 h-8 
                                 bg-white rounded-full shadow 
                                 flex items-center justify-center"
                    >
                      {favorites.includes(p.image) ? "❤️" : "🤍"}
                    </button>

                    <div className="w-full aspect-[3/4] bg-white flex items-center justify-center">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="h-full object-contain transition duration-300"
                      />
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-sm font-semibold tracking-wide">KALINI</p>

                    <p className="text-sm text-gray-600 truncate">
                      {p.title}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-semibold text-black">
                        ₹{p.price}
                      </span>

                      {p.discount && (
                        <span className="text-orange-500 text-sm">
                          {p.discount}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(p);
                        setSelectedSize(null);
                      }}
                      className="mt-4 w-full bg-[#ff3f6c] text-white py-3 rounded-md 
                                 hover:bg-[#ff527b] transition font-semibold"
                    >
                      ADD TO BAG
                    </button>
                  </div>
                </div>
              ))}

            </div>
          </main>
        </div>
      </div>

      {/* ADD TO CART MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl p-6 w-[420px] relative">

            {/* Close */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-gray-500"
            >
              ✕
            </button>

            {/* Image */}
            <img
              src={selectedProduct.image}
              className="w-full h-[300px] object-contain"
            />

            {/* Title */}
            <h2 className="mt-4 font-semibold text-lg">
              {selectedProduct.title}
            </h2>

            {/* Price */}
            <p className="font-bold mt-1">
              ₹{selectedProduct.price}
            </p>

            {/* Size */}
            <div className="mt-4">
              <p className="mb-2 font-medium">Select Size</p>
              <div className="flex gap-3">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "bg-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={() => {
                if (!selectedSize) {
                  alert("Please select size");
                  return;
                }

                addToCart(
                  selectedProduct.image,
                  selectedSize,
                  selectedProduct.price,
                  selectedProduct.title
                );

                setSelectedProduct(null);
                router.push("/cart");
              }}
              className="mt-6 w-full bg-[#ff3f6c] text-white py-3 rounded-md 
                         hover:bg-[#ff527b] transition font-semibold"
            >
              ADD TO BAG
            </button>

          </div>
        </div>
      )}
    </div>
  );
}