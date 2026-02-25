"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    if (!id) return;

    const token = localStorage.getItem("token");

    fetch(`http://localhost:5050/api/admin/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const found = data.data.find((p: any) => p._id === id);
        setProduct(found);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load product");
        setLoading(false);
      });
  }, [id]);

  /* ================= UPDATE PRODUCT ================= */
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5050/api/admin/products/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Update failed");
      return;
    }

    toast.success("Product updated successfully");
    router.push("/admin/products");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Product not found
      </div>
    );
  }

  return (
  <div className="p-2 bg-gray-100 min-h-screen">

    {/* HEADER */}
    <div className="mb-10">
      <button
        onClick={() => router.back()}
        className="text-gray-500 hover:text-black transition mb-3"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold">
        Edit Product
      </h1>

      <p className="text-gray-500 mt-1">
        Update product details below
      </p>
    </div>

    {/* FORM CARD */}
    <div className="max-w-3xl bg-white rounded-2xl shadow-lg p-10">

      <form onSubmit={handleUpdate} className="space-y-6">

        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Product Name
          </label>
          <input
            value={product.name}
            onChange={(e) =>
              setProduct({ ...product, name: e.target.value })
            }
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none transition"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Price (₹)
          </label>
          <input
            type="number"
            value={product.price}
            onChange={(e) =>
              setProduct({
                ...product,
                price: Number(e.target.value),
              })
            }
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none transition"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Category
          </label>
          <select
            value={product.category}
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none transition"
          >
            <option value="casual">Casual</option>
            <option value="party">Party</option>
            <option value="wedding">Wedding</option>
            <option value="winter">Winter</option>
          </select>
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Stock Quantity
          </label>
          <input
            type="number"
            value={product.stock}
            onChange={(e) =>
              setProduct({
                ...product,
                stock: Number(e.target.value),
              })
            }
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none transition"
          />
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 transition shadow-md"
          >
            Update Product
          </button>
        </div>

      </form>
    </div>
  </div>
);
}
