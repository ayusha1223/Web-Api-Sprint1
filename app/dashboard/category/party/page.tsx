"use client";

import { useEffect, useState } from "react";
import CategoryLayout from "../../../components/CategoryLayout";
import { partyProducts } from "../../data/party";

export default function PartyPage() {
  const [dynamicProducts, setDynamicProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          "http://localhost:5050/api/products/category/party"
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
        console.error("Error fetching party products:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <CategoryLayout
      title="Party Wear"
      products={[...partyProducts, ...dynamicProducts]}
    />
  );
}