"use client";

import { useEffect, useState } from "react";
import CategoryLayout from "../../../components/CategoryLayout";
import { weddingProducts } from "../../data/wedding";

export default function WeddingPage() {
  const [dynamicProducts, setDynamicProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          "http://localhost:5050/api/products/category/wedding"
        );

        const data = await res.json();

        const formatted = data.data.map((p: any) => ({
          id: p._id,
          title: p.name,
          price: p.price,
          image: p.images?.[0]
            ? `http://localhost:5050${p.images[0]}`
            : "/placeholder.png",
          slug: p._id,
        }));

        setDynamicProducts(formatted);
      } catch (error) {
        console.error("Error fetching wedding products:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <CategoryLayout
      title="Wedding Wear"
      products={[...weddingProducts, ...dynamicProducts]}
    />
  );
}