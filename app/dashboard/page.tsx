"use client";
import Image from "next/image";
import Link from "next/link";
import { useShop } from "../context/ShopContext";
import { useEffect, useState } from "react";
import { featuredProducts } from "./data/featured";
import { useRouter } from "next/navigation";
import TopBar from "../components/TopBar";
import AddToCartModal from "../components/AddToCartModal";
import TryOnViewer from "../components/TryOnViewer";
import { useSearchParams } from "next/navigation";
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
  const [sortOption, setSortOption] = useState("default");
const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [dynamicProducts, setDynamicProducts] = useState<any[]>([]);
  const searchParams = useSearchParams();
const urlSearch = searchParams.get("search") || "";
 const [debouncedSearch, setDebouncedSearch] = useState(urlSearch);

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(urlSearch);
  }, 400);

  return () => clearTimeout(timer);
}, [urlSearch]);

useEffect(() => {
  async function fetchProducts() {
    try {
      let url = "http://localhost:5050/api/products";

      if (debouncedSearch) {
        url += `?search=${debouncedSearch}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      const formatted = data.data.map((p: any) => ({
        id: p._id,
        title: p.name,
        price: p.price,
        image: p.images?.[0]
          ? `http://localhost:5050${p.images[0]}`
          : "/placeholder.png",
        slug: p._id,
        color: null,
        discount: "",
      }));

      setDynamicProducts(formatted);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  fetchProducts();
}, [debouncedSearch]);
  
  const allProducts = [...featuredProducts, ...dynamicProducts];

const filteredProducts = allProducts
    .filter((p) => {
  if (!urlSearch) return true;
  return p.title.toLowerCase().includes(urlSearch.toLowerCase());
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
    const sortedProducts = [...filteredProducts].sort((a, b) => {
  if (sortOption === "lowToHigh") {
    return Number(a.price) - Number(b.price);
  }
  if (sortOption === "highToLow") {
    return Number(b.price) - Number(a.price);
  }
  return 0;
});
    

return (
  <div className="min-h-screen bg-[#fafafa] dark:bg-black transition-colors duration-300">

   <TopBar />

    {/* ===== PAGE CONTAINER ===== */}
    <div className="max-w-[1400px] mx-auto px-8 py-8">

      <div className="grid grid-cols-[260px_1fr] gap-12">

        {/* ================= SIDEBAR ================= */}
        <aside className="
bg-white
rounded-2xl
p-6
shadow-sm
sticky top-24
h-fit
">
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
          {/* SORT BAR */}
<div className="flex justify-between items-center mb-8">

  <p className="text-sm text-gray-600">
    {sortedProducts.length} Products
  </p>

  <div>
    <select
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
      className="border rounded-lg px-4 py-2 text-sm bg-white"
    >
      <option value="default">Recommended</option>
      <option value="lowToHigh">Price: Low to High</option>
      <option value="highToLow">Price: High to Low</option>
    </select>
  </div>

</div>

  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
    {sortedProducts.map((p) => (
      <div
        key={p.id}
        data-testid="product-card"
className="
group
bg-white
rounded-2xl
overflow-hidden
shadow-sm
hover:shadow-xl
transition-all duration-500
hover:-translate-y-2
relative
"
      >
        
      {/* IMAGE */}
        <div
        data-testid="open-product"
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
              className="h-full object-contain transition-transform duration-700 group-hover:scale-105"
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
         data-testid="dashboard-add-btn"
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
            data-testid={`size-${size}`}
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
 data-testid="modal-add-to-cart"
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