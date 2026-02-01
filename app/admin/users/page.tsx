"use client";

import { useState } from "react";

export default function AccountSettingsPage() {
  const [name, setName] = useState("Coco");
  const [email, setEmail] = useState("coco@gmail.com");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <div style={styles.page}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <h3 style={styles.sideTitle}>Settings</h3>
        <ul style={styles.menu}>
          <li style={styles.active}>Account</li>
          <li>Notifications</li>
          <li>Privacy</li>
          <li>Languages</li>
          <li>Help</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main style={styles.content}>
        <h2>Account Settings</h2>
        <p style={styles.sub}>Basic info</p>

        {/* Profile Image */}
        <div style={styles.row}>
          <div style={styles.label}>Profile Picture</div>
          <div style={styles.value}>
            <div style={styles.avatarWrap}>
              <img
                src={preview || "/images/user-placeholder.png"}
                alt="profile"
                style={styles.avatar}
              />
            </div>
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
        </div>

        {/* Name */}
        <div style={styles.row}>
          <div style={styles.label}>Name</div>
          <input
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div style={styles.row}>
          <div style={styles.label}>Email</div>
          <input
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Save */}
        <button style={styles.button}>Save Changes</button>
      </main>
    </div>
  );
}
const styles: Record<string, React.CSSProperties> = {
  page: {
    display: "flex",
    minHeight: "100vh",
    background: "#f7f7fb",
    fontFamily: "sans-serif",
  },

  sidebar: {
    width: "220px",
    background: "#fdecef",
    padding: "25px",
  },

  sideTitle: {
    marginBottom: "20px",
    fontSize: "18px",
  },

  menu: {
    listStyle: "none",
    padding: 0,
    lineHeight: "2.2",
    cursor: "pointer",
  },

  active: {
    fontWeight: 600,
    color: "#ec4899",
  },

  content: {
    flex: 1,
    background: "#fff",
    padding: "40px",
  },

  sub: {
    color: "#6b7280",
    marginBottom: "25px",
  },

  row: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    gap: "20px",
  },

  label: {
    width: "150px",
    fontSize: "14px",
    color: "#6b7280",
  },

  value: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  avatarWrap: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    overflow: "hidden",
    border: "2px solid #ec4899",
  },

  avatar: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  input: {
    flex: 1,
    padding: "8px 10px",
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
  },

  button: {
    marginTop: "30px",
    padding: "10px 20px",
    background: "#ec4899",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
