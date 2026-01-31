"use client";

import axios from "@/app/lib/api/axios";
import { useEffect, useState } from "react";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  /* ---------------- FETCH PROFILE ---------------- */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("/api/auth/whoami", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = res.data.data;
        setUser(userData);
        setName(userData.name);

        if (userData.image) {
          setPreview(`http://localhost:5050${userData.image}`);
        }
      } catch (error) {
        console.error("Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  /* ---------------- UPDATE PROFILE ---------------- */
  const submitHandler = async () => {
    if (!user) return;

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", name);
      if (image) {
        formData.append("image", image);
      }

      const res = await axios.put(
        "/api/auth/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = res.data.data;

      setUser(updatedUser);
      setName(updatedUser.name);

      if (updatedUser.image) {
        setPreview(`http://localhost:5050${updatedUser.image}`);
      }

      alert("Profile updated successfully");
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      alert("Failed to update profile");
    }
  };

  if (!user) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>User Profile</h2>

        {/* Avatar */}
        <div style={styles.avatarWrapper}>
          <img
            src={preview || "/images/user-placeholder.png"}
            alt="Profile"
            style={styles.avatar}
          />
        </div>

        {/* Info */}
        <p><b>Email:</b> {user.email}</p>
        <p><b>Role:</b> {user.role}</p>

        {/* Name */}
        <label style={styles.label}>Name</label>
        <input
          style={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* File */}
        <label style={styles.label}>Profile Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setImage(file);
              setPreview(URL.createObjectURL(file));
            }
          }}
        />

        {/* Button */}
        <button style={styles.button} onClick={submitHandler}>
          Update Profile
        </button>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
  },
  card: {
    background: "#fff",
    padding: "30px",
    width: "350px",
    borderRadius: "10px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  avatarWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "15px",
  },
  avatar: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #ddd",
  },
  label: {
    display: "block",
    marginTop: "12px",
    marginBottom: "5px",
    fontSize: "14px",
    fontWeight: 500,
  },
  input: {
    width: "100%",
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  },
  button: {
    marginTop: "15px",
    width: "100%",
    padding: "10px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: 600,
  },
};
