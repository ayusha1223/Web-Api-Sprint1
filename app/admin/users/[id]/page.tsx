"use client";

import AdminGuard from "@/app/components/AdminGuard";
import { useParams } from "next/navigation";

export default function AdminUserDetailPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <AdminGuard>
      <div style={styles.page}>
        <div style={styles.card}>
          <h2 style={styles.title}>User Details</h2>

          <p style={styles.text}>
            User ID:
          </p>

          <div style={styles.idBox}>
            {id}
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}

/* 🎨 Styles */
const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f3f4f6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "420px",
    background: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    textAlign: "center",
  },

  title: {
    fontSize: "22px",
    fontWeight: 600,
    marginBottom: "20px",
  },

  text: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "8px",
  },

  idBox: {
    fontFamily: "monospace",
    fontSize: "13px",
    background: "#f3f4f6",
    padding: "10px",
    borderRadius: "6px",
    wordBreak: "break-all",
  },
};
