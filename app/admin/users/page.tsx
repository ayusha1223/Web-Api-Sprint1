"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AccountSettingsPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);


  /* ================= LOAD LOGGED-IN USER PROFILE ================= */
 useEffect(() => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (role !== "admin") return;

  fetch(`http://localhost:5050/api/admin/users?page=${page}&limit=5`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((data) => {
      setUsers(data.data);
      setTotalPages(data.pagination.totalPages);
    })
    .catch((err) => console.error(err));
}, [page]);


  /* ================= LOAD ADMIN USERS ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (role !== "admin") return;

    fetch("http://localhost:5050/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
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

    if (image) formData.append("image", image);

    const res = await fetch("http://localhost:5050/api/auth/update-profile", {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

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
      headers: { Authorization: `Bearer ${token}` },
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
      prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
    );
  };

  // ✅ NEW: View user details
  const handleViewUser = (userId: string) => {
    router.push(`/admin/users/${userId}`);
  };

  // ✅ NEW: Go to create page
  const handleCreateUser = () => {
    router.push("/admin/users/create");
  };

  return (
    <div style={styles.page}>
      {/* Sidebar */}
      {/* Main Content */}
 <main style={styles.content}>
              {/* ================= ADMIN USERS LIST ================= */}
        {users.length > 0 && (
          <>
            <hr style={{ margin: "50px 0" }} />

            {/* ✅ Title + Create button in same row */}
            <div style={styles.usersHeaderRow}>
              <div>
                <h2 style={{ margin: 0 }}>All Registered Users</h2>
                <p style={styles.sub}>Admin view</p>
              </div>

              <button style={styles.createBtn} onClick={handleCreateUser}>
                + Create
              </button>
            </div>

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
                      <div style={styles.actionGroup}>
                        {/* ✅ NEW: View */}
                        <button
                          style={styles.viewBtn}
                          onClick={() => handleViewUser(user._id)}
                        >
                          View
                        </button>

                        <button
                          style={styles.editBtn}
                          onClick={() => handleEditUser(user._id, user.role)}
                        >
                          Edit
                        </button>

                        <button
                          style={styles.deleteBtn}
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: 20, display: "flex", gap: 15 }}>
  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
  >
    Prev
  </button>

  <span>
    Page {page} of {totalPages}
  </span>

  <button
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
  >
    Next
  </button>
</div>

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

  avatarWrap: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    overflow: "hidden",
    border: "2px solid #ec4899",
  },
  avatar: { width: "100%", height: "100%", objectFit: "cover" },

  input: { flex: 1, padding: "8px 10px", borderRadius: "6px", border: "1px solid #e5e7eb" },
  button: {
    marginTop: "30px",
    padding: "10px 20px",
    background: "#ec4899",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  usersHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },

  createBtn: {
    padding: "10px 14px",
    background: "#ec4899",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 600,
  },

  table: { width: "100%", borderCollapse: "collapse", marginTop: "10px" },
  th: { textAlign: "left", padding: "10px", borderBottom: "2px solid #e5e7eb" },
  td: { padding: "10px", borderBottom: "1px solid #e5e7eb" },

  actionGroup: { display: "flex", gap: "8px" },

  viewBtn: {
    padding: "6px 10px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    background: "#fff",
    cursor: "pointer",
  },

  editBtn: {
    padding: "6px 10px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    background: "#fff",
    cursor: "pointer",
  },

  deleteBtn: {
    padding: "6px 10px",
    borderRadius: "6px",
    border: "1px solid #ef4444",
    background: "#fff",
    color: "#ef4444",
    cursor: "pointer",
  },
};
