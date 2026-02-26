"use client";


import Image from "next/image";
import Link from "next/link";
import { useShop } from "../context/ShopContext";
import { useState } from "react";
import { featuredProducts } from "./data/featured";
import { useRouter } from "next/navigation";
import TopBar from "../components/TopBar";
import AddToCartModal from "../components/AddToCartModal";
import TryOnViewer from "../components/TryOnViewer";
export default function Dashboard() {
  const { favorites, toggleFavorite, addToCart } = useShop();
  const router = useRouter();
  const [showTryOn, setShowTryOn] = useState(false);
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState(5000);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const filteredProducts = featuredProducts
    .filter((p) => {
      if (!searchQuery) return true;
      return p.title.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .filter((p) => {
      const price = Number(p.price);

      if (minPrice !== "" && price < Number(minPrice)) return false;
      if (maxPrice !== "" && price > Number(maxPrice)) return false;
      if (price > priceRange) return false;

      if (selectedColor && p.color?.toLowerCase() !== selectedColor.toLowerCase())
        return false;

      return true;
    });

return (
  <div className="min-h-screen bg-[#f5f5f6] dark:bg-black transition-colors duration-300">

   
   <TopBar />

    {/* ===== PAGE CONTAINER ===== */}
    <div className="max-w-[1400px] mx-auto px-8 py-8">

      <div className="grid grid-cols-[260px_1fr] gap-12">

        {/* ================= SIDEBAR ================= */}
        <aside className="pr-8 border-r border-gray-200">

          {/* ===== PRICE ===== */}
          <div className="pb-8 border-b">
            <h3 className="text-sm font-bold tracking-wide mb-6">PRICE</h3>

            <input
              type="range"
              min={100}
              max={10100}
              step={100}
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-pink-500"
            />

            <p className="mt-4 text-sm font-semibold">
              ₹100 - ₹{priceRange.toLocaleString()}+
            </p>
          </div>

          {/* ===== COLOR ===== */}
          <div className="pt-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold tracking-wide">COLOR</h3>
              
            </div>

            <div className="space-y-4">
              {[
                { name: "Pink", count: 6270, code: "#f472b6" },
                { name: "Green", count: 6233, code: "#16a34a" },
                { name: "Blue", count: 6109, code: "#2563eb" },
                { name: "Purple", count: 4450, code: "#9333ea" },
                { name: "Black", count: 3816, code: "#111827" },
                { name: "Red", count: 3501, code: "#dc2626" },
                { name: "Yellow", count: 3479, code: "#eab308" },
              ].map((color) => (
                <label
                  key={color.name}
                  className="flex items-center gap-3 cursor-pointer text-sm"
                >
                  <input
                    type="checkbox"
                    checked={selectedColor === color.name.toLowerCase()}
                    onChange={() =>
                      setSelectedColor(
                        selectedColor === color.name.toLowerCase()
                          ? null
                          : color.name.toLowerCase()
                      )
                    }
                    className="w-4 h-4 accent-pink-500"
                  />

                  <span
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: color.code }}
                  />

                  <span>
                    {color.name}
                    <span className="text-gray-400 ml-1">
                      ({color.count})
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* ================= PRODUCTS SECTION ================= */}
        <main>

  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
    {filteredProducts.map((p) => (
      <div
        key={p.id}
className="
  bg-white dark:bg-[#1a1a1a]
  text-black dark:text-white
  rounded-xl
  overflow-hidden
  shadow-sm dark:shadow-md
  hover:shadow-lg
  transition duration-300
  relative
"
      >

        {/* IMAGE */}
        <div
          onClick={() => router.push(`/product/${p.slug}`)}
          className="relative cursor-pointer"
        >

          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(p.image);
            }}
className="absolute top-3 right-3 z-10 w-8 h-8 bg-white dark:bg-[#2a2a2a] rounded-full shadow flex items-center justify-center"
          >
            {favorites.includes(p.image) ? "❤️" : "🤍"}
          </button>

          <div className="w-full aspect-[3/4] bg-white dark:bg-[#1a1a1a] flex items-center justify-center">
            <img
              src={p.image}
              alt={p.title}
              className="h-full object-contain transition duration-300"
            />
          </div>
        </div>

        {/* TEXT */}
        <div className="p-4">
          <p className="text-sm font-semibold tracking-wide">
            KALINI
          </p>

         <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
            {p.title}
          </p>

          <div className="flex items-center gap-2 mt-2">
            <span className="font-semibold text-black">
              ₹{p.price}
            </span>

            <span className="line-through text-gray-400 text-sm">
              ₹2499
            </span>

            <span className="text-orange-500 text-sm">
              {p.discount}
            </span>
          </div>

          {/* ADD TO BAG BUTTON */}
         <button
  onClick={(e) => {
    e.stopPropagation();
    setSelectedProduct(p);
    setSelectedSize(null);
  }}
  className="mt-4 w-full bg-[#ff3f6c] text-white py-3 rounded-md 
             hover:bg-[#ff527b] transition font-semibold 
             flex items-center justify-center gap-2"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 7h12l-1 12H7L6 7zm3 0V5a3 3 0 016 0v2"
    />
  </svg>

  ADD TO BAG
</button>
        </div>

      </div>
    ))}
  </div>

</main>
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
      Number(selectedProduct.price),
      selectedProduct.title
    );

    setTimeout(() => {
      setSelectedProduct(null);
      router.push("/cart");
    }, 1500);
  }}
  className="mt-6 w-full bg-[#ff3f6c] text-white py-3 rounded-md 
             hover:bg-[#ff527b] transition font-semibold 
             flex items-center justify-center gap-2"
>
  ADD TO BAG
</button>
    </div>
  </div>
)}
</div>
</div>
</div>
)
}