"use client";

import { useState } from "react";

export default function CreateUserPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);

    if (image) {
      formData.append("image", image);
    }

    await fetch("http://localhost:5050/api/admin/users", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    alert("User created successfully!");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create New User</h2>
        <p style={styles.subTitle}>
          Add a new user or admin to the system
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label>Name</label>
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div style={styles.field}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={styles.field}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Temporary password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div style={styles.field}>
            <label>Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div style={styles.field}>
            <label>Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImage(e.target.files?.[0] || null)
              }
            />
          </div>

          <button type="submit" style={styles.button}>
            Create User
          </button>
        </form>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f7f7fb",
    padding: "40px",
  },

  card: {
    width: "100%",
    maxWidth: "480px",
    background: "#fff",
    borderRadius: "12px",
    padding: "30px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },

  title: {
    fontSize: "24px",
    marginBottom: "6px",
  },

  subTitle: {
    color: "#6b7280",
    marginBottom: "25px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    fontSize: "14px",
  },

  button: {
    marginTop: "15px",
    padding: "12px",
    background: "#ec4899",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
};
