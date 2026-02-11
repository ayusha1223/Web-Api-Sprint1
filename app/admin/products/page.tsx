"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);

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
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.headerRow}>
        <h2 style={styles.title}>Products</h2>

        <button
          style={styles.addBtn}
          onClick={() => router.push("/admin/products/create")}
        >
          + Add Product
        </button>
      </div>

      {/* Table */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Stock</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={4} style={styles.noData}>
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product._id} style={styles.tr}>
                  <td style={styles.td}>{product.name}</td>
                  <td style={styles.td}>₹ {product.price}</td>
                  <td style={styles.td}>{product.category}</td>
                  <td style={styles.td}>{product.stock}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: "40px",
    background: "#f7f7fb",
    minHeight: "100vh",
  },

  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },

  title: {
    fontSize: "26px",
    fontWeight: 600,
  },

  addBtn: {
    padding: "10px 16px",
    background: "#ec4899",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "14px",
  },

  tableWrapper: {
    background: "#ffffff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    textAlign: "left",
    padding: "12px",
    borderBottom: "2px solid #f1f1f1",
    fontSize: "14px",
    color: "#6b7280",
  },

  tr: {
    borderBottom: "1px solid #f1f1f1",
  },

  td: {
    padding: "12px",
    fontSize: "14px",
  },

  noData: {
    padding: "30px",
    textAlign: "center",
    color: "#9ca3af",
  },
};
