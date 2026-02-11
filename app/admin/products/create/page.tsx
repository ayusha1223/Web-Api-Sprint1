"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateProductPage() {

  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("casual");
  const [stock, setStock] = useState("");
  const [sizes, setSizes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSizeToggle = (size: string) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter((s) => s !== size));
    } else {
      setSizes([...sizes, size]);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5050/api/admin/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description,
        price: Number(price),
        category,
        stock: Number(stock),
        sizes,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to create product");
      setLoading(false);
      return;
    }

    alert("Product added successfully!");
    router.push("/admin/products");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Add New Product</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={styles.textarea}
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={styles.input}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.input}
          >
            <option value="casual">Casual</option>
            <option value="party">Party</option>
            <option value="wedding">Wedding</option>
            <option value="winter">Winter</option>
          </select>

          <input
            type="number"
            placeholder="Stock Quantity"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            style={styles.input}
          />

          {/* Sizes */}
          <div style={{ marginTop: 10 }}>
            <label style={{ fontWeight: 500 }}>Sizes:</label>
            <div style={styles.sizeRow}>
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  type="button"
                  key={size}
                  onClick={() => handleSizeToggle(size)}
                  style={{
                    ...styles.sizeBtn,
                    background: sizes.includes(size)
                      ? "#ec4899"
                      : "#f3f4f6",
                    color: sizes.includes(size) ? "#fff" : "#000",
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" style={styles.submitBtn}>
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f7f7fb",
    padding: "40px",
  },

  card: {
    width: "100%",
    maxWidth: "500px",
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },

  title: {
    fontSize: "22px",
    marginBottom: "20px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
  },

  textarea: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    minHeight: "80px",
  },

  sizeRow: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },

  sizeBtn: {
    padding: "8px 14px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },

  submitBtn: {
    marginTop: "20px",
    padding: "12px",
    background: "#ec4899",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: 600,
    cursor: "pointer",
  },
};
