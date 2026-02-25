"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= DELETE CONFIRM TOAST ================= */
  const handleDelete = (id: string) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-medium">
          Are you sure you want to delete this product?
        </p>

        <div className="flex gap-3 justify-end">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-1 text-sm bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              toast.dismiss(t.id);
              deleteProduct(id);
            }}
            className="px-4 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    ));
  };

  /* ================= ACTUAL DELETE API ================= */
  const deleteProduct = async (id: string) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `http://localhost:5050/api/admin/products/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Delete failed");
        return;
      }

      setProducts((prev) => prev.filter((p) => p._id !== id));

      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5050/api/admin/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  /* ================= UI ================= */
  return (
    <div className="p-10 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Products</h2>

        <button
          onClick={() => router.push("/admin/products/create")}
          className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">

        {loading ? (
          <div className="p-10 text-center text-gray-500">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="p-16 text-center text-gray-400">
            No products found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 text-left">Product</th>
                  <th className="px-6 py-4 text-left">Price</th>
                  <th className="px-6 py-4 text-left">Category</th>
                  <th className="px-6 py-4 text-left">Stock</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="border-t hover:bg-gray-50 transition"
                  >

                    {/* PRODUCT INFO */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={
                            product.images?.length
                              ? `http://localhost:5050${product.images[0]}`
                              : "/product-placeholder.png"
                          }
                          className="w-14 h-14 rounded-lg object-cover"
                        />
                        <span className="font-medium">
                          {product.name}
                        </span>
                      </div>
                    </td>

                    {/* PRICE */}
                    <td className="px-6 py-4">
                      ₹ {product.price}
                    </td>

                    {/* CATEGORY */}
                    <td className="px-6 py-4 text-gray-600">
                      {product.category}
                    </td>

                    {/* STOCK */}
                    <td className="px-6 py-4">
                      {product.stock}
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-4">
                      {product.stock > 0 ? (
                        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                          In Stock
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs">
                          Out of Stock
                        </span>
                      )}
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() =>
                            router.push(`/admin/products/edit/${product._id}`)
                          }
                          className="text-blue-500 hover:text-blue-600 transition"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-red-500 hover:text-red-600 transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
}