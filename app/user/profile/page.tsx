"use client";

import { useEffect, useState } from "react";
import axios from "@/app/lib/api/axios";
import { useRouter } from "next/navigation";

export default function UserProfilePage() {
  const router = useRouter();

  // 🔹 State
  const [userId, setUserId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  // 🔹 Load user info
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      router.replace("/login");
      return;
    }

    const user = JSON.parse(storedUser);
    setUserId(user.id);
    setName(user.name || "");
    setEmail(user.email || "");

    if (user.image) {
      setPreview(`http://localhost:5050${user.image}`);
    }

    setLoading(false);
  }, [router]);

  // 🔹 Update profile
  const updateProfile = async () => {
    if (!userId) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    const formData = new FormData();
    formData.append("name", name);

    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await axios.put(
        `/api/auth/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // update localStorage
      localStorage.setItem("user", JSON.stringify(res.data.data));
      setSuccess(true);
    } catch {
      alert("Profile update failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Account Settings</h2>
        <p style={styles.subtitle}>Update your profile details</p>

        {/* Profile Image */}
        <div style={styles.avatarWrapper}>
          <img
            src={preview || "/images/user-placeholder.png"}
            alt="Profile"
            style={styles.avatar}
          />
        </div>

        <div style={styles.field}>
          <label>Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setImage(file);
              if (file) setPreview(URL.createObjectURL(file));
            }}
          />
        </div>

        {/* Name */}
        <div style={styles.field}>
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div style={styles.field}>
          <label>Email</label>
          <input value={email} disabled />
        </div>

        {success && (
          <p style={styles.success}>✅ Profile updated successfully</p>
        )}

        <button style={styles.button} onClick={updateProfile}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

/* 🎨 STYLES */
const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f4f5f7",
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
  },

  title: {
    textAlign: "center",
    fontSize: "22px",
    fontWeight: 600,
  },

  subtitle: {
    textAlign: "center",
    fontSize: "13px",
    color: "#6b7280",
    marginBottom: "20px",
  },

  avatarWrapper: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    overflow: "hidden",
    border: "3px solid #2563eb",
    margin: "0 auto 15px",
  },

  avatar: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  field: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "14px",
    fontSize: "14px",
  },

  success: {
    fontSize: "13px",
    color: "#16a34a",
    marginBottom: "10px",
    textAlign: "center",
  },

  button: {
    width: "100%",
    marginTop: "10px",
    padding: "12px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: 600,
    cursor: "pointer",
  },
};
