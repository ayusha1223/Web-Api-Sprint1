"use client";

import { useEffect, useState } from "react";
import "./settings.css";

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /* LOAD PROFILE */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:5050/api/auth/whoami", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((res) => {
        const user = res.data.user;
        setName(user.name || "");
        setEmail(user.email || "");
        if (user.image)
          setPreview(`http://localhost:5050${user.image}`);
      });
  }, []);

  /* SAVE PROFILE */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) return;

    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);

    try {
      const res = await fetch(
        "http://localhost:5050/api/admin/profile",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Profile updated successfully");
      } else {
        alert(data.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-card">
        <h2>Account Settings</h2>
        <p className="sub-text">Manage your profile information</p>

        <form onSubmit={handleSubmit}>
          <div className="image-section">
            <img
              src={preview || "/user-placeholder.png"}
              alt="Profile"
            />
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setImage(file);
                if (file) setPreview(URL.createObjectURL(file));
              }}
            />
          </div>

          <div className="form-group">
            <label>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input value={email} disabled />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}