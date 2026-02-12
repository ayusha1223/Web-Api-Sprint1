"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  /* LOAD PROFILE */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    

    fetch("http://localhost:5050/api/auth/whoami", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((res) => {
        const user = res.data;
        setName(user.name || "");
        setEmail(user.email || "");
        if (user.image) setPreview(`http://localhost:5050${user.image}`);
      });
  }, []);

  /* SAVE PROFILE */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);

    await fetch("http://localhost:5050/api/auth/update-profile", {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    alert("Profile updated successfully");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Account Settings</h2>
      <p style={{ color: "#6b7280" }}>Basic info</p>

      <form onSubmit={handleSubmit} style={{ marginTop: "30px" }}>
        <div style={{ marginBottom: "20px" }}>
          <img
            src={preview || "/user-placeholder.png"}
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #ec4899",
            }}
          />
          <br />
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setImage(file);
              if (file) setPreview(URL.createObjectURL(file));
            }}
          />
        </div>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          style={{ display: "block", marginBottom: "15px", padding: "8px" }}
        />

        <input
          value={email}
          disabled
          style={{ display: "block", marginBottom: "15px", padding: "8px" }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "#ec4899",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
          }}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
