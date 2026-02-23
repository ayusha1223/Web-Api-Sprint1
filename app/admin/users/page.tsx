"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./UsersPage.module.css";

export default function UsersPage() {
  const router = useRouter();

  const [users, setUsers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      router.push("/login");
      return;
    }

    setLoading(true);

    fetch(`http://localhost:5050/api/admin/users?page=${page}&limit=5`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data || []);
        setTotalPages(data.pagination?.totalPages || 1);
      })
      .finally(() => setLoading(false));
  }, [page, router]);

  const handleDeleteUser = async (userId: string) => {
    const token = localStorage.getItem("token");
    if (!confirm("Delete this user?")) return;

    await fetch(`http://localhost:5050/api/admin/users/${userId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setUsers((prev) => prev.filter((u) => u._id !== userId));
  };

  const handleEditUser = (user: any) => {
    setEditUser({ ...user });
  };

  const handleSaveUser = async () => {
    const token = localStorage.getItem("token");
    if (!token || !editUser) return;

    const formData = new FormData();
    formData.append("name", editUser.name);
    formData.append("email", editUser.email);
    formData.append("role", editUser.role);

    if (editUser.password)
      formData.append("password", editUser.password);

    const res = await fetch(
      `http://localhost:5050/api/admin/users/${editUser._id}`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      }
    );

    const data = await res.json();

    if (data.success) {
      setUsers((prev) =>
        prev.map((u) =>
          u._id === editUser._id ? data.data : u
        )
      );
      setEditUser(null);
    }
  };

  return (
    <div className={styles.usersPage}>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <h2>All Registered Users</h2>
          <button
            className={styles.createBtn}
            onClick={() => router.push("/admin/users/create")}
          >
            + Create
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span
                        className={`${styles.roleBadge} ${
                          user.role === "admin"
                            ? styles.admin
                            : styles.user
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actionButtons}>
                        <button
                          className={styles.viewBtn}
                          onClick={() =>
                            router.push(`/admin/users/${user._id}`)
                          }
                        >
                          View
                        </button>
                        <button
                          className={styles.editBtn}
                          onClick={() => handleEditUser(user)}
                        >
                          Edit
                        </button>
                        <button
                          className={styles.deleteBtn}
                          onClick={() =>
                            handleDeleteUser(user._id)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className={styles.pagination}>
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
            {editUser && (
  <div className={styles.modalOverlay}>
    <div className={styles.modal}>
      <h3>Edit User</h3>

      <input
        value={editUser.name}
        onChange={(e) =>
          setEditUser({ ...editUser, name: e.target.value })
        }
        placeholder="Name"
      />

      <input
        value={editUser.email}
        onChange={(e) =>
          setEditUser({ ...editUser, email: e.target.value })
        }
        placeholder="Email"
      />

      <select
        value={editUser.role}
        onChange={(e) =>
          setEditUser({ ...editUser, role: e.target.value })
        }
      >
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>

      <div className={styles.modalActions}>
        <button onClick={handleSaveUser}>
          Save
        </button>
        <button onClick={() => setEditUser(null)}>
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
          </>
          
        )}
      </div>
    </div>
  );
}