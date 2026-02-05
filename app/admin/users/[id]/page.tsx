"use client";


import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminGuard from "../../../components/AdminGuard";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  image?: string; // backend may return "/uploads/...."
};

export default function AdminUserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !id) return;

    fetch(`http://localhost:5050/api/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((res) => {
        // support both: {data: user} or {user: user}
        const u = res.data || res.user;
        setUser(u);
      })
      .catch((err) => {
        console.error(err);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <AdminGuard>
      <div style={styles.page}>
        <div style={styles.card}>
          <h2 style={styles.title}>User Details</h2>

          {loading ? (
            <p style={styles.text}>Loading...</p>
          ) : !user ? (
            <p style={styles.text}>User not found.</p>
          ) : (
            <>
              <div style={styles.avatarWrap}>
                <img
                  src={
                    user.image
                      ? `http://localhost:5050${user.image}`
                      : "/user-placeholder.png"
                  }
                  alt="Profile"
                  style={styles.avatar}
                />
              </div>

              <div style={styles.detailBox}>
                <div style={styles.line}>
                  <b>Name:</b> {user.name}
                </div>
                <div style={styles.line}>
                  <b>Email:</b> {user.email}
                </div>
                <div style={styles.line}>
                  <b>Role:</b> {user.role}
                </div>

                <div style={{ marginTop: 10 }}>
                  <div style={styles.text}>User ID:</div>
                  <div style={styles.idBox}>{user._id}</div>
                </div>
              </div>

              <div style={styles.btnRow}>
                <button
                  style={styles.backBtn}
                  onClick={() => router.push("/admin/users")}
                >
                  Back
                </button>
                <button
                  style={styles.editBtn}
                  onClick={() => router.push(`/admin/users/edit/${user._id}`)}
                >
                  Edit
                </button>
              </div>
            </>
          )}
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
    padding: 20,
  },

  card: {
    width: "460px",
    background: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    textAlign: "center",
  },

  title: {
    fontSize: "22px",
    fontWeight: 600,
    marginBottom: "18px",
  },

  text: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "8px",
  },

  avatarWrap: {
    width: 90,
    height: 90,
    borderRadius: "50%",
    overflow: "hidden",
    border: "3px solid #ec4899",
    margin: "0 auto 16px auto",
  },

  avatar: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  detailBox: {
    textAlign: "left",
    background: "#f9fafb",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
  },

  line: {
    padding: "6px 0",
    fontSize: "14px",
    color: "#111827",
  },

  idBox: {
    fontFamily: "monospace",
    fontSize: "13px",
    background: "#f3f4f6",
    padding: "10px",
    borderRadius: "6px",
    wordBreak: "break-all",
  },

  btnRow: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    marginTop: 18,
  },

  backBtn: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    background: "#fff",
    cursor: "pointer",
  },

  editBtn: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "none",
    background: "#ec4899",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 600,
  },
};
