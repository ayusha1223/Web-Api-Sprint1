"use client";

import { useEffect, useState } from "react";
import CategoryLayout from "../../../components/CategoryLayout";
import { coordProducts } from "../../data/coord";

export default function CoordPage() {
  const [dynamicProducts, setDynamicProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch(
        "http://localhost:5050/api/products/category/coord"
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
    }

    fetchProducts();
  }, []);

  return (
    <CategoryLayout
      title="Co-Ord Set"
      products={[...coordProducts, ...dynamicProducts]}
    />
  );
}