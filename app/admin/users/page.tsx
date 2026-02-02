"use client";

import { useEffect, useState } from "react";

export default function AccountSettingsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [users, setUsers] = useState<any[]>([]);

  /* ================= LOAD LOGGED-IN USER PROFILE ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:5050/api/auth/whoami", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const user = res.data;

        setName(user.name || "");
        setEmail(user.email || "");

        if (user.image) {
          setPreview(`http://localhost:5050${user.image}`);
        }
      })
      .catch((err) => console.error("Profile load error:", err));
  }, []);

  /* ================= LOAD ADMIN USERS ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (role !== "admin") return;

    fetch("http://localhost:5050/api/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data.data))
      .catch((err) => console.error(err));
  }, []);

  /* ================= SAVE PROFILE ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return;

    const formData = new FormData();
    formData.append("name", name);

    if (image) {
      formData.append("image", image);
    }

    const res = await fetch(
      "http://localhost:5050/api/auth/update-profile",
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const data = await res.json();

    if (data?.data?.image) {
      setPreview(`http://localhost:5050${data.data.image}`);
    }

    alert("Profile updated successfully");
  };

  /* ================= ADMIN ACTIONS ================= */
  const handleDeleteUser = async (userId: string) => {
    const token = localStorage.getItem("token");

    if (!confirm("Are you sure you want to delete this user?")) return;

    await fetch(`http://localhost:5050/api/admin/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUsers((prev) => prev.filter((u) => u._id !== userId));
  };

  const handleEditUser = async (userId: string, currentRole: string) => {
    const token = localStorage.getItem("token");
    const newRole = prompt("Enter role (admin/user)", currentRole);

    if (!newRole) return;

    await fetch(`http://localhost:5050/api/admin/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role: newRole }),
    });

    setUsers((prev) =>
      prev.map((u) =>
        u._id === userId ? { ...u, role: newRole } : u
      )
    );
  };

  return (
    <div style={styles.page}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <h3 style={styles.sideTitle}>Settings</h3>
        <ul style={styles.menu}>
          <li style={styles.active}>Account</li>
          <li>Users</li>
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

        {/* ================= PROFILE FORM ================= */}
        <form onSubmit={handleSubmit}>
          {/* Profile Picture */}
          <div style={styles.row}>
            <div style={styles.label}>Profile Picture</div>
            <div style={styles.value}>
              <div style={styles.avatarWrap}>
                <img
                  src={preview || "/user-placeholder.png"}
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
                  if (file) {
                    setPreview(URL.createObjectURL(file));
                  }
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

          {/* Email (read-only) */}
          <div style={styles.row}>
            <div style={styles.label}>Email</div>
            <input
              style={styles.input}
              value={email}
              disabled
            />
          </div>

          <button type="submit" style={styles.button}>
            Save Changes
          </button>
        </form>

        {/* ================= ADMIN USERS LIST ================= */}
        {users.length > 0 && (
          <>
            <hr style={{ margin: "50px 0" }} />

            <h2>All Registered Users</h2>
            <p style={styles.sub}>Admin view</p>

            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Role</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td style={styles.td}>{user.name}</td>
                    <td style={styles.td}>{user.email}</td>
                    <td style={styles.td}>{user.role}</td>
                    <td style={styles.td}>
                      <button
                        style={styles.editBtn}
                        onClick={() =>
                          handleEditUser(user._id, user.role)
                        }
                      >
                        Edit
                      </button>
                      <button
                        style={styles.deleteBtn}
                        onClick={() =>
                          handleDeleteUser(user._id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </main>
    </div>
  );
}

/* ================= STYLES ================= */
const styles: Record<string, React.CSSProperties> = {
  page: { display: "flex", minHeight: "100vh", background: "#f7f7fb" },
  sidebar: { width: "220px", background: "#fdecef", padding: "25px" },
  sideTitle: { marginBottom: "20px", fontSize: "18px" },
  menu: { listStyle: "none", padding: 0, lineHeight: "2.2" },
  active: { fontWeight: 600, color: "#ec4899" },
  content: { flex: 1, background: "#fff", padding: "40px" },
  sub: { color: "#6b7280", marginBottom: "25px" },
  row: { display: "flex", alignItems: "center", marginBottom: "20px", gap: "20px" },
  label: { width: "150px", fontSize: "14px", color: "#6b7280" },
  value: { display: "flex", alignItems: "center", gap: "15px" },
  avatarWrap: { width: "60px", height: "60px", borderRadius: "50%", overflow: "hidden", border: "2px solid #ec4899" },
  avatar: { width: "100%", height: "100%", objectFit: "cover" },
  input: { flex: 1, padding: "8px 10px", borderRadius: "6px", border: "1px solid #e5e7eb" },
  button: { marginTop: "30px", padding: "10px 20px", background: "#ec4899", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" },
  table: { width: "100%", borderCollapse: "collapse", marginTop: "20px" },
  th: { textAlign: "left", padding: "10px", borderBottom: "2px solid #e5e7eb" },
  td: { padding: "10px", borderBottom: "1px solid #e5e7eb" },
};
