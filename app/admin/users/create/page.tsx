"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import AdminGuard from "../../../components/AdminGuard";
import "./CreateUserPage.css";

export default function CreateUserPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);

      if (image) formData.append("image", image);

      const res = await fetch("http://localhost:5050/api/admin/users", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Create failed");
        return;
      }

      alert("User created successfully!");
      router.push("/admin/users");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminGuard>
      <div className="create-user-page">
        <div className="create-user-card">
          <h2>Create New User</h2>
          <p className="create-user-subtitle">
            Add a new user or admin to the system
          </p>

          <form onSubmit={handleSubmit} className="create-user-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Temporary password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="form-group">
              <label>Profile Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="primary-btn"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create User"}
              </button>

              <button
                type="button"
                className="secondary-btn"
                onClick={() => router.push("/admin/users")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminGuard>
  );
}