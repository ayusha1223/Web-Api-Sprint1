"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud } from "lucide-react";

export default function CreateProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("casual");
  const [stock, setStock] = useState("");
  const [sizes, setSizes] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSizeToggle = (size: string) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size]
    );
  };

  const handleImageChange = (files: FileList) => {
    const fileArray = Array.from(files);
    setImages(fileArray);
    setPreviews(fileArray.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("stock", stock);
    formData.append("sizes", JSON.stringify(sizes));

    images.forEach((img) => {
      formData.append("images", img);
    });

    const res = await fetch(
      "http://localhost:5050/api/admin/products",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      alert(data.message || "Failed to create product");
      return;
    }

    router.push("/admin/products");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-16 py-16">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-14">
          <h1 className="text-4xl font-bold text-gray-900">
            Create New Product
          </h1>
          <p className="text-gray-500 mt-2">
            Add products to your inventory
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-20"
        >

          {/* LEFT COLUMN */}
          <div className="space-y-10">

            <div>
              <label className="block text-sm text-gray-500 mb-2">
                Product Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border-b border-gray-300 focus:border-black outline-none py-3 text-lg transition"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-xl p-5 min-h-[140px] focus:ring-2 focus:ring-black outline-none transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Price
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="w-full border-b border-gray-300 focus:border-black outline-none py-2 transition"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Stock
                </label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                  className="w-full border-b border-gray-300 focus:border-black outline-none py-2 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border-b border-gray-300 focus:border-black outline-none py-2 transition"
              >
                <option value="casual">Casual</option>
                <option value="party">Party</option>
                <option value="wedding">Wedding</option>
                <option value="winter">Winter</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-4">
                Sizes
              </label>
              <div className="flex gap-4">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    type="button"
                    key={size}
                    onClick={() => handleSizeToggle(size)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                      sizes.includes(size)
                        ? "bg-black text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-10">

            <div>
              <label className="block text-sm text-gray-500 mb-4">
                Product Images
              </label>

              <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl h-80 cursor-pointer hover:border-black transition">
                <UploadCloud size={42} />
                <span className="mt-4 text-gray-500 text-sm">
                  Click to upload (max 5 images)
                </span>

                <input
                  type="file"
                  multiple
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      handleImageChange(e.target.files);
                    }
                  }}
                />
              </label>

              {previews.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {previews.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      className="rounded-xl h-40 w-full object-cover shadow-sm"
                    />
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-black text-white rounded-full text-sm tracking-wide hover:bg-gray-800 transition disabled:opacity-50"
            >
              {loading ? "Creating Product..." : "Create Product"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}