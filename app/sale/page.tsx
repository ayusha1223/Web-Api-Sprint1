"use client";

import Image from "next/image";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { partyProducts } from "../dashboard/data/party";
import { weddingProducts } from "../dashboard/data/wedding";

export default function SalePage() {
  const saleItems = [...partyProducts, ...weddingProducts].filter(
    (p) => parseInt(p.discount) >= 15
  );

  return (
    <>
      <Navbar />

      <main className="bg-[#f8f5f2] min-h-screen text-gray-800">

        {/* HERO */}
        <section className="text-center pt-32 pb-20 px-6 bg-gradient-to-r from-pink-100 via-white to-pink-100">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Mega <span className="text-pink-600">Sale</span> 🔥
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Grab the best deals before they’re gone.
            Limited-time exclusive discounts on premium collections.
          </p>
        </section>

        {/* PRODUCTS GRID */}
        <section className="max-w-7xl mx-auto px-6 pb-32">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">

            {saleItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition duration-500 overflow-hidden group"
              >

                {/* IMAGE */}
                <div className="relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={500}
                    height={600}
                    className="w-full h-[350px] object-cover group-hover:scale-110 transition duration-700"
                  />

                  {/* DISCOUNT BADGE */}
                  <div className="absolute top-4 left-4 bg-pink-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                    {item.discount} OFF
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6">

                  <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xl font-bold text-pink-600">
                      ₹{item.price}
                    </span>
                    <span className="text-gray-400 line-through text-sm">
                      ₹{item.oldPrice}
                    </span>
                  </div>

                  <button className="w-full bg-black hover:bg-pink-600 text-white py-2 rounded-full font-medium transition">
                    Add to Cart
                  </button>
                </div>

              </div>
            ))}

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}