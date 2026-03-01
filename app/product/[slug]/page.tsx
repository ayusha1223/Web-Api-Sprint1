"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { useShop } from "../../context/ShopContext";


// ===== IMPORT ALL CATEGORY DATA =====
import { casualProducts } from "../../dashboard/data/casual";
import { coordProducts } from "../../dashboard/data/coord";
import { partyProducts } from "../../dashboard/data/party";
import { winterProducts } from "../../dashboard/data/winter";
import { weddingProducts } from "../../dashboard/data/wedding";
import { onePieceProducts } from "../../dashboard/data/onepiece";
import { featuredProducts } from "../../dashboard/data/featured";
import TopBar from "../../components/TopBar";
const allProducts = [
  ...casualProducts,
  ...coordProducts,
  ...partyProducts,
  ...winterProducts,
  ...weddingProducts,
  ...onePieceProducts,
  ...featuredProducts,
];

export default function ProductDetailsPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const [toast, setToast] = useState<string | null>(null);
  const router = useRouter();
  const { addToCart, toggleFavorite, favorites } = useShop();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const originalProduct = allProducts.find((p) => p.slug === slug);

const product =
  originalProduct?.slug === "grey-sarara"
    ? { ...originalProduct, image: "/images/wedding/wedding1.png" }
    : originalProduct;

  if (!product) {
    return <h2 style={{ padding: 40 }}>Product not found</h2>;
  }

  const relatedProducts = allProducts
    .filter((p) => p.slug !== product.slug)
    .slice(0, 8);

  return (
  <div className="bg-white min-h-screen">

    <TopBar />

    <div className="py-12">
      <div className="max-w-7xl mx-auto px-6">

        {/* ===== MAIN PRODUCT SECTION ===== */}
        <div className="grid lg:grid-cols-2 gap-16">

          {/* LEFT IMAGE */}
          <div className="relative">
           <button
  onClick={() => router.back()}
  className="inline-flex items-center gap-2 
             text-gray-600 hover:text-black 
             font-medium text-sm 
             transition duration-200 
             group mb-6"
>
  <span className="w-8 h-8 flex items-center justify-center 
                   rounded-full border border-gray-300 
                   group-hover:border-black 
                   transition">
    ←
  </span>
  Back to Products
</button>

            <div className="bg-gray-50 rounded-2xl p-8">
              <Image
                src={product.image}
                alt={product.title}
                width={700}
                height={900}
                className="w-full h-[600px] object-contain"
                priority
              />
            </div>
          </div>

          {/* RIGHT DETAILS */}
          <div className="flex flex-col">
            <h1 className="text-sm tracking-widest text-gray-500 font-medium">
              NAAYU ATTIRE
            </h1>

            <h2 className="text-2xl font-semibold mt-2">
              {product.title}
            </h2>

           

            <div className="mt-6 flex items-center gap-3">
              <span className="text-3xl font-bold">
                ₹{product.price}
              </span>
              <span className="line-through text-gray-400 text-lg">
                ₹{Math.round(product.price * 1.3)}
              </span>
              <span className="text-pink-600 font-semibold">
                23% OFF
              </span>
            </div>

            <div className="border-t border-gray-200 mt-8 pt-6">
              <h3 className="font-semibold mb-4">Select Size</h3>

              <div className="flex gap-4">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-full border text-sm font-medium transition 
                      ${
                        selectedSize === size
                          ? "border-pink-600 text-pink-600"
                          : "border-gray-300 hover:border-black"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4 mt-10">
              <button
                onClick={() => {
                  if (!selectedSize) {
  setToast("Please select size first");
  setTimeout(() => setToast(null), 2000);
  return;
}
                  addToCart(product.image, selectedSize, product.price, product.title);
                  router.push("/cart");
                }}
                className="flex-1 h-14 bg-pink-600 text-white 
                           font-semibold rounded-md 
                           hover:bg-pink-700 transition"
              >
                ADD TO BAG
              </button>

              <button
              data-testid="favorite-toggle"
                onClick={() => toggleFavorite(product.image)}
                className="w-40 h-14 border border-gray-300 
                           rounded-md font-medium 
                           hover:border-black transition"
              >
                {favorites.includes(product.image) ? "❤️" : "🤍"} Wishlist
              </button>
            </div>
          </div>
        </div>

        {/* ===== YOU MAY ALSO LIKE ===== */}
        <div className="mt-24">
          <h2 className="text-2xl font-semibold mb-8">
            You May Also Like
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {relatedProducts.map((item) => (
              <div
                key={item.slug}
                className="group border rounded-xl p-4 
                           hover:shadow-lg transition bg-white relative"
              >
                <div
                  onClick={() => toggleFavorite(item.image)}
                  className="absolute top-3 right-3 cursor-pointer"
                >
                  {favorites.includes(item.image) ? "❤️" : "🤍"}
                </div>

                <div
                  onClick={() => router.push(`/product/${item.slug}`)}
                  className="cursor-pointer"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={300}
                    height={400}
                    className="w-full h-64 object-contain"
                  />
                </div>

                <h4 className="mt-4 text-sm font-medium">
                  {item.title}
                </h4>

                <div className="mt-2 flex items-center gap-2">
                  <span className="font-semibold">
                    ₹{item.price}
                  </span>
                  <span className="line-through text-gray-400 text-sm">
                    ₹{Math.round(item.price * 1.3)}
                  </span>
                  <span className="text-pink-600 text-sm">
                    20% OFF
                  </span>
                </div>

                <button
                  onClick={() => addToCart(item.image, "M", item.price, item.title)}
                  className="mt-4 w-full bg-pink-600 text-white 
                             py-2 rounded-md text-sm font-semibold
                             hover:bg-pink-700 transition"
                >
                  ADD TO BAG
                </button>
                {toast && (
  <div className="fixed top-6 right-6 
                  bg-black text-white 
                  px-6 py-3 rounded-lg 
                  shadow-lg z-50 
                  animate-slideIn">
    {toast}
  </div>
)}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  </div>
);
}