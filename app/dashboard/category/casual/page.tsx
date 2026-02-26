"use client";

import { useEffect, useState } from "react";
import CategoryLayout from "../../../components/CategoryLayout";
import { casualProducts } from "../../data/casual";

export default function CasualPage() {
  const [dynamicProducts, setDynamicProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          "http://localhost:5050/api/products/category/casual"
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
          color: null,
          discount: "",
        }));

        setDynamicProducts(formatted);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  const allProducts = [...casualProducts, ...dynamicProducts];

  return (
    <CategoryLayout
      title="Casual Wear"
      products={allProducts}
    />
  );
}